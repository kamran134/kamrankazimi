'use client';

import { useState } from 'react';

interface ContentData {
  id: string;
  key: string;
  az: string;
  ru: string;
  en: string;
}

const defaultContent: ContentData[] = [
  {
    id: '1',
    key: 'hero.title',
    az: 'Salam! Mən Kamran Kazimi',
    ru: 'Привет! Я Камран Казими',
    en: 'Hello! I\'m Kamran Kazimi',
  },
  {
    id: '2',
    key: 'hero.subtitle',
    az: 'Frontend Mühəndisi',
    ru: 'Фронтенд Инженер',
    en: 'Frontend Engineer',
  },
];

export default function ContentEditor() {
  const [content, setContent] = useState<ContentData[]>(defaultContent);
  const [editingId, setEditingId] = useState<string | null>(null);

  const updateContent = (id: string, field: keyof ContentData, value: string) => {
    setContent(prev => 
      prev.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Content Editor
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Manage multilingual content for your portfolio
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {content.map((item) => (
            <li key={item.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {item.key}
                </div>
                <button
                  onClick={() => setEditingId(editingId === item.id ? null : item.id)}
                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {editingId === item.id ? 'Save' : 'Edit'}
                </button>
              </div>
              
              {editingId === item.id ? (
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Azerbaijani
                    </label>
                    <input
                      type="text"
                      value={item.az}
                      onChange={(e) => updateContent(item.id, 'az', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Russian
                    </label>
                    <input
                      type="text"
                      value={item.ru}
                      onChange={(e) => updateContent(item.id, 'ru', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      English
                    </label>
                    <input
                      type="text"
                      value={item.en}
                      onChange={(e) => updateContent(item.id, 'en', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  <div><strong>AZ:</strong> {item.az}</div>
                  <div><strong>RU:</strong> {item.ru}</div>
                  <div><strong>EN:</strong> {item.en}</div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
