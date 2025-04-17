import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./modules/user/userRoutes.js";
import bodyParser from "body-parser";
import spaceRoutes from "./modules/space/spaceRoutes.js";
import songRoutes from "./modules/song/songRoutes.js";


dotenv.config();

const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
app.use('/api/user',userRoutes)
app.use('/api/space',spaceRoutes)
app.use('/api/song',songRoutes)
  