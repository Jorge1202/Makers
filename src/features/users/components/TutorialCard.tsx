import React from 'react';
import { Tutorial } from '@/features/users/types/types';

export const TutorialCard = ({ tutorial }: { tutorial: Tutorial }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-48 bg-gray-200">
                <img
                    src={tutorial.thumbnail}
                    alt={tutorial.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{tutorial.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{tutorial.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className={`font-medium ${tutorial.difficulty === 'easy' ? 'text-green-600' :
                        tutorial.difficulty === 'medium' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                        {tutorial.difficulty === 'easy' ? 'Fácil' :
                            tutorial.difficulty === 'medium' ? 'Medio' : 'Difícil'}
                    </span>
                    <span>{tutorial.timeRequired} min</span>
                </div>
            </div>
        </div>
    );
};
