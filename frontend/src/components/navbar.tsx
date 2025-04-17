"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Music, LogOut } from "lucide-react"
type User = {
  id: string
  name: string
  email: string
  
}


export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  
  // Load user data from localStorage on component mount
  useEffect(() => {
    const checkUserAuth = () => {
      try {
        const token = localStorage.getItem("musicSpaceToken")
        const userData = localStorage.getItem("musicSpaceUser")
        
        if (token && userData) {
          setUser(JSON.parse(userData))
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
        setUser(null)
      }
    }
    
    // Check on initial load
    checkUserAuth()
    
    // Set up event listener for storage changes (in case user logs in from another tab)
    window.addEventListener("storage", checkUserAuth)
    
    // Clean up
    return () => window.removeEventListener("storage", checkUserAuth)
  }, [])
  
  const signOut = () => {
    // Remove token and user data from localStorage
    localStorage.removeItem("musicSpaceToken")
    localStorage.removeItem("musicSpaceUser")
    
    // Update state
    setUser(null)
    
    // Redirect to home page
    router.push("/")
  }

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user || !user.name) return "U"
    
    const nameParts = user.name.split(" ")
    if (nameParts.length === 1) {
      return nameParts[0].substring(0, 2).toUpperCase()
    }
    
    return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-dark-900/80 backdrop-blur-md">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-uidino">
            <Music className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gradient-uidino">MusicSpace</span>
        </Link>

        <nav className="ml-8 hidden md:flex">
          <ul className="flex gap-6">
            <li>
              <Link
                href="/"
                className={`text-sm ${pathname === "/" ? "text-brand-green" : "text-muted-foreground"} hover:text-brand-teal transition-colors`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/explore"
                className={`text-sm ${pathname === "/explore" ? "text-brand-blue" : "text-muted-foreground"} hover:text-brand-blue transition-colors`}
              >
                Explore
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`text-sm ${pathname === "/about" ? "text-brand-purple" : "text-muted-foreground"} hover:text-brand-purple transition-colors`}
              >
                About
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  href="/joinspace"
                  className={`text-sm ${pathname === "/joinspace" ? "text-brand-teal" : "text-muted-foreground"} hover:text-brand-teal transition-colors`}
                >
                  Join Space
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground hidden md:inline-block">{user.name}</span>
              <Avatar>
                <AvatarImage src={"/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="bg-gradient-uidino">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                onClick={signOut}
                className="text-muted-foreground hover:text-brand-blue"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Button asChild className="btn-gradient-uidino text-white border-0">
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}