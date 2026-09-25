'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Bell,
  Sparkles,
  ChevronDown,
  Info,
  User,
  Settings,
  LogOut,
  ShieldCheck,
  GraduationCap,
  Briefcase,
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
    opportunities,
    currentUser,
    user,
    isAuthenticated,
    logout,
  } = useApp();

  const [isDemoDropdownOpen, setIsDemoDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const getBreadcrumb = () => {
    switch (activeView) {
      case 'dashboard':
        return 'Overview & Opportunity Intelligence';
      case 'discover':
        return 'Discover Opportunities';
      case 'opportunity-details':
        return selectedOpportunity
          ? `Opportunity Details / ${selectedOpportunity.company} — ${selectedOpportunity.title}`
          : 'Opportunity Details';
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
      case 'settings':
        return 'Account & Security Settings';
      case 'auth':
        return 'Authentication & Portal Access';
      default:
        return 'Overview';
    }
  };

  const notifications = useMemo(() => {
    const topMatch = opportunities.find((o) => o.matchScore >= 90);
    const flagged = opportunities.find((o) => o.verificationStatus === 'suspicious');
    const applied = opportunities.find((o) => o.applicationStatus && o.applicationStatus !== 'none');

    const list = [];
    if (topMatch) {
      list.push({
        id: 'notif-top',
        title: 'New High-Match Verified Role',
        desc: `${topMatch.company} · ${topMatch.title} (${topMatch.matchScore}% Match) verified on official portal.`,
        time: `${topMatch.postedDaysAgo}d ago`,
        type: 'success',
      });
    }
    if (applied) {
      list.push({
        id: 'notif-app',
        title: 'Tracked Application Stage',
        desc: `${applied.company} application currently in "${applied.applicationStatus?.toUpperCase()}" stage.`,
        time: 'Recently updated',
        type: 'info',
      });
    }
    if (flagged) {
      list.push({
        id: 'notif-flag',
        title: 'Security Flag by Trust Engine',
        desc: `${flagged.company} posting was detected with suspicious risk factors.`,
        time: 'Active flag',
        type: 'warning',
      });
    }
    return list;
  }, [opportunities]);

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
                <span className="text-[10px] text-blue-400 font-mono">{notifications.length} unread</span>
              </div>
              <div className="space-y-2">
                {notifications.map((notif: any) => (
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

        {/* User Account Dropdown / Sign In Button */}
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => {
                setIsUserMenuOpen(!isUserMenuOpen);
                setIsDemoDropdownOpen(false);
                setIsNotificationsOpen(false);
              }}
              className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
                {(currentUser?.fullName || user.name).slice(0, 2).toUpperCase()}
              </div>
              <span className="text-xs font-medium text-slate-200 hidden md:inline max-w-[110px] truncate">
                {currentUser?.fullName || user.name}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#0F172A] border border-slate-800 rounded-xl shadow-2xl p-2 z-50 text-xs animate-fadeIn">
                <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
                  <div className="font-semibold text-white truncate">
                    {currentUser?.fullName || user.name}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {currentUser?.email || user.email}
                  </div>
                  <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-mono">
                    <ShieldCheck className="w-3 h-3" />
                    <span className="capitalize">{currentUser?.role || 'Student'}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      navigateTo('profile');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-blue-400" />
                    <span>Career Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      navigateTo('settings');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    <span>Account & Security</span>
                  </button>

                  <div className="border-t border-slate-800 my-1" />

                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 transition-colors font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigateTo('auth')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
          >
            <User className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
};
