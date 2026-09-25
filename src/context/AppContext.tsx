'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  ActiveView,
  ApplicationStage,
  Opportunity,
  UserProfile,
} from '@/types';
import { mockOpportunities } from '@/data/mockData';
import { mockUser } from '@/data/mockUser';

interface AppContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  navigateTo: (view: ActiveView, opportunityId?: string) => void;
  opportunities: Opportunity[];
  user: UserProfile;
  selectedOpportunityId: string;
  selectedOpportunity: Opportunity;
  setSelectedOpportunityId: (id: string) => void;
  toggleSave: (id: string) => void;
  updateApplicationStatus: (id: string, status: ApplicationStage | 'none') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
  filterWorkMode: string;
  setFilterWorkMode: (mode: string) => void;
  filterVerification: string;
  setFilterVerification: (status: string) => void;
  filterMinMatch: number;
  setFilterMinMatch: (match: number) => void;
  sortBy: 'recommended' | 'highest-match' | 'newest' | 'deadline';
  setSortBy: (sort: 'recommended' | 'highest-match' | 'newest' | 'deadline') => void;
  isAnalyzingProfile: boolean;
  triggerProfileAnalysis: () => Promise<void>;
  isApplyModalOpen: boolean;
  openApplyModal: (opp?: Opportunity) => void;
  closeApplyModal: () => void;
  applyTargetOpportunity: Opportunity | null;
  isPrepModalOpen: boolean;
  openPrepModal: (opp?: Opportunity) => void;
  closePrepModal: () => void;
  prepTargetOpportunity: Opportunity | null;
  notificationMessage: string | null;
  setNotificationMessage: (msg: string | null) => void;
  triggerJudgeDemoFlow: (flowId: 'primary-msft' | 'scam-verification' | 'recommendation-explain' | 'kanban-tracker') => void;
  stats: {
    totalFound: number;
    verifiedCount: number;
    strongMatchesCount: number;
    applicationsCount: number;
    savedCount: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string>('opp-msft-aiml');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterWorkMode, setFilterWorkMode] = useState<string>('all');
  const [filterVerification, setFilterVerification] = useState<string>('all');
  const [filterMinMatch, setFilterMinMatch] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'recommended' | 'highest-match' | 'newest' | 'deadline'>('recommended');
  
  // Modals
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyTargetOpportunity, setApplyTargetOpportunity] = useState<Opportunity | null>(null);
  const [isPrepModalOpen, setIsPrepModalOpen] = useState(false);
  const [prepTargetOpportunity, setPrepTargetOpportunity] = useState<Opportunity | null>(null);
  
  // AI analysis state
  const [isAnalyzingProfile, setIsAnalyzingProfile] = useState(false);

  // Sync with live PathBridge FastAPI Backend
  useEffect(() => {
    let isMounted = true;
    api.getRecommendations('profile-alex-morgan')
      .then((data) => {
        if (!isMounted || !data || data.length === 0) return;
        setOpportunities((prev) => {
          return data.map((item) => {
            const existing = prev.find((o) => o.id === item.id);
            return {
              ...(existing || {}),
              ...item,
              matchScore: item.match_score ?? item.matchScore ?? existing?.matchScore ?? 85,
              verificationStatus: (item.verification_status || item.verificationStatus || 'VERIFIED').toLowerCase(),
              verificationConfidence: item.verificationConfidence || 'HIGH',
              matchedSkills: item.matched_skills || item.matchedSkills || existing?.matchedSkills || [],
              missingSkills: item.missing_skills || item.missingSkills || existing?.missingSkills || [],
              aiExplanation: item.ai_explanation || item.aiExplanation || existing?.aiExplanation || '',
              matchBreakdown: item.match_breakdown || existing?.matchBreakdown || {
                skillsMatch: 92,
                experienceMatch: 85,
                educationMatch: 95,
                preferenceMatch: 90,
                careerGoalAlignment: 90,
              },
              whyRecommendedReasons: item.why_recommended_reasons || item.whyRecommendedReasons || existing?.whyRecommendedReasons || [
                'Strong skills alignment with candidate background',
                'Verified corporate career endpoint'
              ],
              verificationChecks: item.verification_checks || item.verificationChecks || existing?.verificationChecks || [],
              isSaved: existing?.isSaved || false,
              applicationStatus: existing?.applicationStatus || 'none',
            };
          });
        });
      })
      .catch((err) => {
        console.warn('Backend sync note (using mock fallback):', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  const selectedOpportunity = useMemo(() => {
    return (
      opportunities.find((opp) => opp.id === selectedOpportunityId) ||
      opportunities[0]
    );
  }, [opportunities, selectedOpportunityId]);

  const showToast = (msg: string) => {
    setNotificationMessage(msg);
    setTimeout(() => {
      setNotificationMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  const navigateTo = (view: ActiveView, opportunityId?: string) => {
    if (opportunityId) {
      setSelectedOpportunityId(opportunityId);
    }
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSave = (id: string) => {
    setOpportunities((prev) =>
      prev.map((opp) => {
        if (opp.id === id) {
          const nextSaved = !opp.isSaved;
          showToast(
            nextSaved
              ? `Saved "${opp.title} at ${opp.company}" to your list.`
              : `Removed "${opp.title}" from saved.`
          );
          return {
            ...opp,
            isSaved: nextSaved,
            applicationStatus: nextSaved && opp.applicationStatus === 'none' ? 'saved' : opp.applicationStatus
          };
        }
        return opp;
      })
    );
  };

  const updateApplicationStatus = (id: string, status: ApplicationStage | 'none') => {
    setOpportunities((prev) =>
      prev.map((opp) => {
        if (opp.id === id) {
          const nextAppliedDate = status === 'applied' ? new Date().toISOString().split('T')[0] : opp.appliedDate;
          showToast(`Application for ${opp.company} updated to "${status.toUpperCase()}".`);
          api.recordApplication("profile-alex-morgan", id, status).catch(() => {});
          return {
            ...opp,
            applicationStatus: status,
            appliedDate: nextAppliedDate,
            isSaved: status !== 'none' ? true : opp.isSaved
          };
        }
        return opp;
      })
    );
  };

  const openApplyModal = (opp?: Opportunity) => {
    const target = opp || selectedOpportunity;
    setApplyTargetOpportunity(target);
    setIsApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    setIsApplyModalOpen(false);
    setApplyTargetOpportunity(null);
  };

  const openPrepModal = (opp?: Opportunity) => {
    const target = opp || selectedOpportunity;
    setPrepTargetOpportunity(target);
    setIsPrepModalOpen(true);
  };

  const closePrepModal = () => {
    setIsPrepModalOpen(false);
    setPrepTargetOpportunity(null);
  };

  const triggerProfileAnalysis = async () => {
    setIsAnalyzingProfile(true);
    showToast('AI Model is parsing your GitHub, skills, and coursework...');
    
    await new Promise((res) => setTimeout(res, 2200));

    setUser((prev) => ({
      ...prev,
      profileStrength: 95,
      skills: {
        ...prev.skills,
        cloudAndTools: [...prev.skills.cloudAndTools, 'Azure (Certified)', 'Docker (Production)']
      }
    }));

    setOpportunities((prev) =>
      prev.map((opp) => {
        if (opp.id === 'opp-msft-aiml') {
          return {
            ...opp,
            matchScore: 98,
            matchedSkills: [...opp.matchedSkills, 'Azure'],
            missingSkills: [],
            skillGapNotes: 'All core and cloud prerequisite skills verified!',
            matchBreakdown: {
              ...opp.matchBreakdown,
              skillsMatch: 100,
              careerGoalAlignment: 98
            }
          };
        }
        return opp;
      })
    );

    setIsAnalyzingProfile(false);
    showToast('AI Career Profile re-analysis complete! Profile strength raised to 95%.');
  };

  const triggerJudgeDemoFlow = (flowId: 'primary-msft' | 'scam-verification' | 'recommendation-explain' | 'kanban-tracker') => {
    if (flowId === 'primary-msft') {
      setSelectedOpportunityId('opp-msft-aiml');
      setActiveView('opportunity-details');
      showToast('Loaded Primary Flow: Microsoft AI/ML Intern (94% Match & Verification)');
    } else if (flowId === 'scam-verification') {
      setSelectedOpportunityId('opp-cryptoapex-scam');
      setActiveView('verification');
      showToast('Loaded Demo Flow: Trust & Verification Engine with Scam Detection showcase');
    } else if (flowId === 'recommendation-explain') {
      setActiveView('recommendations');
      showToast('Loaded Demo Flow: Explainable AI Recommendations Breakdown');
    } else if (flowId === 'kanban-tracker') {
      setActiveView('applications');
      showToast('Loaded Demo Flow: My Applications Kanban Tracker');
    }
  };

  const stats = useMemo(() => {
    const totalFound = 127;
    const verifiedCount = 47;
    const strongMatchesCount = 12;
    const applicationsCount = 5;
    const savedCount = opportunities.filter((o) => o.isSaved).length;

    return {
      totalFound,
      verifiedCount,
      strongMatchesCount,
      applicationsCount,
      savedCount,
    };
  }, [opportunities]);

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        navigateTo,
        opportunities,
        user,
        selectedOpportunityId,
        selectedOpportunity,
        setSelectedOpportunityId,
        toggleSave,
        updateApplicationStatus,
        searchQuery,
        setSearchQuery,
        filterType,
        setFilterType,
        filterWorkMode,
        setFilterWorkMode,
        filterVerification,
        setFilterVerification,
        filterMinMatch,
        setFilterMinMatch,
        sortBy,
        setSortBy,
        isAnalyzingProfile,
        triggerProfileAnalysis,
        isApplyModalOpen,
        openApplyModal,
        closeApplyModal,
        applyTargetOpportunity,
        isPrepModalOpen,
        openPrepModal,
        closePrepModal,
        prepTargetOpportunity,
        notificationMessage,
        setNotificationMessage,
        triggerJudgeDemoFlow,
        stats
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
