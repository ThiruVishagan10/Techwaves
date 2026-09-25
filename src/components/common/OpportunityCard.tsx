'use client';

import React from 'react';
import {
  MapPin,
  Calendar,
  DollarSign,
  ShieldCheck,
  AlertTriangle,
  Bookmark,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { Opportunity } from '@/types';
import { useApp } from '@/context/AppContext';

interface OpportunityCardProps {
  opportunity: Opportunity;
  featured?: boolean;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  featured = false,
}) => {
  const { navigateTo, toggleSave, user } = useApp();

  const getMatchScoreBadge = (score: number) => {
    if (score >= 90) {
      return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    } else if (score >= 80) {
      return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
    } else if (score >= 60) {
      return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    } else {
      return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
    }
  };

  const getVerificationBadge = (status: Opportunity['verificationStatus']) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified</span>
          </span>
        );
      case 'needs_review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Needs Review</span>
          </span>
        );
      case 'suspicious':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Suspicious</span>
          </span>
        );
    }
  };

  return (
    <div
      className={`group relative rounded-xl bg-[#0F172A] border transition-all duration-200 hover:shadow-xl hover:border-slate-700 flex flex-col justify-between ${
        featured
          ? 'border-blue-500/40 shadow-blue-500/5 bg-gradient-to-b from-[#111C38] to-[#0F172A]'
          : 'border-slate-800/90'
      } ${opportunity.verificationStatus === 'suspicious' ? 'border-rose-900/40 bg-rose-950/10' : ''}`}
    >
      {/* Top Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3">
            {/* Company Badge */}
            <div
              className={`w-11 h-11 rounded-lg bg-gradient-to-br ${opportunity.companyLogoColor} flex items-center justify-center text-white font-bold text-sm shadow-md border border-white/10 flex-shrink-0`}
            >
              {opportunity.companyInitial}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className="text-xs font-semibold text-slate-300">
                  {opportunity.company}
                </span>
                <span className="text-[11px] text-slate-400">·</span>
                <span className="text-[11px] text-slate-400">
                  {opportunity.type}
                </span>
              </div>
              <h3
                onClick={() => navigateTo('opportunity-details', opportunity.id)}
                className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors cursor-pointer line-clamp-1"
              >
                {opportunity.title}
              </h3>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleSave(opportunity.id)}
            className={`p-2 rounded-lg transition-colors border ${
              opportunity.isSaved
                ? 'bg-blue-600/20 text-blue-400 border-blue-500/40'
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800 border-transparent'
            }`}
            title={opportunity.isSaved ? 'Saved' : 'Save Opportunity'}
          >
            <Bookmark
              className="w-4 h-4"
              fill={opportunity.isSaved ? 'currentColor' : 'none'}
            />
          </button>
        </div>

        {/* Badges: Match % & Verification */}
        <div className="flex items-center gap-2 mb-3.5 flex-wrap">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getMatchScoreBadge(
              opportunity.matchScore
            )}`}
          >
            <Sparkles className="w-3 h-3" />
            <span>{opportunity.matchScore}% Match</span>
          </span>

          {getVerificationBadge(opportunity.verificationStatus)}

          <span className="text-[11px] text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
            {opportunity.workMode}
          </span>
        </div>

        {/* Details Meta */}
        <div className="grid grid-cols-2 gap-y-2 text-xs text-slate-400 mb-4">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <DollarSign className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate text-slate-300 font-medium">
              {opportunity.stipend}
            </span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">Deadline: {opportunity.deadline}</span>
          </div>
          <div className="text-[11px] text-slate-400 truncate">
            Source: <span className="text-slate-300">{opportunity.source}</span>
          </div>
        </div>

        {/* Skills preview */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {opportunity.skills.slice(0, 4).map((skill) => {
            const isMatched =
              user.skills.core.includes(skill) ||
              user.skills.backend.includes(skill) ||
              user.skills.cloudAndTools.includes(skill) ||
              opportunity.matchedSkills.includes(skill);

            return (
              <span
                key={skill}
                className={`text-[11px] px-2 py-0.5 rounded font-mono ${
                  isMatched
                    ? 'bg-blue-950/60 text-blue-300 border border-blue-500/25'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                {isMatched ? `✓ ${skill}` : skill}
              </span>
            );
          })}
          {opportunity.skills.length > 4 && (
            <span className="text-[10px] text-slate-400 font-mono">
              +{opportunity.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer / Action */}
      <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-900/40 rounded-b-xl flex items-center justify-between">
        <span className="text-[11px] text-slate-400">
          Posted {opportunity.postedDaysAgo}d ago
        </span>

        <button
          onClick={() => navigateTo('opportunity-details', opportunity.id)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 group-hover:translate-x-0.5 transition-all"
        >
          <span>View Opportunity</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
