// src/app/[username]/about/page.tsx
import { ProfileLayout, mockUser } from '@/features/users/components/layoutProfile';

export default async function AboutPage() {
    return (
        <ProfileLayout>
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Acerca de mí</h1>

                <div className="space-y-8">
                    {/* Biografía extendida */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">Mi Historia</h2>
                        <p className="text-gray-700 leading-relaxed">
                            {mockUser.professionalBackground}
                        </p>
                        <div className="mt-2 text-sm text-gray-600">
                            <strong>{mockUser.yearsOfExperience} años</strong> de experiencia en el sector
                        </div>
                    </section>

                    {/* Formación y Certificaciones */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">Formación</h2>
                        <div className="space-y-3">
                            {mockUser.education?.map((edu, index) => (
                                <div key={index} className="flex justify-between items-start">
                                    <div>
                                        <div className="font-medium text-gray-900">{edu.degree}</div>
                                        <div className="text-gray-600">{edu.institution}</div>
                                    </div>
                                    {edu.year && (
                                        <div className="text-gray-500 text-sm">{edu.year}</div>
                                    )}
                                </div>
                            ))}

                            {mockUser.certifications && mockUser.certifications.length > 0 && (
                                <div className="mt-4">
                                    <div className="font-medium text-gray-900 mb-2">Certificaciones</div>
                                    <div className="flex flex-wrap gap-2">
                                        {mockUser.certifications.map((cert, index) => (
                                            <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                                {cert}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Especialidades Técnicas */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">Especialidades Técnicas</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-medium text-gray-900 mb-2">Técnicas Dominadas</h3>
                                <div className="flex flex-wrap gap-2">
                                    {mockUser.techniques.map((tech, index) => (
                                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-900 mb-2">Materiales de Especialidad</h3>
                                <div className="flex flex-wrap gap-2">
                                    {mockUser.materialsExpertise.map((material, index) => (
                                        <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                                            {material}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Estilo e Influencias */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">Estilo e Influencias</h2>
                        <div className="flex flex-wrap gap-3">
                            {mockUser.style.map((style, index) => (
                                <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                                    {style}
                                </span>
                            ))}
                        </div>
                        {mockUser.influences && mockUser.influences.length > 0 && (
                            <div className="mt-3">
                                <div className="text-sm text-gray-600">
                                    <strong>Influencias:</strong> {mockUser.influences.join(', ')}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Información Profesional */}
                    {mockUser.businessInfo && (
                        <section>
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">Información Profesional</h2>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <div className="font-medium text-gray-900">{mockUser.businessInfo.businessName}</div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            {mockUser.businessInfo.services?.join(' • ')}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${mockUser.businessInfo.availability === 'available'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {mockUser.businessInfo.availability === 'available' ? 'Disponible' : 'Ocupado'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Metas y Objetivos */}
                    {mockUser.goals && (
                        <section>
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">Metas y Objetivos</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">Corto Plazo</h3>
                                    <ul className="space-y-1 text-sm text-gray-700">
                                        {mockUser.goals.shortTerm.map((goal, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-green-500 mr-2">•</span>
                                                {goal}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">Largo Plazo</h3>
                                    <ul className="space-y-1 text-sm text-gray-700">
                                        {mockUser.goals.longTerm.map((goal, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-blue-500 mr-2">•</span>
                                                {goal}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Participación en la Comunidad */}
                    {mockUser.communityInvolvement && (
                        <section>
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">Participación en la Comunidad</h2>
                            <div className="flex flex-wrap gap-4">
                                {mockUser.communityInvolvement.mentoring && (
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        <span className="text-sm text-gray-700">Disponible para mentorías</span>
                                    </div>
                                )}
                                {mockUser.communityInvolvement.collaborations && (
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                        <span className="text-sm text-gray-700">Abierto a colaboraciones</span>
                                    </div>
                                )}
                                {mockUser.communityInvolvement.workshopHosting && (
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                        <span className="text-sm text-gray-700">Organiza talleres</span>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </ProfileLayout>
    );
}