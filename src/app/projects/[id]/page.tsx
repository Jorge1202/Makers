import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProjectOverview from '@/features/projects/components/ProjectOverview';
import StepNavigation from '@/features/projects/components/StepNavigation';
import StepView from '@/features/projects/components/StepView';

async function getProject(id: string) {
  try {
    // En desarrollo, usamos los mock data
    const { mockProjects } = await import('@/features/projects/data/mockData');
    const project = mockProjects.find(p => p.id === id);
    return project || null;
  } catch (error) {
    return null;
  }
}

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProjectPage({ params, searchParams }: Props) {
  const project = await getProject(params.id);
  
  if (!project) {
    notFound();
  }

  // Determinar qué vista mostrar basado en searchParams
  const view = searchParams.view as string || 'overview';
  const stepId = searchParams.step as string;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de navegación */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Inicio</Link>
            <span>/</span>
            <a href={`/${project.user.username}`} className="hover:text-gray-700">
              {project.user.name}
            </a>
            <span>/</span>
            <a href={`/${project.user.username}/projects`} className="hover:text-gray-700">
              Proyectos
            </a>
            <span>/</span>
            <span className="text-gray-900 font-medium">{project.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar de navegación */}
          <div className="lg:col-span-1">
            <StepNavigation 
              project={project} 
              currentView={view}
              currentStepId={stepId}
            />
          </div>
          
          {/* Contenido principal */}
          <div className="lg:col-span-3">
            {view === 'overview' && <ProjectOverview project={project} />}
            {view === 'step' && stepId && (
              <StepView 
                project={project} 
                stepId={stepId} 
              />
            )}
            {view === 'final' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Resultado Final</h2>
                {/* Aquí iría el componente de resultado final */}
                <p>Vista de resultado final en desarrollo...</p>
              </div>
            )}
            {view === 'conclusion' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Conclusión</h2>
                {/* Aquí iría el componente de reflexiones */}
                <p>Conclusión del proyecto...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// // src/app/projects/[id]/page.tsx
// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// // Mock data para el proyecto
// const mockProject = {
//   id: '1',
//   title: 'Mesa de centro moderna con resina epoxi y madera de roble',
//   description: 'Mesa de centro con combinación de madera de roble natural y resina epoxi azul translúcida.',
//   fullDescription: `Este proyecto combina la calidez de la madera maciza con la modernidad de la resina epoxi. La mesa fue diseñada para ser el punto focal de una sala de estar contemporánea, creando un contraste entre lo orgánico y lo industrial.

// Características principales:
// - Base de roble macizo con patas en ángulo
// - Superficie de resina epoxi con efecto oceánico
// - Acabado con aceite natural para realzar la veta
// - Estructura estable con refuerzos ocultos`,
  
//   thumbnail: 'https://picsum.photos/800/600?random=1',
//   images: [
//     'https://picsum.photos/800/600?random=1',
//     'https://picsum.photos/800/600?random=2',
//     'https://picsum.photos/800/600?random=3',
//     'https://picsum.photos/800/600?random=4',
//   ],
  
//   status: 'completed',
//   difficulty: 'medium',
//   category: 'furniture',
//   timeRequired: 1200,
//   actualTimeSpent: 1350,
//   costEstimate: 250,
//   actualCost: 280,
  
//   toolsUsed: [
//     'sierra circular', 'router', 'lijadora orbital', 
//     'pistola de calor', 'nivel láser', 'formones'
//   ],
  
//   materials: [
//     { name: 'Madera de roble', quantity: '1 tabla 200x60x5cm', cost: 120 },
//     { name: 'Resina epoxi transparente', quantity: '4 litros', cost: 80 },
//     { name: 'Pigmento azul', quantity: '50ml', cost: 15 },
//     { name: 'Aceite para madera', quantity: '1 litro', cost: 25 },
//     { name: 'Tornillos invisibles', quantity: '16 unidades', cost: 12 },
//   ],
  
//   techniques: ['resin casting', 'wood joining', 'sanding', 'finishing'],
  
//   timeline: [
//     {
//       phase: 'Diseño y planificación',
//       startDate: '2024-03-01',
//       endDate: '2024-03-07',
//       description: 'Diseño de la mesa, cálculos estructurales y lista de materiales'
//     },
//     {
//       phase: 'Preparación de la madera',
//       startDate: '2024-03-08',
//       endDate: '2024-03-10',
//       description: 'Corte, cepillado y preparación de la base de roble'
//     },
//     {
//       phase: 'Molde y resina',
//       startDate: '2024-03-11',
//       endDate: '2024-03-15',
//       description: 'Creación del molde y vertido de la resina epoxi'
//     },
//     {
//       phase: 'Acabado y montaje',
//       startDate: '2024-03-16',
//       endDate: '2024-03-20',
//       description: 'Lijado, aceitado y montaje final'
//     }
//   ],
  
//   processSteps: [
//     {
//       id: '1',
//       title: 'Diseño y planos',
//       description: 'Creación de los planos detallados y cálculos estructurales para garantizar la estabilidad de la mesa.',
//       images: ['https://picsum.photos/400/300?random=11'],
//       toolsUsed: ['software CAD', 'calculadora'],
//       materialsUsed: ['papel', 'lápiz'],
//       timeSpent: 180,
//       tips: ['Considera el peso de la resina al diseñar la estructura', 'Prueba diferentes combinaciones de color'],
//       order: 1
//     },
//     {
//       id: '2',
//       title: 'Preparación de la madera',
//       description: 'Corte y cepillado de la madera de roble para crear la base y las patas.',
//       images: ['https://picsum.photos/400/300?random=12'],
//       toolsUsed: ['sierra circular', 'cepillo eléctrico'],
//       materialsUsed: ['madera de roble'],
//       timeSpent: 240,
//       warnings: ['Usa siempre protección auditiva y visual', 'Mide dos veces, corta una vez'],
//       order: 2
//     },
//     // ... más pasos
//   ],
  
//   challenges: [
//     {
//       problem: 'La resina generaba burbujas durante el curado',
//       solution: 'Usé una pistola de calor para eliminar las burbujas y un mezclado más lento',
//       images: ['https://picsum.photos/400/300?random=21']
//     },
//     {
//       problem: 'La madera se curvó ligeramente durante el proceso',
//       solution: 'Aplicué peso distribuido durante 48 horas y ajusté los soportes',
//       images: ['https://picsum.photos/400/300?random=22']
//     }
//   ],
  
//   likes: 145,
//   views: 2347,
//   saves: 89,
  
//   comments: [
//     {
//       id: '1',
//       user: {
//         username: 'carlos_ebanista',
//         avatar: 'https://i.pravatar.cc/150?img=5',
//         displayName: 'Carlos Rodríguez'
//       },
//       content: '¡Increíble trabajo! Me encanta el contraste entre la madera y la resina. ¿Qué tipo de aceite usaste para el acabado?',
//       createdAt: '2024-03-25',
//       likes: 12,
//       replies: [
//         {
//           id: '1-1',
//           user: {
//             username: 'maria_carpintera',
//             avatar: 'https://i.pravatar.cc/150?img=1',
//             displayName: 'María González'
//           },
//           content: '¡Gracias Carlos! Usé aceite de linaza mezclado con un poco de aceite de tung. Da un acabado natural pero resistente.',
//           createdAt: '2024-03-26',
//           likes: 8
//         }
//       ]
//     }
//   ],
  
//   createdAt: '2024-03-01',
//   updatedAt: '2024-03-20',
//   publishedAt: '2024-03-21',
  
//   user: {
//     username: 'maria_carpintera',
//     avatar: 'https://i.pravatar.cc/150?img=1',
//     displayName: 'María González'
//   },
  
//   collaborators: [
//     {
//       username: 'juan_disenador',
//       avatar: 'https://i.pravatar.cc/150?img=3',
//       displayName: 'Juan Pérez',
//       role: 'Diseño 3D'
//     }
//   ]
// };

// export default function ProjectPage({ params }: { params: { id: string } }) {
//   const [activeImage, setActiveImage] = useState(0);
//   const [activeTab, setActiveTab] = useState('overview');

//   const tabs = [
//     { id: 'overview', label: 'Resumen' },
//     { id: 'process', label: 'Proceso' },
//     { id: 'materials', label: 'Materiales' },
//     { id: 'challenges', label: 'Retos' },
//     { id: 'timeline', label: 'Cronograma' },
//     { id: 'comments', label: 'Comentarios' }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <nav className="flex items-center space-x-2 text-sm text-gray-500">
//             <Link href="/" className="hover:text-gray-700">Inicio</Link>
//             <span>/</span>
//             <Link href={`/${mockProject.user.username}`} className="hover:text-gray-700">
//               {mockProject.user.displayName}
//             </Link>
//             <span>/</span>
//             <Link href={`/${mockProject.user.username}/projects`} className="hover:text-gray-700">
//               Proyectos
//             </Link>
//             <span>/</span>
//             <span className="text-gray-900">{mockProject.title}</span>
//           </nav>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
//               {/* Información del creador */}
//               <div className="flex items-center space-x-3 mb-6">
//                 <img
//                   src={mockProject.user.avatar}
//                   alt={mockProject.user.displayName}
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div>
//                   <Link 
//                     href={`/${mockProject.user.username}`}
//                     className="font-semibold text-gray-900 hover:text-blue-600"
//                   >
//                     {mockProject.user.displayName}
//                   </Link>
//                   <p className="text-gray-500 text-sm">@{mockProject.user.username}</p>
//                 </div>
//               </div>

//               {/* Metadatos del proyecto */}
//               <div className="space-y-4">
//                 <div>
//                   <h3 className="font-medium text-gray-900 mb-2">Detalles</h3>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Estado</span>
//                       <span className={`font-medium ${
//                         mockProject.status === 'completed' ? 'text-green-600' :
//                         mockProject.status === 'in-progress' ? 'text-blue-600' : 'text-gray-600'
//                       }`}>
//                         {mockProject.status === 'completed' ? 'Completado' :
//                          mockProject.status === 'in-progress' ? 'En progreso' : 'Planificación'}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Dificultad</span>
//                       <span className={`font-medium ${
//                         mockProject.difficulty === 'easy' ? 'text-green-600' :
//                         mockProject.difficulty === 'medium' ? 'text-yellow-600' : 'text-red-600'
//                       }`}>
//                         {mockProject.difficulty === 'easy' ? 'Fácil' :
//                          mockProject.difficulty === 'medium' ? 'Medio' : 'Difícil'}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Tiempo estimado</span>
//                       <span className="font-medium">{Math.floor(mockProject.timeRequired! / 60)} horas</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Costo total</span>
//                       <span className="font-medium">${mockProject.actualCost}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Estadísticas */}
//                 <div>
//                   <h3 className="font-medium text-gray-900 mb-2">Estadísticas</h3>
//                   <div className="flex space-x-4 text-center">
//                     <div>
//                       <div className="font-bold text-gray-900">{mockProject.likes}</div>
//                       <div className="text-xs text-gray-600">Likes</div>
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-900">{mockProject.views}</div>
//                       <div className="text-xs text-gray-600">Vistas</div>
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-900">{mockProject.saves}</div>
//                       <div className="text-xs text-gray-600">Guardados</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Acciones */}
//                 <div className="space-y-2">
//                   <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium">
//                     <span className="flex items-center justify-center">
//                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                       </svg>
//                       Me gusta
//                     </span>
//                   </button>
//                   <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium">
//                     <span className="flex items-center justify-center">
//                       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
//                       </svg>
//                       Guardar
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Contenido principal */}
//           <div className="lg:col-span-3">
//             {/* Galería de imágenes */}
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
//               <div className="relative h-96 bg-gray-200">
//                 <img
//                   src={mockProject.images[activeImage]}
//                   alt={mockProject.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
              
//               {/* Miniaturas */}
//               <div className="flex space-x-2 p-4 bg-gray-50">
//                 {mockProject.images.map((image, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setActiveImage(index)}
//                     className={`w-16 h-16 rounded border-2 ${
//                       activeImage === index ? 'border-blue-500' : 'border-transparent'
//                     }`}
//                   >
//                     <img
//                       src={image}
//                       alt={`Vista ${index + 1}`}
//                       className="w-full h-full object-cover rounded"
//                     />
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Información del proyecto */}
//             <div className="bg-white rounded-lg shadow-sm">
//               {/* Header */}
//               <div className="border-b border-gray-200 px-6 py-4">
//                 <h1 className="text-2xl font-bold text-gray-900 mb-2">
//                   {mockProject.title}
//                 </h1>
//                 <p className="text-gray-600">{mockProject.description}</p>
//               </div>

//               {/* Tabs */}
//               <div className="border-b border-gray-200">
//                 <nav className="flex space-x-8 px-6">
//                   {tabs.map(tab => (
//                     <button
//                       key={tab.id}
//                       onClick={() => setActiveTab(tab.id)}
//                       className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
//                         activeTab === tab.id
//                           ? 'border-blue-500 text-blue-600'
//                           : 'border-transparent text-gray-500 hover:text-gray-700'
//                       }`}
//                     >
//                       {tab.label}
//                     </button>
//                   ))}
//                 </nav>
//               </div>

//               {/* Contenido de los tabs */}
//               <div className="p-6">
//                 {activeTab === 'overview' && (
//                   <div className="prose max-w-none">
//                     <h3>Descripción completa</h3>
//                     <p className="text-gray-700 leading-relaxed">
//                       {mockProject.fullDescription}
//                     </p>
                    
//                     <h4>Características técnicas</h4>
//                     <ul>
//                       <li>Dimensiones: 120x60x45 cm</li>
//                       <li>Peso: 15 kg</li>
//                       <li>Material principal: Roble macizo + Resina epoxi</li>
//                       <li>Acabado: Aceite natural</li>
//                     </ul>
//                   </div>
//                 )}

//                 {activeTab === 'materials' && (
//                   <div>
//                     <h3 className="text-lg font-semibold mb-4">Lista de materiales</h3>
//                     <div className="space-y-3">
//                       {mockProject.materials.map((material, index) => (
//                         <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                           <div>
//                             <div className="font-medium">{material.name}</div>
//                             <div className="text-sm text-gray-600">{material.quantity}</div>
//                           </div>
//                           {material.cost && (
//                             <div className="text-lg font-semibold">${material.cost}</div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
                    
//                     <div className="mt-6 p-4 bg-blue-50 rounded-lg">
//                       <div className="flex justify-between items-center">
//                         <span className="font-semibold">Costo total estimado:</span>
//                         <span className="text-xl font-bold">${mockProject.actualCost}</span>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === 'process' && (
//                   <div className="space-y-6">
//                     <h3 className="text-lg font-semibold">Proceso paso a paso</h3>
//                     {mockProject.processSteps.map((step, index) => (
//                       <div key={step.id} className="border-l-4 border-blue-500 pl-6 py-2">
//                         <div className="flex items-start space-x-4">
//                           <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
//                             {index + 1}
//                           </div>
//                           <div className="flex-1">
//                             <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
//                             <p className="text-gray-700 mb-3">{step.description}</p>
                            
//                             {step.images && step.images.length > 0 && (
//                               <div className="flex space-x-2 mb-3">
//                                 {step.images.map((img, imgIndex) => (
//                                   <img
//                                     key={imgIndex}
//                                     src={img}
//                                     alt={`Paso ${index + 1} - Imagen ${imgIndex + 1}`}
//                                     className="w-24 h-24 object-cover rounded"
//                                   />
//                                 ))}
//                               </div>
//                             )}
                            
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                               <div>
//                                 <span className="font-medium">Herramientas: </span>
//                                 <span className="text-gray-600">{step.toolsUsed.join(', ')}</span>
//                               </div>
//                               <div>
//                                 <span className="font-medium">Tiempo: </span>
//                                 <span className="text-gray-600">{step.timeSpent} minutos</span>
//                               </div>
//                             </div>
                            
//                             {step.tips && step.tips.length > 0 && (
//                               <div className="mt-3 p-3 bg-green-50 rounded-lg">
//                                 <span className="font-medium text-green-800">💡 Consejos:</span>
//                                 <ul className="mt-1 text-green-700">
//                                   {step.tips.map((tip, tipIndex) => (
//                                     <li key={tipIndex}>• {tip}</li>
//                                   ))}
//                                 </ul>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* ... resto de los tabs ... */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }