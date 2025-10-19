import express from 'express';
import 'dotenv/config'
import authRoutes from './routes/authRoutes.js'
import requestRoutes from './routes/requestRoutes.js'
import userRoutes from './routes/userRoute.js'
import { connectDB } from './lib/db.js';
import cors from "cors";
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ['http://localhost:3000', 'https://the-digital-clerk.vercel.app'],
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// ✅ Serve static files (uploaded documents)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/estamp', requestRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
