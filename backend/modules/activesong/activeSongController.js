import prisma from '../../utils/prisma.js';

export const setActiveSong = async (req, res) => {
  try {
    const { spaceId, songId } = req.params;
    const userId = req.user.userId;
    
    // Check if space exists
    const space = await prisma.space.findUnique({
      where: { id: spaceId },
      include: {
        members: true
      }
    });
    
    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }
    
    // Check if user is a member of the space
    const isMember = space.members.some(member => member.userId === userId);
    if (!isMember) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Check if the song exists and belongs to this space
    const song = await prisma.song.findFirst({
      where: {
        id: songId,
        spaceId
      }
    });
    
    if (!song) {
      return res.status(404).json({ message: 'Song not found in this space' });
    }
    
    // Update the space with the active song
    const updatedSpace = await prisma.space.update({
      where: { id: spaceId },
      data: { activeSongId: songId },
      include: {
        activeSong: {
          include: {
            addedBy: {
              select: {
                id: true,
                name: true
              }
            },
            votes: true
          }
        }
      }
    });
    
    res.json(updatedSpace.activeSong);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getActiveSong = async (req, res) => {
  try {
    const { spaceId } = req.params;
    const userId = req.user.userId;
    
    // Check if user is a member of the space
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
    
    // Get space with active song
    const space = await prisma.space.findUnique({
      where: { id: spaceId },
      include: {
        activeSong: {
          include: {
            addedBy: {
              select: {
                id: true,
                name: true
              }
            },
            votes: true
          }
        }
      }
    });
    
    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }
    
    if (!space.activeSong) {
      return res.json(null);
    }
    
    res.json(space.activeSong);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const endActiveSong = async (req, res) => {
  try {
    const { spaceId } = req.params;
    const userId = req.user.userId;
    
    // Check if space exists
    const space = await prisma.space.findUnique({
      where: { id: spaceId },
      include: {
        members: true,
        activeSong: true,
        songs: {
          orderBy: {
            votes: {
              _count: 'desc'
            }
          },
          include: {
            votes: true,
            addedBy: {
              select: {
                id: true,
                name: true
              }
            }
          },
          take: 1
        }
      }
    });
    
    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }
    
    // Check if user is a member of the space
    const isMember = space.members.some(member => member.userId === userId);
    if (!isMember) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // If there's no active song, nothing to do
    if (!space.activeSong) {
      return res.status(400).json({ message: 'No active song to end' });
    }
    
    // Get song ID to remove from queue
    const songToRemoveId = space.activeSong.id;
    
    // Get next song with most votes (if any)
    let nextSong = null;
    if (space.songs.length > 0) {
      const filteredSongs = space.songs.filter(song => song.id !== songToRemoveId);
      if (filteredSongs.length > 0) {
        nextSong = filteredSongs[0];
      }
    }
    
    // Transaction to remove current song and set next song as active
    const result = await prisma.$transaction(async (prisma) => {
      // Delete current song
      await prisma.vote.deleteMany({
        where: { songId: songToRemoveId }
      });
      
      await prisma.song.delete({
        where: { id: songToRemoveId }
      });
      
      // Update space with next song or clear active song
      const updatedSpace = await prisma.space.update({
        where: { id: spaceId },
        data: { 
          activeSongId: nextSong ? nextSong.id : null 
        },
        include: {
          activeSong: {
            include: {
              addedBy: {
                select: {
                  id: true,
                  name: true
                }
              },
              votes: true
            }
          }
        }
      });
      
      return updatedSpace;
    });
    
    res.json({
      message: 'Active song ended and removed from queue',
      nextSong: result.activeSong
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const playNextSong = async (req, res) => {
  try {
    const { spaceId } = req.params;
    const userId = req.user.userId;
    
    // Check if space exists
    const space = await prisma.space.findUnique({
      where: { id: spaceId },
      include: {
        members: true,
        activeSong: true,
        songs: {
          orderBy: {
            votes: {
              _count: 'desc'
            }
          },
          include: {
            votes: true,
            addedBy: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });
    
    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }
    
    // Check if user is a member of the space
    const isMember = space.members.some(member => member.userId === userId);
    if (!isMember) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // If there's no active song, find the top voted song
    if (!space.activeSong) {
      if (space.songs.length === 0) {
        return res.status(400).json({ message: 'No songs in queue' });
      }
      
      const updatedSpace = await prisma.space.update({
        where: { id: spaceId },
        data: { activeSongId: space.songs[0].id },
        include: {
          activeSong: {
            include: {
              addedBy: {
                select: {
                  id: true,
                  name: true
                }
              },
              votes: true
            }
          }
        }
      });
      
      return res.json(updatedSpace.activeSong);
    }
    
    // Current active song ID
    const currentSongId = space.activeSong.id;
    
    // Filter out the current song to find the next one
    const remainingSongs = space.songs.filter(song => song.id !== currentSongId);
    
    if (remainingSongs.length === 0) {
      // If no songs left, clear the active song
      await prisma.$transaction(async (prisma) => {
        // Delete current song
        await prisma.vote.deleteMany({
          where: { songId: currentSongId }
        });
        
        await prisma.song.delete({
          where: { id: currentSongId }
        });
        
        // Update space to clear active song
        await prisma.space.update({
          where: { id: spaceId },
          data: { activeSongId: null }
        });
      });
      
      return res.json({
        message: 'No more songs in queue',
        nextSong: null
      });
    }
    
    // Get the song with the most votes
    const nextSong = remainingSongs[0];
    
    // Transaction to remove current song and set next song as active
    const result = await prisma.$transaction(async (prisma) => {
      // Delete current song
      await prisma.vote.deleteMany({
        where: { songId: currentSongId }
      });
      
      await prisma.song.delete({
        where: { id: currentSongId }
      });
      
      // Update space with next song
      const updatedSpace = await prisma.space.update({
        where: { id: spaceId },
        data: { activeSongId: nextSong.id },
        include: {
          activeSong: {
            include: {
              addedBy: {
                select: {
                  id: true,
                  name: true
                }
              },
              votes: true
            }
          }
        }
      });
      
      return updatedSpace;
    });
    
    res.json({
      message: 'Playing next song',
      nextSong: result.activeSong
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};