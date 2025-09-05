'use client';

import { TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { TradeReviewItemProps } from '@/lib/types';
import { formatCurrency, formatPercentage, getPnLColor } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function TradeReviewItem({ trade, variant, onClick }: TradeReviewItemProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'win':
        return 'border-green-500 bg-green-500 bg-opacity-10';
      case 'loss':
        return 'border-red-500 bg-red-500 bg-opacity-10';
      default:
        return 'border-gray-500 bg-gray-500 bg-opacity-10';
    }
  };

  const getIcon = () => {
    if (trade.type === 'buy') {
      return <TrendingUp className={cn(
        'w-5 h-5',
        variant === 'win' ? 'text-green-400' : 
        variant === 'loss' ? 'text-red-400' : 'text-gray-400'
      )} />;
    } else {
      return <TrendingDown className={cn(
        'w-5 h-5',
        variant === 'win' ? 'text-green-400' : 
        variant === 'loss' ? 'text-red-400' : 'text-gray-400'
      )} />;
    }
  };

  const profitLossPercentage = (trade.profitLoss / (trade.price * trade.quantity)) * 100;

  return (
    <div
      className={cn(
        'trade-item border-2 cursor-pointer',
        getVariantStyles()
      )}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        {getIcon()}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-white">
              {trade.type.toUpperCase()} {trade.asset}
            </span>
            <span className={cn('font-bold', getPnLColor(trade.profitLoss))}>
              {formatCurrency(trade.profitLoss)}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-4">
              <span>Qty: {trade.quantity}</span>
              <span>Price: {formatCurrency(trade.price)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={getPnLColor(trade.profitLoss)}>
                {formatPercentage(profitLossPercentage)}
              </span>
              <Clock className="w-3 h-3" />
              <span>{trade.timestamp.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>

      {trade.entryReason && (
        <div className="mt-2 pt-2 border-t border-gray-600">
          <p className="text-xs text-gray-400">
            Entry: {trade.entryReason}
          </p>
          {trade.exitReason && (
            <p className="text-xs text-gray-400">
              Exit: {trade.exitReason}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
