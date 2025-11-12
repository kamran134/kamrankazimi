'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Education {
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

export default function EducationPage() {
  const { status } = useSession();
  const router = useRouter();
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    degreeAz: '',
    degreeRu: '',
    degreeEn: '',
    institutionAz: '',
    institutionRu: '',
    institutionEn: '',
    year: new Date().getFullYear(),
    order: 0,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const res = await fetch('/api/education');
      const data = await res.json();
      setEducation(data);
    } catch (error) {
      console.error('Failed to fetch education:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingId ? `/api/education/${editingId}` : '/api/education';
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await fetchEducation();
        resetForm();
      }
    } catch (error) {
      console.error('Failed to save education:', error);
    }
  };

  const handleEdit = (edu: Education) => {
    setEditingId(edu.id);
    setFormData({
      degreeAz: edu.degreeAz,
      degreeRu: edu.degreeRu,
      degreeEn: edu.degreeEn,
      institutionAz: edu.institutionAz,
      institutionRu: edu.institutionRu,
      institutionEn: edu.institutionEn,
      year: edu.year,
      order: edu.order,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education?')) return;
    
    try {
      const res = await fetch(`/api/education/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchEducation();
      }
    } catch (error) {
      console.error('Failed to delete education:', error);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      degreeAz: '',
      degreeRu: '',
      degreeEn: '',
      institutionAz: '',
      institutionRu: '',
      institutionEn: '',
      year: new Date().getFullYear(),
      order: 0,
    });
  };

  if (status === 'loading' || loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Manage Education</h1>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {editingId ? 'Edit Education' : 'Add New Education'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Degree (AZ)</label>
              <input
                type="text"
                value={formData.degreeAz}
                onChange={(e) => setFormData({ ...formData, degreeAz: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Kompüter Elmləri üzrə Magistr"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Degree (RU)</label>
              <input
                type="text"
                value={formData.degreeRu}
                onChange={(e) => setFormData({ ...formData, degreeRu: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Магистр компьютерных наук"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Degree (EN)</label>
              <input
                type="text"
                value={formData.degreeEn}
                onChange={(e) => setFormData({ ...formData, degreeEn: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="M.Sc. in Computer Science"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Institution (AZ)</label>
              <input
                type="text"
                value={formData.institutionAz}
                onChange={(e) => setFormData({ ...formData, institutionAz: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Institution (RU)</label>
              <input
                type="text"
                value={formData.institutionRu}
                onChange={(e) => setFormData({ ...formData, institutionRu: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Institution (EN)</label>
              <input
                type="text"
                value={formData.institutionEn}
                onChange={(e) => setFormData({ ...formData, institutionEn: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Year</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              {editingId ? 'Update' : 'Add'} Education
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Education List</h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="border dark:border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{edu.degreeEn}</h3>
                  <p className="text-blue-600 dark:text-blue-400">{edu.institutionEn}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Year: {edu.year}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(edu)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(edu.id)}
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
  );
}
