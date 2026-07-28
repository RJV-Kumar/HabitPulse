'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';

export type Category = 'Health' | 'Productivity' | 'Learning' | 'Fitness' | 'Other';

export interface Habit {
  id: string;
  name: string;
  category: Category;
  createdAt: string;
}

interface HabitContextType {
  user: string | null;
  login: (name: string) => void;
  logout: () => void;
  habits: Habit[];
  addHabit: (name: string, category: Category) => void;
  deleteHabit: (id: string) => void;
  logs: Set<string>; // Stored as "habitId_YYYY-MM-DD"
  toggleLog: (habitId: string, date: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isLoaded: boolean;
  requestNotificationPermission: () => Promise<void>;
  notificationsEnabled: boolean;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [logs, setLogs] = useState<Set<string>>(new Set());
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isLoaded, setIsLoaded] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    // Load from local storage
    const storedUser = localStorage.getItem('habit_user');
    if (storedUser) setUser(storedUser);

    const storedHabits = localStorage.getItem('habit_habits');
    if (storedHabits) setHabits(JSON.parse(storedHabits));

    const storedLogs = localStorage.getItem('habit_logs');
    if (storedLogs) setLogs(new Set(JSON.parse(storedLogs)));

    const storedTheme = localStorage.getItem('habit_theme') as 'light' | 'dark';
    if (storedTheme) {
      setTheme(storedTheme);
      if (storedTheme === 'dark') document.documentElement.classList.add('dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }

    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationsEnabled(Notification.permission === 'granted');
    }

    setIsLoaded(true);
  }, []);

  // Save to local storage whenever they change
  useEffect(() => {
    if (isLoaded) {
      if (user) localStorage.setItem('habit_user', user);
      else localStorage.removeItem('habit_user');
      
      localStorage.setItem('habit_habits', JSON.stringify(habits));
      localStorage.setItem('habit_logs', JSON.stringify(Array.from(logs)));
      
      localStorage.setItem('habit_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [user, habits, logs, theme, isLoaded]);

  // Notifications logic
  useEffect(() => {
    if (isLoaded && notificationsEnabled && user) {
      // Mock reminder notification every hour while app is open
      const interval = setInterval(() => {
        const today = format(new Date(), 'yyyy-MM-dd');
        // Check if any habits are not completed today
        const uncompleted = habits.some(h => !logs.has(`${h.id}_${today}`));
        if (uncompleted) {
          new Notification("Habit Reminder", {
            body: "You have uncompleted habits for today! Keep up the consistency.",
            icon: "/favicon.ico"
          });
        }
      }, 60 * 60 * 1000); // Check every hour
      return () => clearInterval(interval);
    }
  }, [isLoaded, notificationsEnabled, user, habits, logs]);

  const login = (name: string) => setUser(name);
  const logout = () => {
    setUser(null);
    setHabits([]);
    setLogs(new Set());
    localStorage.removeItem('habit_habits');
    localStorage.removeItem('habit_logs');
  };

  const addHabit = (name: string, category: Category) => {
    const newHabit: Habit = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      category,
      createdAt: new Date().toISOString(),
    };
    setHabits([...habits, newHabit]);
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id));
    // Optional: cleanup logs, though leaving them won't hurt much
  };

  const toggleLog = (habitId: string, date: string) => {
    const key = `${habitId}_${date}`;
    const newLogs = new Set(logs);
    if (newLogs.has(key)) {
      newLogs.delete(key);
    } else {
      newLogs.add(key);
    }
    setLogs(newLogs);
  };

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const requestNotificationPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === 'granted');
      if (permission === 'granted') {
        new Notification("Notifications Enabled!", {
          body: "We'll remind you to complete your habits.",
        });
      }
    }
  };

  return (
    <HabitContext.Provider value={{
      user, login, logout,
      habits, addHabit, deleteHabit,
      logs, toggleLog,
      theme, toggleTheme,
      isLoaded,
      requestNotificationPermission, notificationsEnabled
    }}>
      {children}
    </HabitContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
}
