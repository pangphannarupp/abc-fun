
export enum Screen {
  WELCOME = 'welcome',
  GRID = 'grid',
  DETAIL = 'detail',
  TRACING = 'tracing',
  QUIZ = 'quiz',
  SONGS = 'songs',
  PROFILE = 'profile',
  SETTINGS = 'settings'
}

export interface LetterData {
  id: string;
  upper: string;
  lower: string;
  word: string;
  icon: string;
  color: string;
  image: string;
  description: string;
  examples: Array<{
    word: string;
    description: string;
    image: string;
  }>;
}

export interface UserStats {
  daysLearned: number;
  starsEarned: number;
  lettersCompleted: number;
  completedLetters: string[];
  level: number;
  name: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  image: string;
  audioUrl?: string;
}
