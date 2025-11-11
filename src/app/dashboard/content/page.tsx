'use client';

import { useState, useEffect } from 'react';

interface HeroContent {
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

interface AboutContent {
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

interface ContactInfo {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  telegram: string;
}

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'contact'>('hero');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [heroContent, setHeroContent] = useState<HeroContent>({
    titleAz: '', titleRu: '', titleEn: '',
    subtitleAz: '', subtitleRu: '', subtitleEn: '',
    descAz: '', descRu: '', descEn: '',
  });

  const [aboutContent, setAboutContent] = useState<AboutContent>({
    titleAz: '', titleRu: '', titleEn: '',
    para1Az: '', para1Ru: '', para1En: '',
    para2Az: '', para2Ru: '', para2En: '',
    para3Az: '', para3Ru: '', para3En: '',
  });

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: '', phone: '', github: '', linkedin: '', telegram: '',
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const [heroRes, aboutRes, contactRes] = await Promise.all([
        fetch('/api/content/hero'),
        fetch('/api/content/about'),
        fetch('/api/contact'),
      ]);

      const hero = await heroRes.json();
      const about = await aboutRes.json();
      const contact = await contactRes.json();

      if (hero) setHeroContent(hero);
      if (about) setAboutContent(about);
      if (contact) setContactInfo(contact);
    } catch (error) {
      console.error('Failed to fetch content:', error);
    }
  };

  const saveHero = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(heroContent),
      });

      if (res.ok) {
        setMessage('Hero content saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch {
      setMessage('Failed to save hero content');
    } finally {
      setLoading(false);
    }
  };

  const saveAbout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aboutContent),
      });

      if (res.ok) {
        setMessage('About content saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch {
      setMessage('Failed to save about content');
    } finally {
      setLoading(false);
    }
  };

  const saveContact = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactInfo),
      });

      if (res.ok) {
        setMessage('Contact info saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch {
      setMessage('Failed to save contact info');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Content Editor
      </h1>

      {message && (
        <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
          {message}
        </div>
      )}

      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {(['hero', 'about', 'contact'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'hero' && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['Az', 'Ru', 'En'] as const).map((lang) => (
              <div key={lang} className="space-y-4">
                <h3 className="font-medium text-lg">{lang}</h3>
                <input
                  type="text"
                  placeholder={`Title ${lang}`}
                  value={heroContent[`title${lang}` as keyof HeroContent]}
                  onChange={(e) => setHeroContent({ ...heroContent, [`title${lang}`]: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder={`Subtitle ${lang}`}
                  value={heroContent[`subtitle${lang}` as keyof HeroContent]}
                  onChange={(e) => setHeroContent({ ...heroContent, [`subtitle${lang}`]: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <textarea
                  placeholder={`Description ${lang}`}
                  value={heroContent[`desc${lang}` as keyof HeroContent]}
                  onChange={(e) => setHeroContent({ ...heroContent, [`desc${lang}`]: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            ))}
          </div>
          <button
            onClick={saveHero}
            disabled={loading}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Hero Content'}
          </button>
        </div>
      )}

      {activeTab === 'about' && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">About Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['Az', 'Ru', 'En'] as const).map((lang) => (
              <div key={lang} className="space-y-4">
                <h3 className="font-medium text-lg">{lang}</h3>
                <input
                  type="text"
                  placeholder={`Title ${lang}`}
                  value={aboutContent[`title${lang}` as keyof AboutContent]}
                  onChange={(e) => setAboutContent({ ...aboutContent, [`title${lang}`]: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <textarea
                  placeholder={`Paragraph 1 ${lang}`}
                  value={aboutContent[`para1${lang}` as keyof AboutContent]}
                  onChange={(e) => setAboutContent({ ...aboutContent, [`para1${lang}`]: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <textarea
                  placeholder={`Paragraph 2 ${lang}`}
                  value={aboutContent[`para2${lang}` as keyof AboutContent]}
                  onChange={(e) => setAboutContent({ ...aboutContent, [`para2${lang}`]: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <textarea
                  placeholder={`Paragraph 3 ${lang}`}
                  value={aboutContent[`para3${lang}` as keyof AboutContent]}
                  onChange={(e) => setAboutContent({ ...aboutContent, [`para3${lang}`]: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            ))}
          </div>
          <button
            onClick={saveAbout}
            disabled={loading}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save About Content'}
          </button>
        </div>
      )}

      {activeTab === 'contact' && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4 max-w-lg">
            <input
              type="email"
              placeholder="Email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Phone"
              value={contactInfo.phone}
              onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="GitHub URL"
              value={contactInfo.github}
              onChange={(e) => setContactInfo({ ...contactInfo, github: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="LinkedIn URL"
              value={contactInfo.linkedin}
              onChange={(e) => setContactInfo({ ...contactInfo, linkedin: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Telegram"
              value={contactInfo.telegram}
              onChange={(e) => setContactInfo({ ...contactInfo, telegram: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <button
            onClick={saveContact}
            disabled={loading}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Contact Info'}
          </button>
        </div>
      )}
    </div>
  );
}
