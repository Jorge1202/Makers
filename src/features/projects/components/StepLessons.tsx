import { Step } from '@/features/projects/types/project';

interface StepLessonsProps {
  step: Step;
}

export default function StepLessons({ step }: StepLessonsProps) {
  return (
    <div className="space-y-6">
      {/* Lo que funcionó bien */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          ✅ Lo que Funcionó Bien
        </h3>
        <div className="space-y-2">
          {step.lessons.whatWorked.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                ✓
              </div>
              <p className="text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mejoras identificadas */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          🔧 Mejoras para la Próxima Vez
        </h3>
        <div className="space-y-2">
          {step.lessons.improvements.map((improvement, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                {index + 1}
              </div>
              <p className="text-gray-700">{improvement}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Consejos prácticos */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          💡 Consejos Prácticos
        </h3>
        <div className="space-y-2">
          {step.lessons.tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                💡
              </div>
              <p className="text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Errores comunes a evitar */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          ❌ Errores Comunes y Cómo Evitarlos
        </h3>
        <div className="space-y-3">
          {step.lessons.mistakes.map((mistake, index) => (
            <div key={index} className="p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="font-medium text-red-800 mb-1">Problema:</div>
              <p className="text-red-700 mb-2">{mistake}</p>
              <div className="font-medium text-green-800 mb-1">Solución recomendada:</div>
              <p className="text-green-700">
                {step.lessons.tips[index] || "Revisar las instrucciones cuidadosamente y verificar medidas."}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Resumen de lecciones */}
      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
        <h4 className="font-semibold text-gray-900 mb-2">📊 Resumen de Aprendizaje</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="font-bold text-green-600">{step.lessons.whatWorked.length}</div>
            <div className="text-gray-600">Aciertos</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-blue-600">{step.lessons.improvements.length}</div>
            <div className="text-gray-600">Mejoras</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-yellow-600">{step.lessons.tips.length}</div>
            <div className="text-gray-600">Consejos</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-red-600">{step.lessons.mistakes.length}</div>
            <div className="text-gray-600">Errores</div>
          </div>
        </div>
      </div>
    </div>
  );
}