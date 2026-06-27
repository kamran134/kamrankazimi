'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/lib/LanguageContext';
import { getText } from '@/lib/i18n';

export function SiteControls() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/login')) {
    return null;
  }

  const navLinks = [
    { slide: 1, label: getText({ az: 'Haqqımda', ru: 'Обо мне', en: 'About' }, lang) },
    { slide: 3, label: getText({ az: 'Təcrübə', ru: 'Опыт', en: 'Experience' }, lang) },
    { slide: 4, label: getText({ az: 'Layihələr', ru: 'Проекты', en: 'Projects' }, lang) },
    { slide: 5, label: getText({ az: 'Əlaqə', ru: 'Контакт', en: 'Contact' }, lang) },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontWeight: 600,
            fontSize: '18px',
            letterSpacing: '0.021em',
            color: '#ffffff',
            textDecoration: 'none',
          }}
        >
          KK
        </Link>

        {/* Nav links — hidden on mobile */}
        <div
          className="hidden md:flex"
          style={{ gap: '32px', alignItems: 'center' }}
        >
          {navLinks.map(link => (
            <NavLink key={link.slide} onClick={() => window.dispatchEvent(new CustomEvent('slide:go', { detail: link.slide }))}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <LanguageSwitcher />
          <a
            href="/api/cv/download"
            style={{
              background: '#8052ff',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '24px',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {getText({ az: 'CV Yüklə', ru: 'Скачать CV', en: 'Download CV' }, lang)}
          </a>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 400,
        letterSpacing: '0.021em',
        color: '#9a9a9a',
        transition: 'color 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; }}
      onMouseLeave={e => { e.currentTarget.style.color = '#9a9a9a'; }}
    >
      {children}
    </button>
  );
}
