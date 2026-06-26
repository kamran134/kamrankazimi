'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { getText } from '@/lib/i18n';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { useContent } from '@/lib/useContent';
import ParticleConstellationBackground from '@/components/ParticleConstellationBackground';
import ContactForm from '@/components/ContactForm';

const CONTAINER = 'max-w-[1200px] mx-auto px-6';
const SECTION = 'py-24';

const card: React.CSSProperties = {
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '24px',
  padding: '24px',
};

const eyebrow: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: '#8052ff',
  display: 'block',
  marginBottom: '12px',
};

const sectionTitle: React.CSSProperties = {
  fontWeight: 200,
  fontSize: 'clamp(36px, 4vw, 48px)',
  lineHeight: 1.05,
  letterSpacing: '-0.04em',
  color: '#ffffff',
  marginBottom: '60px',
};

const sectionDivider: React.CSSProperties = {
  borderTop: '1px solid rgba(255,255,255,0.06)',
};

export default function Home() {
  const { lang } = useLanguage();
  const { hero, about, projects, skills, contact, experiences, education, languages, settings, loading } = useContent();
  useScrollAnimation();

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ minHeight: '100vh' }}>
        <ParticleConstellationBackground />

        {/* gradient: text readable on left, particles show on right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 42%, rgba(0,0,0,0.2) 72%, transparent 100%)',
          }}
        />

        <div
          className="relative flex items-center w-full"
          style={{ minHeight: '100vh', paddingTop: '64px' }}
        >
          <div className={`${CONTAINER} w-full`}>
            {loading ? (
              <div className="max-w-[520px]" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[160, 280, 200, 44].map((w, i) => (
                  <div
                    key={i}
                    style={{
                      height: i === 1 ? '80px' : i === 2 ? '60px' : '14px',
                      width: i === 3 ? '240px' : `${w}px`,
                      maxWidth: '100%',
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: '6px',
                      animation: 'pulse 1.5s ease-in-out infinite',
                    }}
                  />
                ))}
              </div>
            ) : hero ? (
              <div className="max-w-[520px]">
                <span className="animate-fade-in-up" style={eyebrow}>
                  {getText({ az: hero.subtitleAz, ru: hero.subtitleRu, en: hero.subtitleEn }, lang)}
                </span>

                <h1
                  className="animate-fade-in-up animation-delay-200"
                  style={{
                    fontWeight: 200,
                    fontSize: 'clamp(52px, 6.5vw, 78px)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.04em',
                    color: '#ffffff',
                    marginBottom: '24px',
                  }}
                >
                  {getText({ az: hero.titleAz, ru: hero.titleRu, en: hero.titleEn }, lang)}
                </h1>

                <p
                  className="animate-fade-in-up animation-delay-400"
                  style={{
                    fontSize: '15px',
                    fontWeight: 400,
                    lineHeight: 1.65,
                    letterSpacing: '0.025em',
                    color: '#bdbdbd',
                    maxWidth: '58ch',
                    marginBottom: '36px',
                  }}
                >
                  {getText({ az: hero.descAz, ru: hero.descRu, en: hero.descEn }, lang)}
                </p>

                <div
                  className="animate-fade-in-up animation-delay-600"
                  style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
                >
                  <a
                    href="#projects"
                    style={{
                      background: '#8052ff',
                      color: '#ffffff',
                      padding: '14px 24px',
                      borderRadius: '24px',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                    }}
                  >
                    {getText({ az: 'Layihələr', ru: 'Проекты', en: 'Projects' }, lang)}
                  </a>
                  <a
                    href="#contact"
                    style={{
                      border: '1px solid rgba(255,255,255,0.22)',
                      color: '#ffffff',
                      padding: '14px 24px',
                      borderRadius: '24px',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                    }}
                  >
                    {getText({ az: 'Əlaqə', ru: 'Контакты', en: 'Contact' }, lang)}
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className={SECTION} style={sectionDivider}>
        <div className={CONTAINER}>
          <div className="animate-on-scroll">
            <span style={eyebrow}>
              {getText({ az: 'Haqqımda', ru: 'Обо мне', en: 'About' }, lang)}
            </span>
            <h2 style={sectionTitle}>
              {about?.titleAz
                ? getText({ az: about.titleAz, ru: about.titleRu, en: about.titleEn }, lang)
                : getText({ az: 'Haqqımda', ru: 'Обо мне', en: 'About Me' }, lang)}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Photo */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {about?.imageUrl ? (
                  <div
                    style={{
                      width: '260px',
                      height: '260px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '1px solid rgba(128,82,255,0.35)',
                    }}
                  >
                    <img
                      src={about.imageUrl}
                      alt="Profile"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      width: '260px',
                      height: '260px',
                      borderRadius: '50%',
                      border: '1px solid rgba(128,82,255,0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '56px',
                      fontWeight: 200,
                      letterSpacing: '-0.04em',
                      color: '#8052ff',
                    }}
                  >
                    KK
                  </div>
                )}
              </div>

              {/* Text */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  about?.para1Az
                    ? getText({ az: about.para1Az, ru: about.para1Ru, en: about.para1En }, lang)
                    : getText({
                        az: '7+ il əməli təcrübəyə malik Frontend Developer.',
                        ru: 'Frontend разработчик с 7+ годами опыта.',
                        en: 'Frontend Developer with 7+ years of hands-on experience.',
                      }, lang),
                  about?.para2Az
                    ? getText({ az: about.para2Az, ru: about.para2Ru, en: about.para2En }, lang)
                    : null,
                  about?.para3Az
                    ? getText({ az: about.para3Az, ru: about.para3Ru, en: about.para3En }, lang)
                    : null,
                ]
                  .filter(Boolean)
                  .map((para, i) => (
                    <p
                      key={i}
                      style={{
                        fontSize: '15px',
                        fontWeight: 400,
                        lineHeight: 1.7,
                        letterSpacing: '0.025em',
                        color: '#bdbdbd',
                      }}
                    >
                      {para}
                    </p>
                  ))}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  {['React.js', 'TypeScript', 'Redux Toolkit', 'Next.js', 'Tailwind CSS', 'React Native'].map(s => (
                    <span
                      key={s}
                      style={{
                        border: '1px solid rgba(128,82,255,0.35)',
                        color: '#bdbdbd',
                        padding: '5px 14px',
                        borderRadius: '24px',
                        fontSize: '12px',
                        fontWeight: 400,
                        letterSpacing: '0.021em',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className={SECTION} style={sectionDivider}>
        <div className={CONTAINER}>
          <div className="animate-on-scroll">
            <span style={eyebrow}>
              {getText({ az: 'Bacarıqlar', ru: 'Навыки', en: 'Skills' }, lang)}
            </span>
            <h2 style={sectionTitle}>
              {getText({ az: 'Texniki Bacarıqlar', ru: 'Технические навыки', en: 'Technical Skills' }, lang)}
            </h2>

            {skills && skills.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  'Frontend',
                  'Testing & Tools',
                  'Backend & APIs',
                  'Mobile & Desktop',
                  'Additional skills',
                ].map(categoryName => {
                  const catSkills = skills.filter(s => s.category === categoryName);
                  if (!catSkills.length) return null;
                  return (
                    <div key={categoryName} style={card}>
                      <p
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          color: '#8052ff',
                          marginBottom: '10px',
                        }}
                      >
                        {categoryName}
                      </p>
                      <p
                        style={{
                          fontSize: '14px',
                          fontWeight: 400,
                          lineHeight: 1.7,
                          letterSpacing: '0.021em',
                          color: '#bdbdbd',
                        }}
                      >
                        {catSkills.map(s => s.name).join(', ')}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  {
                    name: 'Frontend',
                    text: 'React.js, Next.js, Vite, TypeScript, JavaScript ES6+, Redux Toolkit, Angular 2+, Tailwind CSS, Material UI, HTML5, SCSS, CSS3',
                  },
                  {
                    name: 'Testing & Tools',
                    text: 'Jest, React Testing Library, Git, GitLab CI/CD, Docker (basic), Webpack, Vite, Figma',
                  },
                  {
                    name: 'Backend & APIs',
                    text: 'REST APIs, GraphQL (basic), ASP .Net Core (basic), Spring Boot, PostgreSQL',
                  },
                  { name: 'Mobile & Desktop', text: 'React Native, Windows Forms (C#)' },
                  { name: 'Additional', text: 'Agile (Scrum/Kanban), Code Review, CI/CD' },
                ].map(cat => (
                  <div key={cat.name} style={card}>
                    <p
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        color: '#8052ff',
                        marginBottom: '10px',
                      }}
                    >
                      {cat.name}
                    </p>
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: 1.7,
                        letterSpacing: '0.021em',
                        color: '#bdbdbd',
                      }}
                    >
                      {cat.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className={SECTION} style={sectionDivider}>
        <div className={CONTAINER}>
          <div className="animate-on-scroll">
            <span style={eyebrow}>
              {getText({ az: 'İş Təcrübəsi', ru: 'Опыт работы', en: 'Experience' }, lang)}
            </span>
            <h2 style={sectionTitle}>
              {getText({ az: 'Peşəkar Yol', ru: 'Профессиональный путь', en: 'Professional Journey' }, lang)}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {experiences && experiences.length > 0 ? (
                experiences.map(exp => (
                  <div key={exp.id} style={card}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '14px',
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontSize: '17px',
                            fontWeight: 600,
                            color: '#ffffff',
                            letterSpacing: '0.021em',
                            marginBottom: '4px',
                          }}
                        >
                          {getText({ az: exp.positionAz, ru: exp.positionRu, en: exp.positionEn }, lang)}
                        </h3>
                        <p style={{ fontSize: '14px', color: '#8052ff', letterSpacing: '0.021em' }}>
                          {getText({ az: exp.companyAz, ru: exp.companyRu, en: exp.companyEn }, lang)}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '12px', color: '#9a9a9a', letterSpacing: '0.021em' }}>
                          {getText({ az: exp.periodAz, ru: exp.periodRu, en: exp.periodEn }, lang)}
                        </span>
                        <span style={{ fontSize: '12px', color: '#9a9a9a', letterSpacing: '0.021em' }}>
                          {getText({ az: exp.locationAz, ru: exp.locationRu, en: exp.locationEn }, lang)}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {getText({ az: exp.responsibilitiesAz, ru: exp.responsibilitiesRu, en: exp.responsibilitiesEn }, lang)
                        .split('\n')
                        .filter(Boolean)
                        .map((line, idx) => (
                          <p
                            key={idx}
                            style={{
                              fontSize: '14px',
                              fontWeight: 400,
                              lineHeight: 1.7,
                              letterSpacing: '0.021em',
                              color: '#bdbdbd',
                            }}
                          >
                            {line}
                          </p>
                        ))}
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: '#9a9a9a', fontSize: '15px' }}>
                  {getText({ az: 'Məlumat yoxdur', ru: 'Нет данных', en: 'No data available' }, lang)}
                </p>
              )}
            </div>

            {/* Education */}
            <div style={{ marginTop: '60px' }}>
              <span style={{ ...eyebrow, color: '#15846e' }}>
                {getText({ az: 'Təhsil', ru: 'Образование', en: 'Education' }, lang)}
              </span>

              {education && education.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {education.map(edu => (
                    <div
                      key={edu.id}
                      style={{ ...card, border: '1px solid rgba(21,132,110,0.2)' }}
                    >
                      <h4
                        style={{
                          fontSize: '15px',
                          fontWeight: 600,
                          color: '#ffffff',
                          letterSpacing: '0.021em',
                          marginBottom: '4px',
                        }}
                      >
                        {getText({ az: edu.degreeAz, ru: edu.degreeRu, en: edu.degreeEn }, lang)}
                      </h4>
                      <p style={{ fontSize: '14px', color: '#15846e', letterSpacing: '0.021em', marginBottom: '2px' }}>
                        {getText({ az: edu.institutionAz, ru: edu.institutionRu, en: edu.institutionEn }, lang)}
                      </p>
                      <p style={{ fontSize: '12px', color: '#9a9a9a', letterSpacing: '0.021em' }}>
                        {edu.year}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {languages && languages.length > 0 && (
                <div style={{ marginTop: '24px' }}>
                  <p
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      color: '#9a9a9a',
                      marginBottom: '12px',
                    }}
                  >
                    {getText({ az: 'Dillər', ru: 'Языки', en: 'Languages' }, lang)}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {languages.map(langItem => (
                      <span
                        key={langItem.id}
                        style={{
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: '#bdbdbd',
                          padding: '5px 16px',
                          borderRadius: '24px',
                          fontSize: '13px',
                          fontWeight: 400,
                          letterSpacing: '0.021em',
                        }}
                      >
                        {getText({ az: langItem.languageAz, ru: langItem.languageRu, en: langItem.languageEn }, lang)}
                        {': '}
                        {getText({ az: langItem.proficiencyAz, ru: langItem.proficiencyRu, en: langItem.proficiencyEn }, lang)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className={SECTION} style={sectionDivider}>
        <div className={CONTAINER}>
          <div className="animate-on-scroll">
            <span style={eyebrow}>
              {getText({ az: 'Layihələr', ru: 'Проекты', en: 'Projects' }, lang)}
            </span>
            <h2 style={sectionTitle}>
              {getText({ az: 'Seçilmiş İşlər', ru: 'Избранные работы', en: 'Selected Work' }, lang)}
            </h2>

            {projects && projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.filter(p => p.featured).map(project => (
                  <div
                    key={project.id}
                    style={{ ...card, display: 'flex', flexDirection: 'column', gap: '14px' }}
                  >
                    {project.imageUrl ? (
                      <div style={{ height: '160px', borderRadius: '16px', overflow: 'hidden' }}>
                        <img
                          src={project.imageUrl}
                          alt={project.titleEn}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          height: '100px',
                          borderRadius: '16px',
                          border: '1px solid rgba(128,82,255,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#8052ff',
                          fontWeight: 200,
                          fontSize: '28px',
                          letterSpacing: '-0.04em',
                        }}
                      >
                        {project.titleEn.substring(0, 3).toUpperCase()}
                      </div>
                    )}

                    <div>
                      <h3
                        style={{
                          fontSize: '16px',
                          fontWeight: 600,
                          color: '#ffffff',
                          letterSpacing: '0.021em',
                          marginBottom: '6px',
                        }}
                      >
                        {getText({ az: project.titleAz, ru: project.titleRu, en: project.titleEn }, lang)}
                      </h3>
                      <p
                        style={{
                          fontSize: '13px',
                          fontWeight: 400,
                          lineHeight: 1.6,
                          letterSpacing: '0.021em',
                          color: '#9a9a9a',
                        }}
                      >
                        {getText({ az: project.descAz, ru: project.descRu, en: project.descEn }, lang)}
                      </p>
                    </div>

                    {project.techStack && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {project.techStack.split(',').map((tech, i) => (
                          <span
                            key={i}
                            style={{
                              border: '1px solid rgba(255,255,255,0.1)',
                              color: '#9a9a9a',
                              padding: '3px 10px',
                              borderRadius: '24px',
                              fontSize: '11px',
                              letterSpacing: '0.05em',
                            }}
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    {(project.githubUrl || project.liveUrl) && (
                      <div style={{ display: 'flex', gap: '16px', marginTop: 'auto' }}>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: '13px', color: '#8052ff', textDecoration: 'none', letterSpacing: '0.021em' }}
                          >
                            GitHub →
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: '13px', color: '#8052ff', textDecoration: 'none', letterSpacing: '0.021em' }}
                          >
                            Live →
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  {
                    title: 'State Examination System',
                    titleAz: 'Dövlət İmtahan Sistemi',
                    titleRu: 'Государственная экзаменационная система',
                    descEn: 'Large-scale government examination platform with React, TypeScript and Redux Toolkit',
                    descAz: 'React, TypeScript və Redux Toolkit ilə geniş miqyaslı dövlət imtahan platforması',
                    descRu: 'Крупномасштабная государственная экзаменационная платформа',
                    tech: 'React, TypeScript, Redux Toolkit, ASP.NET Core',
                  },
                  {
                    title: 'Business Portals',
                    titleAz: 'Biznes Portalları',
                    titleRu: 'Бизнес-порталы',
                    descEn: 'Business applications and mobile solutions with React and React Native',
                    descAz: 'React və React Native ilə biznes tətbiqləri',
                    descRu: 'Бизнес-приложения с React и React Native',
                    tech: 'React, React Native, Strapi, PostgreSQL',
                  },
                  {
                    title: 'Interior Design Platform',
                    titleAz: 'İnteryer dizaynı platforması',
                    titleRu: 'Платформа дизайна интерьеров',
                    descEn: 'Fullstack e-commerce solution with React, Angular and Spring Boot',
                    descAz: 'React, Angular və Spring Boot ilə fullstack həll',
                    descRu: 'Fullstack решение с React, Angular и Spring Boot',
                    tech: 'React, Angular, Spring Boot, PostgreSQL',
                  },
                ].map(p => (
                  <div
                    key={p.title}
                    style={{ ...card, display: 'flex', flexDirection: 'column', gap: '14px' }}
                  >
                    <div
                      style={{
                        height: '100px',
                        borderRadius: '16px',
                        border: '1px solid rgba(128,82,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#8052ff',
                        fontWeight: 200,
                        fontSize: '28px',
                        letterSpacing: '-0.04em',
                      }}
                    >
                      {p.title.substring(0, 3).toUpperCase()}
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', letterSpacing: '0.021em' }}>
                      {getText({ az: p.titleAz, ru: p.titleRu, en: p.title }, lang)}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#9a9a9a', lineHeight: 1.6, letterSpacing: '0.021em' }}>
                      {getText({ az: p.descAz, ru: p.descRu, en: p.descEn }, lang)}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {p.tech.split(',').map((t, i) => (
                        <span
                          key={i}
                          style={{
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#9a9a9a',
                            padding: '3px 10px',
                            borderRadius: '24px',
                            fontSize: '11px',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className={SECTION} style={sectionDivider}>
        <div className={CONTAINER}>
          <div className="animate-on-scroll">
            <span style={eyebrow}>
              {getText({ az: 'Əlaqə', ru: 'Контакт', en: 'Contact' }, lang)}
            </span>
            <h2 style={sectionTitle}>
              {getText({ az: 'Əlaqə Saxlayaq', ru: 'Свяжитесь со мной', en: "Let's Connect" }, lang)}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Left: info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <p style={{ fontSize: '15px', fontWeight: 400, lineHeight: 1.7, letterSpacing: '0.025em', color: '#bdbdbd' }}>
                  {getText({
                    az: 'Yeni layihə üçün əməkdaşlığa hazırammı? Ya da sadəcə salam deməkmi istəyirsiniz? Mənə yazın!',
                    ru: 'Готовы к сотрудничеству над новым проектом? Или просто хотите поздороваться? Напишите мне!',
                    en: 'Ready to collaborate on a new project? Or just want to say hello? Drop me a line!',
                  }, lang)}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <ContactInfoRow
                    href={`mailto:${contact?.email || 'kazimi.dev@gmail.com'}`}
                    label={contact?.email || 'kazimi.dev@gmail.com'}
                    icon={
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8052ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                    }
                  />
                  {contact?.phone && (
                    <ContactInfoRow
                      href={`tel:${contact.phone}`}
                      label={contact.phone}
                      icon={
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8052ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.62 4.38 2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l1.68-1.68a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                      }
                    />
                  )}
                  {contact?.linkedin && (
                    <ContactInfoRow
                      href={contact.linkedin}
                      label={contact.linkedin.replace('https://', '')}
                      external
                      icon={
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8052ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
                        </svg>
                      }
                    />
                  )}
                  {contact?.github && (
                    <ContactInfoRow
                      href={contact.github}
                      label={contact.github.replace('https://', '')}
                      external
                      icon={
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8052ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                        </svg>
                      }
                    />
                  )}
                  {contact?.telegram && (
                    <ContactInfoRow
                      href={`https://t.me/${contact.telegram.replace('@', '')}`}
                      label={contact.telegram}
                      external
                      icon={
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8052ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                      }
                    />
                  )}
                </div>
              </div>

              {/* Right: form */}
              <div style={card}>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ ...sectionDivider, padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', color: '#9a9a9a', letterSpacing: '0.021em' }}>
          © {settings?.copyrightYear || new Date().getFullYear()} Kamran Kazimi.{' '}
          {settings
            ? getText({ az: settings.footerTextAz, ru: settings.footerTextRu, en: settings.footerTextEn }, lang)
            : getText({ az: 'Bütün hüquqlar qorunur.', ru: 'Все права защищены.', en: 'All rights reserved.' }, lang)}
        </p>
      </footer>
    </div>
  );
}

function ContactInfoRow({
  href,
  label,
  icon,
  external,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div
        style={{
          width: '38px',
          height: '38px',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        style={{ fontSize: '14px', color: '#bdbdbd', textDecoration: 'none', letterSpacing: '0.021em' }}
      >
        {label}
      </a>
    </div>
  );
}
