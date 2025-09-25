// src/components/profile/ProfileTabs.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface ProfileTabsProps {
  username: string;
  currentTab: string;
}

const tabs = [
  { id: 'overview', label: 'Resumen', href: '' },
  { id: 'projects', label: 'Proyectos', href: '/projects' },
  { id: 'tutorials', label: 'Tutoriales', href: '/tutorials' },
  { id: 'about', label: 'Acerca de', href: '/about' },
];

export function ProfileTabs({ username, currentTab }: ProfileTabsProps) {
  const pathname = usePathname();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8">
          {tabs.map(tab => {
            const href = `/${username}${tab.href}`;
            const isActive = pathname === href || 
                           (tab.href === '' && pathname === `/${username}`);

            return (
              <Link
                key={tab.id}
                href={href}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}