'use client';

import React, { useMemo } from 'react';
import { useHabits, Category } from '@/lib/HabitContext';
import { format, subDays, startOfDay, isSameDay } from 'date-fns';

export function ContributionGraph({ filterHabitId, filterCategory }: { filterHabitId?: string, filterCategory?: Category }) {
  const { habits, logs } = useHabits();

  const days = useMemo(() => {
    // Generate last 365 days
    const today = startOfDay(new Date());
    const arr = [];
    for (let i = 364; i >= 0; i--) {
      arr.push(subDays(today, i));
    }
    return arr;
  }, []);

  const relevantHabits = useMemo(() => {
    if (filterHabitId) return habits.filter(h => h.id === filterHabitId);
    if (filterCategory) return habits.filter(h => h.category === filterCategory);
    return habits;
  }, [habits, filterHabitId, filterCategory]);

  const totalPossibleDaily = relevantHabits.length;

  return (
    <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
      <div className="min-w-max">
        <div 
          className="grid gap-[3px]"
          style={{
            gridTemplateColumns: `repeat(${Math.ceil(days.length / 7)}, minmax(0, 1fr))`,
            gridTemplateRows: 'repeat(7, minmax(0, 1fr))',
            gridAutoFlow: 'column'
          }}
        >
          {days.map((date, i) => {
            const dateStr = format(date, 'yyyy-MM-dd');
            let completedCount = 0;
            
            relevantHabits.forEach(habit => {
              if (logs.has(`${habit.id}_${dateStr}`)) {
                completedCount++;
              }
            });

            // Calculate intensity 0-4
            let intensity = 0;
            if (totalPossibleDaily > 0) {
              const ratio = completedCount / totalPossibleDaily;
              if (ratio > 0 && ratio <= 0.25) intensity = 1;
              else if (ratio > 0.25 && ratio <= 0.5) intensity = 2;
              else if (ratio > 0.5 && ratio <= 0.75) intensity = 3;
              else if (ratio > 0.75) intensity = 4;
            }

            let bgClass = "bg-white/5";
            if (intensity === 1) bgClass = "bg-emerald-900";
            else if (intensity === 2) bgClass = "bg-emerald-700";
            else if (intensity === 3) bgClass = "bg-emerald-500";
            else if (intensity === 4) bgClass = "bg-emerald-300";

            return (
              <div
                key={dateStr}
                title={`${completedCount} habits on ${format(date, 'MMM d, yyyy')}`}
                className={`w-3 h-3 rounded-sm ${bgClass}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
