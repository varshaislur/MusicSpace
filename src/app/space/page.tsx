"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Copy, Music, Play, ThumbsUp, Users } from "lucide-react"


export default function SpacePage() {
  
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [queue, setQueue] = useState([
    { id: 1, title: "Summer Vibes", artist: "DJ Cool", votes: 12 },
    { id: 2, title: "Midnight Dreams", artist: "Luna Sky", votes: 8 },
    { id: 3, title: "Electric Pulse", artist: "Neon Beats", votes: 5 },
  ])

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

    
  }

  const handleUpvote = (id: number) => {
    const updatedQueue = queue
      .map((song) => (song.id === id ? { ...song, votes: song.votes + 1 } : song))
      .sort((a, b) => b.votes - a.votes)

    setQueue(updatedQueue)
  }

  const copySpaceCode = () => {
    navigator.clipboard.writeText("MUSIC1")
    
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-gradient-to-r from-gray-900 via-purple-950/30 to-gray-900">
        <div className="container flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="flex items-center gap-1 bg-gradient-to-r from-gray-800 to-purple-950/50 border-purple-800/50"
              >
                <Users className="h-3 w-3" />
                <span>8 listeners</span>
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 cursor-pointer bg-gradient-to-r from-purple-600/20 to-pink-600/20"
                onClick={copySpaceCode}
              >
                <span>MUSIC1</span>
                <Copy className="h-3 w-3 ml-1" />
              </Badge>
            </div>
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600">DJ</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card className="overflow-hidden border border-purple-800/20">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-purple-950 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-16 w-16 text-purple-400/50" />
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-b from-transparent to-purple-950/10">
                  <h2 className="text-2xl font-bold">Now Playing</h2>
                  <p className="text-muted-foreground">Summer Vibes - DJ Cool</p>
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
                />
                <Button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
                  onClick={handleAddSong}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Card>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-4">Up Next</h3>
                <div className="space-y-3">
                  {queue.map((song) => (
                    <div key={song.id} className="flex items-start space-x-3 rounded-lg p-2 hover:bg-muted/50">
                      <div className="h-10 w-10 flex-shrink-0 rounded bg-muted flex items-center justify-center">
                        <Music className="h-5 w-5 text-muted-foreground/50" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h5 className="line-clamp-1 font-medium">{song.title}</h5>
                        <p className="text-xs text-muted-foreground">{song.artist}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 flex items-center gap-1 hover:bg-purple-500/10"
                        onClick={() => handleUpvote(song.id)}
                      >
                        <ThumbsUp className="h-4 w-4 text-purple-400" />
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
