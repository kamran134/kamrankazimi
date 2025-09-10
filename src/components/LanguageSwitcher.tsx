'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { languages } from '@/lib/i18n';

export function LanguageSwitcher() {
  const { lang, changeLanguage } = useLanguage();
  return (
    <div className="flex gap-2">
      {Object.entries(languages).map(([key, label]) => (
        <button
          key={key}
          className={`px-2 py-1 rounded ${lang === key ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          onClick={() => changeLanguage(key as keyof typeof languages)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
