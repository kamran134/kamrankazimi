'use client';

import { useState, useEffect } from 'react';
import type { HeroContent, AboutContent, Project, Skill, ContactInfo, Experience, Education, Language, SiteSettings } from '@/types/content';

export function useContent() {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [about, setAbout] = useState<AboutContent | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [
          heroRes,
          aboutRes,
          projectsRes,
          skillsRes,
          contactRes,
          experiencesRes,
          educationRes,
          languagesRes,
          settingsRes
        ] = await Promise.all([
          fetch('/api/content/hero'),
          fetch('/api/content/about'),
          fetch('/api/projects'),
          fetch('/api/skills'),
          fetch('/api/contact'),
          fetch('/api/experience'),
          fetch('/api/education'),
          fetch('/api/languages'),
          fetch('/api/settings'),
        ]);

        const heroData = await heroRes.json();
        const aboutData = await aboutRes.json();
        const projectsData = await projectsRes.json();
        const skillsData = await skillsRes.json();
        const contactData = await contactRes.json();
        const experiencesData = await experiencesRes.json();
        const educationData = await educationRes.json();
        const languagesData = await languagesRes.json();
        const settingsData = await settingsRes.json();

        setHero(heroData || null);
        setAbout(aboutData || null);
        setProjects(Array.isArray(projectsData) ? projectsData : []);
        setSkills(Array.isArray(skillsData) ? skillsData : []);
        setContact(contactData || null);
        setExperiences(Array.isArray(experiencesData) ? experiencesData : []);
        setEducation(Array.isArray(educationData) ? educationData : []);
        setLanguages(Array.isArray(languagesData) ? languagesData : []);
        setSettings(settingsData || null);
      } catch (error) {
        console.error('Failed to fetch content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { hero, about, projects, skills, contact, experiences, education, languages, settings, loading };
}
