// src/components/posts/PostContent.tsx
'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, GitFork, Clock, HelpCircle, CheckCircle, Lightbulb, Loader, AlertCircle } from 'lucide-react';
import type { Posts, Media } from '@/lib/types/posts';

interface PostContentProps {
    post: Posts;
    currentSlide: number;
    isPlaying: boolean;
    videoRef: React.RefObject<HTMLVideoElement | null>;
    onNextSlide: () => void;
    onPrevSlide: () => void;
    onSlideChange: (index: number) => void;
    onToggleVideo: () => void;
}

export function PostContent({
    post,
    currentSlide,
    isPlaying,
    videoRef,
    onNextSlide,
    onPrevSlide,
    onSlideChange,
    onToggleVideo
}: PostContentProps) {
    const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const currentMedia = post.media[currentSlide];

  // Reset estados cuando cambia el slide o el media
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [currentSlide, currentMedia.url]);

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const renderMedia = () => (
    <div className="relative bg-black aspect-square">
      {currentMedia.type === 'video' ? (
        <div className="w-full h-full flex items-center justify-center relative">
          <video
            ref={videoRef}
            src={currentMedia.url}
            className="w-full h-full object-cover"
            loop
            muted
            onClick={onToggleVideo}
            onLoadedData={handleVideoLoad}
            onCanPlay={handleVideoLoad}
            onError={handleVideoError}
            preload="metadata"
          />
          
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <Loader className="h-8 w-8 text-white animate-spin" />
            </div>
          )}
          
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
              onClick={onToggleVideo}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all"
              aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
            >
              <div className={`bg-black bg-opacity-50 rounded-full p-4 transition-all ${
                isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
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
              onClick={() => onSlideChange(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white scale-110' : 'bg-white bg-opacity-50'
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
              onClick={onPrevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              ‹
            </button>
          )}
          {currentSlide < post.media.length - 1 && (
            <button
              onClick={onNextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              ›
            </button>
          )}
        </>
      )}
    </div>
  );

    // Renderizar badge específico según el tipo de post
    const renderPostBadge = () => {
        switch (post.type) {
            case 'project':
                return (
                    <div className="flex items-center space-x-2">
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            PROYECTO COMPLETADO
                        </div>
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                            <GitFork className="h-3 w-3 mr-1" />
                            {post.forks} replicaciones
                        </div>
                    </div>
                );

            case 'wip':
                return (
                    <div className="flex items-center space-x-2">
                        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            EN PROGRESO
                        </div>
                        {post.needsHelp && (
                            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                                <HelpCircle className="h-3 w-3 mr-1" />
                                NECESITO AYUDA
                            </div>
                        )}
                    </div>
                );

            case 'tutorial':
                return (
                    <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium flex items-center w-fit">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        TUTORIAL PASO A PASO
                    </div>
                );

            case 'micro':
                return (
                    <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium flex items-center w-fit">
                        <Lightbulb className="h-3 w-3 mr-1" />
                        TIP RÁPIDO • {post.duration || '1 min'}
                    </div>
                );

            case 'question':
                return (
                    <div className="flex items-center space-x-2">
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                            {/* <Question className="h-3 w-3 mr-1" /> */}
                            PREGUNTA
                        </div>
                        {post.isResolved && (
                            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                RESUELTO
                            </div>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    // Renderizar contenido específico según el tipo de post
    const renderPostSpecificContent = () => {
        switch (post.type) {
            case 'project':
                const projectPost = post;
                return (
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 mb-3">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                                <span className="font-semibold">Dificultad:</span> {projectPost.projectStats?.difficulty}
                            </div>
                            <div>
                                <span className="font-semibold">Tiempo:</span> {projectPost.projectStats?.timeRequired}
                            </div>
                            <div className="col-span-2">
                                <span className="font-semibold">Materiales:</span> {projectPost.projectStats?.materials?.join(', ')}
                            </div>
                        </div>
                    </div>
                );

            case 'wip':
                const wipPost = post;
                return (
                    <div className="bg-yellow-50 rounded-lg p-3 mb-3">
                        <div className="text-sm">
                            <span className="font-semibold">Paso actual:</span>
                            <p className="text-gray-600 mt-1">{wipPost.currentStep}</p>
                        </div>
                        {wipPost.nextSteps && wipPost.nextSteps.length > 0 && (
                            <div className="mt-2 text-xs">
                                <span className="font-semibold">Próximos pasos:</span>
                                <ul className="list-disc list-inside text-gray-600 ml-2">
                                    {wipPost.nextSteps.map((step: string, index: number) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                );

            case 'tutorial':
                const tutorialPost = post;
                return (
                    <div className="bg-purple-50 rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-semibold">Nivel: {tutorialPost.skillLevel}</span>
                            <span>{tutorialPost.steps?.length || 0} pasos</span>
                        </div>
                    </div>
                );

            case 'micro':
                const microPost = post;
                return (
                    <div className="bg-orange-50 rounded-lg p-3 mb-3">
                        <div className="text-sm">
                            <span className="font-semibold">Tipo:</span> {microPost.tipType}
                        </div>
                    </div>
                );

            case 'question':
                const questionPost = post;
                return (
                    <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <div className="text-sm">
                            <span className="font-semibold">Categoría:</span> {questionPost.category}
                            {questionPost.urgency && (
                                <span className={`ml-2 px-2 py-1 rounded text-xs ${questionPost.urgency === 'high' ? 'bg-red-100 text-red-800' :
                                        questionPost.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-green-100 text-green-800'
                                    }`}>
                                    {questionPost.urgency === 'high' ? 'Urgente' :
                                        questionPost.urgency === 'medium' ? 'Media' : 'Baja'}
                                </span>
                            )}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            {/* Badge del tipo de post */}
            <div className="px-4 pb-2">
                {renderPostBadge()}
            </div>

            {/* Media */}
            {renderMedia()}

            {/* Contenido específico del post */}
            <div className="px-4 pt-3">
                {renderPostSpecificContent()}

                {/* Caption (común a todos los posts) */}
                <div className="text-sm mb-2 whitespace-pre-line">
                    <span className="font-semibold mr-2">{post.username}</span>
                    {post.caption}
                </div>

                {/* Timestamp */}
                <div className="text-gray-500 text-xs uppercase mb-3">
                    {post.timestamp}
                </div>
            </div>
        </>
    );
}