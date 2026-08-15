'use client';

import React, { useState } from 'react';
import { useHabits } from '@/lib/HabitContext';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function CalendarView({ habitId }: { habitId: string }) {
  const { logs } = useHabits();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  // Calculate padding days to align the first day of the month correctly
  const startDay = startOfMonth(currentMonth).getDay();
  const paddingDays = Array.from({ length: startDay }).map((_, i) => i);

  return (
    <div className="bg-[#121212] border border-white/5 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-sm text-slate-300">{format(currentMonth, 'MMMM yyyy')}</h3>
        <div className="flex gap-1">
          <button 
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-1 hover:bg-white/10 rounded transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-1 hover:bg-white/10 rounded transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-[10px] text-slate-500 font-medium uppercase tracking-widest py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {paddingDays.map(pad => (
          <div key={`pad-${pad}`} className="aspect-square"></div>
        ))}
        {daysInMonth.map(date => {
          const dateStr = format(date, 'yyyy-MM-dd');
          const isCompleted = logs.has(`${habitId}_${dateStr}`);
          const today = isToday(date);
          
          return (
            <div 
              key={dateStr}
              className={`aspect-square flex items-center justify-center rounded text-xs transition-colors ${
                isCompleted 
                  ? 'bg-emerald-500 text-black font-bold border border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                  : today
                    ? 'bg-white/10 border border-white/20 text-white'
                    : 'bg-white/5 text-slate-400 border border-transparent'
              }`}
            >
              {format(date, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
}
