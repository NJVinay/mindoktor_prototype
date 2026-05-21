import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';
import { categoryRoutes } from './routes/categories.js';
import { conditionRoutes } from './routes/conditions.js';
import { searchRoutes } from './routes/search.js';
import { triageRoutes } from './routes/triage.js';
import { doctorRoutes } from './routes/doctors.js';
import { zoneRoutes } from './routes/zones.js';
import { authRoutes } from './routes/auth.js';
import { doctorPanelRoutes } from './routes/doctorPanel.js';
import { chatbotRoutes } from './routes/chatbot.js';

const app = express();
const PORT = parseInt(process.env['PORT'] ?? '4000', 10);
const FRONTEND_ORIGIN = process.env['FRONTEND_ORIGIN'] ?? 'http://localhost:3000';

// ─── Middleware ──────────────────────────────────────────────────
app.use(cors({
  origin: [FRONTEND_ORIGIN, 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
}));
app.use(express.json());

// ─── Health Check ───────────────────────────────────────────────
app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Routes ─────────────────────────────────────────────────────
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/conditions', conditionRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/triage', triageRoutes);
app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/zones', zoneRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/doctor', doctorPanelRoutes);
app.use('/api/v1/chatbot', chatbotRoutes);

// ─── Error Handling ─────────────────────────────────────────────
app.use(errorHandler);

// ─── Start ──────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚪 Right Door API running at http://localhost:${PORT}`);
  console.log(`   CORS origin: ${FRONTEND_ORIGIN}`);
  console.log(`   Environment: ${process.env['NODE_ENV'] ?? 'development'}`);
});

export default app;
