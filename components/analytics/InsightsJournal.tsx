'use client';

import React from 'react';
import { Send, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const sleepData = [
  { day: 'Sleep', value: 40 },
  { day: 'Rest', value: 25 },
  { day: 'Mid', value: 70 },
  { day: 'More', value: 40 },
  { day: 'Max', value: 95 },
  { day: 'Low', value: 30 }
];

export function InsightsJournal() {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Journals */}
        <div className="space-y-6 flex flex-col">
          {/* Daily Journal */}
          <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-stone-200/50 dark:border-stone-700/50 flex-1 min-h-[300px] flex flex-col">
            <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-4">Daily Journal</h3>
            <textarea 
              className="flex-1 w-full bg-transparent resize-none focus:outline-none text-sm text-stone-600 dark:text-stone-300 placeholder:text-stone-400"
              placeholder="Longer entries a text longer entries,..."
              defaultValue="Longer entries a text longer entries, camplsra exometing entrioj earanatisn."
            />
          </div>

          {/* Highlight of the Day */}
          <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-stone-200/50 dark:border-stone-700/50">
            <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-4">Highlight of the Day</h3>
            <textarea 
              className="w-full bg-transparent resize-none focus:outline-none text-sm text-stone-600 dark:text-stone-300 placeholder:text-stone-400 min-h-[60px]"
              placeholder="Highlight of the Day"
              defaultValue="Highlight of the Day"
            />
          </div>
        </div>

        {/* Right Column: AI Insights */}
        <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-stone-200/50 dark:border-stone-700/50 flex flex-col">
          <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-6">AI Personal Coach Insights</h3>
          
          {/* Bar Chart */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-stone-800 dark:text-stone-200 mb-4">Sleep Impact on Motivation</h4>
            <div className="h-[140px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sleepData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
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
                    ticks={[0, 20, 40, 60, 80, 100]}
                  />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pill Consistency Alert */}
          <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 rounded-2xl p-5 mb-8">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-rose-900 dark:text-rose-200">Pill Consistency</h4>
              <AlertTriangle className="w-5 h-5 text-rose-500" />
            </div>
            <p className="text-sm text-rose-800/80 dark:text-rose-300/80 mb-4">
              Samele eampesronent to scat and action in anseroers.
            </p>
            <div className="flex gap-3">
              <button className="flex-1 py-2 bg-rose-200 dark:bg-rose-800/50 text-rose-800 dark:text-rose-200 text-sm font-medium rounded-xl hover:bg-rose-300 dark:hover:bg-rose-700/50 transition-colors">
                Alert
              </button>
              <button className="flex-1 py-2 bg-amber-500 text-white text-sm font-medium rounded-xl shadow-sm hover:bg-amber-600 transition-colors">
                Action action
              </button>
            </div>
          </div>

          {/* Chat Input */}
          <div className="mt-auto pt-4 relative">
            <input 
              type="text" 
              placeholder="Type as a chatbot..." 
              className="w-full bg-stone-100 dark:bg-stone-800 border-none rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 dark:focus:ring-stone-700"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-emerald-500 hover:text-emerald-600 transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
