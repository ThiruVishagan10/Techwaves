'use client';

import React from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Bookmark,
  BookOpen,
  Check,
  ShieldAlert,
  Info,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const OpportunityDetailsView: React.FC = () => {
  const {
    selectedOpportunity: opp,
    navigateTo,
    toggleSave,
    openApplyModal,
    openPrepModal,
  } = useApp();

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Back button and quick navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('discover')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Opportunities</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleSave(opp.id)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 ${
              opp.isSaved
                ? 'bg-blue-600/20 text-blue-400 border-blue-500/40'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" fill={opp.isSaved ? 'currentColor' : 'none'} />
            <span>{opp.isSaved ? 'Saved to Applications' : 'Save Opportunity'}</span>
          </button>
        </div>
      </div>

      {/* Main Hero Header Card */}
      <div className="p-6 lg:p-8 rounded-2xl bg-[#0F172A] border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            {/* Logo Badge */}
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${opp.companyLogoColor} flex items-center justify-center text-white font-extrabold text-xl shadow-lg border border-white/15 flex-shrink-0`}
            >
              {opp.companyInitial}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-base font-bold text-slate-300">
                  {opp.company}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400">{opp.type}</span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400 font-mono">
                  Source: {opp.source}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {opp.title}
              </h1>

              {/* Status Pills */}
              <div className="flex items-center gap-2.5 pt-1 flex-wrap">
                {/* Match Score */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{opp.matchScore}% Match</span>
                </div>

                {/* Verification Badge */}
                {opp.verificationStatus === 'verified' && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-950">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>✓ Verified Opportunity</span>
                  </div>
                )}

                {opp.verificationStatus === 'needs_review' && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Needs Review</span>
                  </div>
                )}

                {opp.verificationStatus === 'suspicious' && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Suspicious / Flagged</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Apply Button */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
            <button
              onClick={() => openApplyModal(opp)}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Apply on Official Website</span>
              <ExternalLink className="w-4 h-4" />
            </button>
            <div className="text-[11px] text-center text-slate-400">
              Verified corporate endpoint
            </div>
          </div>
        </div>

        {/* Metadata Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-0.5">Location</span>
            <div className="font-semibold text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>{opp.location}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-0.5">Duration</span>
            <div className="font-semibold text-white flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{opp.duration}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-0.5">Stipend / Comp</span>
            <div className="font-semibold text-white flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>{opp.stipend}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-0.5">Application Deadline</span>
            <div className="font-semibold text-white flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{opp.deadline}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Narrative Section: 94% Match -> Why? -> Verified -> Why? -> Apply */}
      <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/25 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
            PB
          </div>
          <div>
            <span className="font-bold text-white">The PathBridge Story: </span>
            <span className="text-slate-300">
              <strong className="text-blue-400">{opp.matchScore}% Match</strong> → Why? (Deconstructed below) →{' '}
              <strong className="text-emerald-400">Verified</strong> → Why? (Security checks below) →{' '}
              <strong className="text-white">Apply</strong>
            </span>
          </div>
        </div>
        <span className="text-[11px] font-mono text-blue-400 hidden sm:inline">
          Demo Flow Anchor
        </span>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Match Breakdown, Skill Match, Role Details (8 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Why this matches you */}
          <section className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <h2 className="text-base font-bold text-white">
                  Why this matches you
                </h2>
              </div>
              <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
                Overall: {opp.matchScore}%
              </span>
            </div>

            {/* Visual Ring / Progress Component with Sub-Breakdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Circular Progress Ring */}
              <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  {/* SVG Ring */}
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="text-slate-800 stroke-current"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="text-blue-500 stroke-current"
                      strokeWidth="10"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * opp.matchScore) / 100}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-black text-white tracking-tight">
                      {opp.matchScore}%
                    </span>
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                      Match Fit
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mt-2 text-center">
                  Computed against Alex Morgan&apos;s B.Tech AI & Data Science profile
                </div>
              </div>

              {/* Match Dimension Progress Bars */}
              <div className="sm:col-span-7 space-y-3">
                {/* Dimension 1: Skills Match */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Skills Match</span>
                    <span className="font-mono font-bold text-white">
                      {opp.matchBreakdown.skillsMatch}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${opp.matchBreakdown.skillsMatch}%` }}
                    />
                  </div>
                </div>

                {/* Dimension 2: Experience Match */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Experience Match</span>
                    <span className="font-mono font-bold text-white">
                      {opp.matchBreakdown.experienceMatch}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${opp.matchBreakdown.experienceMatch}%` }}
                    />
                  </div>
                </div>

                {/* Dimension 3: Education Match */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Education Match</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {opp.matchBreakdown.educationMatch}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${opp.matchBreakdown.educationMatch}%` }}
                    />
                  </div>
                </div>

                {/* Dimension 4: Preference Match */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Preference Match</span>
                    <span className="font-mono font-bold text-white">
                      {opp.matchBreakdown.preferenceMatch}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${opp.matchBreakdown.preferenceMatch}%` }}
                    />
                  </div>
                </div>

                {/* Dimension 5: Career Goal Alignment */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Career Goal Alignment</span>
                    <span className="font-mono font-bold text-white">
                      {opp.matchBreakdown.careerGoalAlignment}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${opp.matchBreakdown.careerGoalAlignment}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Explanation Box */}
            <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-300">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>AI Explanation</span>
              </div>
              <blockquote className="text-xs text-slate-200 leading-relaxed italic border-l-2 border-blue-500 pl-3">
                &ldquo;{opp.aiExplanation}&rdquo;
              </blockquote>
            </div>
          </section>

          {/* 2. Your Skill Match & Gap Analysis */}
          <section className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white">
                Your Skill Match
              </h2>
              <span className="text-xs text-slate-400">
                {opp.matchedSkills.length} of {opp.skills.length} skills verified
              </span>
            </div>

            <div className="space-y-4">
              {/* Matched skills */}
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Matched Skills
                </span>
                <div className="flex flex-wrap gap-2">
                  {opp.matchedSkills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/30 text-emerald-300 border border-emerald-500/30 text-xs font-mono"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing skills / Skill Gap */}
              {opp.missingSkills.length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 block mb-2">
                    Skill Gap Identified
                  </span>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {opp.missingSkills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/30 text-amber-300 border border-amber-500/30 text-xs font-mono"
                      >
                        <span className="text-amber-400 font-bold">△</span>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skill Gap Highlight Box */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span className="text-amber-400">Skill gap:</span>{' '}
                        <span>{opp.skillGapNotes || `${opp.missingSkills.join(', ')} fundamentals`}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Bridging this topic will raise your competitiveness for technical interview rounds.
                      </p>
                    </div>

                    <button
                      onClick={() => openPrepModal(opp)}
                      className="px-4 py-2 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 flex-shrink-0"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                      <span>Prepare for this role</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 3. Job Description & Responsibilities */}
          <section className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white mb-2">About the Role</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {opp.description}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Core Responsibilities
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {opp.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-blue-400 font-bold mt-0.5">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Requirements & Qualifications
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {opp.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Perks & Benefits
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {opp.benefits.map((ben, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-indigo-400 font-bold mt-0.5">✓</span>
                    <span>{ben}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Right Column: Trust & Verification Panel (4 Cols - Prominent & Visually Distinct) */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0e221c] via-[#0F172A] to-[#0F172A] border-2 border-emerald-500/40 shadow-2xl space-y-6">
            {/* Verification Header */}
            <div className="flex items-center justify-between pb-4 border-b border-emerald-500/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold tracking-wider text-emerald-400">
                    ✓ VERIFIED
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Trust & Safety Intelligence
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] uppercase font-semibold text-slate-400">
                  Confidence
                </div>
                <div className="text-xs font-bold font-mono text-emerald-400">
                  {opp.verificationConfidence}
                </div>
              </div>
            </div>

            {/* Verification Checks List */}
            <div className="space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Verification Breakdown
              </div>

              {opp.verificationChecks.map((chk) => (
                <div
                  key={chk.id}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-medium">
                    <div className="flex items-center gap-2">
                      {chk.status === 'pass' && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      )}
                      {chk.status === 'warning' && (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      )}
                      {chk.status === 'fail' && (
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                      )}
                      <span className="text-slate-200">{chk.label}</span>
                    </div>
                    <span className="text-emerald-400 font-bold">✓</span>
                  </div>
                  <p className="text-[11px] text-slate-400 pl-5 leading-normal">
                    {chk.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Prototype Disclaimer Label (Per Prompt: Do not imply real-world verification) */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Prototype Notice:</strong> Verification engine demonstration using simulated corporate registry and ATS heuristics.
              </span>
            </div>

            {/* Action CTA */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => openApplyModal(opp)}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
              >
                <span>Apply on Official Website</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('verification')}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700/80 text-xs font-medium text-slate-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Compare in Verification Center</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
