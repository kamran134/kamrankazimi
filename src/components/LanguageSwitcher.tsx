'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { languages } from '@/lib/i18n';

export function LanguageSwitcher() {
  const { lang, changeLanguage } = useLanguage();
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {Object.entries(languages).map(([key, label]) => {
        const active = lang === key;
        return (
          <button
            key={key}
            onClick={() => changeLanguage(key as keyof typeof languages)}
            style={{
              padding: '6px 12px',
              borderRadius: '24px',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              border: active ? 'none' : '1px solid rgba(255,255,255,0.15)',
              background: active ? '#8052ff' : 'transparent',
              color: '#ffffff',
              fontFamily: 'var(--font-acronym)',
              transition: 'all 0.2s',
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
