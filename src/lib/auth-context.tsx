"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  image: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("musicspace_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Mock Google sign in
  const signInWithGoogle = async () => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock user data
    const mockUser: User = {
      id: "user_" + Math.random().toString(36).substring(2, 9),
      name: "Music Lover",
      email: "user@example.com",
      image: "/placeholder.svg?height=40&width=40",
    }

    setUser(mockUser)
    localStorage.setItem("musicspace_user", JSON.stringify(mockUser))
    setIsLoading(false)

    return Promise.resolve()
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("musicspace_user")
  }

  return <AuthContext.Provider value={{ user, isLoading, signInWithGoogle, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
