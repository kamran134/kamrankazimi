const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Создание admin пользователя
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@kamran.dev' },
    update: {},
    create: {
      email: 'admin@kamran.dev',
      password: hashedPassword,
      name: 'Kamran Kazimov',
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Создание героя
  const hero = await prisma.heroContent.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      titleAz: 'Kamran Kazimov',
      titleRu: 'Камран Казымов',
      titleEn: 'Kamran Kazimov',
      subtitleAz: 'Full-Stack Developer',
      subtitleRu: 'Full-Stack Разработчик',
      subtitleEn: 'Full-Stack Developer',
      descAz: 'Müasir veb tətbiqlər yaratmağa həvəsli developer',
      descRu: 'Разработчик с опытом создания современных веб-приложений',
      descEn: 'Passionate developer creating modern web applications',
    },
  });

  console.log('✅ Hero content created');

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
