import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { createElement, type ReactNode } from 'react';

type ThemeMode = 'auto' | 'light' | 'dark';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextValue {
  mode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
  cycle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'theme';
const CYCLE_ORDER: ThemeMode[] = ['auto', 'light', 'dark'];

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolve(mode: ThemeMode): ResolvedTheme {
  return mode === 'auto' ? getSystemTheme() : mode;
}

function applyClass(resolved: ResolvedTheme) {
  document.documentElement.classList.toggle('dark', resolved === 'dark');
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored === 'light' || stored === 'dark') ? stored : 'auto';
  });

  const [resolvedTheme, setResolved] = useState<ResolvedTheme>(() => resolve(mode));

  const setMode = useCallback((m: ThemeMode) => {
    if (m === 'auto') localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, m);
    setModeState(m);
    const r = resolve(m);
    setResolved(r);
    applyClass(r);
  }, []);

  const cycle = useCallback(() => {
    const i = CYCLE_ORDER.indexOf(mode);
    setMode(CYCLE_ORDER[(i + 1) % CYCLE_ORDER.length]);
  }, [mode, setMode]);

  // Apply on mount
  useEffect(() => { applyClass(resolvedTheme); }, []);

  // Listen to system theme changes (only matters when mode === 'auto')
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (mode === 'auto') {
        const r = getSystemTheme();
        setResolved(r);
        applyClass(r);
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [mode]);

  return createElement(ThemeContext.Provider, { value: { mode, resolvedTheme, setMode, cycle } }, children);
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
