'use client';

import { useState } from 'react';
import { Home, BookOpen, BarChart3, User, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'history', label: 'History', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="glass-card p-4 mb-6">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                'nav-item flex-col space-y-1 min-w-0 flex-1',
                currentView === item.id && 'bg-blue-500 bg-opacity-20 text-blue-400'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
