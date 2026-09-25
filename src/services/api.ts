import {
  Opportunity,
  UserProfile,
  VerificationStatus,
  VerificationConfidence,
  VerificationAnalysisResult,
  MatchAnalysisResult,
} from '@/types';

// Supports both http://localhost:8000 and http://localhost:8000/api
const RAW_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/+$/, '');
const API_BASE_URL = RAW_BASE_URL.endsWith('/api') ? RAW_BASE_URL : `${RAW_BASE_URL}/api`;
const ROOT_URL = RAW_BASE_URL.endsWith('/api') ? RAW_BASE_URL.slice(0, -4) : RAW_BASE_URL;

export interface APIEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp?: string;
  error?: { code: string; message: string } | string | null;
}

// Normalizer to convert backend snake_case / dynamic responses to frontend Opportunity schema
export function normalizeOpportunity(raw: any, existing?: Opportunity): Opportunity {
  if (!raw) return existing as Opportunity;

  const rawStatus = (raw.verification_status || raw.verificationStatus || existing?.verificationStatus || 'VERIFIED').toString().toLowerCase();
  const validStatus: VerificationStatus =
    rawStatus === 'verified' || rawStatus === 'needs_review' || rawStatus === 'suspicious'
      ? rawStatus
      : 'needs_review';

  const rawConfidence = (raw.confidence_tier || raw.verificationConfidence || raw.confidence || 'HIGH').toString().toUpperCase();
  const validConfidence: VerificationConfidence =
    rawConfidence === 'HIGH' || rawConfidence === 'MEDIUM' || rawConfidence === 'LOW'
      ? rawConfidence
      : 'MEDIUM';

  const matchScore =
    typeof raw.match_score === 'number'
      ? raw.match_score
      : typeof raw.matchScore === 'number'
      ? raw.matchScore
      : existing?.matchScore ?? 85;

  const rawAppStatus = (raw.application_status || raw.status || raw.applicationStatus || existing?.applicationStatus || 'none').toString().toLowerCase();

  return {
    id: String(raw.id || raw.opportunity_id || existing?.id || `opp-${Math.random().toString(36).slice(2, 7)}`),
    title: raw.title || existing?.title || 'Untitled Opportunity',
    company: raw.company || existing?.company || 'Organization',
    companyLogoColor: raw.company_logo_color || raw.companyLogoColor || existing?.companyLogoColor || 'from-blue-600 to-indigo-600',
    companyInitial:
      raw.company_initial ||
      raw.companyInitial ||
      existing?.companyInitial ||
      (raw.company ? raw.company.slice(0, 2).toUpperCase() : 'PB'),
    location: raw.location || existing?.location || 'Remote',
    workMode: raw.work_mode || raw.workMode || existing?.workMode || 'Remote',
    type: raw.opportunity_type || raw.type || existing?.type || 'Internship',
    duration: raw.duration || existing?.duration || '3-6 months',
    stipend: raw.stipend || raw.compensation || existing?.stipend || 'Competitive',
    deadline: raw.deadline || existing?.deadline || 'Rolling admission',
    source: raw.source || existing?.source || 'Verified Portal',
    sourceUrl: raw.source_url || raw.sourceUrl || raw.url || existing?.sourceUrl || 'https://pathbridge.careers',
    matchScore,
    verificationStatus: validStatus,
    verificationConfidence: validConfidence,
    skills: Array.isArray(raw.skills) ? raw.skills : existing?.skills || [],
    matchedSkills: Array.isArray(raw.matched_skills)
      ? raw.matched_skills
      : Array.isArray(raw.matchedSkills)
      ? raw.matchedSkills
      : existing?.matchedSkills || [],
    missingSkills: Array.isArray(raw.missing_skills)
      ? raw.missing_skills
      : Array.isArray(raw.skill_gaps)
      ? raw.skill_gaps
      : Array.isArray(raw.missingSkills)
      ? raw.missingSkills
      : existing?.missingSkills || [],
    skillGapNotes: raw.skill_gap_notes || raw.skillGapNotes || existing?.skillGapNotes,
    matchBreakdown: raw.match_breakdown || existing?.matchBreakdown || {
      skillsMatch: typeof raw.skills_score === 'number' ? raw.skills_score : matchScore,
      experienceMatch: Math.max(70, matchScore - 8),
      educationMatch: 95,
      preferenceMatch: 90,
      careerGoalAlignment: Math.min(98, matchScore + 2),
    },
    aiExplanation:
      raw.ai_explanation ||
      raw.explanation ||
      raw.aiExplanation ||
      existing?.aiExplanation ||
      'This opportunity aligns with your core background and verified skills.',
    whyRecommendedReasons: Array.isArray(raw.why_recommended_reasons)
      ? raw.why_recommended_reasons
      : Array.isArray(raw.whyRecommendedReasons)
      ? raw.whyRecommendedReasons
      : existing?.whyRecommendedReasons || [
          'High technical relevance with your repository projects',
          'Verified corporate recruitment pipeline',
        ],
    verificationChecks: Array.isArray(raw.verification_checks)
      ? raw.verification_checks
      : Array.isArray(raw.verificationChecks)
      ? raw.verificationChecks
      : existing?.verificationChecks || [],
    description: raw.description || existing?.description || '',
    responsibilities: Array.isArray(raw.responsibilities) ? raw.responsibilities : existing?.responsibilities || [],
    requirements: Array.isArray(raw.requirements) ? raw.requirements : existing?.requirements || [],
    benefits: Array.isArray(raw.benefits) ? raw.benefits : existing?.benefits || [],
    postedDaysAgo: typeof raw.posted_days_ago === 'number' ? raw.posted_days_ago : existing?.postedDaysAgo ?? 2,
    isSaved: Boolean(raw.is_saved ?? raw.isSaved ?? existing?.isSaved ?? (rawAppStatus !== 'none')),
    applicationStatus: rawAppStatus as any,
    applicationId: raw.application_id || raw.applicationId || existing?.applicationId,
    appliedDate: raw.applied_date || raw.appliedDate || existing?.appliedDate,
    interviewStage: raw.interview_stage || raw.interviewStage || existing?.interviewStage,
    suspiciousWarning: raw.suspicious_warning || raw.suspiciousWarning || existing?.suspiciousWarning,
  };
}

// Normalizer to convert backend profile response to frontend UserProfile schema
export function normalizeUserProfile(raw: any, existing?: UserProfile): UserProfile {
  if (!raw) return existing as UserProfile;

  let skills = existing?.skills || {
    core: ['Python', 'SQL', 'Machine Learning'],
    backend: ['FastAPI', 'React', 'REST APIs'],
    cloudAndTools: ['Docker', 'Git', 'AWS'],
  };

  if (raw.skills) {
    if (Array.isArray(raw.skills)) {
      skills = {
        core: raw.skills.slice(0, 6),
        backend: raw.skills.slice(6, 12),
        cloudAndTools: raw.skills.slice(12),
      };
    } else if (typeof raw.skills === 'object') {
      skills = {
        core: Array.isArray(raw.skills.core) ? raw.skills.core : skills.core,
        backend: Array.isArray(raw.skills.backend) ? raw.skills.backend : skills.backend,
        cloudAndTools: Array.isArray(raw.skills.cloudAndTools)
          ? raw.skills.cloudAndTools
          : Array.isArray(raw.skills.tools)
          ? raw.skills.tools
          : skills.cloudAndTools,
      };
    }
  }

  return {
    id: raw.id || raw.profile_id || existing?.id || 'profile-alex-morgan',
    name: raw.name || existing?.name || 'Alex Morgan',
    email: raw.email || existing?.email || 'alex.morgan@university.edu',
    avatarUrl: raw.avatar_url || raw.avatarUrl || existing?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    degree: raw.degree || existing?.degree || 'B.Tech — AI & Data Science',
    university: raw.university || existing?.university || 'National Institute of Technology',
    batch: raw.batch || existing?.batch || 'Batch of 2027 (Penultimate Year)',
    gpa: raw.gpa || existing?.gpa || '3.82 / 4.00',
    profileStrength: raw.profile_strength ?? raw.profileStrength ?? existing?.profileStrength ?? 85,
    careerInterests: Array.isArray(raw.career_interests)
      ? raw.career_interests
      : Array.isArray(raw.careerInterests)
      ? raw.careerInterests
      : existing?.careerInterests || ['AI / Machine Learning', 'Data Engineering'],
    skills,
    experience: Array.isArray(raw.experience) ? raw.experience : existing?.experience || [],
    projects: Array.isArray(raw.projects) ? raw.projects : existing?.projects || [],
    preferences: raw.preferences || existing?.preferences || {
      opportunityType: ['Internship'],
      workModes: ['Remote', 'Hybrid', 'On-site'],
      targetRoles: ['AI/ML Intern', 'Data Engineering Intern'],
      preferredLocations: ['Hyderabad', 'Bengaluru', 'Remote'],
      targetCompensation: '₹50,000+/mo',
      earliestStartDate: 'Summer 2026',
    },
  };
}

export const api = {
  baseUrl: API_BASE_URL,
  rootUrl: ROOT_URL,

  // 1. Health check
  async checkHealth(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      // Check /health endpoint
      const res = await fetch(`${ROOT_URL}/health`, {
        signal: controller.signal,
      }).catch(() => null);

      clearTimeout(timeoutId);

      if (res && res.ok) {
        return true;
      }

      // Fallback check: try docs or opportunities
      const optController = new AbortController();
      const optTimeoutId = setTimeout(() => optController.abort(), 2000);
      const optRes = await fetch(`${API_BASE_URL}/opportunities`, {
        signal: optController.signal,
      }).catch(() => null);
      clearTimeout(optTimeoutId);

      return Boolean(optRes && (optRes.ok || optRes.status === 200));
    } catch {
      return false;
    }
  },

  // 2. Opportunities Discovery
  async getOpportunities(params?: {
    search?: string;
    work_mode?: string;
    opportunity_type?: string;
    verification_status?: string;
    skills?: string;
  }): Promise<Opportunity[]> {
    try {
      const searchParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, val]) => {
          if (val && val !== 'all') searchParams.append(key, val);
        });
      }
      const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
      const res = await fetch(`${API_BASE_URL}/opportunities${query}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: APIEnvelope<any[]> = await res.json();
      const rawList = Array.isArray(json.data) ? json.data : Array.isArray(json) ? json : [];
      return rawList.map((item) => normalizeOpportunity(item));
    } catch (e) {
      console.warn('Backend getOpportunities error, using local fallback:', e);
      return [];
    }
  },

  async getOpportunity(id: string): Promise<Opportunity | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/opportunities/${encodeURIComponent(id)}`);
      if (!res.ok) return null;
      const json: APIEnvelope<any> = await res.json();
      const raw = json.data || json;
      return normalizeOpportunity(raw);
    } catch {
      return null;
    }
  },

  // 3. Profiles & Resume Analysis
  async getProfile(profileId: string = 'profile-alex-morgan'): Promise<UserProfile | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/profiles/${encodeURIComponent(profileId)}`);
      if (!res.ok) return null;
      const json: APIEnvelope<any> = await res.json();
      return normalizeUserProfile(json.data || json);
    } catch {
      return null;
    }
  },

  async updateProfile(profile: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/profiles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (!res.ok) return null;
      const json: APIEnvelope<any> = await res.json();
      return normalizeUserProfile(json.data || json);
    } catch {
      return null;
    }
  },

  async analyzeResume(input: File | string): Promise<UserProfile | null> {
    try {
      let res: Response;
      if (typeof input === 'string') {
        const formData = new FormData();
        formData.append('resume_text', input);
        res = await fetch(`${API_BASE_URL}/profiles/analyze`, {
          method: 'POST',
          body: formData,
        });
      } else {
        const formData = new FormData();
        formData.append('file', input);
        res = await fetch(`${API_BASE_URL}/profiles/analyze`, {
          method: 'POST',
          body: formData,
        });
      }
      if (!res.ok) return null;
      const json: APIEnvelope<any> = await res.json();
      return normalizeUserProfile(json.data || json);
    } catch (e) {
      console.warn('Resume analysis error:', e);
      return null;
    }
  },

  // 4. AI Recommendations & Match Breakdown
  async getRecommendations(profileId: string = 'profile-alex-morgan'): Promise<Opportunity[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/recommendations/${encodeURIComponent(profileId)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: APIEnvelope<any[]> = await res.json();
      const rawList = Array.isArray(json.data) ? json.data : Array.isArray(json) ? json : [];
      return rawList.map((item) => normalizeOpportunity(item));
    } catch (e) {
      console.warn('Backend getRecommendations note (using fallback):', e);
      return [];
    }
  },

  async matchOpportunity(profileId: string, opportunityId: string): Promise<MatchAnalysisResult | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/recommendations/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile_id: profileId, opportunity_id: opportunityId }),
      });
      if (!res.ok) return null;
      const json: APIEnvelope<any> = await res.json();
      const d = json.data || json;
      return {
        matchScore: d.match_score ?? d.matchScore ?? 85,
        skillsScore: d.skills_score ?? d.skillsScore,
        matchedSkills: d.matched_skills || d.matchedSkills || [],
        skillGaps: d.skill_gaps || d.missing_skills || d.skillGaps || [],
        explanation: d.explanation || d.ai_explanation || '',
      };
    } catch {
      return null;
    }
  },

  // 5. Trust & Scam Verification Engine
  async analyzeVerification(params: {
    opportunity_id?: string;
    url?: string;
    company?: string;
    description?: string;
  }): Promise<VerificationAnalysisResult | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/verification/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (!res.ok) return null;
      const json: APIEnvelope<any> = await res.json();
      const d = json.data || json;
      const rawStatus = (d.status || d.verification_status || d.verificationStatus || 'VERIFIED').toString().toLowerCase();
      const verificationStatus: VerificationStatus =
        rawStatus === 'verified' || rawStatus === 'needs_review' || rawStatus === 'suspicious'
          ? rawStatus
          : 'needs_review';

      return {
        verificationStatus,
        confidenceScore: d.confidence_score ?? d.confidenceScore ?? 85,
        trustSignals: d.trust_signals || d.trustSignals || [],
        riskFactors: d.risk_factors || d.riskFactors || [],
        checks: d.checks || d.verification_checks || [],
        summary: d.summary || d.explanation || '',
      };
    } catch {
      return null;
    }
  },

  // 6. Application Tracker Pipeline
  async getApplications(profileId: string = 'profile-alex-morgan'): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/applications/${encodeURIComponent(profileId)}`);
      if (!res.ok) return [];
      const json: APIEnvelope<any[]> = await res.json();
      return Array.isArray(json.data) ? json.data : Array.isArray(json) ? json : [];
    } catch {
      return [];
    }
  },

  async recordApplication(
    profileId: string,
    opportunityId: string,
    status: string,
    notes?: string
  ): Promise<any | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile_id: profileId,
          opportunity_id: opportunityId,
          status: status.toUpperCase(),
          notes: notes || '',
        }),
      });
      if (!res.ok) return null;
      const json: APIEnvelope<any> = await res.json();
      return json.data || json;
    } catch {
      return null;
    }
  },

  async updateApplication(applicationId: string, status: string, notes?: string): Promise<any | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/applications/${encodeURIComponent(applicationId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: status.toUpperCase(),
          notes,
        }),
      });
      if (!res.ok) return null;
      const json: APIEnvelope<any> = await res.json();
      return json.data || json;
    } catch {
      return null;
    }
  },

  async deleteApplication(applicationId: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/applications/${encodeURIComponent(applicationId)}`, {
        method: 'DELETE',
      });
      return res.ok;
    } catch {
      return false;
    }
  },
};
