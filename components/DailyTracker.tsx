'use client';

import React, { useState, useMemo } from 'react';
import { useHabits } from '@/lib/HabitContext';
import { format, addDays, subDays, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { motion } from 'motion/react';

export function DailyTracker() {
  const { habits, logs, toggleLog } = useHabits();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dateStr = format(selectedDate, 'yyyy-MM-dd');

  const { completedCount, totalCount, progress } = useMemo(() => {
    let completed = 0;
    habits.forEach(habit => {
      if (logs.has(`${habit.id}_${dateStr}`)) completed++;
    });
    const total = habits.length;
    return {
      completedCount: completed,
      totalCount: total,
      progress: total > 0 ? (completed / total) * 100 : 0
    };
  }, [habits, logs, dateStr]);

  const handleToggle = (habitId: string) => {
    toggleLog(habitId, dateStr);
  };

  const isToday = isSameDay(selectedDate, new Date());

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Daily Routine</h2>
          <p className="text-slate-400 mt-1">Mark your habits as complete.</p>
        </div>
      </header>

      <div className="bg-[#121212] rounded-xl border border-white/5 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#121212]">
          <button 
            onClick={() => setSelectedDate(subDays(selectedDate, 1))}
            className="p-2 hover:bg-white/10 rounded transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <h3 className="font-medium text-sm">{isToday ? 'Today\'s Check-ins' : format(selectedDate, 'MMM d, yyyy')}</h3>
            {totalCount > 0 && (
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
                {completedCount} / {totalCount} completed
              </p>
            )}
          </div>

          <button 
            onClick={() => setSelectedDate(addDays(selectedDate, 1))}
            disabled={isToday}
            className="p-2 hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {totalCount > 0 && (
          <div className="h-1.5 w-full bg-white/5">
            <motion.div 
              className="h-full bg-emerald-500" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        )}

        <div className="p-4 sm:p-6 flex flex-col gap-3">
          {habits.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No habits set up yet. Go to the habits list to add some!
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {habits.map(habit => {
                const isCompleted = logs.has(`${habit.id}_${dateStr}`);
                return (
                  <button
                    key={habit.id}
                    onClick={() => handleToggle(habit.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                      isCompleted 
                        ? 'bg-white/5 border-white/5' 
                        : 'bg-white/5 border-white/5 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className={`w-6 h-6 shrink-0 border-2 rounded flex items-center justify-center font-bold text-xs ${
                      isCompleted ? 'border-emerald-500 bg-emerald-500/20 text-emerald-500' : 'border-white/20'
                    }`}>
                      {isCompleted && '✓'}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{habit.name}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{habit.category}</p>
                    </div>
                    {!isCompleted && (
                      <span className="px-3 py-1 bg-white/5 hover:bg-white/10 text-[10px] uppercase tracking-wider rounded border border-white/10 transition-colors hidden sm:block">Log Now</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
