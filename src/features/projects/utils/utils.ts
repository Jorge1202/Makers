import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours < 24) {
    return remainingMinutes > 0 
      ? `${hours}h ${remainingMinutes}min`
      : `${hours}h`;
  }
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  return `${days}d ${remainingHours}h`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getSafetyLevelColor(level: string): string {
  const colors = {
    low: 'green',
    medium: 'yellow', 
    high: 'red'
  };
  return colors[level as keyof typeof colors] || 'gray';
}

export function getDifficultyColor(difficulty: string): string {
  const colors = {
    beginner: 'green',
    intermediate: 'yellow',
    advanced: 'orange',
    expert: 'red'
  };
  return colors[difficulty as keyof typeof colors] || 'gray';
}

export function getSafetyLevelText(level: string): string {
  const texts = {
    low: 'Bajo',
    medium: 'Medio', 
    high: 'Alto'
  };
  return texts[level as keyof typeof texts] || level;
}