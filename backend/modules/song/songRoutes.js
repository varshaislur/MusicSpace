import express from 'express';
import { 
  addSong, 
  getSongs, 
  voteSong, 
  removeSong 
} from '../song/songController.js';
import authenticate from '../../middleware/auth.js';

const router = express.Router();

router.post('/:spaceId/addSongs', authenticate, addSong);
router.get('/:spaceId/getSongs', authenticate, getSongs);
router.post('/:spaceId/songs/:songId/vote', authenticate, voteSong);
router.delete('/:spaceId/songs/:songId/delete', authenticate, removeSong);

export default router;
