import React from 'react';
import { Clock, HelpCircle } from 'lucide-react';
import type { WipPost } from '@/features/home/types/posts';

interface PostContentProps {
    post: WipPost;
    children: React.ReactNode;
}


export const PostWip = ({post, children}:PostContentProps) => {

    const wipPost = post;

    return (
        <>
            <div className="flex items-center space-x-2 mb-4">
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

            {/* Media */}
            {children}

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
        </>
    );
};
