"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, Users, Heart, Headphones, Share2, Vote, Zap, Globe } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen text-foreground" style={{ backgroundColor: "hsl(240, 10%, 3.9%)" }}>
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
        {/* Background gradient elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-1/4 top-0 h-64 w-64 rounded-full blur-3xl" style={{ 
            background: "linear-gradient(135deg, #36d45a 0%, #22b8cf 25%, #3b82f6 50%, #8b5cf6 75%, #a855f7 100%)" 
          }}></div>
          <div className="absolute -right-1/4 bottom-0 h-64 w-64 rounded-full blur-3xl" style={{ 
            background: "linear-gradient(135deg, #36d45a 0%, #22b8cf 25%, #3b82f6 50%, #8b5cf6 75%, #a855f7 100%)" 
          }}></div>
          <div className="absolute left-1/2 top-1/2 h-32 w-32 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" style={{ 
            background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)" 
          }}></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl" style={{ 
                backgroundImage: "linear-gradient(90deg, #36d45a, #22b8cf, #3b82f6, #8b5cf6, #a855f7)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                About Music Space
              </h1>
              <p className="mx-auto max-w-[800px] text-lg md:text-xl" style={{ color: "hsl(240, 5%, 64.9%)" }}>
                Connecting people through music, one shared playlist at a time. Create collaborative spaces 
                where friends can discover, vote, and enjoy music together in real-time.
              </p>
            </div>
            
          
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32" style={{ backgroundColor: "hsl(240, 10%, 5%)" }}>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" style={{ 
              backgroundImage: "linear-gradient(90deg, #36d45a, #22b8cf, #3b82f6)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Why Music Space?
            </h2>
            <p className="mx-auto max-w-[700px] md:text-lg" style={{ color: "hsl(240, 5%, 64.9%)" }}>
              Experience music like never before with collaborative playlists and real-time social features.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card style={{ borderColor: "rgba(255, 255, 255, 0.1)", backgroundColor: "hsl(240, 10%, 7%)" }}>
              <CardHeader>
                <div className="inline-block rounded-lg p-2" style={{ backgroundColor: "rgba(54, 212, 90, 0.1)" }}>
                  <Users className="h-6 w-6" style={{ color: "#36d45a" }} />
                </div>
                <CardTitle>Collaborative Playlists</CardTitle>
                <CardDescription>
                  Create shared music spaces where everyone can add their favorite songs and build the perfect playlist together.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card style={{ borderColor: "rgba(255, 255, 255, 0.1)", backgroundColor: "hsl(240, 10%, 7%)" }}>
              <CardHeader>
                <div className="inline-block rounded-lg p-2" style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}>
                  <Vote className="h-6 w-6" style={{ color: "#3b82f6" }} />
                </div>
                <CardTitle>Democratic Voting</CardTitle>
                <CardDescription>
                  Let the crowd decide! Vote on songs to influence what plays next and discover new music through community choice.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card style={{ borderColor: "rgba(255, 255, 255, 0.1)", backgroundColor: "hsl(240, 10%, 7%)" }}>
              <CardHeader>
                <div className="inline-block rounded-lg p-2" style={{ backgroundColor: "rgba(139, 92, 246, 0.1)" }}>
                  <Zap className="h-6 w-6" style={{ color: "#8b5cf6" }} />
                </div>
                <CardTitle>Real-Time Sync</CardTitle>
                <CardDescription>
                  Experience synchronized playback across all devices. Everyone hears the same song at the same time, perfectly in sync.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card style={{ borderColor: "rgba(255, 255, 255, 0.1)", backgroundColor: "hsl(240, 10%, 7%)" }}>
              <CardHeader>
                <div className="inline-block rounded-lg p-2" style={{ backgroundColor: "rgba(34, 184, 207, 0.1)" }}>
                  <Share2 className="h-6 w-6" style={{ color: "#22b8cf" }} />
                </div>
                <CardTitle>Easy Sharing</CardTitle>
                <CardDescription>
                  Share your music space with a simple 6-digit code. No complex invitations or lengthy setup processes required.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card style={{ borderColor: "rgba(255, 255, 255, 0.1)", backgroundColor: "hsl(240, 10%, 7%)" }}>
              <CardHeader>
                <div className="inline-block rounded-lg p-2" style={{ backgroundColor: "rgba(168, 85, 247, 0.1)" }}>
                  <Headphones className="h-6 w-6" style={{ color: "#a855f7" }} />
                </div>
                <CardTitle>High-Quality Audio</CardTitle>
                <CardDescription>
                  Enjoy crystal-clear sound quality with optimized streaming that adapts to your connection for the best listening experience.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card style={{ borderColor: "rgba(255, 255, 255, 0.1)", backgroundColor: "hsl(240, 10%, 7%)" }}>
              <CardHeader>
                <div className="inline-block rounded-lg p-2" style={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}>
                  <Globe className="h-6 w-6" style={{ color: "#10b981" }} />
                </div>
                <CardTitle>Cross-Platform</CardTitle>
                <CardDescription>
                  Access your music spaces from any device - desktop, mobile, or tablet. Your music follows you wherever you go.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" style={{ 
                backgroundImage: "linear-gradient(90deg, #8b5cf6, #a855f7, #ec4899)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                Our Mission
              </h2>
              <div className="space-y-4" style={{ color: "hsl(240, 5%, 64.9%)" }}>
                <p className="text-lg">
                  Music has the power to bring people together, create memories, and strengthen relationships. 
                  At Music Space, we believe that sharing music should be as natural as sharing a conversation.
                </p>
                <p className="text-lg">
                  We're building a platform that breaks down the barriers between listeners, allowing friends, 
                  families, and communities to create shared musical experiences regardless of distance or device.
                </p>
                <p className="text-lg">
                  Whether you're hosting a party, working with colleagues, or just hanging out with friends online, 
                  Music Space makes it easy to create the perfect soundtrack for your moment.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-4 h-32 w-32 rounded-full blur-2xl" style={{ 
                  background: "linear-gradient(135deg, #36d45a 0%, #22b8cf 100%)" 
                }}></div>
                <div className="absolute bottom-4 right-4 h-24 w-24 rounded-full blur-xl" style={{ 
                  background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)" 
                }}></div>
              </div>
              <Card style={{ borderColor: "rgba(255, 255, 255, 0.1)", backgroundColor: "hsl(240, 10%, 7%)" }}>
                <CardHeader className="pb-4">
                  <div className="inline-block rounded-lg p-3" style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}>
                    <Heart className="h-8 w-8" style={{ color: "#ef4444" }} />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold mb-3">Built with Love</h3>
                  <p style={{ color: "hsl(240, 5%, 64.9%)" }}>
                    Every feature in Music Space is designed with user experience and community in mind. 
                    We're passionate about creating technology that enhances human connection through music.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32" style={{ backgroundColor: "hsl(240, 10%, 5%)" }}>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" style={{ 
              backgroundImage: "linear-gradient(90deg, #22b8cf, #3b82f6, #8b5cf6)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              How It Works
            </h2>
            <p className="mx-auto max-w-[700px] md:text-lg" style={{ color: "hsl(240, 5%, 64.9%)" }}>
              Getting started with Music Space is simple and intuitive.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center space-y-4">
              <div className="mx-auto inline-block rounded-full p-4" style={{ backgroundColor: "rgba(54, 212, 90, 0.1)" }}>
                <div className="rounded-full p-2" style={{ backgroundColor: "rgba(54, 212, 90, 0.2)" }}>
                  <span className="text-2xl font-bold" style={{ color: "#36d45a" }}>1</span>
                </div>
              </div>
              <h3 className="text-xl font-bold">Create or Join</h3>
              <p style={{ color: "hsl(240, 5%, 64.9%)" }}>
                Start by creating a new music space or joining an existing one with a simple 6-digit code.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto inline-block rounded-full p-4" style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}>
                <div className="rounded-full p-2" style={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}>
                  <span className="text-2xl font-bold" style={{ color: "#3b82f6" }}>2</span>
                </div>
              </div>
              <h3 className="text-xl font-bold">Add Music</h3>
              <p style={{ color: "hsl(240, 5%, 64.9%)" }}>
                Search and add your favorite songs to the shared playlist. Everyone can contribute to the queue.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto inline-block rounded-full p-4" style={{ backgroundColor: "rgba(139, 92, 246, 0.1)" }}>
                <div className="rounded-full p-2" style={{ backgroundColor: "rgba(139, 92, 246, 0.2)" }}>
                  <span className="text-2xl font-bold" style={{ color: "#8b5cf6" }}>3</span>
                </div>
              </div>
              <h3 className="text-xl font-bold">Enjoy Together</h3>
              <p style={{ color: "hsl(240, 5%, 64.9%)" }}>
                Listen in perfect sync with your friends, vote on songs, and discover new music together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" style={{ 
                backgroundImage: "linear-gradient(90deg, #36d45a, #22b8cf, #3b82f6, #8b5cf6, #a855f7)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                Ready to Get Started?
              </h2>
              <p className="mx-auto max-w-[600px] md:text-lg" style={{ color: "hsl(240, 5%, 64.9%)" }}>
                Join thousands of users who are already creating amazing shared music experiences.
              </p>
            </div>
            
      
          </div>
        </div>
      </section>
    </div>
  )
}