// src/components/instagram/PostMenu.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Flag, Bookmark, Link2, Share, UserX, VolumeX, Bell } from 'lucide-react';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface PostMenuProps {
  postId: string;
  username: string;
  isSaved: boolean;
  onSave: (postId: string) => void;
  onUnsave: (postId: string) => void;
  onReport: (postId: string) => void;
  onCopyLink: (postUrl: string) => void;
  onMute: (username: string) => void;
  onBlock: (username: string) => void;
  onAddToast: (toast: ToastInfo) => void;
}

export function PostMenu({ 
  postId, 
  username, 
  isSaved, 
  onSave, 
  onUnsave, 
  onReport, 
  onCopyLink, 
  onMute, 
  onBlock,
  onAddToast
}: PostMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyLink = async () => {
    try {
      const postUrl = `${window.location.origin}/p/${postId}`;
      
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(postUrl);
      } else {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = postUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      
      onAddToast({
        id: Math.random().toString(),
        message: 'Enlace copiado al portapapeles',
        type: 'success'
      });
      
      onCopyLink(postUrl);
      setIsOpen(false);
    } catch (err) {
      onAddToast({
        id: Math.random().toString(),
        message: 'Error al copiar el enlace',
        type: 'error'
      });
    }
  };

  const handleSave = () => {
    if (isSaved) {
      onUnsave(postId);
      onAddToast({
        id: Math.random().toString(),
        message: 'Post quitado de guardados',
        type: 'info'
      });
    } else {
      onSave(postId);
      onAddToast({
        id: Math.random().toString(),
        message: 'Post guardado',
        type: 'success'
      });
    }
    setIsOpen(false);
  };

  const menuItems = [
    {
      icon: Bookmark,
      label: isSaved ? 'Quitar de guardados' : 'Guardar',
      action: handleSave,
      color: 'text-gray-900'
    },
    {
      icon: Link2,
      label: 'Copiar enlace',
      action: handleCopyLink,
      color: 'text-gray-900'
    },
    {
      icon: Share,
      label: 'Compartir en...',
      action: () => {
        onAddToast({
          id: Math.random().toString(),
          message: 'Función de compartir próximamente',
          type: 'info'
        });
        setIsOpen(false);
      },
      color: 'text-gray-900'
    },
    {
      icon: Bell,
      label: 'Silenciar notificaciones',
      action: () => {
        onMute(username);
        onAddToast({
          id: Math.random().toString(),
          message: `Notificaciones de @${username} silenciadas`,
          type: 'info'
        });
        setIsOpen(false);
      },
      color: 'text-gray-900'
    },
    {
      icon: UserX,
      label: `Dejar de seguir`,
      action: () => {
        onBlock(username);
        onAddToast({
          id: Math.random().toString(),
          message: `Dejaste de seguir a @${username}`,
          type: 'info'
        });
        setIsOpen(false);
      },
      color: 'text-gray-900'
    },
    {
      icon: VolumeX,
      label: 'Ocultar',
      action: () => {
        onAddToast({
          id: Math.random().toString(),
          message: 'Post ocultado',
          type: 'info'
        });
        setIsOpen(false);
      },
      color: 'text-gray-900'
    },
    {
      icon: Flag,
      label: 'Reportar',
      action: () => {
        onReport(postId);
        onAddToast({
          id: Math.random().toString(),
          message: 'Post reportado a los administradores',
          type: 'success'
        });
        setIsOpen(false);
      },
      color: 'text-red-600'
    }
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* Botón de tres puntos */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
        aria-label="Más opciones"
      >
        <svg 
          aria-label="Más opciones" 
          fill="currentColor" 
          height="24" 
          role="img" 
          viewBox="0 0 24 24" 
          width="24"
        >
          <title>Más opciones</title>
          <circle cx="12" cy="12" r="1.5"></circle>
          <circle cx="6" cy="12" r="1.5"></circle>
          <circle cx="18" cy="12" r="1.5"></circle>
        </svg>
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-xl z-50 py-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${item.color}`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}