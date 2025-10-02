import React from 'react';
import { CheckCircle} from 'lucide-react';
import type { QuestionPost } from '@/features/home/types/posts';

interface PostContentProps {
    post: QuestionPost;
    children: React.ReactNode;
}

export const PostQuestion = ({ post, children }: PostContentProps) => {
    const questionPost = post;
    return (
        <>
            <div className="flex items-center space-x-2">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    {/* <Question className="h-3 w-3 mr-1" /> */}
                    PREGUNTA
                </div>
                {post.isResolved && (
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        RESUELTO
                    </div>
                )}
            </div>

            {/* Media */}
            {children}

            <div className="bg-blue-50 rounded-lg p-3 mb-3">
                <div className="text-sm">
                    <span className="font-semibold">Categoría:</span> {questionPost.category}
                    {questionPost.urgency && (
                        <span className={`ml-2 px-2 py-1 rounded text-xs ${questionPost.urgency === 'high' ? 'bg-red-100 text-red-800' :
                            questionPost.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                            }`}>
                            {questionPost.urgency === 'high' ? 'Urgente' :
                                questionPost.urgency === 'medium' ? 'Media' : 'Baja'}
                        </span>
                    )}
                </div>
            </div>
        </>
    );
};

