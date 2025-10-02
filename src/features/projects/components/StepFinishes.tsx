import { Step } from '@/features/projects/types/project';
import { formatTime } from '@/features/projects/utils/utils';

interface StepFinishesProps {
  step: Step;
}

export default function StepFinishes({ step }: StepFinishesProps) {
  if (!step.finishes) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-4xl mb-4">🎨</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No aplica para este paso</h3>
        <p>Este paso no incluye técnicas de acabado específicas.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Técnicas de acabado */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Técnicas de Acabado</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {step.finishes.techniques.map((technique, index) => (
            <div key={index} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="font-medium text-gray-900">{technique}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Productos utilizados */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Productos y Materiales</h3>
        <div className="space-y-2">
          {step.finishes.products.map((product, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-700">{product}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Proceso de aplicación */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Proceso de Aplicación</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700 leading-relaxed">{step.finishes.application}</p>
        </div>
      </div>

      {/* Información de tiempo de secado */}
      {step.finishes.dryingTime && (
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900">Tiempo de secado/currado:</span>
            <span className="text-lg font-bold text-yellow-600">
              {formatTime(step.finishes.dryingTime)}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Este tiempo debe respetarse antes de continuar con el siguiente paso.
          </p>
        </div>
      )}

      {/* Consejos adicionales */}
      {step.finishes.tips.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Consejos para Mejores Resultados</h3>
          <div className="space-y-2">
            {step.finishes.tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  {index + 1}
                </div>
                <p className="text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}