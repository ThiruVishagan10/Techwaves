import {
  Opportunity,
  UserProfile,
  VerificationStatus,
  VerificationConfidence,
  VerificationAnalysisResult,
  MatchAnalysisResult,
  AuthUser,
  AuthResponse,
  ApplicationStage,
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

export type RawRecord = Record<string, unknown>;

// Clean any malformed unicode characters
function cleanString(str?: string): string {
  if (!str) return '';
  return str
    .replace(/Â·/g, '·')
    .replace(/Â/g, '')
    .replace(/\?1/g, '₹')
    .replace(/\?1175/g, '₹175')
    .replace(/\?1170/g, '₹170')
    .trim();
}

// Get authorization headers from stored token
function getAuthHeaders(includeJson: boolean = false): Record<string, string> {
  const headers: Record<string, string> = {};
  if (includeJson) {
    headers['Content-Type'] = 'application/json';
  }
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('pathbridge_token');
    if (token && !token.startsWith('demo-token-')) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
}

// Normalizer to convert backend snake_case / dynamic responses to frontend Opportunity schema
export function normalizeOpportunity(raw: RawRecord | null | undefined, existing?: Opportunity): Opportunity {
  if (!raw) return existing as Opportunity;

  const rawStatus = (
    raw.verification_status ||
    raw.verificationStatus ||
    existing?.verificationStatus ||
    'VERIFIED'
  )
    .toString()
    .toLowerCase();

  const validStatus: VerificationStatus =
    rawStatus === 'verified' || rawStatus === 'needs_review' || rawStatus === 'suspicious'
      ? rawStatus
      : 'needs_review';

  const rawConfidence = (
    raw.confidence_tier ||
    raw.verificationConfidence ||
    raw.confidence ||
    (typeof raw.verification_score === 'number'
      ? raw.verification_score > 80
        ? 'HIGH'
        : raw.verification_score > 50
        ? 'MEDIUM'
        : 'LOW'
      : 'HIGH')
  )
    .toString()
    .toUpperCase();

  const validConfidence: VerificationConfidence =
    rawConfidence === 'HIGH' || rawConfidence === 'MEDIUM' || rawConfidence === 'LOW'
      ? rawConfidence
      : 'MEDIUM';

  const matchScore =
    typeof raw.match_score === 'number'
      ? Math.round(raw.match_score)
      : typeof raw.matchScore === 'number'
      ? Math.round(raw.matchScore)
      : typeof raw.verification_score === 'number'
      ? Math.round(raw.verification_score)
      : existing?.matchScore ?? 85;

  const rawAppStatus = (
    raw.application_status ||
    raw.applicationStatus ||
    (raw.is_saved ? 'applied' : existing?.applicationStatus) ||
    'none'
  )
    .toString()
    .toLowerCase() as ApplicationStage | 'none';

  const rawRole = cleanString(
    (raw.title as string) || (raw.role as string) || (raw.role_title as string) || existing?.title || 'Software Engineering Intern'
  );

  const rawCompany = cleanString(
    (raw.company_name as string) || (raw.company as string) || existing?.company || 'Verified Partner'
  );

  const rawLocation = cleanString(
    (raw.location_city as string) || (raw.location as string) || existing?.location || 'Bengaluru, India'
  );

  const rawStipend = cleanString(
    (raw.compensation as string) ||
    (raw.stipend as string) ||
    (raw.salary as string) ||
    (raw.stipend_range as string) ||
    existing?.stipend ||
    '₹45,000 / month'
  );

  const rawWorkMode = (
    raw.work_mode ||
    raw.workMode ||
    (raw.type === 'Remote' || raw.type === 'Hybrid' || raw.type === 'In-Office' ? raw.type : existing?.workMode) ||
    'Hybrid'
  )
    .toString()
    .replace('In_Office', 'In-Office') as 'Remote' | 'Hybrid' | 'In-Office';

  const rawType = (
    raw.opportunity_type ||
    raw.type ||
    existing?.type ||
    'Internship'
  )
    .toString()
    .replace('Full_time', 'Full-time') as 'Internship' | 'Full-time';

  const rawDeadline = cleanString(
    (raw.application_deadline as string) || (raw.deadline as string) || existing?.deadline || 'Rolling Admissions'
  );

  const rawSkills = Array.isArray(raw.skills_required)
    ? (raw.skills_required as string[]).map((s) => cleanString(s))
    : Array.isArray(raw.skills)
    ? (raw.skills as string[]).map((s) => cleanString(s))
    : Array.isArray(raw.matched_skills)
    ? (raw.matched_skills as string[]).map((s) => cleanString(s))
    : existing?.skills || ['Python', 'Machine Learning', 'FastAPI'];

  const rawSignals = Array.isArray(raw.trust_signals)
    ? (raw.trust_signals as string[]).map((s) => cleanString(s))
    : Array.isArray(raw.trustSignals)
    ? (raw.trustSignals as string[]).map((s) => cleanString(s))
    : existing?.trustSignals || ['Official Domain Verified', 'Direct Corporate Pipeline'];

  const rawRisks = Array.isArray(raw.risk_factors)
    ? (raw.risk_factors as string[]).map((r) => cleanString(r))
    : Array.isArray(raw.riskFactors)
    ? (raw.riskFactors as string[]).map((r) => cleanString(r))
    : existing?.riskFactors || [];

  const rawMatchedSkills = Array.isArray(raw.matched_skills)
    ? (raw.matched_skills as string[]).map((s) => cleanString(s))
    : Array.isArray(raw.matchedSkills)
    ? (raw.matchedSkills as string[]).map((s) => cleanString(s))
    : existing?.matchedSkills || rawSkills.slice(0, 3);

  const rawMissingSkills = Array.isArray(raw.missing_skills)
    ? (raw.missing_skills as string[]).map((s) => cleanString(s))
    : Array.isArray(raw.missingSkills)
    ? (raw.missingSkills as string[]).map((s) => cleanString(s))
    : existing?.missingSkills || [];

  return {
    id: (raw.id as string) || (raw.opportunity_id as string) || existing?.id || `opp-${Date.now()}`,
    title: rawRole,
    company: rawCompany,
    companyLogoColor: (raw.company_logo_color as string) || (raw.companyLogoColor as string) || existing?.companyLogoColor || 'from-blue-600 to-indigo-700',
    companyInitial: (raw.company_initial as string) || (raw.companyInitial as string) || existing?.companyInitial || (rawCompany ? rawCompany.slice(0, 2).toUpperCase() : 'CO'),
    logoUrl: (raw.logo_url as string) || (raw.logoUrl as string) || (raw.company_logo as string) || existing?.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=120',
    location: rawLocation,
    workMode: rawWorkMode === 'Remote' || rawWorkMode === 'Hybrid' || rawWorkMode === 'In-Office' ? rawWorkMode : 'Hybrid',
    type: rawType === 'Internship' || rawType === 'Full-time' ? rawType : 'Internship',
    stipend: rawStipend,
    deadline: rawDeadline,
    duration: cleanString((raw.duration as string) || existing?.duration || '6 Months'),
    source: cleanString((raw.source as string) || existing?.source || 'PathBridge Network'),
    sourceUrl: cleanString((raw.source_url as string) || (raw.sourceUrl as string) || existing?.sourceUrl || 'https://pathbridge.careers'),
    skills: rawSkills,
    matchScore,
    matchBreakdown: (raw.match_breakdown as Opportunity['matchBreakdown']) || (raw.matchBreakdown as Opportunity['matchBreakdown']) || existing?.matchBreakdown || {
      skillsMatch: 88,
      experienceMatch: 82,
      educationMatch: 90,
      preferenceMatch: 85,
      careerGoalAlignment: 88,
    },
    matchedSkills: rawMatchedSkills,
    missingSkills: rawMissingSkills,
    aiExplanation: cleanString(
      (raw.ai_explanation as string) || (raw.aiExplanation as string) || (raw.explanation as string) || existing?.aiExplanation ||
        'Matched strongly based on your technical skill overlap and university background.'
    ),
    verificationStatus: validStatus,
    verificationConfidence: validConfidence,
    verificationScore: typeof raw.verification_score === 'number' ? Math.round(raw.verification_score) : (existing?.verificationScore ?? 92),
    trustSignals: rawSignals,
    riskFactors: rawRisks,
    whyRecommendedReasons: Array.isArray(raw.why_recommended_reasons)
      ? (raw.why_recommended_reasons as string[]).map((r) => cleanString(r))
      : Array.isArray(raw.whyRecommendedReasons)
      ? (raw.whyRecommendedReasons as string[]).map((r) => cleanString(r))
      : existing?.whyRecommendedReasons || [
          'High technical relevance with your repository projects',
          'Verified corporate recruitment pipeline',
        ],
    verificationChecks: Array.isArray(raw.verification_checks)
      ? (raw.verification_checks as Array<Record<string, unknown>>).map((chk) => ({
          label: cleanString(chk.label as string),
          status: (chk.status as 'pass' | 'warning' | 'fail') || 'pass',
          detail: cleanString(chk.detail as string),
          score: typeof chk.score === 'number' ? chk.score : undefined,
        }))
      : Array.isArray(raw.verificationChecks)
      ? raw.verificationChecks
      : existing?.verificationChecks || [],
    description: cleanString((raw.description as string) || existing?.description || ''),
    responsibilities: Array.isArray(raw.responsibilities)
      ? (raw.responsibilities as string[]).map((r) => cleanString(r))
      : existing?.responsibilities || [],
    requirements: Array.isArray(raw.requirements)
      ? (raw.requirements as string[]).map((r) => cleanString(r))
      : existing?.requirements || [],
    benefits: Array.isArray(raw.benefits)
      ? (raw.benefits as string[]).map((r) => cleanString(r))
      : existing?.benefits || [],
    postedDaysAgo: typeof raw.posted_days_ago === 'number' ? Math.round(raw.posted_days_ago) : existing?.postedDaysAgo ?? 2,
    isSaved: Boolean(raw.is_saved ?? raw.isSaved ?? existing?.isSaved ?? (rawAppStatus !== 'none')),
    applicationStatus: rawAppStatus,
    applicationId: (raw.application_id as string) || (raw.id as string) || (raw.applicationId as string) || existing?.applicationId,
    appliedDate: (raw.applied_date as string) || (raw.applied_at as string) || (raw.appliedDate as string) || existing?.appliedDate,
    interviewStage: (raw.interview_stage as string) || (raw.interviewStage as string) || existing?.interviewStage,
    suspiciousWarning: cleanString((raw.suspicious_warning as string) || (raw.suspiciousWarning as string) || existing?.suspiciousWarning),
  };
}

// Normalizer to convert backend profile response to frontend UserProfile schema
export function normalizeUserProfile(raw: RawRecord | null | undefined, existing?: UserProfile): UserProfile {
  if (!raw) return existing as UserProfile;

  let skills = existing?.skills || {
    core: ['Python', 'SQL', 'Machine Learning', 'PyTorch'],
    backend: ['React', 'Next.js', 'FastAPI', 'Go', 'REST APIs'],
    cloudAndTools: ['AWS', 'Docker', 'Git', 'Linux', 'PostgreSQL'],
  };

  if (raw.skills) {
    if (Array.isArray(raw.skills)) {
      const arr = raw.skills as string[];
      skills = {
        core: arr.slice(0, 6),
        backend: arr.slice(6, 12),
        cloudAndTools: arr.slice(12),
      };
    } else if (typeof raw.skills === 'object' && raw.skills !== null) {
      const rawObj = raw.skills as Record<string, string[]>;
      skills = {
        core: Array.isArray(rawObj.core) ? rawObj.core : skills.core,
        backend: Array.isArray(rawObj.backend) ? rawObj.backend : skills.backend,
        cloudAndTools: Array.isArray(rawObj.cloudAndTools)
          ? rawObj.cloudAndTools
          : Array.isArray(rawObj.tools)
          ? rawObj.tools
          : skills.cloudAndTools,
      };
    }
  }

  return {
    id: (raw.id as string) || (raw.profile_id as string) || existing?.id || 'profile-alex-morgan',
    name: cleanString((raw.name as string) || existing?.name || 'Alex Morgan'),
    email: (raw.email as string) || existing?.email || 'alex.morgan@university.edu',
    avatarUrl: (raw.avatar_url as string) || (raw.avatarUrl as string) || existing?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    degree: cleanString((raw.degree as string) || existing?.degree || 'B.Tech in Artificial Intelligence & Data Science'),
    university: cleanString((raw.university as string) || existing?.university || 'National Institute of Technology'),
    batch: cleanString((raw.batch as string) || existing?.batch || '2023-2027 (Penultimate Year)'),
    gpa: (raw.gpa as string) || existing?.gpa || '3.82 / 4.00',
    profileStrength: typeof raw.profile_strength === 'number' ? Math.round(raw.profile_strength) : (existing?.profileStrength ?? 85),
    careerInterests: Array.isArray(raw.career_interests)
      ? (raw.career_interests as string[])
      : Array.isArray(raw.careerInterests)
      ? (raw.careerInterests as string[])
      : existing?.careerInterests || ['AI / Machine Learning', 'Data Engineering', 'Cloud Systems'],
    skills,
    experience: Array.isArray(raw.experience)
      ? (raw.experience as Array<Record<string, unknown>>).map((e) => ({
          role: cleanString(e.role as string),
          organization: cleanString(e.organization as string),
          period: cleanString(e.period as string),
          description: cleanString(e.description as string),
          technologies: Array.isArray(e.technologies)
            ? (e.technologies as string[])
            : Array.isArray(e.skills)
            ? (e.skills as string[])
            : [],
        }))
      : existing?.experience || [],
    projects: Array.isArray(raw.projects)
      ? (raw.projects as Array<Record<string, unknown>>).map((p) => ({
          title: cleanString(p.title as string),
          description: cleanString(p.description as string),
          impact: cleanString(p.impact as string),
          technologies: Array.isArray(p.technologies)
            ? (p.technologies as string[])
            : Array.isArray(p.skills)
            ? (p.skills as string[])
            : [],
        }))
      : existing?.projects || [],
    preferences: {
      opportunityType: Array.isArray(raw.opportunity_type) ? (raw.opportunity_type as string[]) : existing?.preferences?.opportunityType || ['Internship'],
      workModes: Array.isArray(raw.work_modes) ? (raw.work_modes as string[]) : existing?.preferences?.workModes || existing?.preferences?.workMode || ['Remote', 'Hybrid', 'In-Office'],
      targetRoles: Array.isArray(raw.target_roles) ? (raw.target_roles as string[]) : existing?.preferences?.targetRoles || existing?.preferences?.roles || ['Machine Learning Engineer', 'AI Research Intern', 'Backend Engineer'],
      preferredLocations: Array.isArray(raw.preferred_locations) ? (raw.preferred_locations as string[]) : existing?.preferences?.preferredLocations || existing?.preferences?.locations || ['Bengaluru', 'Remote', 'Hyderabad', 'Pune'],
      targetCompensation: cleanString((raw.target_compensation as string) || (raw.min_stipend as string) || existing?.preferences?.targetCompensation || existing?.preferences?.minStipend || '₹35,000 / month'),
      earliestStartDate: cleanString((raw.earliest_start_date as string) || existing?.preferences?.earliestStartDate || 'Summer 2026'),
      workMode: existing?.preferences?.workMode || ['Remote', 'Hybrid'],
      roles: existing?.preferences?.roles || ['Machine Learning Engineer', 'AI Research Intern', 'Backend Engineer'],
      locations: existing?.preferences?.locations || ['Bengaluru', 'Remote', 'Hyderabad', 'Pune'],
      minStipend: existing?.preferences?.minStipend || '₹35,000 / month',
    },
    verificationBadges: Array.isArray(raw.verification_badges)
      ? (raw.verification_badges as string[])
      : existing?.verificationBadges || [
          'University Email Authenticated',
          'GitHub Code Artifacts Verified',
          'AI/ML Benchmark Top 5%',
        ],
    resumeFileName: (raw.resume_file_name as string) || (raw.resumeFileName as string) || existing?.resumeFileName || 'Alex_Morgan_AI_Resume.pdf',
    resumeLastUpdated: (raw.resume_last_updated as string) || (raw.resumeLastUpdated as string) || existing?.resumeLastUpdated || '2 days ago',
    resumeText: (raw.resume_text as string) || existing?.resumeText,
  };
}

export const api = {
  baseUrl: API_BASE_URL,
  rootUrl: ROOT_URL,

  // 1. System Health Check
  async checkHealth(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(`${ROOT_URL}/health`, {
        signal: controller.signal,
        cache: 'no-store',
      });
      clearTimeout(timeoutId);
      if (!res.ok) return false;
      const data = await res.json();
      return data.status === 'ok' || data.status === 'healthy';
    } catch {
      return false;
    }
  },

  // 2. Opportunities Endpoints
  async getOpportunities(params?: {
    search?: string;
    work_mode?: string;
    opportunity_type?: string;
    verification_status?: string;
    skills?: string[];
  }): Promise<Opportunity[]> {
    try {
      const searchParams = new URLSearchParams();
      if (params?.search) searchParams.append('search', params.search);
      if (params?.work_mode && params.work_mode !== 'All') searchParams.append('work_mode', params.work_mode);
      if (params?.opportunity_type && params.opportunity_type !== 'All') searchParams.append('opportunity_type', params.opportunity_type);
      if (params?.verification_status && params.verification_status !== 'all') {
        searchParams.append('verification_status', params.verification_status.toUpperCase());
      }
      if (params?.skills && params.skills.length > 0) {
        params.skills.forEach((s) => {
          if (s) searchParams.append('skills', s);
        });
      }
      const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
      const res = await fetch(`${API_BASE_URL}/opportunities${query}`, {
        headers: getAuthHeaders(),
      });
      if (res.status === 401 || !res.ok) {
        return [];
      }
      const json: APIEnvelope<RawRecord[]> = await res.json();
      const rawList = Array.isArray(json.data) ? json.data : Array.isArray(json) ? (json as unknown as RawRecord[]) : [];
      return rawList.map((item) => normalizeOpportunity(item));
    } catch {
      return [];
    }
  },

  async getOpportunity(id: string): Promise<Opportunity | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/opportunities/${encodeURIComponent(id)}`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) return null;
      const json: APIEnvelope<RawRecord> = await res.json();
      const raw = json.data || (json as unknown as RawRecord);
      return normalizeOpportunity(raw);
    } catch {
      return null;
    }
  },

  // 3. Profiles & Resume Analysis
  async getProfile(profileId: string = 'profile-alex-morgan'): Promise<UserProfile | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/profiles/${encodeURIComponent(profileId)}`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) return null;
      const json: APIEnvelope<RawRecord> = await res.json();
      return normalizeUserProfile(json.data || (json as unknown as RawRecord));
    } catch {
      return null;
    }
  },

  async updateProfile(profile: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/profiles`, {
        method: 'POST',
        headers: getAuthHeaders(true),
        body: JSON.stringify(profile),
      });
      if (!res.ok) return null;
      const json: APIEnvelope<RawRecord> = await res.json();
      return normalizeUserProfile(json.data || (json as unknown as RawRecord));
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
      const json: APIEnvelope<RawRecord> = await res.json();
      return normalizeUserProfile(json.data || (json as unknown as RawRecord));
    } catch (e) {
      console.warn('Resume analysis error:', e);
      return null;
    }
  },

  // 4. AI Recommendations & Match Breakdown
  async getRecommendations(profileId: string = 'profile-alex-morgan'): Promise<Opportunity[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/recommendations/${encodeURIComponent(profileId)}`, {
        headers: getAuthHeaders(),
      });
      if (res.status === 401 || !res.ok) {
        return [];
      }
      const json: APIEnvelope<RawRecord[] | { recommendations?: RawRecord[] }> = await res.json();
      const data = json.data || json;
      const rawList = Array.isArray(data)
        ? data
        : Array.isArray((data as { recommendations?: RawRecord[] })?.recommendations)
        ? (data as { recommendations: RawRecord[] }).recommendations
        : [];
      return rawList.map((item) => normalizeOpportunity(item));
    } catch {
      return [];
    }
  },

  async matchOpportunity(profileId: string, opportunityId: string): Promise<MatchAnalysisResult | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/recommendations/match`, {
        method: 'POST',
        headers: getAuthHeaders(true),
        body: JSON.stringify({ profile_id: profileId, opportunity_id: opportunityId }),
      });
      if (!res.ok) return null;
      const json: APIEnvelope<RawRecord> = await res.json();
      const d = json.data || (json as unknown as RawRecord);
      return {
        matchScore: typeof d.match_score === 'number' ? Math.round(d.match_score) : 85,
        skillsScore: typeof d.skills_score === 'number' ? Math.round(d.skills_score) : undefined,
        matchedSkills: (d.matched_skills as string[]) || (d.matchedSkills as string[]) || [],
        skillGaps: (d.skill_gaps as string[]) || (d.missing_skills as string[]) || (d.skillGaps as string[]) || [],
        explanation: cleanString((d.explanation as string) || (d.ai_explanation as string) || ''),
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
        headers: getAuthHeaders(true),
        body: JSON.stringify(params),
      });
      if (!res.ok) return null;
      const json: APIEnvelope<RawRecord> = await res.json();
      const d = json.data || (json as unknown as RawRecord);
      const rawStatus = ((d.status || d.verification_status || d.verificationStatus || 'VERIFIED') as string).toString().toLowerCase();
      const verificationStatus: VerificationStatus =
        rawStatus === 'verified' || rawStatus === 'needs_review' || rawStatus === 'suspicious'
          ? rawStatus
          : 'needs_review';

      // Parse signals object into clean string array
      let trustSignals: string[] = [];
      if (Array.isArray(d.trust_signals)) {
        trustSignals = d.trust_signals as string[];
      } else if (d.signals && typeof d.signals === 'object') {
        const labelMap: Record<string, string> = {
          company_information: 'Company information verified',
          official_domain: 'Official corporate domain validated',
          application_url: 'Direct secure application URL',
          complete_description: 'Comprehensive job description & roles',
          deadline_detected: 'Realistic recruitment timeline verified',
          no_suspicious_payment: 'No upfront fees or deposit detected',
          domain_consistency: 'Domain and corporate registry consistent',
        };
        trustSignals = Object.entries(d.signals as Record<string, boolean>)
          .filter(([, val]) => Boolean(val))
          .map(([key]) => labelMap[key] || key.replace(/_/g, ' '));
      }

      return {
        verificationStatus,
        confidenceScore: typeof d.confidence === 'number' ? d.confidence : (typeof d.confidence_score === 'number' ? d.confidence_score : 85),
        trustSignals,
        riskFactors: Array.isArray(d.risk_factors) ? (d.risk_factors as string[]).map((r) => cleanString(r)) : [],
        checks: (d.checks as VerificationAnalysisResult['checks']) || (d.verification_checks as VerificationAnalysisResult['checks']) || [],
        summary: cleanString((d.explanation as string) || (d.summary as string) || ''),
      };
    } catch {
      return null;
    }
  },

  // 6. Application Tracker Pipeline
  async getApplications(profileId: string = 'profile-alex-morgan'): Promise<RawRecord[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/applications/${encodeURIComponent(profileId)}`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) return [];
      const json: APIEnvelope<RawRecord[]> = await res.json();
      return Array.isArray(json.data) ? json.data : Array.isArray(json) ? (json as unknown as RawRecord[]) : [];
    } catch {
      return [];
    }
  },

  async recordApplication(
    profileId: string,
    opportunityId: string,
    status: string,
    notes?: string
  ): Promise<RawRecord | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/applications`, {
        method: 'POST',
        headers: getAuthHeaders(true),
        body: JSON.stringify({
          profile_id: profileId,
          opportunity_id: opportunityId,
          status: status.toUpperCase(),
          notes: notes || '',
        }),
      });
      if (!res.ok) return null;
      const json: APIEnvelope<RawRecord> = await res.json();
      return json.data || (json as unknown as RawRecord);
    } catch {
      return null;
    }
  },

  async updateApplication(applicationId: string, status: string, notes?: string): Promise<RawRecord | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/applications/${encodeURIComponent(applicationId)}`, {
        method: 'PATCH',
        headers: getAuthHeaders(true),
        body: JSON.stringify({
          status: status.toUpperCase(),
          notes,
        }),
      });
      if (!res.ok) return null;
      const json: APIEnvelope<RawRecord> = await res.json();
      return json.data || (json as unknown as RawRecord);
    } catch {
      return null;
    }
  },

  async deleteApplication(applicationId: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/applications/${encodeURIComponent(applicationId)}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // 7. Authentication Service
  async login(payload: {
    email: string;
    password: string;
  }): Promise<{ success: boolean; data?: AuthResponse; error?: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        return {
          success: false,
          error: json.error?.message || json.message || 'Invalid email or password.',
        };
      }
      return {
        success: true,
        data: {
          accessToken: json.data.access_token,
          tokenType: json.data.token_type,
          user: {
            id: json.data.user.id,
            email: json.data.user.email,
            fullName: json.data.user.full_name,
            role: json.data.user.role,
            avatarUrl: json.data.user.avatar_url,
            isActive: json.data.user.is_active,
            profileId: json.data.user.profile_id,
            createdAt: json.data.user.created_at,
          },
        },
      };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Network error during login.' };
    }
  },

  async register(payload: {
    email: string;
    password: string;
    full_name: string;
    role?: string;
    avatar_url?: string;
  }): Promise<{ success: boolean; data?: AuthResponse; error?: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        return {
          success: false,
          error: json.error?.message || json.message || 'Registration failed. Email may already be in use.',
        };
      }
      return {
        success: true,
        data: {
          accessToken: json.data.access_token,
          tokenType: json.data.token_type,
          user: {
            id: json.data.user.id,
            email: json.data.user.email,
            fullName: json.data.user.full_name,
            role: json.data.user.role,
            avatarUrl: json.data.user.avatar_url,
            isActive: json.data.user.is_active,
            profileId: json.data.user.profile_id,
            createdAt: json.data.user.created_at,
          },
        },
      };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Network error during registration.' };
    }
  },

  async getMe(token: string): Promise<AuthUser | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return null;
      const json = await res.json();
      if (!json.success || !json.data) return null;
      return {
        id: json.data.id,
        email: json.data.email,
        fullName: json.data.full_name,
        role: json.data.role,
        avatarUrl: json.data.avatar_url,
        isActive: json.data.is_active,
        profileId: json.data.profile_id,
        createdAt: json.data.created_at,
      };
    } catch {
      return null;
    }
  },

  async logout(token?: string | null): Promise<boolean> {
    try {
      if (!token) return true;
      const res = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.ok;
    } catch {
      return true;
    }
  },
};
