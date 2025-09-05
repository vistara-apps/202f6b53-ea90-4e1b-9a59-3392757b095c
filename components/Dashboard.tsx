'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { FrameContainer } from './FrameContainer';
import { SimulationControls } from './SimulationControls';
import { TradeEntryForm } from './TradeEntryForm';
import { MarketDataDisplay } from './MarketDataDisplay';
import { formatCurrency, formatTimeRemaining, generatePriceMovement } from '@/lib/utils';
import { MOCK_MARKET_DATA, SESSION_CONFIGS } from '@/lib/constants';
import { Trade, TradeSession, MarketData } from '@/lib/types';

export function Dashboard() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentSession, setCurrentSession] = useState<TradeSession | null>(null);
  const [virtualBalance, setVirtualBalance] = useState(10000);
  const [selectedAsset, setSelectedAsset] = useState('BTC');
  const [marketData, setMarketData] = useState<Record<string, MarketData>>(MOCK_MARKET_DATA);
  const [trades, setTrades] = useState<Trade[]>([]);

  // Simulate real-time price updates
  useEffect(() => {
    if (!isSessionActive) return;

    const interval = setInterval(() => {
      setMarketData(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(symbol => {
          const current = updated[symbol];
          const newPrice = generatePriceMovement(current.price, 0.01);
          const change = newPrice - current.price;
          const changePercent = (change / current.price) * 100;
          
          updated[symbol] = {
            ...current,
            price: newPrice,
            change: change,
            changePercent: changePercent,
            timestamp: new Date(),
          };
        });
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isSessionActive]);

  const startSession = () => {
    const sessionConfig = SESSION_CONFIGS.practice;
    const newSession: TradeSession = {
      sessionId: `session_${Date.now()}`,
      userId: 'demo_user',
      startTime: new Date(),
      virtualCurrencyStart: sessionConfig.startingBalance,
      tradesExecuted: [],
      status: 'active',
      sessionType: 'practice',
    };

    setCurrentSession(newSession);
    setVirtualBalance(sessionConfig.startingBalance);
    setIsSessionActive(true);
    setTrades([]);
  };

  const pauseSession = () => {
    setIsSessionActive(false);
    if (currentSession) {
      setCurrentSession({
        ...currentSession,
        status: 'paused',
      });
    }
  };

  const resetSession = () => {
    setIsSessionActive(false);
    setCurrentSession(null);
    setVirtualBalance(10000);
    setTrades([]);
  };

  const handleTrade = (tradeData: Partial<Trade>) => {
    if (!currentSession || !tradeData.quantity || !tradeData.price) return;

    const newTrade: Trade = {
      tradeId: `trade_${Date.now()}`,
      sessionId: currentSession.sessionId,
      timestamp: new Date(),
      asset: selectedAsset,
      type: tradeData.type || 'buy',
      quantity: tradeData.quantity,
      price: tradeData.price,
      profitLoss: 0, // Will be calculated when position is closed
      entryReason: tradeData.entryReason || '',
      status: 'open',
    };

    const totalCost = newTrade.quantity * newTrade.price;
    
    if (newTrade.type === 'buy') {
      setVirtualBalance(prev => prev - totalCost);
    } else {
      setVirtualBalance(prev => prev + totalCost);
    }

    setTrades(prev => [...prev, newTrade]);
  };

  const sessionEndTime = currentSession 
    ? new Date(currentSession.startTime.getTime() + 15 * 60 * 1000)
    : null;

  return (
    <div className="space-y-6">
      {/* Session Status */}
      <FrameContainer variant={isSessionActive ? 'bordered' : 'default'}>
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gradient">
            Flash Trading Simulator
          </h2>
          
          {isSessionActive && sessionEndTime ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 text-green-400">
                <Clock className="w-4 h-4" />
                <span className="font-medium">
                  Time Remaining: {formatTimeRemaining(sessionEndTime)}
                </span>
              </div>
              <div className="text-sm text-gray-400">
                Practice Session Active
              </div>
            </div>
          ) : (
            <p className="text-gray-300">
              Start a practice session to begin trading with virtual currency
            </p>
          )}

          <div className="flex justify-center">
            {!isSessionActive ? (
              <SimulationControls
                variant="play"
                onPlay={startSession}
                isPlaying={isSessionActive}
              />
            ) : (
              <div className="flex space-x-2">
                <SimulationControls
                  variant="pause"
                  onPause={pauseSession}
                  isPlaying={isSessionActive}
                />
                <SimulationControls
                  variant="reset"
                  onReset={resetSession}
                />
              </div>
            )}
          </div>
        </div>
      </FrameContainer>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-2 gap-4">
        <div className="metric-card text-center">
          <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <div className="text-sm text-gray-400">Virtual Balance</div>
          <div className="text-xl font-bold text-green-400">
            {formatCurrency(virtualBalance)}
          </div>
        </div>
        
        <div className="metric-card text-center">
          <TrendingUp className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <div className="text-sm text-gray-400">Active Trades</div>
          <div className="text-xl font-bold text-blue-400">
            {trades.filter(t => t.status === 'open').length}
          </div>
        </div>
      </div>

      {/* Asset Selection */}
      <div className="glass-card p-4">
        <h3 className="text-lg font-semibold mb-3">Select Asset</h3>
        <div className="grid grid-cols-3 gap-2">
          {Object.keys(marketData).map((symbol) => (
            <button
              key={symbol}
              onClick={() => setSelectedAsset(symbol)}
              className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedAsset === symbol
                  ? 'bg-blue-500 bg-opacity-30 text-blue-400 border border-blue-500'
                  : 'bg-white bg-opacity-5 text-gray-300 hover:bg-opacity-10'
              }`}
            >
              {symbol}
            </button>
          ))}
        </div>
      </div>

      {/* Market Data */}
      <MarketDataDisplay
        variant="ticker"
        data={marketData[selectedAsset]}
        symbol={selectedAsset}
      />

      {/* Trading Interface */}
      {isSessionActive && (
        <div className="grid grid-cols-1 gap-4">
          <TradeEntryForm
            variant="buy"
            onSubmit={handleTrade}
            currentPrice={marketData[selectedAsset].price}
            availableBalance={virtualBalance}
          />
        </div>
      )}

      {/* Recent Trades */}
      {trades.length > 0 && (
        <div className="glass-card p-4">
          <h3 className="text-lg font-semibold mb-3">Recent Trades</h3>
          <div className="space-y-2">
            {trades.slice(-3).reverse().map((trade) => (
              <div key={trade.tradeId} className="flex justify-between items-center p-2 bg-white bg-opacity-5 rounded">
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${
                    trade.type === 'buy' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {trade.type.toUpperCase()}
                  </span>
                  <span className="text-sm">{trade.asset}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {trade.quantity} @ {formatCurrency(trade.price)}
                  </div>
                  <div className="text-xs text-gray-400">
                    {trade.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
