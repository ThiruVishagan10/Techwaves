'use client';

import React from 'react';
import {
  Sparkles,
  Briefcase,
  Code2,
  FolderGit2,
  CheckCircle2,
  ArrowRight,
  Cpu,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const ProfileView: React.FC = () => {
  const { user, triggerProfileAnalysis, isAnalyzingProfile, navigateTo } = useApp();

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Career Identity Vector</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Your Career Profile
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            This profile is continuously encoded by our matching models to evaluate opportunity fit and bridge skill gaps.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => triggerProfileAnalysis()}
            disabled={isAnalyzingProfile}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2 disabled:opacity-60"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isAnalyzingProfile ? 'Analyzing...' : 'Re-analyze with AI'}</span>
          </button>
        </div>
      </div>

      {/* Profile Overview Card with Strength Meter */}
      <div className="p-6 lg:p-8 rounded-2xl bg-[#0F172A] border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-500 border border-slate-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow">
              AM
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Verified Student Identity
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">{user.degree}</p>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-2 flex-wrap">
                <span>{user.university}</span>
                <span>·</span>
                <span>{user.batch}</span>
                <span>·</span>
                <span className="text-emerald-400 font-mono font-medium">GPA: {user.gpa}</span>
              </div>
            </div>
          </div>

          {/* Profile Strength Ring */}
          <div className="flex items-center gap-5 p-4 rounded-xl bg-slate-900 border border-slate-800 self-start lg:self-center">
            <div className="relative w-16 h-16 flex items-center justify-center">
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
                  strokeDashoffset={251.2 - (251.2 * user.profileStrength) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <span className="absolute text-sm font-bold font-mono text-white">
                {user.profileStrength}%
              </span>
            </div>

            <div>
              <div className="text-xs font-bold text-white">Profile Strength</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {user.profileStrength >= 90 ? 'All optimal vector matches active' : 'Complete 1 item to unlock 95%'}
              </div>
              <div className="text-[10px] text-blue-400 font-mono mt-1">
                Vector Precision: High
              </div>
            </div>
          </div>
        </div>

        {/* Foundation Notification Box */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>
              Your profile is the <strong>mathematical foundation</strong> used by the PathBridge recommendation and gap analysis engine.
            </span>
          </div>
          <button
            onClick={() => navigateTo('recommendations')}
            className="text-[11px] font-semibold text-blue-400 hover:underline flex items-center gap-1 flex-shrink-0"
          >
            <span>View Matches</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Education, Skills, Projects, Experience (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* 1. Skills Taxonomy */}
          <section className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-white">Technical Skills Matrix</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Extracted from GitHub & Lab Repos
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-400 block mb-2">
                  Core AI, Machine Learning & Algorithms
                </span>
                <div className="flex flex-wrap gap-2">
                  {user.skills.core.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-blue-950/30 text-blue-300 border border-blue-500/30 text-xs font-mono font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Backend, Systems & APIs
                </span>
                <div className="flex flex-wrap gap-2">
                  {user.skills.backend.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 text-xs font-mono font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Cloud, Data Engineering & Infrastructure
                </span>
                <div className="flex flex-wrap gap-2">
                  {user.skills.cloudAndTools.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 text-xs font-mono font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 2. Key Projects */}
          <section className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Highlighted Projects</h3>
              </div>
              <span className="text-[11px] text-slate-400">3 verified repositories</span>
            </div>

            <div className="space-y-4">
              {user.projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-white">{proj.title}</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800/80 text-[11px] text-emerald-400 font-mono">
                    Impact: {proj.impact}
                  </div>
                  <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                    {proj.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Experience */}
          <section className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-white">Research & Fellowships</h3>
              </div>
            </div>

            <div className="space-y-4">
              {user.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">{exp.role}</h4>
                      <div className="text-[11px] text-slate-400">{exp.organization}</div>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Preferences, Career Interests & Target Goals (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Career Interests */}
          <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Career Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.careerInterests.map((interest) => (
                <span
                  key={interest}
                  className="text-xs px-2.5 py-1 rounded-lg bg-blue-950/30 text-blue-300 border border-blue-500/30 font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4 text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Search Preferences
            </h3>

            <div className="space-y-3">
              <div>
                <span className="text-[11px] text-slate-400 block mb-1">
                  Target Roles
                </span>
                <div className="font-medium text-white space-y-1">
                  {user.preferences.targetRoles.map((r) => (
                    <div key={r} className="text-slate-300">
                      • {r}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block mb-1">Work Mode</span>
                <div className="font-medium text-white">Remote, Hybrid, On-site</div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block mb-1">
                  Preferred Locations
                </span>
                <div className="font-medium text-white">
                  Hyderabad, Bengaluru, Remote
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block mb-1">
                  Expected Compensation
                </span>
                <div className="font-medium text-emerald-400 font-mono">
                  {user.preferences.targetCompensation}
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps to Reach 100% */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-blue-950/20 to-[#0F172A] border border-blue-500/30 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Reach 100% Profile Completeness</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Boost your match score and unlock priority verified recruiter introductions:
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Transcript GPA verified</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>GitHub portfolio connected</span>
              </div>
              <div className="flex items-center gap-2 text-blue-300">
                <span className="w-3.5 h-3.5 rounded-full border border-blue-400 flex-shrink-0 text-[9px] flex items-center justify-center font-bold">
                  +
                </span>
                <span>Add Azure or Cloud Certification (+13%)</span>
              </div>
            </div>

            <button
              onClick={() => triggerProfileAnalysis()}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors mt-2"
            >
              Simulate AI Re-analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
