'use client'; 

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Stories } from '@/components/home/Stories';
import { Post } from '@/components/home/posts/Post';
import { Home, Compass, PlusSquare, MessageCircle, Search, GitFork, Users, BookOpen, TrendingUp } from 'lucide-react';
import { Sidebar } from '@/components/home/Sidebar';
import type { Posts } from '@/lib/types/posts';

// Datos de ejemplo con URLs REALES de imágenes y videos

const initialPosts: Posts[] = [
  // 1. PROJECT POST - Proyecto finalizado
  {
    id: '1',
    type: 'project',
    username: 'maria_carpintera',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
    userBadge: 'Pro',
    location: 'Taller Barcelona',
    caption: '📋 **Mesa de roble con patas metálicas** - Proyecto completo\n\nDespués de 3 fines de semana de trabajo, aquí está el resultado final. Usé técnicas tradicionales de carpintería combinadas con detalles modernos.',
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
];
export default function HomePage() {
  const [posts, setPosts] = useState<Posts[]>(initialPosts);
  const [activeFilter, setActiveFilter] = useState<'recientes' | 'populares' | 'principiantes'>('recientes');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="min-h-screen pt-14">
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
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    activeFilter === 'recientes' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveFilter('recientes')}
                >
                  <BookOpen className="inline w-4 h-4 mr-1" />
                  Recientes
                </button>
                <button 
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    activeFilter === 'populares' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveFilter('populares')}
                >
                  <TrendingUp className="inline w-4 h-4 mr-1" />
                  Populares
                </button>
                <button 
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    activeFilter === 'principiantes' 
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
              <div className="space-y-6 pt-4">
                {posts.map((post) => (
                  <Post key={post.id} post={post} />
                ))}
                
                {/* Mensaje de fin de feed */}
                <div className="text-center py-8">
                  <GitFork className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <div className="text-gray-500 text-sm mb-2">
                    Has visto todos los proyectos disponibles
                  </div>
                  <div className="text-gray-400 text-xs">
                    ¿Tienes un proyecto para compartir? ¡La comunidad espera verlo!
                  </div>
                  <button className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all">
                    <PlusSquare className="inline w-4 h-4 mr-2" />
                    Crear mi Primer Proyecto
                  </button>
                </div>
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
      </main>

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
