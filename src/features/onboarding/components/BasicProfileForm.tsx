'use client';

import { useState } from 'react';
import InterestsSelector from './InterestsSelector';

interface BasicProfileFormProps {
  onSubmit: (data: { name: string; interests: string[] }) => void;
  initialData?: { name: string; interests: string[] };
  isLoading?: boolean;
}

export default function BasicProfileForm({
  onSubmit,
  initialData = { name: '', interests: [] },
  isLoading = false
}: BasicProfileFormProps) {
  const [formData, setFormData] = useState({
    name: initialData.name,
    interests: initialData.interests
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.interests.length === 0) {
      alert('Por favor selecciona al menos un interés');
      return;
    }
    onSubmit(formData);
  };

  const updateField = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm border">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Completa tu perfil</h2>
        <p className="text-gray-600 mt-2">
          Ayúdanos a personalizar tu experiencia
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre completo *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tu nombre completo"
          />
        </div>

        <InterestsSelector
          selectedInterests={formData.interests}
          onInterestsChange={(interests) => updateField('interests', interests)}
        />

        <button
          type="submit"
          disabled={isLoading || !formData.name || formData.interests.length === 0}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Guardando...' : 'Continuar'}
        </button>
      </form>
    </div>
  );
}