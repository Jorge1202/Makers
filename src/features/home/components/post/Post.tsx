// src/components/instagram/InstagramPost.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { PostHeader } from './PostHeader';
import { PostActions } from './PostActions';
import { Toast } from '@/components/ui/Toast';
import type { Posts } from '@/features/home/types/posts';
import { Play, Pause, CheckCircle, AlertCircle } from 'lucide-react';
import { PostProject } from './variants/ProjectPost';
import { PostWip } from './variants/WipPost';
import { PostTutorial } from './variants/PostTutorial';
import { PostMicro } from './variants/PostMicro';
import { PostQuestion } from './variants/PostQuestion';

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
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const currentMedia = post.media[currentSlide];

  // Reset video cuando cambia el slide
  useEffect(() => {
    if (post.media[currentSlide].type === 'video' && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [currentSlide, post.media]);

  //#region Manejo de toasts
  const addToast = (toast: ToastInfo) => {
    setToasts(prev => [...prev, toast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  //#endregion Manejo de toasts

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



  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };


  //#region Video Handlers
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [currentSlide, currentMedia.url]);


  const toggleVideoPlayback = async () => {
    // Control de video
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

  const handleVideoLoad = () => {
    setIsLoading(false);
  };


  const handleVideoError = () => {
    setIsLoading(false);
    setHasError(true);
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

  const renderMedia = () => (
    <div className={`relative bg-black aspect-square my-4`}>
      {currentMedia.type === 'video' ? (
        <div className="w-full h-full flex items-center justify-center relative">
          <video
            // controls
            ref={videoRef}
            src={currentMedia.url}
            className="w-full object-cover"
            loop
            muted
            onClick={toggleVideoPlayback}
            onLoadedData={handleVideoLoad}
            onCanPlay={handleVideoLoad}
            onError={handleVideoError}
            preload="metadata"
          />

          {/* Loading State */}
          {/* {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <Loader className="h-8 w-8 text-white animate-spin" />
                        </div>
                    )} */}

          {/* Error State */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
              <div className="text-center text-white p-4">
                <AlertCircle className="h-12 w-12 mx-auto mb-2" />
                <div className="text-sm">No se pudo cargar el video</div>
                <div className="text-xs opacity-70 mt-1">Intenta recargar la página</div>
              </div>
            </div>
          )}

          {/* Play/Pause Button - solo si está listo */}
          {!isLoading && !hasError && (
            <button
              onClick={toggleVideoPlayback}
              className="absolute inset-0 flex items-center justify-center bg-opacity-30 hover:bg-opacity-20 transition-all"
              aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
            >
              <div className={`bg-black bg-opacity-50 rounded-full p-4 transition-all ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
                }`}>
                {isPlaying ? (
                  <Pause className="h-8 w-8 text-white" />
                ) : (
                  <Play className="h-8 w-8 text-white fill-white" />
                )}
              </div>
            </button>
          )}
        </div>
      ) : (
        // Imagen
        <img
          src={currentMedia.url}
          alt={currentMedia.alt || `Imagen de ${post.username}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            // Mostrar fallback
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
      )}

      {/* Navigation Dots */}
      {post.media.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {post.media.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-white scale-110' : 'bg-white bg-opacity-50'
                }`}
            />
          ))}
        </div>
      )}

      {/* Navigation Arrows */}
      {post.media.length > 1 && (
        <>
          {currentSlide > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              ‹
            </button>
          )}
          {currentSlide < post.media.length - 1 && (
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              ›
            </button>
          )}
        </>
      )}
    </div>
  );
  //#endregion Video Handlers


  const renderPostContent = () => {
    switch (post.type) {
      case 'project':
        return (
          <PostProject post={post} >
            {renderMedia()}
          </PostProject>
        )

      case 'wip':
        return (
          <PostWip post={post}>
            {renderMedia()}
          </PostWip>
        );

      case 'tutorial':
        return (
          <PostTutorial post={post}>
            {renderMedia()}
          </PostTutorial>
        );

      case 'micro':
        return (
          <PostMicro post={post}>
            {renderMedia()}
          </PostMicro>
        );

      case 'question':
        return (
          <PostQuestion post={post}>
            {renderMedia()}
          </PostQuestion>
        );

      default:
        return null;
    }
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

      <div className='px-4 pb-2'>
        {/* Contenido específico del tipo de post */}
        {renderPostContent()}

        {/* Post Actions */}
        <PostActions
          post={post}
          isSaved={isSaved}
          addToast={addToast}
          onSave={handleSavePost}
        />
      </div>

    </div>
  );
}