'use client';
import { createContext, useContext, useEffect, useSyncExternalStore } from 'react';
import { usePreference } from './usePreference';
export type ThemePreference = 'light' | 'dark' | 'system';
type Theme = 'light' | 'dark';
const ThemeContext = createContext<{
  theme: Theme;
  preference: ThemePreference;
  setTheme: (value: ThemePreference) => void;
  toggleTheme: () => void;
}>({ theme: 'light', preference: 'system', setTheme: () => {}, toggleTheme: () => {} });
function subscribe(callback: () => void) {
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [stored, setStored] = usePreference('hub-theme', 'system');
  const preference: ThemePreference = stored === 'light' || stored === 'dark' ? stored : 'system';
  const systemDark = useSyncExternalStore(
    subscribe,
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
    () => false,
  );
  const theme: Theme = preference === 'system' ? (systemDark ? 'dark' : 'light') : preference;
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  }, [theme]);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        preference,
        setTheme: setStored,
        toggleTheme: () => setStored(theme === 'dark' ? 'light' : 'dark'),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
export const useTheme = () => useContext(ThemeContext);
