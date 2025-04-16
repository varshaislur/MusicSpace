"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  image: string | null
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Check for stored auth on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check local storage for user data
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // For now, use dummy data instead of actual API call
      // In a real implementation, you would make an API request here
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   body: JSON.stringify({ email, password }),
      //   headers: { 'Content-Type': 'application/json' }
      // })
      // const data = await response.json()
      
      // Simulate successful login with dummy data
      const dummyUser = {
        id: Math.random().toString(36).substring(2, 15),
        name: email.split('@')[0], // Use part of email as name
        email: email,
        image: null
      }
      
      // Store user in state and localStorage
      setUser(dummyUser)
      localStorage.setItem('user', JSON.stringify(dummyUser))
      
      return Promise.resolve()
    } catch (error) {
      console.error("Sign in failed:", error)
      return Promise.reject(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Register with email, password, and name
  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      // For now, use dummy data instead of actual API call
      // In a real implementation, you would make an API request here
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   body: JSON.stringify({ email, password, name }),
      //   headers: { 'Content-Type': 'application/json' }
      // })
      // const data = await response.json()
      
      // Simulate successful registration with dummy data
      const dummyUser = {
        id: Math.random().toString(36).substring(2, 15),
        name: name,
        email: email,
        image: null
      }
      
      // Store user in state and localStorage
      setUser(dummyUser)
      localStorage.setItem('user', JSON.stringify(dummyUser))
      
      return Promise.resolve()
    } catch (error) {
      console.error("Registration failed:", error)
      return Promise.reject(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Sign out
  const signOut = async () => {
    try {
      // For now, just clear local state instead of API call
      // In a real implementation, you would make an API request here
      // await fetch('/api/auth/logout', { method: 'POST' })
      
      // Clear user from state and localStorage
      setUser(null)
      localStorage.removeItem('user')
      
      return Promise.resolve()
    } catch (error) {
      console.error("Sign out failed:", error)
      return Promise.reject(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, register, signOut }}>
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