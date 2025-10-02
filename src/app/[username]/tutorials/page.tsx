// src/app/[username]/tutorials/page.tsx
import { ProfileLayout, mockTutorials } from '@/features/users/components/layoutProfile';
import { TutorialCard } from '@/features/users/components/TutorialCard';

export default async function TutorialsPage() {
    return (
        <ProfileLayout>
            <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Tutoriales</h1>
                            <p className="text-gray-600 mt-1">
                                {mockTutorials.length} tutoriales creados
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockTutorials.map(tutorial => (
                            <TutorialCard key={tutorial.id} tutorial={tutorial} />
                        ))}
                    </div>
                </div>
            </div>
        </ProfileLayout>
    );
}