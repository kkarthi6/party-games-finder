import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Play, Heart, RotateCcw } from 'lucide-react';
import { GameFinderInputs, Game, SwipeAction } from '../types';
import { findGames, POPULAR_ITEMS } from '../utils/gameDatabase';
import SwipeCard from './SwipeCard';
import GameDetail from './GameDetail';

export default function GameFinder() {
  const [inputs, setInputs] = useState<GameFinderInputs>({
    players: 4,
    duration: 30,
    items: '',
    nsfwMode: false,
    drinkingMode: false
  });
  
  const [showItemSuggestions, setShowItemSuggestions] = useState(false);
  const [currentView, setCurrentView] = useState<'input' | 'swipe' | 'results' | 'detail'>('input');
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [swipeActions, setSwipeActions] = useState<SwipeAction[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const gameMatches = useMemo(() => findGames(inputs), [inputs]);
  const likedGames = useMemo(() => {
    const likedIds = swipeActions.filter(action => action.action === 'like').map(action => action.gameId);
    return gameMatches.filter(match => likedIds.includes(match.game.id));
  }, [swipeActions, gameMatches]);

  const handlePlayersInputChange = (value: string) => {
    const num = parseInt(value) || 1;
    setInputs(prev => ({
      ...prev,
      players: Math.max(1, Math.min(20, num))
    }));
  };

  const handleDurationInputChange = (value: string) => {
    const num = parseInt(value) || 5;
    setInputs(prev => ({
      ...prev,
      duration: Math.max(5, Math.min(120, num))
    }));
  };

  const handleItemsChange = (value: string) => {
    setInputs(prev => ({ ...prev, items: value }));
  };

  const handleNSFWToggle = () => {
    setInputs(prev => ({ ...prev, nsfwMode: !prev.nsfwMode }));
  };

  const handleDrinkingToggle = () => {
    setInputs(prev => ({ ...prev, drinkingMode: !prev.drinkingMode }));
  };

  const handleItemSuggestionClick = (item: string) => {
    const currentItems = inputs.items.split(',').map(i => i.trim()).filter(i => i);
    if (!currentItems.includes(item)) {
      const newItems = currentItems.length > 0 ? `${inputs.items}, ${item}` : item;
      handleItemsChange(newItems);
    }
    setShowItemSuggestions(false);
  };

  const handleStartSwiping = () => {
    setCurrentView('swipe');
    setCurrentGameIndex(0);
    setSwipeActions([]);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentGameIndex >= gameMatches.length) return;

    const currentGame = gameMatches[currentGameIndex];
    const action: SwipeAction = {
      gameId: currentGame.game.id,
      action: direction === 'right' ? 'like' : 'pass'
    };

    setSwipeActions(prev => [...prev, action]);
    
    if (currentGameIndex + 1 >= gameMatches.length) {
      // Finished swiping through all games
      setTimeout(() => setCurrentView('results'), 300);
    } else {
      setCurrentGameIndex(prev => prev + 1);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (Math.abs(dragOffset.x) > 100) {
      handleSwipe(dragOffset.x > 0 ? 'right' : 'left');
    }
    
    setDragOffset({ x: 0, y: 0 });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStart.x;
    const deltaY = touch.clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (Math.abs(dragOffset.x) > 100) {
      handleSwipe(dragOffset.x > 0 ? 'right' : 'left');
    }
    
    setDragOffset({ x: 0, y: 0 });
  };

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
    setCurrentView('detail');
  };

  const handleBackToResults = () => {
    setSelectedGame(null);
    setCurrentView('results');
  };

  const handleRestart = () => {
    setCurrentView('input');
    setCurrentGameIndex(0);
    setSwipeActions([]);
    setSelectedGame(null);
  };

  const filteredSuggestions = POPULAR_ITEMS.filter(item =>
    item.toLowerCase().includes(inputs.items.toLowerCase()) &&
    !inputs.items.split(',').map(i => i.trim()).includes(item)
  ).slice(0, 6);

  if (currentView === 'detail' && selectedGame) {
    return <GameDetail game={selectedGame} onBack={handleBackToResults} />;
  }

  if (currentView === 'results') {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-4 flex items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-4">
              <Heart className="text-red-500" size={20} />
              <span className="text-gray-400">Your Liked Games</span>
            </div>
          </div>

          {likedGames.length > 0 ? (
            <div className="space-y-3 mb-6">
              {likedGames.map((match) => (
                <button
                  key={match.game.id}
                  onClick={() => handleGameClick(match.game)}
                  className="w-full bg-gray-800 hover:bg-gray-700 rounded-lg p-4 border border-gray-700 transition-colors text-left"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{match.game.emoji}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{match.game.name}</h3>
                      <p className="text-sm text-gray-400">{match.game.description}</p>
                      <div className="text-xs text-gray-500 mt-1">
                        👥 {match.game.players.min}-{match.game.players.max} • 
                        ⏱️ {match.game.duration}min
                      </div>
                    </div>
                    <Heart className="text-red-500" size={16} fill="currentColor" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-6 text-center mb-6">
              <div className="text-4xl mb-3">💔</div>
              <p className="text-gray-300 mb-2">No games liked</p>
              <p className="text-sm text-gray-500">Try adjusting your preferences</p>
            </div>
          )}

          <button
            onClick={handleRestart}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <RotateCcw size={18} />
            <span>Start Over</span>
          </button>
        </div>
      </div>
    );
  }

  if (currentView === 'swipe') {
    const currentGame = gameMatches[currentGameIndex];
    const progress = ((currentGameIndex + 1) / gameMatches.length) * 100;

    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-4 flex flex-col">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              {currentGameIndex + 1} of {gameMatches.length}
            </span>
            <span className="text-sm text-orange-400">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Swipe Area */}
        <div className="flex-1 relative max-w-sm mx-auto w-full">
          {currentGame && (
            <div
              ref={cardRef}
              className="relative h-full"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <SwipeCard
                game={currentGame.game}
                onSwipe={handleSwipe}
                style={{
                  transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.1}deg)`,
                  opacity: Math.abs(dragOffset.x) > 50 ? 0.8 : 1,
                  transition: isDragging ? 'none' : 'all 0.3s ease-out'
                }}
              />
              
              {/* Swipe Indicators */}
              {Math.abs(dragOffset.x) > 50 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className={`text-6xl ${dragOffset.x > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {dragOffset.x > 0 ? '👍' : '👎'}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        {/* Players and Time Inputs - Side by Side */}
        <div className="grid grid-cols-2 gap-3">
          {/* Players Input */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">👥</span>
              <input
                type="number"
                value={inputs.players}
                onChange={(e) => handlePlayersInputChange(e.target.value)}
                min="1"
                max="20"
                className="flex-1 text-lg font-semibold text-orange-400 bg-gray-700 text-center rounded-lg border border-gray-600 focus:border-orange-400 focus:outline-none py-2 px-2"
              />
            </div>
          </div>

          {/* Duration Input */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🕐</span>
              <input
                type="number"
                value={inputs.duration}
                onChange={(e) => handleDurationInputChange(e.target.value)}
                min="5"
                max="120"
                className="flex-1 text-lg font-semibold text-orange-400 bg-gray-700 text-center rounded-lg border border-gray-600 focus:border-orange-400 focus:outline-none py-2 px-2"
              />
            </div>
          </div>
        </div>

        {/* Toggle Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {/* NSFW Mode Toggle */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🔞</span>
              <button
                onClick={handleNSFWToggle}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  inputs.nsfwMode
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                NSFW
              </button>
            </div>
          </div>

          {/* Drinking Mode Toggle */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🍺</span>
              <button
                onClick={handleDrinkingToggle}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  inputs.drinkingMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Drinking
              </button>
            </div>
          </div>
        </div>

        {/* Items Input */}
        <div className="bg-gray-800 rounded-lg p-4 relative">
          <div className="flex items-center space-x-4">
            <span className="text-3xl">📋</span>
            <input
              type="text"
              value={inputs.items}
              onChange={(e) => handleItemsChange(e.target.value)}
              onFocus={() => setShowItemSuggestions(true)}
              onBlur={() => setTimeout(() => setShowItemSuggestions(false), 200)}
              placeholder="cards, paper, nothing..."
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
            />
          </div>
          
          {showItemSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10 max-h-32 overflow-y-auto">
              {filteredSuggestions.map((item) => (
                <button
                  key={item}
                  onClick={() => handleItemSuggestionClick(item)}
                  className="w-full text-center px-3 py-2 hover:bg-gray-600 transition-colors text-2xl"
                >
                  {getItemEmoji(item)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Play Button */}
        <div className="flex justify-center">
          <button
            onClick={handleStartSwiping}
            disabled={gameMatches.length === 0}
            className="w-16 h-16 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors"
          >
            <Play size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

function getItemEmoji(item: string): string {
  const emojiMap: { [key: string]: string } = {
    'cards': '🃏',
    'paper': '📄',
    'pen': '✏️',
    'dice': '🎲',
    'coins': '🪙',
    'phone': '📱',
    'music': '🎵',
    'blindfold': '👁️',
    'timer': '⏰',
    'bottle': '🍼',
    'chairs': '🪑',
    'ball': '⚽',
    'rope': '🪢',
    'tape': '📼',
    'markers': '🖊️',
    'cups': '🥤',
    'balloons': '🎈',
    'string': '🧵',
    'scissors': '✂️',
    'spoons': '🥄',
    'beans': '🫘',
    'cotton balls': '☁️',
    'ice cubes': '🧊',
    'candy': '🍬',
    'chocolate': '🍫',
    'drinks': '🥤',
    'snacks': '🍿',
    'magazine': '📖',
    'newspaper': '📰',
    'plastic bags': '🛍️',
    'rubber bands': '🔗',
    'clothespins': '📎',
    'nothing': '🚫'
  };
  
  return emojiMap[item] || '🎯';
}