import { Step } from '@/features/projects/types/project';

interface StepTechnicalProps {
  step: Step;
}

export default function StepTechnical({ step }: StepTechnicalProps) {
  return (
    <div className="space-y-6">
      {/* Habilidades requeridas */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">🛠️ Habilidades Requeridas</h3>
        <div className="flex flex-wrap gap-2">
          {step.technical.skills.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Técnicas aplicadas */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">🎯 Técnicas Aplicadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {step.technical.techniques.map((technique, index) => (
            <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="font-medium text-gray-900">{technique}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Metadatos técnicos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dificultad */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="font-semibold text-gray-900 mb-2">📈 Nivel de Dificultad</h4>
          <div className={`px-3 py-2 rounded-lg text-center font-medium ${
            step.technical.difficulty === 'low' ? 'bg-green-100 text-green-800' :
            step.technical.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {step.technical.difficulty === 'low' ? 'Baja' :
             step.technical.difficulty === 'medium' ? 'Media' : 'Alta'}
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            {step.technical.difficulty === 'low' ? 'Adecuado para principiantes' :
             step.technical.difficulty === 'medium' ? 'Se requiere experiencia básica' :
             'Se requiere experiencia avanzada'}
          </p>
        </div>

        {/* Importancia del paso */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="font-semibold text-gray-900 mb-2">⭐ Importancia del Paso</h4>
          <div className={`px-3 py-2 rounded-lg text-center font-medium ${
            step.technical.critical 
              ? 'bg-red-100 text-red-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {step.technical.critical ? 'Crítico' : 'Secundario'}
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            {step.technical.critical 
              ? 'Este paso es esencial para el éxito del proyecto'
              : 'Este paso puede ajustarse sin afectar el resultado principal'
            }
          </p>
        </div>
      </div>

      {/* Resumen técnico */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">📋 Resumen Técnico</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Habilidades requeridas:</span>
            <span className="font-medium text-gray-900">{step.technical.skills.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Técnicas aplicadas:</span>
            <span className="font-medium text-gray-900">{step.technical.techniques.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Nivel de dificultad:</span>
            <span className="font-medium text-gray-900 capitalize">{step.technical.difficulty}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Paso crítico:</span>
            <span className={`font-medium ${
              step.technical.critical ? 'text-red-600' : 'text-green-600'
            }`}>
              {step.technical.critical ? 'Sí' : 'No'}
            </span>
          </div>
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-semibold text-gray-900 mb-2">💡 Recomendaciones Técnicas</h4>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>• Practicar las técnicas en material de desecho antes del proyecto real</li>
          <li>• Verificar el estado y calibración de todas las herramientas</li>
          <li>• Documentar cualquier variación del proceso para futuras referencias</li>
          {step.technical.critical && (
            <li className="text-red-600 font-medium">
              • Este paso requiere especial atención ya que es crítico para el éxito del proyecto
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}