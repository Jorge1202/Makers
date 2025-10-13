'use client';

import { useState } from 'react';

interface CompleteProfileFormProps {
  onSubmit: (data: { birthDate: string; gender: string; bio: string; website: string; github: string; instagram: string; location: string }) => void;
  onSkip: () => void;
  initialData?: {
    birthDate?: string;
    gender?: string;
    bio?: string;
    website?: string;
    github?: string;
    instagram?: string;
    location?: string;
  };
  isLoading?: boolean;
}

export default function CompleteProfileForm({
  onSubmit,
  onSkip,
  initialData = {},
  isLoading = false
}: CompleteProfileFormProps) {
  const [formData, setFormData] = useState({
    birthDate: initialData.birthDate || '',
    gender: initialData.gender || '',
    bio: initialData.bio || '',
    website: initialData.website || '',
    github: initialData.github || '',
    instagram: initialData.instagram || '',
    location: initialData.location || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Personaliza tu perfil</h2>
        <p className="text-gray-600 mt-2">
          Esta información te ayudará a conectar mejor con la comunidad (opcional)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              id="birthDate"
              value={formData.birthDate}
              onChange={(e) => updateField('birthDate', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Género
            </label>
            <select
              id="gender"
              value={formData.gender}
              onChange={(e) => updateField('gender', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Prefiero no decir</option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Biografía
          </label>
          <textarea
            id="bio"
            rows={3}
            value={formData.bio}
            onChange={(e) => updateField('bio', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Cuéntanos sobre tus pasiones y proyectos..."
            maxLength={160}
          />
          <p className="mt-1 text-sm text-gray-500">
            {formData.bio.length}/160 caracteres
          </p>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Ubicación
          </label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={(e) => updateField('location', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ciudad, País"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Enlaces (opcionales)</h3>
          
          <div>
            <label htmlFor="website" className="block text-xs font-medium text-gray-500">
              Sitio web personal
            </label>
            <input
              type="url"
              id="website"
              value={formData.website}
              onChange={(e) => updateField('website', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://tusitio.com"
            />
          </div>

          <div>
            <label htmlFor="github" className="block text-xs font-medium text-gray-500">
              GitHub
            </label>
            <input
              type="url"
              id="github"
              value={formData.github}
              onChange={(e) => updateField('github', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://github.com/tuusuario"
            />
          </div>

          <div>
            <label htmlFor="instagram" className="block text-xs font-medium text-gray-500">
              Instagram
            </label>
            <input
              type="url"
              id="instagram"
              value={formData.instagram}
              onChange={(e) => updateField('instagram', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://instagram.com/tuusuario"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onSkip}
            disabled={isLoading}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Omitir por ahora
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Guardando...' : 'Completar Perfil'}
          </button>
        </div>
      </form>
    </div>
  );
}