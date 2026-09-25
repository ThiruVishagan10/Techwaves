'use client';

import React from 'react';
import { Bookmark, Compass } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { OpportunityCard } from '@/components/common/OpportunityCard';

export const SavedView: React.FC = () => {
  const { opportunities, navigateTo } = useApp();
  const savedOpportunities = opportunities.filter((opp) => opp.isSaved);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
          Saved Opportunities
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Review bookmarked internships and track deadlines before submitting your applications.
        </p>
      </div>

      {savedOpportunities.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3">
          <Bookmark className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No saved opportunities yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Browse through verified opportunities and click the bookmark icon to save roles for quick review.
          </p>
          <button
            onClick={() => navigateTo('discover')}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors inline-flex items-center gap-1.5 mt-2"
          >
            <Compass className="w-4 h-4" />
            <span>Discover Roles</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedOpportunities.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      )}
    </div>
  );
};
