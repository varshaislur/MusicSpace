import express from "express";
import { loginWithSpotify, spotifyCallback, getPlaylists } from "./spotifyController.js";

const router = express.Router();

router.get("/login", loginWithSpotify);
router.get("/callback", spotifyCallback);
router.get("/playlists", getPlaylists);

export default router;
