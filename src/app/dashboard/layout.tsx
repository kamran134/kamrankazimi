'use client';

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/dashboard" className="text-xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </Link>
              <div className="hidden md:flex space-x-4">
                <Link
                  href="/dashboard/content"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md transition"
                >
                  Content
                </Link>
                <Link
                  href="/dashboard/projects"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md transition"
                >
                  Projects
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {session?.user && (
                <span className="hidden sm:block text-sm text-gray-600 dark:text-gray-300">
                  {session.user.email}
                </span>
              )}
              <ThemeSwitcher />
              <Link
                href="/"
                className="bg-blue-600 text-white px-3 py-2 text-sm rounded-md hover:bg-blue-700 transition whitespace-nowrap"
              >
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-3 py-2 text-sm rounded-md hover:bg-red-700 transition whitespace-nowrap"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
