'use client';

import { useState, useEffect } from 'react';

interface Project {
  id?: string;
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

interface Skill {
  id?: string;
  name: string;
  category: string;
  order: number;
}

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<'projects' | 'skills'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newSkill, setNewSkill] = useState<Skill>({ name: '', category: 'Frontend', order: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, skillsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/skills'),
      ]);

      const projectsData = await projectsRes.json();
      const skillsData = await skillsRes.json();

      setProjects(projectsData);
      setSkills(skillsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const saveProject = async () => {
    if (!editingProject) return;
    
    setLoading(true);
    try {
      const url = editingProject.id ? `/api/projects/${editingProject.id}` : '/api/projects';
      const method = editingProject.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      });

      if (res.ok) {
        setMessage('Project saved successfully!');
        setEditingProject(null);
        fetchData();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch {
      setMessage('Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
        setMessage('Project deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch {
      setMessage('Failed to delete project');
    }
  };

  const addSkill = async () => {
    if (!newSkill.name || !newSkill.category) return;

    setLoading(true);
    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill),
      });

      if (res.ok) {
        setMessage('Skill added successfully!');
        setNewSkill({ name: '', category: 'Frontend', order: 0 });
        fetchData();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch {
      setMessage('Failed to add skill');
    } finally {
      setLoading(false);
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
        setMessage('Skill deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch {
      setMessage('Failed to delete skill');
    }
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Projects & Skills Manager
      </h1>

      {message && (
        <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
          {message}
        </div>
      )}

      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {(['projects', 'skills'] as const).map((tab) => (
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

      {activeTab === 'projects' && (
        <div>
          <button
            onClick={() => setEditingProject({
              titleAz: '', titleRu: '', titleEn: '',
              descAz: '', descRu: '', descEn: '',
              imageUrl: '', techStack: '', githubUrl: '', liveUrl: '',
              order: projects.length, featured: false
            })}
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add New Project
          </button>

          {editingProject && (
            <div className="mb-6 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingProject.id ? 'Edit Project' : 'New Project'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {(['Az', 'Ru', 'En'] as const).map((lang) => (
                  <div key={lang} className="space-y-3">
                    <h3 className="font-medium">{lang}</h3>
                    <input
                      type="text"
                      placeholder={`Title ${lang}`}
                      value={editingProject[`title${lang}` as keyof Project] as string}
                      onChange={(e) => setEditingProject({ ...editingProject, [`title${lang}`]: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <textarea
                      placeholder={`Description ${lang}`}
                      value={editingProject[`desc${lang}` as keyof Project] as string}
                      onChange={(e) => setEditingProject({ ...editingProject, [`desc${lang}`]: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={editingProject.imageUrl}
                  onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Tech Stack (comma-separated)"
                  value={editingProject.techStack}
                  onChange={(e) => setEditingProject({ ...editingProject, techStack: e.target.value })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="GitHub URL"
                  value={editingProject.githubUrl}
                  onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Live URL"
                  value={editingProject.liveUrl}
                  onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="number"
                  placeholder="Order"
                  value={editingProject.order}
                  onChange={(e) => setEditingProject({ ...editingProject, order: parseInt(e.target.value) })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingProject.featured}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-900 dark:text-white">Featured</span>
                </label>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={saveProject}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Project'}
                </button>
                <button
                  onClick={() => setEditingProject(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <h3 className="font-semibold text-lg mb-2">{project.titleEn}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{project.descEn}</p>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setEditingProject(project)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => project.id && deleteProject(project.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'skills' && (
        <div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Add New Skill</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Skill Name"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <select
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="DevOps">DevOps</option>
              </select>
              <input
                type="number"
                placeholder="Order"
                value={newSkill.order}
                onChange={(e) => setNewSkill({ ...newSkill, order: parseInt(e.target.value) })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                onClick={addSkill}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Add Skill
              </button>
            </div>
          </div>

          {['Frontend', 'Backend', 'DevOps'].map((category) => (
            <div key={category} className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{category}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {skills.filter(s => s.category === category).map((skill) => (
                  <div key={skill.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 flex justify-between items-center">
                    <span className="text-gray-900 dark:text-white">{skill.name}</span>
                    <button
                      onClick={() => skill.id && deleteSkill(skill.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
