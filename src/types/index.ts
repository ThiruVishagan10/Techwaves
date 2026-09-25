export type VerificationStatus = 'verified' | 'needs_review' | 'suspicious';
export type VerificationConfidence = 'HIGH' | 'MEDIUM' | 'LOW';
export type WorkMode = 'Remote' | 'Hybrid' | 'On-site' | 'In-Office';
export type OpportunityType = 'Internship' | 'Full-time' | 'Part-time';
export type ApplicationStage = 'saved' | 'applied' | 'interview' | 'offer' | 'rejected';

export type BackendStatus = 'connected' | 'disconnected' | 'checking';

export interface VerificationCheck {
  id: string;
  label: string;
  status: 'pass' | 'warning' | 'fail';
  detail: string;
  timestamp?: string;
}

export interface VerificationAnalysisResult {
  verificationStatus: VerificationStatus;
  confidenceScore: number;
  trustSignals: string[];
  riskFactors: string[];
  checks?: VerificationCheck[];
  summary?: string;
}

export interface MatchAnalysisResult {
  matchScore: number;
  skillsScore?: number;
  matchedSkills: string[];
  skillGaps: string[];
  explanation: string;
}

export interface MatchBreakdown {
  skillsMatch: number;
  experienceMatch: number;
  educationMatch: number;
  preferenceMatch: number;
  careerGoalAlignment: number;
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  companyLogoColor: string;
  companyInitial: string;
  location: string;
  workMode: WorkMode;
  type: OpportunityType;
  duration: string;
  stipend: string;
  deadline: string;
  source: string;
  sourceUrl: string;
  matchScore: number;
  verificationStatus: VerificationStatus;
  verificationConfidence: VerificationConfidence;
  skills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  skillGapNotes?: string;
  matchBreakdown: MatchBreakdown;
  aiExplanation: string;
  whyRecommendedReasons: string[];
  verificationChecks: VerificationCheck[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  postedDaysAgo: number;
  isSaved?: boolean;
  applicationStatus?: ApplicationStage | 'none';
  applicationId?: string;
  appliedDate?: string;
  interviewStage?: string;
  suspiciousWarning?: string;
}

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  avatarUrl: string;
  degree: string;
  university: string;
  batch: string;
  gpa: string;
  profileStrength: number;
  careerInterests: string[];
  skills: {
    core: string[];
    backend: string[];
    cloudAndTools: string[];
  };
  experience: {
    role: string;
    organization: string;
    period: string;
    description: string;
    technologies: string[];
  }[];
  projects: {
    title: string;
    technologies: string[];
    description: string;
    impact: string;
  }[];
  preferences: {
    opportunityType: string[];
    workModes: string[];
    targetRoles: string[];
    preferredLocations: string[];
    targetCompensation: string;
    earliestStartDate: string;
  };
}

export type ActiveView =
  | 'landing'
  | 'dashboard'
  | 'discover'
  | 'opportunity-details'
  | 'verification'
  | 'recommendations'
  | 'applications'
  | 'profile'
  | 'saved';

