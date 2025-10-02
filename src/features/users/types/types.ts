// src/features/users/types.ts
export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  coverImage?: string;
  bio?: string;
  location?: string;
  website?: string;
  joinedDate: string;
  
  expertiseLevel: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  specialties: string[];
  tools: string[];
  
  stats: {
    projectsCompleted: number;
    projectsInProgress: number;
    followers: number;
    following: number;
    tutorialsCreated: number;
  };
  
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    github?: string;
    tiktok?: string;
  };

  // Nueva información para "Acerca de"
  yearsOfExperience: number;
  professionalBackground?: string;
  education?: {
    degree?: string;
    institution?: string;
    year?: number;
  }[];
  certifications?: string[];
  
  // Especialidades técnicas
  techniques: string[]; // ['dovetail joints', 'resin casting', 'metalworking']
  materialsExpertise: string[]; // ['hardwoods', 'acrylic', 'electronics']
  
  // Estilo personal
  style: string[]; // ['minimalist', 'industrial', 'rustic', 'modern']
  influences?: string[]; // ['mid-century', 'japanese', 'scandinavian']
  businessInfo?: {
    isProfessional: boolean;
    businessName?: string;
    services?: string[]; // ['custom furniture', 'restoration', 'consulting']
    pricingTier?: 'hobbyist' | 'freelancer' | 'studio' | 'company';
    availability?: 'available' | 'limited' | 'booked';
  };
  goals?: {
    shortTerm: string[]; // ['Learn CNC machining', 'Build workshop']
    longTerm: string[]; // ['Open studio', 'Teach workshops']
  };

  communityInvolvement?: {
    mentoring: boolean;
    collaborations: boolean;
    workshopHosting: boolean;
  };

}

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  status: 'planning' | 'in-progress' | 'completed' | 'paused' | 'abandoned';
  difficulty: 'easy' | 'medium' | 'hard';
  timeRequired?: number;
  toolsUsed: string[];
  materials: string[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  views: number;
  user: {
    username: string;
    avatar: string;
    displayName: string;
  };
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  projectId?: string;
  steps: TutorialStep[];
  difficulty: 'easy' | 'medium' | 'hard' | 'intermediate';
  timeRequired: number;
  toolsRequired: string[];
  materialsRequired: string[];
}

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
  order: number;
}