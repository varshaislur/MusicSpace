import prisma from '../../utils/prisma.js';
import youtubesearchapi from 'youtube-search-api';
import axios from 'axios';

const extractYoutubeVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
};

// Helper function to validate YouTube URL
const isValidYoutubeUrl = (url) => {
  const regExp = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;
  return regExp.test(url);
};


export const addSong = async (req, res) => {
  try {
    const { spaceId } = req.params;
    const { youtubeUrl, title: providedTitle } = req.body;
    const userId = req.user.userId;
    
    // Validate URL format
    if (!isValidYoutubeUrl(youtubeUrl)) {
      return res.status(400).json({ message: 'Invalid YouTube URL format' });
    }
    
    // Check if space exists and user is a member
    const membership = await prisma.spaceMembership.findUnique({
      where: {
        userId_spaceId: {
          userId,
          spaceId
        }
      }
    });
    
    if (!membership) {
      return res.status(403).json({ message: 'Access denied or space not found' });
    }
    
    // Extract YouTube video ID
    const videoId = extractYoutubeVideoId(youtubeUrl);
    if (!videoId) {
      return res.status(400).json({ message: 'Could not extract valid YouTube video ID' });
    }
    
    // Determine the title to use - fetch from YouTube if not provided
    let finalTitle = providedTitle;
    
    if (!finalTitle || finalTitle.trim() === '') {
      try {
        // Fetch video details from YouTube API
        // const videoDetails = await youtubesearchapi.GetVideoDetails(videoId);
        const apiKey = process.env.YOUTUBE_API_KEY;
        const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
          params: {
            part: 'snippet',
            id: videoId,
            key: apiKey
          }
        });
        
        
        // if (videoDetails && videoDetails.title) {
        //   finalTitle = videoDetails.title;
        // } else {
        //   finalTitle = 'Unknown Title';
        // }

        const items = response.data.items;
        if (items.length > 0 && items[0].snippet) {
          finalTitle = items[0].snippet.title;
        } else {
          finalTitle = 'Unknown Title';
        }
      } catch (apiError) {
        console.error('YouTube API error:', apiError);
        finalTitle = 'Unknown Title';
      }
    }
    
    // Create song
    const song = await prisma.song.create({
      data: {
        youtubeUrl,
        title: finalTitle,
        space: { connect: { id: spaceId } },
        addedBy: { connect: { id: userId } }
      },
      include: {
        addedBy: {
          select: {
            id: true,
            name: true
          }
        },
        votes: true
      }
    });
    
    res.status(201).json(song);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSongs = async (req, res) => {
  try {
    const { spaceId } = req.params;
    const userId = req.user.userId;
    
    // Check if space exists and user is a member
    const membership = await prisma.spaceMembership.findUnique({
      where: {
        userId_spaceId: {
          userId,
          spaceId
        }
      }
    });
    
    if (!membership) {
      return res.status(403).json({ message: 'Access denied or space not found' });
    }
    
    // Get songs sorted by votes count
    const songs = await prisma.song.findMany({
      where: { spaceId },
      include: {
        addedBy: {
          select: {
            id: true,
            name: true
          }
        },
        votes: {
          include: {
            user: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        _count: {
          select: {
            votes: true
          }
        }
      },
      orderBy: {
        votes: {
          _count: 'desc'
        }
      }
    });
    
    // Add a field to indicate if the current user has voted for each song
    const formattedSongs = songs.map(song => ({
      ...song,
      voteCount: song._count.votes,
      userVoted: song.votes.some(vote => vote.user.id === userId),
      _count: undefined
    }));
    
    res.json(formattedSongs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const voteSong = async (req, res) => {
  try {
    const { spaceId, songId } = req.params;
    const userId = req.user.userId;
    
    // Check if space exists and user is a member
    const membership = await prisma.spaceMembership.findUnique({
      where: {
        userId_spaceId: {
          userId,
          spaceId
        }
      }
    });
    
    if (!membership) {
      return res.status(403).json({ message: 'Access denied or space not found' });
    }
    
    // Check if song exists in the space
    const song = await prisma.song.findFirst({
      where: {
        id: songId,
        spaceId
      }
    });
    
    if (!song) {
      return res.status(404).json({ message: 'Song not found in this space' });
    }
    
    // Check if user already voted for this song
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_songId: {
          userId,
          songId
        }
      }
    });
    
    if (existingVote) {
      // If vote exists, remove it (toggle functionality)
      await prisma.vote.delete({
        where: {
          id: existingVote.id
        }
      });
      
      res.json({ message: 'Vote removed successfully' });
    } else {
      // Create new vote
      const vote = await prisma.vote.create({
        data: {
          user: { connect: { id: userId } },
          song: { connect: { id: songId } }
        }
      });
      
      res.status(201).json(vote);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const removeSong = async (req, res) => {
  try {
    const { spaceId, songId } = req.params;
    const userId = req.user.userId;
    
    // Check if space exists
    const space = await prisma.space.findUnique({
      where: { id: spaceId }
    });
    
    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }
    
    // Check if song exists
    const song = await prisma.song.findUnique({
      where: { id: songId }
    });
    
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    
    // Check if user is the space owner or the one who added the song
    if (space.ownerId !== userId && song.addedById !== userId) {
      return res.status(403).json({ message: 'Access denied. Only the space owner or the person who added the song can remove it' });
    }
    
    // Delete all votes for this song first
    await prisma.vote.deleteMany({
      where: { songId }
    });
    
    // Delete the song
    await prisma.song.delete({
      where: { id: songId }
    });
    
    res.json({ message: 'Song removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }};