import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Music, Play, Plus, ThumbsUp, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 border-b bg-gradient-to-br from-gray-900 via-purple-900/40 to-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Create Your Music Space
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Create a collaborative music queue where friends can join, vote, and enjoy music together in real-time.
              </p>
            </div>
            <div className="space-x-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
              >
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:text-purple-300">
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
            <Tabs defaultValue="create" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="create">Create a Space</TabsTrigger>
                <TabsTrigger value="join">Join a Space</TabsTrigger>
              </TabsList>
              <TabsContent value="create" className="mt-6">
                <Card>
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
                      <Input id="your-name" placeholder="DJ Awesome" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0">
                      Create Space
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="join" className="mt-6">
                <Card>
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
                      <Input id="your-name-join" placeholder="Your display name" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0">
                      Join Space
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-purple-950/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                How It Works
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Create a space, add songs, invite friends, and enjoy music together.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-600">
                  <Plus className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Create a Space</h3>
                <p className="text-muted-foreground">
                  Start your own music space and get a unique code to share with friends.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-600">
                  <Music className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Add Songs</h3>
                <p className="text-muted-foreground">
                  Paste YouTube URLs to add songs to your queue as the space owner.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-600">
                  <ThumbsUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Vote & Enjoy</h3>
                <p className="text-muted-foreground">Everyone can upvote songs to move them up in the queue.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-t from-background to-purple-950/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Preview the Experience
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                See what your music space will look like.
              </p>
            </div>
            <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-lg border bg-gradient-to-br from-gray-900 to-purple-950/50 shadow-xl">
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center space-x-2">
                  <Music className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold">Party Mix</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">8 listeners</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="col-span-2 border-r p-4">
                  <div className="mb-4">
                    <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
                      <div className="flex h-full items-center justify-center">
                        <Play className="h-12 w-12 text-muted-foreground/50" />
                      </div>
                    </div>
                    <h4 className="mt-2 font-medium">Now Playing: Summer Hits 2023</h4>
                    <p className="text-sm text-muted-foreground">Artist Name</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                      <div>
                        <h5 className="font-medium">Add a song</h5>
                        <p className="text-xs text-muted-foreground">Paste a YouTube URL</p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
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
                      <div key={i} className="flex items-start space-x-3 rounded-lg p-2 hover:bg-muted/50">
                        <div className="h-10 w-10 flex-shrink-0 rounded bg-muted">
                          <div className="flex h-full items-center justify-center">
                            <Music className="h-5 w-5 text-muted-foreground/50" />
                          </div>
                        </div>
                        <div className="flex-1 space-y-1">
                          <h5 className="line-clamp-1 font-medium">Song Title {i}</h5>
                          <p className="text-xs text-muted-foreground">Artist {i}</p>
                        </div>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <ThumbsUp className="h-4 w-4" />
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
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2023 MusicSpace. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
