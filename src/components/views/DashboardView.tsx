'use client';

import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Briefcase,
  Compass,
  ArrowRight,
  CheckCircle2,
  ArrowUpRight,
  ShieldAlert,
  Flame,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { OpportunityCard } from '@/components/common/OpportunityCard';

export const DashboardView: React.FC = () => {
  const {
    user,
    stats,
    opportunities,
    navigateTo,
    triggerJudgeDemoFlow,
    triggerProfileAnalysis,
  } = useApp();

  // Top 3-4 recommended opportunities specifically highlighting Microsoft, Atlassian, NovaLabs
  const recommendedOpportunities = [
    opportunities.find((o) => o.id === 'opp-msft-aiml') || opportunities[0],
    opportunities.find((o) => o.id === 'opp-atlassian-de') || opportunities[1],
    opportunities.find((o) => o.id === 'opp-novalabs-ml') || opportunities[2],
    opportunities.find((o) => o.id === 'opp-adobe-cv') || opportunities[3],
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
              Good morning, {user.name.split(' ')[0]}
            </h1>
            <span className="text-xl">👋</span>
          </div>
          <p className="text-sm text-slate-400">
            Here&apos;s what&apos;s happening with your career opportunities today.
          </p>
        </div>

        {/* Quick Demo CTA for judges */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => triggerJudgeDemoFlow('primary-msft')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Primary Judging Flow</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Career Profile Completion Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#0F172A] to-indigo-950/30 border border-blue-500/30 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">
                Career Profile — {user.profileStrength}% complete
              </span>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                AI Match Active
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-xl">
              Add your recent cloud coursework or GitHub repo links to increase match precision for high-growth AI roles.
            </p>

            {/* Visual Progress bar */}
            <div className="w-full sm:w-80 bg-slate-800 rounded-full h-2 overflow-hidden mt-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-700"
                style={{ width: `${user.profileStrength}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => triggerProfileAnalysis()}
              className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Re-analyze with AI</span>
            </button>
            <button
              onClick={() => navigateTo('profile')}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors"
            >
              Complete Profile
            </button>
          </div>
        </div>
      </div>

      {/* High-Level Statistics Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div
          onClick={() => navigateTo('discover')}
          className="p-5 rounded-xl bg-[#0F172A] border border-slate-800/90 hover:border-slate-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">
              Opportunities Found
            </span>
            <Compass className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {stats.totalFound}
          </div>
          <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
            <span className="text-emerald-400 font-medium">+18 new</span>
            <span>across 14 sources</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div
          onClick={() => navigateTo('verification')}
          className="p-5 rounded-xl bg-[#0F172A] border border-emerald-500/30 hover:border-emerald-500/50 transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
              Verified Opportunities
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {stats.verifiedCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
            <span className="text-emerald-400 font-medium">100% domain check</span>
            <span>· 0 scams</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div
          onClick={() => navigateTo('recommendations')}
          className="p-5 rounded-xl bg-[#0F172A] border border-blue-500/30 hover:border-blue-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-blue-400">
              Strong Matches
            </span>
            <Sparkles className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {stats.strongMatchesCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
            <span className="text-blue-400 font-medium">≥ 85% match</span>
            <span>with your profile</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div
          onClick={() => navigateTo('applications')}
          className="p-5 rounded-xl bg-[#0F172A] border border-slate-800/90 hover:border-slate-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">
              Applications Tracked
            </span>
            <Briefcase className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {stats.applicationsCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
            <span className="text-amber-400 font-medium">1 interview</span>
            <span>· 1 offer stage</span>
          </div>
        </div>
      </div>

      {/* Recommended Opportunities Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Recommended Opportunities
            </h2>
            <p className="text-xs text-slate-400">
              AI-scored matches tailored to your Python, ML, and Data Engineering strengths.
            </p>
          </div>
          <button
            onClick={() => navigateTo('recommendations')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 group"
          >
            <span>View all 12 recommendations</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Cards Grid: Microsoft, Atlassian, NovaLabs, Adobe */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {recommendedOpportunities.map((opp, idx) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              featured={idx === 0}
            />
          ))}
        </div>
      </div>

      {/* Opportunity Intelligence Highlights / Scam Alert Demo Callout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Verification Engine Callout */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">
                Live Trust & Scam Intelligence
              </span>
            </div>
            <button
              onClick={() => navigateTo('verification')}
              className="text-[11px] font-semibold text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Explore Engine</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            PathBridge automatically inspects job board endpoints. In the last 24 hours, our automated heuristics flagged{' '}
            <span className="text-rose-400 font-semibold">2 suspicious postings</span> soliciting Telegram fees and flagged{' '}
            <span className="text-amber-400 font-semibold">1 third-party aggregator</span> for missing recruiter credentials.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-emerald-300">
                  Microsoft & Atlassian Verified
                </div>
                <div className="text-[11px] text-slate-400">
                  Direct authenticated ATS endpoints verified with valid enterprise TLS certificates.
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/20 text-xs flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-rose-300">
                  CryptoApex Fake Job Blocked
                </div>
                <div className="text-[11px] text-slate-400">
                  Detected upfront $75 deposit request. Blocked from student discovery feed.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Career Goal Tracking */}
        <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white">Your Target Roles</span>
            </div>
            <p className="text-xs text-slate-400">
              Your profile is currently optimized for these target career tracks:
            </p>

            <div className="space-y-2 mt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">AI / Machine Learning</span>
                <span className="text-emerald-400 font-mono font-medium">94% Fit</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full w-[94%]" />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-300">Data Engineering</span>
                <span className="text-blue-400 font-mono font-medium">89% Fit</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full w-[89%]" />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-300">Backend Systems</span>
                <span className="text-indigo-400 font-mono font-medium">87% Fit</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div className="bg-indigo-500 h-1.5 rounded-full w-[87%]" />
              </div>
            </div>
          </div>

          <button
            onClick={() => navigateTo('profile')}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 rounded-lg transition-colors"
          >
            Adjust Target Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
