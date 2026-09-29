import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import {
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ExternalLink,
  BookOpen,
  Trophy,
  Zap,
  Target,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Lightbulb,
  Check,
  Lock,
  GitBranch,
  PlayCircle,
  Share2,
  Download,
  Calendar,
  Layers,
  Code2,
  Terminal,
  Compass
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   FRESHER-ALIGNED CAREER ROADMAP TRACKS & DETAILED MILESTONES
═══════════════════════════════════════════════════════════════════════════ */
export const ROADMAPS = [
  {
    id: 'fullstack',
    label: 'Full Stack Developer',
    roleTag: 'Web Architecture & Cloud Services',
    icon: '🖥️',
    standardWeeks: 16,
    intensiveWeeks: 8,
    difficulty: 'Beginner → Job Ready',
    diffColor: 'text-amber-400 bg-amber-400/10 border-amber-500/30',
    accentColor: 'bg-blue-600',
    accentGradient: 'from-blue-600 to-indigo-600',
    glowColor: 'shadow-blue-500/40',
    borderColor: 'border-blue-500/80',
    hoverGlow: 'hover-glow-blue',
    ringColor: 'ring-blue-500',
    stack: ['HTML5/CSS3', 'JavaScript ES6+', 'React 19', 'Node.js', 'Express', 'MongoDB/PostgreSQL', 'Docker', 'REST APIs', 'Git'],
    description: 'A comprehensive, industry-aligned trajectory for freshers transitioning from code fundamentals to designing, building, and deploying production full-stack web applications.',
    milestones: [
      {
        id: 'm1',
        phaseName: 'Phase 1: Foundations',
        weeks: 'Weeks 1–3',
        intensiveWeeks: 'Weeks 1–2',
        title: 'Web Core, Modern ES6+ & Git Workflow',
        summary: 'Master semantic HTML, CSS layout systems, JavaScript runtime fundamentals, and industry-standard Git version control.',
        targetGap: 'JavaScript & Web Fundamentals',
        topics: [
          'Semantic HTML5 & Accessible DOM Structure (a11y)',
          'Modern CSS: Flexbox, CSS Grid & Responsive Design',
          'JavaScript Execution Context, Event Loop & Closures',
          'ES6+ Modules, Array Methods & Async/Await Promises',
          'Git Branching, Pull Requests & GitHub Collaboration'
        ],
        projectTitle: 'Interactive Global Currency & Weather Hub',
        projectDesc: 'Build a fully responsive web application that fetches real-time data from 2 public REST APIs, implements debounced search, handles error states gracefully, and is deployed to GitHub Pages.',
        projectRequirements: [
          'Zero console errors and clean mobile responsiveness',
          'Proper asynchronous error boundary with retry mechanism',
          'Clean Git commit history with at least 5 meaningful commits'
        ],
        fresherTip: 'Do not jump into frameworks like React yet! 85% of junior technical screening questions focus purely on vanilla JavaScript closures, array mutations, and asynchronous promise handling.',
        commonPitfall: 'Relying exclusively on AI code generators without writing the logic by hand. Recruiters test your ability to trace JavaScript execution line-by-line during live coding rounds.',
        hiringChecklist: [
          'Readable, formatted code adhering to standard conventions',
          'Comprehensive README with installation steps and live demo link',
          'Responsive UI that looks clean on both mobile (375px) and desktop'
        ],
        resources: [
          { label: 'MDN Web Docs: JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', type: 'Documentation' },
          { label: 'IBM SkillsBuild: Web Dev Track', url: 'https://skillsbuild.org', type: 'Accredited Course' },
          { label: 'JavaScript.info: Deep Dive', url: 'https://javascript.info/', type: 'Free Guide' }
        ]
      },
      {
        id: 'm2',
        phaseName: 'Phase 2: Frontend Engineering',
        weeks: 'Weeks 4–6',
        intensiveWeeks: 'Weeks 3–4',
        title: 'React 19, Modern Hooks & State Architecture',
        summary: 'Build modular, reactive user interfaces with React component architecture, custom hooks, and Tailwind utility styling.',
        targetGap: 'React & Component Architecture',
        topics: [
          'JSX Virtual DOM & Declarative Rendering Paradigm',
          'Core React Hooks: useState, useEffect, useMemo, useRef',
          'State Architecture: Prop Drilling vs React Context API',
          'Client-Side Routing with React Router v6',
          'Tailwind CSS Integration & Reusable Component Systems'
        ],
        projectTitle: 'Modular Agile Kanban & Task Command Center',
        projectDesc: 'Create an interactive task management application supporting multiple swimlanes, drag-and-drop task movements, priority tagging, keyword search filtering, and local storage persistence.',
        projectRequirements: [
          'Component decomposition into reusable buttons, badges, and modals',
          'Custom hook to sync state automatically with browser localStorage',
          'Smooth micro-animations when dragging and adding tasks'
        ],
        fresherTip: 'Keep state as local as possible. Junior developers often make the mistake of creating bloated global context for data that only belongs to a single card or modal.',
        commonPitfall: 'Ignoring hook dependency arrays in useEffect, leading to infinite render loops and severe browser memory leaks.',
        hiringChecklist: [
          'Clean modular component hierarchy in /components directory',
          'Zero prop drilling past two levels (use Context or custom hooks)',
          'Accessible keyboard navigation for modals and buttons'
        ],
        resources: [
          { label: 'React Official Documentation (react.dev)', url: 'https://react.dev/', type: 'Documentation' },
          { label: 'Scrimba: Interactive Learn React', url: 'https://scrimba.com/learn/learnreact', type: 'Interactive' },
          { label: 'Tailwind CSS Component Patterns', url: 'https://tailwindcss.com/docs', type: 'Design System' }
        ]
      },
      {
        id: 'm3',
        phaseName: 'Phase 3: Backend & APIs',
        weeks: 'Weeks 7–9',
        intensiveWeeks: 'Weeks 5–6',
        title: 'Node.js, Express & Secure RESTful APIs',
        summary: 'Architect robust backend web services with Express routing, JWT token security, middleware pipelines, and input sanitization.',
        targetGap: 'Node.js & Backend Architecture',
        topics: [
          'Node.js Asynchronous Runtime & Non-blocking I/O',
          'Express.js Middleware Architecture & Request Pipeline',
          'RESTful API Endpoint Design & HTTP Status Conventions',
          'JWT Authentication, Password Hashing (bcrypt) & Cookies',
          'Request Validation, Rate Limiting & Global Error Handlers'
        ],
        projectTitle: 'Secure User Auth & RESTful Content API',
        projectDesc: 'Develop a complete production REST API with registration, JWT login, protected role-based routes, password hashing with bcrypt, input validation with Joi/Zod, and full Postman documentation.',
        projectRequirements: [
          'Centralized error handling middleware returning uniform JSON responses',
          'Protected route middleware that verifies and decodes JWT tokens',
          'Zero exposed passwords or secrets in Git (use .env files)'
        ],
        fresherTip: 'Always document your API endpoints with a Postman collection or Swagger spec. Hiring engineers are immediately impressed when a junior candidate includes API documentation.',
        commonPitfall: 'Committing your `.env` file with database passwords and API keys to public GitHub. Always include `.env` in your `.gitignore` before your very first commit!',
        hiringChecklist: [
          'Proper HTTP status codes (201 for Created, 400 for Bad Input, 401 for Unauthorized, 404 for Missing, 500 for Server Error)',
          'Clear environment configuration file with a safe `.env.example` template',
          'Rate limiting middleware enabled to prevent brute-force attacks'
        ],
        resources: [
          { label: 'Node.js Official Documentation', url: 'https://nodejs.org/en/docs', type: 'Documentation' },
          { label: 'The Odin Project: NodeJS Path', url: 'https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs', type: 'Free Track' },
          { label: 'Express.js Security Best Practices', url: 'https://expressjs.com/en/advanced/best-practice-security.html', type: 'Security' }
        ]
      },
      {
        id: 'm4',
        phaseName: 'Phase 4: Persistence & Data',
        weeks: 'Weeks 10–12',
        intensiveWeeks: 'Weeks 7–8',
        title: 'Database Engineering, SQL & MongoDB Modeling',
        summary: 'Design normalized relational and document schemas, optimize queries with indexes, and implement reliable ACID transactions.',
        targetGap: 'Databases & SQL / MongoDB',
        topics: [
          'Relational DB (PostgreSQL) vs Document DB (MongoDB)',
          'Mongoose Schemas, Foreign Keys, Validation & Virtuals',
          'SQL Complex Queries: Joins, Grouping & Aggregations',
          'Indexing Strategies, Query Optimization & EXPLAIN ANALYZE',
          'Database Migrations & Modern ORMs (Prisma / Mongoose)'
        ],
        projectTitle: 'E-Commerce Data Engine with Search & Cart',
        projectDesc: 'Design and implement the data persistence layer for an e-commerce platform with Products, Users, Categories, and Orders. Implement pagination, multi-attribute filtering, and stock decrementing transactions.',
        projectRequirements: [
          'Indexed search fields for instant product name queries',
          'Atomic transaction when creating an order to decrement inventory stock',
          'Database seed script generating realistic sample data for local testing'
        ],
        fresherTip: 'Junior interviews almost always include a database question: "Design the schema for Spotify / Amazon Orders." Practice drawing Entity Relationship Diagrams (ERDs) on paper.',
        commonPitfall: 'Writing queries inside loops (the infamous N+1 problem). Always use SQL JOINs or MongoDB `$lookup` / `.populate()` to fetch relations in single round-trips.',
        hiringChecklist: [
          'Clear schema ERD diagram included in project documentation',
          'Automated database seeding script with `npm run seed`',
          'Data validation enforced at both application layer and schema layer'
        ],
        resources: [
          { label: 'MongoDB University (Free Certification Prep)', url: 'https://learn.mongodb.com/', type: 'Accredited' },
          { label: 'Prisma Schema & Database Guide', url: 'https://www.prisma.io/docs', type: 'Documentation' },
          { label: 'PostgreSQL Tutorial for Developers', url: 'https://www.postgresqltutorial.com/', type: 'Tutorial' }
        ]
      },
      {
        id: 'm5',
        phaseName: 'Phase 5: DevOps & Capstone',
        weeks: 'Weeks 13–16',
        intensiveWeeks: 'Weeks 9–10',
        title: 'Cloud DevOps, Docker Containerization & Portfolio',
        summary: 'Containerize multi-service applications with Docker, configure automated CI/CD deployment pipelines, and polish your portfolio for technical recruiting.',
        targetGap: 'Docker, CI/CD & Deployment',
        topics: [
          'Docker Engine, Multi-Stage Dockerfiles & Optimization',
          'Docker Compose: Multi-Container Local Dev Environments',
          'Automated CI/CD Testing Pipelines with GitHub Actions',
          'Cloud Hosting: Vercel Frontend & Render/Railway Backend',
          'Lighthouse Performance Audits, Web Security & ATS Resume'
        ],
        projectTitle: 'Production MERN Capstone with CI/CD & Live Cloud Domain',
        projectDesc: 'Containerize your full-stack web application with Docker Compose, establish automated GitHub Actions that run unit tests on every pull request, and deploy live to the cloud with a custom domain.',
        projectRequirements: [
          'Working public live URL with 90+ Lighthouse performance score',
          'Automated CI workflow passing unit tests before branch merges',
          'Comprehensive README with architecture diagram, credentials demo, and setup instructions'
        ],
        fresherTip: 'Having one polished, deployed, end-to-end full stack project on your resume beats five half-finished tutorial clones. Recruiters want to see that you understand deployment and production operations.',
        commonPitfall: 'Submitting a portfolio full of broken deployment links or repositories that fail to build when the recruiter runs `npm install`. Always test your clone on a fresh machine!',
        hiringChecklist: [
          'Live clickable deployment URL prominently listed at top of README',
          'Demo credentials provided so recruiters can test login immediately without registering',
          'Clean multi-stage Dockerfile that minimizes production image size'
        ],
        resources: [
          { label: 'Docker Getting Started Guide', url: 'https://docs.docker.com/get-started/', type: 'Documentation' },
          { label: 'GitHub Actions CI/CD Workflow Guide', url: 'https://docs.github.com/en/actions', type: 'CI/CD' },
          { label: 'IBM SkillsBuild: Cloud Native Specialist', url: 'https://skillsbuild.org', type: 'Accredited Track' }
        ]
      }
    ]
  },
  {
    id: 'frontend',
    label: 'Frontend Developer',
    roleTag: 'UI/UX & Client Performance',
    icon: '🎨',
    standardWeeks: 14,
    intensiveWeeks: 7,
    difficulty: 'Beginner → Intermediate',
    diffColor: 'text-sky-400 bg-sky-400/10 border-sky-500/30',
    accentColor: 'bg-cyan-600',
    accentGradient: 'from-cyan-600 to-blue-600',
    glowColor: 'shadow-cyan-500/40',
    borderColor: 'border-cyan-500/80',
    hoverGlow: 'hover-glow-teal',
    ringColor: 'ring-cyan-500',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'React 19', 'TypeScript 5', 'Tailwind CSS', 'Next.js 15'],
    description: 'Focused path for design-minded freshers looking to master cutting-edge client engineering, TypeScript type safety, Next.js streaming, and accessibility.',
    milestones: [
      {
        id: 'm1',
        phaseName: 'Phase 1: Precision UI',
        weeks: 'Weeks 1–2',
        intensiveWeeks: 'Week 1',
        title: 'Modern CSS3, Fluid Layouts & Accessibility',
        summary: 'Deep dive into semantic markup, responsive design principles, CSS custom properties, and WCAG accessibility compliance.',
        targetGap: 'CSS & Accessibility',
        topics: [
          'Semantic HTML5 & Accessible Screen Reader Trees',
          'CSS Grid Complex Layouts & Responsive Flexbox',
          'Fluid Typography & Viewport Math (clamp, min, max)',
          'CSS Custom Properties & Dynamic Theming Systems',
          'Micro-Interactions, Keyframe Animations & Transitions'
        ],
        projectTitle: 'Pixel-Perfect Accessible SaaS Landing Page',
        projectDesc: 'Build a high-conversion landing page from a Figma design specification without using UI frameworks. Include dark mode toggle, accessible interactive accordion, and mobile drawer menu.',
        projectRequirements: ['100% Lighthouse Accessibility audit score', 'Flawless responsive behavior across 320px to 1920px viewports', 'Smooth CSS theme transition between dark and light modes'],
        fresherTip: 'Accessibility (a11y) is a huge differentiator for junior frontend applicants. Knowing semantic tags and ARIA labels immediately places you in the top 10% of applicants.',
        commonPitfall: 'Using `px` for everything instead of responsive `rem` and `em` units, breaking user font size preferences.',
        hiringChecklist: ['Tested with screen readers or VoiceOver', 'Passes contrast checks for all text colors', 'Valid semantic markup hierarchy (single h1)'],
        resources: [
          { label: 'web.dev: Learn CSS Guide', url: 'https://web.dev/learn/css/', type: 'Documentation' },
          { label: 'CSS-Tricks: Complete Guide to Grid', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/', type: 'Guide' }
        ]
      },
      {
        id: 'm2',
        phaseName: 'Phase 2: Modern JS & Async',
        weeks: 'Weeks 3–5',
        intensiveWeeks: 'Weeks 2–3',
        title: 'Deep JavaScript & Browser API Architecture',
        summary: 'Master the browser DOM, asynchronous event handling, REST data fetching, and module bundling.',
        targetGap: 'JavaScript DOM & APIs',
        topics: [
          'DOM Event Delegation & Bubbling Mechanics',
          'Fetch API, AbortController & Handling Request Timeouts',
          'Browser Storage: localStorage, sessionStorage & IndexedDB',
          'Array Methods (reduce, flatMap) & Immutable Data Patterns',
          'Vite Bundler Setup, Tree-Shaking & NPM Dependency Management'
        ],
        projectTitle: 'Dynamic Streaming Movie & Media Explorer',
        projectDesc: 'Build an interactive movie database consuming a public REST API. Implement debounced instant search, infinite scroll pagination, and persistent favorites list.',
        projectRequirements: ['Debounced search inputs to avoid API rate limit violations', 'Skeleton loading states during data fetch delays', 'Graceful offline fallback using browser storage'],
        fresherTip: 'Learn how to debounce search inputs. Senior engineers evaluate junior code specifically for performance optimizations like debouncing and memoization.',
        commonPitfall: 'Directly mutating objects and arrays rather than using functional immutable patterns (`map`, `filter`, spread operators).',
        hiringChecklist: ['Debounced event listeners to save bandwidth', 'Custom skeleton loaders for premium UX', 'Zero race condition bugs during rapid typing'],
        resources: [
          { label: 'javascript.info: The Modern JS Tutorial', url: 'https://javascript.info/', type: 'Free Guide' }
        ]
      },
      {
        id: 'm3',
        phaseName: 'Phase 3: React & TypeScript',
        weeks: 'Weeks 6–8',
        intensiveWeeks: 'Weeks 4–5',
        title: 'React 19 & Strict TypeScript Engineering',
        summary: 'Integrate React component architecture with strict TypeScript typing, generics, and custom hook abstractions.',
        targetGap: 'TypeScript & Type Safety',
        topics: [
          'TypeScript Types, Interfaces, Generics & Utility Types',
          'Typing React Props, Event Handlers & Mutable State',
          'Custom Hooks Abstraction for Reusable Business Logic',
          'Server State Caching with TanStack Query (React Query)',
          'Form Validation with React Hook Form & Zod Schema'
        ],
        projectTitle: 'Enterprise Component System & Typed Storefront',
        projectDesc: 'Build a typed e-commerce product catalog with interactive filters, cart state management, and an end-to-end checkout form validated by Zod schemas.',
        projectRequirements: ['Strict TypeScript enabled (`strict: true`) with zero `any` types', 'Type-safe custom hooks for cart management', 'Zod schema validation providing instant inline error feedback'],
        fresherTip: 'Enterprise frontend teams write almost 100% TypeScript. Mentioning TypeScript proficiency on your junior resume will double your interview callback rate.',
        commonPitfall: 'Using `any` as an escape hatch whenever TypeScript displays an error. Learn to define proper union types and generic interfaces.',
        hiringChecklist: ['tsconfig has `noImplicitAny: true` enabled', 'Clean separation of UI presentation from business logic', 'Type-safe API response models matching backend contracts'],
        resources: [
          { label: 'TypeScript Handbook Official', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', type: 'Documentation' }
        ]
      },
      {
        id: 'm4',
        phaseName: 'Phase 4: Design Systems',
        weeks: 'Weeks 9–11',
        intensiveWeeks: 'Week 6',
        title: 'Tailwind CSS, shadcn/ui & Design Systems',
        summary: 'Build reusable, accessible component libraries utilizing Tailwind CSS, headless UI primitives, and design tokens.',
        targetGap: 'Design Systems & Tailwind',
        topics: [
          'Tailwind CSS Utility-First Architecture & JIT Compiler',
          'Accessible Headless Primitives (Radix UI / shadcn/ui)',
          'Design Tokens: Spacing Scales, Typography & Color Palettes',
          'Dark Mode Theming & High-Contrast Mode Support',
          'Component Isolation & Documentation with Storybook'
        ],
        projectTitle: 'Published Component Library with Storybook Showcase',
        projectDesc: 'Create a reusable UI component kit featuring Buttons, Modals, Dropdowns, and Form inputs. Document each component variant with Storybook and publish as an NPM package or showcase site.',
        projectRequirements: ['Interactive Storybook controls for every component variant', 'Consistent theme token support via Tailwind configuration', 'Full keyboard navigation for all interactive elements'],
        fresherTip: 'Modern startups love candidates who can bridge the gap between Figma designs and Tailwind code. Showcasing Storybook documentation demonstrates senior-level craftsmanship.',
        commonPitfall: 'Hardcoding arbitrary colors and pixel sizes in Tailwind classes instead of creating a coherent design theme in `tailwind.config.js`.',
        hiringChecklist: ['Published Storybook or live demo link', 'Consistent spacing and elevation tokens', 'Proper focus ring outlines for accessible keyboard tabs'],
        resources: [
          { label: 'Tailwind CSS Official Guide', url: 'https://tailwindcss.com/docs', type: 'Documentation' },
          { label: 'shadcn/ui Component Kit', url: 'https://ui.shadcn.com/', type: 'Design Kit' }
        ]
      },
      {
        id: 'm5',
        phaseName: 'Phase 5: Next.js & Performance',
        weeks: 'Weeks 12–14',
        intensiveWeeks: 'Week 7',
        title: 'Next.js 15, SSR/SSG & Core Web Vitals Optimization',
        summary: 'Deploy lightning-fast applications with Next.js App Router, Server Components, Streaming SSR, and Core Web Vitals optimization.',
        targetGap: 'Next.js & Performance',
        topics: [
          'Next.js 15 App Router Architecture & Server Components',
          'Server-Side Rendering (SSR) vs Static Generation (SSG)',
          'Image Optimization (next/image) & Font Subsetting',
          'Core Web Vitals: LCP, INP, CLS & Performance Profiling',
          'Production Deployment & Edge Middleware on Vercel'
        ],
        projectTitle: 'Next.js 15 High-Performance Blog & Portfolio Platform',
        projectDesc: 'Build a production developer portfolio and blog with Next.js 15 App Router, React Server Components, MDX blog support, dynamic Open Graph social images, and a perfect 100 Lighthouse score.',
        projectRequirements: ['95+ score across all 4 Lighthouse categories (Performance, Accessibility, Best Practices, SEO)', 'Server-rendered pages with dynamic Open Graph metadata cards', 'Live deployment on Vercel with zero runtime warnings'],
        fresherTip: 'Recruiters check your portfolio on mobile and run Lighthouse audits. A blazing-fast portfolio that loads in under 1 second creates an unforgettable first impression.',
        commonPitfall: 'Putting "use client" at the top of every file in Next.js, completely negating the performance benefits of Server Components.',
        hiringChecklist: ['Flawless Core Web Vitals with zero Cumulative Layout Shift (CLS)', 'Optimized responsive images with proper width/height attributes', 'Valid structured JSON-LD data for search engine indexing'],
        resources: [
          { label: 'Next.js Official Learn Platform', url: 'https://nextjs.org/learn', type: 'Interactive' },
          { label: 'web.dev Core Web Vitals Guide', url: 'https://web.dev/vitals/', type: 'Performance' }
        ]
      }
    ]
  },
  {
    id: 'aiml',
    label: 'AI / ML & Data Science',
    roleTag: 'Model Training, LLMs & Pipelines',
    icon: '🤖',
    standardWeeks: 18,
    intensiveWeeks: 9,
    difficulty: 'Intermediate → Advanced',
    diffColor: 'text-purple-400 bg-purple-400/10 border-purple-500/30',
    accentColor: 'bg-purple-600',
    accentGradient: 'from-purple-600 to-indigo-600',
    glowColor: 'shadow-purple-500/40',
    borderColor: 'border-purple-500/80',
    hoverGlow: 'hover-glow-purple',
    ringColor: 'ring-purple-500',
    stack: ['Python 3.12', 'NumPy', 'Pandas', 'Scikit-learn', 'PyTorch', 'LangChain', 'FastAPI', 'Vector DBs'],
    description: 'Practical engineering path for freshers to master exploratory data analysis, classical machine learning algorithms, deep learning neural networks, and modern Generative AI / RAG pipelines.',
    milestones: [
      {
        id: 'm1',
        phaseName: 'Phase 1: Python & Data EDA',
        weeks: 'Weeks 1–3',
        intensiveWeeks: 'Weeks 1–2',
        title: 'Python for Data, NumPy & Pandas Wrangling',
        summary: 'Establish foundational data analysis workflows with vectorized NumPy operations, Pandas transformations, and statistical visualizations.',
        targetGap: 'Python & Data Analysis',
        topics: [
          'Python Object-Oriented & Functional Programming Patterns',
          'NumPy Array Vectorization & Linear Algebra Foundations',
          'Pandas DataFrames: Cleaning, Merging & Handling Missing Data',
          'Exploratory Data Analysis (EDA) & Outlier Detection',
          'Data Visualizations with Matplotlib, Seaborn & Plotly'
        ],
        projectTitle: 'Comprehensive EDA Report on Tech Hiring Salaries',
        projectDesc: 'Analyze a dataset of 50,000+ tech job postings. Clean missing fields, detect salary outliers, visualize compensation distributions by role and location, and publish a Jupyter Notebook with insights.',
        projectRequirements: ['Clear statistical explanations for all visualizations', 'Proper imputation of missing values with documentation', 'Exportable summary charts suitable for executive presentations'],
        fresherTip: 'Data scientists spend 80% of their time cleaning dirty data. Highlighting thorough data cleaning and validation skills makes you stand out from candidates who only run toy models.',
        commonPitfall: 'Blindly dropping rows with missing values instead of analyzing whether data is Missing Completely at Random (MCAR).',
        hiringChecklist: ['Documented data dictionary explaining all columns', 'Reproducible Jupyter Notebook with step-by-step markdown notes', 'Clear actionable conclusions based on the data'],
        resources: [
          { label: 'Kaggle Learn: Python for Data Science', url: 'https://www.kaggle.com/learn/python', type: 'Interactive' },
          { label: 'Pandas User Guide Official', url: 'https://pandas.pydata.org/docs/user_guide/index.html', type: 'Documentation' }
        ]
      },
      {
        id: 'm2',
        phaseName: 'Phase 2: Classical ML',
        weeks: 'Weeks 4–7',
        intensiveWeeks: 'Weeks 3–4',
        title: 'Supervised Learning & Scikit-learn Pipelines',
        summary: 'Train, evaluate, and tune classical regression and classification models using rigorous cross-validation and feature engineering.',
        targetGap: 'Machine Learning Algorithms',
        topics: [
          'Supervised Learning: Linear, Ridge, Lasso & Logistic Regression',
          'Tree Algorithms: Decision Trees, Random Forests & XGBoost',
          'Model Evaluation: Precision, Recall, F1-Score & ROC-AUC Curves',
          'Bias-Variance Tradeoff, Overfitting & Cross-Validation',
          'Scikit-learn Pipelines, StandardScaler & Hyperparameter Tuning'
        ],
        projectTitle: 'Predictive Candidate Attrition & Salary Predictor',
        projectDesc: 'Build an end-to-end classification model predicting employee turnover probability. Construct Scikit-learn feature transformation pipelines, tune hyperparameters with GridSearchCV, and compare 3 model algorithms.',
        projectRequirements: ['Evaluated with both confusion matrix and ROC-AUC curve', 'Feature importance analysis explaining top predictive variables', 'Saved serialized model artifact (.pkl / joblib)'],
        fresherTip: 'Accuracy is not always the best metric! When dealing with imbalanced datasets (e.g. churn or fraud), always evaluate Precision, Recall, and ROC-AUC.',
        commonPitfall: 'Data leakage: fitting feature scalers on the entire dataset before splitting into train/test sets. Always fit transformers on train data only!',
        hiringChecklist: ['Proper 80/20 train-test split before preprocessing', 'Evaluation metrics chosen based on class balance', 'Feature importance chart explaining model decisions'],
        resources: [
          { label: 'IBM SkillsBuild: ML Fundamentals Track', url: 'https://skillsbuild.org', type: 'Accredited' },
          { label: 'Scikit-learn User Guide', url: 'https://scikit-learn.org/stable/user_guide.html', type: 'Documentation' }
        ]
      },
      {
        id: 'm3',
        phaseName: 'Phase 3: Deep Learning',
        weeks: 'Weeks 8–11',
        intensiveWeeks: 'Weeks 5–6',
        title: 'Neural Networks, Backpropagation & PyTorch',
        summary: 'Construct deep learning architectures with PyTorch: artificial neural networks, convolutional networks for computer vision, and GPU acceleration.',
        targetGap: 'PyTorch & Deep Learning',
        topics: [
          'Perceptrons, Activation Functions (ReLU, Softmax) & Loss Functions',
          'Backpropagation, Gradient Descent & Adam Optimizer Mechanics',
          'PyTorch Tensors, Autograd & Custom Dataset Loaders',
          'Convolutional Neural Networks (CNNs) for Computer Vision',
          'Transfer Learning with Pretrained Models (ResNet, EfficientNet)'
        ],
        projectTitle: 'Medical Scan Classification via Transfer Learning in PyTorch',
        projectDesc: 'Train a convolutional neural network using transfer learning (ResNet50) on a medical image dataset. Implement data augmentations, visualize training loss curves, and evaluate on test samples.',
        projectRequirements: ['Custom PyTorch Dataset and DataLoader implementation', 'Learning rate scheduling with EarlyStopping', 'Confusion matrix visualization on the held-out test split'],
        fresherTip: 'Train models on free GPU instances like Google Colab or Kaggle Notebooks. Master PyTorch over TensorFlow, as 90% of contemporary AI research and industry labs use PyTorch.',
        commonPitfall: 'Forgetting `model.eval()` and `torch.no_grad()` during inference, which leaves dropout layers active and wastes GPU memory.',
        hiringChecklist: ['Training and validation loss curves plotted side-by-side', 'Data augmentation techniques used to combat overfitting', 'Clean PyTorch training loop with progress tracking'],
        resources: [
          { label: 'fast.ai: Practical Deep Learning for Coders', url: 'https://course.fast.ai/', type: 'Free Course' },
          { label: 'PyTorch Official Deep Learning Tutorials', url: 'https://pytorch.org/tutorials/', type: 'Documentation' }
        ]
      },
      {
        id: 'm4',
        phaseName: 'Phase 4: Generative AI & RAG',
        weeks: 'Weeks 12–15',
        intensiveWeeks: 'Weeks 7–8',
        title: 'LLMs, Vector Databases & RAG Pipelines',
        summary: 'Architect Generative AI applications utilizing Large Language Models, semantic embeddings, vector databases, and retrieval augmented generation.',
        targetGap: 'LLMs, RAG & Vector DBs',
        topics: [
          'Transformer Architecture Overview & Self-Attention Mechanisms',
          'Prompt Engineering: Few-Shot, Chain-of-Thought & System Directives',
          'Semantic Embeddings & Vector Stores (ChromaDB, Pinecone, FAISS)',
          'Retrieval-Augmented Generation (RAG) Architecture & Chunking',
          'LangChain & LlamaIndex Frameworks for Autonomous AI Agents'
        ],
        projectTitle: 'Enterprise Document RAG Assistant with Source Citations',
        projectDesc: 'Build an intelligent Q&A chatbot that ingests multi-page technical PDF documents, computes vector embeddings, queries a vector database for relevant semantic chunks, and generates verified answers with exact page citations.',
        projectRequirements: ['Chunking strategy optimized with token overlap', 'Direct page and paragraph source citation displayed with every answer', 'Guardrail filters preventing hallucinations on out-of-domain questions'],
        fresherTip: 'RAG is the #1 most sought-after skill for junior AI developers today. Every enterprise wants to chat with their private internal documents without training an LLM from scratch.',
        commonPitfall: 'Using overly large chunk sizes, which dilutes semantic relevancy and leads to context window bloat and irrelevant answers.',
        hiringChecklist: ['Configured similarity threshold to filter irrelevant chunks', 'Document upload pipeline supporting PDF and text files', 'Interactive web interface using Streamlit or React'],
        resources: [
          { label: 'DeepLearning.AI: Short Courses on LangChain & RAG', url: 'https://www.deeplearning.ai/short-courses/', type: 'Interactive' },
          { label: 'LangChain Official Documentation', url: 'https://docs.langchain.com/', type: 'Documentation' }
        ]
      },
      {
        id: 'm5',
        phaseName: 'Phase 5: MLOps & Production',
        weeks: 'Weeks 16–18',
        intensiveWeeks: 'Week 9',
        title: 'FastAPI Model Serving, Docker & Production MLOps',
        summary: 'Package trained models into high-performance REST APIs with FastAPI, containerize environments, and track experiments with MLflow.',
        targetGap: 'MLOps & Model Deployment',
        topics: [
          'FastAPI Model Serving, Pydantic Schema Validation & Async Routes',
          'Containerizing ML Workloads with Docker & CUDA Base Images',
          'MLflow Experiment Tracking & Model Registry Lifecycle',
          'Data Version Control (DVC) for Reproducible Pipelines',
          'Cloud Model Deployment & Continuous Performance Monitoring'
        ],
        projectTitle: 'Production ML Inference Microservice on Cloud',
        projectDesc: 'Package your best machine learning model into a containerized FastAPI service. Include automated input validation with Pydantic, swagger documentation, and deploy to AWS / Render with latency benchmarks.',
        projectRequirements: ['Automated health check and prediction endpoints', 'Interactive Swagger UI documentation generated automatically', 'Docker containerized with minimal footprint and dependency isolation'],
        fresherTip: 'Most junior applicants know how to run a model in a Jupyter Notebook, but fail to turn it into an API that other software engineers can use. Proving deployment capability is how you land the job.',
        commonPitfall: 'Loading model weights inside the request endpoint instead of loading them once during startup (app lifespan), causing catastrophic request latency.',
        hiringChecklist: ['Swagger / OpenAPI docs accessible at `/docs`', 'Docker container builds and runs with one command', 'Pydantic schemas enforce type safety on input data'],
        resources: [
          { label: 'Made With ML: MLOps Production Guide', url: 'https://madewithml.com/', type: 'Free Guide' },
          { label: 'FastAPI Official Documentation', url: 'https://fastapi.tiangolo.com/', type: 'Documentation' }
        ]
      }
    ]
  },
  {
    id: 'cybersec',
    label: 'Cybersecurity Analyst',
    roleTag: 'SOC, Blue Team & Threat Defense',
    icon: '🔐',
    standardWeeks: 14,
    intensiveWeeks: 7,
    difficulty: 'Intermediate',
    diffColor: 'text-red-400 bg-red-400/10 border-red-500/30',
    accentColor: 'bg-red-600',
    accentGradient: 'from-red-600 to-rose-600',
    glowColor: 'shadow-red-500/40',
    borderColor: 'border-red-500/80',
    hoverGlow: 'hover-glow-rose',
    ringColor: 'ring-red-500',
    stack: ['Linux CLI', 'Python', 'Networking (TCP/IP)', 'Wireshark', 'Nmap', 'Splunk / SIEM', 'OWASP Top 10'],
    description: 'Practical security pathway for freshers to learn network traffic inspection, threat intelligence, vulnerability assessment, and security operations center (SOC) triage.',
    milestones: [
      {
        id: 'm1',
        phaseName: 'Phase 1: Networking & Linux',
        weeks: 'Weeks 1–3',
        intensiveWeeks: 'Weeks 1–2',
        title: 'TCP/IP Architecture, Linux CLI & Lab Setup',
        summary: 'Master networking protocols, packet flow analysis, Linux permissions, bash scripting, and virtual home lab setup.',
        targetGap: 'Networking & Linux Fundamentals',
        topics: [
          'OSI 7-Layer & TCP/IP Protocol Stack Deep Dive',
          'Subnetting, CIDR Notation, DNS, DHCP & NAT Routing',
          'Linux CLI Navigation, User Management & Permissions (chmod/chown)',
          'Bash Scripting for Automated Log Parsing & Security Tasks',
          'VirtualBox / VMware Isolated Home Lab Configuration'
        ],
        projectTitle: 'Configured Isolated Virtual Security Lab with Linux & Router',
        projectDesc: 'Set up an isolated dual-network home lab in VirtualBox with Kali Linux and an Ubuntu Server. Write a bash script that parses auth logs to detect failed SSH brute-force attempts and automatically updates iptables rules.',
        projectRequirements: ['Functional isolated virtual network architecture', 'Bash automation script with error handling and log outputs', 'Comprehensive network diagram documenting IP allocation and firewall rules'],
        fresherTip: 'CompTIA Security+ and practical Linux skills are the gold standard for landing an entry-level SOC tier-1 analyst position. Master the command line without relying on graphical interfaces.',
        commonPitfall: 'Running security scans on public servers without explicit permission. Always restrict all testing strictly to your isolated local virtual lab!',
        hiringChecklist: ['Clean network diagram documenting your home lab layout', 'Working bash automation script published on GitHub', 'Solid grasp of port numbers: 22 (SSH), 53 (DNS), 80/443 (HTTP/S), 3389 (RDP)'],
        resources: [
          { label: 'TryHackMe: Pre-Security Pathway', url: 'https://tryhackme.com/path/outline/presecurity', type: 'Interactive' },
          { label: 'Linux Journey: Free Command Line Course', url: 'https://linuxjourney.com/', type: 'Tutorial' }
        ]
      },
      {
        id: 'm2',
        phaseName: 'Phase 2: Packet Analysis',
        weeks: 'Weeks 4–6',
        intensiveWeeks: 'Weeks 3–4',
        title: 'Network Traffic Inspection with Wireshark & Nmap',
        summary: 'Capture network packets, identify suspicious traffic anomalies, and conduct structured vulnerability reconnaissance.',
        targetGap: 'Packet Inspection & Scanning',
        topics: [
          'Packet Sniffing & Protocol Dissection with Wireshark',
          'TCP Handshake Analysis, Flags & Reset Attacks',
          'Network Reconnaissance & Port Scanning with Nmap',
          'Vulnerability Scanning Principles & Banner Grabbing',
          'Firewall Rule Synthesis & Intrusion Detection Systems (Snort)'
        ],
        projectTitle: 'Deep Packet Inspection & Threat Triage Report',
        projectDesc: 'Analyze a series of real-world malicious PCAP network capture files. Identify an active port scan, trace credential harvesting over unencrypted HTTP, and write an executive incident summary with remediation steps.',
        projectRequirements: ['Wireshark filter syntax cheatsheet included in repository', 'Executive incident summary detailing timestamp, source IP, and IOCs', 'Concrete firewall and patch management remediation recommendations'],
        fresherTip: 'Learn how to read PCAP files. In entry-level security interviews, managers frequently give you a Wireshark capture and ask you to identify what attack took place.',
        commonPitfall: 'Using overly broad Nmap scans (`-p- -A`) that trigger alarm bells and overload targets. Understand stealth SYN scans (`-sS`) versus connect scans (`-sT`).',
        hiringChecklist: ['Professional incident report formatting with executive summary', 'Clear List of Indicators of Compromise (IOCs) identified', 'Explanation of the 3-way TCP handshake (SYN, SYN-ACK, ACK)'],
        resources: [
          { label: 'Wireshark Official User Guide & Sample Captures', url: 'https://www.wireshark.org/docs/', type: 'Documentation' },
          { label: 'Nmap Network Scanning by Gordon Lyon', url: 'https://nmap.org/book/', type: 'Reference' }
        ]
      },
      {
        id: 'm3',
        phaseName: 'Phase 3: Web App Defense',
        weeks: 'Weeks 7–9',
        intensiveWeeks: 'Weeks 5',
        title: 'Application Security & OWASP Top 10 Mitigation',
        summary: 'Understand offensive vulnerability mechanics to effectively engineer defensive mitigations against the OWASP Top 10 security risks.',
        targetGap: 'OWASP Security & Secure Coding',
        topics: [
          'OWASP Top 10 Vulnerabilities: Injection, Broken Auth, SSRF',
          'SQL Injection (SQLi) Mechanics & Prepared Statement Fixes',
          'Cross-Site Scripting (XSS): Stored, Reflected & DOM-based',
          'Cross-Site Request Forgery (CSRF) & SameSite Cookie Policies',
          'Burp Suite Proxy Configuration & Secure Code Auditing'
        ],
        projectTitle: 'Vulnerable App Pen-Test & Remediation Codebase',
        projectDesc: 'Audit a intentionally vulnerable web application (DVWA / Juice Shop). Identify 3 critical vulnerabilities (SQLi, XSS, IDOR), document reproduction steps, and commit the actual code patches that eliminate the flaws.',
        projectRequirements: ['Complete vulnerability disclosure report following CVE guidelines', 'Before and after source code diff showing proper sanitization', 'Burp Suite request/response logs confirming successful remediation'],
        fresherTip: 'Understanding both how to exploit a flaw and how to patch it in code makes you invaluable. Developers and security teams alike respect analysts who can write secure code.',
        commonPitfall: 'Relying on client-side JavaScript validation for security. All defensive sanitization and authorization checks MUST be enforced on the backend server.',
        hiringChecklist: ['Clear explanation of parameterized queries vs concatenation', 'Understanding of Content Security Policy (CSP) headers', 'Documented remediation diffs in GitHub PR format'],
        resources: [
          { label: 'PortSwigger Web Security Academy (Free Certification Prep)', url: 'https://portswigger.net/web-security', type: 'Interactive' },
          { label: 'OWASP Top 10 Official Documentation', url: 'https://owasp.org/www-project-top-ten/', type: 'Standard' }
        ]
      },
      {
        id: 'm4',
        phaseName: 'Phase 4: SOC & SIEM',
        weeks: 'Weeks 10–12',
        intensiveWeeks: 'Weeks 6',
        title: 'SOC Operations, Splunk & Incident Response',
        summary: 'Ingest security event logs into Splunk SIEM, construct detection correlation rules, and triage simulated cyber incidents following the NIST framework.',
        targetGap: 'SIEM & SOC Operations',
        topics: [
          'Security Information & Event Management (SIEM) Architecture',
          'Splunk Search Processing Language (SPL) Queries',
          'Log Correlation Rules: Detecting Brute Force & Privilege Escalation',
          'NIST & SANS Incident Response Lifecycle Frameworks',
          'Threat Intelligence (MITRE ATT&CK Framework Mapping)'
        ],
        projectTitle: 'Interactive Splunk SOC Dashboard with Alert Correlation',
        projectDesc: 'Deploy a local Splunk instance. Ingest authentic web server and Windows event logs, craft SPL queries to detect credential stuffing and lateral movement, and configure an automated alert trigger.',
        projectRequirements: ['Custom Splunk dashboard featuring 4 visual metric panels', 'Documented SPL search queries mapped to MITRE ATT&CK IDs', 'Incident response playbook detailing triage steps for tier-1 SOC analysts'],
        fresherTip: 'Splunk has a free educational license. Building an actual working Splunk dashboard and uploading screenshots with SPL queries to your portfolio is the quickest ticket to a SOC interview.',
        commonPitfall: 'Ignoring false positives: writing detection rules that trigger alerts on legitimate administrative behavior, causing alert fatigue.',
        hiringChecklist: ['SPL queries documented with inline commentary', 'Incident response playbook organized by: Preparation, Detection, Containment, Eradication, Recovery, Lessons Learned', 'Mapped to MITRE ATT&CK Enterprise Matrix tactics'],
        resources: [
          { label: 'Splunk Free Training & Fundamentals', url: 'https://www.splunk.com/en_us/training/free-courses/splunk-fundamentals-1.html', type: 'Accredited' },
          { label: 'TryHackMe: SOC Level 1 Pathway', url: 'https://tryhackme.com/path/outline/soclevel1', type: 'Interactive' }
        ]
      },
      {
        id: 'm5',
        phaseName: 'Phase 5: Cloud Security',
        weeks: 'Weeks 13–14',
        intensiveWeeks: 'Week 7',
        title: 'Cloud Security, Zero Trust & CompTIA Prep',
        summary: 'Audit cloud infrastructure misconfigurations, enforce IAM least privilege, container security, and prepare for industry certifications.',
        targetGap: 'Cloud Security & Certifications',
        topics: [
          'Cloud Shared Responsibility Model (IaaS, PaaS, SaaS)',
          'AWS IAM Policies, Least Privilege & Security Groups',
          'Cloud Misconfiguration Auditing (S3 Leaks, Open Ports)',
          'Zero-Trust Architecture & Identity Governance',
          'CompTIA Security+ (SY0-701) Exam Core Objectives'
        ],
        projectTitle: 'Automated Cloud Security Posture Audit & Hardening',
        projectDesc: 'Audit a deliberately misconfigured cloud environment using automated security tooling (Prowler / ScoutSuite). Generate a compliance report and execute remediation terraform scripts.',
        projectRequirements: ['Executive risk matrix categorizing findings by CVSS severity', 'Automated remediation scripts closing critical cloud misconfigurations', 'Security+ domain study notes summarizing key cryptographic and identity standards'],
        fresherTip: 'Listing CompTIA Security+ on your resume gets you past initial HR filters for government and enterprise security roles. Couple it with your hands-on lab portfolio.',
        commonPitfall: 'Creating root AWS access keys instead of using IAM roles and temporary session tokens.',
        hiringChecklist: ['Clear CVSS severity ratings for all discovered vulnerabilities', 'Remediation script verified without breaking existing services', 'Understanding of public vs private cloud subnets and NAT gateways'],
        resources: [
          { label: 'IBM SkillsBuild: Cybersecurity Operations Track', url: 'https://skillsbuild.org', type: 'Accredited Track' },
          { label: 'AWS Cloud Security Learning Plan', url: 'https://explore.skillbuilder.aws/', type: 'Documentation' }
        ]
      }
    ]
  }
];

export default function CareerRoadmapTimeline({
  onBack,
  resumeStats = null,
  userName: initialUserName = '',
  showToast
}) {
  const effectiveUser = initialUserName || 'Alex Morgan';
  const [userName, setUserName] = useState(effectiveUser);

  const storageKey = useMemo(() => {
    const sanitized = (initialUserName || userName || 'alex_morgan')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '_');
    return `cc_roadmap_${sanitized}`;
  }, [initialUserName, userName]);

  // Load initial state helper from localStorage
  const loadStored = useCallback(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error('Error reading roadmap from localStorage:', e);
    }
    return null;
  }, [storageKey]);

  const initialStored = useMemo(() => {
    try {
      const sanitized = (initialUserName || 'alex_morgan')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '_');
      const raw = localStorage.getItem(`cc_roadmap_${sanitized}`);
      if (raw) return JSON.parse(raw);
    } catch {}
    return null;
  }, [initialUserName]);

  const [activeId, setActiveId] = useState(() => initialStored?.activeId || 'fullstack');
  const [studyPace, setStudyPace] = useState(() => initialStored?.studyPace || 'standard');
  const [fresherTier, setFresherTier] = useState(() => initialStored?.fresherTier || 'student');
  
  // Track completed topics per milestone: { [roleId]: { [milestoneId]: array of topic indices } }
  const [completedTopics, setCompletedTopics] = useState(() => initialStored?.completedTopics || {});
  
  // Track completed milestones: { [roleId]: Set of milestoneIds }
  const [completedMilestones, setCompletedMilestones] = useState(() => {
    if (initialStored?.completedMilestones) {
      const sets = {};
      Object.keys(initialStored.completedMilestones).forEach((role) => {
        sets[role] = new Set(initialStored.completedMilestones[role] || []);
      });
      return sets;
    }
    return {};
  });
  
  // Track project links: { [roleId]: { [milestoneId]: string } }
  const [projectLinks, setProjectLinks] = useState(() => initialStored?.projectLinks || {});
  
  // Active expanded accordion cards: { [milestoneId]: boolean }
  const [expandedCards, setExpandedCards] = useState({ m1: true });
  // Specific expanded tab within card: { [milestoneId]: 'topics' | 'project' | 'mentorship' | 'resources' }
  const [activeCardTabs, setActiveCardTabs] = useState({});

  // Certificate Modal State
  const [showCert, setShowCert] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);

  // Sync state if user changes
  useEffect(() => {
    if (initialUserName && initialUserName !== userName) {
      setUserName(initialUserName);
    }
  }, [initialUserName, userName]);

  // Reload state if storageKey changes (e.g. login/re-login)
  useEffect(() => {
    const data = loadStored();
    if (data) {
      if (data.activeId) setActiveId(data.activeId);
      if (data.studyPace) setStudyPace(data.studyPace);
      if (data.fresherTier) setFresherTier(data.fresherTier);
      if (data.completedTopics) setCompletedTopics(data.completedTopics);
      if (data.completedMilestones) {
        const sets = {};
        Object.keys(data.completedMilestones).forEach((role) => {
          sets[role] = new Set(data.completedMilestones[role] || []);
        });
        setCompletedMilestones(sets);
      }
      if (data.projectLinks) setProjectLinks(data.projectLinks);
    }
  }, [storageKey, loadStored]);

  // Persist roadmap progress to localStorage on any milestone/topic/project update
  useEffect(() => {
    try {
      const serializableMilestones = {};
      Object.keys(completedMilestones).forEach((role) => {
        const val = completedMilestones[role];
        serializableMilestones[role] = val instanceof Set ? Array.from(val) : (Array.isArray(val) ? val : []);
      });
      const dataToSave = {
        activeId,
        studyPace,
        fresherTier,
        completedTopics,
        completedMilestones: serializableMilestones,
        projectLinks,
      };
      localStorage.setItem(storageKey, JSON.stringify(dataToSave));
    } catch (e) {
      console.error('Failed to save roadmap progress to localStorage:', e);
    }
  }, [storageKey, activeId, studyPace, fresherTier, completedTopics, completedMilestones, projectLinks]);

  const roadmap = useMemo(() => {
    return ROADMAPS.find(r => r.id === activeId) || ROADMAPS[0];
  }, [activeId]);

  // Detected missing skills from resume
  const userMissingSkills = useMemo(() => {
    if (resumeStats?.missing && Array.isArray(resumeStats.missing) && resumeStats.missing.length > 0) {
      return resumeStats.missing.map(s => s.toLowerCase());
    }
    return ['docker', 'react', 'typescript', 'machine learning', 'sql', 'system design', 'networking'];
  }, [resumeStats]);

  // Check if a milestone closes user resume gap
  const isMilestoneGapMatch = useCallback((ms) => {
    const target = (ms.targetGap || '').toLowerCase();
    return userMissingSkills.some(gap => target.includes(gap) || gap.includes(target));
  }, [userMissingSkills]);

  // Current role's milestone completed Set
  const doneMilestonesSet = useMemo(() => {
    return completedMilestones[activeId] || new Set();
  }, [completedMilestones, activeId]);

  // Current role's topics map: milestoneId -> array of completed indices
  const currentRoleTopics = useMemo(() => {
    return completedTopics[activeId] || {};
  }, [completedTopics, activeId]);

  // Milestone completion percentage calculation
  const totalMilestones = roadmap.milestones.length;
  const doneMilestonesCount = doneMilestonesSet.size;
  const overallPct = Math.round((doneMilestonesCount / totalMilestones) * 100);

  // Toggle topic completion
  const toggleTopic = (milestoneId, topicIdx) => {
    setCompletedTopics(prev => {
      const roleTopics = prev[activeId] || {};
      const currentList = roleTopics[milestoneId] || [];
      const isDone = currentList.includes(topicIdx);
      const nextList = isDone
        ? currentList.filter(i => i !== topicIdx)
        : [...currentList, topicIdx];

      const nextRoleState = { ...roleTopics, [milestoneId]: nextList };

      // If all topics in this milestone are now done, prompt completion
      const milestone = roadmap.milestones.find(m => m.id === milestoneId);
      if (milestone && nextList.length === milestone.topics.length && !doneMilestonesSet.has(milestoneId)) {
        if (showToast) showToast(`All topics in ${milestone.phaseName} checked! Submit your project link to finish!`, 'success', '🎯');
      }

      return { ...prev, [activeId]: nextRoleState };
    });
  };

  // Toggle milestone completion
  const toggleMilestoneDone = (milestoneId) => {
    const currentSet = new Set(completedMilestones[activeId] || []);
    const isAlreadyDone = currentSet.has(milestoneId);

    if (!isAlreadyDone) {
      const link = (projectLinks[activeId] && projectLinks[activeId][milestoneId]) || '';
      if (!link.trim()) {
        if (showToast) showToast('Please enter your project repository URL to complete this milestone!', 'error', '⚠️');
        // Expand project tab
        setExpandedCards(prev => ({ ...prev, [milestoneId]: true }));
        setActiveCardTabs(prev => ({ ...prev, [milestoneId]: 'project' }));
        return;
      }
      currentSet.add(milestoneId);
      if (showToast) showToast(`Milestone completed! Great job on your project submission! 🚀`, 'success', '🏆');
    } else {
      currentSet.delete(milestoneId);
      if (showToast) showToast('Milestone status marked as in-progress.', 'info', '↺');
    }

    setCompletedMilestones(prev => ({ ...prev, [activeId]: currentSet }));

    // Check if 100% finished
    if (currentSet.size === totalMilestones && !isAlreadyDone) {
      if (showToast) showToast(`🎉 Congratulations! You completed the entire ${roadmap.label} roadmap!`, 'success', '🎓');
      setShowNamePrompt(true);
    }
  };

  // Set project repository link
  const handleProjectLinkChange = (milestoneId, val) => {
    setProjectLinks(prev => ({
      ...prev,
      [activeId]: { ...(prev[activeId] || {}), [milestoneId]: val }
    }));
  };

  // Toggle card accordion
  const toggleCard = (id) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Helper: Simulate fresher progress for immediate preview
  const simulateFresherProgress = () => {
    const m1Topics = [0, 1, 2, 3, 4];
    const m2Topics = [0, 1, 2, 3, 4];
    const m3Topics = [0, 1, 2];

    setCompletedTopics(prev => ({
      ...prev,
      [activeId]: { m1: m1Topics, m2: m2Topics, m3: m3Topics }
    }));

    setProjectLinks(prev => ({
      ...prev,
      [activeId]: {
        m1: 'https://github.com/alexmorgan-student/weather-currency-hub',
        m2: 'https://github.com/alexmorgan-student/agile-kanban-react'
      }
    }));

    const doneSet = new Set(['m1', 'm2']);
    setCompletedMilestones(prev => ({ ...prev, [activeId]: doneSet }));

    setExpandedCards({ m3: true });
    if (showToast) showToast('Loaded active fresher journey with simulated progress!', 'success', '⚡');
  };

  // Reset roadmap progress
  const resetProgress = () => {
    setCompletedMilestones(prev => ({ ...prev, [activeId]: new Set() }));
    setCompletedTopics(prev => ({ ...prev, [activeId]: {} }));
    setProjectLinks(prev => ({ ...prev, [activeId]: {} }));
    setExpandedCards({ m1: true });
    if (showToast) showToast('Roadmap progress reset to fresh state.', 'info', '↺');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-24">
      {/* ── TOP NAV BAR ── */}
      <div className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3.5 sticky top-0 z-40 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-all shadow-sm"
            >
              <span>← Dashboard</span>
            </button>
          )}
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-sm font-bold shadow-md shadow-blue-500/20">
              🧭
            </span>
            <span className="font-extrabold text-sm text-white hidden sm:inline">
              CareerCompass <span className="text-blue-400">Fresher Roadmap</span>
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={simulateFresherProgress}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-amber-300 hover:text-white transition-all flex items-center gap-1 shadow-sm"
            title="Simulate sample fresher progress"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Simulate Progress</span>
          </button>
          <button
            onClick={resetProgress}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-all"
            title="Reset progress"
          >
            ↺
          </button>
          {overallPct === 100 && (
            <button
              onClick={() => setShowCert(true)}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/30 flex items-center gap-1.5"
            >
              <Trophy className="w-3.5 h-3.5 text-yellow-300" />
              <span>Certificate</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* ══════════════════════════════════════════════════════════════════════
            HERO DIAGNOSTIC & FRESHER STUDY PACING BAR
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8">
          {/* Ambient decorative glow orbs */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 px-3.5 py-1 rounded-full text-xs font-bold text-blue-400 mb-2">
                <Compass className="w-3.5 h-3.5" />
                Fresher Job-Readiness Blueprint
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                Interactive Career Roadmap
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Step-by-step sequential engineering milestones designed specifically for freshers. Master fundamentals, avoid common junior traps, build verified portfolio projects, and bridge skill gaps.
              </p>
            </div>

            {/* Overall Progress Gauge */}
            <div className="flex items-center gap-4 bg-slate-950/60 border border-slate-800 p-4 rounded-2xl shrink-0">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-16 h-16 -rotate-90 transform" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={overallPct === 100 ? 'text-emerald-500' : 'text-blue-500'}
                    strokeDasharray={`${overallPct}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-black text-sm text-white">{overallPct}%</span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Roadmap Status</span>
                <span className="text-sm font-extrabold text-white">
                  {doneMilestonesCount} of {totalMilestones} Milestones Done
                </span>
                <span className="text-[11px] text-emerald-400 block font-medium mt-0.5">
                  {overallPct === 100 ? '🎉 Ready for Recruiter Screening!' : `${totalMilestones - doneMilestonesCount} phases to complete`}
                </span>
              </div>
            </div>
          </div>

          {/* Fresher Study Pacing & Experience Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {/* Pacing Toggle */}
            <div className="bg-slate-950/40 border border-slate-800/80 p-4 rounded-2xl flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  Fresher Study Pace:
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {studyPace === 'standard' ? 'Standard Pace (~12 hrs/week)' : 'Intensive Bootcamp (~25 hrs/week)'}
                </p>
              </div>
              <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setStudyPace('standard')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    studyPace === 'standard' ? 'bg-blue-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Standard ({roadmap.standardWeeks}w)
                </button>
                <button
                  onClick={() => setStudyPace('intensive')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    studyPace === 'intensive' ? 'bg-indigo-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Intensive ({roadmap.intensiveWeeks}w)
                </button>
              </div>
            </div>

            {/* Target Persona Guidance */}
            <div className="bg-slate-950/40 border border-slate-800/80 p-4 rounded-2xl flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  Your Background Persona:
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Tailors tips to your current learning background
                </p>
              </div>
              <select
                value={fresherTier}
                onChange={e => setFresherTier(e.target.value)}
                className="py-1.5 px-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="student">🎓 College Student</option>
                <option value="graduate">📜 Fresh Graduate</option>
                <option value="switcher">🔄 Career Switcher</option>
              </select>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            ROLE TRACK SWITCHER
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start sm:justify-center">
          {ROADMAPS.map(r => (
            <button
              key={r.id}
              onClick={() => setActiveId(r.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all duration-300 whitespace-nowrap ${
                activeId === r.id
                  ? `${r.accentColor} border-transparent text-white shadow-lg ${r.glowColor} scale-105`
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <span className="text-base">{r.icon}</span>
              <span>{r.label}</span>
            </button>
          ))}
        </div>

        {/* Role Brief Overview Strip */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <span className="font-extrabold text-white text-sm flex items-center gap-2">
              <span>{roadmap.icon}</span>
              <span>{roadmap.label}</span>
              <span className="text-[11px] font-medium text-slate-400">({roadmap.roleTag})</span>
            </span>
            <p className="text-slate-400 text-xs">{roadmap.description}</p>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {roadmap.stack.slice(0, 5).map(s => (
              <span key={s} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-semibold border border-slate-700">
                {s}
              </span>
            ))}
            {roadmap.stack.length > 5 && (
              <span className="text-[10px] text-slate-500">+{roadmap.stack.length - 5} more</span>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            INNOVATIVE ZIG-ZAG ROADMAP TIMELINE
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="relative pt-6 pb-12">
          {/* Central Neural Gradient Spine (Desktop lg+) */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-4 bottom-8 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-teal-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.3)] pointer-events-none" />

          {/* Mobile Single-Column Spine */}
          <div className="lg:hidden absolute left-5 top-4 bottom-8 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-teal-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.3)] pointer-events-none" />

          <div className="space-y-12">
            {roadmap.milestones.map((ms, idx) => {
              const isDone = doneMilestonesSet.has(ms.id);
              const isLeft = idx % 2 === 0; // Even -> Left side, Odd -> Right side (Zig-Zag)
              const isExpanded = !!expandedCards[ms.id];
              const isGapMatch = isMilestoneGapMatch(ms);
              const completedTopicsList = currentRoleTopics[ms.id] || [];
              const projectLink = (projectLinks[activeId] && projectLinks[activeId][ms.id]) || '';
              const topicsDoneCount = completedTopicsList.length;
              const totalTopicsCount = ms.topics.length;
              const isNextActive = !isDone && (idx === 0 || doneMilestonesSet.has(roadmap.milestones[idx - 1]?.id));

              // Active tab within milestone card: 'topics' | 'project' | 'mentorship' | 'resources'
              const currentTab = activeCardTabs[ms.id] || 'topics';

              return (
                <div
                  key={ms.id}
                  className={`relative flex flex-col lg:flex-row items-center ${
                    isLeft ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* ── CARD CONTAINER (Takes 1/2 of space on desktop) ── */}
                  <div className={`w-full lg:w-1/2 pl-12 lg:pl-0 ${isLeft ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div
                      className={`rounded-3xl border-2 transition-all duration-300 bg-slate-900/90 backdrop-blur-md shadow-xl overflow-hidden group ${
                        isDone
                          ? 'border-emerald-500/80 shadow-emerald-500/10'
                          : isNextActive
                          ? `${roadmap.borderColor} shadow-lg ${roadmap.glowColor} ring-1 ring-blue-500/30`
                          : 'border-slate-800 hover:border-slate-700'
                      } ${roadmap.hoverGlow}`}
                    >
                      {/* Top Accent Gradient Line */}
                      <div className={`h-1.5 w-full bg-gradient-to-r ${isDone ? 'from-emerald-500 to-teal-400' : roadmap.accentGradient}`} />

                      {/* Card Header */}
                      <div className="p-5 sm:p-6 space-y-3">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-black uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-lg border border-blue-500/20">
                              {ms.phaseName}
                            </span>
                            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-slate-500" />
                              {studyPace === 'standard' ? ms.weeks : ms.intensiveWeeks}
                            </span>
                          </div>

                          {/* Completion / Status Badge */}
                          {isDone ? (
                            <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-full flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              Phase Completed
                            </span>
                          ) : isNextActive ? (
                            <span className="text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
                              <Zap className="w-3.5 h-3.5 text-amber-400" />
                              Current Focus
                            </span>
                          ) : (
                            <span className="text-[11px] font-semibold text-slate-500 bg-slate-800/80 px-2.5 py-0.5 rounded-full">
                              Upcoming
                            </span>
                          )}
                        </div>

                        {/* Title & Summary */}
                        <div>
                          <h3
                            onClick={() => toggleCard(ms.id)}
                            className="text-lg font-black text-white hover:text-blue-400 transition-colors cursor-pointer flex items-center justify-between"
                          >
                            <span>{ms.title}</span>
                            <span className="text-slate-500 text-xs ml-2">
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </span>
                          </h3>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {ms.summary}
                          </p>
                        </div>

                        {/* Skill Gap Match Banner */}
                        {isGapMatch && (
                          <div className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/40 flex items-center justify-between text-xs">
                            <span className="font-bold text-teal-300 flex items-center gap-1.5">
                              <Target className="w-3.5 h-3.5 text-teal-400" />
                              Closes Resume Gap: {ms.targetGap}
                            </span>
                            <span className="text-[10px] font-black text-teal-200 bg-teal-500/20 px-2 py-0.5 rounded-full border border-teal-500/30">
                              +12% ATS Score
                            </span>
                          </div>
                        )}

                        {/* Topic Progress Bar */}
                        <div className="pt-2">
                          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-medium">
                            <span>Topics Mastery</span>
                            <span>{topicsDoneCount} / {totalTopicsCount} Completed</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full transition-all duration-500"
                              style={{ width: `${(topicsDoneCount / totalTopicsCount) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* ── EXPANDED TABS BODY ── */}
                      {isExpanded && (
                        <div className="border-t border-slate-800/80 p-5 sm:p-6 space-y-4 bg-slate-950/40 animate-fadeIn">
                          {/* Inner Tabs: Topics | Project | Mentorship | Resources */}
                          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold overflow-x-auto">
                            {[
                              { id: 'topics', label: '1. Topics & Checklist', count: `${topicsDoneCount}/${totalTopicsCount}` },
                              { id: 'project', label: '2. Portfolio Project', count: projectLink ? '✓' : 'Req' },
                              { id: 'mentorship', label: '3. Fresher Tips', icon: '💡' },
                              { id: 'resources', label: '4. Curated Links', count: ms.resources.length }
                            ].map(tab => (
                              <button
                                key={tab.id}
                                onClick={() => setActiveCardTabs(prev => ({ ...prev, [ms.id]: tab.id }))}
                                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
                                  currentTab === tab.id
                                    ? 'bg-blue-600 text-white font-bold shadow'
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                <span>{tab.label}</span>
                                {tab.count && (
                                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-mono">
                                    {tab.count}
                                  </span>
                                )}
                              </button>
                            ))}
                          </div>

                          {/* TAB 1: TOPIC CHECKLIST */}
                          {currentTab === 'topics' && (
                            <div className="space-y-2 pt-1 animate-fadeIn">
                              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                Check off topics as you study:
                              </p>
                              <div className="space-y-1.5">
                                {ms.topics.map((topic, tIdx) => {
                                  const done = completedTopicsList.includes(tIdx);
                                  return (
                                    <div
                                      key={tIdx}
                                      onClick={() => toggleTopic(ms.id, tIdx)}
                                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs ${
                                        done
                                          ? 'bg-blue-950/30 border-blue-500/40 text-blue-200'
                                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2.5">
                                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                                          done ? 'bg-blue-600 border-blue-500 text-white' : 'border-slate-600'
                                        }`}>
                                          {done && <Check className="w-3 h-3" />}
                                        </div>
                                        <span>{topic}</span>
                                      </div>
                                      <span className="text-[10px] font-mono text-slate-500">T{tIdx + 1}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* TAB 2: PORTFOLIO PROJECT */}
                          {currentTab === 'project' && (
                            <div className="space-y-3.5 pt-1 animate-fadeIn">
                              <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
                                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                                  <span>🔨</span> {ms.projectTitle}
                                </span>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                  {ms.projectDesc}
                                </p>
                              </div>

                              <div className="space-y-1">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                  Deliverable Requirements:
                                </span>
                                <ul className="space-y-1 text-xs text-slate-400">
                                  {ms.projectRequirements.map((req, rIdx) => (
                                    <li key={rIdx} className="flex items-start gap-2">
                                      <span className="text-blue-400 mt-0.5">•</span>
                                      <span>{req}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Submission input */}
                              <div className="pt-2 border-t border-slate-800 space-y-1.5">
                                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block">
                                  🔗 Your GitHub / Demo Link (Required to Complete)
                                </label>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="url"
                                    value={projectLink}
                                    onChange={e => handleProjectLinkChange(ms.id, e.target.value)}
                                    placeholder="https://github.com/your-username/project-repo"
                                    className="flex-1 py-2 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500"
                                  />
                                  {projectLink && (
                                    <a
                                      href={projectLink}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs text-blue-400 flex items-center gap-1"
                                      title="Test link"
                                    >
                                      <span>Test</span>
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* TAB 3: FRESHER MENTORSHIP & PITFALLS */}
                          {currentTab === 'mentorship' && (
                            <div className="space-y-3 pt-1 animate-fadeIn text-xs">
                              {/* Pro-Tip */}
                              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/30 space-y-1">
                                <span className="font-bold text-blue-300 flex items-center gap-1.5">
                                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                                  Fresher Pro-Tip
                                </span>
                                <p className="text-slate-300 leading-relaxed text-[11px]">
                                  {ms.fresherTip}
                                </p>
                              </div>

                              {/* Common Pitfall */}
                              <div className="p-3 rounded-xl bg-rose-950/25 border border-rose-500/30 space-y-1">
                                <span className="font-bold text-rose-300 flex items-center gap-1.5">
                                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                                  Common Pitfall to Avoid
                                </span>
                                <p className="text-slate-300 leading-relaxed text-[11px]">
                                  {ms.commonPitfall}
                                </p>
                              </div>

                              {/* Recruiter Hiring Checklist */}
                              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                                <span className="font-bold text-teal-300 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                                  🎯 Recruiter Review Checklist
                                </span>
                                <ul className="space-y-1 text-[11px] text-slate-400">
                                  {ms.hiringChecklist.map((item, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                      <Check className="w-3 h-3 text-teal-400 shrink-0" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}

                          {/* TAB 4: CURATED RESOURCES */}
                          {currentTab === 'resources' && (
                            <div className="space-y-2.5 pt-1 animate-fadeIn text-xs">
                              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                Curated Documentation &amp; Courses:
                              </p>
                              <div className="space-y-2">
                                {ms.resources.map((res, rIdx) => (
                                  <a
                                    key={rIdx}
                                    href={res.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/60 hover:bg-slate-850 flex items-center justify-between text-xs transition-all group"
                                  >
                                    <div className="flex items-center gap-2">
                                      <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                                      <span className="font-bold text-slate-200 group-hover:text-blue-300 transition-colors">
                                        {res.label}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                                        {res.type}
                                      </span>
                                      <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-blue-400" />
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Action Submit Button */}
                          <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3">
                            <span className="text-[11px] text-slate-500">
                              {isDone ? 'Milestone completed!' : 'Submit project link to mark finished.'}
                            </span>
                            <button
                              onClick={() => toggleMilestoneDone(ms.id)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 ${
                                isDone
                                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/25'
                              }`}
                            >
                              {isDone ? (
                                <>
                                  <span>✓ Completed (Undo)</span>
                                </>
                              ) : (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Mark Milestone Completed</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ── ZIG-ZAG CENTRAL SPINE NODE ── */}
                  <div
                    className={`absolute z-20 flex items-center justify-center transition-all duration-500 ${
                      /* Position on mobile: anchored left */
                      'left-1.5 lg:left-1/2 lg:-translate-x-1/2'
                    } top-6`}
                  >
                    {/* Pulsing ring beacon if active */}
                    {isNextActive && (
                      <span className="absolute w-12 h-12 rounded-full bg-blue-500/30 animate-ping pointer-events-none" />
                    )}

                    <div
                      onClick={() => toggleCard(ms.id)}
                      className={`w-10 h-10 rounded-full border-4 flex items-center justify-center text-xs font-black cursor-pointer shadow-xl transition-all duration-300 ${
                        isDone
                          ? 'bg-emerald-500 border-emerald-300 text-white shadow-emerald-500/40 scale-105'
                          : isNextActive
                          ? `${roadmap.accentColor} border-blue-300 text-white shadow-blue-500/50 scale-110`
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                      }`}
                      title={`Milestone ${idx + 1}: Click to expand`}
                    >
                      {isDone ? '✓' : idx + 1}
                    </div>
                  </div>

                  {/* Empty counterpart placeholder on the other side for Zig-Zag balance */}
                  <div className="hidden lg:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            ROADMAP COMPLETION CELEBRATION BOX
        ══════════════════════════════════════════════════════════════════════ */}
        {overallPct === 100 && (
          <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-teal-950/60 border-2 border-emerald-500/60 text-center space-y-4 shadow-2xl animate-fadeIn">
            <span className="text-5xl animate-bounce inline-block">🏆</span>
            <h2 className="text-2xl font-black text-white">
              Roadmap 100% Complete!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Outstanding commitment! You have finished all 5 comprehensive phases for the <strong className="text-emerald-400">{roadmap.label}</strong> trajectory, mastered the topics, and submitted working project links.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowCert(true)}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/30 flex items-center gap-2 shimmer-btn"
              >
                <Trophy className="w-4 h-4 text-yellow-300" />
                <span>View &amp; Print Verified Certificate</span>
              </button>
              {onBack && (
                <button
                  onClick={onBack}
                  className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-all border border-slate-700"
                >
                  Return to Dashboard
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          NAME PROMPT POPUP
      ══════════════════════════════════════════════════════════════════════ */}
      {showNamePrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-backdrop">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center space-y-4 animate-modal-pop">
            <span className="text-4xl">🎓</span>
            <h3 className="text-xl font-black text-white">Enter Your Name</h3>
            <p className="text-xs text-slate-400">
              Provide your official name to be inscribed on the verified completion credential.
            </p>
            <input
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              placeholder="Candidate Full Name"
              className="w-full py-3 px-4 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-center font-bold"
              onKeyDown={e => {
                if (e.key === 'Enter' && userName.trim()) {
                  setShowNamePrompt(false);
                  setShowCert(true);
                }
              }}
            />
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowNamePrompt(false)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                disabled={!userName.trim()}
                onClick={() => {
                  setShowNamePrompt(false);
                  setShowCert(true);
                }}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/25"
              >
                Generate Credential 🏆
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          OFFICIAL VERIFIED CERTIFICATE MODAL
      ══════════════════════════════════════════════════════════════════════ */}
      {showCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-backdrop overflow-y-auto">
          <div className="bg-slate-900 border-2 border-amber-400/80 rounded-3xl p-6 sm:p-10 max-w-2xl w-full shadow-2xl relative animate-modal-pop space-y-6 my-8">
            <button
              onClick={() => setShowCert(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors text-sm font-bold"
            >
              ✕
            </button>

            {/* Certificate Canvas */}
            <div className="border-4 border-double border-amber-500/40 rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-slate-850 via-slate-900 to-slate-850 text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center text-3xl shadow-xl shadow-amber-400/30">
                🏆
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                  CareerCompass AI · Verified Engineering Accreditation
                </p>
                <h2 className="text-2xl font-black text-white mt-1">
                  Certificate of Roadmap Completion
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  This official document certifies that
                </p>
              </div>

              <div className="py-2 border-b-2 border-slate-700 max-w-sm mx-auto">
                <h3 className="text-2xl font-bold text-teal-400 font-serif">
                  {userName || 'Alex Morgan'}
                </h3>
              </div>

              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                has successfully fulfilled all curriculum objectives, completed topic checklists, and submitted working project implementations for the:
              </p>

              <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl max-w-md mx-auto">
                <h4 className="font-black text-base text-white">
                  {roadmap.label} Trajectory
                </h4>
                <p className="text-[11px] text-teal-400 font-semibold mt-0.5">
                  5 of 5 Core Engineering Phases Completed &amp; Verified
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 max-w-md mx-auto pt-3">
                <span>Verification ID: CC-ROADMAP-{roadmap.id.toUpperCase()}-2026</span>
                <span>Issued: September 2026</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={() => {
                  if (showToast) showToast('Verification link copied to clipboard!', 'success', '📋');
                  setShowCert(false);
                }}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Credential</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
