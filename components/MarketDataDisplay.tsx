'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { MarketDataDisplayProps, MarketData, ChartDataPoint } from '@/lib/types';
import { formatCurrency, formatPercentage, formatLargeNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function MarketDataDisplay({ variant, data, symbol }: MarketDataDisplayProps) {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    if (variant === 'chart' && Array.isArray(data)) {
      setChartData(data as ChartDataPoint[]);
    }
  }, [variant, data]);

  if (variant === 'ticker' && !Array.isArray(data)) {
    const marketData = data as MarketData;
    const isPositive = marketData.change >= 0;

    return (
      <div className="metric-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold">{symbol}</h3>
          </div>
          <div className={cn(
            'flex items-center space-x-1',
            isPositive ? 'text-green-400' : 'text-red-400'
          )}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">
              {formatPercentage(marketData.changePercent)}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">
              {formatCurrency(marketData.price)}
            </span>
            <span className={cn(
              'text-sm font-medium',
              isPositive ? 'text-green-400' : 'text-red-400'
            )}>
              {isPositive ? '+' : ''}{formatCurrency(marketData.change)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">24h High</span>
              <div className="font-medium">{formatCurrency(marketData.high24h)}</div>
            </div>
            <div>
              <span className="text-gray-400">24h Low</span>
              <div className="font-medium">{formatCurrency(marketData.low24h)}</div>
            </div>
            <div className="col-span-2">
              <span className="text-gray-400">Volume</span>
              <div className="font-medium">{formatLargeNumber(marketData.volume)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'chart') {
    return (
      <div className="trading-chart">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{symbol} Price Chart</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Activity className="w-4 h-4" />
            <span>Live Data</span>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="timestamp" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#9CA3AF' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#9CA3AF' }}
              />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#3B82F6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  return null;
}
