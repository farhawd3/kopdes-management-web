'use client';
import { createContext, useContext, useEffect, useSyncExternalStore } from 'react';
import { usePreference } from './usePreference';
export type ThemePreference = 'light' | 'dark' | 'system';
export type ColorStyle = 'lime' | 'peach' | 'lavender' | 'sage' | 'sky' | 'sand';
type Theme = 'light' | 'dark';

export const COLOR_STYLES: {
  id: ColorStyle;
  name: string;
  primary: string;
  soft: string;
  desc: string;
}[] = [
  {
    id: 'lime',
    name: 'Lime & arang',
    primary: '#CEDD86',
    soft: '#f7fde8',
    desc: 'Hijau lembut dengan teks gelap',
  },
  {
    id: 'peach',
    name: 'Peach',
    primary: '#ed7d3d',
    soft: '#fff3ec',
    desc: 'Terakota hangat dan krem',
  },
  {
    id: 'lavender',
    name: 'Lavender',
    primary: '#8b7ad0',
    soft: '#f4f1fd',
    desc: 'Ungu lembut & indigo elegan',
  },
  {
    id: 'sage',
    name: 'Sage',
    primary: '#4b8f62',
    soft: '#eef7f2',
    desc: 'Hijau daun lembut & natural',
  },
  {
    id: 'sand',
    name: 'Pasir',
    primary: '#B89C76',
    soft: '#F8F3EB',
    desc: 'Cokelat lembut dan putih hangat',
  },
  {
    id: 'sky',
    name: 'Sky',
    primary: '#4295e4',
    soft: '#f0f7fe',
    desc: 'Biru pastel sejuk & bersih',
  },
];

const ThemeContext = createContext<{
  theme: Theme;
  preference: ThemePreference;
  setTheme: (value: ThemePreference) => void;
  toggleTheme: () => void;
  colorStyle: ColorStyle;
  setColorStyle: (style: ColorStyle) => void;
}>({
  theme: 'light',
  preference: 'system',
  setTheme: () => {},
  toggleTheme: () => {},
  colorStyle: 'lime',
  setColorStyle: () => {},
});

function subscribe(callback: () => void) {
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [density] = usePreference('hub-density', 'comfortable');
  const [motion] = usePreference('hub-motion', 'system');
  const [navStyle] = usePreference('hub-nav-style', 'soft');
  useEffect(() => {
    document.documentElement.dataset.density = density === 'compact' ? 'compact' : 'comfortable';
    document.documentElement.dataset.motion = motion === 'minimal' ? 'minimal' : 'system';
    document.documentElement.dataset.navStyle = navStyle === 'ink' ? 'ink' : 'soft';
  }, [density, motion, navStyle]);
  const [stored, setStored] = usePreference('hub-theme', 'system');
  const [storedColor, setStoredColor] = usePreference('hub-color-style', 'lime');
  const preference: ThemePreference = stored === 'light' || stored === 'dark' ? stored : 'system';
  const colorStyle: ColorStyle = ['lime', 'peach', 'lavender', 'sage', 'sky', 'sand'].includes(
    storedColor,
  )
    ? (storedColor as ColorStyle)
    : 'lime';

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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme-color', colorStyle);
  }, [colorStyle]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        preference,
        setTheme: setStored,
        toggleTheme: () => setStored(theme === 'dark' ? 'light' : 'dark'),
        colorStyle,
        setColorStyle: (style: ColorStyle) => setStoredColor(style),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
export const useTheme = () => useContext(ThemeContext);
