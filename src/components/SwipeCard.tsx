import React from 'react';
import { Game } from '../types';

interface SwipeCardProps {
  game: Game;
  onSwipe: (direction: 'left' | 'right') => void;
  style?: React.CSSProperties;
}

export default function SwipeCard({ game, onSwipe, style }: SwipeCardProps) {
  return (
    <div 
      className="absolute inset-0 bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl cursor-grab active:cursor-grabbing select-none"
      style={style}
    >
      <div className="h-full flex flex-col p-6">
        {/* Game Header */}
        <div className="text-center mb-6">
          <div className="text-8xl mb-4">{game.emoji}</div>
          <h3 className="text-2xl font-bold text-white mb-3">{game.name}</h3>
          <p className="text-gray-300 text-base leading-relaxed mb-6">{game.description}</p>
        </div>

        {/* How to Play */}
        <div className="flex-1 mb-6">
          <h4 className="text-lg font-semibold text-orange-400 mb-3">How to Play</h4>
          <div className="bg-gray-700/30 rounded-lg p-4">
            <p className="text-gray-200 text-sm leading-relaxed">
              {game.instructions || 'Instructions not available for this game.'}
            </p>
          </div>
        </div>

        {/* Swipe Instructions */}
        <div className="flex justify-between items-center">
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