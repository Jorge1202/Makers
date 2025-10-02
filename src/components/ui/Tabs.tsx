// components/ui/Tabs.tsx - COMPONENTE GENÉRICO
'use client';

import { useState } from 'react';

interface Tab {
  id: string;
  name: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  children: (activeTab: string) => React.ReactNode;
}

export function Tabs({ tabs, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  return (
    <div>
      <nav className="flex space-x-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500'
            }`}
          >
            {tab.name}
            {tab.count && (
              <span className="ml-2 bg-gray-100 text-gray-500 py-0.5 px-2 rounded-full text-xs">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="py-6">
        {children(activeTab)}
      </div>
    </div>
  );
}