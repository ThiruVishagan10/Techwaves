import { Opportunity, UserProfile } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface APIEnvelope<T> {
  success: boolean;
  data: T;
  error: { code: string; message: string } | null;
}

export const api = {
  // 1. Health check
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch('http://localhost:8000/health');
      const data = await res.json();
      return data?.status === 'ok';
    } catch {
      return false;
    }
  },

  // 2. Opportunities
  async getOpportunities(params?: Record<string, string>): Promise<Opportunity[]> {
    try {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      const res = await fetch(`${API_BASE_URL}/opportunities${query}`);
      const json: APIEnvelope<Opportunity[]> = await res.json();
      return json.success ? json.data : [];
    } catch (e) {
      console.warn('API error, falling back to mock:', e);
      return [];
    }
  },

  async getOpportunity(id: string): Promise<Opportunity | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/opportunities/${id}`);
      const json: APIEnvelope<Opportunity> = await res.json();
      return json.success ? json.data : null;
    } catch {
      return null;
    }
  },

  // 3. Recommendations
  async getRecommendations(profileId: string = 'profile-alex-morgan'): Promise<Opportunity[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/recommendations/${profileId}`);
      const json: APIEnvelope<Opportunity[]> = await res.json();
      return json.success ? json.data : [];
    } catch (e) {
      console.warn('Recommendation API error:', e);
      return [];
    }
  },

  async matchOpportunity(profileId: string, opportunityId: string, forceRefresh: boolean = false): Promise<Opportunity | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/recommendations/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile_id: profileId, opportunity_id: opportunityId, force_refresh: forceRefresh }),
      });
      const json: APIEnvelope<Opportunity> = await res.json();
      return json.success ? json.data : null;
    } catch {
      return null;
    }
  },

  // 4. Verification
  async verifyOpportunity(opportunityId: string, forceRefresh: boolean = false): Promise<Opportunity | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/verification/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opportunity_id: opportunityId, force_refresh: forceRefresh }),
      });
      const json: APIEnvelope<Opportunity> = await res.json();
      return json.success ? json.data : null;
    } catch {
      return null;
    }
  },

  // 5. Applications Tracking
  async getApplications(profileId: string = 'profile-alex-morgan'): Promise<Opportunity[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/applications/${profileId}`);
      const json: APIEnvelope<Opportunity[]> = await res.json();
      return json.success ? json.data : [];
    } catch {
      return [];
    }
  },

  async recordApplication(profileId: string, opportunityId: string, status: string, notes?: string): Promise<Opportunity | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile_id: profileId, opportunity_id: opportunityId, status, notes }),
      });
      const json: APIEnvelope<Opportunity> = await res.json();
      return json.success ? json.data : null;
    } catch {
      return null;
    }
  },

  async updateApplication(applicationId: string, status: string, notes?: string): Promise<Opportunity | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/applications/${applicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      });
      const json: APIEnvelope<Opportunity> = await res.json();
      return json.success ? json.data : null;
    } catch {
      return null;
    }
  },

  // 6. Profiles & Resume Analysis
  async analyzeProfile(formData: FormData): Promise<UserProfile | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/profiles/analyze`, {
        method: 'POST',
        body: formData,
      });
      const json: APIEnvelope<UserProfile> = await res.json();
      return json.success ? json.data : null;
    } catch {
      return null;
    }
  },
};
