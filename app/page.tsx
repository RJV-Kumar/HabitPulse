'use client';

import { useHabits } from '@/lib/HabitContext';
import { Login } from '@/components/Login';
import { MainApp } from '@/components/MainApp';

export default function Home() {
  const { user, isLoaded } = useHabits();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 transition-colors duration-200">
        <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center font-bold text-white text-2xl animate-pulse">H</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-200 text-stone-900 dark:text-stone-100">
      {user ? <MainApp /> : <Login />}
    </div>
  );
}
