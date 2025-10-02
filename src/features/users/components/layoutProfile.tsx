// src/app/[username]/layout.tsx
import { UserProfile } from '@/features/users/types/types';
import { Header } from '@/components/layout/Header';
import { Project } from '@/features/users/types/types';
import { ProfileHeader } from '@/features/users/components/ProfileHeader';
import { ProfileTabs } from '@/features/users/components/ProfileTabs';
import { ProfileSidebar } from '@/features/users/components/ProfileSidebar';
import { Tutorial } from '@/features/users/types/types';

// Datos mock (solo en un lugar)
export const mockUser: UserProfile = {
  id: '1',
  username: 'maria_carpintera',
  displayName: 'María González',
  avatar: 'https://i.pravatar.cc/300?img=1',
  coverImage: 'https://images.unsplash.com/photo-1600585154340-6f2a5c5d13b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80',
  bio: 'Carpintera especializada en muebles modernos con más de 8 años de experiencia. Amante de la madera maciza y las técnicas tradicionales combinadas con diseño contemporáneo.',
  location: 'Madrid, España',
  website: 'https://mariacarpintera.com',
  joinedDate: '2024-01-15',

  expertiseLevel: 'professional',
  specialties: ['woodworking', 'furniture', 'restoration', 'joinery', 'finishing'],
  tools: ['sierra circular', 'router', 'lijadora orbital', 'formones', 'martillo', 'pistola de clavos'],

  stats: {
    projectsCompleted: 47,
    projectsInProgress: 3,
    followers: 1247,
    following: 89,
    tutorialsCreated: 23
  },

  socialLinks: {
    instagram: '@maria_carpintera',
    youtube: 'María Carpintera',
    tiktok: '@maria.maker'
  },

  yearsOfExperience: 8,
  professionalBackground: "Empecé en el mundo de la carpintería restaurando muebles antiguos y evolucioné hacia el diseño de piezas contemporáneas. Combino técnicas tradicionales con tecnología moderna.",
  
  education: [
    {
      degree: "Técnico en Ebanistería",
      institution: "Escuela de Artes y Oficios",
      year: 2016
    }
  ],
  
  certifications: [
    "Certificación en Seguridad en Taller",
    "Especialización en Acabados Naturales"
  ],
  
  techniques: [
    "ensamblaje a cola de milano",
    "tallado a mano", 
    "técnicas de lijado profesional",
    "acabados con aceites naturales"
  ],
  
  materialsExpertise: [
    "maderas duras (roble, nogal, cerezo)",
    "maderas tropicales",
    "resina epoxi",
    "metales para detalles"
  ],
  
  style: ["moderno", "minimalista", "industrial"],
  influences: ["diseño escandinavo", "mid-century modern"],
  
  businessInfo: {
    isProfessional: true,
    businessName: "María González Studio",
    services: ["muebles personalizados", "restauración", "consultoría de diseño"],
    pricingTier: "studio",
    availability: "available"
  },
  
  goals: {
    shortTerm: [
      "Dominar la técnica de marquetería",
      "Implementar taller de CNC básico"
    ],
    longTerm: [
      "Abrir taller escuela",
      "Desarrollar línea de muebles sostenibles"
    ]
  },
  
  communityInvolvement: {
    mentoring: true,
    collaborations: true,
    workshopHosting: false
  }
};

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Mesa de centro moderna con resina epoxi',
    description: 'Mesa de centro con combinación de madera de roble y resina epoxi azul. Proceso completo desde el diseño hasta el acabado.',
    thumbnail: 'https://picsum.photos/400/300?random=1',
    status: 'completed',
    difficulty: 'medium',
    timeRequired: 1200,
    toolsUsed: ['sierra circular', 'router', 'lijadora', 'brochas'],
    materials: ['roble', 'resina epoxi', 'sellador'],
    createdAt: '2024-03-15',
    updatedAt: '2024-03-20',
    likes: 45,
    views: 234,
    user: mockUser
  },
  {
    id: '2',
    title: 'Silla de comedor estilo escandinavo',
    description: 'Silla de comedor con diseño minimalista y ergonómico. Perfecta para espacios modernos.',
    thumbnail: 'https://picsum.photos/400/300?random=2',
    status: 'in-progress',
    difficulty: 'hard',
    timeRequired: 1800,
    toolsUsed: ['sierra de calar', 'lijadora', 'tornillos'],
    materials: ['pino', 'tornillos', 'barniz'],
    createdAt: '2024-04-01',
    updatedAt: '2024-04-10',
    likes: 23,
    views: 156,
    user: mockUser
  }
];

export const mockTutorials: Tutorial[] = [
    {
        id: '1',
        title: 'Técnicas avanzadas de lijado',
        description: 'Aprende las mejores técnicas para un acabado perfecto en madera.',
        thumbnail: 'https://picsum.photos/400/300?random=10',
        difficulty: 'intermediate',
        timeRequired: 45,
        toolsRequired: ['lijadora orbital', 'papel de lija', 'guantes'],
        materialsRequired: ['madera', 'sellador'],
        steps: [
            {
                id: '1',
                title: 'Preparación de la superficie',
                description: 'Limpia y prepara la madera para el lijado.',
                order: 1
            }
        ]
    },
    // ... más tutoriales
];

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export function ProfileLayout({ children }: ProfileLayoutProps) {
  return <>
    <Header />
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader user={mockUser} />
      <ProfileTabs />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProfileSidebar user={mockUser} />
          </div>
          <div className='lg:col-span-3 space-y-6'>
              {children}
            
          </div>
        </div>
      </div>

    </div>
  </>;
}
