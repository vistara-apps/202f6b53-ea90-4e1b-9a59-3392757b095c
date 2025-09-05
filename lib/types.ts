// User Types
export interface User {
  userId: string; // Farcaster FID
  virtualBalance: number;
  sessionHistory: TradeSession[];
  tradeHistory: Trade[];
  completedModules: string[];
  purchasedSessions: number;
  createdAt: Date;
  updatedAt: Date;
}

// Trading Session Types
export interface TradeSession {
  sessionId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  virtualCurrencyStart: number;
  virtualCurrencyEnd?: number;
  tradesExecuted: Trade[];
  status: 'active' | 'completed' | 'paused';
  sessionType: 'practice' | 'tutorial' | 'challenge';
}

// Trade Types
export interface Trade {
  tradeId: string;
  sessionId: string;
  timestamp: Date;
  asset: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  profitLoss: number;
  entryReason: string;
  exitReason?: string;
  status: 'open' | 'closed';
}

// Skill Module Types
export interface SkillModule {
  moduleId: string;
  title: string;
  content: string;
  type: 'lesson' | 'quiz' | 'interactive';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  prerequisites: string[];
  completionRate: number;
}

// Market Data Types
export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high24h: number;
  low24h: number;
  timestamp: Date;
}

// Chart Data Types
export interface ChartDataPoint {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Component Props Types
export interface FrameContainerProps {
  children: React.ReactNode;
  variant?: 'default' | 'bordered';
  className?: string;
}

export interface SimulationControlsProps {
  variant: 'play' | 'pause' | 'reset';
  onPlay?: () => void;
  onPause?: () => void;
  onReset?: () => void;
  isPlaying?: boolean;
}

export interface TradeEntryFormProps {
  variant: 'buy' | 'sell';
  onSubmit: (trade: Partial<Trade>) => void;
  currentPrice: number;
  availableBalance: number;
}

export interface MarketDataDisplayProps {
  variant: 'ticker' | 'chart';
  data: MarketData | ChartDataPoint[];
  symbol: string;
}

export interface ModuleCardProps {
  module: SkillModule;
  variant: 'completed' | 'inProgress' | 'locked';
  onStart?: () => void;
}

export interface TradeReviewItemProps {
  trade: Trade;
  variant: 'win' | 'loss' | 'neutral';
  onClick?: () => void;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Session Management Types
export interface SessionConfig {
  duration: number; // in minutes
  startingBalance: number;
  allowedAssets: string[];
  maxPositionSize: number;
  riskLevel: 'low' | 'medium' | 'high';
}
