'use strict';

/**
 * Demo/mock data returned when DEMO_MODE=true or OpenAI key is missing.
 * All functions mirror the real AI service signatures.
 */

function demoAnalyzeProfile(profile) {
  const skills = (profile.technicalSkills || []).concat(profile.programmingLanguages || []);
  return {
    technicalSkills: profile.technicalSkills || ['HTML', 'CSS', 'JavaScript'],
    programmingLanguages: profile.programmingLanguages || ['Java', 'Python'],
    tools: ['Git', 'VS Code', 'Postman'],
    frameworks: ['React', 'Spring Boot'],
    projects: profile.projects || ['Student Management System'],
    certifications: profile.certifications || [],
    experienceLevel: skills.length >= 6 ? 'Intermediate' : 'Beginner',
    strengths: [
      'Strong programming fundamentals',
      'Good understanding of web technologies',
      'Project building experience',
    ],
    improvementAreas: [
      'SQL and Database design',
      'Data Structures & Algorithms',
      'System Design concepts',
      'Cloud platforms (AWS/GCP)',
    ],
    resumeSkillsDetected: skills.slice(0, 5),
    resumeProjectsDetected: profile.projects || ['Student Management System'],
    resumeMissingInfo: ['LinkedIn URL', 'Quantified achievements', 'Internship experience'],
    resumeSuggestedImprovements: [
      'Add measurable impact to each project (e.g., "reduced load time by 40%")',
      'Include a professional summary at the top',
      'List relevant coursework',
    ],
  };
}

function demoRecommendCareers(profile) {
  const interests = (profile.interests || []).map(i => i.toLowerCase());
  const hasML = interests.some(i => i.includes('ai') || i.includes('ml') || i.includes('machine'));
  const hasData = interests.some(i => i.includes('data') || i.includes('analytics'));

  return [
    {
      career: 'Software Developer',
      matchScore: 88,
      whyItMatches:
        'Your programming skills in Java and Python align perfectly with software development roles. Your project experience demonstrates practical ability.',
      existingRelevantSkills: ['Java', 'Python', 'HTML/CSS', 'Git'],
      missingImportantSkills: ['Data Structures & Algorithms', 'System Design', 'SQL'],
      recommendedNextSteps: [
        'Solve 50+ LeetCode problems',
        'Build a full-stack project with a database',
        'Learn REST API design',
      ],
      icon: '💻',
    },
    {
      career: 'AI/ML Engineer',
      matchScore: hasML ? 82 : 71,
      whyItMatches:
        'Your Python skills and AI interest make this a strong path. ML is in high demand and Python is the primary language used.',
      existingRelevantSkills: ['Python', 'Mathematics basics'],
      missingImportantSkills: ['Machine Learning', 'NumPy/Pandas', 'TensorFlow/PyTorch', 'Statistics'],
      recommendedNextSteps: [
        'Complete a Machine Learning course (Andrew Ng on Coursera)',
        'Practice with Kaggle datasets',
        'Build an ML project and deploy it',
      ],
      icon: '🤖',
    },
    {
      career: 'Data Analyst',
      matchScore: hasData ? 79 : 68,
      whyItMatches:
        'Your analytical mindset and Python knowledge are great foundations. Data Analysts are in high demand across all industries.',
      existingRelevantSkills: ['Python', 'Excel basics', 'Logical thinking'],
      missingImportantSkills: ['SQL', 'Power BI / Tableau', 'Statistics', 'Pandas'],
      recommendedNextSteps: [
        'Learn SQL from scratch (Mode Analytics SQL Tutorial)',
        'Build a data dashboard using public datasets',
        'Get Google Data Analytics certificate',
      ],
      icon: '📊',
    },
    {
      career: 'Full-Stack Web Developer',
      matchScore: 75,
      whyItMatches:
        'Your HTML/CSS/JavaScript base is a solid starting point. Full-stack is one of the most hireable profiles for fresh graduates.',
      existingRelevantSkills: ['HTML', 'CSS', 'JavaScript', 'Basic backend knowledge'],
      missingImportantSkills: ['React.js', 'Node.js', 'MongoDB/PostgreSQL', 'REST APIs'],
      recommendedNextSteps: [
        'Build 3 full-stack projects (MERN or PERN stack)',
        'Deploy to Vercel/Render',
        'Contribute to an open-source project',
      ],
      icon: '🌐',
    },
  ];
}

function demoAnalyzeSkillGap(targetCareer, currentSkills) {
  const careerSkillMap = {
    'Software Developer': [
      { skill: 'Java', currentLevel: 75, requiredLevel: 85, status: 'improve' },
      { skill: 'Python', currentLevel: 70, requiredLevel: 80, status: 'improve' },
      { skill: 'Data Structures', currentLevel: 35, requiredLevel: 90, status: 'need' },
      { skill: 'SQL', currentLevel: 30, requiredLevel: 75, status: 'need' },
      { skill: 'System Design', currentLevel: 15, requiredLevel: 70, status: 'need' },
      { skill: 'Git/Version Control', currentLevel: 60, requiredLevel: 80, status: 'improve' },
      { skill: 'REST APIs', currentLevel: 40, requiredLevel: 80, status: 'need' },
    ],
    'AI/ML Engineer': [
      { skill: 'Python', currentLevel: 70, requiredLevel: 90, status: 'improve' },
      { skill: 'Machine Learning', currentLevel: 20, requiredLevel: 85, status: 'need' },
      { skill: 'Statistics', currentLevel: 30, requiredLevel: 80, status: 'need' },
      { skill: 'NumPy/Pandas', currentLevel: 25, requiredLevel: 85, status: 'need' },
      { skill: 'Deep Learning', currentLevel: 10, requiredLevel: 75, status: 'need' },
      { skill: 'SQL', currentLevel: 30, requiredLevel: 70, status: 'need' },
    ],
    'Data Analyst': [
      { skill: 'SQL', currentLevel: 30, requiredLevel: 90, status: 'need' },
      { skill: 'Python/Pandas', currentLevel: 50, requiredLevel: 80, status: 'improve' },
      { skill: 'Data Visualization', currentLevel: 20, requiredLevel: 85, status: 'need' },
      { skill: 'Statistics', currentLevel: 35, requiredLevel: 80, status: 'need' },
      { skill: 'Excel/Sheets', currentLevel: 55, requiredLevel: 75, status: 'improve' },
    ],
  };

  const gaps = careerSkillMap[targetCareer] || careerSkillMap['Software Developer'];

  // Boost skills the student already has
  const allCurrentSkills = currentSkills.map(s => s.toLowerCase());
  return gaps.map(gap => {
    const hasSkill = allCurrentSkills.some(s => gap.skill.toLowerCase().includes(s) || s.includes(gap.skill.toLowerCase().split('/')[0]));
    if (hasSkill) {
      return { ...gap, currentLevel: Math.min(gap.currentLevel + 25, gap.requiredLevel), status: gap.currentLevel + 25 >= gap.requiredLevel ? 'have' : 'improve' };
    }
    return gap;
  });
}

function demoGenerateRoadmap(targetCareer) {
  const roadmaps = {
    'AI/ML Engineer': [
      {
        phase: 1,
        title: 'Python & Math Foundations',
        skillsToLearn: ['Advanced Python', 'NumPy', 'Pandas', 'Linear Algebra', 'Statistics'],
        resources: [
          { title: 'Python for Everybody – Coursera', type: 'course', url: 'https://coursera.org/specializations/python', free: true },
          { title: '3Blue1Brown – Linear Algebra', type: 'video', url: 'https://youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', free: true },
        ],
        practiceTasks: ['Build a data analysis notebook', 'Solve 20 NumPy exercises'],
        projectIdeas: ['EDA on a Kaggle dataset'],
        estimatedWeeks: 4,
        priority: 'high',
      },
      {
        phase: 2,
        title: 'Machine Learning Core',
        skillsToLearn: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Scikit-learn'],
        resources: [
          { title: 'Machine Learning – Andrew Ng (Coursera)', type: 'course', url: 'https://coursera.org/learn/machine-learning', free: false },
          { title: 'Kaggle ML Micro-courses', type: 'course', url: 'https://kaggle.com/learn', free: true },
        ],
        practiceTasks: ['Train a regression model', 'Participate in a Kaggle competition'],
        projectIdeas: ['House price predictor', 'Spam email classifier'],
        estimatedWeeks: 6,
        priority: 'high',
      },
      {
        phase: 3,
        title: 'Deep Learning & Neural Networks',
        skillsToLearn: ['TensorFlow/Keras', 'CNNs', 'RNNs', 'Transfer Learning'],
        resources: [
          { title: 'Deep Learning Specialization – Coursera', type: 'course', url: 'https://coursera.org/specializations/deep-learning', free: false },
          { title: 'fast.ai Practical Deep Learning', type: 'course', url: 'https://course.fast.ai', free: true },
        ],
        practiceTasks: ['Build an image classifier', 'Fine-tune a pre-trained model'],
        projectIdeas: ['Sentiment analysis tool', 'Image recognition app'],
        estimatedWeeks: 6,
        priority: 'high',
      },
      {
        phase: 4,
        title: 'MLOps & Deployment',
        skillsToLearn: ['Flask/FastAPI', 'Docker', 'Model Serving', 'Cloud (AWS/GCP)'],
        resources: [
          { title: 'MLOps Zoomcamp – DataTalks.Club', type: 'course', url: 'https://github.com/DataTalksClub/mlops-zoomcamp', free: true },
        ],
        practiceTasks: ['Deploy an ML model as an API', 'Create a model monitoring dashboard'],
        projectIdeas: ['End-to-end ML pipeline project'],
        estimatedWeeks: 4,
        priority: 'medium',
      },
      {
        phase: 5,
        title: 'Portfolio & Interview Prep',
        skillsToLearn: ['System Design for ML', 'LeetCode (ML-focused)', 'Technical Communication'],
        resources: [
          { title: 'ML System Design Interview', type: 'book', url: 'https://bytebytego.com', free: false },
          { title: 'LeetCode', type: 'practice', url: 'https://leetcode.com', free: true },
        ],
        practiceTasks: ['Complete 3 end-to-end ML projects', 'Mock interviews'],
        projectIdeas: ['Capstone AI project with deployment'],
        estimatedWeeks: 4,
        priority: 'high',
      },
    ],
    default: [
      {
        phase: 1,
        title: 'Programming Foundations',
        skillsToLearn: ['Core language mastery', 'OOP concepts', 'Problem solving'],
        resources: [
          { title: 'CS50 – Harvard (Free)', type: 'course', url: 'https://cs50.harvard.edu', free: true },
        ],
        practiceTasks: ['Solve 30 easy problems on LeetCode', 'Build 2 console apps'],
        projectIdeas: ['CLI-based project in your main language'],
        estimatedWeeks: 3,
        priority: 'high',
      },
      {
        phase: 2,
        title: 'Data Structures & Algorithms',
        skillsToLearn: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Sorting/Searching'],
        resources: [
          { title: 'NeetCode 150 – YouTube', type: 'video', url: 'https://neetcode.io', free: true },
          { title: 'LeetCode Practice', type: 'practice', url: 'https://leetcode.com', free: true },
        ],
        practiceTasks: ['Solve 50 DSA problems', 'Implement data structures from scratch'],
        projectIdeas: ['Custom data structure library'],
        estimatedWeeks: 6,
        priority: 'high',
      },
      {
        phase: 3,
        title: 'Databases & SQL',
        skillsToLearn: ['SQL fundamentals', 'Database design', 'Joins & Aggregations', 'One ORM'],
        resources: [
          { title: 'SQLZoo – Interactive SQL', type: 'practice', url: 'https://sqlzoo.net', free: true },
          { title: 'PostgreSQL Tutorial', type: 'docs', url: 'https://postgresql.org/docs', free: true },
        ],
        practiceTasks: ['Design a schema for a real-world app', 'Write 20 complex SQL queries'],
        projectIdeas: ['Inventory management system with DB'],
        estimatedWeeks: 3,
        priority: 'high',
      },
      {
        phase: 4,
        title: 'Build Real Projects',
        skillsToLearn: ['Full-stack development', 'REST APIs', 'Authentication', 'Deployment'],
        resources: [
          { title: 'The Odin Project', type: 'course', url: 'https://theodinproject.com', free: true },
        ],
        practiceTasks: ['Ship 2 full-stack projects', 'Add CI/CD pipeline'],
        projectIdeas: ['E-commerce site', 'Task management app', 'Social media clone'],
        estimatedWeeks: 8,
        priority: 'high',
      },
      {
        phase: 5,
        title: 'Interview Preparation',
        skillsToLearn: ['Behavioral questions', 'System design basics', 'Mock interviews'],
        resources: [
          { title: 'Interviewing.io', type: 'practice', url: 'https://interviewing.io', free: true },
          { title: 'Grokking the System Design Interview', type: 'course', url: 'https://designgurus.io', free: false },
        ],
        practiceTasks: ['5 mock interviews', 'Prepare STAR stories'],
        projectIdeas: ['Portfolio website', 'Open source contribution'],
        estimatedWeeks: 4,
        priority: 'high',
      },
    ],
  };

  return roadmaps[targetCareer] || roadmaps.default;
}

function demoCalculateJobReadiness(profile, targetCareer) {
  const skillCount = (profile.technicalSkills || []).length + (profile.programmingLanguages || []).length;
  const projectCount = (profile.projects || []).length;
  const certCount = (profile.certifications || []).length;

  const techScore = Math.min(40 + skillCount * 4, 85);
  const projectScore = Math.min(30 + projectCount * 15, 80);
  const requiredScore = Math.min(25 + skillCount * 3, 75);
  const interviewScore = Math.min(20 + certCount * 10, 65);
  const total = Math.round((techScore + projectScore + requiredScore + interviewScore) / 4);

  return {
    totalScore: total,
    breakdown: {
      technicalSkills: techScore,
      projects: projectScore,
      requiredSkills: requiredScore,
      interviewPreparation: interviewScore,
    },
    level: total >= 80 ? 'Mid' : total >= 60 ? 'Junior' : 'Entry',
    recommendations: [
      `Build at least ${Math.max(3 - projectCount, 1)} more projects to strengthen your portfolio`,
      'Solve 50+ LeetCode problems to improve your DSA score',
      `Learn SQL — it is required for almost all ${targetCareer} roles`,
      'Get at least one industry certification (Google, AWS, or Microsoft)',
      'Do 5+ mock interviews to boost your confidence',
    ],
  };
}

function demoGetInterviewQuestion(career, difficulty, previousQuestions) {
  const bank = {
    'Software Developer': {
      Beginner: [
        { question: 'What is the difference between an array and a linked list?', topic: 'Data Structures', expectedPoints: ['Memory allocation', 'Access time O(1) vs O(n)', 'Insertion/deletion complexity'] },
        { question: 'Explain OOP concepts with examples.', topic: 'OOP', expectedPoints: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'] },
        { question: 'What is a REST API and how does it work?', topic: 'Web', expectedPoints: ['HTTP methods', 'Stateless nature', 'JSON responses', 'Status codes'] },
      ],
      Intermediate: [
        { question: 'Explain the difference between SQL and NoSQL databases. When would you use each?', topic: 'Databases', expectedPoints: ['Schema flexibility', 'ACID vs BASE', 'Use cases', 'Performance trade-offs'] },
        { question: 'What is Big O notation? Analyze the time complexity of bubble sort.', topic: 'Algorithms', expectedPoints: ['O(n²) worst case', 'O(n) best case', 'Space O(1)', 'Comparisons per pass'] },
      ],
      Advanced: [
        { question: 'Design a URL shortener service like bit.ly. Walk through the system design.', topic: 'System Design', expectedPoints: ['Hash function', 'Database schema', 'Caching', 'Scalability', 'Load balancing'] },
        { question: 'Explain SOLID principles and give an example of each.', topic: 'Design Patterns', expectedPoints: ['Single Responsibility', 'Open/Closed', 'Liskov Substitution', 'Interface Segregation', 'Dependency Inversion'] },
      ],
    },
    'AI/ML Engineer': {
      Beginner: [
        { question: 'What is the difference between supervised and unsupervised learning?', topic: 'ML Basics', expectedPoints: ['Labeled vs unlabeled data', 'Examples of each', 'Use cases'] },
        { question: 'Explain overfitting and how you would prevent it.', topic: 'Model Training', expectedPoints: ['Definition', 'Regularization', 'Cross-validation', 'More data'] },
      ],
      Intermediate: [
        { question: 'Explain the bias-variance tradeoff.', topic: 'ML Theory', expectedPoints: ['High bias = underfitting', 'High variance = overfitting', 'Sweet spot', 'How to diagnose'] },
        { question: 'How does gradient descent work?', topic: 'Optimization', expectedPoints: ['Loss function', 'Learning rate', 'Convergence', 'Variants: SGD, Adam'] },
      ],
      Advanced: [
        { question: 'Design an ML pipeline for a real-time fraud detection system.', topic: 'ML Systems', expectedPoints: ['Feature engineering', 'Model choice', 'Latency requirements', 'Retraining strategy', 'Monitoring'] },
      ],
    },
  };

  const careerBank = bank[career] || bank['Software Developer'];
  const difficultyBank = careerBank[difficulty] || careerBank['Beginner'];

  const asked = (previousQuestions || []).map(q => q.question);
  const available = difficultyBank.filter(q => !asked.includes(q.question));
  const selected = available.length > 0 ? available[Math.floor(Math.random() * available.length)] : difficultyBank[0];

  return {
    id: `q_${Date.now()}`,
    question: selected.question,
    topic: selected.topic,
    difficulty,
    expectedPoints: selected.expectedPoints,
  };
}

function demoEvaluateAnswer(question, answer) {
  const wordCount = answer.trim().split(/\s+/).length;
  const baseScore = wordCount < 10 ? 3 : wordCount < 30 ? 5 : wordCount < 80 ? 7 : 8;
  const hasKeyPoints = (question.expectedPoints || []).filter(p =>
    answer.toLowerCase().includes(p.toLowerCase().split(' ')[0])
  ).length;
  const score = Math.min(baseScore + hasKeyPoints, 10);

  return {
    score,
    correctness: score * 10,
    technicalUnderstanding: Math.min((score + 1) * 10, 100),
    communication: wordCount > 30 ? 75 : 50,
    completeness: Math.round((hasKeyPoints / Math.max((question.expectedPoints || []).length, 1)) * 100),
    whatYouDidWell: score >= 6
      ? ['Good grasp of the core concept', 'Clear explanation']
      : ['Attempted to answer the question', 'Shows awareness of the topic'],
    whatToImprove: score < 8
      ? ['Include more specific technical details', 'Mention real-world examples or use cases']
      : ['Answer was strong — keep practicing similar questions'],
    betterApproach: `A strong answer would cover: ${(question.expectedPoints || []).join(', ')}. Start with a definition, then explain each point with a brief example.`,
  };
}

function demoChatResponse(message) {
  const msg = message.toLowerCase();
  if (msg.includes('learn next') || msg.includes('what should')) {
    return "Based on your profile, I'd recommend focusing on **SQL and Data Structures** next. These two skills are required in almost every tech role and will significantly boost your job readiness score.";
  }
  if (msg.includes('intern') || msg.includes('ready')) {
    return "You're making good progress! To be ready for an internship, aim to complete 2-3 solid projects and solve at least 30 LeetCode problems. Your job readiness score is on track.";
  }
  if (msg.includes('resume')) {
    return "To improve your resume: (1) Add measurable outcomes to your projects, (2) Include a professional summary, (3) List all technical skills clearly, (4) Add your GitHub link with active repositories.";
  }
  if (msg.includes('project')) {
    return "Great project ideas for your target career: build a **CRUD REST API**, a **data dashboard**, or a **small ML model** deployed online. Projects with real data and deployment show employers you can ship.";
  }
  if (msg.includes('why') && msg.includes('recommend')) {
    return "The career recommendation is based on your skills, interests, and project experience. Your Python + AI interest combination is a strong signal for ML roles, while your Java background fits Software Development well.";
  }
  return "I'm here to help with your career journey! Ask me about what to learn next, how to improve your resume, which projects to build, or how to prepare for interviews. 🎯";
}

module.exports = {
  demoAnalyzeProfile,
  demoRecommendCareers,
  demoAnalyzeSkillGap,
  demoGenerateRoadmap,
  demoCalculateJobReadiness,
  demoGetInterviewQuestion,
  demoEvaluateAnswer,
  demoChatResponse,
};
