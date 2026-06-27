'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { getText } from '@/lib/i18n';
import { useContent } from '@/lib/useContent';
import type { HeroContent, AboutContent, Project, Skill, ContactInfo, Experience, Education, Language as LangItem, SiteSettings } from '@/types/content';
import type { Language } from '@/lib/i18n';
import ParticleCanvas from '@/components/ParticleCanvas';
import ContactForm from '@/components/ContactForm';

// ─── config ───────────────────────────────────────────────────────────────────

const SLIDE_COUNT = 6;
const TRANSITION_LOCK_MS = 1100;

const SLIDE_HASHES: Record<string, number> = {
  '#hero': 0, '#about': 1, '#skills': 2,
  '#experience': 3, '#projects': 4, '#contact': 5,
};

// ─── style tokens ─────────────────────────────────────────────────────────────

const eyebrow: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#8052ff',
  marginBottom: '14px',
};

const heading: React.CSSProperties = {
  fontWeight: 200,
  fontSize: 'clamp(38px, 4.5vw, 60px)',
  lineHeight: 1.0,
  letterSpacing: '-0.04em',
  color: '#ffffff',
  marginBottom: '20px',
};

const bodyText: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: 1.68,
  letterSpacing: '0.022em',
  color: '#bdbdbd',
};

const card: React.CSSProperties = {
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '20px',
  padding: '20px 22px',
};

const pill: React.CSSProperties = {
  border: '1px solid rgba(128,82,255,0.35)',
  color: '#bdbdbd',
  padding: '4px 14px',
  borderRadius: '24px',
  fontSize: '12px',
  fontWeight: 400,
  letterSpacing: '0.021em',
};

// ─── shared content bundle ────────────────────────────────────────────────────

interface ContentBundle {
  hero: HeroContent | null;
  about: AboutContent | null;
  projects: Project[];
  skills: Skill[];
  contact: ContactInfo | null;
  experiences: Experience[];
  education: Education[];
  languages: LangItem[];
  settings: SiteSettings | null;
  loading: boolean;
  lang: Language;
}

// ─── slide content components ─────────────────────────────────────────────────

function HeroSlide({ d }: { d: ContentBundle }) {
  if (d.loading || !d.hero) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 480 }}>
        {[200, 320, 240, 44].map((w, i) => (
          <div key={i} style={{ height: i === 1 ? 72 : i === 2 ? 52 : 14, width: w, maxWidth: '100%', background: 'rgba(255,255,255,0.06)', borderRadius: 6, animation: 'pulse 1.5s ease-in-out infinite' }} />
        ))}
      </div>
    );
  }
  const { hero, lang } = d;
  return (
    <div className="slide-glass" style={{ maxWidth: 500 }}>
      <span style={eyebrow}>{getText({ az: hero.subtitleAz, ru: hero.subtitleRu, en: hero.subtitleEn }, lang)}</span>
      <h1 style={{ fontWeight: 200, fontSize: 'clamp(52px, 6.5vw, 78px)', lineHeight: 0.9, letterSpacing: '-0.04em', color: '#fff', marginBottom: 24 }}>
        {getText({ az: hero.titleAz, ru: hero.titleRu, en: hero.titleEn }, lang)}
      </h1>
      <p style={{ ...bodyText, maxWidth: '54ch', marginBottom: 36 }}>
        {getText({ az: hero.descAz, ru: hero.descRu, en: hero.descEn }, lang)}
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('slide:go', { detail: 4 }))}
          style={{ background: '#8052ff', color: '#fff', padding: '13px 24px', borderRadius: 24, fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
        >
          {getText({ az: 'Layihələr', ru: 'Проекты', en: 'Projects' }, lang)}
        </button>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('slide:go', { detail: 5 }))}
          style={{ border: '1px solid rgba(255,255,255,0.22)', color: '#fff', padding: '13px 24px', borderRadius: 24, fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', background: 'transparent', cursor: 'pointer' }}
        >
          {getText({ az: 'Əlaqə', ru: 'Контакт', en: 'Contact' }, lang)}
        </button>
      </div>
    </div>
  );
}

function AboutSlide({ d }: { d: ContentBundle }) {
  const { about, lang } = d;
  return (
    <div className="slide-glass" style={{ maxWidth: 520, marginLeft: 'auto' }}>
      <span style={eyebrow}>{getText({ az: 'Haqqımda', ru: 'Обо мне', en: 'About' }, lang)}</span>
      <h2 style={heading}>
        {about?.titleAz
          ? getText({ az: about.titleAz, ru: about.titleRu, en: about.titleEn }, lang)
          : getText({ az: 'Haqqımda', ru: 'Обо мне', en: 'About Me' }, lang)}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          about?.para1Az ? getText({ az: about.para1Az, ru: about.para1Ru, en: about.para1En }, lang) : getText({ az: '7+ il əməli təcrübəyə malik Frontend Developer.', ru: 'Frontend разработчик с 7+ годами опыта.', en: 'Frontend Developer with 7+ years of hands-on experience.' }, lang),
          about?.para2Az ? getText({ az: about.para2Az, ru: about.para2Ru, en: about.para2En }, lang) : null,
          about?.para3Az ? getText({ az: about.para3Az, ru: about.para3Ru, en: about.para3En }, lang) : null,
        ].filter(Boolean).map((para, i) => (
          <p key={i} style={bodyText}>{para}</p>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
        {['React.js', 'TypeScript', 'Next.js', 'Redux Toolkit', 'React Native'].map(s => (
          <span key={s} style={pill}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function SkillsSlide({ d }: { d: ContentBundle }) {
  const { skills, lang } = d;
  const defaultCats = [
    { name: 'Frontend', text: 'React.js, Next.js, TypeScript, Redux Toolkit, Angular 2+, Tailwind CSS, HTML5, SCSS' },
    { name: 'Testing & Tools', text: 'Jest, React Testing Library, Git, GitLab CI/CD, Docker, Webpack, Vite, Figma' },
    { name: 'Backend & APIs', text: 'REST APIs, GraphQL, ASP .Net Core, Spring Boot, PostgreSQL' },
    { name: 'Mobile', text: 'React Native, Windows Forms (C#)' },
    { name: 'Process', text: 'Agile (Scrum/Kanban), Code Review, CI/CD' },
  ];
  const cats = skills.length > 0
    ? ['Frontend', 'Testing & Tools', 'Backend & APIs', 'Mobile & Desktop', 'Additional skills']
        .map(name => ({ name, text: skills.filter(s => s.category === name).map(s => s.name).join(', ') }))
        .filter(c => c.text)
    : defaultCats;

  return (
    <div style={{ maxWidth: 780, margin: '0 auto', width: '100%' }}>
      <span style={eyebrow}>{getText({ az: 'Bacarıqlar', ru: 'Навыки', en: 'Skills' }, lang)}</span>
      <h2 style={heading}>{getText({ az: 'Texniki Bacarıqlar', ru: 'Технические навыки', en: 'Technical Skills' }, lang)}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
        {cats.map(cat => (
          <div key={cat.name} style={card}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#8052ff', marginBottom: 8 }}>{cat.name}</p>
            <p style={{ ...bodyText, fontSize: 13, lineHeight: 1.6 }}>{cat.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceSlide({ d }: { d: ContentBundle }) {
  const { experiences, education, languages, lang } = d;
  return (
    <div style={{ maxWidth: 740, margin: '0 auto', width: '100%' }}>
      <span style={eyebrow}>{getText({ az: 'İş Təcrübəsi', ru: 'Опыт работы', en: 'Experience' }, lang)}</span>
      <h2 style={heading}>{getText({ az: 'Peşəkar Yol', ru: 'Профессиональный путь', en: 'Professional Journey' }, lang)}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {experiences.length > 0 ? (
          experiences.slice(0, 3).map(exp => (
            <div key={exp.id} style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: '#fff', letterSpacing: '0.021em', marginBottom: 2 }}>
                    {getText({ az: exp.positionAz, ru: exp.positionRu, en: exp.positionEn }, lang)}
                  </h3>
                  <p style={{ fontSize: 13, color: '#8052ff' }}>
                    {getText({ az: exp.companyAz, ru: exp.companyRu, en: exp.companyEn }, lang)}
                  </p>
                </div>
                <span style={{ fontSize: 11, color: '#9a9a9a', whiteSpace: 'nowrap' }}>
                  {getText({ az: exp.periodAz, ru: exp.periodRu, en: exp.periodEn }, lang)}
                </span>
              </div>
              <p style={{ ...bodyText, fontSize: 13, lineHeight: 1.55 }}>
                {getText({ az: exp.responsibilitiesAz, ru: exp.responsibilitiesRu, en: exp.responsibilitiesEn }, lang)
                  .split('\n').filter(Boolean).slice(0, 2).join(' · ')}
              </p>
            </div>
          ))
        ) : (
          <p style={{ color: '#9a9a9a' }}>{getText({ az: 'Məlumat yoxdur', ru: 'Нет данных', en: 'No data' }, lang)}</p>
        )}
      </div>
      {education.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <span style={{ ...eyebrow, color: '#15846e' }}>{getText({ az: 'Təhsil', ru: 'Образование', en: 'Education' }, lang)}</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {education.map(edu => (
              <div key={edu.id} style={{ ...card, border: '1px solid rgba(21,132,110,0.25)', minWidth: 200, flex: 1 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 2 }}>
                  {getText({ az: edu.degreeAz, ru: edu.degreeRu, en: edu.degreeEn }, lang)}
                </h4>
                <p style={{ fontSize: 13, color: '#15846e', marginBottom: 2 }}>
                  {getText({ az: edu.institutionAz, ru: edu.institutionRu, en: edu.institutionEn }, lang)}
                </p>
                <p style={{ fontSize: 11, color: '#9a9a9a' }}>{edu.year}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {languages.length > 0 && (
        <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {languages.map(l => (
            <span key={l.id} style={{ ...pill, border: '1px solid rgba(255,255,255,0.1)' }}>
              {getText({ az: l.languageAz, ru: l.languageRu, en: l.languageEn }, lang)}{': '}
              {getText({ az: l.proficiencyAz, ru: l.proficiencyRu, en: l.proficiencyEn }, lang)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectsSlide({ d }: { d: ContentBundle }) {
  const { projects, lang } = d;
  const fallback = [
    { id: 'a', titleAz: 'Dövlət İmtahan Sistemi', titleRu: 'Государственная экзаменационная система', titleEn: 'State Examination System', descAz: 'React, TypeScript, Redux Toolkit ilə geniş platforma', descRu: 'Крупная платформа с React, TypeScript, Redux', descEn: 'Large-scale platform with React, TypeScript, Redux Toolkit', techStack: 'React, TypeScript, ASP.NET Core', githubUrl: '', liveUrl: '', imageUrl: '', featured: true },
    { id: 'b', titleAz: 'Biznes Portalları', titleRu: 'Бизнес-порталы', titleEn: 'Business Portals', descAz: 'React Native ilə mobil həllər', descRu: 'Мобильные решения с React Native', descEn: 'Mobile solutions with React Native', techStack: 'React, React Native, Strapi', githubUrl: '', liveUrl: '', imageUrl: '', featured: true },
    { id: 'c', titleAz: 'İnteryer Dizaynı Platforması', titleRu: 'Платформа дизайна интерьеров', titleEn: 'Interior Design Platform', descAz: 'Fullstack e-commerce həll', descRu: 'Fullstack e-commerce решение', descEn: 'Fullstack e-commerce solution', techStack: 'React, Angular, Spring Boot', githubUrl: '', liveUrl: '', imageUrl: '', featured: true },
  ] as Project[];

  const items = (projects.length > 0 ? projects.filter(p => p.featured).slice(0, 3) : fallback);

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', width: '100%' }}>
      <span style={eyebrow}>{getText({ az: 'Layihələr', ru: 'Проекты', en: 'Projects' }, lang)}</span>
      <h2 style={heading}>{getText({ az: 'Seçilmiş İşlər', ru: 'Избранные работы', en: 'Selected Work' }, lang)}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 14 }}>
        {items.map(project => (
          <div key={project.id} style={{ ...card, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ height: 80, borderRadius: 14, border: '1px solid rgba(128,82,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8052ff', fontWeight: 200, fontSize: 24, letterSpacing: '-0.04em' }}>
              {(getText({ az: project.titleAz, ru: project.titleRu, en: project.titleEn }, lang) as string).substring(0, 3).toUpperCase()}
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>
              {getText({ az: project.titleAz, ru: project.titleRu, en: project.titleEn }, lang)}
            </h3>
            <p style={{ ...bodyText, fontSize: 13, lineHeight: 1.55, color: '#9a9a9a' }}>
              {getText({ az: project.descAz, ru: project.descRu, en: project.descEn }, lang)}
            </p>
            {project.techStack && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
                {project.techStack.split(',').map((t, i) => (
                  <span key={i} style={{ ...pill, fontSize: 11, padding: '3px 10px', border: '1px solid rgba(255,255,255,0.1)', color: '#9a9a9a' }}>{t.trim()}</span>
                ))}
              </div>
            )}
            {(project.githubUrl || project.liveUrl) && (
              <div style={{ display: 'flex', gap: 14 }}>
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: '#8052ff', textDecoration: 'none' }}>GitHub →</a>}
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: '#8052ff', textDecoration: 'none' }}>Live →</a>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactSlide({ d }: { d: ContentBundle }) {
  const { contact, settings, lang } = d;
  return (
    <div className="slide-glass" style={{ maxWidth: 500 }}>
      <span style={eyebrow}>{getText({ az: 'Əlaqə', ru: 'Контакт', en: 'Contact' }, lang)}</span>
      <h2 style={heading}>{getText({ az: 'Əlaqə Saxlayaq', ru: 'Свяжитесь со мной', en: "Let's Connect" }, lang)}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
        <ContactRow href={`mailto:${contact?.email || 'kazimi.dev@gmail.com'}`} label={contact?.email || 'kazimi.dev@gmail.com'} icon={emailIcon} />
        {contact?.phone && <ContactRow href={`tel:${contact.phone}`} label={contact.phone} icon={phoneIcon} />}
        {contact?.linkedin && <ContactRow href={contact.linkedin} label={contact.linkedin.replace('https://', '')} icon={linkedinIcon} external />}
        {contact?.github && <ContactRow href={contact.github} label={contact.github.replace('https://', '')} icon={githubIcon} external />}
        {contact?.telegram && <ContactRow href={`https://t.me/${contact.telegram.replace('@', '')}`} label={contact.telegram} icon={telegramIcon} external />}
      </div>
      <div style={card}>
        <ContactForm />
      </div>
      <p style={{ fontSize: 12, color: '#9a9a9a', marginTop: 28 }}>
        © {settings?.copyrightYear || new Date().getFullYear()} Kamran Kazimi.{' '}
        {settings
          ? getText({ az: settings.footerTextAz, ru: settings.footerTextRu, en: settings.footerTextEn }, lang)
          : getText({ az: 'Bütün hüquqlar qorunur.', ru: 'Все права защищены.', en: 'All rights reserved.' }, lang)}
      </p>
    </div>
  );
}

// ─── contact row ──────────────────────────────────────────────────────────────

function ContactRow({ href, label, icon, external }: { href: string; label: string; icon: React.ReactNode; external?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 36, height: 36, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} style={{ fontSize: 14, color: '#bdbdbd', textDecoration: 'none' }}>{label}</a>
    </div>
  );
}

const emailIcon = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8052ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const phoneIcon = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8052ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.62 4.38 2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l1.68-1.68a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const linkedinIcon = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8052ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
const githubIcon = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8052ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>;
const telegramIcon = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8052ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;

// ─── slide layout config ──────────────────────────────────────────────────────

type ContentSide = 'left' | 'right' | 'center';

interface SlideConfig {
  id: string;
  contentSide: ContentSide;
  overlay: 'directional' | 'scattered';
  render: (d: ContentBundle) => React.ReactNode;
}

const SLIDES: SlideConfig[] = [
  { id: 'hero',       contentSide: 'left',   overlay: 'directional', render: d => <HeroSlide d={d} /> },
  { id: 'about',      contentSide: 'right',  overlay: 'directional', render: d => <AboutSlide d={d} /> },
  { id: 'skills',     contentSide: 'center', overlay: 'scattered',   render: d => <SkillsSlide d={d} /> },
  { id: 'experience', contentSide: 'center', overlay: 'scattered',   render: d => <ExperienceSlide d={d} /> },
  { id: 'projects',   contentSide: 'center', overlay: 'scattered',   render: d => <ProjectsSlide d={d} /> },
  { id: 'contact',    contentSide: 'left',   overlay: 'directional', render: d => <ContactSlide d={d} /> },
];

// ─── page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const { lang } = useLanguage();
  const { hero, about, projects, skills, contact, experiences, education, languages, settings, loading } = useContent();

  const [slideIndex, setSlideIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const lockRef = useRef(false);
  const touchStartY = useRef(0);
  // Ref to the inner scroll container — used for boundary detection
  const contentScrollRef = useRef<HTMLDivElement>(null);

  // Lock page scroll only while this component is mounted (home page only).
  // Unmount restores scroll so /dashboard and other routes are unaffected.
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prev;
      document.body.style.overflow = '';
    };
  }, []);

  const content: ContentBundle = { hero, about, projects, skills, contact, experiences, education, languages, settings, loading, lang };

  const goToSlide = useCallback((next: number) => {
    if (lockRef.current) return;
    if (next < 0 || next >= SLIDE_COUNT || next === slideIndex) return;
    lockRef.current = true;
    setVisible(false);
    setTimeout(() => {
      setSlideIndex(next);
      setVisible(true);
      // Reset inner scroll to top when entering new slide
      if (contentScrollRef.current) contentScrollRef.current.scrollTop = 0;
      setTimeout(() => { lockRef.current = false; }, TRANSITION_LOCK_MS - 280);
    }, 280);
  }, [slideIndex]);

  const advance = useCallback((dir: 1 | -1) => goToSlide(slideIndex + dir), [slideIndex, goToSlide]);

  // Returns true when the inner scroll container has reached its boundary
  // in the given direction, meaning we can advance to the next slide.
  const atScrollBoundary = useCallback((down: boolean): boolean => {
    const el = contentScrollRef.current;
    if (!el) return true;
    // Content fits entirely — no inner scroll needed
    if (el.scrollHeight <= el.clientHeight + 4) return true;
    if (down) return el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
    return el.scrollTop <= 4;
  }, []);

  // wheel — only hijack when inner content is at its scroll boundary
  useEffect(() => {
    let accum = 0;
    const onWheel = (e: WheelEvent) => {
      const down = e.deltaY > 0;
      if (!atScrollBoundary(down)) {
        // Inner content still has room — let the browser scroll it naturally
        accum = 0;
        return;
      }
      e.preventDefault();
      accum += e.deltaY;
      if (Math.abs(accum) >= 60) { advance(accum > 0 ? 1 : -1); accum = 0; }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [advance, atScrollBoundary]);

  // touch — same boundary logic
  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => {
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 50) {
        const down = dy > 0;
        if (atScrollBoundary(down)) advance(down ? 1 : -1);
      }
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => { window.removeEventListener('touchstart', onStart); window.removeEventListener('touchend', onEnd); };
  }, [advance, atScrollBoundary]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') advance(1);
      if (e.key === 'ArrowUp' || e.key === 'PageUp') advance(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [advance]);

  // hash nav (from SiteControls links) + custom event
  useEffect(() => {
    const onHash = () => {
      const idx = SLIDE_HASHES[window.location.hash];
      if (idx !== undefined) goToSlide(idx);
    };
    const onCustom = (e: Event) => goToSlide((e as CustomEvent<number>).detail);
    window.addEventListener('hashchange', onHash);
    window.addEventListener('slide:go', onCustom);
    return () => { window.removeEventListener('hashchange', onHash); window.removeEventListener('slide:go', onCustom); };
  }, [goToSlide]);

  const slide = SLIDES[slideIndex];

  const overlayBg = slide.overlay === 'directional'
    ? slide.contentSide === 'left'
      ? 'linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.76) 38%, rgba(0,0,0,0.22) 68%, transparent 100%)'
      : 'linear-gradient(270deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.76) 38%, rgba(0,0,0,0.22) 68%, transparent 100%)'
    : 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.84) 100%)';

  const contentJustify: React.CSSProperties['justifyContent'] =
    slide.contentSide === 'left' ? 'flex-start' : slide.contentSide === 'right' ? 'flex-end' : 'center';

  return (
    <>
      {/* Particle canvas — fixed, persists across slides */}
      <ParticleCanvas slideIndex={slideIndex} />

      {/* Gradient overlay */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', background: overlayBg, transition: 'background 0.6s ease' }} />

      {/* Slide content */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 10, display: 'flex', alignItems: 'center', paddingTop: 64 }}>
        <div className="slide-container" style={{ maxWidth: 1200, width: '100%', margin: '0 auto', padding: '0 48px', display: 'flex', justifyContent: contentJustify }}>
          <div
            ref={contentScrollRef}
            style={{
              transition: 'opacity 0.28s ease, transform 0.28s ease',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0px)' : 'translateY(20px)',
              width: '100%',
              maxHeight: 'calc(100vh - 140px)',
              overflowY: 'auto',
              scrollbarWidth: 'none',
            }}
          >
            {slide.render(content)}
          </div>
        </div>
      </div>

      {/* Slide progress dots — right edge */}
      <div style={{ position: 'fixed', right: 24, top: '50%', transform: 'translateY(-50%)', zIndex: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goToSlide(i)}
            title={s.id}
            style={{
              width: i === slideIndex ? 5 : 4,
              height: i === slideIndex ? 22 : 4,
              borderRadius: 8,
              background: i === slideIndex ? '#8052ff' : 'rgba(255,255,255,0.22)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          />
        ))}
      </div>

      {/* Slide counter — bottom left */}
      <div style={{ position: 'fixed', bottom: 28, left: 48, zIndex: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>
          {String(slideIndex + 1).padStart(2, '0')} / {String(SLIDE_COUNT).padStart(2, '0')}
        </span>
        <div style={{ width: 36, height: 1, background: 'rgba(255,255,255,0.1)' }} />
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8052ff', opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}>
          {slide.id}
        </span>
      </div>

      {/* Scroll hint — first slide only */}
      {slideIndex === 0 && visible && (
        <div style={{ position: 'fixed', bottom: 28, right: 48, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.35 }}>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>scroll</span>
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
            <rect x="1" y="1" width="10" height="18" rx="5" stroke="white" strokeWidth="1.2"/>
            <circle cx="6" cy="6" r="1.5" fill="white">
              <animate attributeName="cy" values="6;12;6" dur="1.8s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
      )}
    </>
  );
}
