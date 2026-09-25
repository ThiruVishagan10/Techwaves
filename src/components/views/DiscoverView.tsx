'use client';

import React, { useMemo, useState } from 'react';
import {
  Search,
  ShieldCheck,
  Grid,
  List,
  RotateCcw,
  X,
  Bookmark,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { OpportunityCard } from '@/components/common/OpportunityCard';

export const DiscoverView: React.FC = () => {
  const {
    opportunities,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filterWorkMode,
    setFilterWorkMode,
    filterVerification,
    setFilterVerification,
    filterMinMatch,
    setFilterMinMatch,
    sortBy,
    setSortBy,
    navigateTo,
    toggleSave,
  } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  // Filter & sort logic
  const filteredOpportunities = useMemo(() => {
    return opportunities
      .filter((opp) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = opp.title.toLowerCase().includes(q);
          const matchCompany = opp.company.toLowerCase().includes(q);
          const matchSkills = opp.skills.some((s) => s.toLowerCase().includes(q));
          const matchLoc = opp.location.toLowerCase().includes(q);
          if (!matchTitle && !matchCompany && !matchSkills && !matchLoc) return false;
        }

        // Opportunity Type
        if (filterType !== 'all' && opp.type !== filterType) {
          return false;
        }

        // Work Mode
        if (filterWorkMode !== 'all' && opp.workMode !== filterWorkMode) {
          return false;
        }

        // Verification Status
        if (filterVerification === 'verified' && opp.verificationStatus !== 'verified') {
          return false;
        } else if (
          filterVerification === 'needs_review' &&
          opp.verificationStatus !== 'needs_review'
        ) {
          return false;
        }

        // Minimum Match %
        if (opp.matchScore < filterMinMatch) {
          return false;
        }

        // Location
        if (selectedLocation !== 'all') {
          if (!opp.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'highest-match') {
          return b.matchScore - a.matchScore;
        } else if (sortBy === 'newest') {
          return a.postedDaysAgo - b.postedDaysAgo;
        } else if (sortBy === 'deadline') {
          return a.deadline.localeCompare(b.deadline);
        }
        // default: recommended (combination of matchScore & verified status)
        const scoreA = a.matchScore + (a.verificationStatus === 'verified' ? 20 : 0);
        const scoreB = b.matchScore + (b.verificationStatus === 'verified' ? 20 : 0);
        return scoreB - scoreA;
      });
  }, [
    opportunities,
    searchQuery,
    filterType,
    filterWorkMode,
    filterVerification,
    filterMinMatch,
    selectedLocation,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setFilterType('all');
    setFilterWorkMode('all');
    setFilterVerification('all');
    setFilterMinMatch(0);
    setSelectedLocation('all');
    setSortBy('recommended');
  };

  const isFiltered =
    searchQuery !== '' ||
    filterType !== 'all' ||
    filterWorkMode !== 'all' ||
    filterVerification !== 'all' ||
    filterMinMatch > 0 ||
    selectedLocation !== 'all' ||
    sortBy !== 'recommended';

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
          Discover Opportunities
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Find internships and jobs that align with your career profile and trust standards.
        </p>
      </div>

      {/* Search and Quick Filters Bar */}
      <div className="p-4 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4 shadow-sm">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search roles, skills, companies (e.g. Python, Microsoft, Remote)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 text-sm text-white pl-10 pr-10 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 placeholder-slate-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1 text-xs">
          {/* Opportunity Type */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">
              Opportunity Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg py-1.5 px-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="Internship">Internship</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>

          {/* Work Mode */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">
              Work Mode
            </label>
            <select
              value={filterWorkMode}
              onChange={(e) => setFilterWorkMode(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg py-1.5 px-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Modes</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          {/* Verification Status */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">
              Verification
            </label>
            <select
              value={filterVerification}
              onChange={(e) => setFilterVerification(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg py-1.5 px-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-medium"
            >
              <option value="all">All Verification</option>
              <option value="verified">Verified Only (✓)</option>
              <option value="needs_review">Needs Review</option>
            </select>
          </div>

          {/* Minimum Match */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">
              Match Threshold
            </label>
            <select
              value={filterMinMatch}
              onChange={(e) => setFilterMinMatch(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg py-1.5 px-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value={0}>Any Match %</option>
              <option value={80}>80%+ Strong Match</option>
              <option value={90}>90%+ Top Match</option>
            </select>
          </div>

          {/* Location filter */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 block">
              Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg py-1.5 px-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Locations</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Remote">Remote</option>
              <option value="Noida">Noida</option>
              <option value="Pune">Pune</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header: Count, Sorting & Layout Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-white">
            {filteredOpportunities.length} opportunities matching
          </span>

          {filterVerification === 'verified' && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3" /> Verified Only
            </span>
          )}

          {isFiltered && (
            <button
              onClick={resetFilters}
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Sorting */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as
                    | 'recommended'
                    | 'highest-match'
                    | 'newest'
                    | 'deadline'
                )
              }
              className="bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="recommended">Recommended</option>
              <option value="highest-match">Highest Match</option>
              <option value="newest">Newest</option>
              <option value="deadline">Deadline</option>
            </select>
          </div>

          {/* Grid vs List toggle */}
          <div className="hidden sm:flex items-center p-0.5 rounded-lg bg-slate-900 border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Opportunities Presentation */}
      {filteredOpportunities.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3">
          <Search className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No matching opportunities found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search criteria or resetting filters to view all available listings.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors inline-block mt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOpportunities.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-11 h-11 rounded-lg bg-gradient-to-br ${opp.companyLogoColor} flex items-center justify-center text-white font-bold text-sm shadow flex-shrink-0`}
                >
                  {opp.companyInitial}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-slate-300">
                      {opp.company}
                    </span>
                    <span className="text-[11px] text-slate-400">·</span>
                    <span className="text-[11px] text-slate-400">{opp.location}</span>
                  </div>
                  <h3
                    onClick={() => navigateTo('opportunity-details', opp.id)}
                    className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors cursor-pointer truncate"
                  >
                    {opp.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-[11px] text-slate-400">
                      {opp.stipend}
                    </span>
                    <span className="text-[11px] text-slate-400">·</span>
                    <span className="text-[11px] text-slate-400">
                      Deadline: {opp.deadline}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status and Action */}
              <div className="flex items-center gap-3 flex-shrink-0 self-end md:self-center">
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {opp.matchScore}% Match
                </span>

                <button
                  onClick={() => toggleSave(opp.id)}
                  className={`p-2 rounded-lg border ${
                    opp.isSaved
                      ? 'bg-blue-600/20 text-blue-400 border-blue-500/30'
                      : 'text-slate-400 hover:text-white border-slate-800'
                  }`}
                  title="Save"
                >
                  <Bookmark
                    className="w-4 h-4"
                    fill={opp.isSaved ? 'currentColor' : 'none'}
                  />
                </button>

                <button
                  onClick={() => navigateTo('opportunity-details', opp.id)}
                  className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow"
                >
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
