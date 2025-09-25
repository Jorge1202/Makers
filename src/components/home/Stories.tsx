// src/components/home/Stories.tsx
'use client';

import Image from 'next/image';
import { useState, useRef, useCallback, useEffect } from 'react';

interface Story {
  id: string;
  username: string;
  avatar: string;
  storyImage?: string;
  storyVideo?: string;
  isLive?: boolean;
  hasNewStory?: boolean;
  isViewed?: boolean;
  timestamp?: string;
}

const stories: Story[] = [
  { 
    id: '1', 
    username: 'Tu historia', 
    avatar: 'https://i.pravatar.cc/100?img=1', 
    storyImage: 'https://picsum.photos/400/600?random=1',
    hasNewStory: true,
    timestamp: 'Hace 2 horas'
  },
  { 
    id: '2', 
    username: 'maria_22', 
    avatar: 'https://i.pravatar.cc/100?img=2', 
    storyVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    isLive: true, 
    hasNewStory: true,
    timestamp: 'En vivo'
  },
  { 
    id: '3', 
    username: 'juan_p', 
    avatar: 'https://i.pravatar.cc/100?img=3', 
    storyVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    isViewed: false,
    hasNewStory: true,
    timestamp: 'Hace 30 min'
  },
  { 
    id: '4', 
    username: 'ana_photos', 
    avatar: 'https://i.pravatar.cc/100?img=4', 
    storyImage: 'https://picsum.photos/400/600?random=4',    
    isViewed: true,
    timestamp: 'Hace 1 hora'
  },
  { 
    id: '5', 
    username: 'carlos_d', 
    avatar: 'https://i.pravatar.cc/100?img=5',
    storyVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    isViewed: false,
    hasNewStory: true,
    timestamp: 'Hace 3 horas'
  },
  { 
    id: '6', 
    username: 'lucia_art', 
    avatar: 'https://i.pravatar.cc/100?img=6', 
    storyImage: 'https://picsum.photos/400/600?random=6',
    hasNewStory: true,
    timestamp: 'Hace 45 min'
  },
  { 
    id: '7', 
    username: 'pedro_v', 
    avatar: 'https://i.pravatar.cc/100?img=7',
    storyVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    isViewed: true,
    timestamp: 'Hace 4 horas'
  },  
  { 
    id: '8', 
    username: 'lucia_art', 
    avatar: 'https://i.pravatar.cc/100?img=8', 
    storyImage: 'https://picsum.photos/400/600?random=8',
    hasNewStory: true,
    timestamp: 'Hace 45 min'
  },
];

export function Stories() {
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [videoLoaded, setVideoLoaded] = useState<{ [key: string]: boolean }>({});
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const hoverTimeouts = useRef<{ [key: string]: NodeJS.Timeout | null }>({});

  const handleStoryClick = (story: Story) => {
    setActiveStory(story);
    console.log('Abrir historia:', story);
  };

  // Función para manejar la carga de videos
  const handleVideoLoad = (storyId: string) => {
    setVideoLoaded(prev => ({ ...prev, [storyId]: true }));
  };

  // Función mejorada para manejar hover
  const handleVideoHover = useCallback((storyId: string, isHovering: boolean) => {
    const video = videoRefs.current[storyId];
    
    if (!video || storyId === '1') return;

    // Limpiar timeout anterior
    if (hoverTimeouts.current[storyId]) {
      clearTimeout(hoverTimeouts.current[storyId]);
      hoverTimeouts.current[storyId] = null;
    }

    if (isHovering) {
      // Preload del video antes de reproducir
      if (!videoLoaded[storyId]) {
        video.load();
      }

      hoverTimeouts.current[storyId] = setTimeout(async () => {
        try {
          // Esperar a que el video esté listo
          if (video.readyState < 3) {
            await new Promise((resolve) => {
              video.addEventListener('loadeddata', resolve, { once: true });
            });
          }
          
          video.currentTime = 0;
          await video.play();
        } catch (error) {
          if (error instanceof Error && error.name !== 'AbortError') {
            console.warn(`Error al reproducir video ${storyId}:`, error);
          }
        }
      }, 150);
    } else {
      hoverTimeouts.current[storyId] = setTimeout(() => {
        try {
          if (!video.paused) {
            video.pause();
          }
          video.currentTime = 0;
        } catch (error) {
          console.warn(`Error al pausar video ${storyId}:`, error);
        }
      }, 100);
    }
  }, [videoLoaded]);

  // Efecto para precargar videos
  useEffect(() => {
    const preloadVideos = async () => {
      stories.forEach((story) => {
        if (story.storyVideo) {
          const video = document.createElement('video');
          video.src = story.storyVideo;
          video.preload = 'metadata';
          video.load();
        }
      });
    };

    preloadVideos();
  }, []);

  // Limpiar timeouts al desmontar
  useEffect(() => {
    return () => {
      Object.values(hoverTimeouts.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
      
      // Pausar todos los videos al desmontar
      Object.values(videoRefs.current).forEach(video => {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });
    };
  }, []);

  const setVideoRef = (storyId: string) => (el: HTMLVideoElement | null) => {
    videoRefs.current[storyId] = el;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg pt-4 mb-4 shadow-sm">
      <div className="flex justify-between items-center px-4">
        <h2 className="text-lg font-semibold text-gray-900">Historias</h2>
        <button className="text-blue-500 text-sm font-medium hover:text-blue-600">
          Ver todas
        </button>
      </div>

      <div className="flex space-x-3 overflow-x-auto pb-2 hide-scrollbar py-3 px-4">
        {stories.map((story) => (
          <div 
            key={story.id} 
            className="flex flex-col items-center flex-shrink-0"
            style={{ width: '85px' }}
          >
            <div 
              className={`relative cursor-pointer transform transition-transform hover:scale-105 
                ${
                  story.hasNewStory
                    ? 'bg-gradient-to-r from-yellow-400 to-purple-600 p-0.5 rounded-2xl' 
                    : 'bg-gray-300 p-0.5 rounded-2xl'
                } 
                ${story.id === '1' ? 'border-2 border-dashed border-blue-400' : ''}`}
              onClick={() => handleStoryClick(story)}
              onMouseEnter={() => handleVideoHover(story.id, true)}
              onMouseLeave={() => handleVideoHover(story.id, false)}
            >
              <div className="w-20 h-32 rounded-xl overflow-hidden relative bg-gray-200">
                {story.id === '1' 
                ? (
                  // Historia para crear
                  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col items-center justify-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mb-1">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <span className="text-xs text-blue-500 font-medium">Crear</span>
                  </div>
                ) : 
                story.storyVideo 
                ? (
                  // Video story con mejor manejo
                  <div className="relative w-full h-full">
                    <video
                      ref={setVideoRef(story.id)}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      preload="metadata"
                      playsInline
                      disablePictureInPicture
                      poster={story.avatar}
                      onLoadedData={() => handleVideoLoad(story.id)}
                      onError={() => console.error(`Error cargando video: ${story.storyVideo}`)}
                    >
                      <source src={story.storyVideo} type="video/mp4" />
                      <source src={story.storyVideo} type="video/webm" />
                      Tu navegador no soporta el elemento video.
                    </video>
                    
                    {/* Loading indicator */}
                    {!videoLoaded[story.id] && (
                      <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      </div>
                    )}
                  </div>
                ) 
                : (
                  // Image story
                  <div className="w-full h-full relative">
                    <Image
                      src={story.storyImage || story.avatar}
                      alt={`Historia de ${story.username}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = story.avatar;
                      }}
                    />
                  </div>
                )}

                {/* Avatar del usuario */}
                <div className="absolute top-2 left-2">
                  <div className="w-8 h-8 border-2 border-white rounded-full overflow-hidden bg-white">
                    <Image
                      src={story.avatar}
                      alt={story.username}
                      width={32}
                      height={32}
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://i.pravatar.cc/32?img=0';
                      }}
                    />
                  </div>
                </div>

                {/* Badge LIVE */}
                {story.isLive && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                    LIVE
                  </div>
                )}

                {/* Indicador de visto */}
                {/* {story.isViewed && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl" />
                )} */}
              </div>
            </div>

            {/* Nombre de usuario */}
            <span className="text-xs font-medium mt-2 text-center max-w-[80px] truncate">
              {story.id === '1' ? (
                <span className="text-gray-900 font-semibold">Crear historia</span>
              ) : (
                <span className={story.isViewed ? "text-gray-500" : "text-gray-900"}>
                  {story.username}
                </span>
              )}
            </span>

            {/* Timestamp */}
            {story.id !== '1' && (
              <span className="text-xs text-gray-400 mt-1">
                {story.timestamp}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 mt-3 pt-3">
        <button className="flex items-center justify-center w-full py-2 text-gray-600 hover:text-gray-900 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-sm font-medium">Ver más historias</span>
        </button>
      </div>
    </div>
  );
}