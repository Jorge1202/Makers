import React from 'react';
import { Lightbulb } from 'lucide-react';

import type { MicroPost } from '@/features/home/types/posts';

interface PostContentProps {
    post: MicroPost;
    children?: React.ReactNode;
}   

export const PostMicro = ({post, children}:PostContentProps) => {
    const microPost = post;

    return (
        <>
            <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium flex items-center w-fit">
                <Lightbulb className="h-3 w-3 mr-1" />
                TIP RÁPIDO • {post.duration || '1 min'}
            </div>

            {/* Media */}
            {children}  

            {/* Título y descripción */}
            <div className="bg-orange-50 rounded-lg p-3 mb-3">
                <div className="text-sm">
                    <span className="font-semibold">Tipo:</span> {microPost.tipType}
                </div>
            </div>
            

        </>
    );
};

