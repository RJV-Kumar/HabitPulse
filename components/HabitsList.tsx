'use client';

import React, { useState } from 'react';
import { useHabits, Category } from '@/lib/HabitContext';
import { Trash2, Plus, ListTodo, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContributionGraph } from './ContributionGraph';

const CATEGORIES: Category[] = ['Health', 'Fitness', 'Learning', 'Productivity', 'Other'];

export function HabitsList() {
  const { habits, addHabit, deleteHabit } = useHabits();
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Health');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addHabit(name.trim(), category);
      setName('');
    }
  };

  return (
    <div className="space-y-6">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Active Habits</h2>
          <p className="text-slate-400 mt-1">Total active habits: {habits.length}</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="bg-[#121212] p-5 rounded-xl border border-white/5 flex flex-col sm:flex-row gap-4 items-end mb-6">
        <div className="flex-1 w-full">
          <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">Habit Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded text-sm bg-white/5 border-white/10 focus:outline-none focus:border-emerald-500 text-slate-100"
            placeholder="e.g., Take Omega 3, 10min reading"
            required
          />
        </div>
        <div className="w-full sm:w-48">
          <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full px-4 py-2 border rounded text-sm bg-white/5 border-white/10 focus:outline-none focus:border-emerald-500 text-slate-100 appearance-none"
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </form>

      <div className="bg-[#121212] rounded-xl border border-white/5 overflow-hidden">
        {habits.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <ListTodo className="w-12 h-12 mx-auto mb-3 text-white/20" />
            <p className="text-sm">No habits added yet.</p>
          </div>
        ) : (
          <ul className="flex flex-col">
            <AnimatePresence initial={false}>
              {habits.map((habit) => (
                <motion.li
                  key={habit.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col border-b border-white/5 last:border-b-0 overflow-hidden"
                >
                  <div 
                    className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => setExpandedId(expandedId === habit.id ? null : habit.id)}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{habit.name}</span>
                      <span className="text-[10px] text-slate-500 mt-1">{habit.category} • Daily</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteHabit(habit.id);
                        }}
                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                        title="Delete habit"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-500">
                        {expandedId === habit.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <AnimatePresence>
                    {expandedId === habit.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 bg-black/20 border-t border-white/5">
                          <h4 className="text-[10px] text-slate-500 uppercase tracking-widest mb-4">Habit Progress</h4>
                          <ContributionGraph filterHabitId={habit.id} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
}
