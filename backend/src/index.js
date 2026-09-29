'use strict';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

dotenv.config();

const { profileRouter } = require('./routes/profile');
const { careerRouter } = require('./routes/career');
const { interviewRouter } = require('./routes/interview');
const { resumeRouter } = require('./routes/resume');
const { chatRouter } = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Mock jobs data
let jobs = [
  { id: 1, title: 'React Developer', company: 'TechCorp', location: 'Remote', salary: '₹12 – 18 LPA' },
  { id: 2, title: 'Full Stack Engineer', company: 'Innovate AI', location: 'Hybrid', salary: '₹15 – 24 LPA' },
  { id: 3, title: 'Frontend Intern', company: 'StartUp Inc', location: 'On-site', salary: '₹35,000/mo (₹4.2 LPA)' },
];

// Mount Routes
app.use('/api/profile', profileRouter);
app.use('/api/career', careerRouter);
app.use('/api/interview', interviewRouter);
app.use('/api/resume', resumeRouter);
app.use('/api/chat', chatRouter);

// Jobs endpoints
app.get('/api/jobs', (req, res) => res.json(jobs));
app.post('/api/jobs', (req, res) => {
  const newJob = { id: jobs.length + 1, ...req.body };
  jobs.push(newJob);
  res.status(201).json(newJob);
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'CareerCompass AI Backend',
    mode: process.env.DEMO_MODE === 'true' ? 'demo' : 'live',
  });
});

app.listen(PORT, () => {
  const mode = process.env.DEMO_MODE === 'true' ? '🎭 DEMO' : '🚀 LIVE';
  console.log(`CareerCompass AI Backend running on port ${PORT} [${mode} MODE]`);
});

module.exports = app;
