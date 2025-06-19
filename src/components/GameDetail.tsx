import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Game } from '../types';

interface GameDetailProps {
  game: Game;
  onBack: () => void;
}

export default function GameDetail({ game, onBack }: GameDetailProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'hard': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
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
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors mr-4 shadow-lg hover:shadow-xl"
            aria-label="Go back to results"
          >
            <ArrowLeft size={20} className="text-orange-400" />
          </button>
          <h1 className="text-xl font-bold text-orange-400">Game Details</h1>
        </div>

        {/* Game Card */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 mb-6 shadow-xl">
          {/* Game Header */}
          <div className="text-center mb-6">
            <div className="text-8xl mb-3" role="img" aria-label={game.name}>
              {game.emoji}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{game.name}</h2>
            <p className="text-gray-400">{game.description}</p>
          </div>

          {/* Game Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-700/50 rounded-lg p-3 text-center shadow-md">
              <div className="text-2xl mb-1" role="img" aria-label="Players">👥</div>
              <div className="text-xs text-gray-400 mb-1">Players</div>
              <div className="text-orange-400 font-semibold">
                {game.players.min === game.players.max 
                  ? game.players.min 
                  : `${game.players.min}-${game.players.max}`}
              </div>
            </div>
            
            <div className="bg-gray-700/50 rounded-lg p-3 text-center shadow-md">
              <div className="text-2xl mb-1" role="img" aria-label="Duration">⏱️</div>
              <div className="text-xs text-gray-400 mb-1">Duration</div>
              <div className="text-orange-400 font-semibold">{game.duration} min</div>
            </div>
            
            <div className="bg-gray-700/50 rounded-lg p-3 text-center shadow-md">
              <div className="text-2xl mb-1" role="img" aria-label="Difficulty">📊</div>
              <div className="text-xs text-gray-400 mb-1">Difficulty</div>
              <div className={`px-2 py-1 rounded text-xs font-semibold capitalize shadow-sm ${getDifficultyColor(game.difficulty)}`}>
                {game.difficulty}
              </div>
            </div>
            
            <div className="bg-gray-700/50 rounded-lg p-3 text-center shadow-md">
              <div className="text-2xl mb-1" role="img" aria-label={`${game.category} category`}>
                {getCategoryEmoji(game.category)}
              </div>
              <div className="text-xs text-gray-400 mb-1">Type</div>
              <div className="text-orange-400 font-semibold capitalize">{game.category}</div>
            </div>
          </div>

          {/* Items Needed */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-300 mb-2 flex items-center">
              <span className="mr-2" role="img" aria-label="Items needed">🎯</span>
              Items Needed
            </h3>
            <div className="flex flex-wrap gap-2">
              {game.items.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-600/20 text-orange-400 rounded-full text-sm shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Instructions */}
          {game.instructions && (
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center">
                <span className="mr-2" role="img" aria-label="Instructions">📋</span>
                How to Play
              </h3>
              <div className="bg-gray-700/30 rounded-lg p-4 shadow-inner">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {game.instructions}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}