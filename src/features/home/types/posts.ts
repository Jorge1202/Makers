export type PostType = 
  | 'project'     // Proyecto finalizado
  | 'wip'         // Work in Progress
  | 'tutorial'    // Tutorial/documentación
  | 'micro'       // Tips & Tricks
  | 'question';   // Preguntas & Feedback

export interface BasePost {
  id: string;
  username: string;
  avatar: string;
  userBadge?: string;
  location?: string;
  caption: string;
  likes: number;
  forks: number;
  timestamp: string;
  comments: Comment[];
  isLiked: boolean;
  isSaved: boolean;
  type: PostType;
  tags?: string[];
  title?: string;
  projectStats: ProjectStats;
}

// Proyecto finalizado (como el original)
export interface ProjectPost extends BasePost {
  type: 'project';
  
  media: Media[];
  projectStats: ProjectStats;
}

// Work in Progress
export interface WipPost extends BasePost {
  type: 'wip';
  media: Media[];
  currentStep: string;
  nextSteps?: string[];
  needsHelp?: boolean;
  parentProjectId?: string;
}

// Tutorial paso a paso
export interface TutorialPost extends BasePost {
  type: 'tutorial';
  media: Media[];
  steps: TutorialStep[];
  skillLevel: 'Principiante' | 'Intermedia' | 'Avanzada';
}

// Tips & Tricks (contenido rápido)
export interface MicroPost extends BasePost {
  type: 'micro';
  media: Media[];
  tipType: 'tool' | 'technique' | 'material' | 'safety';
  duration?: string;
}

// Preguntas & Feedback
export interface QuestionPost extends BasePost {
  type: 'question';
  media: Media[];
  question: string;
  category: string;
  urgency?: 'low' | 'medium' | 'high';
  isResolved?: boolean;
}



export interface Media {
  type: 'image' | 'video';
  url: string;
  alt?: string;
}

export interface ProjectStats {
  materials: string[];
  tools: string[];
  timeRequired: string;
  difficulty: string;
}


export interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
  isMakerQuestion?: boolean;
  isAuthorResponse?: boolean;
  isForkAnnouncement?: boolean;
}

export interface Story {
  id: string;
  username: string;
  avatar: string;
  isLive?: boolean;
  hasNewStory?: boolean;
}

export interface Suggestion {
  id: string;
  username: string;
  avatar: string;
  mutualFollowers: number;
}


export interface TutorialStep {
  step: number;
  title: string;
  description: string;
  media?: Media;
}


export type Posts = ProjectPost | WipPost | TutorialPost | MicroPost | QuestionPost;




// // src/lib/types/posts.ts

// export type PostType = 
//   | 'project'     // Proyecto finalizado
//   | 'wip'         // Work in Progress
//   | 'tutorial'    // Tutorial/documentación
//   | 'micro'       // Tips & Tricks
//   | 'question';   // Preguntas & Feedback

// export interface BasePost {
//   id: string;
//   username: string;
//   avatar: string;
//   userBadge?: string;
//   location?: string;
//   caption: string;
//   likes: number;
//   forks: number;
//   timestamp: string;
//   comments: Comment[];
//   isLiked: boolean;
//   isSaved: boolean;
//   type: PostType;
//   tags?: string[];
// }

// export interface ProjectPost extends BasePost {
//   type: 'project';
//   media: Media[];
//   projectStats: ProjectStats;
//   materials: string[];
//   tools: string[];
//   timeRequired: string;
//   difficulty: 'Principiante' | 'Intermedia' | 'Avanzada';
//   isCompleted: true;
// }

// export interface WipPost extends BasePost {
//   type: 'wip';
//   media: Media[]; // Normalmente 1-2 medios
//   parentProjectId?: string; // Opcional: si pertenece a un proyecto
//   currentStep: string;
//   nextSteps?: string[];
//   needsHelp?: boolean;
// }

// export interface TutorialPost extends BasePost {
//   type: 'tutorial';
//   media: Media[];
//   steps: TutorialStep[];
//   materials: string[];
//   tools: string[];
//   skillLevel: 'Principiante' | 'Intermedia' | 'Avanzada';
// }

// export interface MicroPost extends BasePost {
//   type: 'micro';
//   media: Media[]; // Máximo 1 medio (opcional)
//   tipType: 'tool' | 'technique' | 'material' | 'safety';
//   duration?: string; // Para videos cortos
// }

// export interface QuestionPost extends BasePost {
//   type: 'question';
//   media: Media[]; // Opcional: para mostrar el problema
//   question: string;
//   category: string;
//   urgency?: 'low' | 'medium' | 'high';
//   isResolved?: boolean;
// }

// export interface TutorialStep {
//   step: number;
//   title: string;
//   description: string;
//   media?: Media;
// }

// export type Posts = ProjectPost | WipPost | TutorialPost | MicroPost | QuestionPost;

// // Tipos existentes que mantienen
// export interface Media {
//   type: 'image' | 'video';
//   url: string;
//   alt: string;
// }

// export interface Comment {
//   id: string;
//   username: string;
//   text: string;
//   timestamp: string;
//   isMakerQuestion?: boolean;
//   isAuthorResponse?: boolean;
//   isForkAnnouncement?: boolean;
// }

// export interface ProjectStats {
//   materials: string[];
//   tools: string[];
//   timeRequired: string;
//   difficulty: string;
// }

// export interface Suggestion {
//   id: string;
//   username: string;
//   avatar: string;
//   mutualFollowers: number;
// }
