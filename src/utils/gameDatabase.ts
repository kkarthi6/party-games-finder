import { Game, GameFinderInputs, GameMatch } from '../types';

export const POPULAR_ITEMS = [
  'Cards', 'Paper', 'Pen', 'Dice', 'Coins', 'Phone', 'Music', 'Blindfold',
  'Timer', 'Bottle', 'Chairs', 'Ball', 'Rope', 'Tape', 'Markers', 'Cups',
  'Balloons', 'String', 'Scissors', 'Spoons', 'Beans', 'Cotton Balls',
  'Ice Cubes', 'Candy', 'Chocolate', 'Drinks', 'Snacks', 'Magazine',
  'Newspaper', 'Plastic Bags', 'Rubber Bands', 'Clothespins', 'Nothing'
];

export const VIBE_OPTIONS = [
  { value: '', label: 'Any Vibe' },
  { value: 'competitive', label: 'Competitive' },
  { value: 'relaxed', label: 'Relaxed' },
  { value: 'energetic', label: 'Energetic' },
  { value: 'intimate', label: 'Intimate' },
  { value: 'silly', label: 'Silly' },
  { value: 'strategic', label: 'Strategic' }
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
    vibe: 'silly',
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
    vibe: 'relaxed',
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
    vibe: 'competitive',
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
    vibe: 'relaxed',
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
    vibe: 'competitive',
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
    vibe: 'silly',
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
    vibe: 'strategic',
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
    vibe: 'competitive',
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
    vibe: 'energetic',
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
    vibe: 'silly',
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
    vibe: 'energetic',
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
    vibe: 'energetic',
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
    vibe: 'competitive',
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
    vibe: 'competitive',
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
    vibe: 'competitive',
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
    vibe: 'silly',
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
    vibe: 'silly',
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
    vibe: 'relaxed',
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
    vibe: 'competitive',
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
    vibe: 'silly',
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
    vibe: 'relaxed',
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
    vibe: 'relaxed',
    instructions: 'First person says a word. Next person says a related word. Keep the chain going! If you hesitate too long or repeat, you\'re out.'
  },
  // Drinking Games
  {
    id: 'beer-pong',
    name: 'Beer Pong',
    emoji: '🍺',
    players: { min: 4, max: 8 },
    duration: 30,
    items: ['cups', 'ball', 'drinks'],
    description: 'Throw balls into cups, opponents drink',
    difficulty: 'medium',
    category: 'physical',
    vibe: 'competitive',
    isDrinking: true,
    instructions: 'Set up cups in triangle formation. Take turns throwing ping pong balls into opponent\'s cups. When you make it, they drink and remove the cup!'
  },
  {
    id: 'kings-cup',
    name: 'Kings Cup',
    emoji: '👑',
    players: { min: 3, max: 10 },
    duration: 45,
    items: ['cards', 'drinks', 'cups'],
    description: 'Draw cards, follow the rules',
    difficulty: 'easy',
    category: 'social',
    vibe: 'energetic',
    isDrinking: true,
    instructions: 'Place cards around a cup. Draw cards and follow rules: Ace=waterfall, King=make a rule, Queen=questions, Jack=never have I ever, etc.'
  },
  {
    id: 'flip-cup',
    name: 'Flip Cup',
    emoji: '🥤',
    players: { min: 6, max: 16 },
    duration: 20,
    items: ['cups', 'drinks'],
    description: 'Team relay race with cup flipping',
    difficulty: 'medium',
    category: 'physical',
    vibe: 'competitive',
    isDrinking: true,
    instructions: 'Teams line up, drink from cup, then flip it upside down by flicking the rim. Next teammate goes when you succeed. First team to finish wins!'
  },
  {
    id: 'quarters',
    name: 'Quarters',
    emoji: '🪙',
    players: { min: 3, max: 8 },
    duration: 25,
    items: ['coins', 'cups', 'drinks'],
    description: 'Bounce quarters into cups',
    difficulty: 'medium',
    category: 'physical',
    vibe: 'competitive',
    isDrinking: true,
    instructions: 'Bounce a quarter off the table into a cup. If you make it, choose someone to drink. Miss and pass the quarter to the next player.'
  },
  {
    id: 'power-hour',
    name: 'Power Hour',
    emoji: '⏰',
    players: { min: 2, max: 20 },
    duration: 60,
    items: ['timer', 'drinks', 'music'],
    description: 'Drink every minute for an hour',
    difficulty: 'hard',
    category: 'social',
    vibe: 'energetic',
    isDrinking: true,
    instructions: 'Take a drink every minute for 60 minutes. Play music and change songs each minute to keep track. Pace yourself!'
  },
  {
    id: 'drunk-jenga',
    name: 'Drunk Jenga',
    emoji: '🧱',
    players: { min: 2, max: 8 },
    duration: 30,
    items: ['jenga', 'drinks', 'markers'],
    description: 'Jenga with drinking rules on blocks',
    difficulty: 'medium',
    category: 'physical',
    vibe: 'silly',
    isDrinking: true,
    instructions: 'Write rules on Jenga blocks. When you pull a block, follow its rule. Examples: "Take 2 drinks", "Everyone drinks", "Make a rule".'
  },
  // NSFW Games
  {
    id: 'truth-or-dare-adult',
    name: 'Adult Truth or Dare',
    emoji: '🔥',
    players: { min: 3, max: 12 },
    duration: 45,
    items: ['nothing'],
    description: 'Spicy version of the classic game',
    difficulty: 'medium',
    category: 'social',
    vibe: 'intimate',
    isNSFW: true,
    instructions: 'Take turns choosing truth or dare. Questions and dares get progressively more intimate and daring. Set boundaries beforehand!'
  },
  {
    id: 'strip-poker',
    name: 'Strip Poker',
    emoji: '🃏',
    players: { min: 3, max: 8 },
    duration: 60,
    items: ['cards'],
    description: 'Poker with clothing stakes',
    difficulty: 'medium',
    category: 'mental',
    vibe: 'competitive',
    isNSFW: true,
    instructions: 'Play poker, but instead of money, losers remove clothing items. Set clear boundaries and comfort levels before starting.'
  },
  {
    id: 'body-shots',
    name: 'Body Shots',
    emoji: '💋',
    players: { min: 2, max: 8 },
    duration: 20,
    items: ['drinks', 'salt'],
    description: 'Take shots off each other',
    difficulty: 'easy',
    category: 'physical',
    vibe: 'intimate',
    isNSFW: true,
    isDrinking: true,
    instructions: 'Take turns doing shots off each other\'s bodies. Use salt, lime, and tequila. Only with consenting adults!'
  },
  {
    id: 'spin-the-bottle-adult',
    name: 'Adult Spin the Bottle',
    emoji: '🍼',
    players: { min: 4, max: 12 },
    duration: 30,
    items: ['bottle'],
    description: 'Spin bottle for intimate challenges',
    difficulty: 'easy',
    category: 'social',
    vibe: 'intimate',
    isNSFW: true,
    instructions: 'Sit in a circle, spin bottle. When it points to someone, they get a challenge or dare. Make it as spicy as the group is comfortable with.'
  },
  {
    id: 'sexy-charades',
    name: 'Sexy Charades',
    emoji: '🎭',
    players: { min: 4, max: 12 },
    duration: 30,
    items: ['paper', 'pen'],
    description: 'Act out adult-themed words',
    difficulty: 'medium',
    category: 'physical',
    vibe: 'silly',
    isNSFW: true,
    instructions: 'Like regular charades but with adult themes and positions. Write down spicy words or scenarios to act out.'
  },
  {
    id: 'intimate-questions',
    name: 'Intimate Questions',
    emoji: '💕',
    players: { min: 2, max: 8 },
    duration: 40,
    items: ['paper', 'pen'],
    description: 'Deep personal and intimate questions',
    difficulty: 'easy',
    category: 'social',
    vibe: 'intimate',
    isNSFW: true,
    instructions: 'Take turns asking increasingly intimate questions. Great for couples or close friends wanting to learn more about each other.'
  }
];

export function findGames(inputs: GameFinderInputs): GameMatch[] {
  const { players, duration, items, nsfwMode, drinkingMode, vibe } = inputs;
  const itemList = items.toLowerCase().split(',').map(item => item.trim()).filter(item => item);
  
  const matches: GameMatch[] = [];
  
  for (const game of GAMES) {
    // Filter based on mode preferences
    if (game.isNSFW && !nsfwMode) continue;
    if (game.isDrinking && !drinkingMode) continue;
    
    let score = 0;
    const reasons: string[] = [];
    
    // Player count matching (highest priority - 40 points max)
    if (players >= game.players.min && players <= game.players.max) {
      score += 40;
      reasons.push('Perfect player count');
    } else {
      const minDiff = Math.abs(players - game.players.min);
      const maxDiff = Math.abs(players - game.players.max);
      const closestDiff = Math.min(minDiff, maxDiff);
      
      if (closestDiff <= 1) {
        score += 30;
        reasons.push('Very close to player count');
      } else if (closestDiff <= 2) {
        score += 20;
        reasons.push('Close to player count');
      } else if (closestDiff <= 3) {
        score += 10;
        reasons.push('Somewhat close to player count');
      }
    }
    
    // Duration matching (30 points max)
    const durationRatio = Math.min(duration, game.duration) / Math.max(duration, game.duration);
    if (duration >= game.duration) {
      score += 30;
      reasons.push('Fits perfectly in time');
    } else if (durationRatio >= 0.8) {
      score += 25;
      reasons.push('Almost fits in time');
    } else if (durationRatio >= 0.6) {
      score += 15;
      reasons.push('Might fit with quick play');
    } else if (durationRatio >= 0.4) {
      score += 5;
      reasons.push('Tight on time');
    }
    
    // Items matching (25 points max)
    if (items.trim() === '' || items.toLowerCase().includes('nothing')) {
      if (game.items.includes('nothing')) {
        score += 25;
        reasons.push('No items needed');
      } else if (game.items.length <= 2) {
        score += 15;
        reasons.push('Few items needed');
      } else {
        score += 5;
        reasons.push('Some items required');
      }
    } else {
      const gameItemsLower = game.items.map(item => item.toLowerCase());
      let itemMatchScore = 0;
      let matchedItems = 0;
      
      for (const gameItem of gameItemsLower) {
        if (gameItem === 'nothing') {
          itemMatchScore += 5;
          continue;
        }
        
        const hasItem = itemList.some(userItem => {
          const userItemLower = userItem.toLowerCase();
          const gameItemLower = gameItem.toLowerCase();
          return userItemLower.includes(gameItemLower) || 
                 gameItemLower.includes(userItemLower) ||
                 (userItemLower === 'cards' && gameItemLower === 'deck') ||
                 (userItemLower === 'deck' && gameItemLower === 'cards');
        });
        
        if (hasItem) {
          matchedItems++;
          itemMatchScore += 8;
        } else {
          itemMatchScore -= 3; // Penalty for missing items
        }
      }
      
      // Bonus for having all required items
      if (matchedItems === game.items.filter(item => item !== 'nothing').length) {
        itemMatchScore += 10;
        reasons.push('All items available');
      } else if (matchedItems > 0) {
        reasons.push(`${matchedItems}/${game.items.length} items available`);
      }
      
      score += Math.max(0, Math.min(25, itemMatchScore));
    }
    
    // Vibe matching (20 points max)
    if (vibe && game.vibe) {
      if (game.vibe === vibe) {
        score += 20;
        reasons.push('Perfect vibe match');
      } else {
        // Partial vibe compatibility
        const vibeCompatibility = getVibeCompatibility(vibe, game.vibe);
        score += vibeCompatibility;
        if (vibeCompatibility > 0) {
          reasons.push('Compatible vibe');
        }
      }
    } else if (!vibe) {
      score += 5; // Small bonus for no vibe preference
    }
    
    // Difficulty bonus based on group size (5 points max)
    if (players <= 4 && game.difficulty === 'easy') {
      score += 5;
      reasons.push('Good for small groups');
    } else if (players >= 8 && game.difficulty === 'easy') {
      score += 3;
      reasons.push('Easy for large groups');
    } else if (players >= 6 && players <= 10 && game.difficulty === 'medium') {
      score += 4;
      reasons.push('Good complexity for group size');
    }
    
    // Category bonuses based on context (5 points max)
    if (duration <= 15 && game.category === 'physical') {
      score += 3;
      reasons.push('Quick physical activity');
    } else if (duration >= 45 && game.category === 'mental') {
      score += 3;
      reasons.push('Good for longer sessions');
    } else if (players >= 10 && game.category === 'social') {
      score += 4;
      reasons.push('Great for large social groups');
    }
    
    // Popular game bonus (small boost)
    if (['charades', 'two-truths-lie', 'twenty-questions', 'never-have-i-ever'].includes(game.id)) {
      score += 2;
    }
    
    // Only include games with a reasonable score
    if (score >= 15) {
      matches.push({ game, score, reasons });
    }
  }
  
  return matches.sort((a, b) => b.score - a.score);
}

function getVibeCompatibility(userVibe: string, gameVibe: string): number {
  const compatibility: Record<string, Record<string, number>> = {
    'competitive': {
      'strategic': 8,
      'energetic': 6,
      'silly': 3
    },
    'relaxed': {
      'intimate': 8,
      'social': 6,
      'silly': 4
    },
    'energetic': {
      'competitive': 6,
      'silly': 8,
      'physical': 7
    },
    'intimate': {
      'relaxed': 8,
      'social': 5
    },
    'silly': {
      'energetic': 8,
      'relaxed': 4,
      'competitive': 3
    },
    'strategic': {
      'competitive': 8,
      'mental': 6
    }
  };
  
  return compatibility[userVibe]?.[gameVibe] || 0;
}