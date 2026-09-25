'use client';

import React, { useState } from 'react';
import {
  X,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Code2,
  Lightbulb,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const SkillGapPrepModal: React.FC = () => {
  const {
    isPrepModalOpen,
    closePrepModal,
    prepTargetOpportunity,
    selectedOpportunity,
    user,
  } = useApp();

  const opp = prepTargetOpportunity || selectedOpportunity;
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  if (!isPrepModalOpen || !opp) return null;

  const toggleStep = (stepId: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
    );
  };

  const prepModules = [
    {
      id: 1,
      title: 'Azure Cloud Fundamentals for AI Engineers',
      duration: '45 mins',
      type: 'Guided Interactive Lab',
      summary:
        'Understand Azure Resource Groups, Blob Storage container configuration for training datasets, and IAM service principals.',
      keyConcepts: ['Azure Blob Storage', 'Shared Access Signatures (SAS)', 'Azure CLI'],
    },
    {
      id: 2,
      title: 'Azure Machine Learning Studio & Workspace',
      duration: '75 mins',
      type: 'Hands-on Code Walkthrough',
      summary:
        'Register your PyTorch healthcare model in the Azure ML Model Registry, create Compute Clusters, and log experiment metrics.',
      keyConcepts: ['AzureML SDK v2', 'MLflow integration', 'Compute Instances'],
    },
    {
      id: 3,
      title: 'Deploying Real-time Inference Endpoints',
      duration: '60 mins',
      type: 'Architecture Case Study',
      summary:
        'Deploy a scoring container with a REST endpoint using Azure Managed Online Endpoints with auto-scaling rules.',
      keyConcepts: ['Managed Endpoints', 'Latency budgets', 'Traffic splitting / Canary'],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0F172A] border border-slate-700/80 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Role Preparation Roadmap
              </h3>
              <p className="text-[11px] text-slate-400">
                Bridge the skill gap for {opp.company} · {opp.title}
              </p>
            </div>
          </div>
          <button
            onClick={closePrepModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Target Gap Highlight */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/30 via-slate-900 to-indigo-950/30 border border-blue-500/30 flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-blue-400 mb-1">
                Identified Skill Gap
              </div>
              <div className="text-lg font-bold text-white">
                {opp.missingSkills.join(', ') || 'Azure Fundamentals'}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {opp.skillGapNotes ||
                  'Acquiring core Azure cloud skills will elevate your match score from 94% to 98%.'}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-[11px] text-slate-400 block">Est. Prep Time</span>
              <span className="text-sm font-bold text-blue-300 flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5" /> ~3 hours
              </span>
            </div>
          </div>

          {/* Recommended Modules */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Recommended Micro-Learning Modules
              </h4>
              <span className="text-[11px] text-slate-400">
                {completedSteps.length} of {prepModules.length} completed
              </span>
            </div>

            <div className="space-y-3">
              {prepModules.map((mod) => {
                const isDone = completedSteps.includes(mod.id);
                return (
                  <div
                    key={mod.id}
                    onClick={() => toggleStep(mod.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isDone
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center text-xs mt-0.5 border ${
                            isDone
                              ? 'bg-emerald-500 text-white border-emerald-400'
                              : 'border-slate-600 bg-slate-800 text-slate-400'
                          }`}
                        >
                          {isDone ? '✓' : mod.id}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">
                            {mod.title}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {mod.summary}
                          </p>
                          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                            {mod.keyConcepts.map((kc) => (
                              <span
                                key={kc}
                                className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono"
                              >
                                {kc}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-400 whitespace-nowrap">
                        {mod.duration}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Likely Interview Question Prompt */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-amber-400">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Microsoft Screening Question Cheat-Sheet</span>
            </div>
            <p className="text-[11px] text-slate-300 italic leading-relaxed">
              &quot;Can you describe how you would deploy your PyTorch ML classifier into a production Azure environment with automated GPU scaling?&quot;
            </p>
            <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800 text-[11px] text-slate-400 leading-normal">
              <strong>Key talking points:</strong> Package the inference code with Docker, log the model artifact into Azure ML Registry, and configure a Managed Online Endpoint with an Azure ML Standard_NC6s GPU node.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Added to your profile development queue
          </div>
          <button
            onClick={closePrepModal}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Got it, Let&apos;s Prepare
          </button>
        </div>
      </div>
    </div>
  );
};
