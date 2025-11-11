-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "HeroContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titleAz" TEXT NOT NULL,
    "titleRu" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "subtitleAz" TEXT NOT NULL,
    "subtitleRu" TEXT NOT NULL,
    "subtitleEn" TEXT NOT NULL,
    "descAz" TEXT NOT NULL DEFAULT '',
    "descRu" TEXT NOT NULL DEFAULT '',
    "descEn" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AboutContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titleAz" TEXT NOT NULL,
    "titleRu" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "para1Az" TEXT NOT NULL,
    "para1Ru" TEXT NOT NULL,
    "para1En" TEXT NOT NULL,
    "para2Az" TEXT NOT NULL,
    "para2Ru" TEXT NOT NULL,
    "para2En" TEXT NOT NULL,
    "para3Az" TEXT NOT NULL,
    "para3Ru" TEXT NOT NULL,
    "para3En" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titleAz" TEXT NOT NULL,
    "titleRu" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descAz" TEXT NOT NULL,
    "descRu" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "techStack" TEXT NOT NULL,
    "githubUrl" TEXT NOT NULL DEFAULT '',
    "liveUrl" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL DEFAULT '',
    "github" TEXT NOT NULL DEFAULT '',
    "linkedin" TEXT NOT NULL DEFAULT '',
    "telegram" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
