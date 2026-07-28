'use client';

import { useHabits } from '@/lib/HabitContext';
import { Login } from '@/components/Login';
import { MainApp } from '@/components/MainApp';
import { Activity } from 'lucide-react';

export default function Home() {
  const { user, isLoaded } = useHabits();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center font-bold text-black text-2xl animate-pulse">H</div>
      </div>
    );
  }

  return user ? <MainApp /> : <Login />;
}
