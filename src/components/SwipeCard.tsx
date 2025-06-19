import React from 'react';
import { Game } from '../types';

interface SwipeCardProps {
  game: Game;
  onSwipe: (direction: 'left' | 'right') => void;
  style?: React.CSSProperties;
}

export default function SwipeCard({ game, onSwipe, style }: SwipeCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'physical': return '🏃';
      case 'mental': return '🧠';
      case 'creative': return '🎨';
      case 'social': return '👥';
      default: return '🎮';
    }
  };

  return (
    <div 
      className="absolute inset-0 bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl cursor-grab active:cursor-grabbing select-none"
      style={style}
    >
      <div className="h-full flex flex-col p-6">
        {/* Game Header */}
        <div className="text-center mb-4">
          <div className="text-6xl mb-2">{game.emoji}</div>
          <h3 className="text-xl font-bold text-white mb-1">{game.name}</h3>
          <p className="text-gray-400 text-sm">{game.description}</p>
        </div>

        {/* Game Stats */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">👥 Players</span>
            <span className="text-orange-400 font-medium">
              {game.players.min === game.players.max 
                ? game.players.min 
                : `${game.players.min}-${game.players.max}`}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">⏱️ Duration</span>
            <span className="text-orange-400 font-medium">{game.duration} min</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">🎯 Items</span>
            <span className="text-orange-400 font-medium text-right">
              {game.items.join(', ')}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">📊 Difficulty</span>
            <span className={`font-medium capitalize ${getDifficultyColor(game.difficulty)}`}>
              {game.difficulty}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">🏷️ Type</span>
            <span className="text-orange-400 font-medium flex items-center space-x-1">
              <span>{getCategoryEmoji(game.category)}</span>
              <span className="capitalize">{game.category}</span>
            </span>
          </div>
        </div>

        {/* Swipe Instructions */}
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => onSwipe('left')}
            className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
          >
            <span className="text-xl">👎</span>
          </button>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">Swipe or tap</p>
            <p className="text-xs text-gray-500">👎 Pass • Like 👍</p>
          </div>
          
          <button
            onClick={() => onSwipe('right')}
            className="w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors"
          >
            <span className="text-xl">👍</span>
          </button>
        </div>
      </div>
    </div>
  );
}