'use client';

import { useState } from 'react';

interface InterestsSelectorProps {
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
}

const AVAILABLE_INTERESTS = [
  'Electrónica', 'Carpintería', 'Costura', 'Impresión 3D', 'Programación',
  'Robótica', 'Arte', 'Mecánica', 'Jardinería', 'Cocina',
  'Diseño', 'Fotografía', 'Video', 'Música', 'Escritura',
  'Sostenibilidad', 'Energías Renovables', 'IoT', 'IA', 'Blockchain'
];

export default function InterestsSelector({
  selectedInterests,
  onInterestsChange
}: InterestsSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const toggleInterest = (interest: string) => {
    const newInterests = selectedInterests.includes(interest)
      ? selectedInterests.filter(i => i !== interest)
      : [...selectedInterests, interest];
    
    onInterestsChange(newInterests);
  };

  const filteredInterests = AVAILABLE_INTERESTS.filter(interest =>
    interest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ¿Qué te interesa crear? *
        </label>
        <p className="text-sm text-gray-500 mb-3">
          Selecciona al menos un interés para personalizar tu experiencia
        </p>
        
        <input
          type="text"
          placeholder="Buscar intereses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-1">
        {filteredInterests.map((interest) => (
          <button
            key={interest}
            type="button"
            onClick={() => toggleInterest(interest)}
            className={`p-3 text-sm rounded-lg border transition-all ${
              selectedInterests.includes(interest)
                ? 'bg-blue-100 border-blue-500 text-blue-700'
                : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
            }`}
          >
            {interest}
          </button>
        ))}
      </div>

      {selectedInterests.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">
            Seleccionados: {selectedInterests.length}
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedInterests.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
              >
                {interest}
                <button
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}