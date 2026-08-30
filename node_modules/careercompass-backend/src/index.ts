import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { profileRouter } from './routes/profile';
import { careerRouter } from './routes/career';
import { interviewRouter } from './routes/interview';
import { resumeRouter } from './routes/resume';
import { chatRouter } from './routes/chat';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Routes
app.use('/api/profile', profileRouter);
app.use('/api/career', careerRouter);
app.use('/api/interview', interviewRouter);
app.use('/api/resume', resumeRouter);
app.use('/api/chat', chatRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', mode: process.env.DEMO_MODE === 'true' ? 'demo' : 'live' });
});

app.listen(PORT, () => {
  const mode = process.env.DEMO_MODE === 'true' ? '🎭 DEMO' : '🚀 LIVE';
  console.log(`CareerCompass AI Backend running on port ${PORT} [${mode} MODE]`);
});

export default app;
