"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Music } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function SpacesPage() {
  const router = useRouter()
  const { user } = useAuth()

  // Redirect to login if not authenticated
  if (!user) {
    router.push("/login")
    return null
  }

  const handleCreateSpace = () => {
    router.push("/space")
  }

  const handleJoinSpace = () => {
    router.push("/space")
  }

  return (
    <div className="min-h-screen text-foreground" style={{ backgroundColor: "hsl(240, 10%, 3.9%)" }}>
      {/* Join/Create Space Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
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
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" style={{ 
                backgroundImage: "linear-gradient(90deg, #36d45a, #22b8cf, #3b82f6, #8b5cf6, #a855f7)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                Your Music Space
              </h1>
              <p className="mx-auto max-w-[700px] md:text-xl" style={{ color: "hsl(240, 5%, 64.9%)" }}>
                Create your own space or join an existing one to start the music journey.
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-[800px]">
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
                      <Input id="your-name" placeholder="DJ Awesome" defaultValue="varsha"/>
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
                      <Input id="your-name-join" placeholder="Your display name" defaultValue="varsha" />
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
          </div>
        </div>
      </section>

      {/* Quick Instructions Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-dark-800/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-dark-900 p-2">
                <Plus className="h-6 w-6" style={{ color: "#36d45a" }} />
              </div>
              <h3 className="text-xl font-bold">Creating a Space</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <span className="mr-2">1.</span>
                  <span>Name your space something memorable</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">2.</span>
                  <span>Share the generated code with friends</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">3.</span>
                  <span>Add songs to start the playlist</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">4.</span>
                  <span>Control playback as the host</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-dark-900 p-2">
                <Music className="h-6 w-6" style={{ color: "#3b82f6" }} />
              </div>
              <h3 className="text-xl font-bold">Joining a Space</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <span className="mr-2">1.</span>
                  <span>Get a 6-digit code from a friend</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">2.</span>
                  <span>Enter your display name</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">3.</span>
                  <span>Suggest songs for the queue</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">4.</span>
                  <span>Vote on songs to influence the playlist</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}