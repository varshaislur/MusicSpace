"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { signIn, signOut as nextAuthSignOut, useSession } from "next-auth/react"

type User = {
  id: string
  name: string | null | undefined
  email: string | null | undefined
  image: string | null  | undefined
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>({
    id: "12345",
    name: "varsha" ,
    email: "varshapracs",
    image: "https://example.com/image.jpg"
  })
  const isLoading = status === "loading"

  // Update user when session changes
  useEffect(() => {
    if (session?.user) {
      console.log("Session user:", session.user)
      setUser({
        id: Math.random().toString(36).substring(2, 15), 
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      })
    } else {
      setUser(null)
    }
  }, [session])

  // Sign in with Google using NextAuth
  const signInWithGoogle = async () => {
    try {
      await signIn("google", { callbackUrl: "/" })
      return Promise.resolve()
    } catch (error) {
      console.error("Sign in failed:", error)
      return Promise.reject(error)
    }
  }

  // Sign out using NextAuth
  const signOut = async () => {
    try {
      await nextAuthSignOut({ callbackUrl: "/login" })
      return Promise.resolve()
    } catch (error) {
      console.error("Sign out failed:", error)
      return Promise.reject(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}