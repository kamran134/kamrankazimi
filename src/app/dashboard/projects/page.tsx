'use client';

import { useState } from 'react';

interface Project {
  id: string;
  title: { az: string; ru: string; en: string };
  description: { az: string; ru: string; en: string };
  technologies: string[];
  url?: string;
  github?: string;
  image?: string;
}

const defaultProjects: Project[] = [
  {
    id: '1',
    title: {
      az: 'Portfolio Saytı',
      ru: 'Сайт-портфолио',
      en: 'Portfolio Website',
    },
    description: {
      az: 'Next.js və TypeScript ilə hazırlanmış portfolio saytı',
      ru: 'Сайт-портфолио, созданный с Next.js и TypeScript',
      en: 'Portfolio website built with Next.js and TypeScript',
    },
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    url: 'https://kamrankazimi.dev',
    github: 'https://github.com/kamrankazimi/portfolio',
  },
];

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [editingId, setEditingId] = useState<string | null>(null);

  const updateProject = (id: string, field: keyof Project, value: Project[keyof Project]) => {
    setProjects(prev =>
      prev.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Project Manager
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Manage your portfolio projects
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Add New Project
          </button>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {projects.map((project) => (
            <li key={project.id} className="px-6 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {project.title.en}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {project.description.en}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingId(editingId === project.id ? null : project.id)}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {editingId === project.id ? 'Cancel' : 'Edit'}
                  </button>
                  <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                    Delete
                  </button>
                </div>
              </div>

              {editingId === project.id && (
                <div className="mt-4 grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Title (AZ)
                      </label>
                      <input
                        type="text"
                        value={project.title.az}
                        onChange={(e) => updateProject(project.id, 'title', { ...project.title, az: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Title (RU)
                      </label>
                      <input
                        type="text"
                        value={project.title.ru}
                        onChange={(e) => updateProject(project.id, 'title', { ...project.title, ru: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Title (EN)
                      </label>
                      <input
                        type="text"
                        value={project.title.en}
                        onChange={(e) => updateProject(project.id, 'title', { ...project.title, en: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        URL
                      </label>
                      <input
                        type="url"
                        value={project.url || ''}
                        onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        GitHub
                      </label>
                      <input
                        type="url"
                        value={project.github || ''}
                        onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
