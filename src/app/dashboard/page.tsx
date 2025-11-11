'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const { data: session } = useSession();

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mt-8">
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
          </div>
        </div>
      </div>
    </div>
  );
}
