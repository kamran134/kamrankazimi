'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Experience {
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

export default function ExperiencePage() {
  const { status } = useSession();
  const router = useRouter();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyAz: '',
    companyRu: '',
    companyEn: '',
    positionAz: '',
    positionRu: '',
    positionEn: '',
    periodAz: '',
    periodRu: '',
    periodEn: '',
    locationAz: '',
    locationRu: '',
    locationEn: '',
    responsibilitiesAz: '',
    responsibilitiesRu: '',
    responsibilitiesEn: '',
    startDate: '',
    endDate: '',
    current: false,
    order: 0,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await fetch('/api/experience');
      const data = await res.json();
      setExperiences(data);
    } catch (error) {
      console.error('Failed to fetch experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingId ? `/api/experience/${editingId}` : '/api/experience';
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await fetchExperiences();
        resetForm();
      }
    } catch (error) {
      console.error('Failed to save experience:', error);
    }
  };

  const handleEdit = (exp: Experience) => {
    setEditingId(exp.id);
    setFormData({
      companyAz: exp.companyAz,
      companyRu: exp.companyRu,
      companyEn: exp.companyEn,
      positionAz: exp.positionAz,
      positionRu: exp.positionRu,
      positionEn: exp.positionEn,
      periodAz: exp.periodAz,
      periodRu: exp.periodRu,
      periodEn: exp.periodEn,
      locationAz: exp.locationAz,
      locationRu: exp.locationRu,
      locationEn: exp.locationEn,
      responsibilitiesAz: exp.responsibilitiesAz,
      responsibilitiesRu: exp.responsibilitiesRu,
      responsibilitiesEn: exp.responsibilitiesEn,
      startDate: exp.startDate.split('T')[0],
      endDate: exp.endDate ? exp.endDate.split('T')[0] : '',
      current: exp.current,
      order: exp.order,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    
    try {
      const res = await fetch(`/api/experience/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchExperiences();
      }
    } catch (error) {
      console.error('Failed to delete experience:', error);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      companyAz: '',
      companyRu: '',
      companyEn: '',
      positionAz: '',
      positionRu: '',
      positionEn: '',
      periodAz: '',
      periodRu: '',
      periodEn: '',
      locationAz: '',
      locationRu: '',
      locationEn: '',
      responsibilitiesAz: '',
      responsibilitiesRu: '',
      responsibilitiesEn: '',
      startDate: '',
      endDate: '',
      current: false,
      order: 0,
    });
  };

  if (status === 'loading' || loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Manage Experience</h1>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {editingId ? 'Edit Experience' : 'Add New Experience'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Company (AZ)</label>
              <input
                type="text"
                value={formData.companyAz}
                onChange={(e) => setFormData({ ...formData, companyAz: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Company (RU)</label>
              <input
                type="text"
                value={formData.companyRu}
                onChange={(e) => setFormData({ ...formData, companyRu: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Company (EN)</label>
              <input
                type="text"
                value={formData.companyEn}
                onChange={(e) => setFormData({ ...formData, companyEn: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Position (AZ)</label>
              <input
                type="text"
                value={formData.positionAz}
                onChange={(e) => setFormData({ ...formData, positionAz: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Position (RU)</label>
              <input
                type="text"
                value={formData.positionRu}
                onChange={(e) => setFormData({ ...formData, positionRu: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Position (EN)</label>
              <input
                type="text"
                value={formData.positionEn}
                onChange={(e) => setFormData({ ...formData, positionEn: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Period (AZ)</label>
              <input
                type="text"
                value={formData.periodAz}
                onChange={(e) => setFormData({ ...formData, periodAz: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Sen 2021 – İndiki vaxt"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Period (RU)</label>
              <input
                type="text"
                value={formData.periodRu}
                onChange={(e) => setFormData({ ...formData, periodRu: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Сен 2021 – Настоящее время"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Period (EN)</label>
              <input
                type="text"
                value={formData.periodEn}
                onChange={(e) => setFormData({ ...formData, periodEn: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Sep 2021 – Present"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Location (AZ)</label>
              <input
                type="text"
                value={formData.locationAz}
                onChange={(e) => setFormData({ ...formData, locationAz: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Location (RU)</label>
              <input
                type="text"
                value={formData.locationRu}
                onChange={(e) => setFormData({ ...formData, locationRu: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Location (EN)</label>
              <input
                type="text"
                value={formData.locationEn}
                onChange={(e) => setFormData({ ...formData, locationEn: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Responsibilities (AZ)</label>
              <textarea
                value={formData.responsibilitiesAz}
                onChange={(e) => setFormData({ ...formData, responsibilitiesAz: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={4}
                placeholder="• Item 1&#10;• Item 2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Responsibilities (RU)</label>
              <textarea
                value={formData.responsibilitiesRu}
                onChange={(e) => setFormData({ ...formData, responsibilitiesRu: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Responsibilities (EN)</label>
              <textarea
                value={formData.responsibilitiesEn}
                onChange={(e) => setFormData({ ...formData, responsibilitiesEn: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={4}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                disabled={formData.current}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Current Job</label>
              <input
                type="checkbox"
                checked={formData.current}
                onChange={(e) => setFormData({ ...formData, current: e.target.checked, endDate: e.target.checked ? '' : formData.endDate })}
                className="mt-3 w-4 h-4"
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
              {editingId ? 'Update' : 'Add'} Experience
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
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Experiences List</h2>
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="border dark:border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{exp.positionEn}</h3>
                  <p className="text-blue-600 dark:text-blue-400">{exp.companyEn}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{exp.periodEn} | {exp.locationEn}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
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
