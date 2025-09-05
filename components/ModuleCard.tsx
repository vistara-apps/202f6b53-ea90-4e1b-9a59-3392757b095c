'use client';

import { BookOpen, CheckCircle, Lock, Clock } from 'lucide-react';
import { ModuleCardProps } from '@/lib/types';
import { formatDuration } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function ModuleCard({ module, variant, onStart }: ModuleCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'completed':
        return 'border-green-500 bg-green-500 bg-opacity-10';
      case 'inProgress':
        return 'border-blue-500 bg-blue-500 bg-opacity-10 glow';
      case 'locked':
        return 'border-gray-500 bg-gray-500 bg-opacity-10 opacity-60';
      default:
        return '';
    }
  };

  const getIcon = () => {
    switch (variant) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-gray-400" />;
      default:
        return <BookOpen className="w-5 h-5 text-blue-400" />;
    }
  };

  const getDifficultyColor = () => {
    switch (module.difficulty) {
      case 'beginner':
        return 'text-green-400 bg-green-500 bg-opacity-20';
      case 'intermediate':
        return 'text-yellow-400 bg-yellow-500 bg-opacity-20';
      case 'advanced':
        return 'text-red-400 bg-red-500 bg-opacity-20';
      default:
        return 'text-gray-400 bg-gray-500 bg-opacity-20';
    }
  };

  return (
    <div
      className={cn(
        'module-card border-2',
        getVariantStyles(),
        variant !== 'locked' && 'hover:scale-105'
      )}
      onClick={variant !== 'locked' ? onStart : undefined}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getIcon()}
          <span className={cn(
            'text-xs px-2 py-1 rounded-full font-medium',
            getDifficultyColor()
          )}>
            {module.difficulty}
          </span>
        </div>
        <div className="flex items-center space-x-1 text-gray-400 text-sm">
          <Clock className="w-4 h-4" />
          <span>{formatDuration(module.estimatedTime)}</span>
        </div>
      </div>

      <h3 className="font-semibold mb-2 text-white">{module.title}</h3>
      <p className="text-sm text-gray-300 mb-4 line-clamp-2">
        {module.content}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400 capitalize">
          {module.type}
        </span>
        {variant === 'completed' && (
          <span className="text-xs text-green-400 font-medium">
            Completed
          </span>
        )}
        {variant === 'inProgress' && (
          <span className="text-xs text-blue-400 font-medium">
            Continue
          </span>
        )}
        {variant === 'locked' && (
          <span className="text-xs text-gray-400 font-medium">
            Locked
          </span>
        )}
      </div>

      {module.prerequisites.length > 0 && variant === 'locked' && (
        <div className="mt-3 pt-3 border-t border-gray-600">
          <p className="text-xs text-gray-400">
            Requires: {module.prerequisites.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}
