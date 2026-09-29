import React, { useState, useMemo, useEffect } from 'react';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Clock,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  SlidersHorizontal,
  Search,
  Building2,
  IndianRupee,
  TrendingUp,
  Layers,
  BarChart3,
  Calendar,
  Briefcase,
  ChevronRight,
  Target,
  RefreshCw,
  Zap,
} from 'lucide-react';

/* ──────────────────────────────────────────────────────────
   ENRICHED CAREER TRACKS DATA
   ────────────────────────────────────────────────────────── */
export const ENRICHED_CAREER_PATHS = [
  {
    id: 'fullstack',
    icon: '🖥️',
    title: 'Full Stack Developer',
    category: 'web',
    tagline: 'End-to-End Web Apps & Cloud Services',
    desc: 'Build scalable modern client SPAs, high-throughput backend APIs, microservices, and automated cloud deployments.',
    match: 92,
    matchColor: 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
    border: 'border-blue-400',
    glow: 'card-glow-blue',
    accentGradient: 'from-blue-600 to-indigo-600',
    salary: '₹14 – 32 LPA',
    duration: '18–22 weeks',
    capstone: 'MERN & Next.js Microservices SaaS with Stripe, Redis, Docker & CI/CD',
    skills: ['React', 'Node.js', 'MongoDB', 'PostgreSQL', 'Docker', 'REST APIs', 'TypeScript'],
    skillColor: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
    demand: '96% (Surging)',
    growth: '+38% YoY',
    hiringFirms: ['Stripe', 'Meta', 'Amazon', 'Vercel', 'Uber'],
    metrics: { mathDepth: 'Low-Medium', remoteAvailability: '95%', difficulty: 'Moderate', rampUpWeeks: 20 },
    seniorityLadder: {
      junior: { title: 'Junior Full Stack Engineer', exp: '0–1 Years', salary: '₹7 – 12 LPA', focus: 'Component implementation, unit tests, bug fixes, REST endpoints, Git branching.' },
      mid:    { title: 'Mid-Level Full Stack Engineer', exp: '2–4 Years', salary: '₹15 – 26 LPA', focus: 'Full feature ownership, SQL migrations, caching layers, auth lifecycles, PR reviews.' },
      senior: { title: 'Senior Software Engineer', exp: '5–7 Years', salary: '₹30 – 48 LPA', focus: 'Distributed microservices, database sharding, observability, architecture RFCs.' },
      staff:  { title: 'Staff / Principal Engineer', exp: '8+ Years', salary: '₹55 – 80+ LPA', focus: 'Cross-organization tech vision, high-scale reliability, team mentorship, strategic tech debt.' },
    },
    dayInTheLife: [
      { time: '09:30 AM', task: 'Daily standup & PR code reviews across frontend and API repositories.' },
      { time: '11:00 AM', task: 'Deep coding: resilient Express middleware & optimistic UI mutation state.' },
      { time: '02:30 PM', task: 'System design session on PostgreSQL query indexing and Redis cache invalidation.' },
      { time: '04:30 PM', task: 'Cypress E2E test suite validation & multi-container Docker compose verification.' },
    ],
    capstoneSpecs: {
      title: 'CloudScale: Enterprise Multi-Tenant SaaS with Stripe Billing',
      tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'GitHub Actions'],
      deliverables: ['Multi-tenant RBAC auth with JWT & OAuth2', 'Stripe webhooks for subscription lifecycles', 'Asynchronous job queue with BullMQ', '85%+ code coverage with Jest & Cypress'],
    },
    phases: [
      { phase: 1, title: 'Frontend Core (React & Modern State)', weeks: '4–5', priority: 'high', skills: ['React', 'React Router', 'Hooks', 'Axios', 'Tailwind CSS'], projects: ['Interactive Dashboard UI', 'Auth & Profile Portal'], resources: [{ title: 'React Official Docs', url: 'https://react.dev/', free: true }, { title: 'IBM Web Development Track', url: 'https://skillsbuild.org', free: true }] },
      { phase: 2, title: 'Node.js & Express Backend Architecture', weeks: '4–6', priority: 'high', skills: ['Node.js', 'Express.js', 'REST API', 'Middleware', 'JWT Auth'], projects: ['RESTful Content Engine', 'Stateless Auth Service'], resources: [{ title: 'Express.js Guide', url: 'https://expressjs.com/', free: true }, { title: 'Node.js Docs', url: 'https://nodejs.org/en/docs', free: true }] },
      { phase: 3, title: 'Databases & Data Modeling (SQL & NoSQL)', weeks: '3–4', priority: 'high', skills: ['MongoDB/Mongoose', 'PostgreSQL/Prisma', 'Indexing', 'Schema Design'], projects: ['CRUD E-Commerce Store', 'Relational Order Analytics DB'], resources: [{ title: 'MongoDB University', url: 'https://learn.mongodb.com/', free: true }, { title: 'Prisma Getting Started', url: 'https://www.prisma.io/docs', free: true }] },
      { phase: 4, title: 'Full Stack Integration & WebSockets', weeks: '4–5', priority: 'high', skills: ['CORS', 'File Uploads', 'Socket.io', 'Email Automation', 'Error Handlers'], projects: ['Real-Time Collaboration App', 'Multi-Vendor Marketplace'], resources: [{ title: 'Socket.io Documentation', url: 'https://socket.io/docs/v4/', free: true }] },
      { phase: 5, title: 'DevOps, Docker & Cloud Deployment', weeks: '2–3', priority: 'medium', skills: ['Docker', 'CI/CD Pipelines', 'AWS/Render', 'Environment Config'], projects: ['Containerize MERN Stack', 'Automated GitHub Actions CI/CD'], resources: [{ title: 'Docker Official Getting Started', url: 'https://docs.docker.com/get-started/', free: true }] },
    ],
  },
  {
    id: 'aiml',
    icon: '🤖',
    title: 'AI / Machine Learning Engineer',
    category: 'ai',
    tagline: 'Deep Learning, LLMs & Autonomous Agents',
    desc: 'Train transformer models, engineer production RAG vector pipelines, and deploy autonomous LLM agents with high-performance APIs.',
    match: 78,
    matchColor: 'text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
    border: 'border-purple-400',
    glow: 'card-glow-purple',
    accentGradient: 'from-purple-600 to-indigo-600',
    salary: '₹18 – 42 LPA',
    duration: '20–25 weeks',
    capstone: 'Enterprise RAG Agent with LangChain, PyTorch, pgvector & FastAPI',
    skills: ['Python', 'PyTorch', 'LangChain', 'FastAPI', 'Pandas', 'Vector DBs', 'Transformers'],
    skillColor: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
    demand: '98% (Critical Shortage)',
    growth: '+74% YoY',
    hiringFirms: ['OpenAI', 'Anthropic', 'Google DeepMind', 'NVIDIA', 'Microsoft'],
    metrics: { mathDepth: 'High', remoteAvailability: '90%', difficulty: 'Challenging', rampUpWeeks: 24 },
    seniorityLadder: {
      junior: { title: 'Associate AI Engineer', exp: '0–1 Years', salary: '₹10 – 18 LPA', focus: 'Data cleaning, feature extraction, evaluation harnesses, fine-tuning scripts, basic PyTorch loops.' },
      mid:    { title: 'AI / ML Systems Engineer', exp: '2–4 Years', salary: '₹20 – 35 LPA', focus: 'RAG pipeline design, quantization (LoRA/QLoRA), model benchmarks (ROUGE/BLEU), FastAPI serving.' },
      senior: { title: 'Senior Machine Learning Scientist', exp: '5–7 Years', salary: '₹40 – 65 LPA', focus: 'Distributed GPU training (DeepSpeed/vLLM), custom loss functions, latency optimization, vector indexes.' },
      staff:  { title: 'Principal AI Architect', exp: '8+ Years', salary: '₹75 – 1.2 Cr+', focus: 'Foundational model research, proprietary LLM architecture breakthroughs, multi-modal foundation systems.' },
    },
    dayInTheLife: [
      { time: '09:30 AM', task: 'Reviewing overnight model benchmark runs and loss curves on Weights & Biases.' },
      { time: '11:00 AM', task: 'Fine-tuning Llama-3 with FlashAttention on domain-specific enterprise telemetry.' },
      { time: '02:00 PM', task: 'Optimizing vector search recall with hybrid dense/sparse retrieval in Milvus/Qdrant.' },
      { time: '04:30 PM', task: 'Deploying quantized model endpoints using FastAPI and Triton inference server.' },
    ],
    capstoneSpecs: {
      title: 'CognitiveDoc: Production Multi-Modal RAG with Vector Search & LangGraph',
      tech: ['PyTorch', 'Hugging Face', 'LangChain', 'FastAPI', 'Qdrant', 'Docker'],
      deliverables: ['Custom chunking strategy benchmark', 'Semantic reranking with Cohere models', 'Hallucinatory guardrails using LangGraph', 'Sub-200ms latency inference endpoint'],
    },
    phases: [
      { phase: 1, title: 'Python for Data Science & Numerical Computing', weeks: '3–4', priority: 'high', skills: ['Python 3', 'NumPy', 'Pandas', 'Matplotlib', 'Jupyter'], projects: ['EDA on Kaggle Dataset', 'Interactive Data Viz Dashboard'], resources: [{ title: 'Kaggle Python Track', url: 'https://www.kaggle.com/learn/python', free: true }, { title: 'IBM AI Foundations', url: 'https://skillsbuild.org', free: true }] },
      { phase: 2, title: 'Machine Learning Foundations & Scikit-learn', weeks: '5–6', priority: 'high', skills: ['Scikit-learn', 'Supervised Learning', 'Model Evaluation', 'Feature Engineering'], projects: ['Predictive Pricing Model', 'User Churn Classifier'], resources: [{ title: 'fast.ai Practical ML', url: 'https://course.fast.ai/', free: true }] },
      { phase: 3, title: 'Deep Learning with PyTorch & Neural Nets', weeks: '5–7', priority: 'high', skills: ['PyTorch Tensors', 'Neural Networks', 'CNNs', 'Transfer Learning'], projects: ['Vision Classifier (ResNet)', 'Sequence Sentiment Model'], resources: [{ title: 'PyTorch Official Tutorials', url: 'https://pytorch.org/tutorials/', free: true }] },
      { phase: 4, title: 'LLMs, Transformers & Generative AI Pipelines', weeks: '4–5', priority: 'high', skills: ['Transformers', 'Hugging Face', 'Prompt Engineering', 'LangChain', 'RAG'], projects: ['Enterprise Knowledge Chatbot', 'Automated Code Summarizer'], resources: [{ title: 'Hugging Face NLP Course', url: 'https://huggingface.co/learn/nlp-course', free: true }] },
      { phase: 5, title: 'MLOps, Model Serving & Production AI', weeks: '3–4', priority: 'medium', skills: ['FastAPI for ML', 'Docker for ML', 'MLflow', 'Vector DBs', 'Monitoring'], projects: ['Deploy ML API with Swagger Docs', 'Deploy Autonomous Research Agent'], resources: [{ title: 'MLflow Documentation', url: 'https://mlflow.org/docs/latest/index.html', free: true }] },
    ],
  },
  {
    id: 'frontend',
    icon: '🎨',
    title: 'Frontend & UI Systems Engineer',
    category: 'web',
    tagline: 'Modern Frameworks, Performance & UX Architecture',
    desc: 'Craft hyper-responsive, accessible user interfaces with Next.js 15, React 19 compiler, and enterprise design systems.',
    match: 88,
    matchColor: 'text-cyan-600 bg-cyan-50 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800',
    border: 'border-cyan-400',
    glow: 'card-glow-cyan',
    accentGradient: 'from-cyan-600 to-blue-600',
    salary: '₹12 – 28 LPA',
    duration: '16–20 weeks',
    capstone: 'Interactive SaaS Analytics Dashboard in Next.js with Real-Time WebSockets',
    skills: ['React 19', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Figma', 'Jest/RTL'],
    skillColor: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800',
    demand: '92% (High Demand)',
    growth: '+32% YoY',
    hiringFirms: ['Airbnb', 'Spotify', 'Shopify', 'Linear', 'GitHub'],
    metrics: { mathDepth: 'Low', remoteAvailability: '96%', difficulty: 'Moderate', rampUpWeeks: 18 },
    seniorityLadder: {
      junior: { title: 'Junior Frontend Developer', exp: '0–1 Years', salary: '₹6 – 11 LPA', focus: 'Pixel-perfect Figma conversion, responsive layout design, React hooks state, accessibility fundamentals.' },
      mid:    { title: 'Frontend Engineer', exp: '2–4 Years', salary: '₹13 – 22 LPA', focus: 'Design token architecture, component libraries, Core Web Vitals optimization, client-side caching.' },
      senior: { title: 'Senior Frontend Architect', exp: '5–7 Years', salary: '₹28 – 45 LPA', focus: 'Micro-frontend architecture, streaming SSR, performance budgets, design system governance.' },
      staff:  { title: 'Principal UI Platform Engineer', exp: '8+ Years', salary: '₹50 – 75+ LPA', focus: 'Company-wide frontend standards, browser rendering optimizations, design ops workflow.' },
    },
    dayInTheLife: [
      { time: '09:30 AM', task: 'Design sync with Product Designers on Figma interactive tokens and motion states.' },
      { time: '11:00 AM', task: 'Building accessible compound UI components using Radix UI primitives and Tailwind.' },
      { time: '02:00 PM', task: 'Optimizing Next.js 15 Server Actions and streaming React 19 Suspense boundaries.' },
      { time: '04:30 PM', task: 'Lighthouse audit optimization: achieving 99+ Performance and 100 Accessibility.' },
    ],
    capstoneSpecs: {
      title: 'MetricsFlow: High-Speed Analytics Dashboard with WebGL & WebSockets',
      tech: ['Next.js 15', 'TypeScript', 'Tailwind', 'Recharts', 'Framer Motion', 'Zustand'],
      deliverables: ['Real-time streaming telemetry charts', 'Custom accessible component design system', 'Zero-layout-shift responsive breakpoints', '98+ Google Lighthouse Performance Score'],
    },
    phases: [
      { phase: 1, title: 'Web Foundations & Modern CSS Mastery', weeks: '4–6', priority: 'high', skills: ['HTML5', 'CSS3', 'Flexbox', 'CSS Grid', 'Responsive Design'], projects: ['Personal Portfolio Site', 'Pixel-Perfect SaaS Landing Page'], resources: [{ title: 'freeCodeCamp Responsive Web', url: 'https://www.freecodecamp.org/', free: true }, { title: 'The Odin Project Foundations', url: 'https://www.theodinproject.com/', free: true }] },
      { phase: 2, title: 'JavaScript ES6+ & Asynchronous Flow', weeks: '4–5', priority: 'high', skills: ['Arrow Functions', 'Promises/Async-Await', 'DOM API', 'Fetch/Axios'], projects: ['Vanilla JS Task Manager', 'Weather Radar App with OpenWeather API'], resources: [{ title: 'javascript.info Core', url: 'https://javascript.info/', free: true }] },
      { phase: 3, title: 'React 19 & Component Architecture', weeks: '5–7', priority: 'high', skills: ['JSX', 'Custom Hooks', 'Context API', 'React Router', 'State Reducers'], projects: ['Movie Discovery App', 'E-Commerce Product Explorer'], resources: [{ title: 'React Official Documentation', url: 'https://react.dev/', free: true }] },
      { phase: 4, title: 'Styling, Design Systems & Tooling', weeks: '2–3', priority: 'medium', skills: ['Tailwind CSS', 'Figma Tokens', 'Vite', 'ESLint & Prettier'], projects: ['Tailwind Redesign Project', 'Reusable UI Component Kit'], resources: [{ title: 'Tailwind CSS Docs', url: 'https://tailwindcss.com/docs', free: true }] },
      { phase: 5, title: 'Next.js 15, SSR & Production Deployment', weeks: '4–5', priority: 'medium', skills: ['App Router', 'Server Actions', 'API Routes', 'TypeScript', 'Vercel'], projects: ['Full Next.js Blog with MDX', 'Full SaaS Portal with SEO'], resources: [{ title: 'Next.js Learn Course', url: 'https://nextjs.org/learn', free: true }] },
    ],
  },
  {
    id: 'cybersec',
    icon: '🔒',
    title: 'Cybersecurity & Threat Analyst',
    category: 'security',
    tagline: 'Ethical Hacking, Threat Hunting & SIEM Telemetry',
    desc: 'Fortify digital perimeters with offensive pen-testing, SIEM threat telemetry, vulnerability assessments, and zero-trust policies.',
    match: 65,
    matchColor: 'text-red-600 bg-red-50 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800',
    border: 'border-red-400',
    glow: 'card-glow-rose',
    accentGradient: 'from-rose-600 to-red-600',
    salary: '₹12 – 26 LPA',
    duration: '18–24 weeks',
    capstone: 'Zero-Trust Enterprise Pen-Testing, Threat Hunting & Splunk SIEM Lab',
    skills: ['Linux', 'Networking', 'Kali Linux', 'Splunk', 'OWASP Top 10', 'Wireshark', 'Python'],
    skillColor: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800',
    demand: '95% (High Shortage)',
    growth: '+46% YoY',
    hiringFirms: ['CrowdStrike', 'IBM Security', 'Palo Alto Networks', 'Cisco', 'Cloudflare'],
    metrics: { mathDepth: 'Medium', remoteAvailability: '85%', difficulty: 'Challenging', rampUpWeeks: 22 },
    seniorityLadder: {
      junior: { title: 'Associate Security Analyst (SOC Tier 1)', exp: '0–1 Years', salary: '₹7 – 13 LPA', focus: 'Alert triage, firewall rules, Wireshark packet analysis, basic log analysis, patch verification.' },
      mid:    { title: 'Security Engineer / Threat Hunter', exp: '2–4 Years', salary: '₹16 – 28 LPA', focus: 'SIEM detection engineering, penetration testing, incident triage, OWASP vulnerability assessments.' },
      senior: { title: 'Senior Security Architect', exp: '5–7 Years', salary: '₹32 – 50 LPA', focus: 'Zero Trust architecture, automated DevSecOps pipelines, red-team exercise leadership.' },
      staff:  { title: 'Principal Security Officer', exp: '8+ Years', salary: '₹55 – 85+ LPA', focus: 'Enterprise compliance governance (SOC2, ISO27001), cryptographic architecture, threat intelligence.' },
    },
    dayInTheLife: [
      { time: '09:30 AM', task: 'Reviewing overnight SOC incident tickets and anomaly alerts in Splunk.' },
      { time: '11:00 AM', task: 'Penetration test on staging auth microservice targeting JWT vulnerabilities and IDOR.' },
      { time: '02:00 PM', task: 'Crafting custom Sigma detection rules for potential lateral movement attempts.' },
      { time: '04:30 PM', task: 'Incident simulation drill & writing automated Python scripts for IP reputation lookups.' },
    ],
    capstoneSpecs: {
      title: 'AegisShield: Multi-Vulnerability Web App Penetration Lab & SIEM Pipeline',
      tech: ['Kali Linux', 'Burp Suite', 'Splunk Enterprise', 'Python', 'Wireshark', 'Docker'],
      deliverables: ['OWASP Top 10 remediation audit report', 'Custom Splunk dashboard for brute-force detections', 'Automated port scanner script in Python', 'Zero-Trust network segmentation blueprint'],
    },
    phases: [
      { phase: 1, title: 'Networking Fundamentals & Traffic Analysis', weeks: '4–5', priority: 'high', skills: ['TCP/IP', 'DNS/DHCP', 'OSI Model', 'Firewalls', 'VPN'], projects: ['Home Lab Network Setup', 'Packet Capture with Wireshark'], resources: [{ title: 'CompTIA Network+ Guide', url: 'https://www.comptia.org/certifications/network', free: false }, { title: 'IBM Cybersecurity Foundations', url: 'https://skillsbuild.org', free: true }] },
      { phase: 2, title: 'Linux Administration & Command-Line Scripting', weeks: '3–4', priority: 'high', skills: ['Bash Scripting', 'File Permissions', 'SSH', 'Cron Jobs', 'Log Analysis'], projects: ['Automated Audit Shell Script', 'Hardened Secure SSH Server'], resources: [{ title: 'OverTheWire Bandit', url: 'https://overthewire.org/wargames/bandit/', free: true }] },
      { phase: 3, title: 'Ethical Hacking & Web App Pen-Testing', weeks: '5–6', priority: 'high', skills: ['Kali Linux', 'Nmap', 'Metasploit', 'SQLi/XSS', 'OWASP Top 10'], projects: ['HackTheBox Lab Walkthroughs', 'Pen-Test Audit on DVWA Lab'], resources: [{ title: 'TryHackMe Cyber Defense', url: 'https://tryhackme.com/', free: true }] },
      { phase: 4, title: 'SIEM, SOC Telemetry & Incident Response', weeks: '3–4', priority: 'medium', skills: ['Splunk', 'ELK Stack', 'SOC Workflows', 'Threat Intelligence'], projects: ['Splunk SIEM Dashboard Lab', 'Phishing Incident Response Simulation'], resources: [{ title: 'Splunk Free Training', url: 'https://www.splunk.com/en_us/training.html', free: true }] },
      { phase: 5, title: 'Security+ Exam Prep, Zero Trust & Cloud Sec', weeks: '4–6', priority: 'medium', skills: ['CompTIA Security+', 'Zero Trust', 'Cloud Security (AWS IAM)', 'Auditing'], projects: ['Security+ Practice Lab Test', 'Comprehensive Security Portfolio'], resources: [{ title: 'CompTIA Security+ Blueprint', url: 'https://www.comptia.org/certifications/security', free: false }] },
    ],
  },
  {
    id: 'clouddevops',
    icon: '☁️',
    title: 'Cloud & DevOps Architect',
    category: 'security',
    tagline: 'Kubernetes, Terraform IaC & GitOps Pipelines',
    desc: 'Automate zero-downtime infrastructure with Kubernetes, Terraform IaC, Docker, Helm, and resilient AWS/GCP CI/CD delivery pipelines.',
    match: 75,
    matchColor: 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    border: 'border-amber-400',
    glow: 'card-glow-amber',
    accentGradient: 'from-amber-600 to-orange-600',
    salary: '₹16 – 35 LPA',
    duration: '18–22 weeks',
    capstone: 'Multi-Region Kubernetes Cluster with Terraform, ArgoCD GitOps & Prometheus',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Prometheus', 'Linux', 'Helm'],
    skillColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    demand: '97% (Extreme Demand)',
    growth: '+52% YoY',
    hiringFirms: ['AWS', 'Google Cloud', 'Netflix', 'Datadog', 'HashiCorp'],
    metrics: { mathDepth: 'Low', remoteAvailability: '94%', difficulty: 'Moderate-High', rampUpWeeks: 20 },
    seniorityLadder: {
      junior: { title: 'Junior Cloud/DevOps Engineer', exp: '0–1 Years', salary: '₹8 – 14 LPA', focus: 'Writing Dockerfiles, GitHub Actions workflows, setting up basic AWS EC2/S3 resources, Linux administration.' },
      mid:    { title: 'DevOps / SRE Engineer', exp: '2–4 Years', salary: '₹17 – 30 LPA', focus: 'Kubernetes manifest administration, Terraform state modules, Prometheus/Grafana alerting, canary rollouts.' },
      senior: { title: 'Senior Cloud Platform Architect', exp: '5–7 Years', salary: '₹34 – 55 LPA', focus: 'Multi-cluster service meshes (Istio), GitOps delivery, FinOps cost optimization, 99.99% SLO enforcement.' },
      staff:  { title: 'Principal Infrastructure Engineer', exp: '8+ Years', salary: '₹60 – 90+ LPA', focus: 'Global cloud infrastructure strategy, multi-cloud DR plans, enterprise disaster recovery, chaos engineering.' },
    },
    dayInTheLife: [
      { time: '09:30 AM', task: 'Cloud infrastructure cost check and review of automated Terraform plan outputs.' },
      { time: '11:00 AM', task: 'Tuning Kubernetes horizontal pod autoscaling (HPA) policies for traffic surges.' },
      { time: '02:00 PM', task: 'Implementing ArgoCD GitOps deployment pipeline with automated canary rollbacks.' },
      { time: '04:30 PM', task: 'Grafana dashboard refinement: tracing distributed service latency across Envoy proxies.' },
    ],
    capstoneSpecs: {
      title: 'KubeMesh: GitOps Cloud Infrastructure with Automated Canary Rollouts',
      tech: ['Terraform', 'Kubernetes', 'AWS EKS', 'ArgoCD', 'Prometheus', 'Grafana'],
      deliverables: ['Modular Terraform blueprint for multi-AZ VPC', 'ArgoCD GitOps pipeline with Slack alerts', 'Prometheus & Grafana monitoring dashboards', 'Automated zero-downtime rollback on error threshold'],
    },
    phases: [
      { phase: 1, title: 'Linux Deep-Dive & Containerization with Docker', weeks: '3–4', priority: 'high', skills: ['Linux Kernel', 'Docker', 'Multi-stage Builds', 'Docker Compose'], projects: ['Multi-Service App Containerization', 'Automated Health-Checked Containers'], resources: [{ title: 'Docker Official Docs', url: 'https://docs.docker.com/', free: true }, { title: 'IBM Cloud Foundations', url: 'https://skillsbuild.org', free: true }] },
      { phase: 2, title: 'CI/CD Automation with GitHub Actions', weeks: '3–4', priority: 'high', skills: ['GitHub Actions', 'YAML Pipelines', 'Automated Tests', 'Artifact Publishing'], projects: ['End-to-End Automated CI/CD Pipeline', 'Automated Semantic Versioning Workflow'], resources: [{ title: 'GitHub Actions Docs', url: 'https://docs.github.com/actions', free: true }] },
      { phase: 3, title: 'Infrastructure as Code (IaC) with Terraform', weeks: '4–5', priority: 'high', skills: ['Terraform', 'HCL', 'AWS Cloud (VPC, EC2, S3)', 'State Management'], projects: ['Automated AWS Cloud VPC Deployment', 'Terraform Reusable Modules Kit'], resources: [{ title: 'HashiCorp Terraform Tutorials', url: 'https://learn.hashicorp.com/terraform', free: true }] },
      { phase: 4, title: 'Kubernetes Orchestration & Helm Packaging', weeks: '5–6', priority: 'high', skills: ['Kubernetes', 'Pods/Deployments', 'Services & Ingress', 'Helm Charts', 'ConfigMaps'], projects: ['Deploy Clustered Microservice on Minikube', 'Custom Helm Chart for SaaS App'], resources: [{ title: 'Kubernetes Official Tutorials', url: 'https://kubernetes.io/docs/tutorials/', free: true }] },
      { phase: 5, title: 'Observability & GitOps Delivery (Prometheus/ArgoCD)', weeks: '3–4', priority: 'medium', skills: ['Prometheus', 'Grafana', 'ArgoCD', 'Alertmanager', 'SLOs/SLAs'], projects: ['Full Observability Stack with Alerts', 'Production GitOps Continuous Delivery'], resources: [{ title: 'Prometheus Getting Started', url: 'https://prometheus.io/docs/introduction/overview/', free: true }] },
    ],
  },
  {
    id: 'dataeng',
    icon: '📊',
    title: 'Data Engineer & Analytics Architect',
    category: 'ai',
    tagline: 'Lakehouses, Spark Pipelines & Real-Time Streaming',
    desc: 'Build big data streaming pipelines with Apache Spark, Kafka, Snowflake, Airflow orchestrations, and dbt data modeling.',
    match: 72,
    matchColor: 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    border: 'border-emerald-400',
    glow: 'card-glow-emerald',
    accentGradient: 'from-emerald-600 to-teal-600',
    salary: '₹14 – 30 LPA',
    duration: '18–24 weeks',
    capstone: 'Real-Time Streaming Lakehouse with Apache Kafka, Spark, dbt & Snowflake',
    skills: ['Python', 'SQL', 'Apache Spark', 'Kafka', 'Snowflake', 'dbt', 'Airflow'],
    skillColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    demand: '94% (High Demand)',
    growth: '+44% YoY',
    hiringFirms: ['Snowflake', 'Databricks', 'Netflix', 'Palantir', 'Capital One'],
    metrics: { mathDepth: 'Medium', remoteAvailability: '92%', difficulty: 'Moderate-High', rampUpWeeks: 21 },
    seniorityLadder: {
      junior: { title: 'Associate Data Engineer', exp: '0–1 Years', salary: '₹7 – 13 LPA', focus: 'Complex SQL queries, Airflow DAG maintenance, basic ETL transformations with Pandas, data validation.' },
      mid:    { title: 'Data Engineer', exp: '2–4 Years', salary: '₹16 – 28 LPA', focus: 'Distributed Spark cluster jobs, dbt dimensional data modeling, data quality test suites, warehouse indexing.' },
      senior: { title: 'Senior Data Platform Engineer', exp: '5–7 Years', salary: '₹32 – 52 LPA', focus: 'Lakehouse architecture (Delta Lake / Iceberg), real-time streaming topologies, schema evolution.' },
      staff:  { title: 'Principal Data Architect', exp: '8+ Years', salary: '₹58 – 88+ LPA', focus: 'Enterprise data mesh architecture, data governance frameworks, petabyte-scale throughput design.' },
    },
    dayInTheLife: [
      { time: '09:30 AM', task: 'Reviewing Airflow overnight DAG execution logs and SLA latency alerts.' },
      { time: '11:00 AM', task: 'Building an Apache Spark streaming pipeline consuming event telemetry from Kafka.' },
      { time: '02:00 PM', task: 'Writing dbt transformation models to materialize clean dimensional analytics marts.' },
      { time: '04:30 PM', task: 'Data quality validation and automated anomaly checks with Great Expectations.' },
    ],
    capstoneSpecs: {
      title: 'DataStream: Real-Time Clickstream Ingestion Lakehouse',
      tech: ['Python', 'Apache Kafka', 'Apache Spark', 'Snowflake', 'dbt', 'Airflow'],
      deliverables: ['Kafka event producer simulating 10k events/sec', 'Spark Structured Streaming real-time deduplication', 'dbt star-schema dimensional modeling', 'Automated Airflow DAG pipeline with Slack alerts'],
    },
    phases: [
      { phase: 1, title: 'Advanced SQL, Python & Data Modeling', weeks: '4–5', priority: 'high', skills: ['Window Functions', 'CTEs', 'Python', 'Relational Schema', 'Indexing'], projects: ['Complex Financial SQL Analytics', 'Automated Data Extraction Script'], resources: [{ title: 'Mode SQL Tutorial', url: 'https://mode.com/sql-tutorial/', free: true }, { title: 'IBM Data Fundamentals', url: 'https://skillsbuild.org', free: true }] },
      { phase: 2, title: 'Data Warehousing & Dimensional Modeling (dbt)', weeks: '3–4', priority: 'high', skills: ['Snowflake/BigQuery', 'Star Schema', 'dbt Core', 'Data Testing'], projects: ['SaaS Revenue Star Schema Mart', 'dbt Automated Test Suite'], resources: [{ title: 'dbt Official Tutorial', url: 'https://courses.getdbt.com/', free: true }] },
      { phase: 3, title: 'Workflow Orchestration with Apache Airflow', weeks: '3–4', priority: 'high', skills: ['Apache Airflow', 'DAGs', 'TaskFlow API', 'Sensors & Hooks'], projects: ['Automated Production ETL DAG', 'Multi-Source Data Ingestion Pipeline'], resources: [{ title: 'Airflow Official Tutorial', url: 'https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html', free: true }] },
      { phase: 4, title: 'Distributed Computing with Apache Spark', weeks: '4–5', priority: 'high', skills: ['PySpark', 'Spark DataFrames', 'Cluster Architecture', 'Partitioning'], projects: ['Large-Scale Log Aggregator (10M rows)', 'Spark Optimization Benchmark'], resources: [{ title: 'Apache Spark Docs', url: 'https://spark.apache.org/docs/latest/', free: true }] },
      { phase: 5, title: 'Streaming Data Pipelines with Apache Kafka', weeks: '4–5', priority: 'medium', skills: ['Apache Kafka', 'Producers/Consumers', 'Kafka Connect', 'Lakehouse (Delta Lake)'], projects: ['Real-Time Clickstream Processor', 'Streaming Alert Engine'], resources: [{ title: 'Confluent Kafka Fundamentals', url: 'https://developer.confluent.io/learn/kafka-foundations/', free: true }] },
    ],
  },
];

/* ──────────────────────────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────────────────────────── */
export default function CareerPathsPage({
  onBack,
  resumeStats,
  userName = 'Engineer',
  selPath,
  setSelPath,
  showToast = () => {},
  onNavigateToRoadmap,
  onNavigateToCourses,
  onNavigateToJobs,
}) {
  const [activeTab, setActiveTab] = useState('explorer'); // 'explorer' | 'compare' | 'ladder'
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all' | 'web' | 'ai' | 'security'
  const [sortBy, setSortBy] = useState('fit'); // 'fit' | 'demand' | 'salary' | 'duration'
  
  // Track Comparison state
  const [compareTrack1, setCompareTrack1] = useState('fullstack');
  const [compareTrack2, setCompareTrack2] = useState('aiml');
  
  // Seniority Ladder state
  const [ladderTrackId, setLadderTrackId] = useState('fullstack');
  const [ladderSeniority, setLadderSeniority] = useState('junior'); // 'junior' | 'mid' | 'senior' | 'staff'

  const storageKey = useMemo(() => {
    const sanitized = (userName || 'user').toLowerCase().trim().replace(/\s+/g, '_');
    return `cc_career_phases_${sanitized}`;
  }, [userName]);

  // Interactive Phase Progress Checklist (persisted per user)
  const [completedPhases, setCompletedPhases] = useState(() => {
    try {
      const sanitized = (userName || 'user').toLowerCase().trim().replace(/\s+/g, '_');
      const raw = localStorage.getItem(`cc_career_phases_${sanitized}`);
      if (raw) return JSON.parse(raw);
    } catch {}
    return {};
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(completedPhases));
    } catch (e) {
      console.error('Failed to save career phases to localStorage:', e);
    }
  }, [storageKey, completedPhases]);

  // Compute dynamic match score based on candidate resume detected skills
  const computeFit = (track) => {
    if (!resumeStats || !resumeStats.detected || resumeStats.detected.length === 0) {
      return track.match;
    }
    const detectedLower = resumeStats.detected.map((s) => s.toLowerCase());
    const trackSkillsLower = track.skills.map((s) => s.toLowerCase());
    const matched = trackSkillsLower.filter((ts) =>
      detectedLower.some((dl) => dl.includes(ts) || ts.includes(dl))
    );
    const ratio = matched.length / trackSkillsLower.length;
    const computed = Math.round(50 + ratio * 48);
    return Math.min(99, Math.max(50, computed));
  };

  // Filtered & Sorted Tracks
  const filteredTracks = useMemo(() => {
    return ENRICHED_CAREER_PATHS.filter((track) => {
      const matchesCategory =
        categoryFilter === 'all' || track.category === categoryFilter;
      const matchesSearch =
        !searchQuery ||
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'fit') return computeFit(b) - computeFit(a);
      if (sortBy === 'demand') return parseInt(b.demand) - parseInt(a.demand);
      if (sortBy === 'duration') return parseInt(a.duration) - parseInt(b.duration);
      return 0;
    });
  }, [categoryFilter, searchQuery, sortBy, resumeStats]);

  // Current selected track object (if in deep curriculum view)
  const activeTrack = useMemo(() => {
    return ENRICHED_CAREER_PATHS.find((t) => t.id === selPath) || null;
  }, [selPath]);

  // Toggle phase completed state
  const togglePhase = (trackId, phaseNum) => {
    const key = `${trackId}-p${phaseNum}`;
    setCompletedPhases((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const isNowDone = next[key];
      showToast(
        isNowDone ? `Phase ${phaseNum} marked completed! 🏆` : `Phase ${phaseNum} reset.`,
        isNowDone ? 'success' : 'info',
        isNowDone ? '✅' : '↺'
      );
      return next;
    });
  };

  // Compute track completion percentage
  const getTrackCompletionPct = (trackId) => {
    const track = ENRICHED_CAREER_PATHS.find((t) => t.id === trackId);
    if (!track) return 0;
    const doneCount = track.phases.filter(
      (ph) => !!completedPhases[`${trackId}-p${ph.phase}`]
    ).length;
    return Math.round((doneCount / track.phases.length) * 100);
  };

  /* ──────────────────────────────────────────────────────────
     SUB-VIEW: DEEP CURRICULUM VIEW (WHEN selPath IS ACTIVE)
     ────────────────────────────────────────────────────────── */
  if (activeTrack) {
    const trackFit = computeFit(activeTrack);
    const completionPct = getTrackCompletionPct(activeTrack.id);

    return (
      <div className="space-y-8 animate-fade-in pb-12">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <button
            onClick={() => setSelPath(null)}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← All Career Tracks</span>
          </button>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="cursor-pointer hover:underline" onClick={() => setSelPath(null)}>
              Career Pathways
            </span>
            <span>/</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {activeTrack.title}
            </span>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-xl transition-all border border-blue-200 dark:border-blue-800"
          >
            <Compass className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
        </div>

        {/* Track Banner */}
        <div className={`p-8 rounded-3xl bg-gradient-to-br ${activeTrack.accentGradient} text-white shadow-2xl relative overflow-hidden`}>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 backdrop-blur-3xl -skew-x-12 pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-wider text-white">
                <span className="text-base">{activeTrack.icon}</span>
                <span>{activeTrack.tagline}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{activeTrack.title}</h1>
              <p className="text-sm text-blue-50/90 leading-relaxed">{activeTrack.desc}</p>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-xl bg-black/25 backdrop-blur-md border border-white/20 text-xs font-semibold flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Salary: {activeTrack.salary}</span>
                </span>
                <span className="px-3 py-1 rounded-xl bg-black/25 backdrop-blur-md border border-white/20 text-xs font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-300" />
                  <span>Estimated: {activeTrack.duration}</span>
                </span>
                <span className="px-3 py-1 rounded-xl bg-black/25 backdrop-blur-md border border-white/20 text-xs font-semibold flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-300" />
                  <span>Growth: {activeTrack.growth}</span>
                </span>
              </div>
            </div>

            {/* AI Fit & Progress Radial Card */}
            <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-white/20 flex flex-col items-center text-center space-y-4 w-full sm:w-auto min-w-[240px]">
              <div className="relative flex items-center justify-center">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" className="text-white/20" fill="transparent" />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-emerald-400 transition-all duration-1000 ease-out"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - trackFit / 100)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-white">{trackFit}%</span>
                  <span className="text-[10px] uppercase font-bold text-emerald-300">Resume Fit</span>
                </div>
              </div>

              <div className="w-full space-y-1">
                <div className="flex justify-between text-xs font-bold text-white/80">
                  <span>Track Mastery:</span>
                  <span className="text-emerald-300">{completionPct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${completionPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bridges Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => {
              if (onNavigateToRoadmap) onNavigateToRoadmap();
              else showToast('Opening Zig-Zag Roadmap...', 'info', '🗓️');
            }}
            className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-xl">
                🗓️
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
                  Zig-Zag Roadmap Timeline
                </h4>
                <p className="text-[11px] text-slate-400">View weekly milestone schedule</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-indigo-500 transition-all" />
          </button>

          <button
            onClick={() => {
              if (onNavigateToCourses) onNavigateToCourses();
              else showToast('Navigating to Course Catalog...', 'info', '🎓');
            }}
            className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-teal-400 dark:hover:border-teal-500 hover:shadow-lg transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center text-xl">
                🎓
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-teal-600 transition-colors">
                  Bridge Gaps in Courses
                </h4>
                <p className="text-[11px] text-slate-400">IBM SkillsBuild & credentials</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-teal-500 transition-all" />
          </button>

          <button
            onClick={() => {
              if (onNavigateToJobs) onNavigateToJobs();
              else showToast('Navigating to Job Matches...', 'info', '💼');
            }}
            className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-rose-400 dark:hover:border-rose-500 hover:shadow-lg transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-xl">
                💼
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-rose-600 transition-colors">
                  Matching Tech Jobs
                </h4>
                <p className="text-[11px] text-slate-400">Positions hiring this profile</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-rose-500 transition-all" />
          </button>
        </div>

        {/* 5-Phase Detailed Curriculum Stepper */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span>📚 5-Phase Structured Curriculum</span>
                <span className="text-xs font-normal text-slate-400">({activeTrack.duration} total)</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click the checkbox on any phase to simulate completion and track your mastery.
              </p>
            </div>
            <button
              onClick={() => {
                const allDone = activeTrack.phases.every(
                  (ph) => !!completedPhases[`${activeTrack.id}-p${ph.phase}`]
                );
                const next = { ...completedPhases };
                activeTrack.phases.forEach((ph) => {
                  next[`${activeTrack.id}-p${ph.phase}`] = !allDone;
                });
                setCompletedPhases(next);
                showToast(allDone ? 'Reset all phases.' : 'All phases simulated complete! 🚀', 'info');
              }}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              Toggle All
            </button>
          </div>

          <div className="space-y-5">
            {activeTrack.phases.map((ph) => {
              const isDone = !!completedPhases[`${activeTrack.id}-p${ph.phase}`];
              return (
                <div
                  key={ph.phase}
                  className={`p-6 rounded-3xl border-2 transition-all relative overflow-hidden bg-white dark:bg-slate-900 ${
                    isDone
                      ? 'border-emerald-500/70 shadow-lg shadow-emerald-500/10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div className="flex items-center gap-3.5">
                      <button
                        onClick={() => togglePhase(activeTrack.id, ph.phase)}
                        className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-sm transition-all shadow-md ${
                          isDone
                            ? 'bg-emerald-500 text-white scale-105'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-500 hover:text-white'
                        }`}
                      >
                        {isDone ? '✓' : ph.phase}
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Phase {ph.phase}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              ph.priority === 'high'
                                ? 'bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-300 border border-red-200 dark:border-red-800'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                            }`}
                          >
                            {ph.priority.toUpperCase()} PRIORITY
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{ph.title}</h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>~{ph.weeks} Weeks</span>
                      </span>
                      <button
                        onClick={() => togglePhase(activeTrack.id, ph.phase)}
                        className={`text-xs font-bold px-3.5 py-1.5 rounded-xl border transition-all ${
                          isDone
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isDone ? 'Completed ✓' : 'Mark Complete'}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    {/* Skills Breakdown */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Skills to Acquire</span>
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {ph.skills.map((skill) => {
                          const userHasSkill =
                            resumeStats?.detected &&
                            resumeStats.detected.some((ds) =>
                              ds.toLowerCase().includes(skill.toLowerCase())
                            );
                          return (
                            <span
                              key={skill}
                              className={`text-xs px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1 ${
                                userHasSkill
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                              }`}
                            >
                              <span>{userHasSkill ? '✓' : '•'}</span>
                              <span>{skill}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Milestone Projects */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" />
                        <span>Milestone Projects</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        {ph.projects.map((proj, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-purple-500 font-bold">→</span>
                            <span className="font-medium">{proj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Verified Learning Links */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Accredited Resources</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {ph.resources.map((res, idx) => (
                          <a
                            key={idx}
                            href={res.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-xl transition-all flex items-center gap-1.5 font-medium"
                          >
                            <span>{res.free ? '🆓' : '🎓'}</span>
                            <span>{res.title}</span>
                            <ExternalLink className="w-3 h-3 text-emerald-500" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Signature Capstone Architecture Card */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white border-2 border-indigo-500/40 shadow-2xl relative overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-indigo-500/20 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-3 bg-indigo-500/20 rounded-2xl border border-indigo-400/30">🏆</span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                  Signature Portfolio Capstone
                </span>
                <h3 className="text-xl font-black">{activeTrack.capstoneSpecs.title}</h3>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700 text-xs font-bold text-indigo-300">
              <span>Recruiter Tested Rubric</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Core Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {activeTrack.capstoneSpecs.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-indigo-950/60 border border-indigo-800/80 rounded-xl text-xs font-semibold text-indigo-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Must-Have Deliverables for Freshers
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeTrack.capstoneSpecs.deliverables.map((del, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Day in the Life Timeline */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl p-2 bg-blue-50 dark:bg-blue-950/50 rounded-xl border border-blue-200 dark:border-blue-800">
              ☀️
            </span>
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                A Day in the Life of a {activeTrack.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                What daily engineering cadence looks like in modern high-growth tech firms.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {activeTrack.dayInTheLife.map((slot, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 space-y-2 hover-glow-blue transition-all"
              >
                <div className="text-xs font-bold px-2 py-0.5 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 inline-block">
                  {slot.time}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{slot.task}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ──────────────────────────────────────────────────────────
     MAIN VIEW: EXPLORER, COMPARE & LADDER TABS
     ────────────────────────────────────────────────────────── */
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* ── Top Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm card-glow-indigo">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            <span>🗺️</span>
            <span>Career Pathways & Blueprints</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Curated Engineering Trajectories
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            Explore 6 high-demand tech domains calibrated with real compensation benchmarks, 5-phase curricula, and dynamic resume skill-fit analysis.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>🏠</span>
            <span>Dashboard</span>
          </button>
        </div>
      </div>

      {/* ── Mode Selection Navigation Tabs ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-3">
        <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('explorer')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'explorer'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>3D Blueprint Explorer</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">6</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'compare'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Side-by-Side Compare</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">Versus</span>
          </button>

          <button
            onClick={() => setActiveTab('ladder')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'ladder'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Seniority Salary Ladder</span>
          </button>
        </div>

        {/* Quick Diagnostic Tag */}
        {resumeStats && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Fit scores dynamically calibrated with {userName}&apos;s resume ({resumeStats.detected?.length || 0} skills)</span>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          TAB 1: 3D BLUEPRINT EXPLORER (CARDS GRID)
          ══════════════════════════════════════════════════════ */}
      {activeTab === 'explorer' && (
        <div className="space-y-6">
          {/* Search & Category Filter Toolbar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tracks by title, skill (e.g. React, PyTorch, Docker)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Tracks' },
                { id: 'web', label: '🌐 Web & Full Stack' },
                { id: 'ai', label: '🤖 AI & Data' },
                { id: 'security', label: '🛡️ Cloud & Security' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    categoryFilter === cat.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-semibold focus:outline-none"
              >
                <option value="fit">Best AI Fit %</option>
                <option value="demand">Market Demand</option>
                <option value="duration">Fastest Duration</option>
              </select>
            </div>
          </div>

          {/* 3D Blueprint Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTracks.map((track) => {
              const fitScore = computeFit(track);
              const completionPct = getTrackCompletionPct(track.id);

              return (
                <div
                  key={track.id}
                  className={`bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 ${track.border} shadow-sm ${track.glow} hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon, Title & Fit Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm">
                        {track.icon}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-xs font-black px-3 py-1 rounded-full border ${track.matchColor} shadow-sm`}>
                          {fitScore}% AI Fit
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-md">
                          {track.demand}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {track.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {track.desc}
                      </p>
                    </div>

                    {/* Compensation & Timeline Badges */}
                    <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-700/60 text-xs">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Salary Benchmark
                        </span>
                        <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm">
                          {track.salary}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Curriculum Pace
                        </span>
                        <span className="font-bold text-slate-700 dark:text-slate-300 text-xs">
                          {track.duration}
                        </span>
                      </div>
                    </div>

                    {/* Core Skills Chips */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                        Core Tech Stack:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {track.skills.slice(0, 5).map((skill) => (
                          <span
                            key={skill}
                            className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${track.skillColor}`}
                          >
                            {skill}
                          </span>
                        ))}
                        {track.skills.length > 5 && (
                          <span className="text-[10px] font-semibold text-slate-400 self-center">
                            +{track.skills.length - 5}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Hiring Firms */}
                    <div className="pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Active Hiring Companies:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {track.hiringFirms.map((firm) => (
                          <span
                            key={firm}
                            className="text-[10px] bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md font-semibold"
                          >
                            🏢 {firm}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Progress & Action */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 space-y-3 mt-4">
                    {completionPct > 0 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className="text-slate-400">Track Progress</span>
                          <span className="text-emerald-500">{completionPct}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${completionPct}%` }} />
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => setSelPath(track.id)}
                      className={`w-full py-2.5 bg-gradient-to-r ${track.accentGradient} hover:opacity-90 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 shimmer-btn`}
                    >
                      <span>Inspect 5-Phase Blueprint</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          TAB 2: SIDE-BY-SIDE TRACK COMPARISON TOOL ("VERSUS")
          ══════════════════════════════════════════════════════ */}
      {activeTab === 'compare' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span>⚔️ Career Path Versus Analyzer</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Compare any two engineering trajectories side-by-side to understand salary trajectories, difficulty curves, and skill overlaps.
              </p>
            </div>

            {/* Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
                  Track 1 (Reference)
                </label>
                <select
                  value={compareTrack1}
                  onChange={(e) => setCompareTrack1(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none"
                >
                  {ENRICHED_CAREER_PATHS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.icon} {t.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
                  Track 2 (Comparison)
                </label>
                <select
                  value={compareTrack2}
                  onChange={(e) => setCompareTrack2(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none"
                >
                  {ENRICHED_CAREER_PATHS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.icon} {t.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comparison Side-by-Side Table */}
            {(() => {
              const t1 = ENRICHED_CAREER_PATHS.find((t) => t.id === compareTrack1);
              const t2 = ENRICHED_CAREER_PATHS.find((t) => t.id === compareTrack2);
              if (!t1 || !t2) return null;

              const sharedSkills = t1.skills.filter((s) => t2.skills.includes(s));
              const t1Unique = t1.skills.filter((s) => !t2.skills.includes(s));
              const t2Unique = t2.skills.filter((s) => !t1.skills.includes(s));

              return (
                <div className="space-y-6 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Track 1 Card */}
                    <div className={`p-6 rounded-2xl border-2 ${t1.border} bg-white dark:bg-slate-900 space-y-4`}>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{t1.icon}</span>
                        <div>
                          <h3 className="text-base font-black text-slate-900 dark:text-slate-100">{t1.title}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${t1.matchColor}`}>
                            {computeFit(t1)}% Match for you
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-slate-400">Salary Benchmark:</span>
                          <span className="font-extrabold text-emerald-500">{t1.salary}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-slate-400">Estimated Duration:</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">{t1.duration}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-slate-400">Market Demand:</span>
                          <span className="font-bold text-blue-500">{t1.demand}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-slate-400">Mathematical Depth:</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">{t1.metrics.mathDepth}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-slate-400">Remote Availability:</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">{t1.metrics.remoteAvailability}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Signature Capstone:
                        </span>
                        <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                          {t1.capstone}
                        </p>
                      </div>

                      <button
                        onClick={() => setSelPath(t1.id)}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all"
                      >
                        Inspect {t1.title} →
                      </button>
                    </div>

                    {/* Track 2 Card */}
                    <div className={`p-6 rounded-2xl border-2 ${t2.border} bg-white dark:bg-slate-900 space-y-4`}>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{t2.icon}</span>
                        <div>
                          <h3 className="text-base font-black text-slate-900 dark:text-slate-100">{t2.title}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${t2.matchColor}`}>
                            {computeFit(t2)}% Match for you
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-slate-400">Salary Benchmark:</span>
                          <span className="font-extrabold text-emerald-500">{t2.salary}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-slate-400">Estimated Duration:</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">{t2.duration}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-slate-400">Market Demand:</span>
                          <span className="font-bold text-blue-500">{t2.demand}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-slate-400">Mathematical Depth:</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">{t2.metrics.mathDepth}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                          <span className="text-slate-400">Remote Availability:</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">{t2.metrics.remoteAvailability}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Signature Capstone:
                        </span>
                        <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                          {t2.capstone}
                        </p>
                      </div>

                      <button
                        onClick={() => setSelPath(t2.id)}
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all"
                      >
                        Inspect {t2.title} →
                      </button>
                    </div>
                  </div>

                  {/* Skills Venn / Overlap Diagnostic */}
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-blue-500" />
                      <span>Skill Overlap & Portability</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">
                          Unique to {t1.title}:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {t1Unique.length > 0 ? (
                            t1Unique.map((s) => (
                              <span key={s} className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-[11px]">
                                {s}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400 text-xs">None</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">
                          Shared Core Foundation:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {sharedSkills.length > 0 ? (
                            sharedSkills.map((s) => (
                              <span key={s} className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-bold">
                                🔗 {s}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400 text-xs">Both share fundamentals (Git, Data Structures)</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                          Unique to {t2.title}:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {t2Unique.length > 0 ? (
                            t2Unique.map((s) => (
                              <span key={s} className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px]">
                                {s}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400 text-xs">None</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          TAB 3: SENIORITY & SALARY PROGRESSION LADDER
          ══════════════════════════════════════════════════════ */}
      {activeTab === 'ladder' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <span>📈 Engineering Seniority & Compensation Ladder</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Inspect expectations, compensation milestones, and architectural scope from Junior to Staff levels.
                </p>
              </div>

              {/* Track Selector for Ladder */}
              <select
                value={ladderTrackId}
                onChange={(e) => setLadderTrackId(e.target.value)}
                className="text-xs py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-bold focus:outline-none"
              >
                {ENRICHED_CAREER_PATHS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.icon} {t.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Seniority Tier Buttons */}
            {(() => {
              const currentTrack = ENRICHED_CAREER_PATHS.find((t) => t.id === ladderTrackId);
              if (!currentTrack) return null;
              const ladder = currentTrack.seniorityLadder;

              return (
                <div className="space-y-6">
                  {/* Ladder Stepper Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { key: 'junior', label: 'Junior (0–1y)', icon: '🌱' },
                      { key: 'mid', label: 'Mid-Level (2–4y)', icon: '⚡' },
                      { key: 'senior', label: 'Senior (5–7y)', icon: '💎' },
                      { key: 'staff', label: 'Staff / Lead (8y+)', icon: '👑' },
                    ].map((step) => (
                      <button
                        key={step.key}
                        onClick={() => setLadderSeniority(step.key)}
                        className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                          ladderSeniority === step.key
                            ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-500/25 scale-105'
                            : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-purple-300'
                        }`}
                      >
                        <span className="text-xl">{step.icon}</span>
                        <span className="text-xs font-bold">{step.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Active Seniority Details Card */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950 text-white border-2 border-purple-500/40 shadow-xl space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                          {currentTrack.title} Tier Details
                        </span>
                        <h3 className="text-xl font-black">{ladder[ladderSeniority].title}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Experience Target: {ladder[ladderSeniority].exp}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Compensation Target
                        </span>
                        <span className="text-lg font-black text-emerald-400">
                          {ladder[ladderSeniority].salary}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                        Primary Engineering Focus & Daily Scope
                      </h4>
                      <p className="text-sm text-slate-200 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10">
                        {ladder[ladderSeniority].focus}
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <span className="text-xs text-slate-400">
                        Ready to begin training for this track?
                      </span>
                      <button
                        onClick={() => setSelPath(currentTrack.id)}
                        className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
                      >
                        <span>Open {currentTrack.title} Curriculum</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
