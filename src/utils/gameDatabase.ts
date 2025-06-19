import { Game, GameFinderInputs, GameMatch } from '../types';

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
    id: 'solitaire',
    name: 'Solitaire',
    emoji: '🃏',
    players: { min: 1, max: 1 },
    duration: 15,
    items: ['cards'],
    description: 'Classic single-player card game',
    difficulty: 'easy',
    category: 'mental',
    vibe: 'relaxed',
    instructions: 'Arrange cards in sequences and suits. Move cards between columns to reveal hidden cards and build foundation piles from Ace to King.'
  },
  {
    id: 'sudoku',
    name: 'Sudoku',
    emoji: '🔢',
    players: { min: 1, max: 1 },
    duration: 25,
    items: ['paper', 'pen'],
    description: 'Fill the grid with numbers 1-9',
    difficulty: 'medium',
    category: 'mental',
    vibe: 'strategic',
    instructions: 'Fill a 9×9 grid so that each column, row, and 3×3 box contains all digits from 1 to 9. Use logic and deduction to solve!'
  },
  {
    id: 'crossword',
    name: 'Crossword Puzzle',
    emoji: '📝',
    players: { min: 1, max: 1 },
    duration: 30,
    items: ['paper', 'pen'],
    description: 'Fill in words from clues',
    difficulty: 'medium',
    category: 'mental',
    vibe: 'relaxed',
    instructions: 'Use the clues to fill in words horizontally and vertically. Letters intersect to help solve other words. Great brain exercise!'
  },
  {
    id: 'meditation',
    name: 'Guided Meditation',
    emoji: '🧘',
    players: { min: 1, max: 1 },
    duration: 20,
    items: ['phone'],
    description: 'Relax and center yourself',
    difficulty: 'easy',
    category: 'mental',
    vibe: 'relaxed',
    instructions: 'Find a quiet space, use a meditation app or video. Focus on breathing and let thoughts pass without judgment. Perfect for stress relief!'
  },
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
  const { players, duration, nsfwMode, drinkingMode, vibe } = inputs;
  
  // Input validation
  if (players <= 0 || duration <= 0) {
    return [];
  }
  
  const matches: GameMatch[] = [];
  
  for (const game of GAMES) {
    // CORE FILTERING LOGIC per technical specifications
    
    // 1. Mode filtering (STRICT)
    if (game.isNSFW && !nsfwMode) continue;
    if (game.isDrinking && !drinkingMode) continue;
    
    // 2. Player count filtering (STRICT - exact specification)
    // A game is relevant if and only if: game.min_players <= num_players <= game.max_players
    if (!(game.players.min <= players && players <= game.players.max)) continue;
    
    // 3. Duration filtering (STRICT - exact specification)
    // A game is relevant if and only if: game.duration_minutes <= duration_minutes
    if (game.duration > duration) continue;
    
    // 4. Vibe filtering (STRICT if specified)
    if (vibe && game.vibe && game.vibe !== vibe) continue;
    
    // SCORING SYSTEM for prioritization
    let score = 0;
    const reasons: string[] = [];
    
    // Duration scoring (50 points max) - prioritize games closest to max duration
    const durationDiff = Math.abs(game.duration - duration);
    const durationScore = Math.max(0, 50 - (durationDiff * 2));
    score += durationScore;
    
    if (game.duration === duration) {
      reasons.push('Perfect duration match');
    } else if (durationDiff <= 5) {
      reasons.push('Excellent duration fit');
    } else if (durationDiff <= 15) {
      reasons.push('Good duration fit');
    } else {
      reasons.push('Fits within time limit');
    }
    
    // Player count scoring (40 points max) - prioritize optimal player counts
    const playerRange = game.players.max - game.players.min + 1;
    const playerOptimal = Math.floor((game.players.min + game.players.max) / 2);
    
    if (players === playerOptimal) {
      score += 40; // Perfect sweet spot
      reasons.push('Optimal player count');
    } else {
      // Score based on how close to optimal
      const distanceFromOptimal = Math.abs(players - playerOptimal);
      const maxDistance = Math.max(playerOptimal - game.players.min, game.players.max - playerOptimal);
      const proximityScore = maxDistance > 0 ? 1 - (distanceFromOptimal / maxDistance) : 1;
      score += Math.floor(25 + (proximityScore * 15));
      
      if (players >= game.players.min && players <= game.players.max) {
        reasons.push('Good player fit');
      }
    }
    
    // Vibe scoring (10 points max)
    if (vibe && game.vibe === vibe) {
      score += 10;
      reasons.push('Perfect vibe match');
    } else if (!vibe) {
      score += 5; // Small bonus for no vibe restriction
    }
    
    // Quality bonuses (5 points max total)
    
    // Popular/well-known games bonus
    if (['charades', 'two-truths-lie', 'twenty-questions', 'never-have-i-ever', 'card-poker'].includes(game.id)) {
      score += 3;
      reasons.push('Popular game');
    }
    
    // Category bonuses based on group size
    if (players >= 8 && (game.category === 'social' || game.category === 'physical')) {
      score += 2;
      reasons.push('Great for large groups');
    } else if (players <= 3 && (game.category === 'mental' || game.category === 'creative')) {
      score += 2;
      reasons.push('Perfect for small groups');
    }
    
    matches.push({ game, score, reasons });
  }
  
  // Sort by score (highest first), then by duration proximity as tiebreaker
  return matches.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // Tiebreaker: prefer games closer to desired duration
    const aDurationDiff = Math.abs(a.game.duration - duration);
    const bDurationDiff = Math.abs(b.game.duration - duration);
    return aDurationDiff - bDurationDiff;
  });
}

export function getSuggestions(inputs: GameFinderInputs): string[] {
  const { players, duration, nsfwMode, drinkingMode, vibe } = inputs;
  const suggestions: string[] = [];
  
  // Input validation
  if (players <= 0 || duration <= 0) {
    suggestions.push("Please enter valid positive numbers for players and duration");
    return suggestions;
  }
  
  // Check what's limiting the results using the EXACT same logic as findGames
  const allGames = GAMES;
  
  // Step 1: Mode filtering
  const modeFilteredGames = allGames.filter(game => {
    if (game.isNSFW && !nsfwMode) return false;
    if (game.isDrinking && !drinkingMode) return false;
    return true;
  });
  
  // Step 2: Player filtering (EXACT specification)
  const playerFilteredGames = modeFilteredGames.filter(game => 
    game.players.min <= players && players <= game.players.max
  );
  
  // Step 3: Duration filtering (EXACT specification)
  const durationFilteredGames = playerFilteredGames.filter(game =>
    game.duration <= duration
  );
  
  // Step 4: Vibe filtering
  const vibeFilteredGames = durationFilteredGames.filter(game =>
    !vibe || !game.vibe || game.vibe === vibe
  );
  
  // Generate suggestions based on what's limiting results
  
  if (modeFilteredGames.length === 0) {
    suggestions.push("No games available - try enabling NSFW or Drinking modes");
    return suggestions;
  }
  
  if (playerFilteredGames.length === 0) {
    // Player count is the issue - find available ranges
    const availableRanges = modeFilteredGames.map(g => ({ min: g.players.min, max: g.players.max }));
    const gamesWithPlayerCounts = availableRanges.filter(r => r.min <= players || r.max >= players);
    
    if (gamesWithPlayerCounts.length === 0) {
      const minAvailable = Math.min(...availableRanges.map(r => r.min));
      const maxAvailable = Math.max(...availableRanges.map(r => r.max));
      
      if (players < minAvailable) {
        suggestions.push(`Try ${minAvailable}+ players - no games support ${players} player${players === 1 ? '' : 's'}`);
      } else if (players > maxAvailable) {
        suggestions.push(`Try ${maxAvailable} or fewer players - no games support ${players} players`);
      }
    } else {
      // Find nearby valid player counts
      const validCounts = new Set<number>();
      availableRanges.forEach(range => {
        for (let i = range.min; i <= range.max; i++) {
          if (Math.abs(i - players) <= 2) {
            validCounts.add(i);
          }
        }
      });
      
      if (validCounts.size > 0) {
        const sortedCounts = Array.from(validCounts).sort((a, b) => Math.abs(a - players) - Math.abs(b - players));
        suggestions.push(`Try ${sortedCounts.slice(0, 3).join(' or ')} players for available games`);
      }
    }
  } else if (durationFilteredGames.length === 0) {
    // Duration is the issue
    const availableDurations = playerFilteredGames.map(g => g.duration);
    const minDuration = Math.min(...availableDurations);
    
    suggestions.push(`Try ${minDuration}+ minutes - shortest available game is ${minDuration} minutes`);
    
    // Suggest some specific longer durations that would unlock more games
    const commonDurations = [30, 45, 60];
    const viableDurations = commonDurations.filter(d => d > duration && availableDurations.some(ad => ad <= d));
    if (viableDurations.length > 0) {
      suggestions.push(`Consider ${viableDurations[0]} minutes for more game options`);
    }
  } else if (vibeFilteredGames.length === 0) {
    // Vibe is too restrictive
    const availableVibes = new Set(durationFilteredGames.map(g => g.vibe).filter(Boolean));
    if (availableVibes.size > 0) {
      const vibeList = Array.from(availableVibes).slice(0, 3).join(', ');
      suggestions.push(`Try vibes: ${vibeList} - or select 'Any Vibe'`);
    } else {
      suggestions.push("Try 'Any Vibe' for more options");
    }
  } else if (vibeFilteredGames.length < 3) {
    // Few results - suggest expanding criteria
    if (duration < 30) {
      suggestions.push("Try 30+ minutes for more variety");
    }
    
    if (!nsfwMode && !drinkingMode) {
      suggestions.push("Enable special modes for more games");
    }
    
    if (vibe) {
      suggestions.push("Try 'Any Vibe' to see all available games");
    }
  }
  
  // Context-specific suggestions
  if (players === 1) {
    suggestions.push("Solo games: puzzles, card games, and meditation work great alone");
  } else if (players >= 10) {
    suggestions.push("Large groups: try party games and physical activities");
  }
  
  return suggestions.slice(0, 3); // Limit to 3 most relevant suggestions
}