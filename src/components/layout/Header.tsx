// src/components/layout/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Home, MessageCircle, PlusSquare, Compass, Heart, Menu } from 'lucide-react';
import { SearchInput } from '@/components/home/Search';

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    // <header className="fixed top-0 left-0 right-0 pt-5 bg-white border-b border-gray-300 z-50">
    <header className="fixed top-0 inset-x-0 bg-white border-b border-gray-300 z-50 backdrop-blur-sm bg-white/95 h-14">    
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-instagram font-bold">Makers</div>
          </Link>
        </div>

        {/* Search Bar - Solo en desktop */}
        <div className="hidden md:flex flex-1 max-w-xs mx-8">
          <SearchInput />
        </div>

        {/* Navigation Icons */}
        <nav className="flex items-center space-x-4">
          {/* Mobile Menu */}
          <button className="md:hidden p-2">
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg">
              <Home className="h-6 w-6" />
            </Link>
            
            <Link href="/direct" className="p-2 hover:bg-gray-100 rounded-lg">
              <MessageCircle className="h-6 w-6" />
            </Link>
            
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <PlusSquare className="h-6 w-6" />
            </button>
            
            <Link href="/explore" className="p-2 hover:bg-gray-100 rounded-lg">
              <Compass className="h-6 w-6" />
            </Link>
            
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Heart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          {/* User Profile */}
          <Link href="/profile" className="p-1">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">U</span>
            </div>
          </Link>
        </nav>
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-4 top-14 w-80 bg-white border border-gray-300 rounded-lg shadow-xl">
          <div className="p-4">
            <h3 className="font-semibold mb-3">Notificaciones</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                <div className="flex-1 text-sm">
                  <span className="font-semibold">usuario1</span> empezó a seguirte
                </div>
                <div className="text-xs text-gray-500">1h</div>
              </div>
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                <div className="flex-1 text-sm">
                  <span className="font-semibold">usuario2</span> le dio like a tu publicación
                </div>
                <div className="text-xs text-gray-500">2h</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}