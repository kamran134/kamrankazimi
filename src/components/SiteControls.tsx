'use client';

import { usePathname } from 'next/navigation';
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function SiteControls() {
  const pathname = usePathname();
  
  // Не показываем на страницах админки и логина
  if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/login')) {
    return null;
  }

  return (
    <nav className="fixed top-0 right-0 z-50 p-4">
      <div className="flex gap-4 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-full px-4 py-2">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
