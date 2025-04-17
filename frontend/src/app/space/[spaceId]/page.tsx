"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Copy, Music, Play, ThumbsUp, Users, Loader2 } from "lucide-react"
import { useParams } from "next/navigation"

// Define types based on API response
type User = {
  id: string
  name?: string
}

type SpaceMember = {
  id: string
  userId: string
  spaceId: string
  joinedAt: string
  user: User
}

type Vote = {
  id: string
  songId: string
  userId: string
}

type Song = {
  id: string
  youtubeUrl: string
  title: string
  spaceId: string
  addedById: string
  createdAt: string
  addedBy: User
  votes: Vote[]
}

type SpaceDetails = {
  id: string
  name: string
  joinCode: string
  ownerId: string
  createdAt: string
  owner: User
  members: SpaceMember[]
  songs: Song[]
}

export default function SpacePage() {
  const router = useRouter()
  const { spaceId } = useParams()
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [spaceDetails, setSpaceDetails] = useState<SpaceDetails | null>(null)
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Song | null>(null)

  // Fetch space details on component mount
  useEffect(() => {
    const fetchSpaceDetails = async () => {
      try {
        // Check if user is authenticated
        const token = localStorage.getItem("musicSpaceToken")
        if (!token) {
          router.push("/login")
          return
        }

        setLoading(true)
        const response = await fetch(`http://localhost:5000/api/space/${spaceId}/spaceDetails`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error("Failed to fetch space details")
        }

        const data: SpaceDetails = await response.json()
        setSpaceDetails(data)
        
        // Set the first song as currently playing if available
        if (data.songs && data.songs.length > 0) {
          setCurrentlyPlaying(data.songs[0])
        }
      } catch (err) {
        console.error("Error fetching space details:", err)
        setError("Failed to load space. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (spaceId) {
      fetchSpaceDetails()
    }
  }, [spaceId, router])

  const handleAddSong = async () => {
    if (!youtubeUrl || !spaceId) return
    
    try {
      const token = localStorage.getItem("musicSpaceToken")
      if (!token) {
        router.push("/login")
        return
      }

      const response = await fetch(`http://localhost:5000/api/space/${spaceId}/songs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          youtubeUrl
        })
      })

      if (!response.ok) {
        throw new Error("Failed to add song")
      }

      const newSong = await response.json()
      
      // Update space details with the new song
      if (spaceDetails) {
        setSpaceDetails({
          ...spaceDetails,
          songs: [...spaceDetails.songs, newSong]
        })
      }
      
      setYoutubeUrl("")
      alert("Song added to the queue!")
    } catch (err) {
      console.error("Error adding song:", err)
      alert("Failed to add song. Please try again.")
    }
  }

  const handleUpvote = async (songId: string) => {
    try {
      const token = localStorage.getItem("musicSpaceToken")
      if (!token) {
        router.push("/login")
        return
      }

      const response = await fetch(`http://localhost:5000/api/space/${spaceId}/songs/${songId}/vote`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error("Failed to vote for song")
      }

      // Update the song votes in the local state
      if (spaceDetails) {
        const updatedSongs = spaceDetails.songs.map(song => {
          if (song.id === songId) {
            // Get current user ID from localStorage
            const userData = localStorage.getItem("musicSpaceUser")
            const userId = userData ? JSON.parse(userData).id : null
            
            if (userId) {
              // Check if user has already voted
              const alreadyVoted = song.votes.some(vote => vote.userId === userId)
              
              if (!alreadyVoted) {
                // Add new vote
                return {
                  ...song,
                  votes: [...song.votes, { id: "temp-id", songId, userId }]
                }
              }
            }
          }
          return song
        })

        // Sort songs by vote count
        const sortedSongs = [...updatedSongs].sort((a, b) => b.votes.length - a.votes.length)
        
        setSpaceDetails({
          ...spaceDetails,
          songs: sortedSongs
        })
      }
    } catch (err) {
      console.error("Error voting for song:", err)
      alert("Failed to vote for song. Please try again.")
    }
  }

  const copySpaceCode = () => {
    if (spaceDetails?.joinCode) {
      navigator.clipboard.writeText(spaceDetails.joinCode)
      alert("Space code copied to clipboard!")
    }
  }

  // Get user initials for avatar
  const getUserInitials = (name?: string) => {
    if (!name) return "U"
    
    const nameParts = name.split(" ")
    if (nameParts.length === 1) {
      return nameParts[0].substring(0, 2).toUpperCase()
    }
    
    return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2">Loading space...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-500">{error}</p>
          <Button asChild>
            <Link href="/">Go back home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="container flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1 border-white/10 bg-zinc-900">
                <Users className="h-3 w-3" />
                <span>{spaceDetails?.members.length || 0} listeners</span>
              </Badge>
              {spaceDetails && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 cursor-pointer bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20"
                  onClick={copySpaceCode}
                >
                  <span>{spaceDetails.joinCode}</span>
                  <Copy className="h-3 w-3 ml-1" />
                </Badge>
              )}
            </div>
            <Avatar>
              <AvatarImage src={"/placeholder.svg"} alt={spaceDetails?.owner.name || ""} />
              <AvatarFallback className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500">
                {getUserInitials(spaceDetails?.owner.name)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="relative container px-4 py-6">
        {/* Background gradient elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 blur-3xl"></div>
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 blur-3xl"></div>
        </div>

        <div className="relative z-10 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card className="overflow-hidden border border-white/10 bg-zinc-900">
              <CardContent className="p-0">
                <div className="aspect-video bg-black relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {currentlyPlaying ? (
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={`https://www.youtube.com/embed/${getYoutubeVideoId(currentlyPlaying.youtubeUrl)}`}
                        title="YouTube video player" 
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <Play className="h-16 w-16 text-blue-500/50" />
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-2xl font-bold">Now Playing</h2>
                  {currentlyPlaying ? (
                    <p className="text-gray-400">{currentlyPlaying.title} - {currentlyPlaying.addedBy.name}</p>
                  ) : (
                    <p className="text-gray-400">No songs in queue</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Add a Song</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Paste YouTube URL here..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="border-white/10 bg-zinc-900"
                />
                <Button 
                  className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-cyan-500 hover:via-indigo-500 hover:to-purple-600 border-0 transition-all duration-300" 
                  onClick={handleAddSong}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Card className="border border-white/10 bg-zinc-900">
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-4">Up Next</h3>
                <div className="space-y-3">
                  {spaceDetails?.songs.length ? (
                    spaceDetails.songs.map((song, index) => (
                      <div key={song.id} className="flex items-start space-x-3 rounded-lg p-2 hover:bg-black">
                        <div className="h-10 w-10 flex-shrink-0 rounded bg-black flex items-center justify-center">
                          <Music className="h-5 w-5 text-gray-500/50" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h5 className="line-clamp-1 font-medium">{song.title}</h5>
                          <p className="text-xs text-gray-400">Added by: {song.addedBy.name}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 flex items-center gap-1 hover:bg-black"
                          onClick={() => handleUpvote(song.id)}
                        >
                          <ThumbsUp className="h-4 w-4 text-green-500" />
                          <span className="text-xs">{song.votes.length}</span>
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No songs in queue. Add one!</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

// Helper function to extract YouTube video ID
function getYoutubeVideoId(url: string): string {
  // Handle different YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  
  return (match && match[2].length === 11) ? match[2] : ""
}