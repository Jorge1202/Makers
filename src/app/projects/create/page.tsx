import { CreateProjectForm } from '@/features/projects/components/CreateProjectForm';
import { Layout } from '@/components/layout/layoutHeader';
import { ProfileLayout, mockUser } from '@/features/users/components/layoutProfile';

export default function CreateProjectPage() {
    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Crear Nuevo Proyecto</h1>
                        <p className="mt-2 text-lg text-gray-600">
                            Comparte tu proceso creativo paso a paso con la comunidad
                        </p>
                    </div>

                    <CreateProjectForm />
                </div>
            </div>
        </Layout>
    );
}