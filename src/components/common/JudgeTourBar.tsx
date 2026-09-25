'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ChevronUp,
  ChevronDown,
  X,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { api } from '@/services/api';

export const JudgeTourBar: React.FC = () => {
  const {
    activeView,
    navigateTo,
    triggerJudgeDemoFlow,
    backendStatus,
    checkBackendConnection,
  } = useApp();
  const [isOpen, setIsOpen] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed || activeView === 'landing') return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-md w-full px-2 sm:px-0">
      <div className="bg-[#0F172A]/95 backdrop-blur-md border border-blue-500/40 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">
        {/* Header Bar */}
        <div className="px-4 py-2.5 bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Judge Quick Flow Guide</span>
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">
              Round 1
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 hover:text-white transition-colors"
              title={isOpen ? 'Minimize' : 'Expand'}
            >
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 hover:text-white transition-colors"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expanded Content */}
        {isOpen && (
          <div className="p-4 space-y-3 text-xs">
            <p className="text-[11px] text-slate-300 leading-snug">
              Evaluate the end-to-end prototype using these pre-configured test scenarios:
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => triggerJudgeDemoFlow('primary-msft')}
                className="p-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-left transition-colors group"
              >
                <div className="font-bold text-white group-hover:text-blue-300 flex items-center gap-1">
                  <span>1. Flagship Flow</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Microsoft 94% Match → Skill Gap → Verification → Apply
                </div>
              </button>

              <button
                onClick={() => triggerJudgeDemoFlow('scam-verification')}
                className="p-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-left transition-colors group"
              >
                <div className="font-bold text-white group-hover:text-emerald-300 flex items-center gap-1">
                  <span>2. Trust Engine</span>
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Inspect Verified vs Review vs Fake $150/hr job scam
                </div>
              </button>

              <button
                onClick={() => triggerJudgeDemoFlow('recommendation-explain')}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-left transition-colors group"
              >
                <div className="font-semibold text-slate-200 group-hover:text-white">
                  3. Explainable AI
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Deconstruct why roles are recommended without black-boxes
                </div>
              </button>

              <button
                onClick={() => triggerJudgeDemoFlow('kanban-tracker')}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-left transition-colors group"
              >
                <div className="font-semibold text-slate-200 group-hover:text-white">
                  4. Kanban Tracker
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Pipeline: Saved → Applied → Interview → Offer
                </div>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/60">
              <div className="flex items-center gap-1.5">
                {backendStatus === 'connected' ? (
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                    <span className="truncate max-w-[150px]">{api.rootUrl}</span>
                  </span>
                ) : backendStatus === 'checking' ? (
                  <span className="flex items-center gap-1 text-blue-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping flex-shrink-0" />
                    Connecting API...
                  </span>
                ) : (
                  <button
                    onClick={() => checkBackendConnection()}
                    className="flex items-center gap-1 text-amber-400 hover:underline"
                    title={`Backend not responding on ${api.rootUrl}. Click to retry.`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    <span className="truncate max-w-[120px]">Offline ({api.rootUrl})</span>
                  </button>
                )}
              </div>
              <button
                onClick={() => navigateTo('landing')}
                className="text-blue-400 hover:underline"
              >
                View Landing Page →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
