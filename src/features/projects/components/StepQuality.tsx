import { Step } from '@/features/projects/types/project';

interface StepQualityProps {
  step: Step;
}

export default function StepQuality({ step }: StepQualityProps) {
  const verifiedCheckpoints = step.quality.checkpoints.filter(cp => cp.verified).length;
  const totalCheckpoints = step.quality.checkpoints.length;

  return (
    <div className="space-y-6">
      {/* Resumen de verificación */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-gray-900">Progreso de verificación:</span>
          <span className="text-lg font-bold text-blue-600">
            {verifiedCheckpoints} de {totalCheckpoints} puntos verificados
          </span>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(verifiedCheckpoints / totalCheckpoints) * 100}%` }}
          />
        </div>
      </div>

      {/* Puntos de verificación */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">✅ Puntos de Verificación</h3>
        <div className="space-y-3">
          {step.quality.checkpoints.map((checkpoint, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                checkpoint.verified 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {checkpoint.verified ? '✓' : '?'}
              </div>
              <div className="flex-1">
                <div className={`font-medium ${
                  checkpoint.verified ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {checkpoint.description}
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                checkpoint.verified 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {checkpoint.verified ? 'Verificado' : 'Pendiente'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mediciones y tolerancias */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">📏 Mediciones y Tolerancias</h3>
        <div className="bg-gray-50 rounded-lg p-4 mb-3">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-900">Tolerancia general:</span>
            <span className="text-lg font-bold text-gray-700">{step.quality.tolerance}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {step.quality.measurements.map((measurement, index) => (
            <div key={index} className="p-3 bg-white rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-gray-900">{measurement.part}</div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Objetivo: {measurement.dimension}</div>
                  {measurement.tolerance && (
                    <div className="text-xs text-gray-500">Tolerancia: {measurement.tolerance}</div>
                  )}
                </div>
              </div>
              {measurement.actual && (
                <div className={`px-3 py-1 rounded text-sm font-medium ${
                  measurement.actual.includes('±') 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  Real: {measurement.actual}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pruebas realizadas */}
      {step.quality.tests.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">🔬 Pruebas de Validación</h3>
          <div className="space-y-2">
            {step.quality.tests.map((test, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="text-gray-700">{test}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}