'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Language {
  id: string;
  languageAz: string;
  languageRu: string;
  languageEn: string;
  proficiencyAz: string;
  proficiencyRu: string;
  proficiencyEn: string;
  order: number;
}

interface SiteSettings {
  id: string;
  copyrightYear: number;
  footerTextAz: string;
  footerTextRu: string;
  footerTextEn: string;
}

export default function SettingsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLangId, setEditingLangId] = useState<string | null>(null);
  
  const [langFormData, setLangFormData] = useState({
    languageAz: '',
    languageRu: '',
    languageEn: '',
    proficiencyAz: '',
    proficiencyRu: '',
    proficiencyEn: '',
    order: 0,
  });

  const [settingsFormData, setSettingsFormData] = useState({
    copyrightYear: new Date().getFullYear(),
    footerTextAz: '',
    footerTextRu: '',
    footerTextEn: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [langRes, settingsRes] = await Promise.all([
        fetch('/api/languages'),
        fetch('/api/settings'),
      ]);
      
      const langData = await langRes.json();
      const settingsData = await settingsRes.json();
      
      setLanguages(langData);
      
      if (settingsData) {
        setSettingsFormData({
          copyrightYear: settingsData.copyrightYear,
          footerTextAz: settingsData.footerTextAz,
          footerTextRu: settingsData.footerTextRu,
          footerTextEn: settingsData.footerTextEn,
        });
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLangSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingLangId ? `/api/languages/${editingLangId}` : '/api/languages';
      const method = editingLangId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(langFormData),
      });

      if (res.ok) {
        await fetchData();
        resetLangForm();
      }
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  };

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsFormData),
      });

      if (res.ok) {
        await fetchData();
        alert('Settings updated successfully!');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const handleEditLang = (lang: Language) => {
    setEditingLangId(lang.id);
    setLangFormData({
      languageAz: lang.languageAz,
      languageRu: lang.languageRu,
      languageEn: lang.languageEn,
      proficiencyAz: lang.proficiencyAz,
      proficiencyRu: lang.proficiencyRu,
      proficiencyEn: lang.proficiencyEn,
      order: lang.order,
    });
  };

  const handleDeleteLang = async (id: string) => {
    if (!confirm('Are you sure you want to delete this language?')) return;
    
    try {
      const res = await fetch(`/api/languages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Failed to delete language:', error);
    }
  };

  const resetLangForm = () => {
    setEditingLangId(null);
    setLangFormData({
      languageAz: '',
      languageRu: '',
      languageEn: '',
      proficiencyAz: '',
      proficiencyRu: '',
      proficiencyEn: '',
      order: 0,
    });
  };

  if (status === 'loading' || loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Languages & Site Settings</h1>

      {/* Languages Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Languages</h2>
        
        {/* Language Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {editingLangId ? 'Edit Language' : 'Add New Language'}
          </h3>
          <form onSubmit={handleLangSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Language (AZ)</label>
                <input
                  type="text"
                  value={langFormData.languageAz}
                  onChange={(e) => setLangFormData({ ...langFormData, languageAz: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Azərbaycanca"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Language (RU)</label>
                <input
                  type="text"
                  value={langFormData.languageRu}
                  onChange={(e) => setLangFormData({ ...langFormData, languageRu: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Азербайджанский"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Language (EN)</label>
                <input
                  type="text"
                  value={langFormData.languageEn}
                  onChange={(e) => setLangFormData({ ...langFormData, languageEn: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Azerbaijani"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Proficiency (AZ)</label>
                <input
                  type="text"
                  value={langFormData.proficiencyAz}
                  onChange={(e) => setLangFormData({ ...langFormData, proficiencyAz: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Ana dil"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Proficiency (RU)</label>
                <input
                  type="text"
                  value={langFormData.proficiencyRu}
                  onChange={(e) => setLangFormData({ ...langFormData, proficiencyRu: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Родной"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Proficiency (EN)</label>
                <input
                  type="text"
                  value={langFormData.proficiencyEn}
                  onChange={(e) => setLangFormData({ ...langFormData, proficiencyEn: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Native"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Order</label>
              <input
                type="number"
                value={langFormData.order}
                onChange={(e) => setLangFormData({ ...langFormData, order: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white max-w-xs"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                {editingLangId ? 'Update' : 'Add'} Language
              </button>
              {editingLangId && (
                <button
                  type="button"
                  onClick={resetLangForm}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Languages List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Languages List</h3>
          <div className="space-y-4">
            {languages.map((lang) => (
              <div key={lang.id} className="border dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{lang.languageEn}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Proficiency: {lang.proficiencyEn}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditLang(lang)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteLang(lang.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Site Settings Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Site Settings</h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <form onSubmit={handleSettingsSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Copyright Year</label>
              <input
                type="number"
                value={settingsFormData.copyrightYear}
                onChange={(e) => setSettingsFormData({ ...settingsFormData, copyrightYear: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white max-w-xs"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Footer Text (AZ)</label>
                <input
                  type="text"
                  value={settingsFormData.footerTextAz}
                  onChange={(e) => setSettingsFormData({ ...settingsFormData, footerTextAz: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Bütün hüquqlar qorunur."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Footer Text (RU)</label>
                <input
                  type="text"
                  value={settingsFormData.footerTextRu}
                  onChange={(e) => setSettingsFormData({ ...settingsFormData, footerTextRu: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Все права защищены."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Footer Text (EN)</label>
                <input
                  type="text"
                  value={settingsFormData.footerTextEn}
                  onChange={(e) => setSettingsFormData({ ...settingsFormData, footerTextEn: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="All rights reserved."
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Save Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
