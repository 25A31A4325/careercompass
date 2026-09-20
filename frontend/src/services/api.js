import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Profile ──────────────────────────────────────────────
export async function analyzeProfile(profile) {
  const { data } = await api.post('/api/profile/analyze', profile);
  return data;
}

export async function uploadResume(file) {
  const form = new FormData();
  form.append('resume', file);
  const { data } = await api.post('/api/profile/upload-resume', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

// ── Career ───────────────────────────────────────────────
export async function recommendCareers(profile) {
  const { data } = await api.post('/api/career/recommend', profile);
  return data;
}

export async function analyzeSkillGap(targetCareer, currentSkills) {
  const { data } = await api.post('/api/career/skill-gap', { targetCareer, currentSkills });
  return data;
}

export async function generateRoadmap(targetCareer, profile) {
  const { data } = await api.post('/api/career/roadmap', { targetCareer, profile });
  return data;
}

export async function calculateJobReadiness(profile, targetCareer) {
  const { data } = await api.post('/api/career/job-readiness', { profile, targetCareer });
  return data;
}

// ── Resume ───────────────────────────────────────────────
export async function improveResume(resumeText, targetCareer) {
  const { data } = await api.post('/api/resume/improve', { resumeText, targetCareer });
  return data;
}

// ── Interview ────────────────────────────────────────────
export async function getInterviewQuestion(career, difficulty, previousQuestions) {
  const { data } = await api.post('/api/interview/question', {
    career,
    difficulty,
    previousQuestions,
  });
  return data;
}

export async function evaluateAnswer(question, answer) {
  const { data } = await api.post('/api/interview/evaluate', { question, answer });
  return data;
}

// ── Chat ─────────────────────────────────────────────────
export async function sendChatMessage(message, context) {
  const { data } = await api.post('/api/chat', { message, context });
  return data;
}

// ── Jobs (local mock) ────────────────────────────────────
export async function fetchJobs() {
  const { data } = await api.get('/api/jobs');
  return data;
}

export default api;
