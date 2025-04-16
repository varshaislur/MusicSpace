"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Music } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSignIn = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    try {
      // Call the signIn function from auth context with email and password
      await signIn(email, password)
      
      // For now using dummy data, redirect to joinspace page
      router.push("/joinspace")
    } catch (error) {
      console.error("Login failed:", error)
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex items-center justify-center p-4 overflow-hidden min-h-[calc(100vh-4rem)]">
      {/* Background gradient elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-1/4 top-0 h-64 w-64 rounded-full blur-3xl bg-gradient-to-br from-green-400 via-blue-500 to-purple-500"></div>
        <div className="absolute -right-1/4 bottom-0 h-64 w-64 rounded-full blur-3xl bg-gradient-to-br from-green-400 via-blue-500 to-purple-500"></div>
      </div>
      
      <Card className="relative z-10 w-full max-w-md border backdrop-blur-sm bg-black/80 border-white/10">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-400 via-blue-500 to-purple-500">
              <Music className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Welcome to MusicSpace
          </CardTitle>
          <CardDescription>Sign in to create or join music spaces with your friends</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <form onSubmit={handleSignIn}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-black/50 border-white/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  type="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-black/50 border-white/20"
                />
              </div>
              
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </form>
          
          <div className="text-center pt-4">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto text-blue-400 hover:text-blue-300"
                onClick={() => router.push("/register")}
              >
                Register
              </Button>
            </p>
          </div>
          
          <div className="flex flex-col items-center justify-center pt-4">
            <Image
              src="/api/placeholder/200/120"
              width={200}
              height={120}
              alt="Music illustration"
              className="rounded-lg"
            />
            <p className="text-center mt-4 text-gray-400 text-sm">
              Create collaborative music queues where friends can join, vote, and enjoy music together in real-time.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}