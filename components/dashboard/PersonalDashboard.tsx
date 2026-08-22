'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, Flame, Plus, Sparkles, User, Check, Pill, Dumbbell, 
  BookOpen, Coffee, Activity, Moon, Sun, X
} from 'lucide-react';
import { useHabits } from '@/lib/HabitContext';

export function PersonalDashboard() {
  const { theme, toggleTheme, user } = useHabits();
  const userName = user || 'Rajeev';

  const [energy, setEnergy] = useState<string | null>(null);
  const [motivation, setMotivation] = useState<string | null>(null);
  const [sleep, setSleep] = useState<string | null>(null);

  const [b12, setB12] = useState(false);
  const b12Count = b12 ? 15 : 14;
  const [workout, setWorkout] = useState(false);

  const [todos, setTodos] = useState([
    { id: 1, text: 'Review weekly goals', completed: false },
    { id: 2, text: 'Reply to design team', completed: true },
    { id: 3, text: 'Drink 2L water', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const [habits, setHabits] = useState([
    { id: 1, name: 'Read 20 pages', streak: 12, completed: false, icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { id: 2, name: 'Morning Walk', streak: 5, completed: true, icon: Activity, color: 'text-rose-500', bg: 'bg-rose-100 dark:bg-rose-900/30' },
    { id: 3, name: 'Deep Work (2h)', streak: 3, completed: false, icon: Coffee, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  ]);

  const [highlight, setHighlight] = useState('');

  const renderSelector = (label: string, options: string[], state: string | null, setState: (val: string) => void) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-stone-100 dark:border-stone-800/50 last:border-0 gap-2 sm:gap-0">
      <span className="text-sm font-medium text-stone-600 dark:text-stone-300">{label}</span>
      <div className="flex gap-2">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => setState(opt)}
            className={`px-3 py-1.5 text-xs rounded-full font-medium transition-all ${
              state === opt 
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20' 
                : 'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 sm:gap-0 pt-12 md:pt-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-800 dark:text-stone-100">
            Good morning, {userName} <span className="text-2xl">☀️</span>
          </h1>
          <p suppressHydrationWarning className="text-stone-500 mt-1 flex items-center gap-2 text-sm font-medium">
            {format(new Date(), 'EEEE, MMMM do')}
            <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600"></span>
            <span className="flex items-center text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-0.5 rounded-full">
              <Flame className="w-3.5 h-3.5 mr-1" />
              12 Day Streak
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-auto hidden md:flex">
          <button className="w-11 h-11 rounded-full bg-rose-100 dark:bg-rose-900/30 border-2 border-white dark:border-stone-800 shadow-sm flex items-center justify-center text-rose-600 dark:text-rose-400 font-bold overflow-hidden text-lg">
            {userName.charAt(0).toUpperCase()}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Daily Check-In */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Daily Vibe */}
          <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 rounded-2xl border border-stone-200/50 dark:border-stone-700/50 shadow-sm">
            <h2 className="font-semibold text-stone-800 dark:text-stone-200 mb-4 text-lg">Daily Vibe</h2>
            <div className="flex flex-col">
              {renderSelector('Morning Energy', ['Low', 'Mid', 'High'], energy, setEnergy)}
              {renderSelector('Motivation', ['Low', 'Mid', 'High'], motivation, setMotivation)}
              {renderSelector('Sleep Quality', ['Poor', 'Good'], sleep, setSleep)}
            </div>
          </div>

          {/* Daily Health Toggles */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setB12(!b12)}
              className={`p-5 rounded-2xl border text-left transition-all ${
                b12 
                  ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800/50' 
                  : 'bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border-stone-200 dark:border-stone-800 hover:border-rose-200 dark:hover:border-rose-800'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className={`p-2.5 rounded-xl ${b12 ? 'bg-rose-200 dark:bg-rose-800' : 'bg-stone-100 dark:bg-stone-800'}`}>
                  <Pill className={`w-5 h-5 ${b12 ? 'text-rose-700 dark:text-rose-300' : 'text-stone-500'}`} />
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${b12 ? 'bg-rose-500 border-rose-500 text-white' : 'border-stone-300 dark:border-stone-600'}`}>
                  {b12 && <Check className="w-4 h-4" />}
                </div>
              </div>
              <h3 className={`font-semibold ${b12 ? 'text-rose-900 dark:text-rose-100' : 'text-stone-800 dark:text-stone-200'}`}>Vitamin B12</h3>
              <p className={`text-xs mt-1 font-medium ${b12 ? 'text-rose-600 dark:text-rose-400' : 'text-stone-500'}`}>{b12Count} days this month</p>
            </button>

            <button 
              onClick={() => setWorkout(!workout)}
              className={`p-5 rounded-2xl border text-left transition-all ${
                workout 
                  ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/50' 
                  : 'bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border-stone-200 dark:border-stone-800 hover:border-amber-200 dark:hover:border-amber-800'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className={`p-2.5 rounded-xl ${workout ? 'bg-amber-200 dark:bg-amber-800' : 'bg-stone-100 dark:bg-stone-800'}`}>
                  <Dumbbell className={`w-5 h-5 ${workout ? 'text-amber-700 dark:text-amber-300' : 'text-stone-500'}`} />
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${workout ? 'bg-amber-500 border-amber-500 text-white' : 'border-stone-300 dark:border-stone-600'}`}>
                  {workout && <Check className="w-4 h-4" />}
                </div>
              </div>
              <h3 className={`font-semibold ${workout ? 'text-amber-900 dark:text-amber-100' : 'text-stone-800 dark:text-stone-200'}`}>Daily Workout</h3>
              <p className={`text-xs mt-1 font-medium ${workout ? 'text-amber-600 dark:text-amber-400' : 'text-stone-500'}`}>Stay active</p>
            </button>
          </div>

          {/* Daily Highlight / Journal */}
          <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 rounded-2xl border border-stone-200/50 dark:border-stone-700/50 shadow-sm flex flex-col">
            <h2 className="font-semibold text-stone-800 dark:text-stone-200 mb-3 text-lg">Daily Highlight</h2>
            <textarea
              value={highlight}
              onChange={(e) => setHighlight(e.target.value)}
              placeholder="What was the best part of your day?"
              className="w-full bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-xl p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-rose-500/50 min-h-[100px] text-stone-800 dark:text-stone-200"
            />
          </div>
        </div>

        {/* Right Column: Trackers & Insights */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* AI Insight Placeholder Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 relative overflow-hidden shadow-sm">
            <div className="absolute -top-4 -right-4 p-4 opacity-10 rotate-12">
              <Sparkles className="w-32 h-32 text-indigo-500" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-indigo-100 dark:bg-indigo-800 rounded-lg">
                  <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-300" />
                </div>
                <h3 className="font-semibold text-indigo-900 dark:text-indigo-200">AI Personal Coach</h3>
              </div>
              <p className="text-sm text-indigo-800/80 dark:text-indigo-200/80 leading-relaxed font-medium">
                You're on a 12-day streak for reading! Based on your high morning energy, consider tackling your "Deep Work" habit before noon today to maximize productivity.
              </p>
            </div>
          </div>

          {/* Habit Tracker Widget */}
          <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 rounded-2xl border border-stone-200/50 dark:border-stone-700/50 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-stone-800 dark:text-stone-200 text-lg">Habit Tracker</h2>
              <button className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 p-2 rounded-lg transition-colors font-medium text-sm flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add Habit
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {habits.map(habit => (
                <div 
                  key={habit.id} 
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    habit.completed 
                      ? 'bg-stone-50 dark:bg-stone-800/30 border-stone-100 dark:border-stone-800' 
                      : 'bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border-stone-200 dark:border-stone-700 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${habit.bg}`}>
                      <habit.icon className={`w-5 h-5 ${habit.color}`} />
                    </div>
                    <div>
                      <p className={`font-semibold ${habit.completed ? 'text-stone-400 line-through' : 'text-stone-800 dark:text-stone-200'}`}>{habit.name}</p>
                      <p className={`text-xs flex items-center gap-1 mt-1 font-medium ${habit.completed ? 'text-stone-400' : 'text-stone-500'}`}>
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        {habit.streak} day streak
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setHabits(habits.map(h => h.id === habit.id ? { ...h, completed: !h.completed } : h))}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                      habit.completed ? 'bg-rose-500 border-rose-500 text-white shadow-sm shadow-emerald-500/20' : 'border-stone-300 dark:border-stone-600 text-transparent hover:border-rose-400 dark:hover:border-rose-500'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick To-Do List */}
          <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 rounded-2xl border border-stone-200/50 dark:border-stone-700/50 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-stone-800 dark:text-stone-200 text-lg">Quick To-Do</h2>
              <span className="text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-3 py-1.5 rounded-full">
                {todos.filter(t => t.completed).length} / {todos.length} Done
              </span>
            </div>
            
            <div className="space-y-1 mb-5">
              <AnimatePresence>
                {todos.map(todo => (
                  <motion.div 
                    key={todo.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-3 group py-2"
                  >
                    <button 
                      onClick={() => setTodos(todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t))}
                      className={`shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                        todo.completed ? 'bg-indigo-500 border-indigo-500 text-white shadow-sm shadow-indigo-500/20' : 'border-stone-300 dark:border-stone-600 hover:border-indigo-400'
                      }`}
                    >
                      {todo.completed && <Check className="w-4 h-4" />}
                    </button>
                    <span className={`text-sm font-medium transition-all ${todo.completed ? 'text-stone-400 line-through' : 'text-stone-700 dark:text-stone-200'}`}>
                      {todo.text}
                    </span>
                    <button 
                      onClick={() => setTodos(todos.filter(t => t.id !== todo.id))}
                      className="ml-auto opacity-0 group-hover:opacity-100 text-stone-400 hover:text-rose-500 transition-all p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (newTodo.trim()) {
                setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
                setNewTodo('');
              }
            }} className="flex items-center gap-3">
              <input
                type="text"
                value={newTodo}
                onChange={e => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-stone-800 dark:text-stone-200 placeholder:text-stone-400"
              />
              <button type="submit" disabled={!newTodo.trim()} className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 disabled:opacity-50 transition-colors font-semibold">
                <Plus className="w-5 h-5" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
