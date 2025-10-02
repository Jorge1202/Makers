// src/components/posts/PostHeader.tsx
import { useState, useEffect, useRef } from 'react';

import { PostMenu } from './PostMenu';
import type { Posts } from '@/features/home/types/posts';
// import { Toast } from '@/components/ui/Toast';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface PostProps {
  post: Posts;
  isSaved: boolean;
  onSave: (postId: string) => void;
  handleUnsave: (postId: string) => void;
  addToast: ({id, message, type}:ToastInfo) => void;
}

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export function PostHeader({post, isSaved, onSave, handleUnsave, addToast}:PostProps) {

// Handlers para el menú
  const handleReport = (postId: string) => {
    addToast({
      id: Math.random().toString(),
      message: 'Post reportado',
      type: 'info'
    });
  };

  const handleCopyLink = (postUrl: string) => {
    navigator.clipboard.writeText(postUrl);
    addToast({
      id: Math.random().toString(),
      message: 'Enlace copiado al portapapeles',
      type: 'success'
    });
  };

  const handleMute = (username: string) => {
    addToast({
      id: Math.random().toString(),
      message: `Notificaciones de ${username} silenciadas`,
      type: 'info'
    });
  };

  const handleBlock = (username: string) => {
    addToast({
      id: Math.random().toString(),
      message: `Has dejado de seguir a ${username}`,
      type: 'info'
    });
  };



  return (
    <div className="flex items-center justify-between p-4">      

      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center overflow-hidden">
          <img
            src={post.avatar}
            alt={post.username}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <span className="text-white font-semibold text-sm absolute">
            {post.avatar ? '' : post.username.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-sm">{post.username}</span>
            {post.userBadge && (
              <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium">
                {post.userBadge}
              </span>
            )}
          </div>
          {post.location && (
            <div className="text-xs text-gray-500">{post.location}</div>
          )}
        </div>
      </div>

      {/* Menú de tres puntos */}
      <PostMenu
        postId={post.id}
        username={post.username}
        isSaved={isSaved}
        onSave={onSave}
        onUnsave={handleUnsave}
        onReport={handleReport}
        onCopyLink={handleCopyLink}
        onMute={handleMute}
        onBlock={handleBlock}
        onAddToast={addToast}
      />
    </div>
  );
}