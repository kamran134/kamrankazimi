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
