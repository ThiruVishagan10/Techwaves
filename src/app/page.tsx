'use client';

import React from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { LandingView } from '@/components/views/LandingView';
import { DashboardView } from '@/components/views/DashboardView';
import { DiscoverView } from '@/components/views/DiscoverView';
import { OpportunityDetailsView } from '@/components/views/OpportunityDetailsView';
import { VerificationView } from '@/components/views/VerificationView';
import { RecommendationsView } from '@/components/views/RecommendationsView';
import { ApplicationsView } from '@/components/views/ApplicationsView';
import { ProfileView } from '@/components/views/ProfileView';
import { SavedView } from '@/components/views/SavedView';
import { ApplyModal } from '@/components/modals/ApplyModal';
import { SkillGapPrepModal } from '@/components/modals/SkillGapPrepModal';
import { AIAnalysisModal } from '@/components/modals/AIAnalysisModal';
import { JudgeTourBar } from '@/components/common/JudgeTourBar';

function MainAppContent() {
  const { activeView } = useApp();

  // If user is on landing page, display the full standalone landing screen
  if (activeView === 'landing') {
    return <LandingView />;
  }

  return (
    <div className="flex min-h-screen bg-[#080C16] text-slate-100">
      {/* Persistent Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 pb-16">
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'discover' && <DiscoverView />}
          {activeView === 'opportunity-details' && <OpportunityDetailsView />}
          {activeView === 'verification' && <VerificationView />}
          {activeView === 'recommendations' && <RecommendationsView />}
          {activeView === 'applications' && <ApplicationsView />}
          {activeView === 'profile' && <ProfileView />}
          {activeView === 'saved' && <SavedView />}
        </main>
      </div>

      {/* Global Interactive Modals */}
      <ApplyModal />
      <SkillGapPrepModal />
      <AIAnalysisModal />
      <JudgeTourBar />
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
