"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Music, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SpacesPage() {
  const router = useRouter()
  const [createSpaceName, setCreateSpaceName] = useState("")
  const [userName, setUserName] = useState("")
  const [joinCode, setJoinCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const BACKEND_URL= process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
  
  // Get user details from localStorage on component mount
  useEffect(() => {
    try {
      const userData = localStorage.getItem("musicSpaceUser")
      if (userData) {
        const user = JSON.parse(userData)
        setUserName(user.name || "")
      }
    } catch (error) {
      console.error("Error getting user data:", error)
    }
  }, [])

  interface CreateSpaceResponse {
    id: string;
    name: string;
    joinCode: string;
  }

  const handleCreateSpace = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!createSpaceName.trim()) {
      setError("Please enter a space name");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const token = localStorage.getItem("musicSpaceToken");
      if (!token) {
        throw new Error("Authentication required");
      }
            
      const response = await fetch(`${BACKEND_URL}/api/space/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: createSpaceName
        })
      });
      
      if (!response.ok) {
        throw new Error("Failed to create space");
      }
      
      const spaceData: CreateSpaceResponse = await response.json();
      setSuccessMessage(`Space created successfully! Share code: ${spaceData.joinCode}`);
      
      // Store space info in localStorage
      localStorage.setItem("currentSpace", JSON.stringify(spaceData));
      
      // Navigate to space page after short delay to show success message
      setTimeout(() => {
        router.push(`/space/${spaceData.id}`);
      }, 1500);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    } catch (error: any) {
      console.error("Error creating space:", error);
      setError(error.message || "Failed to create space. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  interface JoinSpaceResponse {
    space: {
      id: string;
      name: string;
    };
  }

  const handleJoinSpace = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!joinCode.trim()) {
      setError("Please enter a join code");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const token = localStorage.getItem("musicSpaceToken");
      if (!token) {
        throw new Error("Authentication required");
      }
      
      const response = await fetch(`${BACKEND_URL}/api/space/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          joinCode: joinCode
        })
      });
      
      if (!response.ok) {
        throw new Error("Failed to join space");
      }
      
      const joinData: JoinSpaceResponse = await response.json();
      setSuccessMessage(`Joined space: ${joinData.space.name} successfully!`);
      
      // Store space info in localStorage
      localStorage.setItem("currentSpace", JSON.stringify(joinData.space));
      
      // Navigate to space page after short delay to show success message
      setTimeout(() => {
        router.push(`/space/${joinData.space.id}`);
      }, 1500);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      
    } catch (error: any) {
      console.error("Error joining space:", error);
      setError(error.message || "Failed to join space. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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

          {/* Success/Error messages */}
          {successMessage && (
            <div className="mx-auto max-w-[800px] mb-6">
              <Alert className="border-green-500 bg-green-500/10">
                <AlertCircle className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-500">{successMessage}</AlertDescription>
              </Alert>
            </div>
          )}
          
          {error && (
            <div className="mx-auto max-w-[800px] mb-6">
              <Alert className="border-red-500 bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-red-500">{error}</AlertDescription>
              </Alert>
            </div>
          )}

          <div className="mx-auto max-w-[800px]">
            <Tabs defaultValue="create" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="create">Create a Space</TabsTrigger>
                <TabsTrigger value="join">Join a Space</TabsTrigger>
              </TabsList>
              <TabsContent value="create" className="mt-6">
                <Card style={{ borderColor: "rgba(255, 255, 255, 0.1)", backgroundColor: "hsl(240, 10%, 5%)" }}>
                  <form onSubmit={handleCreateSpace}>
                    <CardHeader>
                      <CardTitle>Create Your Music Space</CardTitle>
                      <CardDescription>Set up a new space where you can add songs and invite friends.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="space-name" className="text-sm font-medium leading-none">
                          Space Name
                        </label>
                        <Input 
                          id="space-name" 
                          placeholder="My Awesome Playlist" 
                          value={createSpaceName}
                          onChange={(e) => setCreateSpaceName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="your-name" className="text-sm font-medium leading-none">
                          Your Name
                        </label>
                        <Input 
                          id="your-name" 
                          placeholder="DJ Awesome" 
                          value={userName} 
                          onChange={(e) => setUserName(e.target.value)}
                          disabled
                        />
                        <p className="text-xs text-muted-foreground">This is your account name</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        type="submit"
                        className="w-full border-0" 
                        disabled={isLoading}
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
                        {isLoading ? "Creating..." : "Create Space"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              <TabsContent value="join" className="mt-6">
                <Card style={{ borderColor: "rgba(255, 255, 255, 0.1)", backgroundColor: "hsl(240, 10%, 5%)" }}>
                  <form onSubmit={handleJoinSpace}>
                    <CardHeader>
                      <CardTitle>Join an Existing Space</CardTitle>
                      <CardDescription>Enter a space code to join your friends' music queue.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="space-code" className="text-sm font-medium leading-none">
                          Space Code
                        </label>
                        <Input 
                          id="space-code" 
                          placeholder="Enter 6-digit code" 
                          value={joinCode}
                          onChange={(e) => setJoinCode(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="your-name-join" className="text-sm font-medium leading-none">
                          Your Name
                        </label>
                        <Input 
                          id="your-name-join" 
                          placeholder="Your display name" 
                          value={userName} 
                          onChange={(e) => setUserName(e.target.value)}
                          disabled
                        />
                        <p className="text-xs text-muted-foreground">This is your account name</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        type="submit"
                        className="w-full border-0" 
                        disabled={isLoading}
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
                        {isLoading ? "Joining..." : "Join Space"}
                      </Button>
                    </CardFooter>
                  </form>
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
                  <span>Enter the code to join their space</span>
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