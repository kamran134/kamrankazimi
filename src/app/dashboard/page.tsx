'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Dashboard() {
  const { data: session } = useSession();
  const [downloading, setDownloading] = useState(false);

  const handleDownloadCV = async () => {
    try {
      setDownloading(true);
      const response = await fetch('/api/cv/download');
      
      if (!response.ok) {
        throw new Error('Failed to download CV');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `CV_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading CV:', error);
      alert('Failed to download CV. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg min-h-96 p-8">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Admin Dashboard
          </h1>
          {session?.user && (
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-center max-w-md">
              Welcome, {session.user.email}! Manage your portfolio content, projects, and site settings.
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-8">
            <Link
              href="/dashboard/content"
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Content Editor</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Edit Hero, About sections and Contact information in all languages
              </p>
            </Link>
            <Link
              href="/dashboard/projects"
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Projects & Skills</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Add and manage your projects and technical skills
              </p>
            </Link>
            <Link
              href="/dashboard/experience"
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Experience</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Manage your work experience and professional history
              </p>
            </Link>
            <Link
              href="/dashboard/education"
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Education</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Manage your educational background
              </p>
            </Link>
            <Link
              href="/dashboard/settings"
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Languages & Settings</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Manage languages proficiency and site settings
              </p>
            </Link>
            <Link
              href="/dashboard/account"
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Account Settings</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Change your email and password
              </p>
            </Link>
            <Link
              href="/dashboard/messages"
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-4xl mb-4">📬</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Contact Messages</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                View and respond to contact form submissions
              </p>
            </Link>
            <button
              onClick={handleDownloadCV}
              disabled={downloading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-white disabled:opacity-50 disabled:cursor-not-allowed text-left"
            >
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Download CV</h3>
              <p className="text-sm text-white/90">
                {downloading ? 'Generating PDF...' : 'Export your portfolio as a professional PDF resume'}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
