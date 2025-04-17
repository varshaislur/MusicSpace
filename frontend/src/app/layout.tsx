import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import {Navbar} from "@/components/navbar"
import { AuthProvider } from "@/lib/auth-context"
import Provider from "@/lib/session-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MusicSpace - Collaborative Music Queues",
  description:
    "Create a collaborative music queue where friends can join, vote, and enjoy music together in real-time.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          
          <AuthProvider>
            
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
            </div>
          </AuthProvider>
       
        </ThemeProvider>
      </body>
    </html>
  )
}
