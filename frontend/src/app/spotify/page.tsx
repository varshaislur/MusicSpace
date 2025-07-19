"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Music, LogIn, RefreshCw, AlertCircle, Play, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SpotifyPage = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const BACKEND_URL =  "http://localhost:5000";

  useEffect(() => {
    const spotifyToken = searchParams.get("spotify_token");
    if (spotifyToken) {
      setToken(spotifyToken);
      fetchPlaylists(spotifyToken);
    }
  }, [searchParams]);

  const fetchPlaylists = async (accessToken: string) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:5000/api/spotify/playlists?token=${accessToken}`
      );
      setPlaylists(response.data.items || []);
    } catch (error) {
      console.error("Failed to fetch playlists:", error);
      setError("Failed to fetch playlists. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    window.location.href = `${BACKEND_URL}/api/spotify/login`;
  };

  const handleSwitchAccount = () => {
    window.location.href = `${BACKEND_URL}/api/spotify/login?force=true`;
  };

  return (
    <div className="min-h-screen text-foreground" style={{ backgroundColor: "hsl(240, 10%, 3.9%)" }}>
      {/* Header Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
        {/* Background gradient elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-1/4 top-0 h-64 w-64 rounded-full blur-3xl" style={{ 
            background: "linear-gradient(135deg, #1db954 0%, #1ed760 25%, #3b82f6 50%, #8b5cf6 75%, #a855f7 100%)" 
          }}></div>
          <div className="absolute -right-1/4 bottom-0 h-64 w-64 rounded-full blur-3xl" style={{ 
            background: "linear-gradient(135deg, #1db954 0%, #1ed760 25%, #3b82f6 50%, #8b5cf6 75%, #a855f7 100%)" 
          }}></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Music className="h-8 w-8" style={{ color: "#1db954" }} />
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" style={{ 
                  backgroundImage: "linear-gradient(90deg, #1db954, #1ed760, #3b82f6, #8b5cf6, #a855f7)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  Spotify Integration
                </h1>
              </div>
              <p className="mx-auto max-w-[700px] md:text-xl" style={{ color: "hsl(240, 5%, 64.9%)" }}>
                Connect your Spotify account to import your playlists and enhance your music space experience.
              </p>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mx-auto max-w-[800px] mb-6">
              <Alert className="border-red-500 bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-red-500">{error}</AlertDescription>
              </Alert>
            </div>
          )}

          {/* Main Content */}
          <div className="mx-auto max-w-[1000px]">
            {!token ? (
              // Login Card
              <Card style={{ borderColor: "rgba(255, 255, 255, 0.1)", backgroundColor: "hsl(240, 10%, 5%)" }}>
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <Music className="h-6 w-6" style={{ color: "#1db954" }} />
                    <span>Connect to Spotify</span>
                  </CardTitle>
                  <CardDescription>
                    Login with your Spotify account to access your playlists and import them into your music spaces.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Button 
                    onClick={handleLogin}
                    className="w-full max-w-md border-0" 
                    style={{ 
                      background: "#1db954",
                      transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "#1ed760"
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "#1db954"
                    }}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Login with Spotify
                  </Button>
                </CardContent>
              </Card>
            ) : (
              // Playlists Section
              <div className="space-y-6">
                {/* Header with Switch Account Button */}
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Your Spotify Playlists</h2>
                    <p className="text-muted-foreground">Choose playlists to import into your music space</p>
                  </div>
                  <Button
                    onClick={handleSwitchAccount}
                    variant="outline"
                    className="border-white/20 hover:bg-white/10"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Switch Account
                  </Button>
                </div>

                {/* Loading State */}
                {isLoading && (
                  <div className="flex justify-center py-8">
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Loading playlists...</span>
                    </div>
                  </div>
                )}

                {/* Playlists Grid */}
                {!isLoading && playlists.length > 0 && (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {playlists.map((playlist) => (
                      <Card 
                        key={playlist.id}
                        className="group cursor-pointer transition-all duration-300 hover:scale-105"
                        style={{ 
                          borderColor: "rgba(255, 255, 255, 0.1)", 
                          backgroundColor: "hsl(240, 10%, 5%)" 
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            {/* Playlist Image */}
                            <div className="relative flex-shrink-0">
                              {playlist.images?.[0]?.url ? (
                                <img
                                  src={playlist.images[0].url}
                                  alt={playlist.name}
                                  className="w-16 h-16 rounded-lg shadow-lg"
                                />
                              ) : (
                                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                                  <Music className="h-8 w-8 text-white" />
                                </div>
                              )}
                              {/* Hover Play Button */}
                              <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Play className="h-6 w-6 text-white fill-white" />
                              </div>
                            </div>
                            
                            {/* Playlist Info */}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm truncate mb-1">
                                {playlist.name}
                              </h3>
                              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                                {playlist.description || "No description"}
                              </p>
                              <div className="flex items-center justify-between">
                                <Badge variant="secondary" className="text-xs">
                                  <Users className="h-3 w-3 mr-1" />
                                  {playlist.tracks?.total || 0} tracks
                                </Badge>
                                {playlist.public !== undefined && (
                                  <Badge 
                                    variant={playlist.public ? "default" : "outline"}
                                    className="text-xs"
                                  >
                                    {playlist.public ? "Public" : "Private"}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* No Playlists State */}
                {!isLoading && playlists.length === 0 && token && (
                  <Card style={{ borderColor: "rgba(255, 255, 255, 0.1)", backgroundColor: "hsl(240, 10%, 5%)" }}>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Music className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Playlists Found</h3>
                      <p className="text-muted-foreground text-center mb-4">
                        You don't have any playlists on Spotify yet, or they couldn't be loaded.
                      </p>
                      <Button 
                        onClick={() => token && fetchPlaylists(token)}
                        variant="outline"
                        className="border-white/20 hover:bg-white/10"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Retry
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-dark-800/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-dark-900 p-2">
                <Music className="h-6 w-6" style={{ color: "#1db954" }} />
              </div>
              <h3 className="text-xl font-bold">Import Playlists</h3>
              <p className="text-muted-foreground">
                Easily import your favorite Spotify playlists into your music spaces and share them with friends.
              </p>
            </div>
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-dark-900 p-2">
                <Play className="h-6 w-6" style={{ color: "#3b82f6" }} />
              </div>
              <h3 className="text-xl font-bold">Seamless Playback</h3>
              <p className="text-muted-foreground">
                Connect your Spotify account for seamless music playback control directly from your spaces.
              </p>
            </div>
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-dark-900 p-2">
                <Users className="h-6 w-6" style={{ color: "#8b5cf6" }} />
              </div>
              <h3 className="text-xl font-bold">One stop shop for all your music needs</h3>
              <p className="text-muted-foreground">
                Manage your music spaces with ease, and enjoy a unified music experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpotifyPage;