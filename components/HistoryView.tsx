'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { TradeReviewItem } from './TradeReviewItem';
import { FrameContainer } from './FrameContainer';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { Trade } from '@/lib/types';

// Mock trade history data
const mockTrades: Trade[] = [
  {
    tradeId: 'trade_1',
    sessionId: 'session_1',
    timestamp: new Date(Date.now() - 3600000),
    asset: 'BTC',
    type: 'buy',
    quantity: 0.1,
    price: 45000,
    profitLoss: 250,
    entryReason: 'Bullish breakout pattern',
    exitReason: 'Target reached',
    status: 'closed',
  },
  {
    tradeId: 'trade_2',
    sessionId: 'session_1',
    timestamp: new Date(Date.now() - 7200000),
    asset: 'ETH',
    type: 'sell',
    quantity: 2,
    price: 3200,
    profitLoss: -120,
    entryReason: 'Resistance level rejection',
    exitReason: 'Stop loss triggered',
    status: 'closed',
  },
  {
    tradeId: 'trade_3',
    sessionId: 'session_2',
    timestamp: new Date(Date.now() - 10800000),
    asset: 'SOL',
    type: 'buy',
    quantity: 10,
    price: 120,
    profitLoss: 85,
    entryReason: 'Support bounce',
    exitReason: 'Partial profit taking',
    status: 'closed',
  },
];

export function HistoryView() {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);

  const periods = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'all', label: 'All Time' },
  ];

  // Calculate statistics
  const totalTrades = mockTrades.length;
  const winningTrades = mockTrades.filter(t => t.profitLoss > 0).length;
  const losingTrades = mockTrades.filter(t => t.profitLoss < 0).length;
  const totalPnL = mockTrades.reduce((sum, trade) => sum + trade.profitLoss, 0);
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;

  const getTradeVariant = (trade: Trade) => {
    if (trade.profitLoss > 0) return 'win';
    if (trade.profitLoss < 0) return 'loss';
    return 'neutral';
  };

  const handleTradeClick = (trade: Trade) => {
    setSelectedTrade(trade);
  };

  if (selectedTrade) {
    return (
      <div className="space-y-6">
        <FrameContainer variant="bordered">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Trade Details</h2>
              <button
                onClick={() => setSelectedTrade(null)}
                className="btn-secondary text-sm"
              >
                Back
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="metric-card text-center">
                  <div className="text-sm text-gray-400">Asset</div>
                  <div className="text-lg font-bold">{selectedTrade.asset}</div>
                </div>
                <div className="metric-card text-center">
                  <div className="text-sm text-gray-400">Type</div>
                  <div className={`text-lg font-bold ${
                    selectedTrade.type === 'buy' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {selectedTrade.type.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="metric-card text-center">
                  <div className="text-sm text-gray-400">Quantity</div>
                  <div className="text-lg font-bold">{selectedTrade.quantity}</div>
                </div>
                <div className="metric-card text-center">
                  <div className="text-sm text-gray-400">Price</div>
                  <div className="text-lg font-bold">{formatCurrency(selectedTrade.price)}</div>
                </div>
              </div>

              <div className="metric-card text-center">
                <div className="text-sm text-gray-400">Profit/Loss</div>
                <div className={`text-2xl font-bold ${
                  selectedTrade.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {formatCurrency(selectedTrade.profitLoss)}
                </div>
              </div>

              <div className="space-y-3">
                <div className="glass-card p-3">
                  <div className="text-sm text-gray-400 mb-1">Entry Reason</div>
                  <div className="text-white">{selectedTrade.entryReason}</div>
                </div>
                
                {selectedTrade.exitReason && (
                  <div className="glass-card p-3">
                    <div className="text-sm text-gray-400 mb-1">Exit Reason</div>
                    <div className="text-white">{selectedTrade.exitReason}</div>
                  </div>
                )}
              </div>

              <div className="glass-card p-3">
                <div className="text-sm text-gray-400 mb-1">Timestamp</div>
                <div className="text-white">
                  {selectedTrade.timestamp.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </FrameContainer>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <FrameContainer>
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <BarChart3 className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold">Trading Performance</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                totalPnL >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {formatCurrency(totalPnL)}
              </div>
              <div className="text-sm text-gray-400">Total P&L</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {formatPercentage(winRate)}
              </div>
              <div className="text-sm text-gray-400">Win Rate</div>
            </div>
          </div>
        </div>
      </FrameContainer>

      {/* Statistics Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="metric-card text-center">
          <div className="text-lg font-bold text-white">{totalTrades}</div>
          <div className="text-xs text-gray-400">Total Trades</div>
        </div>
        <div className="metric-card text-center">
          <div className="text-lg font-bold text-green-400">{winningTrades}</div>
          <div className="text-xs text-gray-400">Wins</div>
        </div>
        <div className="metric-card text-center">
          <div className="text-lg font-bold text-red-400">{losingTrades}</div>
          <div className="text-xs text-gray-400">Losses</div>
        </div>
      </div>

      {/* Period Filter */}
      <div className="glass-card p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Calendar className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium">Time Period</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`p-2 rounded text-xs font-medium transition-all duration-200 ${
                selectedPeriod === period.id
                  ? 'bg-blue-500 bg-opacity-30 text-blue-400 border border-blue-500'
                  : 'bg-white bg-opacity-5 text-gray-300 hover:bg-opacity-10'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trade History */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Trade History</h3>
        
        {mockTrades.length > 0 ? (
          <div className="space-y-3">
            {mockTrades.map((trade) => (
              <TradeReviewItem
                key={trade.tradeId}
                trade={trade}
                variant={getTradeVariant(trade)}
                onClick={() => handleTradeClick(trade)}
              />
            ))}
          </div>
        ) : (
          <div className="glass-card p-6 text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-400">No trades yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Start a trading session to see your history here
            </p>
          </div>
        )}
      </div>

      {/* Performance Insights */}
      <div className="glass-card p-4">
        <h3 className="text-lg font-semibold mb-3">📊 Performance Insights</h3>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex justify-between">
            <span>Best Trade:</span>
            <span className="text-green-400">+{formatCurrency(250)}</span>
          </div>
          <div className="flex justify-between">
            <span>Worst Trade:</span>
            <span className="text-red-400">{formatCurrency(-120)}</span>
          </div>
          <div className="flex justify-between">
            <span>Average Trade:</span>
            <span className="text-blue-400">
              {formatCurrency(totalPnL / Math.max(totalTrades, 1))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
