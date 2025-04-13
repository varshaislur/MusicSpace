"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Music, LogOut } from "lucide-react"
import { useAuth } from "../lib/auth-context"

export function Navbar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

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
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground hidden md:inline-block">{user.name}</span>
              <Avatar>
                <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="bg-gradient-uidino">
                  {user.name.substring(0, 2).toUpperCase()}
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
