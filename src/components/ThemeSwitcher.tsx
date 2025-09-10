'use client';

import { useTheme } from '@/lib/ThemeContext';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '🌞 Light' : '🌙 Dark'}
    </button>
  );
}
