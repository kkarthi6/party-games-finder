import { GoogleGenerativeAI } from '@google/generative-ai';
import { Game } from '../types';

// Demo API key - In production, use environment variables
const GEMINI_API_KEY = 'your-gemini-api-key-here';

export interface GameGenerationInputs {
  players: number;
  duration: number;
  theme?: string;
  mood?: string;
  setting?: string;
  specialRequests?: string;
}

export class GeminiGameService {
  private static instance: GeminiGameService;
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  static getInstance(): GeminiGameService {
    if (!GeminiGameService.instance) {
      GeminiGameService.instance = new GeminiGameService();
    }
    return GeminiGameService.instance;
  }

  private initialize() {
    if (!this.genAI) {
      // For demo purposes, we'll simulate the API
      // In production, uncomment the line below and use your actual API key
      // this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      // this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    }
  }

  async generateGame(inputs: GameGenerationInputs): Promise<Game> {
    this.initialize();

    // For demo purposes, we'll generate a mock game
    // In production, replace this with actual Gemini API call
    return this.generateDemoGame(inputs);
  }

  private async generateDemoGame(inputs: GameGenerationInputs): Promise<Game> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const themes = ['adventure', 'mystery', 'comedy', 'fantasy', 'sci-fi', 'horror', 'romance'];
    const categories: Array<'physical' | 'mental' | 'creative' | 'social'> = ['physical', 'mental', 'creative', 'social'];
    const difficulties: Array<'easy' | 'medium' | 'hard'> = ['easy', 'medium', 'hard'];
    const vibes: Array<'competitive' | 'relaxed' | 'energetic' | 'intimate' | 'silly' | 'strategic'> = 
      ['competitive', 'relaxed', 'energetic', 'intimate', 'silly', 'strategic'];

    const selectedTheme = inputs.theme || themes[Math.floor(Math.random() * themes.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    const vibe = vibes[Math.floor(Math.random() * vibes.length)];

    // Generate game based on inputs
    const gameTemplates = [
      {
        name: `${selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)} Quest`,
        emoji: this.getThemeEmoji(selectedTheme),
        description: `An exciting ${selectedTheme}-themed game where players embark on an epic journey together.`,
        instructions: `Players take turns drawing cards or rolling dice to advance through a ${selectedTheme} storyline. Work together to overcome challenges and reach the final destination. Each player has unique abilities that help the team succeed.`,
        items: ['cards', 'dice', 'paper', 'pen'],
        category: 'social' as const
      },
      {
        name: `${selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)} Charades`,
        emoji: '🎭',
        description: `Act out ${selectedTheme}-themed words and phrases in this creative twist on classic charades.`,
        instructions: `Write down ${selectedTheme}-related words, characters, or scenarios on paper. Players take turns acting them out while others guess. No talking allowed! Award points for correct guesses and creative performances.`,
        items: ['paper', 'pen', 'timer'],
        category: 'physical' as const
      },
      {
        name: `${selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)} Storytelling`,
        emoji: '📚',
        description: `Create collaborative stories with a ${selectedTheme} twist.`,
        instructions: `Start with a ${selectedTheme} setting. Each player adds one sentence to the story, then passes it to the next person. The story should build on the ${selectedTheme} theme. Read the final story aloud for laughs!`,
        items: ['paper', 'pen'],
        category: 'creative' as const
      },
      {
        name: `${selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)} Trivia`,
        emoji: '🧠',
        description: `Test your knowledge with ${selectedTheme}-themed questions and challenges.`,
        instructions: `Prepare questions related to ${selectedTheme}. Players take turns answering questions of increasing difficulty. Award points for correct answers. Include bonus rounds with physical or creative challenges.`,
        items: ['paper', 'pen'],
        category: 'mental' as const
      }
    ];

    const template = gameTemplates[Math.floor(Math.random() * gameTemplates.length)];

    // Adjust duration and player count based on inputs
    const adjustedDuration = Math.min(inputs.duration, Math.max(15, inputs.duration - 5));
    const minPlayers = Math.max(2, Math.min(inputs.players - 1, inputs.players));
    const maxPlayers = Math.max(inputs.players, inputs.players + 2);

    return {
      id: `ai-generated-${Date.now()}`,
      name: template.name,
      emoji: template.emoji,
      players: { min: minPlayers, max: maxPlayers },
      duration: adjustedDuration,
      items: template.items,
      description: template.description,
      difficulty,
      category: template.category,
      vibe,
      instructions: template.instructions
    };
  }

  private getThemeEmoji(theme: string): string {
    const emojiMap: Record<string, string> = {
      adventure: '🗺️',
      mystery: '🔍',
      comedy: '😂',
      fantasy: '🧙',
      'sci-fi': '🚀',
      horror: '👻',
      romance: '💕',
      pirate: '🏴‍☠️',
      space: '🌌',
      medieval: '⚔️',
      detective: '🕵️',
      superhero: '🦸',
      zombie: '🧟',
      magic: '✨',
      sports: '⚽',
      cooking: '👨‍🍳'
    };
    return emojiMap[theme] || '🎮';
  }

  // In production, use this method with actual Gemini API
  private async callGeminiAPI(inputs: GameGenerationInputs): Promise<Game> {
    if (!this.model) {
      throw new Error('Gemini model not initialized');
    }

    const prompt = `Create a unique party game with the following specifications:
    - Number of players: ${inputs.players}
    - Duration: ${inputs.duration} minutes
    - Theme: ${inputs.theme || 'any'}
    - Mood: ${inputs.mood || 'fun'}
    - Setting: ${inputs.setting || 'any'}
    - Special requests: ${inputs.specialRequests || 'none'}

    Please respond with a JSON object containing:
    - name: string (creative game name)
    - emoji: string (single emoji representing the game)
    - description: string (brief description)
    - instructions: string (detailed how-to-play instructions)
    - items: string[] (list of required items)
    - difficulty: "easy" | "medium" | "hard"
    - category: "physical" | "mental" | "creative" | "social"
    - vibe: "competitive" | "relaxed" | "energetic" | "intimate" | "silly" | "strategic"

    Make it creative, fun, and suitable for the specified group size and duration.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse the JSON response
      const gameData = JSON.parse(text);
      
      return {
        id: `ai-generated-${Date.now()}`,
        players: { min: Math.max(1, inputs.players - 1), max: inputs.players + 2 },
        duration: inputs.duration,
        ...gameData
      };
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error('Failed to generate game with AI');
    }
  }
}

export const geminiService = GeminiGameService.getInstance();