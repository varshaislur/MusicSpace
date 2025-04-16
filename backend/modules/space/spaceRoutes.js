import express from 'express';
import { 
  createSpace, 
  getSpaceDetails, 
  joinSpace, 
  getMySpaces, 
  getSpaceMembers 
} from '../space/spaceController.js';
import authenticate from '../../middleware/auth.js';

const router = express.Router();

router.post('/create', authenticate, createSpace);
router.get('/mySpaces', authenticate, getMySpaces);
router.get('/:id', authenticate, getSpaceDetails);
router.post('/:id/join', authenticate, joinSpace);
router.get('/:id/members', authenticate, getSpaceMembers);

export default router;