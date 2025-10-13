'use client';

import { useState } from 'react';
import { useProjectForm } from '../hooks/useProjectForm';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { PlanningStep } from './steps/PlanningStep';
import { ProcessStep } from './steps/ProcessStep';
import { FinalResultStep } from './steps/FinalResultStep';
import { ReviewStep } from './steps/ReviewStep';

const steps = [
    'Información Básica',
    'Planificación',
    'Proceso',
    'Resultado Final',
    'Revisar'
];

export const CreateProjectForm = () => {
    const {
        formData,
        currentStep,
        updateFormData,
        addObjective,
        updateObjective,
        removeObjective,
        addInspiration,
        updateInspiration,
        removeInspiration,
        addMaterial,
        updateMaterial,
        removeMaterial,
        addStep,
        updateStep,
        removeStep,
        nextStep,
        prevStep,
        resetForm,
        addFeaturedMedia,
        removeFeaturedMedia,
        setFeaturedMedia,
        updateMediaCaption
    } = useProjectForm();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Aquí iría la llamada a tu API
            console.log('Enviando proyecto:', formData);
            // await createProject(formData);
            alert('¡Proyecto creado exitosamente!');
            resetForm();
        } catch (error) {
            console.error('Error creando proyecto:', error);
            alert('Error al crear el proyecto');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        const commonProps = {
            formData,
            updateFormData,
            addObjective,
            updateObjective,
            removeObjective,
            addInspiration,
            updateInspiration,
            removeInspiration,
            addMaterial,
            updateMaterial,
            removeMaterial,
            addStep,
            updateStep,
            removeStep,
            addFeaturedMedia,
            removeFeaturedMedia,
            setFeaturedMedia,
            updateMediaCaption,
        };

        switch (currentStep) {
            case 0:
                return <BasicInfoStep {...commonProps} />;
            case 1:
                return <PlanningStep {...commonProps} />;
            case 2:
                return <ProcessStep {...commonProps} />;
            case 3:
                return <FinalResultStep {...commonProps} />;
            case 4:
                return <ReviewStep formData={formData} />;
            default:
                return null;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between mb-2">
                    {steps.map((step, index) => (
                        <div
                            key={step}
                            className={`text-sm ${index <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'
                                }`}
                        >
                            {step}
                        </div>
                    ))}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                {renderStep()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
                <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    Anterior
                </button>

                {currentStep < steps.length - 1 ? (
                    <button
                        onClick={nextStep}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Siguiente
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Creando...' : 'Crear Proyecto'}
                    </button>
                )}
            </div>
        </div>
    );
};