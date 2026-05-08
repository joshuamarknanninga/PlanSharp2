import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import scanRoutes from './routes/scanRoutes';
import { errorHandler } from './middleware/errorHandler';

export const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/api/auth', authRoutes);
app.use('/api/scans', scanRoutes);
app.use(errorHandler);
