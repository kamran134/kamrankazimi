'use client';

import { useState, useEffect } from 'react';
import { Language, defaultLanguage, languages } from '@/lib/i18n';

export function useLanguage() {
  const [lang, setLang] = useState<Language>(defaultLanguage);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;
    if (stored && languages[stored as Language]) {
      setLang(stored as Language);
    }
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', newLang);
    }
  };

  return { lang, changeLanguage };
}
