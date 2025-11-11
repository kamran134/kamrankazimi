'use client';

import { useState, useEffect } from 'react';
import type { HeroContent, AboutContent, Project, Skill, ContactInfo } from '@/types/content';

export function useContent() {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [about, setAbout] = useState<AboutContent | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [heroRes, aboutRes, projectsRes, skillsRes, contactRes] = await Promise.all([
          fetch('/api/content/hero'),
          fetch('/api/content/about'),
          fetch('/api/projects'),
          fetch('/api/skills'),
          fetch('/api/contact'),
        ]);

        if (!heroRes.ok || !aboutRes.ok || !projectsRes.ok || !skillsRes.ok || !contactRes.ok) {
          throw new Error('Failed to fetch some content');
        }

        const heroData = await heroRes.json();
        const aboutData = await aboutRes.json();
        const projectsData = await projectsRes.json();
        const skillsData = await skillsRes.json();
        const contactData = await contactRes.json();

        setHero(heroData || null);
        setAbout(aboutData || null);
        setProjects(Array.isArray(projectsData) ? projectsData : []);
        setSkills(Array.isArray(skillsData) ? skillsData : []);
        setContact(contactData || null);
      } catch (error) {
        console.error('Failed to fetch content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { hero, about, projects, skills, contact, loading };
}
