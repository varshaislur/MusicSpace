import express from 'express';
import { 
  createSpace, 
  getSpaceDetails, 
  joinSpace, 
  getMySpaces, 
  getSpaceMembers,
  leaveSpace 
} from '../space/spaceController.js';
import authenticate from '../../middleware/auth.js';

const router = express.Router();

router.post('/create', authenticate, createSpace);
router.get('/mySpaces', authenticate, getMySpaces);
router.get('/:id/spaceDetails', authenticate, getSpaceDetails);
router.post('/join', authenticate, joinSpace);
router.get('/:id/members', authenticate, getSpaceMembers);
router.post('/:id/leave', authenticate, leaveSpace);

export default router;