'use client';

import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sparkles,
  ChevronDown,
  Info,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const Header: React.FC = () => {
  const {
    activeView,
    navigateTo,
    triggerJudgeDemoFlow,
    searchQuery,
    setSearchQuery,
    selectedOpportunity,
    notificationMessage,
    backendStatus,
    checkBackendConnection,
  } = useApp();

  const [isDemoDropdownOpen, setIsDemoDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const getBreadcrumb = () => {
    switch (activeView) {
      case 'dashboard':
        return 'Overview & Opportunity Intelligence';
      case 'discover':
        return 'Discover Opportunities';
      case 'opportunity-details':
        return `Opportunity Details / ${selectedOpportunity.company} — ${selectedOpportunity.title}`;
      case 'verification':
        return 'Trust & Verification Center';
      case 'recommendations':
        return 'AI Recommendations';
      case 'applications':
        return 'My Applications Tracker';
      case 'profile':
        return 'AI Career Profile & Skill Taxonomy';
      case 'saved':
        return 'Saved Opportunities';
      default:
        return 'Overview';
    }
  };

  const sampleNotifications = [
    {
      id: 'notif-1',
      title: 'Upcoming Application Deadline',
      desc: 'Microsoft AI/ML Intern application cycle closes in 14 days.',
      time: '2 hours ago',
      type: 'info',
    },
    {
      id: 'notif-2',
      title: 'Verification Flag Detected',
      desc: 'NovaLabs AI internship application URL was flagged for third-party hosting.',
      time: '1 day ago',
      type: 'warning',
    },
    {
      id: 'notif-3',
      title: 'New High-Match Verified Role',
      desc: 'Atlassian Data Engineering Intern (89% Match) was verified on official Lever portal.',
      time: '2 days ago',
      type: 'success',
    },
  ];

  return (
    <header className="h-16 border-b border-slate-800/80 bg-[#0A0E1A]/90 backdrop-blur-md sticky top-0 z-20 px-6 flex items-center justify-between">
      {/* Breadcrumb / Title */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">PathBridge</span>
          <span>/</span>
          <span className="text-white font-medium truncate max-w-[280px] lg:max-w-md">
            {getBreadcrumb()}
          </span>
        </div>
      </div>

      {/* Global Toast / Notification Bar if triggered */}
      {notificationMessage && (
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs text-blue-300 animate-fadeIn">
          <Info className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
          <span className="truncate max-w-sm">{notificationMessage}</span>
        </div>
      )}

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Search trigger */}
        <div className="relative hidden sm:block w-48 lg:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search roles, skills..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activeView !== 'discover' && activeView !== 'recommendations') {
                navigateTo('discover');
              }
            }}
            className="w-full bg-slate-900/90 border border-slate-800 text-xs text-white pl-8 pr-3 py-1.5 rounded-lg focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 placeholder-slate-400 transition-all"
          />
        </div>

        {/* Live Backend Connection Status */}
        {backendStatus === 'connected' && (
          <button
            onClick={() => checkBackendConnection()}
            title="FastAPI Backend Live at http://localhost:8000 — Click to re-sync"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-[11px] font-medium text-emerald-400 transition-colors shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">Backend Live (8000)</span>
          </button>
        )}
        {backendStatus === 'checking' && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-[11px] font-medium text-blue-400">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            <span className="hidden sm:inline">Connecting API...</span>
          </div>
        )}
        {backendStatus === 'disconnected' && (
          <button
            onClick={() => checkBackendConnection()}
            title="Backend offline (http://localhost:8000). Click to retry connection"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-[11px] font-medium text-amber-400 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="hidden sm:inline">Demo Mode</span>
            <span className="text-[10px] underline ml-0.5">Connect API</span>
          </button>
        )}

        {/* Judge Demo Flows Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsDemoDropdownOpen(!isDemoDropdownOpen);
              setIsNotificationsOpen(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 text-xs font-medium text-blue-300 transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden md:inline">Judge Demo Flows</span>
            <span className="md:hidden">Demo</span>
            <ChevronDown className="w-3 h-3 text-blue-400" />
          </button>

          {isDemoDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[#0F172A] border border-slate-800 rounded-xl shadow-2xl p-2 z-50 text-xs">
              <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
                <div className="font-semibold text-white">Preset Judge Walkthroughs</div>
                <p className="text-[11px] text-slate-400">
                  Select a workflow to directly test the core differentiators:
                </p>
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => {
                    triggerJudgeDemoFlow('primary-msft');
                    setIsDemoDropdownOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-slate-800/80 transition-colors flex items-start gap-2.5 group"
                >
                  <div className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <div className="font-medium text-slate-200 group-hover:text-blue-400">
                      Primary: Microsoft 94% Match
                    </div>
                    <div className="text-[11px] text-slate-400 leading-tight">
                      94% Match → Why? → Skill Gap → Verified → Apply
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    triggerJudgeDemoFlow('scam-verification');
                    setIsDemoDropdownOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-slate-800/80 transition-colors flex items-start gap-2.5 group"
                >
                  <div className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <div className="font-medium text-slate-200 group-hover:text-emerald-400 flex items-center gap-1.5">
                      Trust Verification & Scam Demo
                    </div>
                    <div className="text-[11px] text-slate-400 leading-tight">
                      Compare Verified vs Review vs Suspicious fake $150/hr job
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    triggerJudgeDemoFlow('recommendation-explain');
                    setIsDemoDropdownOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-slate-800/80 transition-colors flex items-start gap-2.5 group"
                >
                  <div className="w-6 h-6 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <div className="font-medium text-slate-200 group-hover:text-purple-400">
                      Explainable AI Recommendations
                    </div>
                    <div className="text-[11px] text-slate-400 leading-tight">
                      Transparent non-black-box justification badges
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    triggerJudgeDemoFlow('kanban-tracker');
                    setIsDemoDropdownOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-slate-800/80 transition-colors flex items-start gap-2.5 group"
                >
                  <div className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <div className="font-medium text-slate-200 group-hover:text-amber-400">
                      Applications Kanban Board
                    </div>
                    <div className="text-[11px] text-slate-400 leading-tight">
                      Track pipeline: Saved → Applied → Interview → Offer
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsDemoDropdownOpen(false);
            }}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-blue-500 absolute top-1.5 right-1.5" />
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[#0F172A] border border-slate-800 rounded-xl shadow-2xl p-3 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                <span className="font-semibold text-white">Notifications & Alerts</span>
                <span className="text-[10px] text-blue-400 font-mono">3 unread</span>
              </div>
              <div className="space-y-2">
                {sampleNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-2 rounded bg-slate-900/60 border border-slate-800/60 hover:bg-slate-850"
                  >
                    <div className="flex items-center justify-between text-slate-300 font-medium mb-1">
                      <span>{notif.title}</span>
                      <span className="text-[10px] text-slate-400">{notif.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">{notif.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
