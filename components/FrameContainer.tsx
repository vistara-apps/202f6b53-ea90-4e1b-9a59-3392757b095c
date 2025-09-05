'use client';

import { cn } from '@/lib/utils';
import { FrameContainerProps } from '@/lib/types';

export function FrameContainer({ 
  children, 
  variant = 'default', 
  className 
}: FrameContainerProps) {
  return (
    <div
      className={cn(
        'w-full max-w-md mx-auto',
        variant === 'default' && 'glass-card p-6',
        variant === 'bordered' && 'glass-card p-6 border-2 border-blue-400 glow',
        className
      )}
    >
      {children}
    </div>
  );
}
