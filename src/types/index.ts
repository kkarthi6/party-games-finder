export interface Game {
  id: string;
  name: string;
  emoji: string;
  players: {
    min: number;
    max: number;
  };
  duration: number; // in minutes
  items: string[];
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'physical' | 'mental' | 'creative' | 'social';
  instructions?: string;
}

export interface GameFinderInputs {
  players: number;
  duration: number;
  items: string;
}

export interface GameMatch {
  game: Game;
  score: number;
  reasons: string[];
}

export interface SwipeAction {
  gameId: string;
  action: 'like' | 'pass';
}