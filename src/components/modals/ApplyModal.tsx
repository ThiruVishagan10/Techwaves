'use client';

import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Briefcase,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const ApplyModal: React.FC = () => {
  const {
    isApplyModalOpen,
    closeApplyModal,
    applyTargetOpportunity,
    updateApplicationStatus,
    navigateTo,
  } = useApp();

  const [hasApplied, setHasApplied] = useState(false);

  if (!isApplyModalOpen || !applyTargetOpportunity) return null;

  const handleApplyRedirect = () => {
    // In prototype, mark as applied, provide instant positive feedback
    updateApplicationStatus(applyTargetOpportunity.id, 'applied');
    setHasApplied(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0F172A] border border-slate-700/80 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Official Application Route
              </h3>
              <p className="text-[11px] text-slate-400">
                Verified through PathBridge Trust Engine
              </p>
            </div>
          </div>
          <button
            onClick={closeApplyModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Target Role Overview */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-blue-400 mb-0.5">
                {applyTargetOpportunity.company}
              </div>
              <div className="text-base font-bold text-white">
                {applyTargetOpportunity.title}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {applyTargetOpportunity.location} · {applyTargetOpportunity.type}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                {applyTargetOpportunity.matchScore}% Match
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Deadline: {applyTargetOpportunity.deadline}
              </div>
            </div>
          </div>

          {/* Verified Security Guarantee */}
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Trust & Security Verification
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 space-y-1.5">
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Direct Corporate Endpoint Validated</span>
              </div>
              <p className="text-[11px] text-slate-400 pl-6 leading-relaxed">
                You are submitting directly to{' '}
                <span className="text-white font-mono">{applyTargetOpportunity.sourceUrl}</span>.
                No third-party data broker or unverified middleman detected.
              </p>
            </div>
          </div>

          {/* AI Tailored Application Advice */}
          <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/25 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-blue-300 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>PathBridge AI Resume Recommendation</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Based on the <strong>{applyTargetOpportunity.title}</strong> requirements, emphasize your{' '}
              <strong>Predictive Healthcare Classifier</strong> project and highlight{' '}
              <strong>{applyTargetOpportunity.matchedSkills.slice(0, 3).join(', ')}</strong> in your initial cover note.
            </p>
          </div>

          {/* Application Tracking State */}
          {hasApplied ? (
            <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-500/40 text-center space-y-2">
              <div className="inline-flex p-2 rounded-full bg-emerald-500/20 text-emerald-400 mb-1">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">Application Recorded!</h4>
              <p className="text-xs text-slate-300">
                This opportunity has been logged in your <strong>My Applications</strong> dashboard in the &quot;Applied&quot; stage.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => {
                    closeApplyModal();
                    navigateTo('applications');
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>View in Applications Tracker</span>
                </button>
                <button
                  onClick={closeApplyModal}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-2 space-y-3">
              <a
                href={applyTargetOpportunity.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleApplyRedirect}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
              >
                <span>Continue to Official Application Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <p className="text-[11px] text-center text-slate-400">
                Clicking will open the official corporate careers page and track this application in your PathBridge dashboard.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
