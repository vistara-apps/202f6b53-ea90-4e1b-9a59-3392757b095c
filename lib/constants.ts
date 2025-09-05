// Trading Constants
export const TRADING_ASSETS = [
  { symbol: 'BTC', name: 'Bitcoin', price: 45000 },
  { symbol: 'ETH', name: 'Ethereum', price: 3200 },
  { symbol: 'SOL', name: 'Solana', price: 120 },
  { symbol: 'MATIC', name: 'Polygon', price: 0.85 },
  { symbol: 'LINK', name: 'Chainlink', price: 15.50 },
];

export const SESSION_CONFIGS = {
  practice: {
    duration: 15,
    startingBalance: 10000,
    allowedAssets: TRADING_ASSETS.map(a => a.symbol),
    maxPositionSize: 0.1,
    riskLevel: 'medium' as const,
  },
  tutorial: {
    duration: 10,
    startingBalance: 5000,
    allowedAssets: ['BTC', 'ETH'],
    maxPositionSize: 0.05,
    riskLevel: 'low' as const,
  },
  challenge: {
    duration: 30,
    startingBalance: 25000,
    allowedAssets: TRADING_ASSETS.map(a => a.symbol),
    maxPositionSize: 0.2,
    riskLevel: 'high' as const,
  },
};

// Skill Modules
export const SKILL_MODULES = [
  {
    moduleId: 'basics-001',
    title: 'Flash Trading Fundamentals',
    content: 'Learn the basics of flash trading and market dynamics.',
    type: 'lesson' as const,
    difficulty: 'beginner' as const,
    estimatedTime: 5,
    prerequisites: [],
    completionRate: 0,
  },
  {
    moduleId: 'risk-001',
    title: 'Risk Management Essentials',
    content: 'Understanding position sizing and stop-loss strategies.',
    type: 'lesson' as const,
    difficulty: 'beginner' as const,
    estimatedTime: 8,
    prerequisites: ['basics-001'],
    completionRate: 0,
  },
  {
    moduleId: 'technical-001',
    title: 'Technical Analysis Basics',
    content: 'Reading charts and identifying trading opportunities.',
    type: 'interactive' as const,
    difficulty: 'intermediate' as const,
    estimatedTime: 12,
    prerequisites: ['basics-001', 'risk-001'],
    completionRate: 0,
  },
  {
    moduleId: 'psychology-001',
    title: 'Trading Psychology',
    content: 'Managing emotions and maintaining discipline.',
    type: 'lesson' as const,
    difficulty: 'intermediate' as const,
    estimatedTime: 10,
    prerequisites: ['basics-001'],
    completionRate: 0,
  },
  {
    moduleId: 'advanced-001',
    title: 'Advanced Flash Strategies',
    content: 'Complex trading strategies and market timing.',
    type: 'quiz' as const,
    difficulty: 'advanced' as const,
    estimatedTime: 15,
    prerequisites: ['technical-001', 'psychology-001'],
    completionRate: 0,
  },
];

// UI Constants
export const COLORS = {
  primary: 'hsl(240 74% 47%)',
  accent: 'hsl(204 99% 48%)',
  bg: 'hsl(210 40% 96%)',
  surface: 'hsl(0 0% 100%)',
  textPrimary: 'hsl(220 39% 14%)',
  textSecondary: 'hsl(220 65% 47%)',
};

export const ANIMATION_DURATIONS = {
  fast: 150,
  base: 250,
  slow: 400,
};

// Pricing
export const PRICING = {
  sessionPrice: 1, // $1 per 15-min session
  monthlySubscription: 15, // $15/month unlimited
  freeTrialSessions: 3,
};

// Mock Market Data for Simulation
export const MOCK_MARKET_DATA = {
  BTC: {
    symbol: 'BTC',
    price: 45000,
    change: 1250,
    changePercent: 2.85,
    volume: 28500000000,
    high24h: 46200,
    low24h: 43800,
    timestamp: new Date(),
  },
  ETH: {
    symbol: 'ETH',
    price: 3200,
    change: -85,
    changePercent: -2.59,
    volume: 15200000000,
    high24h: 3350,
    low24h: 3150,
    timestamp: new Date(),
  },
  SOL: {
    symbol: 'SOL',
    price: 120,
    change: 8.5,
    changePercent: 7.62,
    volume: 2100000000,
    high24h: 125,
    low24h: 110,
    timestamp: new Date(),
  },
};
