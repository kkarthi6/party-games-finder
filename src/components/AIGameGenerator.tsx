import React, { useState, useCallback } from 'react';
import { Sparkles, ArrowLeft, Wand2, Send, Loader2 } from 'lucide-react';
import { geminiService, GameGenerationInputs } from '../utils/geminiService';
import { Game } from '../types';
import GameDetail from './GameDetail';

interface AIGameGeneratorProps {
  onBack: () => void;
  initialPlayers: number;
  initialDuration: number;
}

export default function AIGameGenerator({ onBack, initialPlayers, initialDuration }: AIGameGeneratorProps) {
  const [inputs, setInputs] = useState<GameGenerationInputs>({
    players: initialPlayers,
    duration: initialDuration,
    theme: '',
    mood: '',
    setting: '',
    specialRequests: ''
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedGame, setGeneratedGame] = useState<Game | null>(null);
  const [error, setError] = useState<string>('');

  const themes = [
    { value: '', label: 'Any Theme' },
    { value: 'adventure', label: '🗺️ Adventure' },
    { value: 'mystery', label: '🔍 Mystery' },
    { value: 'comedy', label: '😂 Comedy' },
    { value: 'fantasy', label: '🧙 Fantasy' },
    { value: 'sci-fi', label: '🚀 Sci-Fi' },
    { value: 'horror', label: '👻 Horror' },
    { value: 'romance', label: '💕 Romance' },
    { value: 'pirate', label: '🏴‍☠️ Pirate' },
    { value: 'superhero', label: '🦸 Superhero' },
    { value: 'medieval', label: '⚔️ Medieval' },
    { value: 'detective', label: '🕵️ Detective' },
    { value: 'space', label: '🌌 Space' },
    { value: 'magic', label: '✨ Magic' }
  ];

  const moods = [
    { value: '', label: 'Any Mood' },
    { value: 'hilarious', label: '😂 Hilarious' },
    { value: 'competitive', label: '🏆 Competitive' },
    { value: 'relaxing', label: '😌 Relaxing' },
    { value: 'energetic', label: '⚡ Energetic' },
    { value: 'intimate', label: '💕 Intimate' },
    { value: 'strategic', label: '🧠 Strategic' },
    { value: 'silly', label: '🤪 Silly' },
    { value: 'dramatic', label: '🎭 Dramatic' }
  ];

  const settings = [
    { value: '', label: 'Any Setting' },
    { value: 'living room', label: '🏠 Living Room' },
    { value: 'backyard', label: '🌳 Backyard' },
    { value: 'beach', label: '🏖️ Beach' },
    { value: 'camping', label: '🏕️ Camping' },
    { value: 'party', label: '🎉 Party' },
    { value: 'restaurant', label: '🍽️ Restaurant' },
    { value: 'car', label: '🚗 Car/Travel' },
    { value: 'office', label: '🏢 Office' }
  ];

  const handleInputChange = useCallback((field: keyof GameGenerationInputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setError('');
  }, []);

  const handleGenerate = useCallback(async () => {
    if (inputs.players <= 0 || inputs.duration <= 0) {
      setError('Please enter valid numbers for players and duration');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const game = await geminiService.generateGame(inputs);
      setGeneratedGame(game);
    } catch (err) {
      setError('Failed to generate game. Please try again.');
      console.error('Game generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  }, [inputs]);

  const handleBackToGenerator = useCallback(() => {
    setGeneratedGame(null);
  }, []);

  if (generatedGame) {
    return <GameDetail game={generatedGame} onBack={handleBackToGenerator} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-200 mr-4 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="text-purple-400" />
          </button>
          <div className="flex items-center space-x-2">
            <Wand2 size={24} className="text-purple-400" />
            <h1 className="text-xl font-bold text-purple-400">AI Game Generator</h1>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl border border-purple-500/30 p-6 mb-6 shadow-xl">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
              <Sparkles size={32} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Create Your Perfect Game</h2>
            <p className="text-gray-300 text-sm">Tell me what you're looking for and I'll create a unique game just for you!</p>
          </div>

          <div className="space-y-4">
            {/* Players and Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Players</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={inputs.players}
                  onChange={(e) => handleInputChange('players', parseInt(e.target.value) || 1)}
                  className="w-full h-12 bg-gray-700/50 border border-gray-600 rounded-lg px-3 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Minutes</label>
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={inputs.duration}
                  onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 5)}
                  className="w-full h-12 bg-gray-700/50 border border-gray-600 rounded-lg px-3 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Theme */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
              <select
                value={inputs.theme}
                onChange={(e) => handleInputChange('theme', e.target.value)}
                className="w-full h-12 bg-gray-700/50 border border-gray-600 rounded-lg px-3 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 transition-all duration-200"
              >
                {themes.map((theme) => (
                  <option key={theme.value} value={theme.value}>
                    {theme.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Mood */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Mood</label>
              <select
                value={inputs.mood}
                onChange={(e) => handleInputChange('mood', e.target.value)}
                className="w-full h-12 bg-gray-700/50 border border-gray-600 rounded-lg px-3 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 transition-all duration-200"
              >
                {moods.map((mood) => (
                  <option key={mood.value} value={mood.value}>
                    {mood.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Setting */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Setting</label>
              <select
                value={inputs.setting}
                onChange={(e) => handleInputChange('setting', e.target.value)}
                className="w-full h-12 bg-gray-700/50 border border-gray-600 rounded-lg px-3 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 transition-all duration-200"
              >
                {settings.map((setting) => (
                  <option key={setting.value} value={setting.value}>
                    {setting.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Special Requests</label>
              <textarea
                value={inputs.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                placeholder="Any specific requirements? (e.g., 'no physical activity', 'include drawing', 'team-based')"
                className="w-full h-20 bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 transition-all duration-200 resize-none"
                maxLength={200}
              />
              <div className="text-xs text-gray-500 mt-1">
                {inputs.specialRequests?.length || 0}/200 characters
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-3 transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Creating Your Game...</span>
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  <span>Generate Game</span>
                  <Send size={16} />
                </>
              )}
            </button>

            {/* Demo Notice */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Wand2 size={16} className="text-blue-400" />
                <span className="text-sm font-medium text-blue-400">AI Demo Mode</span>
              </div>
              <p className="text-xs text-blue-300">
                Currently running in demo mode. In production, this would use Google Gemini AI to generate truly unique games based on your inputs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}