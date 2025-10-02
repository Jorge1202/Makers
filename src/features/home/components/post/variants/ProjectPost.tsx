import React from 'react';
import { GitFork, CheckCircle} from 'lucide-react';
import type { ProjectPost } from '@/features/home/types/posts';

interface PostContentProps {
    post: ProjectPost;
    children: React.ReactNode;
}


export const PostProject = ({post, children}:PostContentProps) => {
    return (
        <>
            <div className="flex items-center space-x-2">
                <div className="text-sm whitespace-pre-line">                            
                    <div className="flex items-center space-x-2">
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                            ⭐ Proyecto verificado
                        </span>
                    </div>
                </div>
            </div>

            {/* Media */}
            {children}
            
            
            {/* Título y descripción */}
            <h3 className="font-bold text-lg mb-1 line-clamp-1">{post.title}</h3>
            <div className='flex items-center justify-between space-x-2'>
                <div className='text-sm mb-2 whitespace-pre-line'>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        PROYECTO COMPLETADO
                    </div>
                </div>
                <div className="text-gray-500 text-xs uppercase mb-3">
                    {post.timestamp}
                </div>
            </div>
                <div className="text-sm mb-2 whitespace-pre-line">
                {post.caption}
            </div>

            {/* Estadísticas del proyecto */}
            {post.projectStats && (
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                            <span className="font-semibold">Dificultad:</span> {post.projectStats.difficulty}
                        </div>
                        <div>
                            <span className="font-semibold">Tiempo:</span> {post.projectStats.timeRequired}
                        </div>
                        <div className="col-span-2">
                            <span className="font-semibold">Materiales:</span> {post.projectStats.materials.join(', ')}
                        </div>
                    </div>
                </div>
            )}
            <div className="bg-blue-50 rounded-lg p-3 mb-3">
                <div className="space-x-2 text-sm flex items-center justify-between">
                    <div className='flex items-center space-x-2 text-gray-600'>
                        <span> 🛠️ </span>
                        <span>
                            <strong>12 personas</strong> ya replicaron este proyecto.
                        </span>
                    </div>
                    <div>
                        <button className="p-1.5 hover:text-gray-600 cursor-pointer text-green-500 transition-colors flex items-center space-x-1 font-medium">
                            <GitFork className="h-5 w-5 mr-1" />                            
                            Crear mi versión
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
