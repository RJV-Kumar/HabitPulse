import type {Metadata} from 'next';
import './globals.css';
import { HabitProvider } from '@/lib/HabitContext';

export const metadata: Metadata = {
  title: 'HabitPulse',
  description: 'Track daily habits and routines with GitHub-style contribution graphs and analytics.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 font-sans antialiased min-h-screen selection:bg-rose-500/30 transition-colors duration-200">
        <HabitProvider>
          {children}
        </HabitProvider>
      </body>
    </html>
  );
}
