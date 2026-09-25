'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, Cpu, Database, Network } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const AIAnalysisModal: React.FC = () => {
  const { isAnalyzingProfile } = useApp();
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!isAnalyzingProfile) return;
    
    const t0 = setTimeout(() => setStep(1), 0);
    const t1 = setTimeout(() => setStep(2), 600);
    const t2 = setTimeout(() => setStep(3), 1300);
    const t3 = setTimeout(() => setStep(4), 1900);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isAnalyzingProfile]);

  if (!isAnalyzingProfile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0F172A] border border-blue-500/40 rounded-2xl w-full max-w-md shadow-2xl p-6 text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto relative animate-pulse">
          <Sparkles className="w-8 h-8" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500 animate-ping" />
        </div>

        <div>
          <h3 className="text-base font-bold text-white">
            PathBridge AI Career Engine
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Re-analyzing your profile competencies & market match vectors
          </p>
        </div>

        {/* Steps simulation */}
        <div className="space-y-3 text-left p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
          <div
            className={`flex items-center gap-3 transition-opacity ${
              step >= 1 ? 'opacity-100' : 'opacity-40'
            }`}
          >
            {step > 1 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : (
              <Database className="w-4 h-4 text-blue-400 flex-shrink-0 animate-spin" />
            )}
            <span className="text-slate-300">
              Extracting projects, skills & transcript data
            </span>
          </div>

          <div
            className={`flex items-center gap-3 transition-opacity ${
              step >= 2 ? 'opacity-100' : 'opacity-40'
            }`}
          >
            {step > 2 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : step === 2 ? (
              <Cpu className="w-4 h-4 text-blue-400 flex-shrink-0 animate-spin" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-slate-700 flex-shrink-0" />
            )}
            <span className="text-slate-300">
              Embedding technical portfolio into semantic vector space
            </span>
          </div>

          <div
            className={`flex items-center gap-3 transition-opacity ${
              step >= 3 ? 'opacity-100' : 'opacity-40'
            }`}
          >
            {step > 3 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : step === 3 ? (
              <Network className="w-4 h-4 text-blue-400 flex-shrink-0 animate-spin" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-slate-700 flex-shrink-0" />
            )}
            <span className="text-slate-300">
              Cross-matching against 127 verified opportunity skill matrices
            </span>
          </div>

          <div
            className={`flex items-center gap-3 transition-opacity ${
              step >= 4 ? 'opacity-100' : 'opacity-40'
            }`}
          >
            {step >= 4 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-slate-700 flex-shrink-0" />
            )}
            <span className="text-slate-300 font-medium">
              Updating recommendation ranks & profile strength (+13%)
            </span>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 font-mono">
          Model: PathBridge-Match-v2.4 · Latency: 180ms
        </div>
      </div>
    </div>
  );
};
