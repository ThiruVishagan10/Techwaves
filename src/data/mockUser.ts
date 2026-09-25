import { UserProfile } from '@/types';

export const mockUser: UserProfile = {
  name: 'Alex Morgan',
  email: 'alex.morgan@university.edu',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  degree: 'B.Tech — Artificial Intelligence & Data Science',
  university: 'National Institute of Technology',
  batch: 'Batch of 2027 (Penultimate Year)',
  gpa: '3.82 / 4.00 (Top 5% Cohort)',
  profileStrength: 82,
  careerInterests: [
    'AI / Machine Learning',
    'Data Engineering',
    'Backend Engineering',
    'Cloud Systems'
  ],
  skills: {
    core: ['Python', 'SQL', 'Machine Learning', 'PyTorch', 'Data Analysis', 'Algorithms'],
    backend: ['React', 'Next.js', 'FastAPI', 'Go', 'REST APIs', 'Node.js'],
    cloudAndTools: ['AWS', 'PySpark', 'Git', 'Linux', 'Docker (Basic)', 'PostgreSQL']
  },
  experience: [
    {
      role: 'Undergraduate ML Research Intern',
      organization: 'Vision & Language AI Lab, NIT',
      period: 'May 2025 – Present (10 mos)',
      description:
        'Conducted research on lightweight transformer architectures for edge medical imaging. Optimized inference latency by 34% using TensorRT and PyTorch quantization.',
      technologies: ['Python', 'PyTorch', 'TensorRT', 'OpenCV']
    },
    {
      role: 'Backend Engineering Fellow',
      organization: 'OpenSource Campus Collective',
      period: 'Jan 2025 – May 2025 (5 mos)',
      description:
        'Maintained high-throughput API endpoints in Go and PostgreSQL serving 12,000+ active university students for campus hackathon registrations.',
      technologies: ['Go', 'PostgreSQL', 'Docker', 'REST']
    }
  ],
  projects: [
    {
      title: 'Predictive Healthcare Classifier with PyTorch & FastAPI',
      technologies: ['Python', 'PyTorch', 'FastAPI', 'Docker', 'AWS'],
      description:
        'Built an end-to-end multi-modal diagnostic screening system with 94.2% ROC-AUC. Containerized with Docker and deployed on AWS EC2 with automated CI/CD pipeline.',
      impact: 'Tested on 15,000 anonymized clinical records with sub-120ms inference response.'
    },
    {
      title: 'Distributed Stream ETL Pipeline with PySpark & Kafka',
      technologies: ['PySpark', 'Apache Kafka', 'SQL', 'AWS S3'],
      description:
        'Engineered a distributed real-time clickstream processing engine capable of ingesting 25,000 events/sec with automated schema enforcement and Parquet partitioned lakehouse storage.',
      impact: 'Reduced downstream analytics query latency by 58%.'
    },
    {
      title: 'Graph RAG Document Intelligence Search',
      technologies: ['Python', 'LangChain', 'Neo4j', 'FastAPI'],
      description:
        'Designed a hybrid vector & knowledge graph retrieval pipeline for complex academic literature querying with source citation attribution.',
      impact: 'Recognized with First Prize at Inter-University AI Symposium 2025.'
    }
  ],
  preferences: {
    opportunityType: ['Internship', 'Co-op (Summer/Autumn 2026)'],
    workModes: ['Remote', 'Hybrid', 'On-site'],
    targetRoles: [
      'AI/ML Intern',
      'Data Engineering Intern',
      'Machine Learning Intern',
      'Backend Systems Intern'
    ],
    preferredLocations: ['Hyderabad', 'Bengaluru', 'Remote / Worldwide', 'Noida'],
    targetCompensation: '₹50,000+/mo (or $40+/hr for international)',
    earliestStartDate: 'Immediately / Summer 2026'
  }
};
