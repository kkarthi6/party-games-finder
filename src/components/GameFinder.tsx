import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Play, Heart, RotateCcw, Settings, X } from 'lucide-react';
import { GameFinderInputs, Game, SwipeAction } from '../types';
import { findGames, POPULAR_ITEMS, VIBE_OPTIONS } from '../utils/gameDatabase';
import SwipeCard from './SwipeCard';
import GameDetail from './GameDetail';

export default function GameFinder() {
  const [inputs, setInputs] = useState<GameFinderInputs>({
    players: 4,
    duration: 30,
    items: '',
    nsfwMode: false,
    drinkingMode: false,
    vibe: ''
  });
  
  // Separate display values for inputs to allow empty states
  const [playersDisplay, setPlayersDisplay] = useState('4');
  const [durationDisplay, setDurationDisplay] = useState('30');
  
  const [showItemSuggestions, setShowItemSuggestions] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
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
    setPlayersDisplay(value);
    
    if (value === '') {
      // Allow empty state temporarily
      return;
    }
    
    const num = parseInt(value);
    if (!isNaN(num)) {
      const validatedNum = Math.max(1, Math.min(20, num));
      setInputs(prev => ({ ...prev, players: validatedNum }));
    }
  };

  const handlePlayersBlur = () => {
    if (playersDisplay === '' || isNaN(parseInt(playersDisplay))) {
      // Reset to default if empty or invalid
      setPlayersDisplay('4');
      setInputs(prev => ({ ...prev, players: 4 }));
    } else {
      // Validate and adjust to nearest valid value
      const num = parseInt(playersDisplay);
      const validatedNum = Math.max(1, Math.min(20, num));
      setPlayersDisplay(validatedNum.toString());
      setInputs(prev => ({ ...prev, players: validatedNum }));
    }
  };

  const handleDurationInputChange = (value: string) => {
    setDurationDisplay(value);
    
    if (value === '') {
      // Allow empty state temporarily
      return;
    }
    
    const num = parseInt(value);
    if (!isNaN(num)) {
      const validatedNum = Math.max(5, Math.min(120, num));
      setInputs(prev => ({ ...prev, duration: validatedNum }));
    }
  };

  const handleDurationBlur = () => {
    if (durationDisplay === '' || isNaN(parseInt(durationDisplay))) {
      // Reset to default if empty or invalid
      setDurationDisplay('30');
      setInputs(prev => ({ ...prev, duration: 30 }));
    } else {
      // Validate and adjust to nearest valid value
      const num = parseInt(durationDisplay);
      const validatedNum = Math.max(5, Math.min(120, num));
      setDurationDisplay(validatedNum.toString());
      setInputs(prev => ({ ...prev, duration: validatedNum }));
    }
  };

  const handleItemsChange = (value: string) => {
    setInputs(prev => ({ ...prev, items: value }));
  };

  const handleVibeChange = (value: string) => {
    setInputs(prev => ({ ...prev, vibe: value }));
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
                  className="w-full bg-gray-800 hover:bg-gray-700 rounded-lg p-4 border border-gray-700 transition-colors text-left shadow-lg hover:shadow-xl"
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
            <div className="bg-gray-800 rounded-lg p-6 text-center mb-6 shadow-lg">
              <div className="text-4xl mb-3">💔</div>
              <p className="text-gray-300 mb-2">No games liked</p>
              <p className="text-sm text-gray-500">Try adjusting your preferences</p>
            </div>
          )}

          <button
            onClick={handleRestart}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors shadow-lg hover:shadow-xl"
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
          <div className="w-full bg-gray-800 rounded-full h-2 shadow-inner">
            <div 
              className="bg-orange-600 h-2 rounded-full transition-all duration-300 shadow-sm"
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
    <div className="min-h-screen bg-gray-900 text-gray-100 p-3 flex items-center justify-center">
      <div className="w-full max-w-xs space-y-3">
        {/* Settings Button - Top Center */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg"
          >
            <Settings size={16} className="text-gray-400" />
          </button>
        </div>

        {/* Settings Menu */}
        {showSettings && (
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white">Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="w-6 h-6 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors shadow-sm"
              >
                <X size={12} className="text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-2">
              {/* NSFW Mode Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">🔞</span>
                  <span className="text-xs text-gray-300">NSFW</span>
                </div>
                <button
                  onClick={handleNSFWToggle}
                  className={`w-8 h-4 rounded-full transition-all shadow-inner ${
                    inputs.nsfwMode ? 'bg-red-600' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full transition-transform shadow-sm ${
                    inputs.nsfwMode ? 'translate-x-4' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              {/* Drinking Mode Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">🍺</span>
                  <span className="text-xs text-gray-300">Drinking</span>
                </div>
                <button
                  onClick={handleDrinkingToggle}
                  className={`w-8 h-4 rounded-full transition-all shadow-inner ${
                    inputs.drinkingMode ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full transition-transform shadow-sm ${
                    inputs.drinkingMode ? 'translate-x-4' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Players and Time Inputs - Side by Side */}
        <div className="grid grid-cols-2 gap-2">
          {/* Players Input */}
          <div className="bg-gray-800 rounded-lg p-3 shadow-md">
            <div className="flex items-center space-x-2">
              <span className="text-lg">👥</span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={playersDisplay}
                onChange={(e) => handlePlayersInputChange(e.target.value)}
                onBlur={handlePlayersBlur}
                onFocus={(e) => e.target.select()}
                placeholder="1-20"
                className="flex-1 text-sm font-semibold text-orange-400 bg-gray-700 text-center rounded border border-gray-600 focus:border-orange-400 focus:outline-none py-1 px-1 shadow-inner"
              />
            </div>
          </div>

          {/* Duration Input */}
          <div className="bg-gray-800 rounded-lg p-3 shadow-md">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🕐</span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={durationDisplay}
                onChange={(e) => handleDurationInputChange(e.target.value)}
                onBlur={handleDurationBlur}
                onFocus={(e) => e.target.select()}
                placeholder="5-120"
                className="flex-1 text-sm font-semibold text-orange-400 bg-gray-700 text-center rounded border border-gray-600 focus:border-orange-400 focus:outline-none py-1 px-1 shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* Items and Vibe Inputs - Side by Side */}
        <div className="grid grid-cols-2 gap-2 relative">
          {/* Items Input */}
          <div className="bg-gray-800 rounded-lg p-3 shadow-md">
            <div className="flex items-center space-x-2">
              <span className="text-lg flex-shrink-0">📋</span>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputs.items}
                  onChange={(e) => handleItemsChange(e.target.value)}
                  onFocus={() => setShowItemSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowItemSuggestions(false), 200)}
                  placeholder="cards..."
                  className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 text-xs shadow-inner"
                />
                
                {showItemSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded shadow-xl z-50 max-h-24 overflow-y-auto">
                    {filteredSuggestions.map((item) => (
                      <button
                        key={item}
                        onClick={() => handleItemSuggestionClick(item)}
                        className="w-full text-left px-2 py-1 hover:bg-gray-600 transition-colors text-xs text-gray-200"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Vibe Dropdown */}
          <div className="bg-gray-800 rounded-lg p-3 shadow-md">
            <div className="flex items-center space-x-2">
              <span className="text-lg flex-shrink-0">✨</span>
              <select
                value={inputs.vibe}
                onChange={(e) => handleVibeChange(e.target.value)}
                className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-gray-100 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 text-xs shadow-inner"
              >
                {VIBE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Play Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={handleStartSwiping}
            disabled={gameMatches.length === 0}
            className="w-12 h-12 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl disabled:shadow-md"
          >
            <Play size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}