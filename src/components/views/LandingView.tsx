'use client';

import React from 'react';
import {
  Compass,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Layers,
  ChevronRight,
  TrendingUp,
  Cpu,
  GraduationCap,
  Users,
  Search,
  FileCheck,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const LandingView: React.FC = () => {
  const { navigateTo, triggerJudgeDemoFlow } = useApp();

  return (
    <div className="min-h-screen bg-[#080C16] text-slate-100 flex flex-col justify-between selection:bg-blue-600/30">
      {/* Top Navbar */}
      <nav className="border-b border-slate-800/80 bg-[#080C16]/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
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
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs text-slate-400 font-medium">
            <a href="#three-pillars" className="hover:text-white transition-colors">
              Three Pillars
            </a>
            <a href="#core-questions" className="hover:text-white transition-colors">
              Product Philosophy
            </a>
            <a href="#verification-preview" className="hover:text-white transition-colors">
              Trust Engine
            </a>
            <a href="#future-ecosystem" className="hover:text-white transition-colors">
              Ecosystem
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => triggerJudgeDemoFlow('primary-msft')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-700 text-xs text-slate-300 font-medium transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Judge Flow Demo</span>
            </button>

            <button
              onClick={() => navigateTo('dashboard')}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-1.5"
            >
              <span>Enter Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-20 overflow-hidden border-b border-slate-800/60">
        {/* Subtle background ambient gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>PathBridge 2.0 · First-Round Hackathon Prototype</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Discover. <span className="text-blue-400">Verify.</span> Match.
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              AI-powered internship and job discovery built around your skills, goals, and trust.
            </p>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 max-w-xl leading-relaxed">
              <span className="text-blue-400 font-semibold">The central idea:</span>{' '}
              <em>Don&apos;t just find opportunities. Know which ones are trustworthy and which ones are actually right for you.</em>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigateTo('profile')}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-xl shadow-blue-600/20 transition-all flex items-center gap-2 group"
              >
                <span>Build My Career Profile</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateTo('discover')}
                className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-sm font-semibold transition-all flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-blue-400" />
                <span>Explore Opportunities</span>
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs text-slate-400 border-t border-slate-800/60">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero fake job board links</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Explainable skill affinity breakdown</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Built for college students</span>
              </div>
            </div>
          </div>

          {/* Right Product Visualization: Student Profile -> AI Analysis -> Verified Opportunities -> Personalized Matches */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#0F172A] border border-slate-800 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-slate-400 ml-2">
                    pipeline.architecture.pb
                  </span>
                </div>
                <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  LIVE PIPELINE
                </span>
              </div>

              {/* Step 1: Student Profile */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
                    01
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      Student Profile
                    </div>
                    <div className="text-[11px] text-slate-400">
                      B.Tech AI & Data Science · Skills & GitHub projects
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                  82% Complete
                </span>
              </div>

              {/* Arrow */}
              <div className="flex justify-center -my-2 text-slate-600">
                <div className="w-0.5 h-4 bg-gradient-to-b from-indigo-500 to-blue-500" />
              </div>

              {/* Step 2: AI Analysis */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-blue-500/30 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs">
                    02
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <span>AI Semantic Analysis</span>
                      <Sparkles className="w-3 h-3 text-blue-400" />
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Vector embeddings + Competency decomposition
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                  Deep Model
                </span>
              </div>

              {/* Arrow */}
              <div className="flex justify-center -my-2 text-slate-600">
                <div className="w-0.5 h-4 bg-gradient-to-b from-blue-500 to-emerald-500" />
              </div>

              {/* Step 3: Verified Opportunities */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/30 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                    03
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <span>Verified Opportunities</span>
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Domain validation · Scam elimination · Active checks
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  47 Verified
                </span>
              </div>

              {/* Arrow */}
              <div className="flex justify-center -my-2 text-slate-600">
                <div className="w-0.5 h-4 bg-gradient-to-b from-emerald-500 to-indigo-400" />
              </div>

              {/* Step 4: Personalized Matches */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border border-blue-500/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow">
                    04
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      Personalized Matches
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Explainable rationale + Identified skill gaps
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-white bg-blue-600 px-2.5 py-1 rounded shadow">
                  94% Match
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Philosophy: The 3 Core Questions */}
      <section id="core-questions" className="py-20 px-6 border-b border-slate-800/60 bg-[#0A0E1A]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Product Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Most platforms help students FIND jobs.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
              PathBridge helps students answer three fundamental questions that existing job boards ignore:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Question 1 */}
            <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
                  Question 01
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Can I find it?
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Aggregates opportunities across official enterprise ATS portals, university career networks, and verified channels into a single unified intelligence feed.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-semibold text-blue-400 flex items-center gap-1">
                <span>→ Discovery Engine</span>
              </div>
            </div>

            {/* Question 2 */}
            <div className="p-6 rounded-2xl bg-[#0F172A] border border-emerald-500/30 hover:border-emerald-500/50 transition-colors flex flex-col justify-between shadow-lg shadow-emerald-950/20">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                  Question 02 · Core Differentiator
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Can I trust it?
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Before applying, automated scanners evaluate domain registration, TLS integrity, active ATS endpoints, and detect fraudulent pay-to-work schemes.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <span>→ Verification Engine</span>
              </div>
            </div>

            {/* Question 3 */}
            <div className="p-6 rounded-2xl bg-[#0F172A] border border-indigo-500/30 hover:border-indigo-500/50 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
                  Question 03
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Is it right for me?
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Eliminates algorithmic black boxes with explainable match breakdowns, explicit skill synergy, and actionable roadmaps to bridge missing qualifications.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-semibold text-indigo-400 flex items-center gap-1">
                <span>→ AI Recommendation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Three Pillars Section */}
      <section id="three-pillars" className="py-20 px-6 border-b border-slate-800/60">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Architecture Pillars
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              The PathBridge 2.0 Trio
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Three synchronized systems working together for student career success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: Discover */}
            <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Discover</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Find relevant internships and jobs from multiple sources. Filter by work mode, location, duration, and minimum affinity scores without clutter.
              </p>
              <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Real-time multi-board normalization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Structured eligibility criteria extraction</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2: Verify */}
            <div className="p-6 rounded-2xl bg-[#0F172A] border border-emerald-500/30 space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Verify</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Identify trustworthy, active, and suspicious opportunities. Prevent students from wasting hours on ghost jobs or falling victim to Telegram deposit scams.
              </p>
              <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Official corporate domain validation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Automated fraud & fee detection</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3: Match */}
            <div className="p-6 rounded-2xl bg-[#0F172A] border border-indigo-500/30 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Match</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Get personalized recommendations based on your profile. See explicit percentage alignments for skills, experience, education, and career trajectories.
              </p>
              <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Transparent explainable AI breakdown</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Actionable role prep micro-roadmaps</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Verification Feature Preview Banner */}
      <section id="verification-preview" className="py-16 px-6 bg-gradient-to-b from-[#0A0E1A] to-[#080C16] border-b border-slate-800/60">
        <div className="max-w-6xl mx-auto rounded-2xl bg-gradient-to-r from-emerald-950/20 via-slate-900 to-blue-950/20 border border-emerald-500/30 p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Interactive Trust Sandbox
            </span>
            <h3 className="text-2xl font-bold text-white">
              Try the PathBridge Verification Engine
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Compare a legitimate Fortune 500 listing with a simulated high-risk advance-fee job scam. See how our heuristic verification safeguards students.
            </p>
          </div>
          <button
            onClick={() => navigateTo('verification')}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2 flex-shrink-0"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Open Verification Center</span>
          </button>
        </div>
      </section>

      {/* Future Ecosystem Section (Visionary Roadmap per spec) */}
      <section id="future-ecosystem" className="py-16 px-6 border-b border-slate-800/60 bg-[#0A0E1A]">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Long-Term Vision
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                The Expanded PathBridge Ecosystem
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Beyond opportunity intelligence: scaling the full student career lifecycle.
              </p>
            </div>
            <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 self-start sm:self-auto">
              Future Modules
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800/80 opacity-75 hover:opacity-100 transition-opacity">
              <Users className="w-5 h-5 text-indigo-400 mb-2" />
              <div className="text-xs font-semibold text-white">Alumni Mentorship</div>
              <p className="text-[11px] text-slate-400 mt-1">Direct connections with verified alumni at target companies.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800/80 opacity-75 hover:opacity-100 transition-opacity">
              <Cpu className="w-5 h-5 text-blue-400 mb-2" />
              <div className="text-xs font-semibold text-white">Interview Preparation</div>
              <p className="text-[11px] text-slate-400 mt-1">Role-specific mock interviews grounded in matched job descriptions.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800/80 opacity-75 hover:opacity-100 transition-opacity">
              <GraduationCap className="w-5 h-5 text-emerald-400 mb-2" />
              <div className="text-xs font-semibold text-white">Adaptive Learning</div>
              <p className="text-[11px] text-slate-400 mt-1">Bridging identified skill gaps with targeted mini-projects.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800/80 opacity-75 hover:opacity-100 transition-opacity">
              <TrendingUp className="w-5 h-5 text-amber-400 mb-2" />
              <div className="text-xs font-semibold text-white">Internal Referrals</div>
              <p className="text-[11px] text-slate-400 mt-1">Verified student vouchers requesting referral slots.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800/80 opacity-75 hover:opacity-100 transition-opacity">
              <Layers className="w-5 h-5 text-purple-400 mb-2" />
              <div className="text-xs font-semibold text-white">Career Plugins</div>
              <p className="text-[11px] text-slate-400 mt-1">ATS resume sync, calendar interview booking, and GitHub badges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-[#080C16] text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">PathBridge 2.0</span>
            <span>·</span>
            <span>AI Career Opportunity Intelligence</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>First-Round Hackathon Demonstration</span>
            <span>·</span>
            <button
              onClick={() => navigateTo('dashboard')}
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Launch Dashboard →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
