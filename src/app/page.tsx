"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Music, Play, Plus, ThumbsUp, Users } from "lucide-react"
import { useAuth } from "@/lib/auth-context"


export default function Home() {
  const router = useRouter()
  const { user } = useAuth()

  const handleCreateSpace = () => {
    if (!user) {
      alert("Please sign in to create a space")
      router.push("/login")
      return
    }

    router.push("/space")
  }

  const handleJoinSpace = () => {
    if (!user) {
      alert("Please sign in to join a space")
      router.push("/login")
      return
    }

    router.push("/space")
  }

  return (
    <div className="min-h-screen text-foreground" style={{ backgroundColor: "hsl(240, 10%, 3.9%)" }}>
      {/* Hero Section with gradient background */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 border-b overflow-hidden" style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}>
        {/* Background gradient element */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-1/4 top-0 h-64 w-64 rounded-full blur-3xl" style={{ 
            background: "linear-gradient(135deg, #36d45a 0%, #22b8cf 25%, #3b82f6 50%, #8b5cf6 75%, #a855f7 100%)" 
          }}></div>
          <div className="absolute -right-1/4 bottom-0 h-64 w-64 rounded-full blur-3xl" style={{ 
            background: "linear-gradient(135deg, #36d45a 0%, #22b8cf 25%, #3b82f6 50%, #8b5cf6 75%, #a855f7 100%)" 
          }}></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl" style={{ 
                backgroundImage: "linear-gradient(90deg, #36d45a, #22b8cf, #3b82f6, #8b5cf6, #a855f7)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                Create Your Music Space
              </h1>
              <p className="mx-auto max-w-[700px] md:text-xl" style={{ color: "hsl(240, 5%, 64.9%)" }}>
                Create a collaborative music queue where friends can join, vote, and enjoy music together in real-time.
              </p>
            </div>
            <div className="space-x-4">
              {user ? (
                <Button 
                  size="lg" 
                  className="border-0" 
                  onClick={handleCreateSpace}
                  style={{ 
                    backgroundImage: "linear-gradient(90deg, #36d45a, #3b82f6, #8b5cf6)",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundImage = "linear-gradient(90deg, #22b8cf, #6366f1, #a855f7)"
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundImage = "linear-gradient(90deg, #36d45a, #3b82f6, #8b5cf6)"
                  }}
                >
                  Get Started
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  className="border-0" 
                  asChild
                  style={{ 
                    backgroundImage: "linear-gradient(90deg, #36d45a, #3b82f6, #8b5cf6)",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundImage = "linear-gradient(90deg, #22b8cf, #6366f1, #a855f7)"
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundImage = "linear-gradient(90deg, #36d45a, #3b82f6, #8b5cf6)"
                  }}
                >
                  <Link href="/login">Sign In to Start</Link>
                </Button>
              )}
              <Button
                size="lg"
                variant="outline"
                style={{ borderColor: "#3b82f6", color: "#3b82f6" }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "#22b8cf";
                  e.currentTarget.style.color = "#22b8cf";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#3b82f6";
                  e.currentTarget.style.color = "#3b82f6";
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Create or Join Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-[800px]">
            {user ? (
              <Tabs defaultValue="create" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="create">Create a Space</TabsTrigger>
                  <TabsTrigger value="join">Join a Space</TabsTrigger>
                </TabsList>
                <TabsContent value="create" className="mt-6">
                  <Card style={{ borderColor: "rgba(255, 255, 255, 0.1)", backgroundColor: "hsl(240, 10%, 5%)" }}>
                    <CardHeader>
                      <CardTitle>Create Your Music Space</CardTitle>
                      <CardDescription>Set up a new space where you can add songs and invite friends.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="space-name" className="text-sm font-medium leading-none">
                          Space Name
                        </label>
                        <Input id="space-name" placeholder="My Awesome Playlist" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="your-name" className="text-sm font-medium leading-none">
                          Your Name
                        </label>
                        <Input id="your-name" placeholder="DJ Awesome" defaultValue={user.name} />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full border-0" 
                        onClick={handleCreateSpace}
                        style={{ 
                          backgroundImage: "linear-gradient(90deg, #36d45a, #3b82f6, #8b5cf6)",
                          transition: "all 0.3s ease"
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundImage = "linear-gradient(90deg, #22b8cf, #6366f1, #a855f7)"
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundImage = "linear-gradient(90deg, #36d45a, #3b82f6, #8b5cf6)"
                        }}
                      >
                        Create Space
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="join" className="mt-6">
                  <Card style={{ borderColor: "rgba(255, 255, 255, 0.1)", backgroundColor: "hsl(240, 10%, 5%)" }}>
                    <CardHeader>
                      <CardTitle>Join an Existing Space</CardTitle>
                      <CardDescription>Enter a space code to join your friends' music queue.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="space-code" className="text-sm font-medium leading-none">
                          Space Code
                        </label>
                        <Input id="space-code" placeholder="Enter 6-digit code" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="your-name-join" className="text-sm font-medium leading-none">
                          Your Name
                        </label>
                        <Input id="your-name-join" placeholder="Your display name" defaultValue={user.name} />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full border-0" 
                        onClick={handleJoinSpace}
                        style={{ 
                          backgroundImage: "linear-gradient(90deg, #36d45a, #3b82f6, #8b5cf6)",
                          transition: "all 0.3s ease"
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundImage = "linear-gradient(90deg, #22b8cf, #6366f1, #a855f7)"
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundImage = "linear-gradient(90deg, #36d45a, #3b82f6, #8b5cf6)"
                        }}
                      >
                        Join Space
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <Card style={{ borderColor: "rgba(255, 255, 255, 0.1)", backgroundColor: "hsl(240, 10%, 5%)" }}>
                <CardHeader>
                  <CardTitle>Sign in to get started</CardTitle>
                  <CardDescription>
                    You need to sign in with your Google account to create or join a music space.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center py-6">
                  <Button 
                    className="border-0" 
                    asChild
                    style={{ 
                      backgroundImage: "linear-gradient(90deg, #36d45a, #3b82f6, #8b5cf6)",
                      transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundImage = "linear-gradient(90deg, #22b8cf, #6366f1, #a855f7)"
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundImage = "linear-gradient(90deg, #36d45a, #3b82f6, #8b5cf6)"
                    }}
                  >
                    <Link href="/login">Sign In with Google</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
        {/* Background gradient element */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-0 h-40 w-40 rounded-full blur-3xl" style={{ 
            background: "linear-gradient(135deg, #36d45a 0%, #22b8cf 25%, #3b82f6 50%, #8b5cf6 75%, #a855f7 100%)" 
          }}></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" style={{ 
                backgroundImage: "linear-gradient(90deg, #36d45a, #22b8cf, #3b82f6, #8b5cf6, #a855f7)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                How It Works
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl" style={{ color: "hsl(240, 5%, 64.9%)" }}>
                Create a space, add songs, invite friends, and enjoy music together.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ 
                  background: "linear-gradient(135deg, #36d45a 0%, #22b8cf 25%, #3b82f6 50%, #8b5cf6 75%, #a855f7 100%)" 
                }}>
                  <Plus className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Create a Space</h3>
                <p style={{ color: "hsl(240, 5%, 64.9%)" }}>
                  Start your own music space and get a unique code to share with friends.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ 
                  background: "linear-gradient(135deg, #36d45a 0%, #22b8cf 25%, #3b82f6 50%, #8b5cf6 75%, #a855f7 100%)" 
                }}>
                  <Music className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Add Songs</h3>
                <p style={{ color: "hsl(240, 5%, 64.9%)" }}>
                  Paste YouTube URLs to add songs to your queue as the space owner.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ 
                  background: "linear-gradient(135deg, #36d45a 0%, #22b8cf 25%, #3b82f6 50%, #8b5cf6 75%, #a855f7 100%)" 
                }}>
                  <ThumbsUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Vote & Enjoy</h3>
                <p style={{ color: "hsl(240, 5%, 64.9%)" }}>Everyone can upvote songs to move them up in the queue.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
        {/* Background gradient element */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-1/4 bottom-0 h-40 w-40 rounded-full blur-3xl" style={{ 
            background: "linear-gradient(135deg, #36d45a 0%, #22b8cf 25%, #3b82f6 50%, #8b5cf6 75%, #a855f7 100%)" 
          }}></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" style={{ 
                backgroundImage: "linear-gradient(90deg, #36d45a, #22b8cf, #3b82f6, #8b5cf6, #a855f7)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                Preview the Experience
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl" style={{ color: "hsl(240, 5%, 64.9%)" }}>
                See what your music space will look like.
              </p>
            </div>
            <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-lg border shadow-xl" 
              style={{ borderColor: "rgba(255, 255, 255, 0.1)", backgroundColor: "hsl(240, 10%, 5%)" }}>
              <div className="flex items-center justify-between border-b p-4" style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}>
                <div className="flex items-center space-x-2">
                  <Music className="h-5 w-5" style={{ color: "#36d45a" }} />
                  <h3 className="font-semibold">Party Mix</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" style={{ color: "hsl(240, 5%, 64.9%)" }} />
                  <span className="text-sm" style={{ color: "hsl(240, 5%, 64.9%)" }}>8 listeners</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="col-span-2 border-r p-4" style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}>
                  <div className="mb-4">
                    <div className="aspect-video w-full overflow-hidden rounded-lg" style={{ backgroundColor: "hsl(240, 10%, 3.9%)" }}>
                      <div className="flex h-full items-center justify-center">
                        <Play className="h-12 w-12" style={{ color: "rgba(156, 163, 175, 0.5)" }} />
                      </div>
                    </div>
                    <h4 className="mt-2 font-medium">Now Playing: Summer Hits 2023</h4>
                    <p className="text-sm" style={{ color: "hsl(240, 5%, 64.9%)" }}>Artist Name</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-lg p-3" style={{ backgroundColor: "hsl(240, 10%, 3.9%)" }}>
                      <div>
                        <h5 className="font-medium">Add a song</h5>
                        <p className="text-xs" style={{ color: "hsl(240, 5%, 64.9%)" }}>Paste a YouTube URL</p>
                      </div>
                      <Button 
                        size="sm" 
                        className="border-0"
                        style={{ 
                          backgroundImage: "linear-gradient(90deg, #36d45a, #3b82f6, #8b5cf6)",
                          transition: "all 0.3s ease"
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundImage = "linear-gradient(90deg, #22b8cf, #6366f1, #a855f7)"
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundImage = "linear-gradient(90deg, #36d45a, #3b82f6, #8b5cf6)"
                        }}
                      >
                        Add
                      </Button>
                    </div>
                    <Input placeholder="https://youtube.com/watch?v=..." />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="mb-4 font-semibold">Up Next</h4>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start space-x-3 rounded-lg p-2 hover:bg-dark-900" 
                        style={{ 
                          backgroundColor: "hsl(240, 10%, 3.9%)"}}>
                        <div className="h-10 w-10 flex-shrink-0 rounded" style={{ backgroundColor: "hsl(240, 10%, 3.9%)" }}>
                          <div className="flex h-full items-center justify-center">
                            <Music className="h-5 w-5" style={{ color: "rgba(156, 163, 175, 0.5)" }} />
                          </div>
                        </div>
                        <div className="flex-1 space-y-1">
                          <h5 className="line-clamp-1 font-medium">Song Title {i}</h5>
                          <p className="text-xs" style={{ color: "hsl(240, 5%, 64.9%)" }}>Artist {i}</p>
                        </div>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <ThumbsUp className="h-4 w-4" style={{ color: "#3b82f6" }} />
                          <span className="ml-1 text-xs">{5 * i}</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0" style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}>
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose md:text-left" style={{ color: "hsl(240, 5%, 64.9%)" }}>
            © 2023 MusicSpace. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-sm underline-offset-4 hover:underline" style={{ color: "hsl(240, 5%, 64.9%)" }}>
              Terms
            </Link>
            <Link href="#" className="text-sm underline-offset-4 hover:underline" style={{ color: "hsl(240, 5%, 64.9%)" }}>
              Privacy
            </Link>
            <Link href="#" className="text-sm underline-offset-4 hover:underline" style={{ color: "hsl(240, 5%, 64.9%)" }}>
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}