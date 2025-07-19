import axios from "axios";
import querystring from "querystring";

const redirectUri = process.env.SPOTIFY_REDIRECT_URI; // e.g. https://yourdomain.com/api/spotify/callback

// Step 1: Redirect user to Spotify login
export const loginWithSpotify = (req, res) => {
  var scope = "playlist-read-private user-read-email";
  const showDialog = req.query.force === 'true' ? 'true' : 'false'; // <-- check for force param
  const params = querystring.stringify({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: scope,
    show_dialog: showDialog, // <--- force login if needed
  });
  res.redirect(`https://accounts.spotify.com/authorize?${params}`);
};


// Step 2: Handle Spotify OAuth callback
export const spotifyCallback = async (req, res) => {
  const code = req.query.code || null;
  if (!code) return res.status(400).send("Missing authorization code.");

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token } = tokenResponse.data;

    // Redirect back to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}?spotify_token=${access_token}`);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Failed to authenticate with Spotify");
  }
};

// Step 3: Get User Playlists
export const getPlaylists = async (req, res) => {
  const accessToken = req.query.token;
  if (!accessToken) return res.status(400).send("Access token is required");

  try {
    const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data || err.message });
  }
};
