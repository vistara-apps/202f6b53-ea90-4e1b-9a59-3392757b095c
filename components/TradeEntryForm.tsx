'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { TradeEntryFormProps } from '@/lib/types';
import { formatCurrency, validateTrade } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function TradeEntryForm({
  variant,
  onSubmit,
  currentPrice,
  availableBalance
}: TradeEntryFormProps) {
  const [quantity, setQuantity] = useState<string>('');
  const [price, setPrice] = useState<string>(currentPrice.toString());
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const quantityNum = parseFloat(quantity);
    const priceNum = parseFloat(price);
    
    const validation = validateTrade(quantityNum, priceNum, availableBalance, 0.1);
    
    if (!validation.isValid) {
      setError(validation.error || 'Invalid trade parameters');
      return;
    }
    
    setError('');
    onSubmit({
      type: variant,
      quantity: quantityNum,
      price: priceNum,
      timestamp: new Date(),
      entryReason: `${variant} order at ${formatCurrency(priceNum)}`,
    });
    
    // Reset form
    setQuantity('');
    setPrice(currentPrice.toString());
  };

  const totalCost = parseFloat(quantity) * parseFloat(price) || 0;

  return (
    <div className="trade-entry-form">
      <div className="flex items-center space-x-2 mb-4">
        {variant === 'buy' ? (
          <TrendingUp className="w-5 h-5 text-green-400" />
        ) : (
          <TrendingDown className="w-5 h-5 text-red-400" />
        )}
        <h3 className="text-lg font-semibold capitalize">
          {variant} Order
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Price ({formatCurrency(currentPrice)})
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
            className="input-field"
            required
          />
        </div>

        <div className="bg-white bg-opacity-5 rounded-lg p-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Total Cost:</span>
            <span className="font-medium">{formatCurrency(totalCost)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Available:</span>
            <span className="font-medium">{formatCurrency(availableBalance)}</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          className={cn(
            'w-full py-3 rounded-lg font-medium transition-all duration-200',
            variant === 'buy'
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          )}
        >
          Place {variant.toUpperCase()} Order
        </button>
      </form>
    </div>
  );
}
