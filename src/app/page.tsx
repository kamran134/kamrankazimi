'use client';

import { useLanguage } from "@/lib/LanguageContext";
import { getText } from "@/lib/i18n";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { useContent } from "@/lib/useContent";

export default function Home() {
  const { lang } = useLanguage();
  const { hero, about, projects, skills, contact, experiences, education, languages, settings } = useContent();
  useScrollAnimation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden gradient-bg">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="animate-on-scroll opacity-0 transition-all duration-1000">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              {hero?.titleAz ? getText({
                az: hero.titleAz,
                ru: hero.titleRu,
                en: hero.titleEn
              }, lang) : "Kamran Kazimi"}
            </h1>
            <h2 className="text-2xl md:text-3xl mb-8 font-light">
              {hero?.subtitleAz ? getText({
                az: hero.subtitleAz,
                ru: hero.subtitleRu,
                en: hero.subtitleEn
              }, lang) : "Frontend Developer"}
            </h2>
            <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
              {hero?.descAz ? getText({
                az: hero.descAz,
                ru: hero.descRu,
                en: hero.descEn
              }, lang) : "Frontend Developer building scalable, responsive, and accessible web applications."}
            </p>
            <div className="flex gap-6 justify-center">
              <a 
                href="#projects" 
                className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                {getText({az: "Layihələr", ru: "Проекты", en: "Projects"}, lang)}
              </a>
              <a 
                href="#contact" 
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                {getText({az: "Əlaqə", ru: "Контакты", en: "Contact"}, lang)}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-on-scroll opacity-0 transition-all duration-700">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
              {about?.titleAz ? getText({
                az: about.titleAz,
                ru: about.titleRu,
                en: about.titleEn
              }, lang) : getText({az: "Haqqımda", ru: "Обо мне", en: "About Me"}, lang)}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                {about?.imageUrl ? (
                  <div className="w-80 h-80 mx-auto rounded-full overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800">
                    <img
                      src={about.imageUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
                    KK
                  </div>
                )}
              </div>
              <div className="space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {about?.para1Az ? getText({
                    az: about.para1Az,
                    ru: about.para1Ru,
                    en: about.para1En
                  }, lang) : getText({
                    az: "7+ il əməli təcrübəyə malik Frontend Developer olaraq, miqyaslana bilən, adaptiv və əlçatan veb tətbiqlər qurmaq üzrə ixtisaslaşıram.",
                    ru: "Frontend разработчик с 7+ годами практического опыта, специализирующийся на создании масштабируемых веб-приложений.",
                    en: "Frontend Developer with 7+ years of experience building scalable web applications."
                  }, lang)}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {about?.para2Az ? getText({
                    az: about.para2Az,
                    ru: about.para2Ru,
                    en: about.para2En
                  }, lang) : getText({
                    az: "Hal-hazırda Dövlət İmtahan Mərkəzində işləyirəm.",
                    ru: "В настоящее время работаю в Государственном Экзаменационном Центре.",
                    en: "Currently working at the State Examination Center."
                  }, lang)}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {about?.para3Az ? getText({
                    az: about.para3Az,
                    ru: about.para3Ru,
                    en: about.para3En
                  }, lang) : getText({
                    az: "REST API-ləri inteqrasiya edirəm.",
                    ru: "Интегрирую REST API.",
                    en: "Integrating REST APIs."
                  }, lang)}
                </p>
                <div className="flex flex-wrap gap-3">
                  {['React.js', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'Next.js', 'React Native'].map((skill) => (
                    <span key={skill} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-on-scroll opacity-0 transition-all duration-700">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
              {getText({az: "Bacarıqlar", ru: "Навыки", en: "Skills"}, lang)}
            </h2>
            
            {skills && skills.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { name: 'Frontend', icon: '⚛️', gradient: 'from-blue-500 to-cyan-500' },
                  { name: 'Testing & Tools', icon: '🔧', gradient: 'from-green-500 to-emerald-500' },
                  { name: 'Backend & APIs', icon: '🔌', gradient: 'from-purple-500 to-pink-500' },
                  { name: 'Mobile & Desktop', icon: '📱', gradient: 'from-orange-500 to-red-500' },
                  { name: 'Additional skills', icon: '🛠️', gradient: 'from-orange-500 to-red-500' },
                ].map((category) => {
                  const categorySkills = skills.filter(s => s.category === category.name);
                  if (categorySkills.length === 0) return null;
                  
                  return (
                    <div key={category.name} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className={`w-14 h-14 bg-gradient-to-br ${category.gradient} rounded-lg flex items-center justify-center text-white text-xl font-bold mb-4`}>
                        {category.icon}
                      </div>
                      <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">{category.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {categorySkills.map((skill, index) => (
                          <span key={skill.id}>
                            {skill.name}
                            {index < categorySkills.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Fallback static content */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white text-xl font-bold mb-4">
                  ⚛️
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Frontend</h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li>React.js, Next.js, Vite</li>
                  <li>TypeScript, JavaScript ES6+</li>
                  <li>Redux Toolkit</li>
                  <li>Angular 2+</li>
                  <li>Tailwind CSS, Material UI</li>
                  <li>HTML5, SCSS, CSS3</li>
                </ul>
              </div>
              
              {/* Testing & Tools */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white text-xl font-bold mb-4">
                  🔧
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Testing & Tools</h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li>Jest, React Testing Library</li>
                  <li>Git, GitLab CI/CD</li>
                  <li>Docker (basic)</li>
                  <li>Webpack, Vite</li>
                  <li>Figma, responsive design</li>
                </ul>
              </div>
              
              {/* Backend & APIs */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-xl font-bold mb-4">
                  🔌
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Backend & APIs</h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li>REST APIs (confident)</li>
                  <li>GraphQL (basic)</li>
                  <li>ASP .Net Core (basic)</li>
                  <li>Spring Boot</li>
                  <li>PostgreSQL</li>
                </ul>
              </div>

              {/* Mobile & Desktop */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white text-xl font-bold mb-4">
                  📱
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Mobile & Desktop</h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li>React Native</li>
                  <li>Windows Forms (C#)</li>
                </ul>
              </div>

              {/* --- IGNORE --- */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white text-xl font-bold mb-4">
                  🛠️
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Additional skills</h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li>Agile (Scrum/Kanban)</li>
                  <li>Code Review, CI/CD</li>
                </ul>
              </div>
                                
            </div>
            )}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-on-scroll opacity-0 transition-all duration-700">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
              {getText({az: "İş Təcrübəsi", ru: "Опыт работы", en: "Professional Experience"}, lang)}
            </h2>
            <div className="space-y-8">
              {experiences && experiences.length > 0 ? (
                experiences.map((exp) => (
                  <div key={exp.id} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {getText({
                            az: exp.positionAz,
                            ru: exp.positionRu,
                            en: exp.positionEn
                          }, lang)}
                        </h3>
                        <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
                          {getText({
                            az: exp.companyAz,
                            ru: exp.companyRu,
                            en: exp.companyEn
                          }, lang)}
                        </p>
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 font-medium mt-2 md:mt-0">
                        {getText({
                          az: exp.periodAz,
                          ru: exp.periodRu,
                          en: exp.periodEn
                        }, lang)} | {getText({
                          az: exp.locationAz,
                          ru: exp.locationRu,
                          en: exp.locationEn
                        }, lang)}
                      </div>
                    </div>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                      {getText({
                        az: exp.responsibilitiesAz,
                        ru: exp.responsibilitiesRu,
                        en: exp.responsibilitiesEn
                      }, lang).split('\n').map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-400">No experience data available</p>
              )}

              {/* Education */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {getText({az: "Təhsil", ru: "Образование", en: "Education"}, lang)}
                </h3>
                {education && education.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {education.map((edu) => (
                      <div key={edu.id}>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {getText({
                            az: edu.degreeAz,
                            ru: edu.degreeRu,
                            en: edu.degreeEn
                          }, lang)}
                        </h4>
                        <p className="text-blue-600 dark:text-blue-400">
                          {getText({
                            az: edu.institutionAz,
                            ru: edu.institutionRu,
                            en: edu.institutionEn
                          }, lang)}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">No education data available</p>
                )}
                
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {getText({az: "Dillər", ru: "Языки", en: "Languages"}, lang)}
                  </h4>
                  {languages && languages.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {languages.map((lang_item, idx) => {
                        const colors = ['green', 'blue', 'purple', 'orange', 'pink', 'indigo'];
                        const color = colors[idx % colors.length];
                        return (
                          <span key={lang_item.id} className={`bg-${color}-100 dark:bg-${color}-900 text-${color}-800 dark:text-${color}-200 px-3 py-1 rounded-full text-sm`}>
                            {getText({
                              az: lang_item.languageAz,
                              ru: lang_item.languageRu,
                              en: lang_item.languageEn
                            }, lang)}: {getText({
                              az: lang_item.proficiencyAz,
                              ru: lang_item.proficiencyRu,
                              en: lang_item.proficiencyEn
                            }, lang)}
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">No languages data available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-on-scroll opacity-0 transition-all duration-700">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
              {getText({az: "Layihələr", ru: "Проекты", en: "Projects"}, lang)}
            </h2>
            
            {projects && projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.filter(p => p.featured).map((project) => (
                  <div key={project.id} className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.titleEn} className="h-48 w-full object-cover" />
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                        {project.titleEn.substring(0, 3).toUpperCase()}
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        {getText({
                          az: project.titleAz,
                          ru: project.titleRu,
                          en: project.titleEn
                        }, lang)}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {getText({
                          az: project.descAz,
                          ru: project.descRu,
                          en: project.descEn
                        }, lang)}
                      </p>
                      {project.techStack && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.techStack.split(',').map((tech, i) => (
                            <span key={i} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-4">
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                            GitHub
                          </a>
                        )}
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Fallback static content */}
              <div className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  🏛️ DİM
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {getText({
                      az: "Dövlət İmtahan Sistemi",
                      ru: "Государственная экзаменационная система", 
                      en: "State Examination System"
                    }, lang)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {getText({
                      az: "React, TypeScript və Redux Toolkit ilə geniş miqyaslı dövlət imtahan platforması",
                      ru: "Крупномасштабная государственная экзаменационная платформа с React, TypeScript и Redux Toolkit",
                      en: "Large-scale government examination platform with React, TypeScript and Redux Toolkit"
                    }, lang)}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">TypeScript</span>
                    <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded text-xs">Redux Toolkit</span>
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">ASP.NET Core</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Government Project</span>
                  </div>
                </div>
              </div>

              {/* Project 2 - Business Portal */}
              <div className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold">
                  💼 Business
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {getText({
                      az: "Biznes Portalları",
                      ru: "Бизнес-порталы", 
                      en: "Business Portals"
                    }, lang)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {getText({
                      az: "React və React Native ilə biznes tətbiqləri və mobil həllər",
                      ru: "Бизнес-приложения и мобильные решения с React и React Native",
                      en: "Business applications and mobile solutions with React and React Native"
                    }, lang)}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded text-xs">React Native</span>
                    <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded text-xs">Strapi</span>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">PostgreSQL</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Zirinc Project</span>
                  </div>
                </div>
              </div>

              {/* Project 3 - Riberry Platform */}
              <div className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-2xl font-bold">
                  🛋️ Riberry
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {getText({
                      az: "İnteryer dizaynı platforması",
                      ru: "Платформа дизайна интерьеров",
                      en: "Interior Design Platform"
                    }, lang)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {getText({
                      az: "React, Angular və Spring Boot ilə fullstack e-ticarət həlli",
                      ru: "Fullstack решение для электронной торговли с React, Angular и Spring Boot",
                      en: "Fullstack e-commerce solution with React, Angular and Spring Boot"
                    }, lang)}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-xs">Angular</span>
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">Spring Boot</span>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">PostgreSQL</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Riberry.az</span>
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-on-scroll opacity-0 transition-all duration-700">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
              {getText({az: "Əlaqə", ru: "Контакты", en: "Contact"}, lang)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  {getText({az: "Gəlin əlaqə saxlayaq", ru: "Давайте свяжемся", en: "Let's get in touch"}, lang)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  {getText({
                    az: "Yeni layihə üçün əməkdaşlığa hazırammı? Ya da sadəcə salam deməkmi istəyirsiniz? Mənə yazın!",
                    ru: "Готовы к сотрудничеству над новым проектом? Или просто хотите поздороваться? Напишите мне!",
                    en: "Ready to collaborate on a new project? Or just want to say hello? Drop me a line!"
                  }, lang)}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 text-xl">📧</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Email</p>
                      <a href={`mailto:${contact?.email || 'kazimi.dev@gmail.com'}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                        {contact?.email || 'kazimi.dev@gmail.com'}
                      </a>
                    </div>
                  </div>
                  
                  {contact?.phone && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 text-xl">�</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Phone</p>
                        <a href={`tel:${contact.phone}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {contact?.linkedin && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 text-xl">💼</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">LinkedIn</p>
                        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                          {contact.linkedin.replace('https://', '')}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {contact?.github && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 text-xl">🐙</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">GitHub</p>
                        <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                          {contact.github.replace('https://', '')}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {contact?.telegram && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 text-xl">✈️</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Telegram</p>
                        <a href={`https://t.me/${contact.telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                          {contact.telegram}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {getText({az: "Ad", ru: "Имя", en: "Name"}, lang)}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={getText({az: "Adınız", ru: "Ваше имя", en: "Your name"}, lang)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={getText({az: "email@example.com", ru: "email@example.com", en: "email@example.com"}, lang)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {getText({az: "Mesaj", ru: "Сообщение", en: "Message"}, lang)}
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={getText({az: "Mesajınız...", ru: "Ваше сообщение...", en: "Your message..."}, lang)}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                  >
                    {getText({az: "Mesaj Göndər", ru: "Отправить сообщение", en: "Send Message"}, lang)}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {settings?.copyrightYear || new Date().getFullYear()} Kamran Kazimi. {
              settings ? getText({az: settings.footerTextAz, ru: settings.footerTextRu, en: settings.footerTextEn}, lang) :
              getText({az: "Bütün hüquqlar qorunur.", ru: "Все права защищены.", en: "All rights reserved."}, lang)
            }
          </p>
        </div>
      </footer>
    </div>
  );
}
