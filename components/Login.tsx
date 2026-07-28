'use client';

import React, { useState } from 'react';
import { useHabits } from '@/lib/HabitContext';
import { Activity } from 'lucide-react';
import { motion } from 'motion/react';

export function Login() {
  const { login } = useHabits();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim());
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#121212] rounded-xl p-8 border border-white/5 flex flex-col gap-6"
      >
        <div className="flex flex-col items-center justify-center text-center mb-2">
          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center font-bold text-black text-2xl mb-4">H</div>
          <h1 className="text-2xl font-semibold tracking-tight uppercase">Habit<span className="text-emerald-500 italic font-light">Pulse</span></h1>
          <p className="text-slate-500 mt-2 text-sm">
            Consistency is the key to mastering your day.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-[10px] text-slate-500 uppercase tracking-widest mb-2">
              Identify Yourself
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded text-sm bg-white/5 border-white/10 focus:outline-none focus:border-emerald-500 text-slate-100"
              placeholder="Your Name (e.g. alex_jordan)"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black rounded font-medium transition-colors text-sm uppercase tracking-wide"
          >
            Initialize Workspace
          </button>
        </form>
      </motion.div>
    </div>
  );
}
