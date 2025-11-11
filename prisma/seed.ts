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
