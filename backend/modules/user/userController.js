import prisma from "../../utils/prisma.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../../utils/jwt.js";

export const register = async (req, res) => {
    try {
      const { email, name, password } = req.body;
      
      
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });
      
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword
        }
      });
      
      
      const token = generateToken(user);
      
      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      
      const user = await prisma.user.findUnique({
        where: { email }
      });
      
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
     
      const token = generateToken(user);
      
      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        token
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  export const getProfile = async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true
        }
      });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };