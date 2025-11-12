export interface HeroContent {
  titleAz: string;
  titleRu: string;
  titleEn: string;
  subtitleAz: string;
  subtitleRu: string;
  subtitleEn: string;
  descAz: string;
  descRu: string;
  descEn: string;
}

export interface AboutContent {
  titleAz: string;
  titleRu: string;
  titleEn: string;
  para1Az: string;
  para1Ru: string;
  para1En: string;
  para2Az: string;
  para2Ru: string;
  para2En: string;
  para3Az: string;
  para3Ru: string;
  para3En: string;
  imageUrl: string;
}

export interface Project {
  id: string;
  titleAz: string;
  titleRu: string;
  titleEn: string;
  descAz: string;
  descRu: string;
  descEn: string;
  imageUrl: string;
  techStack: string;
  githubUrl: string;
  liveUrl: string;
  order: number;
  featured: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  order: number;
}

export interface ContactInfo {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  telegram: string;
}

export interface Experience {
  id: string;
  companyAz: string;
  companyRu: string;
  companyEn: string;
  positionAz: string;
  positionRu: string;
  positionEn: string;
  periodAz: string;
  periodRu: string;
  periodEn: string;
  locationAz: string;
  locationRu: string;
  locationEn: string;
  responsibilitiesAz: string;
  responsibilitiesRu: string;
  responsibilitiesEn: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  order: number;
}

export interface Education {
  id: string;
  degreeAz: string;
  degreeRu: string;
  degreeEn: string;
  institutionAz: string;
  institutionRu: string;
  institutionEn: string;
  year: number;
  order: number;
}

export interface Language {
  id: string;
  languageAz: string;
  languageRu: string;
  languageEn: string;
  proficiencyAz: string;
  proficiencyRu: string;
  proficiencyEn: string;
  order: number;
}

export interface SiteSettings {
  id: string;
  copyrightYear: number;
  footerTextAz: string;
  footerTextRu: string;
  footerTextEn: string;
}
