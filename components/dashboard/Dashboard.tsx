'use client';

import React, { useMemo, useState } from 'react';
import { useHabits, Category } from '@/lib/HabitContext';
import { ContributionGraph } from '../analytics/ContributionGraph';
import { CalendarView } from '../calendar/CalendarView';
import { Activity, TrendingUp, AlertCircle, LayoutGrid, List } from 'lucide-react';
import { differenceInDays, startOfDay } from 'date-fns';

const CATEGORIES: Category[] = ['Health', 'Productivity', 'Learning', 'Fitness', 'Other'];

export function Dashboard() {
  const { habits, logs } = useHabits();
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

  const stats = useMemo(() => {
    if (habits.length === 0) return null;

    let totalPossible = 0;
    let totalCompleted = logs.size;
    
    const habitStats = habits.map(habit => {
      const daysSince = Math.max(1, differenceInDays(startOfDay(new Date()), startOfDay(new Date(habit.createdAt))) + 1);
      let completed = 0;
      logs.forEach(log => {
        if (log.startsWith(habit.id)) completed++;
      });
      totalPossible += daysSince;
      return {
        ...habit,
        completionRate: (completed / daysSince) * 100,
        completed,
        daysSince
      };
    });

    const overallRate = totalPossible > 0 ? (totalCompleted / totalPossible) * 100 : 0;
    const sorted = [...habitStats].sort((a, b) => b.completionRate - a.completionRate);
    const topHabit = sorted[0];
    const leastHabit = sorted[sorted.length - 1];

    return { overallRate, topHabit, leastHabit, totalPossible, totalCompleted, habitStats };
  }, [habits, logs]);

  const categoriesWithHabits = useMemo(() => {
    return CATEGORIES.filter(c => habits.some(h => h.category === c));
  }, [habits]);

  const filteredHabitStats = useMemo(() => {
    if (!stats) return [];
    if (selectedCategory === 'All') return stats.habitStats;
    return stats.habitStats.filter(h => h.category === selectedCategory);
  }, [stats, selectedCategory]);

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Dashboard</h2>
        <p className="text-slate-400 mt-1">Here's your overall progress data.</p>
      </header>

      {stats ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#121212] border border-white/5 rounded-xl p-5 flex flex-col gap-4">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-500" />
                Overall Progress
              </h2>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <span className="text-3xl font-light">{stats.overallRate.toFixed(1)}<span className="text-sm text-slate-500">%</span></span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${stats.overallRate}%` }}></div>
                </div>
              </div>
            </div>

            <div className="bg-[#121212] border border-white/5 rounded-xl p-5 flex flex-col gap-4">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                Top Followed
              </h2>
              <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex flex-col justify-center flex-1">
                <div className="text-sm font-medium truncate" title={stats.topHabit.name}>{stats.topHabit.name}</div>
                <div className="text-emerald-500 text-xs font-mono mt-1">{stats.topHabit.completionRate.toFixed(0)}% Completion</div>
              </div>
            </div>

            <div className="bg-[#121212] border border-white/5 rounded-xl p-5 flex flex-col gap-4">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-400" />
                Needs Attention
              </h2>
              <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex flex-col justify-center flex-1">
                <div className="text-sm font-medium truncate" title={stats.leastHabit.name}>{stats.leastHabit.name}</div>
                <div className="text-orange-400 text-xs font-mono mt-1">{stats.leastHabit.completionRate.toFixed(0)}% Completion</div>
              </div>
            </div>
          </div>

          <div className="bg-[#121212] border border-white/5 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-medium text-slate-300">Overall Consistency Heatmap</h2>
              <div className="flex gap-1 items-center">
                <span className="text-[10px] text-slate-500 mr-1">Less</span>
                <div className="w-3 h-3 bg-white/5 rounded-sm"></div>
                <div className="w-3 h-3 bg-emerald-900 rounded-sm"></div>
                <div className="w-3 h-3 bg-emerald-700 rounded-sm"></div>
                <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div>
                <div className="w-3 h-3 bg-emerald-300 rounded-sm"></div>
                <span className="text-[10px] text-slate-500 ml-1">More</span>
              </div>
            </div>
            <ContributionGraph />
          </div>

          <div className="space-y-6 pt-6 border-t border-white/5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Category Overview</h3>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as Category | 'All')}
                  className="bg-[#121212] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-slate-300 focus:outline-none focus:border-emerald-500 appearance-none flex-1 sm:flex-none"
                >
                  <option value="All">All Categories</option>
                  {categoriesWithHabits.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <div className="flex bg-[#121212] border border-white/10 rounded-lg p-0.5">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white/10 text-emerald-500' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('card')}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'card' ? 'bg-white/10 text-emerald-500' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {selectedCategory !== 'All' && (
              <div className="bg-[#121212] border border-white/5 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-sm font-medium text-slate-300">{selectedCategory} Consistency</h2>
                </div>
                <ContributionGraph filterCategory={selectedCategory} />
              </div>
            )}

            {filteredHabitStats.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm">
                No habits found for this category.
              </div>
            ) : (
              <div className={viewMode === 'card' ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
                {filteredHabitStats.map(habit => (
                  <div key={habit.id} className="bg-[#121212] border border-white/5 rounded-xl overflow-hidden flex flex-col">
                    <div className="p-5 flex justify-between items-start border-b border-white/5">
                      <div>
                        <h4 className="font-medium text-slate-200">{habit.name}</h4>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 block">{habit.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-light text-emerald-500">{habit.completionRate.toFixed(0)}%</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">{habit.completed} / {habit.daysSince} Days</div>
                      </div>
                    </div>
                    <div className="p-5 flex-1 bg-black/20 overflow-x-auto custom-scrollbar">
                      <div className="min-w-[300px]">
                         <CalendarView habitId={habit.id} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-[#121212] rounded-xl border border-white/5 border-dashed">
          <Activity className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-300">No Data Yet</h3>
          <p className="text-slate-500 mt-1 text-sm">Add some habits and start tracking to see your stats here.</p>
        </div>
      )}
    </div>
  );
}
