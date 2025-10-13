import { UserProfile, OnboardingData } from '@/features/onboarding/types/onboarding';

export const userService = {
  async completeOnboarding(data: OnboardingData): Promise<UserProfile> {
    const response = await fetch('/api/users/onboarding', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error completing onboarding');
    }

    return response.json();
  },

  async updateProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
    const response = await fetch(`/api/users/${userId}/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error updating profile');
    }

    return response.json();
  },
};