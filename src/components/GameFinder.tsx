import React, { useState, useMemo, useRef, useCallback } from 'react';
import { Play, Heart, RotateCcw, Settings, X, Home, Lightbulb, LogOut, User as UserIcon } from 'lucide-react';
import { GameFinderInputs, Game, SwipeAction, User } from '../types';
import { findGames, getSuggestions, VIBE_OPTIONS } from '../utils/gameDatabase';
import SwipeCard from './SwipeCard';
import GameDetail from './GameDetail';

interface GameFinderProps {
  user: User;
  onLogout: () => void;
}

export default function GameFinder({ user, onLogout }: GameFinderProps) {
  const [inputs, setInputs] = useState<GameFinderInputs>({
    players: 4,
    duration: 30,
    nsfwMode: false,
    drinkingMode: false,
    vibe: ''
  });
  
  const [playersDisplay, setPlayersDisplay] = useState('4');
  const [durationDisplay, setDurationDisplay] = useState('30');
  const [showSettings, setShowSettings] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentView, setCurrentView] = useState<'input' | 'swipe' | 'results' | 'detail'>('input');
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [swipeActions, setSwipeActions] = useState<SwipeAction[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const gameMatches = useMemo(() => {
    try {
      return findGames(inputs);
    } catch (error) {
      console.error('Error finding games:', error);
      return [];
    }
  }, [inputs]);

  const suggestions = useMemo(() => {
    try {
      return getSuggestions(inputs);
    } catch (error) {
      console.error('Error getting suggestions:', error);
      return [];
    }
  }, [inputs]);

  const likedGames = useMemo(() => {
    const likedIds = swipeActions.filter(action => action.action === 'like').map(action => action.gameId);
    return gameMatches.filter(match => likedIds.includes(match.game.id));
  }, [swipeActions, gameMatches]);

  const validateAndSetPlayers = useCallback((value: string) => {
    if (value === '') return;
    
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      const validatedNum = Math.max(1, Math.min(20, num));
      setInputs(prev => ({ ...prev, players: validatedNum }));
    }
  }, []);

  const validateAndSetDuration = useCallback((value: string) => {
    if (value === '') return;
    
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      const validatedNum = Math.max(5, Math.min(120, num));
      setInputs(prev => ({ ...prev, duration: validatedNum }));
    }
  }, []);

  const handlePlayersInputChange = useCallback((value: string) => {
    setPlayersDisplay(value);
    validateAndSetPlayers(value);
  }, [validateAndSetPlayers]);

  const handlePlayersBlur = useCallback(() => {
    if (playersDisplay === '' || isNaN(parseInt(playersDisplay, 10))) {
      setPlayersDisplay('4');
      setInputs(prev => ({ ...prev, players: 4 }));
    } else {
      const num = parseInt(playersDisplay, 10);
      const validatedNum = Math.max(1, Math.min(20, num));
      setPlayersDisplay(validatedNum.toString());
      setInputs(prev => ({ ...prev, players: validatedNum }));
    }
  }, [playersDisplay]);

  const handleDurationInputChange = useCallback((value: string) => {
    setDurationDisplay(value);
    validateAndSetDuration(value);
  }, [validateAndSetDuration]);

  const handleDurationBlur = useCallback(() => {
    if (durationDisplay === '' || isNaN(parseInt(durationDisplay, 10))) {
      setDurationDisplay('30');
      setInputs(prev => ({ ...prev, duration: 30 }));
    } else {
      const num = parseInt(durationDisplay, 10);
      const validatedNum = Math.max(5, Math.min(120, num));
      setDurationDisplay(validatedNum.toString());
      setInputs(prev => ({ ...prev, duration: validatedNum }));
    }
  }, [durationDisplay]);

  const handleVibeChange = useCallback((value: string) => {
    setInputs(prev => ({ ...prev, vibe: value }));
  }, []);

  const handleNSFWToggle = useCallback(() => {
    setInputs(prev => ({ ...prev, nsfwMode: !prev.nsfwMode }));
  }, []);

  const handleDrinkingToggle = useCallback(() => {
    setInputs(prev => ({ ...prev, drinkingMode: !prev.drinkingMode }));
  }, []);

  const handleStartSwiping = useCallback(async () => {
    if (gameMatches.length === 0) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      setCurrentView('swipe');
      setCurrentGameIndex(0);
      setSwipeActions([]);
    } finally {
      setIsLoading(false);
    }
  }, [gameMatches.length]);

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    if (currentGameIndex >= gameMatches.length) return;

    const currentGame = gameMatches[currentGameIndex];
    const action: SwipeAction = {
      gameId: currentGame.game.id,
      action: direction === 'right' ? 'like' : 'pass'
    };

    setSwipeActions(prev => [...prev, action]);
    
    if (currentGameIndex + 1 >= gameMatches.length) {
      setTimeout(() => setCurrentView('results'), 300);
    } else {
      setCurrentGameIndex(prev => prev + 1);
    }
  }, [currentGameIndex, gameMatches]);

  const resetDragState = useCallback(() => {
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    
    if (Math.abs(dragOffset.x) > 100) {
      handleSwipe(dragOffset.x > 0 ? 'right' : 'left');
    }
    
    resetDragState();
  }, [isDragging, dragOffset.x, handleSwipe, resetDragState]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    if (!touch) return;
    
    const deltaX = touch.clientX - dragStart.x;
    const deltaY = touch.clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  }, [isDragging, dragStart]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    
    if (Math.abs(dragOffset.x) > 100) {
      handleSwipe(dragOffset.x > 0 ? 'right' : 'left');
    }
    
    resetDragState();
  }, [isDragging, dragOffset.x, handleSwipe, resetDragState]);

  const handleGameClick = useCallback((game: Game) => {
    setSelectedGame(game);
    setCurrentView('detail');
  }, []);

  const handleBackToResults = useCallback(() => {
    setSelectedGame(null);
    setCurrentView('results');
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentView('input');
    setCurrentGameIndex(0);
    setSwipeActions([]);
    setSelectedGame(null);
  }, []);

  const handleGoHome = useCallback(() => {
    setCurrentView('input');
    setCurrentGameIndex(0);
    setSwipeActions([]);
    setSelectedGame(null);
  }, []);

  if (currentView === 'detail' && selectedGame) {
    return <GameDetail game={selectedGame} onBack={handleBackToResults} />;
  }

  if (currentView === 'results') {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-4 flex items-center justify-center">
        <div className="w-full max-w-sm mx-auto">
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
                  className="w-full bg-gray-800 hover:bg-gray-700 rounded-lg p-4 border border-gray-700 transition-all duration-200 text-left shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
                  aria-label={`View details for ${match.game.name}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl flex-shrink-0" role="img" aria-label={match.game.name}>
                      {match.game.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">{match.game.name}</h3>
                      <p className="text-sm text-gray-400 line-clamp-2">{match.game.description}</p>
                      <div className="text-xs text-gray-500 mt-1">
                        👥 {match.game.players.min}-{match.game.players.max} • 
                        ⏱️ {match.game.duration}min
                      </div>
                    </div>
                    <Heart className="text-red-500 flex-shrink-0" size={16} fill="currentColor" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-6 text-center mb-6 shadow-lg">
              <div className="text-4xl mb-3" role="img" aria-label="No games liked">💔</div>
              <p className="text-gray-300 mb-2">No games liked</p>
              <p className="text-sm text-gray-500">Try adjusting your preferences</p>
            </div>
          )}

          <button
            onClick={handleRestart}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
            aria-label="Start over with new preferences"
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
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={handleGoHome}
              className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
              aria-label="Go home"
            >
              <Home size={20} className="text-orange-400" />
            </button>
            
            <div className="text-center">
              <span className="text-sm text-gray-400">
                {currentGameIndex + 1} of {gameMatches.length}
              </span>
            </div>
            
            <div className="w-10 h-10 flex items-center justify-center">
              <span className="text-sm text-orange-400 font-medium">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          
          <div className="w-full bg-gray-800 rounded-full h-2 shadow-inner">
            <div 
              className="bg-orange-600 h-2 rounded-full transition-all duration-300 shadow-sm"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progress: ${Math.round(progress)}% complete`}
            />
          </div>
        </div>

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
              
              {Math.abs(dragOffset.x) > 50 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className={`text-6xl ${dragOffset.x > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    <span role="img" aria-label={dragOffset.x > 0 ? 'Like' : 'Dislike'}>
                      {dragOffset.x > 0 ? '👍' : '👎'}
                    </span>
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
      <div className="w-full max-w-xs mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
            aria-label={`${showSettings ? 'Close' : 'Open'} settings`}
            aria-expanded={showSettings}
          >
            <Settings size={18} className="text-gray-400" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 rounded-full px-3 py-2 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
              aria-label="User menu"
            >
              {user.picture ? (
                <img 
                  src={user.picture} 
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <UserIcon size={16} className="text-gray-400" />
              )}
              <span className="text-sm text-gray-300 truncate max-w-20">{user.name}</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 min-w-48">
                <div className="p-3 border-b border-gray-700">
                  <div className="flex items-center space-x-3 mb-2">
                    {user.picture ? (
                      <img 
                        src={user.picture} 
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                        <UserIcon size={16} className="text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                  </div>
                  {user.authMethod && (
                    <div className="flex items-center space-x-1">
                      {user.authMethod === 'google' ? (
                        <svg className="w-3 h-3" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                      ) : (
                        <Mail size={12} className="text-gray-400" />
                      )}
                      <span className="text-xs text-gray-500 capitalize">
                        {user.authMethod === 'google' ? 'Google' : 'Email'}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-200"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {showSettings && (
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="w-6 h-6 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
                aria-label="Close settings"
              >
                <X size={12} className="text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg" role="img" aria-label="NSFW">🔞</span>
                  <span className="text-sm text-gray-300">NSFW Mode</span>
                </div>
                <button
                  onClick={handleNSFWToggle}
                  className={`w-10 h-5 rounded-full transition-all duration-200 shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 ${
                    inputs.nsfwMode ? 'bg-red-600' : 'bg-gray-600'
                  }`}
                  aria-label={`NSFW mode ${inputs.nsfwMode ? 'enabled' : 'disabled'}`}
                  aria-pressed={inputs.nsfwMode}
                  role="switch"
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm ${
                    inputs.nsfwMode ? 'translate-x-5' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg" role="img" aria-label="Drinking">🍺</span>
                  <span className="text-sm text-gray-300">Drinking Mode</span>
                </div>
                <button
                  onClick={handleDrinkingToggle}
                  className={`w-10 h-5 rounded-full transition-all duration-200 shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 ${
                    inputs.drinkingMode ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                  aria-label={`Drinking mode ${inputs.drinkingMode ? 'enabled' : 'disabled'}`}
                  aria-pressed={inputs.drinkingMode}
                  role="switch"
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm ${
                    inputs.drinkingMode ? 'translate-x-5' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-4 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-12 flex-shrink-0">
              <span className="text-2xl" role="img" aria-label="Players">👥</span>
            </div>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={playersDisplay}
              onChange={(e) => handlePlayersInputChange(e.target.value)}
              onBlur={handlePlayersBlur}
              onFocus={(e) => e.target.select()}
              placeholder="1-20"
              className="flex-1 h-12 text-lg font-semibold text-orange-400 bg-gray-700 text-center rounded border border-gray-600 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 px-3 shadow-inner transition-all duration-200"
              aria-label="Number of players (1-20)"
              min="1"
              max="20"
            />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-12 flex-shrink-0">
              <span className="text-2xl" role="img" aria-label="Duration">🕐</span>
            </div>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={durationDisplay}
              onChange={(e) => handleDurationInputChange(e.target.value)}
              onBlur={handleDurationBlur}
              onFocus={(e) => e.target.select()}
              placeholder="5-120"
              className="flex-1 h-12 text-lg font-semibold text-orange-400 bg-gray-700 text-center rounded border border-gray-600 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 px-3 shadow-inner transition-all duration-200"
              aria-label="Duration in minutes (5-120)"
              min="5"
              max="120"
            />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-12 flex-shrink-0">
              <span className="text-2xl" role="img" aria-label="Vibe">✨</span>
            </div>
            <select
              value={inputs.vibe}
              onChange={(e) => handleVibeChange(e.target.value)}
              className="flex-1 h-12 bg-gray-700 border border-gray-600 rounded px-3 text-gray-100 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 text-sm shadow-inner transition-all duration-200"
              aria-label="Game vibe"
            >
              {VIBE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {gameMatches.length === 0 && suggestions.length > 0 && (
          <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb size={16} className="text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-400">Suggestions</span>
            </div>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <p key={index} className="text-xs text-yellow-200 leading-relaxed">
                  • {suggestion}
                </p>
              ))}
            </div>
          </div>
        )}

        {gameMatches.length > 0 && (
          <div className="text-center">
            <span className="text-sm text-gray-400">
              {gameMatches.length} game{gameMatches.length !== 1 ? 's' : ''} found
            </span>
          </div>
        )}

        <div className="flex justify-center pt-2">
          <button
            onClick={handleStartSwiping}
            disabled={gameMatches.length === 0 || isLoading}
            className="w-16 h-16 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
            aria-label="Start swiping through games"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play size={24} />
            )}
          </button>
        </div>

        {gameMatches.length === 0 && (
          <div className="text-center">
            <div className="text-4xl mb-2" role="img" aria-label="No games">🎮</div>
            <p className="text-gray-400 text-sm">No games match your criteria</p>
            <p className="text-gray-500 text-xs mt-1">Try the suggestions above</p>
          </div>
        )}
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
}