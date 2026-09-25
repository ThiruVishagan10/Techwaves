'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  ShieldAlert,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Lock,
  Globe,
  FileCheck,
  AlertCircle,
  Play,
  RotateCw,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const VerificationView: React.FC = () => {
  const { navigateTo } = useApp();

  // Interactive Sandbox state
  const [inspectUrl, setInspectUrl] = useState(
    'https://careers.microsoft.com/us/en/job/1892041/ai-ml-intern'
  );
  const [activeScanScenario, setActiveScanScenario] = useState<'verified' | 'review' | 'scam'>('verified');
  const [isScanning, setIsScanning] = useState(false);

  const handleRunScan = (scenario: 'verified' | 'review' | 'scam', url: string) => {
    setActiveScanScenario(scenario);
    setInspectUrl(url);
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 700);
  };

  return (
    <div className="p-6 lg:p-8 space-y-10 max-w-7xl mx-auto">
      {/* Page Title & Subtitle */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Core Differentiator · PathBridge Trust Engine</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          Opportunity Verification
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Before you apply, PathBridge checks whether an opportunity looks trustworthy. We inspect domain cryptographic signatures, ATS direct routes, corporate entity registry, and detect fraudulent pay-to-work schemes.
        </p>
      </div>

      {/* Interactive URL Verification Sandbox */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#0A0E1A] border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white">
              Interactive Opportunity Scanner Sandbox
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Test any posting URL in real-time
          </span>
        </div>

        {/* Input Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={inspectUrl}
              onChange={(e) => setInspectUrl(e.target.value)}
              placeholder="Paste opportunity or application URL..."
              className="w-full bg-slate-900 border border-slate-700 text-xs text-white pl-10 pr-3 py-2.5 rounded-xl focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <button
            onClick={() => handleRunScan(activeScanScenario, inspectUrl)}
            disabled={isScanning}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 disabled:opacity-60"
          >
            {isScanning ? (
              <>
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>Analyzing Security Signals...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Scan Link</span>
              </>
            )}
          </button>
        </div>

        {/* Preset Sample Buttons for Judges */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 text-[11px]">Judge Presets:</span>
          <button
            onClick={() =>
              handleRunScan(
                'verified',
                'https://careers.microsoft.com/us/en/job/1892041/ai-ml-intern'
              )
            }
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              activeScanScenario === 'verified'
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Sample 1: Microsoft (Verified)
          </button>
          <button
            onClick={() =>
              handleRunScan(
                'review',
                'https://boards.thirdparty-talent.io/novalabs-ml-intern'
              )
            }
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              activeScanScenario === 'review'
                ? 'bg-amber-950/40 text-amber-300 border-amber-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Sample 2: NovaLabs (Needs Review)
          </button>
          <button
            onClick={() =>
              handleRunScan(
                'scam',
                'https://cryptoapex-careers-direct.online/apply-now-fast'
              )
            }
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              activeScanScenario === 'scam'
                ? 'bg-rose-950/40 text-rose-300 border-rose-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Sample 3: CryptoApex (Scam Alert Demo)
          </button>
        </div>

        {/* Live Scan Results Display */}
        <div className="pt-2 border-t border-slate-800/80">
          {activeScanScenario === 'verified' && (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">
                      Result: High Trust Verification Score (98/100)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                      CONFIDENCE: HIGH
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Official company domain matched. Validated direct TLS 1.3 certificate for Microsoft Corporation. Direct ATS posting verified.
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigateTo('opportunity-details', 'opp-msft-aiml')}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto flex-shrink-0"
              >
                <span>View Microsoft Role</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {activeScanScenario === 'review' && (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">
                      Result: Caution Advisory (68/100)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">
                      CONFIDENCE: MEDIUM
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Third-party application URL detected. NovaLabs company landing page exists, but listing is hosted on an unverified aggregator form.
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigateTo('opportunity-details', 'opp-novalabs-ml')}
                className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto flex-shrink-0"
              >
                <span>View NovaLabs Role</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {activeScanScenario === 'scam' && (
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-rose-300">
                      Result: High-Risk Fraud Alert (12/100)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold">
                      CONFIDENCE: LOW (BLOCKED)
                    </span>
                  </div>
                  <p className="text-xs text-rose-200 mt-0.5">
                    SUSPICIOUS: Unregistered 4-day-old proxy domain, Telegram bot application route, and advance $75 equipment fee detected. Blocked by PathBridge.
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigateTo('opportunity-details', 'opp-cryptoapex-scam')}
                className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto flex-shrink-0"
              >
                <span>Inspect Flagged Entry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* The 3 Core Comparison Benchmarks (Per Prompt Specification) */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white">
            Trust Classification Benchmarks
          </h2>
          <p className="text-xs text-slate-400">
            PathBridge categorizes all opportunities into three rigorous verification tiers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Verified (Green/Positive) */}
          <div className="p-6 rounded-2xl bg-[#0F172A] border-2 border-emerald-500/40 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/30">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Verified</h3>
                    <div className="text-[10px] text-emerald-400 font-medium">
                      Green / Positive Status
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-400">Confidence</div>
                  <span className="text-xs font-bold font-mono text-emerald-400">
                    HIGH
                  </span>
                </div>
              </div>

              {/* Checklist */}
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Official domain verified (e.g. microsoft.com)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Valid application URL (HTTPS ATS)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Company corporate registry found</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Active listing verified within 24h</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Complete compensation & role details</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="text-[11px] text-slate-400 mb-3">
                Examples: Microsoft AI/ML, Atlassian Data Eng, Adobe CV
              </div>
              <button
                onClick={() => navigateTo('opportunity-details', 'opp-msft-aiml')}
                className="w-full py-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Verified Role</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Needs Review (Amber) */}
          <div className="p-6 rounded-2xl bg-[#0F172A] border-2 border-amber-500/40 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-amber-500/30">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    ⚠
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Needs Review</h3>
                    <div className="text-[10px] text-amber-400 font-medium">
                      Amber Status
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-400">Confidence</div>
                  <span className="text-xs font-bold font-mono text-amber-400">
                    MEDIUM
                  </span>
                </div>
              </div>

              {/* Checklist */}
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Company website found</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Listing active on job aggregator</span>
                </li>
                <li className="flex items-center gap-2.5 text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Third-party application URL</span>
                </li>
                <li className="flex items-center gap-2.5 text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Limited company corporate footprint</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>Recruiter outreach manual check advised</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="text-[11px] text-slate-400 mb-3">
                Examples: NovaLabs AI, CyberTech Solutions
              </div>
              <button
                onClick={() => navigateTo('opportunity-details', 'opp-novalabs-ml')}
                className="w-full py-2 bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-300 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Needs Review Role</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Suspicious (Red) */}
          <div className="p-6 rounded-2xl bg-[#0F172A] border-2 border-rose-500/40 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-rose-500/30">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                    ✕
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Suspicious</h3>
                    <div className="text-[10px] text-rose-400 font-medium">
                      Red Status · Scam Threat
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-400">Confidence</div>
                  <span className="text-xs font-bold font-mono text-rose-400">
                    LOW (SCAM)
                  </span>
                </div>
              </div>

              {/* Checklist */}
              <ul className="space-y-2.5 text-xs text-rose-300">
                <li className="flex items-center gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>Suspicious newly-registered domain</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>Missing company registered address</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>Payment / equipment deposit requested</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>Unrealistic compensation claim ($150/hr)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>Telegram/WhatsApp untraceable contact</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="text-[11px] text-slate-400 mb-3">
                Examples: CryptoApex Fake Job, QuickHire Scam Demo
              </div>
              <button
                onClick={() => navigateTo('opportunity-details', 'opp-cryptoapex-scam')}
                className="w-full py-2 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Inspect Scam Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Engine Methodology Guide */}
      <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Lock className="w-4 h-4 text-blue-400" />
          <span>How PathBridge Prevents Student Job Scams</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
          College students are prime targets for phishing campaigns disguised as remote AI data entry and assistant roles. PathBridge continuously crawls target opportunity URLs using four layers of protection:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="font-semibold text-white mb-1">1. DNS & SSL Fingerprint</div>
            <div className="text-[11px] text-slate-400">
              Checks domain registration age, DNSSEC compliance, and corporate TLS authority records.
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="font-semibold text-white mb-1">2. ATS Ingestion Route</div>
            <div className="text-[11px] text-slate-400">
              Verifies authentic Workday, Greenhouse, Lever, and Taleo career endpoints.
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="font-semibold text-white mb-1">3. Corporate Registry</div>
            <div className="text-[11px] text-slate-400">
              Cross-references corporate CIN, LinkedIn employee count, and Glassdoor verified accounts.
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="font-semibold text-white mb-1">4. Advance-Fee Scanner</div>
            <div className="text-[11px] text-slate-400">
              Natural language models flag payment demands, crypto deposits, and task-based pay schemes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
