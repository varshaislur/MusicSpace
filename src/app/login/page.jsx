"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Music } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { signInWithGoogle } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signInWithGoogle()
      // Note: No need to redirect manually as NextAuth handles this with callbackUrl
    } catch (error) {
      console.error("Login failed:", error)
      setIsLoading(false) // Only need to reset loading if there's an error
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
          <div className="flex flex-col items-center justify-center p-8">
            <Image
              src="/placeholder.svg?height=200&width=200"
              width={200}
              height={200}
              alt="Music illustration"
              className="mb-8 rounded-lg"
            />
            <p className="text-center mb-4 text-gray-400">
              Create collaborative music queues where friends can join, vote, and enjoy music together in real-time.
            </p>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 hover:bg-gray-100"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 0, 0)">
                <path
                  d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z"
                  fill="#4285F4"
                ></path>
              </g>
            </svg>
            {isLoading ? "Signing in..." : "Sign in with Google"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}