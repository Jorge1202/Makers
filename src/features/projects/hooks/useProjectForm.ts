import { useState } from 'react';
import { Project, Material, Tool, Step, ProjectMedia  } from '@/features/projects/types/project';

const initialProjectData: Project = {
    id: '',
    likes: 0,
    views: 0,
    saves: 0,
    completionCount: 0,
    createdAt: '',
    updatedAt: '',
    featuredMedia: [],
    user: {
        id: "",
        name: "",
        avatar: "",
        bio: "",
        joinDate: "",
        projectCount: 0,
        username: "",
    },
    title: '',
    description: '',
    fullDescription: '',
    objectives: [''],
    expectedResult: '',
    inspiration: [''],
    status: 'planning',
    difficulty: 'beginner',
    category: '',
    tags: [],
    planning: {
        timeline: [{
            phase: '',
            startDate: '',
            description: ''
        }],
        budget: {
            estimated: 0,
            breakdown: []
        },
        materials: [],
        tools: [],
        workspace: ''
    },
    steps: []
};

export const useProjectForm = () => {
    const [formData, setFormData] = useState<Project>(initialProjectData);
    const [currentStep, setCurrentStep] = useState(0);

    const updateFormData = (updates: Partial<Project>) => {
        setFormData(prev => ({ ...prev, ...updates }));
    };

    const addObjective = () => {
        setFormData(prev => ({
            ...prev,
            objectives: [...prev.objectives, '']
        }));
    };

    const updateObjective = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            objectives: prev.objectives.map((obj, i) => i === index ? value : obj)
        }));
    };

    const removeObjective = (index: number) => {
        setFormData(prev => ({
            ...prev,
            objectives: prev.objectives.filter((_, i) => i !== index)
        }));
    };

    const addInspiration = () => {
        setFormData(prev => ({
            ...prev,
            inspiration: [...prev.inspiration, '']
        }));
    };

    const updateInspiration = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            inspiration: prev.inspiration.map((insp, i) => i === index ? value : insp)
        }));
    };

    const removeInspiration = (index: number) => {
        setFormData(prev => ({
            ...prev,
            inspiration: prev.inspiration.filter((_, i) => i !== index)
        }));
    };

    const addMaterial = (material: Material) => {
        setFormData(prev => ({
            ...prev,
            planning: {
                ...prev.planning,
                materials: [...prev.planning.materials, material]
            }
        }));
    };

    const updateMaterial = (index: number, material: Material) => {
        setFormData(prev => ({
            ...prev,
            planning: {
                ...prev.planning,
                materials: prev.planning.materials.map((mat, i) => i === index ? material : mat)
            }
        }));
    };

    const removeMaterial = (index: number) => {
        setFormData(prev => ({
            ...prev,
            planning: {
                ...prev.planning,
                materials: prev.planning.materials.filter((_, i) => i !== index)
            }
        }));
    };

    const addStep = (step: Step) => {
        setFormData(prev => ({
            ...prev,
            steps: [...prev.steps, { ...step, order: prev.steps.length }]
        }));
    };

    const updateStep = (index: number, step: Step) => {
        setFormData(prev => ({
            ...prev,
            steps: prev.steps.map((s, i) => i === index ? step : s)
        }));
    };

    const removeStep = (index: number) => {
        setFormData(prev => ({
            ...prev,
            steps: prev.steps.filter((_, i) => i !== index).map((step, idx) => ({ ...step, order: idx }))
        }));
    };

    const nextStep = () => {
        setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    const resetForm = () => {
        setFormData(initialProjectData);
        setCurrentStep(0);
    };

    // Funciones para manejar medios
  const addFeaturedMedia = (files: FileList) => {
    const newMedia: ProjectMedia[] = Array.from(files).map(file => ({
      type: file.type.startsWith('video/') ? 'video' : 'image',
      url: URL.createObjectURL(file), // Preview temporal
      file: file,
      isFeatured: formData.featuredMedia.length === 0 // El primero es destacado
    }));

    setFormData(prev => ({
      ...prev,
      featuredMedia: [...prev.featuredMedia, ...newMedia]
    }));
  };

  const removeFeaturedMedia = (index: number) => {
    setFormData(prev => ({
      ...prev,
      featuredMedia: prev.featuredMedia.filter((_, i) => i !== index)
    }));
  };

  const setFeaturedMedia = (index: number) => {
    setFormData(prev => ({
      ...prev,
      featuredMedia: prev.featuredMedia.map((media, i) => ({
        ...media,
        isFeatured: i === index
      }))
    }));
  };

  const updateMediaCaption = (index: number, caption: string) => {
    setFormData(prev => ({
      ...prev,
      featuredMedia: prev.featuredMedia.map((media, i) =>
        i === index ? { ...media, caption } : media
      )
    }));
  };

    return {
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
    };
};