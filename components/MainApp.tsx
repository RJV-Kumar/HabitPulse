'use client';

import React, { useState } from 'react';
import { useHabits } from '@/lib/HabitContext';
import { Dashboard } from './dashboard/Dashboard';
import { DailyTracker } from './DailyTracker';
import { HabitsList } from './habits/HabitsList';
import { Activity, CalendarCheck, LayoutDashboard, ListTodo, LogOut, Moon, Sun, Bell, BellOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'tracker' | 'dashboard' | 'list';

export function MainApp() {
  const { user, logout, theme, toggleTheme, notificationsEnabled, requestNotificationPermission } = useHabits();
  const [activeTab, setActiveTab] = useState<Tab>('tracker');

  const tabs = [
    { id: 'tracker', label: 'Daily Tracker', icon: CalendarCheck },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'list', label: 'Habits List', icon: ListTodo },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar / Top Nav */}
      <nav className="w-full md:w-64 bg-[#121212] border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-black">H</div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight uppercase">Habit<span className="text-emerald-500 italic font-light">Pulse</span></h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{user}</p>
          </div>
        </div>

        <div className="flex-1 px-4 pb-4 md:py-4 flex flex-row md:flex-col gap-2 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all whitespace-nowrap text-sm ${
                activeTab === tab.id 
                  ? 'bg-white/5 border border-white/5 text-emerald-500 font-medium' 
                  : 'text-slate-400 hover:bg-white/5 border border-transparent'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/10 space-y-2 hidden md:block">
          <button
            onClick={requestNotificationPermission}
            className="flex items-center justify-between px-4 py-2 w-full rounded text-slate-400 hover:bg-white/5 transition-all text-sm"
          >
            <span className="flex items-center gap-3">
              {notificationsEnabled ? <Bell className="w-4 h-4 text-emerald-500" /> : <BellOff className="w-4 h-4" />}
              Alerts
            </span>
            {notificationsEnabled && <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>}
          </button>
          <button
            onClick={logout}
            className="flex items-center justify-between px-4 py-2 w-full rounded text-slate-400 hover:bg-white/5 transition-all text-sm"
          >
            <span className="flex items-center gap-3">
              <LogOut className="w-4 h-4" />
              Logout
            </span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-5xl mx-auto">
        {/* Mobile controls */}
        <div className="md:hidden flex justify-end gap-2 mb-4">
           <button onClick={requestNotificationPermission} className="p-2 rounded bg-white/5 border border-white/10">
             {notificationsEnabled ? <Bell className="w-5 h-5 text-emerald-500" /> : <BellOff className="w-5 h-5" />}
           </button>
           <button onClick={logout} className="p-2 rounded bg-white/5 border border-white/10 text-slate-400">
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'tracker' && <DailyTracker />}
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'list' && <HabitsList />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
