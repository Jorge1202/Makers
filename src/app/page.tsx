'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/layoutHeader';
import { Stories } from '@/features/home/components/Stories';
import { Post } from '@/features/home/components/post/Post';
import { Home, Compass, PlusSquare, GitFork, Users, BookOpen, TrendingUp } from 'lucide-react';
import { Sidebar } from '@/features/home/components/Sidebar';
import type { Posts } from '@/features/home/types/posts';
import { ProjectCard } from '@/features/home/components/ProjectCard';
// import { ProjectPost } from '@/components/home/posts/variants/ProjectPost';

// Datos de ejemplo con URLs REALES de imágenes y videos
const initialPosts: Posts[] = [
  // 1. PROJECT POST - Proyecto finalizado
  {
    id: '1',
    type: 'project',
    username: 'maria_carpintera',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
    userBadge: 'Pro',
    location: 'Taller Barcelona',
    title: 'Mesa de roble con patas metálicas',
    caption: 'Después de 3 fines de semana de trabajo, aquí está el resultado final. Usé técnicas tradicionales de carpintería combinadas con detalles modernos.',
    likes: 89,
    forks: 12,
    timestamp: 'COMPLETADO HACE 2 DÍAS',
    comments: [
      {
        id: '1',
        username: 'carlos_hacedor',
        text: '¡Excelente trabajo! ¿Qué tipo de acabado aplicaste?',
        timestamp: '1d',
        isMakerQuestion: true
      },
      {
        id: '2',
        username: 'maria_carpintera',
        text: 'Usé aceite de linaza para realzar la veta natural de la madera 👍',
        timestamp: '20h',
        isAuthorResponse: true
      }
    ],
    isLiked: false,
    isSaved: false,
    tags: ['carpinteria', 'muebles', 'madera', 'diy'],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
        alt: 'Diseño inicial del proyecto'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
        alt: 'Proceso de corte de la madera'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
        alt: 'Resultado final de la mesa'
      }
    ],
    projectStats: {
      materials: ['Roble macizo', 'Tornillos de acero', 'Pegamento epoxy', 'Aceite de linaza'],
      tools: ['Sierra circular', 'Taladro percutor', 'Lijadora orbital', 'Escuadra de precisión'],
      timeRequired: '15-20 horas',
      difficulty: 'Intermedia'
    }
  },

  // 2. WIP POST - Work in Progress
  {
    id: '2',
    type: 'wip',
    username: 'tecno_andres',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
    userBadge: 'Innovador',
    location: 'Laboratorio Maker',
    caption: '🤖 **Robot Arduino con seguimiento solar** - Día 3 de construcción\n\nHoy estoy trabajando en el sistema de seguimiento. ¿Alguien tiene experiencia con servomotores MG90S?',
    likes: 34,
    forks: 5,
    timestamp: 'ACTUALIZADO HACE 3 HORAS',
    comments: [
      {
        id: '1',
        username: 'robot_lover',
        text: 'Los MG90S son buenos pero consumen bastante. Te recomiendo los SG90 para proyectos solares.',
        timestamp: '2h'
      }
    ],
    isLiked: true,
    isSaved: false,
    tags: ['electronica', 'arduino', 'robotica', 'solar'],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
        alt: 'Circuito en progreso'
      },
      {
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        alt: 'Prueba del sistema de seguimiento'
      }
    ],
    currentStep: 'Instalación y calibración de servomotores para el seguimiento solar',
    nextSteps: ['Programar el algoritmo de seguimiento', 'Integrar los paneles solares', 'Pruebas de autonomía'],
    needsHelp: true,
    parentProjectId: 'proyecto_robot_solar',
    projectStats: {
      materials: ['Arduino Uno', 'Servomotores MG90S', 'Paneles solares 5V'],
      tools: ['Soldador', 'Multímetro', 'Protoboard'],
      timeRequired: 'En progreso',
      difficulty: 'Avanzada'
    }
  },

  // 3. TUTORIAL POST - Tutorial paso a paso
  {
    id: '3',
    type: 'tutorial',
    username: 'costura_creativa',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
    userBadge: 'Artista',
    location: 'Estudio Textil Madrid',
    caption: '👗 **Vestido veraniego con tejido natural** - Tutorial completo\n\nAprende a crear este vestido desde cero. Perfecto para principiantes en costura.',
    likes: 156,
    forks: 23,
    timestamp: 'ACTUALIZADO HACE 1 SEMANA',
    comments: [
      {
        id: '1',
        username: 'ana_moda',
        text: '¡Lo hice! Quedó perfecto para el verano 🌞',
        timestamp: '3d',
        isForkAnnouncement: true
      }
    ],
    isLiked: false,
    isSaved: true,
    tags: ['costura', 'moda', 'diy', 'principiante'],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
        alt: 'Vestido terminado'
      }
    ],
    steps: [
      {
        step: 1,
        title: 'Preparación del patrón',
        description: 'Descarga y imprime el patrón. Ajusta las medidas según tus necesidades.',
        media: { type: 'image', url: 'https://images.unsplash.com/photo-1594736797933-d0b4ec4d7d72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80' }
      },
      {
        step: 2,
        title: 'Corte de la tela',
        description: 'Coloca el patrón sobre la tela y corta con precisión.',
        media: { type: 'image', url: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80' }
      },
      {
        step: 3,
        title: 'Costura principal',
        description: 'Une las piezas principales usando puntada recta.',
        media: { type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' }
      }
    ],
    skillLevel: 'Principiante',
    projectStats: {
      materials: ['Tela de algodón 2m', 'Hilo color matching', 'Cremallera invisible 40cm'],
      tools: ['Máquina de coser', 'Tijeras de tela', 'Agujas', 'Alfileres'],
      timeRequired: '4-6 horas',
      difficulty: 'Principiante'
    }
  },

  // 4. MICRO POST - Tips & Tricks
  {
    id: '4',
    type: 'micro',
    username: 'herramientas_pro',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
    userBadge: 'Experto',
    location: 'Taller Móvil',
    caption: '⚡ **Cómo afilar brocas desafiladas** en 60 segundos\n\nUsa una piedra de afilar y mantén un ángulo de 59 grados para brocas de metal.',
    likes: 287,
    forks: 45,
    timestamp: 'PUBLICADO HACE 2 DÍAS',
    comments: [
      {
        id: '1',
        username: 'maker_novato',
        text: '¡Funciona perfecto! Salvé mis brocas viejas 💪',
        timestamp: '1d'
      }
    ],
    isLiked: true,
    isSaved: true,
    tags: ['herramientas', 'mantenimiento', 'tip'],
    media: [
      {
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        alt: 'Demostración de afilado de brocas'
      }
    ],
    tipType: 'tool',
    duration: '60s',
    projectStats: {
      materials: ['Broca desafilada', 'Piedra de afilar'],
      tools: ['Guantes de protección', 'Lupa opcional'],
      timeRequired: '1 minuto',
      difficulty: 'Principiante'
    }
  },

  // 5. QUESTION POST - Preguntas & Feedback
  {
    id: '5',
    type: 'question',
    username: 'juan_impresor3d',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
    userBadge: 'Maker',
    location: 'Home Lab',
    caption: '❓ **Problema con adhesión en la cama de impresión**\n\nMi PLA no se adhiere bien en las esquinas. ¿Algún consejo? Temperatura: 200°C, Cama: 60°C',
    likes: 23,
    forks: 2,
    timestamp: 'PUBLICADO HACE 5 HORAS',
    comments: [
      {
        id: '1',
        username: 'impresion3d_expert',
        text: 'Prueba a limpiar la cama con alcohol isopropílico y ajusta la nivelación.',
        timestamp: '3h'
      },
      {
        id: '2',
        username: 'tecno_help',
        text: 'Aumenta la temperatura de la cama a 65°C para las primeras capas.',
        timestamp: '2h'
      }
    ],
    isLiked: false,
    isSaved: false,
    tags: ['impresion3d', 'problemas', 'ayuda'],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
        alt: 'Problema de adhesión en impresión 3D'
      }
    ],
    question: '¿Cómo mejorar la adhesión del PLA en las esquinas durante la impresión 3D?',
    category: 'Impresión 3D',
    urgency: 'medium',
    isResolved: false,
    projectStats: {
      materials: ['Filamento PLA', 'Laca para cabello'],
      tools: ['Impresora 3D', 'Alcohol isopropílico'],
      timeRequired: 'Por determinar',
      difficulty: 'Intermedia'
    }
  },

  // PROYECTOS RECIENTES (Mixed types, newest first)
  {
    id: '6',
    type: 'tutorial',
    username: 'eco_construye',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
    userBadge: 'Sostenible',
    location: 'Granada, España',
    title: 'Huerto vertical con riego automático',
    caption: 'Sistema completo de huerto vertical para balcón pequeño. Incluye riego por goteo automático y control de humedad.',
    likes: 156,
    forks: 34,
    timestamp: 'COMPLETADO HACE 12 HORAS',
    comments: [
      { 
        id: '1', 
        username: 'jardin_urbano', 
        text: '¡Justo lo que necesitaba para mi apartamento! ¿Dónde conseguiste las macetas?', 
        timestamp: '5h'
      }
    ],
    isLiked: false,
    isSaved: false,
    tags: ['jardineria', 'sostenible', 'riego', 'urbano'],
    media: [
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1591871937571-1c8b6a0f0f8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 
        alt: 'Huerto vertical terminado' 
      }
    ],
    steps: [
      {
        step: 1,
        title: 'Diseño del sistema',
        description: 'Planifica el diseño del huerto y mide el espacio disponible.',
        media: { type: 'image', url: 'https://images.unsplash.com/photo-1594736797933-d0b4ec4d7d72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80' }
      },
      {
        step: 2,
        title: 'Montaje de las macetas',
        description: 'Ensambla las macetas y conecta las tuberías para el riego.',
        media: { type: 'image', url: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80' }
      },
      {
        step: 3,
        title: 'Instalación del sistema de riego',
        description: 'Conecta la bomba de agua y calibra el sensor de humedad.',
        media: { type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' }
      }
    ],
    skillLevel: 'Intermedia',
    projectStats: {
      materials: ['Macetas modulares', 'Tubería PVC', 'Bomba de agua pequeña', 'Sensor de humedad'],
      tools: ['Taladro', 'Cutter', 'Llaves ajustables'],
      timeRequired: '8-10 horas',
      difficulty: 'Intermedia'
    }
  },

  // PROYECTOS POPULARES (High forks & likes)
  {
    id: '7',
    type: 'project',
    username: 'led_creative',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
    userBadge: 'Electrónica',
    location: 'Valencia',
    title: 'Lámpara LED con control por app',
    caption: 'Lámpara inteligente con LEDs RGB controlada desde el móvil. Perfecta para ambientar cualquier espacio.',
    likes: 423,
    forks: 89,
    timestamp: 'COMPLETADO HACE 3 DÍAS',
    comments: [
      { 
        id: '1', 
        username: 'maker_tech', 
        text: 'Hice una versión con Alexa integration. ¡Funciona perfecto!', 
        timestamp: '2d',
        isForkAnnouncement: true
      }
    ],
    isLiked: true,
    isSaved: true,
    tags: ['electronica', 'led', 'iot', 'smart'],
    media: [
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 
        alt: 'Lámpara LED encendida' 
      }
    ],
    projectStats: {
      materials: ['Tira LED RGB', 'ESP32', 'Fuente 5V', 'Cableado'],
      tools: ['Soldador', 'Multímetro', 'Impresora 3D'],
      timeRequired: '6-8 horas',
      difficulty: 'Intermedia'
    }
  },

  // PROYECTOS PARA PRINCIPIANTES (Easy difficulty)
  {
    id: '8',
    type: 'project',
    username: 'manualidades_facil',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
    userBadge: 'Educador',
    location: 'Sevilla',
    title: 'Organizador de escritorio con cartón',
    caption: 'Proyecto súper económico y fácil para organizar tu espacio de trabajo. Ideal para primeros proyectos.',
    likes: 78,
    forks: 45,
    timestamp: 'COMPLETADO HACE 1 SEMANA',
    comments: [
      { 
        id: '1', 
        username: 'estudiante_diy', 
        text: 'Mi primer proyecto exitoso 🎉 ¡Gracias por las instrucciones claras!', 
        timestamp: '4d'
      }
    ],
    isLiked: false,
    isSaved: false,
    tags: ['carton', 'organizacion', 'principiante', 'lowcost'],
    media: [
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 
        alt: 'Organizador de cartón terminado' 
      }
    ],
    //https://images.unsplash.com/photo-1574007557239-acf6863bc375?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80
    projectStats: {
      materials: ['Cartón grueso', 'Pegamento blanco', 'Pintura acrílica'],
      tools: ['Cutter', 'Regla', 'Pincel'],
      timeRequired: '2-3 horas',
      difficulty: 'Principiante'
    }
  },

  {
    id: '9',
    type: 'project',
    username: 'cocina_creativa',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
    userBadge: 'Chef',
    location: 'Barcelona',
    title: 'Horno de leña portátil',
    caption: 'Construye tu propio horno de leña para pizzas y pan. Resultados profesionales en casa.',
    likes: 512,
    forks: 127,
    timestamp: 'ACTUALIZADO HACE 2 DÍAS',
    comments: [
      { 
        id: '1', 
        username: 'pizza_lover', 
        text: '¡Las mejores pizzas que he hecho en mi vida! Gracias por el tutorial.', 
        timestamp: '1d'
      }
    ],
    isLiked: true,
    isSaved: true,
    tags: ['cocina', 'horno', 'pizza', 'exterior'],
    media: [
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1574007557239-acf6863bc375?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 
        alt: 'Horno de leña terminado' 
      }
    ],
    projectStats: {
      materials: ['Ladrillos refractarios', 'Cemento refractario', 'Aislamiento térmico'],
      tools: ['Paleta', 'Nivel', 'Cubo de mezcla'],
      timeRequired: '20-25 horas',
      difficulty: 'Avanzada'
    }
  },

  // MÁS PRINCIPIANTES
  {
    id: '10',
    type: 'project',
    username: 'pintura_facil',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
    userBadge: 'Artista',
    location: 'Madrid',
    title: 'Cuadro con técnica de pouring',
    caption: 'Aprende la técnica de pouring para crear cuadros abstractos increíbles sin experiencia previa.',
    likes: 94,
    forks: 67,
    timestamp: 'COMPLETADO HACE 5 DÍAS',
    comments: [
      { 
        id: '1', 
        username: 'arte_novato', 
        text: 'Mi primer cuadro quedó genial. ¡No podía creer que lo hice yo!', 
        timestamp: '3d'
      }
    ],
    isLiked: false,
    isSaved: true,
    tags: ['arte', 'pintura', 'principiante', 'decoracion'],
    media: [
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 
        alt: 'Cuadro con técnica pouring' 
      }
    ],
    projectStats: {
      materials: ['Pinturas acrílicas', 'Lienzo', 'Medio de pouring', 'Guantes'],
      tools: ['Cubilete', 'Espátula', 'Soporte para lienzo'],
      timeRequired: '1-2 horas',
      difficulty: 'Principiante'
    }
  },

  // WIP POPULAR
  {
    id: '11',
    type: 'wip',
    username: 'bici_custom',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
    userBadge: 'Mecánico',
    location: 'Taller Moto',
    caption: '🚲 **Customización de bicicleta vintage** - Semana 2\n\nProgreso en el pintado del cuadro. ¿Alguna recomendación para el color de los detalles?',
    likes: 145,
    forks: 23,
    timestamp: 'ACTUALIZADO HACE 8 HORAS',
    comments: [
      { 
        id: '1', 
        username: 'ciclista_pro', 
        text: 'Te recomiendo detalles en naranja brillante. Contrasta genial con el azul.', 
        timestamp: '4h'
      }
    ],
    isLiked: true,
    isSaved: false,
    tags: ['bicicleta', 'custom', 'pintura', 'vintage'],
    media: [
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 
        alt: 'Cuadro de bicicleta en proceso de pintura' 
      }
    ],
    currentStep: 'Pintado del cuadro y preparación para detalles',
    nextSteps: ['Aplicar detalles de color', 'Ensamblar componentes', 'Pruebas finales'],
    needsHelp: true,
    projectStats: {
      materials: ['Pintura automotriz', 'Masilla', 'Lija de diferentes granos'],
      tools: ['Pistola de pintura', 'Compresor', 'Cabina de pintura casera'],
      timeRequired: 'En progreso',
      difficulty: 'Intermedia'
    }
  },

  // MICRO POST POPULAR
  {
    id: '12',
    type: 'micro',
    username: 'soldadura_pro',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
    userBadge: 'Experto',
    location: 'Taller Industrial',
    caption: '🔥 **Evita el estañado frío** - La conexión más común en soldadura\n\nCalienta ambas piezas uniformemente antes de aplicar estaño. El estaño debe fluir, no empujarse.',
    likes: 321,
    forks: 156,
    timestamp: 'PUBLICADO HACE 1 DÍA',
    comments: [
      { 
        id: '1', 
        username: 'electronica_learner', 
        text: 'Este tip me salvó tantas conexiones malas. ¡Gracias!', 
        timestamp: '18h'
      }
    ],
    isLiked: false,
    isSaved: true,
    tags: ['soldadura', 'electronica', 'tip', 'tutorial'],
    media: [
      { 
        type: 'video', 
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', 
        alt: 'Demostración de soldadura correcta' 
      }
    ],
    tipType: 'technique',
    duration: '45s',
    projectStats: {
      materials: ['Estaño', 'Flux'],
      tools: ['Cautín', 'Pinzas', 'Esponja'],
      timeRequired: '1 minuto',
      difficulty: 'Principiante'
    }
  },

  // PROYECTO PRINCIPIANTE MÁS RECIENTE
  {
    id: '13',
    type: 'project',
    username: 'maceta_eco',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
    userBadge: 'Ecológico',
    location: 'Valencia',
    title: 'Macetas autorriego con botellas recicladas',
    caption: 'Transforma botellas de plástico en macetas inteligentes que mantienen tus plantas hidratadas automáticamente.',
    likes: 67,
    forks: 38,
    timestamp: 'COMPLETADO HACE 6 HORAS',
    comments: [
      { 
        id: '1', 
        username: 'plant_lover', 
        text: 'Perfecto para cuando me voy de vacaciones. ¡Mis plantas sobrevivieron!', 
        timestamp: '2h'
      }
    ],
    isLiked: false,
    isSaved: false,
    tags: ['reciclaje', 'plantas', 'ecologico', 'principiante'],
    media: [
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 
        alt: 'Macetas autorriego con botellas' 
      }
    ],
    projectStats: {
      materials: ['Botellas PET', 'Tela de algodón', 'Tierra para macetas', 'Plantas'],
      tools: ['Tijeras', 'Marcador', 'Cutter'],
      timeRequired: '30-45 minutos',
      difficulty: 'Principiante'
    }
  }
];
export default function HomePage() {
  const [posts, setPosts] = useState<Posts[]>(initialPosts);
  const [activeFilter, setActiveFilter] = useState<'recientes' | 'populares' | 'principiantes'>('recientes');

  return (
    <div className="min-h-screen bg-gray-50">
      <Layout>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:space-x-8">

            {/* Feed Principal */}
            <div className="flex-1 max-w-2xl mx-auto lg:mx-0 lg:max-w-none">

              {/* Stories */}
              <div className="pt-4">
                <Stories />
              </div>

              {/* Filtros de Proyectos */}
              <div className="flex space-x-4 pt-6 pb-4 border-b border-gray-200">
                <button
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${activeFilter === 'recientes'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                  onClick={() => setActiveFilter('recientes')}
                >
                  <BookOpen className="inline w-4 h-4 mr-1" />
                  Recientes
                </button>
                <button
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${activeFilter === 'populares'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                  onClick={() => setActiveFilter('populares')}
                >
                  <TrendingUp className="inline w-4 h-4 mr-1" />
                  Populares
                </button>
                <button
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${activeFilter === 'principiantes'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                  onClick={() => setActiveFilter('principiantes')}
                >
                  <Users className="inline w-4 h-4 mr-1" />
                  Para Principiantes
                </button>
              </div>

              {/* Posts */}
              <div className="pt-4 mb-5">
                {activeFilter === 'recientes' && (
                  /* Feed Lineal Tradicional */
                  <>
                    <div className="space-y-6">
                      {posts.map((post) => (
                        <Post key={post.id} post={post} />
                      ))}
                    </div>
                    {/* Mensaje de fin de feed */}
                    <div className="text-center py-8">
                      <GitFork className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <div className="text-gray-500 text-sm mb-2">
                        Has visto todos los proyectos disponibles
                      </div>
                    </div>
                  </>
                )}

                {activeFilter === 'populares' && (
                  /* Cuadrícula para Proyectos Populares */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {posts
                      .filter(post => post.forks > 20 && post.type == 'project') // Filtro para populares
                      .map((post) => (
                        <ProjectCard key={post.id} post={post} />
                      ))
                    }
                  </div>
                )}

                {activeFilter === 'principiantes' && (
                  /* Cuadrícula para Principiantes */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {posts
                      .filter(post => post.projectStats?.difficulty === 'Principiante' && post.type == 'project')
                      .map((post) => (
                        <ProjectCard key={post.id} post={post} />
                      ))
                    }
                  </div>
                )}
              </div>

            </div>

            {/* Sidebar Derecho */}
            <div className="hidden lg:block pt-4 w-80">

              <Sidebar />


              {/* Widget Adicional: Proyectos Destacados */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 mt-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                  Proyectos Destacados
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-sm">CD</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">Casa de Muñecas Modular</p>
                      <p className="text-xs text-gray-500">12 forks esta semana</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-sm">ET</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">Escritorio Flotante</p>
                      <p className="text-xs text-gray-500">8 replicaciones exitosas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>


      {/* Navigation Mobile Footer */}
      <footer className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 backdrop-blur-sm bg-white/95 z-40">
        <div className="flex items-center justify-around h-14">
          <button className="p-2 text-blue-600 hover:text-blue-800 transition-colors">
            <Home className="h-6 w-6" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Compass className="h-6 w-6" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <PlusSquare className="h-6 w-6" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <GitFork className="h-6 w-6" />
          </button>
          <button className="p-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-2 border-white"></div>
          </button>
        </div>
      </footer>
    </div>
  );
}
