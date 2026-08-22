'use client';

import React from 'react';
import { MoreVertical, Check, ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const habits = [
  { id: 'meditation', name: 'Meditation', percentage: 100, color: 'text-amber-500', svgColor: '#f59e0b', dates: [true, true, true, false, true, true, true] },
  { id: 'reading', name: 'Reading', percentage: 100, color: 'text-emerald-500', svgColor: '#10b981', dates: [true, true, true, true, true, true, true] },
  { id: 'water', name: 'Water intake', percentage: 100, color: 'text-blue-500', svgColor: '#3b82f6', dates: [true, true, true, true, false, true, true] },
  { id: 'workout', name: 'Workout', percentage: 100, color: 'text-indigo-500', svgColor: '#6366f1', dates: [true, true, false, true, true, true, true] }
];

const workoutData = [
  { day: 'Mo', duration: 4 },
  { day: 'Tu', duration: 5 },
  { day: 'We', duration: 8 },
  { day: 'Th', duration: 3 },
  { day: 'Fr', duration: 4 },
  { day: 'Sa', duration: 2 }
];

const CircularProgress = ({ percentage, color }: { percentage: number, color: string }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center mb-6">
      <svg className="w-24 h-24 transform -rotate-90">
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke="currentColor"
          strokeWidth="6"
          fill="transparent"
          className="text-stone-100 dark:text-stone-800"
        />
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke={color}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-lg font-bold text-stone-800 dark:text-stone-200">{percentage}%</span>
    </div>
  );
};

export function HabitsAnalytics() {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100">My Habits</h2>
        <button className="flex items-center gap-1 text-sm font-medium text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors">
          Long-term data <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Habits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {habits.map((habit) => (
          <div key={habit.id} className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-stone-200/50 dark:border-stone-700/50 flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-4">
              <h3 className="font-semibold text-stone-800 dark:text-stone-200">{habit.name}</h3>
              <button className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            
            <CircularProgress percentage={habit.percentage} color={habit.svgColor} />
            
            <div className="w-full">
              <div className="flex justify-between text-[10px] font-medium text-stone-400 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <span key={i} className="w-5 text-center">{day}</span>
                ))}
              </div>
              <div className="flex justify-between">
                {habit.dates.map((completed, i) => (
                  <div key={i} className={`w-5 h-5 rounded-md flex items-center justify-center ${completed ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-stone-100 text-transparent dark:bg-stone-800'}`}>
                    {completed && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trackers Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pill Tracker */}
        <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-stone-200/50 dark:border-stone-700/50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-semibold text-stone-800 dark:text-stone-200">Pill Tracker</h3>
              <p className="text-sm font-medium text-stone-600 dark:text-stone-300 mt-1">Vitamin B12</p>
            </div>
            <div className="text-sm font-medium">
              <span className="text-stone-500">Streak: </span>
              <span className="text-emerald-500">18 Days</span>
            </div>
          </div>

          <div className="w-full overflow-x-auto no-scrollbar">
            <table className="w-full min-w-[400px]">
              <thead>
                <tr>
                  <th className="text-left text-xs font-medium text-stone-400 pb-3 font-normal w-24">Days Taken</th>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
                    <th key={i} className="text-center text-[10px] font-medium text-stone-400 pb-3">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-xs font-medium text-stone-600 dark:text-stone-300">
                <tr>
                  <td className="py-2">Monthy</td>
                  {[0, 7, 6, 5, 10, 11, 14, 13].map((val, i) => (
                    <td key={i} className="text-center py-2">
                      <div className="w-5 h-5 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                        {val || ''}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2">Monthy</td>
                  {[13, 14, 15, 16, 17, 18, 25, 23].map((val, i) => (
                    <td key={i} className="text-center py-2">
                      {val}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Workout Summary */}
        <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-stone-200/50 dark:border-stone-700/50">
          <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-6">Workout Summary</h3>
          <div className="h-[120px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={workoutData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#78716c' }} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#78716c' }} 
                  ticks={[0, 4, 8, 12]} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="duration" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
