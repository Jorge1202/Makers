// src/components/instagram/InstagramPost.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { PostHeader } from './PostHeader';
import { PostActions } from './PostActions';
import { PostContent } from './PostContent';
import { Toast } from '@/components/ui/Toast';
import type { Posts } from '@/lib/types/posts';

interface PostProps {
  post: Posts;
}

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export function Post({ post }: PostProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);


  // Control de video
  const toggleVideoPlayback = async () => {
    if (post.media[currentSlide].type === 'video' && videoRef.current) {
      try {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        } else {
          await videoRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Error reproduciendo video:', error);
        addToast({
          id: Math.random().toString(),
          message: 'Error al reproducir el video',
          type: 'error'
        });
      }
    }
  };


  // Reset video cuando cambia el slide
  useEffect(() => {
    if (post.media[currentSlide].type === 'video' && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [currentSlide, post.media]);

  // Manejo de toasts
  const addToast = (toast: ToastInfo) => {
    setToasts(prev => [...prev, toast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleSave = () => {
    setIsSaved(true);
    addToast({
      id: Math.random().toString(),
      message: 'Post guardado en favoritos',
      type: 'success'
    });
  };

  const handleUnsave = () => {
    setIsSaved(false);
    addToast({
      id: Math.random().toString(),
      message: 'Post removido de favoritos',
      type: 'info'
    });
  };

  const handleSavePost = () => {
    setIsSaved(!isSaved);
    addToast({
      id: Math.random().toString(),
      message: isSaved ? 'Post quitado de guardados' : 'Post guardado',
      type: 'success'
    });
  };

  const nextSlide = () => {
    if (currentSlide < post.media.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg mb-4">
      {/* Toasts */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      {/* Post Header */}
      <PostHeader 
        post={post} 
        isSaved={isSaved} 
        onSave={handleSave} 
        handleUnsave={handleUnsave} 
        addToast={addToast}
      />
     
      {/* Contenido específico del tipo de post */}
      <PostContent
        post={post}
        currentSlide={currentSlide}
        isPlaying={isPlaying}
        videoRef={videoRef}
        onNextSlide={nextSlide}
        onPrevSlide={prevSlide}
        onSlideChange={handleSlideChange}
        onToggleVideo={toggleVideoPlayback}
      />

      {/* Post Actions */}
      <PostActions 
        post={post} 
        isSaved={isSaved} 
        addToast={addToast} 
        onSave={handleSavePost} 
      />
    </div>
  );
}