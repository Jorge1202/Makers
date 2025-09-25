// src/components/menu/Search.tsx
'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

export function SearchInput() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Buscar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 pl-10 pr-10 text-sm focus:outline-none focus:border-gray-400 transition-colors"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>  

      {/* Resultados de Búsqueda (Dropdown) */}
      {isSearchFocused && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-xl mt-1 z-50">
          <div className="p-4">
            <div className="text-gray-500 text-sm mb-3">Recientes</div>
            
            {/* Resultados de ejemplo */}
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">M</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">maria_22</div>
                  <div className="text-gray-500 text-xs">María González</div>
                </div>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">J</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">juan_p</div>
                  <div className="text-gray-500 text-xs">Juan Pérez</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}