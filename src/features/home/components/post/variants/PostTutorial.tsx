import React from 'react';
import { CheckCircle } from 'lucide-react';
import type { TutorialPost } from '@/features/home/types/posts';

interface PostContentProps {
    post: TutorialPost;
    children: React.ReactNode;
}


export const PostTutorial = ({post, children}:PostContentProps) => {
    const tutorialPost = post;
    return (
        <>
            <div className="bg-purple-100 text-purple-800 px-3 py-1 mb-4 rounded-full text-xs font-medium flex items-center w-fit">
                <CheckCircle className="h-3 w-3 mr-1" />
                TUTORIAL PASO A PASO
            </div>
            
            {/* Media */}
            {children}

            <div className="bg-purple-50 rounded-lg p-3 my-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">Nivel: {tutorialPost.skillLevel}</span>
                    <span>{tutorialPost.steps?.length || 0} pasos</span>
                </div>
            </div>
        </>
    )
};
