import { Game, GameFinderInputs, GameMatch } from '../types';

export const POPULAR_ITEMS = [
  'cards', 'paper', 'pen', 'dice', 'coins', 'phone', 'music', 'blindfold',
  'timer', 'bottle', 'chairs', 'ball', 'rope', 'tape', 'markers', 'cups',
  'balloons', 'string', 'scissors', 'spoons', 'beans', 'cotton balls',
  'ice cubes', 'candy', 'chocolate', 'drinks', 'snacks', 'magazine',
  'newspaper', 'plastic bags', 'rubber bands', 'clothespins', 'nothing'
];

export const GAMES: Game[] = [
  {
    id: 'charades',
    name: 'Charades',
    emoji: '🎭',
    players: { min: 3, max: 20 },
    duration: 30,
    items: ['nothing'],
    description: 'Act out words without speaking',
    difficulty: 'easy',
    category: 'physical',
    instructions: 'One person acts out a word or phrase while others guess. No talking allowed! Use gestures, facial expressions, and body language to convey your message.'
  },
  {
    id: 'two-truths-lie',
    name: 'Two Truths & a Lie',
    emoji: '🤥',
    players: { min: 3, max: 15 },
    duration: 20,
    items: ['nothing'],
    description: 'Guess which statement is false',
    difficulty: 'easy',
    category: 'social',
    instructions: 'Each player tells three statements about themselves - two true, one false. Others vote on which they think is the lie. Great for getting to know each other!'
  },
  {
    id: 'card-poker',
    name: 'Poker',
    emoji: '🃏',
    players: { min: 2, max: 8 },
    duration: 60,
    items: ['cards'],
    description: 'Classic card betting game',
    difficulty: 'medium',
    category: 'mental',
    instructions: 'Deal 5 cards to each player. Bet based on your hand strength. Best poker hand wins the pot. Bluffing is key!'
  },
  {
    id: 'card-go-fish',
    name: 'Go Fish',
    emoji: '🐠',
    players: { min: 2, max: 6 },
    duration: 15,
    items: ['cards'],
    description: 'Collect sets by asking others',
    difficulty: 'easy',
    category: 'mental',
    instructions: 'Collect sets of 4 cards by asking other players. If they don\'t have what you need, they say "Go Fish!" and you draw from the deck.'
  },
  {
    id: 'paper-airplane',
    name: 'Paper Plane Contest',
    emoji: '✈️',
    players: { min: 2, max: 20 },
    duration: 15,
    items: ['paper'],
    description: 'Who can make the best flying plane',
    difficulty: 'easy',
    category: 'creative',
    instructions: 'Everyone makes paper airplanes. Test for distance, accuracy, or style. Award prizes for different categories!'
  },
  {
    id: 'story-chain',
    name: 'Story Chain',
    emoji: '📚',
    players: { min: 3, max: 12 },
    duration: 25,
    items: ['paper', 'pen'],
    description: 'Build a story together word by word',
    difficulty: 'easy',
    category: 'creative',
    instructions: 'Start with a sentence. Each person adds one word or sentence, then folds the paper to hide previous text. Read the hilarious result at the end!'
  },
  {
    id: 'dice-yahtzee',
    name: 'Yahtzee',
    emoji: '🎲',
    players: { min: 1, max: 6 },
    duration: 45,
    items: ['dice', 'paper', 'pen'],
    description: 'Roll combinations for points',
    difficulty: 'medium',
    category: 'mental',
    instructions: 'Roll 5 dice up to 3 times per turn. Score points by making combinations like full house, straight, or yahtzee (5 of a kind).'
  },
  {
    id: 'coin-flip-tournament',
    name: 'Coin Flip Tournament',
    emoji: '🪙',
    players: { min: 2, max: 16 },
    duration: 10,
    items: ['coins'],
    description: 'Elimination tournament of luck',
    difficulty: 'easy',
    category: 'mental',
    instructions: 'Pair up players. Each pair flips a coin - winner advances. Continue until one champion remains. Pure luck, maximum excitement!'
  },
  {
    id: 'phone-karaoke',
    name: 'Phone Karaoke',
    emoji: '🎤',
    players: { min: 2, max: 10 },
    duration: 30,
    items: ['phone', 'music'],
    description: 'Sing along to your favorite songs',
    difficulty: 'easy',
    category: 'social',
    instructions: 'Use your phone to play backing tracks or karaoke versions. Take turns performing solo or in groups. Bonus points for dramatic performances!'
  },
  {
    id: 'blind-drawing',
    name: 'Blind Drawing',
    emoji: '🎨',
    players: { min: 4, max: 12 },
    duration: 20,
    items: ['paper', 'pen', 'blindfold'],
    description: 'Draw while blindfolded, others guess',
    difficulty: 'medium',
    category: 'creative',
    instructions: 'One person draws blindfolded while others guess what it is. Set a time limit and award points for correct guesses and artistic merit!'
  },
  {
    id: 'musical-chairs',
    name: 'Musical Chairs',
    emoji: '🪑',
    players: { min: 3, max: 15 },
    duration: 15,
    items: ['chairs', 'music', 'phone'],
    description: 'Find a seat when music stops',
    difficulty: 'easy',
    category: 'physical',
    instructions: 'Set up chairs (one less than players). Walk around while music plays. When it stops, find a seat! Last person standing is out.'
  },
  {
    id: 'hot-potato',
    name: 'Hot Potato',
    emoji: '🥔',
    players: { min: 4, max: 20 },
    duration: 10,
    items: ['ball', 'music', 'timer'],
    description: 'Pass the object before time runs out',
    difficulty: 'easy',
    category: 'physical',
    instructions: 'Pass an object around the circle while music plays. When it stops, whoever holds the "hot potato" is out. Last person wins!'
  },
  {
    id: 'limbo',
    name: 'Limbo',
    emoji: '🕺',
    players: { min: 3, max: 20 },
    duration: 15,
    items: ['rope', 'music'],
    description: 'How low can you go?',
    difficulty: 'medium',
    category: 'physical',
    instructions: 'Hold a rope or stick horizontally. Players take turns going under without touching it or falling. Lower it after each round!'
  },
  {
    id: 'tape-sculpture',
    name: 'Tape Sculpture',
    emoji: '🗿',
    players: { min: 2, max: 8 },
    duration: 30,
    items: ['tape', 'paper'],
    description: 'Create art with just tape',
    difficulty: 'medium',
    category: 'creative',
    instructions: 'Using only tape and paper, create the most impressive sculpture. Set a time limit and vote on categories like "most creative" or "tallest".'
  },
  {
    id: 'cup-stacking',
    name: 'Speed Cup Stacking',
    emoji: '🥤',
    players: { min: 2, max: 8 },
    duration: 15,
    items: ['cups', 'timer'],
    description: 'Stack cups faster than others',
    difficulty: 'medium',
    category: 'physical',
    instructions: 'Race to stack cups in pyramids, then take them down. Time each attempt and crown the speed stacking champion!'
  },
  {
    id: 'balloon-keep-up',
    name: 'Balloon Keep Up',
    emoji: '🎈',
    players: { min: 2, max: 15 },
    duration: 10,
    items: ['balloons'],
    description: 'Don\'t let the balloon touch ground',
    difficulty: 'easy',
    category: 'physical',
    instructions: 'Keep balloons in the air using any part of your body except hands. Add more balloons to increase difficulty!'
  },
  {
    id: 'human-knot',
    name: 'Human Knot',
    emoji: '🤝',
    players: { min: 6, max: 12 },
    duration: 15,
    items: ['nothing'],
    description: 'Untangle without letting go of hands',
    difficulty: 'medium',
    category: 'physical',
    instructions: 'Stand in a circle, grab two different people\'s hands (not next to you). Now untangle into a circle without letting go!'
  },
  {
    id: 'twenty-questions',
    name: '20 Questions',
    emoji: '❓',
    players: { min: 2, max: 10 },
    duration: 15,
    items: ['nothing'],
    description: 'Guess the secret with yes/no questions',
    difficulty: 'easy',
    category: 'mental',
    instructions: 'One person thinks of something. Others ask yes/no questions to guess it in 20 questions or less. Great for car rides!'
  },
  {
    id: 'spoon-race',
    name: 'Spoon & Bean Race',
    emoji: '🥄',
    players: { min: 4, max: 12 },
    duration: 15,
    items: ['spoons', 'beans'],
    description: 'Balance beans on spoons while racing',
    difficulty: 'medium',
    category: 'physical',
    instructions: 'Race while balancing beans on spoons. If you drop it, go back to start! First to finish wins.'
  },
  {
    id: 'cotton-ball-challenge',
    name: 'Cotton Ball Challenge',
    emoji: '☁️',
    players: { min: 2, max: 8 },
    duration: 10,
    items: ['cotton balls', 'blindfold', 'spoons'],
    description: 'Transfer cotton balls while blindfolded',
    difficulty: 'hard',
    category: 'physical',
    instructions: 'Blindfolded, use a spoon to transfer cotton balls from one bowl to another. Harder than it sounds!'
  },
  {
    id: 'never-have-i-ever',
    name: 'Never Have I Ever',
    emoji: '🙋',
    players: { min: 3, max: 15 },
    duration: 25,
    items: ['nothing'],
    description: 'Learn secrets through elimination',
    difficulty: 'easy',
    category: 'social',
    instructions: 'Take turns saying "Never have I ever..." followed by something you\'ve never done. Those who have done it must sit down or lose a point!'
  },
  {
    id: 'word-association',
    name: 'Word Association',
    emoji: '💭',
    players: { min: 2, max: 12 },
    duration: 15,
    items: ['nothing'],
    description: 'Say words that connect to previous',
    difficulty: 'easy',
    category: 'mental',
    instructions: 'First person says a word. Next person says a related word. Keep the chain going! If you hesitate too long or repeat, you\'re out.'
  }
];

export function findGames(inputs: GameFinderInputs): GameMatch[] {
  const { players, duration, items } = inputs;
  const itemList = items.toLowerCase().split(',').map(item => item.trim()).filter(item => item);
  
  const matches: GameMatch[] = [];
  
  for (const game of GAMES) {
    let score = 0;
    const reasons: string[] = [];
    
    // Player count matching (most important)
    if (players >= game.players.min && players <= game.players.max) {
      score += 50;
      reasons.push('Perfect player count');
    } else if (players < game.players.min) {
      const diff = game.players.min - players;
      if (diff <= 2) {
        score += 20;
        reasons.push('Close to min players');
      }
    } else if (players > game.players.max) {
      const diff = players - game.players.max;
      if (diff <= 3) {
        score += 25;
        reasons.push('Slightly over max players');
      }
    }
    
    // Duration matching
    if (duration >= game.duration) {
      score += 30;
      reasons.push('Fits time limit');
    } else {
      const ratio = duration / game.duration;
      if (ratio > 0.7) {
        score += 15;
        reasons.push('Close to time limit');
      }
    }
    
    // Items matching
    if (items.trim() === '' || items.toLowerCase().includes('nothing')) {
      if (game.items.includes('nothing')) {
        score += 25;
        reasons.push('No items needed');
      }
    } else {
      const gameItemsLower = game.items.map(item => item.toLowerCase());
      const hasAllItems = game.items.every(gameItem => 
        gameItem === 'nothing' || 
        itemList.some(userItem => 
          gameItem.toLowerCase().includes(userItem) || 
          userItem.includes(gameItem.toLowerCase())
        )
      );
      
      if (hasAllItems) {
        score += 25;
        reasons.push('All items available');
      } else {
        const partialMatch = gameItemsLower.some(gameItem =>
          itemList.some(userItem => 
            gameItem.includes(userItem) || userItem.includes(gameItem)
          )
        );
        if (partialMatch) {
          score += 10;
          reasons.push('Some items match');
        }
      }
    }
    
    // Bonus for popular games
    if (['charades', 'two-truths-lie', 'twenty-questions', 'never-have-i-ever'].includes(game.id)) {
      score += 5;
    }
    
    if (score > 0) {
      matches.push({ game, score, reasons });
    }
  }
  
  return matches.sort((a, b) => b.score - a.score);
}