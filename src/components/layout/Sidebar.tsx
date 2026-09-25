'use client';

import React from 'react';
import {
  Compass,
  Sparkles,
  Briefcase,
  UserCheck,
  Bookmark,
  ShieldCheck,
  Settings,
  LayoutDashboard,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  ArrowUpRight,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ActiveView } from '@/types';

export const Sidebar: React.FC = () => {
  const {
    activeView,
    navigateTo,
    stats,
    user,
    triggerJudgeDemoFlow
  } = useApp();

  const navItems: {
    id: ActiveView;
    label: string;
    icon: React.ElementType;
    badge?: string | number;
    badgeColor?: string;
  }[] = [
    {
      id: 'dashboard',
      label: 'Overview',
      icon: LayoutDashboard,
    },
    {
      id: 'discover',
      label: 'Discover',
      icon: Compass,
      badge: stats.totalFound,
      badgeColor: 'bg-slate-800 text-slate-300',
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      icon: Sparkles,
      badge: `${stats.strongMatchesCount} Strong`,
      badgeColor: 'bg-blue-500/15 text-blue-400 border border-blue-500/20',
    },
    {
      id: 'applications',
      label: 'Applications',
      icon: Briefcase,
      badge: stats.applicationsCount,
      badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
    },
    {
      id: 'profile',
      label: 'Career Profile',
      icon: UserCheck,
      badge: `${user.profileStrength}%`,
      badgeColor: 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20',
    },
  ];

  const secondaryItems: {
    id: ActiveView;
    label: string;
    icon: React.ElementType;
    badge?: string | number;
    highlight?: boolean;
  }[] = [
    {
      id: 'saved',
      label: 'Saved',
      icon: Bookmark,
      badge: stats.savedCount,
    },
    {
      id: 'verification',
      label: 'Verification Center',
      icon: ShieldCheck,
      highlight: true,
    },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#0A0E1A] border-r border-slate-800/80 flex flex-col justify-between h-screen sticky top-0 select-none z-30">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-slate-800/60 flex items-center justify-between">
          <div
            onClick={() => navigateTo('landing')}
            className="cursor-pointer group flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20 border border-blue-400/30">
              <span className="text-base tracking-tighter">PB</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold tracking-wider text-white">
                  PATHBRIDGE
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Career Opportunity Intel</p>
            </div>
          </div>
        </div>

        {/* Primary Navigation */}
        <div className="px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-300">
            Platform
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-full ${
                      item.badgeColor || 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Divider & Secondary Nav */}
        <div className="px-3 pt-2 pb-4 space-y-1 border-t border-slate-800/60">
          <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-300">
            Trust & Utilities
          </div>
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                    : item.highlight
                    ? 'text-emerald-400/90 hover:text-emerald-300 hover:bg-emerald-950/20 border border-emerald-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive
                        ? 'text-blue-400'
                        : item.highlight
                        ? 'text-emerald-400'
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {item.badge}
                  </span>
                )}
                {item.highlight && !isActive && (
                  <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Core
                  </span>
                )}
              </button>
            );
          })}

          {/* Quick Demo preset button for Judges */}
          <div className="pt-3 px-1">
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-blue-500/20 text-xs text-slate-300">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-blue-400 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> Judge Demo Flow
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight mb-2">
                Evaluate Microsoft AI/ML Intern 94% Match & Verification breakdown.
              </p>
              <button
                onClick={() => triggerJudgeDemoFlow('primary-msft')}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] font-medium transition-colors shadow-sm"
              >
                <span>Launch Primary Flow</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom User Profile */}
      <div className="p-3 border-t border-slate-800/70 bg-[#080C16]">
        <div
          onClick={() => navigateTo('profile')}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-700 to-slate-500 border border-slate-600 flex items-center justify-center text-white text-xs font-semibold overflow-hidden">
                AM
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#080C16]" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                {user.name}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                Profile: <span className="text-blue-400 font-medium">{user.profileStrength}%</span> complete
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
        </div>

        {/* Progress indicator bar */}
        <div className="mt-2 px-2">
          <div className="w-full bg-slate-800/80 rounded-full h-1 overflow-hidden">
            <div
              className="bg-blue-500 h-1 rounded-full transition-all duration-500"
              style={{ width: `${user.profileStrength}%` }}
            />
          </div>
        </div>

        {/* Exit to Landing link */}
        <div className="mt-2 pt-2 border-t border-slate-800/40 flex items-center justify-between px-2 text-[11px]">
          <button
            onClick={() => navigateTo('landing')}
            className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Product Landing</span>
          </button>
          <span className="text-[10px] text-slate-600 font-mono">v2.0 Beta</span>
        </div>
      </div>
    </aside>
  );
};
