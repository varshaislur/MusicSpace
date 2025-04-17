"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Copy, Music, Play, ThumbsUp, Users } from "lucide-react"

import { useAuth } from "@/lib/auth-context"

export default function SpacePage() {
  const router = useRouter()
 
  
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [queue, setQueue] = useState([
    { id: 1, title: "Summer Vibes", artist: "DJ Cool", votes: 12 },
    { id: 2, title: "Midnight Dreams", artist: "Luna Sky", votes: 8 },
    { id: 3, title: "Electric Pulse", artist: "Neon Beats", votes: 5 },
  ])

  // Redirect if not authenticated
 

  const handleAddSong = () => {
    if (!youtubeUrl) return

    // In a real app, you would validate the URL and extract video info
    const newSong = {
      id: queue.length + 1,
      title: `New Song ${queue.length + 1}`,
      artist: "Added from YouTube",
      votes: 0,
    }

    setQueue([...queue, newSong])
    setYoutubeUrl("")

    alert("Song added to the queue!")
  }

  const handleUpvote = (id: number) => {
    const updatedQueue = queue
      .map((song) => (song.id === id ? { ...song, votes: song.votes + 1 } : song))
      .sort((a, b) => b.votes - a.votes)

    setQueue(updatedQueue)
  }

  const copySpaceCode = () => {
    navigator.clipboard.writeText("MUSIC1")
    alert("Space code copied to clipboard!")
  }

  // If not authenticated, don't render the content
  

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
                <span>8 listeners</span>
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 cursor-pointer bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20"
                onClick={copySpaceCode}
              >
                <span>MUSIC1</span>
                <Copy className="h-3 w-3 ml-1" />
              </Badge>
            </div>
            <Avatar>
              <AvatarImage src={"/placeholder.svg"} alt="varsha" />
              <AvatarFallback className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500">
               VA
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
                    <Play className="h-16 w-16 text-blue-500/50" />
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-2xl font-bold">Now Playing</h2>
                  <p className="text-gray-400">Summer Vibes - DJ Cool</p>
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
                  {queue.map((song) => (
                    <div key={song.id} className="flex items-start space-x-3 rounded-lg p-2 hover:bg-black">
                      <div className="h-10 w-10 flex-shrink-0 rounded bg-black flex items-center justify-center">
                        <Music className="h-5 w-5 text-gray-500/50" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h5 className="line-clamp-1 font-medium">{song.title}</h5>
                        <p className="text-xs text-gray-400">{song.artist}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 flex items-center gap-1 hover:bg-black"
                        onClick={() => handleUpvote(song.id)}
                      >
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                        <span className="text-xs">{song.votes}</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}