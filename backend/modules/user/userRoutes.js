import express from "express";
import authenticate from "../../middleware/auth.js";
import { getProfile, login, register } from "./userController.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/myProfile', authenticate,getProfile);
// router.get('/all', allUsers);
// router.delete('/delete/:id', deleteUser);

export default router;


