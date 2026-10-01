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
  companion: string;
  soft: string;
  canvas: string;
  desc: string;
}[] = [
  {
    id: 'lime',
    name: 'Lime & Ink (Bawaan)',
    primary: '#CEDD86',
    companion: '#B5A8D6',
    soft: '#f1f5e0',
    canvas: '#F6F7F3',
    desc: 'Hijau lembut dengan teks arang kontras',
  },
  {
    id: 'sage',
    name: 'Sage',
    primary: '#759887',
    companion: '#DCCDB5',
    soft: '#e7efe9',
    canvas: '#F4F6F2',
    desc: 'Hijau herbal sejuk & aksen pasir',
  },
  {
    id: 'lavender',
    name: 'Lavender',
    primary: '#9688BF',
    companion: '#A9BBCB',
    soft: '#ece8f7',
    canvas: '#F7F5FA',
    desc: 'Ungu lembut & biru abu elegan',
  },
  {
    id: 'peach',
    name: 'Peach',
    primary: '#C98267',
    companion: '#E8D6B8',
    soft: '#faeae3',
    canvas: '#FBF6F1',
    desc: 'Terakota hangat & krem natural',
  },
  {
    id: 'sky',
    name: 'Sky',
    primary: '#628BAA',
    companion: '#ADD1C2',
    soft: '#e3eef6',
    canvas: '#F3F7FA',
    desc: 'Biru danau sejuk & mint bersih',
  },
  {
    id: 'sand',
    name: 'Pasir',
    primary: '#B89C76',
    companion: '#9CB0A3',
    soft: '#F4ECE1',
    canvas: '#F8F5EF',
    desc: 'Cokelat kayu lembut & putih hangat',
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
