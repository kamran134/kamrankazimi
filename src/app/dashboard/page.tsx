export default function Dashboard() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg h-96">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-center max-w-md">
            Manage your portfolio content, projects, and site settings from here.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Content Editor</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Edit multilingual content
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Project Manager</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Add and manage projects
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
