import express from "express";
import authenticate from "../../middleware/auth.js";

const router = express.Router();

router.post('/signup', uploadMiddleware.single('image'), createUser);
router.post('/login', loginUser);
router.get('/my/:id', myProfile);
router.get('/all', allUsers);
router.delete('/delete/:id', deleteUser);

export default router;

