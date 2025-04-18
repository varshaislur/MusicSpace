import express from 'express';
import { 
  setActiveSong, 
  getActiveSong, 
  endActiveSong,
  playNextSong
} from '../controllers/activeSongController.js';
import authenticate from '../../middleware/auth.js';

const router = express.Router();

// Get active song for a space
router.get('/:spaceId/active', authenticate, getActiveSong);

// Set a specific song as active
router.post('/:spaceId/songs/:songId/activate', authenticate, setActiveSong);

// End current song (called when a song ends)
router.post('/:spaceId/end-current', authenticate, endActiveSong);

// Play next song (manually skip to next song)
router.post('/:spaceId/play-next', authenticate, playNextSong);

export default router;