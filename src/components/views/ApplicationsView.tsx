'use client';

import React, { useState } from 'react';
import {
  Columns,
  Table as TableIcon,
  Plus,
  ChevronRight,
  Trash2,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ApplicationStage } from '@/types';

export const ApplicationsView: React.FC = () => {
  const { opportunities, updateApplicationStatus, deleteApplication, navigateTo } = useApp();
  const [viewType, setViewType] = useState<'kanban' | 'table'>('kanban');

  // Columns definition
  const columns: {
    id: ApplicationStage;
    label: string;
    accentColor: string;
    badgeBg: string;
  }[] = [
    {
      id: 'saved',
      label: 'Saved',
      accentColor: 'border-slate-700',
      badgeBg: 'bg-slate-800 text-slate-300',
    },
    {
      id: 'applied',
      label: 'Applied',
      accentColor: 'border-blue-500/40',
      badgeBg: 'bg-blue-500/20 text-blue-300',
    },
    {
      id: 'interview',
      label: 'Interview',
      accentColor: 'border-amber-500/40',
      badgeBg: 'bg-amber-500/20 text-amber-300',
    },
    {
      id: 'offer',
      label: 'Offer',
      accentColor: 'border-emerald-500/40',
      badgeBg: 'bg-emerald-500/20 text-emerald-300',
    },
    {
      id: 'rejected',
      label: 'Archived',
      accentColor: 'border-rose-500/40',
      badgeBg: 'bg-rose-950/40 text-rose-300',
    },
  ];

  // Group applications by stage
  const getStageOpportunities = (stage: ApplicationStage) => {
    return opportunities.filter((opp) => opp.applicationStatus === stage);
  };

  const allTracked = opportunities.filter(
    (opp) => opp.applicationStatus && opp.applicationStatus !== 'none'
  );

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            My Applications
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track your internship recruitment pipeline from initial bookmark to official offer.
          </p>
        </div>

        {/* View Switcher: Kanban vs Table */}
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <button
              onClick={() => setViewType('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors font-medium ${
                viewType === 'kanban'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Kanban Board</span>
            </button>
            <button
              onClick={() => setViewType('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors font-medium ${
                viewType === 'table'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table View</span>
            </button>
          </div>

          <button
            onClick={() => navigateTo('discover')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 text-blue-400" />
            <span>Add Opportunity</span>
          </button>
        </div>
      </div>

      {/* KANBAN VIEW */}
      {viewType === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {columns.map((col) => {
            const opps = getStageOpportunities(col.id);
            return (
              <div
                key={col.id}
                className="rounded-2xl bg-[#0B0F19] border border-slate-800/80 p-4 space-y-3 min-h-[500px] flex flex-col justify-between"
              >
                {/* Column Header */}
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        {col.label}
                      </span>
                      <span
                        className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${col.badgeBg}`}
                      >
                        {opps.length}
                      </span>
                    </div>
                  </div>

                  {/* Cards inside column */}
                  <div className="space-y-3">
                    {opps.length === 0 ? (
                      <div className="p-8 text-center rounded-xl border border-dashed border-slate-800 text-slate-500 text-xs">
                        No applications in {col.label} stage
                      </div>
                    ) : (
                      opps.map((opp) => (
                        <div
                          key={opp.id}
                          className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 hover:border-slate-700 transition-all shadow-md space-y-3 group"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${opp.companyLogoColor} flex items-center justify-center text-white font-bold text-xs shadow-sm`}
                              >
                                {opp.companyInitial}
                              </div>
                              <div>
                                <div className="text-[11px] font-bold text-slate-400">
                                  {opp.company}
                                </div>
                                <h4
                                  onClick={() => navigateTo('opportunity-details', opp.id)}
                                  className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors cursor-pointer line-clamp-1"
                                >
                                  {opp.title}
                                </h4>
                              </div>
                            </div>

                            <button
                              onClick={() => deleteApplication(opp.id)}
                              title="Remove application"
                              className="text-slate-600 hover:text-rose-400 p-1 rounded transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span className="font-mono text-blue-400 font-semibold">
                              {opp.matchScore}% Match
                            </span>
                            <span>{opp.stipend}</span>
                          </div>

                          {opp.interviewStage && (
                            <div className="p-2 rounded bg-amber-950/20 border border-amber-500/20 text-[10px] text-amber-300">
                              {opp.interviewStage}
                            </div>
                          )}

                          {/* Quick Stage Mover Buttons */}
                          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                            <button
                              onClick={() => navigateTo('opportunity-details', opp.id)}
                              className="text-blue-400 hover:underline"
                            >
                              Details
                            </button>

                            {/* Move forward helper */}
                            {col.id === 'saved' && (
                              <button
                                onClick={() => updateApplicationStatus(opp.id, 'applied')}
                                className="text-slate-400 hover:text-white flex items-center gap-1"
                                title="Move to Applied"
                              >
                                <span>Apply</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            )}

                            {col.id === 'applied' && (
                              <button
                                onClick={() => updateApplicationStatus(opp.id, 'interview')}
                                className="text-slate-400 hover:text-white flex items-center gap-1"
                                title="Move to Interview"
                              >
                                <span>Interview</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            )}

                            {col.id === 'interview' && (
                              <button
                                onClick={() => updateApplicationStatus(opp.id, 'offer')}
                                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                                title="Move to Offer"
                              >
                                <span>Offer!</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            )}

                            {col.id === 'rejected' && (
                              <button
                                onClick={() => updateApplicationStatus(opp.id, 'saved')}
                                className="text-slate-400 hover:text-white flex items-center gap-1"
                                title="Reopen as Saved"
                              >
                                <span>Restore</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 text-center font-mono pt-2">
                  Stage: {col.label}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="rounded-2xl bg-[#0F172A] border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Company & Role</th>
                  <th className="py-3.5 px-4">Match Score</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Applied Date</th>
                  <th className="py-3.5 px-4">Deadline</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {allTracked.map((opp) => (
                  <tr key={opp.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${opp.companyLogoColor} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}
                        >
                          {opp.companyInitial}
                        </div>
                        <div>
                          <div
                            onClick={() => navigateTo('opportunity-details', opp.id)}
                            className="font-bold text-white hover:text-blue-400 cursor-pointer transition-colors"
                          >
                            {opp.title}
                          </div>
                          <div className="text-[11px] text-slate-400">{opp.company}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                        {opp.matchScore}%
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={opp.applicationStatus}
                        onChange={(e) =>
                          updateApplicationStatus(opp.id, e.target.value as ApplicationStage)
                        }
                        className="bg-slate-900 border border-slate-700 rounded-md py-1 px-2 text-xs font-semibold text-white focus:outline-none focus:border-blue-500 capitalize"
                      >
                        <option value="saved">Saved</option>
                        <option value="applied">Applied</option>
                        <option value="interview">Interview</option>
                        <option value="offer">Offer</option>
                        <option value="rejected">Archived</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-slate-400">
                      {opp.appliedDate || '—'}
                    </td>

                    <td className="py-3.5 px-4 text-slate-400">{opp.deadline}</td>

                    <td className="py-3.5 px-4 text-slate-400">{opp.location}</td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => navigateTo('opportunity-details', opp.id)}
                          className="text-xs font-semibold text-blue-400 hover:text-blue-300"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => deleteApplication(opp.id)}
                          title="Remove application"
                          className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
