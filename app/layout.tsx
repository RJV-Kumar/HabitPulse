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
      <body className="bg-[#0a0a0a] text-slate-100 font-sans antialiased min-h-screen selection:bg-emerald-500/30">
        <HabitProvider>
          {children}
        </HabitProvider>
      </body>
    </html>
  );
}
