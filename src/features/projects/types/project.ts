export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  joinDate: string;
  projectCount: number;
  username: string;
}

export interface MediaItem {
  type: 'image' | 'video' | 'gif' | '3d-model';
  url: string;
  thumbnail?: string;
  caption?: string;
  duration?: number;
}

export interface Tool {
  name: string;
  quantity?: string;
  notes?: string;
}

export interface Material {
  name: string;
  quantity: string;
  cost?: number;
  notes?: string;
}

export interface SafetyInfo {
  level: 'low' | 'medium' | 'high';
  equipment: string[];
  warnings: string[];
}

export interface Checkpoint {
  description: string;
  verified: boolean;
}

export interface Measurement {
  part: string;
  dimension: string;
  tolerance?: string;
  actual?: string;
}

export interface Step {
  id: string;
  order: number;
  title: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'skipped';
  
  // 🎯 INSTRUCCIONES PRINCIPALES
  instructions: {
    description: string;
    estimatedTime: number;
    media: MediaItem[];
    substeps: string[];
  };
  
  // 🛠️ RECURSOS Y HERRAMIENTAS
  resources: {
    tools: Tool[];
    materials: Material[];
    safety: SafetyInfo;
    workspace: string[];
  };
  
  // 🎨 ACABADOS
  finishes?: {
    techniques: string[];
    products: string[];
    application: string;
    dryingTime?: number;
    tips: string[];
  };
  
  // 🔍 CONTROL CALIDAD
  quality: {
    checkpoints: Checkpoint[];
    tests: string[];
    measurements: Measurement[];
    tolerance: string;
  };
  
  // 📈 LECCIONES APRENDIDAS
  lessons: {
    whatWorked: string[];
    improvements: string[];
    tips: string[];
    mistakes: string[];
  };
  
  // 🏷️ METADATOS TÉCNICOS
  technical: {
    skills: string[];
    techniques: string[];
    difficulty: 'low' | 'medium' | 'high';
    critical: boolean;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  objectives: string[];
  expectedResult: string;
  inspiration: string[];
  
  // METADATOS BÁSICOS
  status: 'planning' | 'in-progress' | 'completed' | 'paused';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  tags: string[];
  
  // PLANIFICACIÓN
  planning: {
    timeline: {
      phase: string;
      startDate: string;
      endDate?: string;
      description: string;
    }[];
    budget: {
      estimated: number;
      actual?: number;
      breakdown: {
        category: string;
        amount: number;
      }[];
    };
    materials: Material[];
    tools: Tool[];
    workspace: string;
  };
  
  // PROCESO
  steps: Step[];
  
  // RESULTADO FINAL
  finalResult?: {
    gallery: string[];
    metrics: {
      name: string;
      expected: string;
      actual: string;
    }[];
    costComparison: {
      estimated: number;
      actual: number;
    };
  };
  
  // REFLEXIONES FINALES
  reflections?: {
    whatWorked: string[];
    improvements: string[];
    advice: string[];
  };
  
  // ESTADÍSTICAS
  likes: number;
  views: number;
  saves: number;
  completionCount: number;
  
  // METADATOS
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  
  // USUARIO
  user: User;
  collaborators?: {
    user: User;
    role: string;
  }[];
}