import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency values
export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Format percentage values
export function formatPercentage(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

// Format large numbers (e.g., volume)
export function formatLargeNumber(value: number): string {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(1)}B`;
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(1)}M`;
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(1)}K`;
  }
  return value.toString();
}

// Calculate profit/loss
export function calculatePnL(
  entryPrice: number,
  currentPrice: number,
  quantity: number,
  type: 'buy' | 'sell'
): number {
  if (type === 'buy') {
    return (currentPrice - entryPrice) * quantity;
  } else {
    return (entryPrice - currentPrice) * quantity;
  }
}

// Calculate percentage change
export function calculatePercentageChange(oldValue: number, newValue: number): number {
  return ((newValue - oldValue) / oldValue) * 100;
}

// Generate random price movement for simulation
export function generatePriceMovement(currentPrice: number, volatility: number = 0.02): number {
  const change = (Math.random() - 0.5) * 2 * volatility;
  return currentPrice * (1 + change);
}

// Validate trade parameters
export function validateTrade(
  quantity: number,
  price: number,
  balance: number,
  maxPositionSize: number
): { isValid: boolean; error?: string } {
  if (quantity <= 0) {
    return { isValid: false, error: 'Quantity must be greater than 0' };
  }
  
  if (price <= 0) {
    return { isValid: false, error: 'Price must be greater than 0' };
  }
  
  const totalCost = quantity * price;
  if (totalCost > balance) {
    return { isValid: false, error: 'Insufficient balance' };
  }
  
  if (totalCost > balance * maxPositionSize) {
    return { isValid: false, error: `Position size exceeds ${maxPositionSize * 100}% limit` };
  }
  
  return { isValid: true };
}

// Generate unique IDs
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Time formatting utilities
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

export function formatTimeRemaining(endTime: Date): string {
  const now = new Date();
  const remaining = endTime.getTime() - now.getTime();
  
  if (remaining <= 0) {
    return '0:00';
  }
  
  const minutes = Math.floor(remaining / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Color utilities for profit/loss
export function getPnLColor(value: number): string {
  if (value > 0) return 'text-green-400';
  if (value < 0) return 'text-red-400';
  return 'text-gray-400';
}

export function getPnLBgColor(value: number): string {
  if (value > 0) return 'bg-green-500 bg-opacity-20';
  if (value < 0) return 'bg-red-500 bg-opacity-20';
  return 'bg-gray-500 bg-opacity-20';
}

// Local storage utilities
export function saveToLocalStorage(key: string, data: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return defaultValue;
  }
}
