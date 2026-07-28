'use client';

import React, { useMemo } from 'react';
import { useHabits, Category } from '@/lib/HabitContext';
import { ContributionGraph } from './ContributionGraph';
import { Activity, TrendingUp, AlertCircle } from 'lucide-react';
import { differenceInDays, startOfDay } from 'date-fns';

const CATEGORIES: Category[] = ['Health', 'Productivity', 'Learning', 'Fitness', 'Other'];

export function Dashboard() {
  const { habits, logs } = useHabits();

  const stats = useMemo(() => {
    if (habits.length === 0) return null;

    let totalPossible = 0;
    let totalCompleted = logs.size; // Assuming all logs are valid. A stricter check would be against active habits only.
    
    const habitStats = habits.map(habit => {
      // Days since creation
      const daysSince = Math.max(1, differenceInDays(startOfDay(new Date()), startOfDay(new Date(habit.createdAt))) + 1);
      
      let completed = 0;
      logs.forEach(log => {
        if (log.startsWith(habit.id)) completed++;
      });
      
      totalPossible += daysSince;
      
      return {
        ...habit,
        completionRate: (completed / daysSince) * 100,
        completed
      };
    });

    const overallRate = totalPossible > 0 ? (totalCompleted / totalPossible) * 100 : 0;
    
    // Sort by rate
    const sorted = [...habitStats].sort((a, b) => b.completionRate - a.completionRate);
    const topHabit = sorted[0];
    const leastHabit = sorted[sorted.length - 1];

    return { overallRate, topHabit, leastHabit, totalPossible, totalCompleted };
  }, [habits, logs]);

  const categoriesWithHabits = useMemo(() => {
    return CATEGORIES.filter(c => habits.some(h => h.category === c));
  }, [habits]);

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

          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Category Heatmaps</h3>
            {categoriesWithHabits.map(category => (
              <div key={category} className="bg-[#121212] border border-white/5 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-sm font-medium text-slate-300">{category} Consistency</h2>
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
                <ContributionGraph filterCategory={category} />
              </div>
            ))}
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
