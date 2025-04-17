"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Music, UserPlus, LogIn } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("login")
  
  // Login state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState("")

  // Register state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [registerLoading, setRegisterLoading] = useState(false)
  const [registerError, setRegisterError] = useState("")

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginData(prev => ({ ...prev, [name]: value }))
  }

  const handleRegisterChange = (e) => {
    const { name, value } = e.target
    setRegisterData(prev => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError("")
    
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password
        })
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      const data = await response.json()
      
      // Store token in localStorage
      localStorage.setItem("musicSpaceToken", data.token)
      localStorage.setItem("musicSpaceUser", JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email
      }))
      
      // Redirect to join space page
      router.push("/joinspace")
    } catch (error) {
      console.error("Login failed:", error)
      setLoginError("Invalid email or password. Please try again.")
    } finally {
      setLoginLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setRegisterLoading(true)
    setRegisterError("")
    
    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password
        })
      })

      if (!response.ok) {
        throw new Error("Registration failed")
      }

      const data = await response.json()
      
      // Store token in localStorage
      localStorage.setItem("musicSpaceToken", data.token)
      localStorage.setItem("musicSpaceUser", JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email
      }))
      
      // Redirect to join space page
      router.push("/joinspace")
    } catch (error) {
      console.error("Registration failed:", error)
      setRegisterError("Registration failed. Please try again.")
    } finally {
      setRegisterLoading(false)
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
          <CardDescription>Sign in or create an account to join music spaces with friends</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Tabs 
            defaultValue="login" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Sign In
              </TabsTrigger>
              <TabsTrigger value="register" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Register
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="mt-0">
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input 
                      id="login-email"
                      name="email"
                      type="email" 
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      required
                      className="bg-black/50 border-white/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input 
                      id="login-password"
                      name="password"
                      type="password" 
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                      className="bg-black/50 border-white/20"
                    />
                  </div>
                  
                  {loginError && (
                    <div className="text-red-500 text-sm">{loginError}</div>
                  )}
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 hover:opacity-90"
                    disabled={loginLoading}
                  >
                    {loginLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="register" className="mt-0">
              <form onSubmit={handleRegister}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Name</Label>
                    <Input 
                      id="register-name"
                      name="name"
                      type="text" 
                      placeholder="Enter your name"
                      value={registerData.name}
                      onChange={handleRegisterChange}
                      required
                      className="bg-black/50 border-white/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input 
                      id="register-email"
                      name="email"
                      type="email" 
                      placeholder="Enter your email"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      required
                      className="bg-black/50 border-white/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input 
                      id="register-password"
                      name="password"
                      type="password" 
                      placeholder="Create a password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      required
                      className="bg-black/50 border-white/20"
                    />
                  </div>
                  
                  {registerError && (
                    <div className="text-red-500 text-sm">{registerError}</div>
                  )}
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 hover:opacity-90"
                    disabled={registerLoading}
                  >
                    {registerLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
          
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