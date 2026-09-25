import { UserProfile } from '@/types';

// Default initial state before live backend profile is fetched
export const initialUserProfile: UserProfile = {
  id: 'profile-alex-morgan',
  name: 'Alex Morgan',
  email: 'alex.morgan@university.edu',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  degree: 'B.Tech in Artificial Intelligence & Data Science',
  university: 'National Institute of Technology',
  batch: '2023-2027 (Penultimate Year)',
  gpa: '3.82 / 4.00',
  profileStrength: 82,
  careerInterests: ['AI / Machine Learning', 'Data Engineering', 'Cloud Systems'],
  skills: {
    core: ['Python', 'SQL', 'Machine Learning', 'PyTorch'],
    backend: ['React', 'Next.js', 'FastAPI', 'Go', 'REST APIs'],
    cloudAndTools: ['AWS', 'PySpark', 'Docker', 'Git', 'PostgreSQL'],
  },
  experience: [],
  projects: [],
  preferences: {
    opportunityType: ['Internship'],
    workModes: ['Remote', 'Hybrid', 'On-site'],
    targetRoles: ['AI/ML Intern', 'Data Engineering Intern'],
    preferredLocations: ['Hyderabad', 'Bengaluru', 'Remote'],
    targetCompensation: '₹50,000+/mo',
    earliestStartDate: 'Summer 2026',
  },
};
