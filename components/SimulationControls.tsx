'use client';

import { Play, Pause, RotateCcw } from 'lucide-react';
import { SimulationControlsProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export function SimulationControls({
  variant,
  onPlay,
  onPause,
  onReset,
  isPlaying = false
}: SimulationControlsProps) {
  return (
    <div className="flex items-center space-x-4">
      {variant === 'play' && (
        <button
          onClick={onPlay}
          disabled={isPlaying}
          className={cn(
            'btn-primary flex items-center space-x-2',
            isPlaying && 'opacity-50 cursor-not-allowed'
          )}
        >
          <Play className="w-4 h-4" />
          <span>{isPlaying ? 'Running' : 'Start Session'}</span>
        </button>
      )}
      
      {variant === 'pause' && (
        <button
          onClick={onPause}
          disabled={!isPlaying}
          className={cn(
            'btn-secondary flex items-center space-x-2',
            !isPlaying && 'opacity-50 cursor-not-allowed'
          )}
        >
          <Pause className="w-4 h-4" />
          <span>Pause</span>
        </button>
      )}
      
      {variant === 'reset' && (
        <button
          onClick={onReset}
          className="btn-secondary flex items-center space-x-2 text-red-400 hover:text-red-300"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      )}
    </div>
  );
}
