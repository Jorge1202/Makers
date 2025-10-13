export interface UserProfile {
  id: string;
  email: string;
  username: string;
  name?: string;
  birthDate?: string;
  gender?: string;
  bio?: string;
  profilePicture?: string;
  interests?: string[];
  website?: string;
  github?: string;
  instagram?: string;
  location?: string;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BasicProfileData {
  name: string;
  interests: string[];
}

export interface CompleteProfileData {
  birthDate?: string;
  gender?: string;
  bio?: string;
  website?: string;
  github?: string;
  instagram?: string;
  location?: string;
}

export interface OnboardingData {
  basic: BasicProfileData;
  complete: CompleteProfileData;
}