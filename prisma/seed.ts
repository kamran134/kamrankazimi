import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@kamran.dev' },
    update: {},
    create: {
      email: 'admin@kamran.dev',
      password,
      name: 'Administrator',
    },
  });

  console.log('Admin created:', admin.email);

  // Create default hero content
  await prisma.heroContent.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      titleAz: 'Kamran Kazımi',
      titleRu: 'Камран Казыми',
      titleEn: 'Kamran Kazimi',
      subtitleAz: 'Frontend Mühəndis - 7+ il təcrübə',
      subtitleRu: 'Фронтенд Разработчик - 7+ лет опыта',
      subtitleEn: 'Frontend Developer - 7+ Years Experience',
      descAz: 'Miqyaslana bilən, adaptiv və əlçatan veb tətbiqlər quran Frontend Developer.',
      descRu: 'Frontend разработчик, создающий масштабируемые, адаптивные и доступные веб-приложения.',
      descEn: 'Frontend Developer building scalable, responsive, and accessible web applications.',
    },
  });

  // Create default about content
  await prisma.aboutContent.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      titleAz: 'Haqqımda',
      titleRu: 'Обо мне',
      titleEn: 'About Me',
      para1Az: '7+ il əməli təcrübəyə malik Frontend Developer olaraq, miqyaslana bilən, adaptiv və əlçatan veb tətbiqlər qurmaq üzrə ixtisaslaşıram.',
      para1Ru: 'Frontend разработчик с 7+ годами практического опыта, специализирующийся на создании масштабируемых, адаптивных и доступных веб-приложений.',
      para1En: 'Frontend Developer with 7+ years of hands-on experience building scalable, responsive, and accessible web applications.',
      para2Az: 'Hal-hazırda Azərbaycan Respublikasının Dövlət İmtahan Mərkəzində işləyir, geniş miqyaslı dövlət sistemlərinə töhfə verir.',
      para2Ru: 'В настоящее время работаю в Государственном Экзаменационном Центре Азербайджана.',
      para2En: 'Currently working at the State Examination Center of Azerbaijan.',
      para3Az: 'REST API-ləri inteqrasiya etməkdə və backend komandaları ilə sıx əməkdaşlıq etməkdə səriştəli.',
      para3Ru: 'Профессионально интегрирую REST API и тесно сотрудничаю с backend командами.',
      para3En: 'Proficient in integrating REST APIs and collaborating closely with backend teams.',
    },
  });

  // Create default contact info
  await prisma.contactInfo.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      email: 'contact@kamran.dev',
      github: 'https://github.com/kamran134',
      linkedin: 'https://linkedin.com/in/kamrankazimi',
      telegram: '@kamrankazimi',
    },
  });

  // Create experiences
  await prisma.experience.upsert({
    where: { id: 'exp1' },
    update: {},
    create: {
      id: 'exp1',
      companyAz: 'Azərbaycan Respublikası Dövlət İmtahan Mərkəzi',
      companyRu: 'Государственный Экзаменационный Центр Азербайджанской Республики',
      companyEn: 'State Examination Center of the Republic of Azerbaijan',
      positionAz: 'Frontend / Fullstack Developer',
      positionRu: 'Frontend / Fullstack Разработчик',
      positionEn: 'Frontend / Fullstack Developer',
      periodAz: 'Sen 2021 – İndiki vaxt',
      periodRu: 'Сен 2021 – Настоящее время',
      periodEn: 'Sep 2021 – Present',
      locationAz: 'Bakı, Azərbaycan',
      locationRu: 'Баку, Азербайджан',
      locationEn: 'Baku, Azerbaijan',
      responsibilitiesAz: '• React, TypeScript və Redux Toolkit istifadə edərək mürəkkəb istifadəçi interfeyslərini inkişaf etdirdim\n• ASP.NET Core API-lərini inteqrasiya etmək üçün backend developerləri ilə əməkdaşlıq etdim\n• Arxitektura müzakirələrində iştirak etdim və UI modullarının planlaşdırılmasına töhfə verdim',
      responsibilitiesRu: '• Разработал сложные пользовательские интерфейсы с использованием React, TypeScript и Redux Toolkit\n• Сотрудничал с backend разработчиками для интеграции ASP.NET Core APIs\n• Участвовал в архитектурных обсуждениях и планировании UI модулей',
      responsibilitiesEn: '• Developed complex user interfaces using React, TypeScript, and Redux Toolkit\n• Collaborated with backend developers to integrate ASP.NET Core APIs\n• Participated in architecture discussions and contributed to planning UI modules',
      startDate: new Date('2021-09-01'),
      endDate: null,
      current: true,
      order: 1,
    },
  });

  await prisma.experience.upsert({
    where: { id: 'exp2' },
    update: {},
    create: {
      id: 'exp2',
      companyAz: 'Zirinc',
      companyRu: 'Zirinc',
      companyEn: 'Zirinc',
      positionAz: 'React Developer',
      positionRu: 'React Developer',
      positionEn: 'React Developer',
      periodAz: 'Apr 2019 – Avq 2021',
      periodRu: 'Апр 2019 – Авг 2021',
      periodEn: 'Apr 2019 – Aug 2021',
      locationAz: 'Bakı, Azərbaycan',
      locationRu: 'Баку, Азербайджан',
      locationEn: 'Baku, Azerbaijan',
      responsibilitiesAz: '• React və React Native ilə biznes portalları və mobil tətbiqlər yaratdım\n• Təkrar istifadə olunan UI komponentləri və performans optimallaşdırması üzərində işlədim',
      responsibilitiesRu: '• Создал бизнес-порталы и мобильные приложения с React и React Native\n• Работал над переиспользуемыми UI компонентами и оптимизацией производительности',
      responsibilitiesEn: '• Created business web portals and mobile apps with React and React Native\n• Focused on reusable UI components and performance optimization',
      startDate: new Date('2019-04-01'),
      endDate: new Date('2021-08-31'),
      current: false,
      order: 2,
    },
  });

  await prisma.experience.upsert({
    where: { id: 'exp3' },
    update: {},
    create: {
      id: 'exp3',
      companyAz: 'Riberry',
      companyRu: 'Riberry',
      companyEn: 'Riberry',
      positionAz: 'Software Developer',
      positionRu: 'Software Developer',
      positionEn: 'Software Developer',
      periodAz: 'İyun 2017 – Apr 2019',
      periodRu: 'Июн 2017 – Апр 2019',
      periodEn: 'Jun 2017 – Apr 2019',
      locationAz: 'Bakı, Azərbaycan',
      locationRu: 'Баку, Азербайджан',
      locationEn: 'Baku, Azerbaijan',
      responsibilitiesAz: '• Riberry.az platformasında dəstək və təkmilləşdirmə işləri aparırdım\n• Frontend (React, Angular) və backend (Spring Boot, PostgreSQL) ilə fullstack inkişafda iştirak etdim',
      responsibilitiesRu: '• Поддерживал и улучшал платформу Riberry.az\n• Участвовал в fullstack разработке с frontend (React, Angular) и backend (Spring Boot, PostgreSQL)',
      responsibilitiesEn: '• Maintained and improved the Riberry.az platform\n• Participated in fullstack development for frontend (React, Angular) and backend (Spring Boot, PostgreSQL)',
      startDate: new Date('2017-06-01'),
      endDate: new Date('2019-04-30'),
      current: false,
      order: 3,
    },
  });

  // Create education
  await prisma.education.upsert({
    where: { id: 'edu1' },
    update: {},
    create: {
      id: 'edu1',
      degreeAz: 'Kompüter Elmləri üzrə Magistr',
      degreeRu: 'Магистр компьютерных наук',
      degreeEn: 'M.Sc. in Computer Science',
      institutionAz: 'Lomonosov Moskva Dövlət Universiteti, Bakı Filialı',
      institutionRu: 'МГУ им. Ломоносова, Бакинский филиал',
      institutionEn: 'Lomonosov Moscow State University, Baku Branch',
      year: 2017,
      order: 1,
    },
  });

  await prisma.education.upsert({
    where: { id: 'edu2' },
    update: {},
    create: {
      id: 'edu2',
      degreeAz: 'Kompüter Elmləri üzrə Bakalavr',
      degreeRu: 'Бакалавр компьютерных наук',
      degreeEn: 'B.Sc. in Computer Science',
      institutionAz: 'Lomonosov Moskva Dövlət Universiteti, Bakı Filialı',
      institutionRu: 'МГУ им. Ломоносова, Бакинский филиал',
      institutionEn: 'Lomonosov Moscow State University, Baku Branch',
      year: 2013,
      order: 2,
    },
  });

  // Create languages
  await prisma.language.upsert({
    where: { id: 'lang1' },
    update: {},
    create: {
      id: 'lang1',
      languageAz: 'Azərbaycanca',
      languageRu: 'Азербайджанский',
      languageEn: 'Azerbaijani',
      proficiencyAz: 'Ana dil',
      proficiencyRu: 'Родной',
      proficiencyEn: 'Native',
      order: 1,
    },
  });

  await prisma.language.upsert({
    where: { id: 'lang2' },
    update: {},
    create: {
      id: 'lang2',
      languageAz: 'İngiliscə',
      languageRu: 'Английский',
      languageEn: 'English',
      proficiencyAz: 'İş səviyyəsi',
      proficiencyRu: 'Рабочий уровень',
      proficiencyEn: 'Working Proficiency',
      order: 2,
    },
  });

  await prisma.language.upsert({
    where: { id: 'lang3' },
    update: {},
    create: {
      id: 'lang3',
      languageAz: 'Rusca',
      languageRu: 'Русский',
      languageEn: 'Russian',
      proficiencyAz: 'Səlis',
      proficiencyRu: 'Свободно',
      proficiencyEn: 'Fluent',
      order: 3,
    },
  });

  await prisma.language.upsert({
    where: { id: 'lang4' },
    update: {},
    create: {
      id: 'lang4',
      languageAz: 'Ukraynaca',
      languageRu: 'Украинский',
      languageEn: 'Ukrainian',
      proficiencyAz: 'Əsas',
      proficiencyRu: 'Базовый',
      proficiencyEn: 'Basic',
      order: 4,
    },
  });

  // Create site settings
  await prisma.siteSettings.upsert({
    where: { id: 'settings1' },
    update: {},
    create: {
      id: 'settings1',
      copyrightYear: 2024,
      footerTextAz: 'Bütün hüquqlar qorunur.',
      footerTextRu: 'Все права защищены.',
      footerTextEn: 'All rights reserved.',
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
