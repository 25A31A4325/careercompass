// ─────────────────────────────────────────────────────────────
//  Shared TypeScript types used by both backend and frontend
// ─────────────────────────────────────────────────────────────

export interface StudentProfile {
  name: string;
  education: string;
  degree: string;
  branch: string;
  yearOfStudy: string;
  technicalSkills: string[];
  programmingLanguages: string[];
  interests: string[];
  projects: string[];
  certifications: string[];
  githubUrl?: string;
  targetCareer?: string;
  resumeText?: string;
}

export interface SkillAnalysis {
  technicalSkills: string[];
  programmingLanguages: string[];
  tools: string[];
  frameworks: string[];
  projects: string[];
  certifications: string[];
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  strengths: string[];
  improvementAreas: string[];
  resumeSkillsDetected?: string[];
  resumeProjectsDetected?: string[];
  resumeMissingInfo?: string[];
  resumeSuggestedImprovements?: string[];
}

export interface CareerMatch {
  career: string;
  matchScore: number;
  whyItMatches: string;
  existingRelevantSkills: string[];
  missingImportantSkills: string[];
  recommendedNextSteps: string[];
  icon: string;
}

export interface SkillGap {
  skill: string;
  currentLevel: number; // 0-100
  requiredLevel: number; // 0-100
  status: 'have' | 'need' | 'improve';
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  skillsToLearn: string[];
  resources: Resource[];
  practiceTasks: string[];
  projectIdeas: string[];
  estimatedWeeks: number;
  priority: 'high' | 'medium' | 'low';
  completed?: boolean;
}

export interface Resource {
  title: string;
  type: 'video' | 'course' | 'book' | 'practice' | 'docs';
  url?: string;
  free: boolean;
}

export interface JobReadiness {
  totalScore: number;
  breakdown: {
    technicalSkills: number;
    projects: number;
    requiredSkills: number;
    interviewPreparation: number;
  };
  recommendations: string[];
  level: 'Entry' | 'Junior' | 'Mid' | 'Senior';
}

export interface InterviewQuestion {
  id: string;
  question: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  expectedPoints: string[];
}

export interface InterviewEvaluation {
  score: number; // out of 10
  correctness: number;
  technicalUnderstanding: number;
  communication: number;
  completeness: number;
  whatYouDidWell: string[];
  whatToImprove: string[];
  betterApproach: string;
  nextQuestion?: InterviewQuestion;
}

export interface InterviewReport {
  totalQuestions: number;
  averageScore: number;
  strongAreas: string[];
  weakAreas: string[];
  overallFeedback: string;
  recommendedTopics: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface AIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  mode: 'live' | 'demo';
}
