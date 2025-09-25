// src/app/[username]/page.tsx
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileSidebar } from '@/components/profile/ProfileSidebar';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { ProjectCard } from '@/components/profile/ProjectCard';
import { UserProfile, Project } from '@/lib/types/users/types';

// Datos mock
const mockUser: UserProfile = {
    id: '1',
    username: 'maria_carpintera',
    displayName: 'María González',
    avatar: 'https://i.pravatar.cc/150?img=1',
    coverImage: 'https://picsum.photos/1200/400?random=1',
    bio: 'Carpintera especializada en muebles modernos. Amante de la madera y las técnicas tradicionales con más de 5 años de experiencia.',
    location: 'Madrid, España',
    website: 'https://mariacarpintera.com',
    joinedDate: '2024-01-15',

    expertiseLevel: 'advanced',
    specialties: ['woodworking', 'furniture', 'restoration', 'joinery'],
    tools: ['sierra circular', 'router', 'lijadora', 'formones', 'martillo'],

    stats: {
        projectsCompleted: 24,
        projectsInProgress: 3,
        followers: 1247,
        following: 89,
        tutorialsCreated: 12
    },

    socialLinks: {
        instagram: '@maria_carpintera',
        youtube: 'María Carpintera'
    }
};

const mockProjects: Project[] = [
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
        user: {
            username: 'maria_carpintera',
            avatar: 'https://i.pravatar.cc/150?img=1',
            displayName: 'María González'
        }
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
        user: {
            username: 'maria_carpintera',
            avatar: 'https://i.pravatar.cc/150?img=1',
            displayName: 'María González'
        }
    }
];

export default async function ProfilePage({ params }: { params: { username: string } }) {
    const { username } = await params;

    return (
        <div className="min-h-screen bg-gray-50">
            <ProfileHeader user={mockUser} />

            <ProfileTabs username={username} currentTab="overview" />

            {/* Contenido principal */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <ProfileSidebar user={mockUser} />
                    </div>

                    {/* Contenido principal */}
                    <div className="lg:col-span-2">
                        {/* Proyectos recientes */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Proyectos Recientes</h2>
                                <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                                    Ver todos →
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {mockProjects.map(project => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </div>
                        </div>

                        {/* Actividad reciente */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-bold mb-6">Actividad Reciente</h2>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-green-600">✓</span>
                                    </div>
                                    <div>
                                        <p className="text-gray-900">
                                            Completó el proyecto <span className="font-medium">Mesa de centro moderna</span>
                                        </p>
                                        <p className="text-gray-500 text-sm">Hace 2 días</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600">📝</span>
                                    </div>
                                    <div>
                                        <p className="text-gray-900">
                                            Publicó un nuevo tutorial sobre <span className="font-medium">Técnicas de lijado</span>
                                        </p>
                                        <p className="text-gray-500 text-sm">Hace 1 semana</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}