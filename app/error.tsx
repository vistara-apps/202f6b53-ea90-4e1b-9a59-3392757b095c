'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">
            Something went wrong!
          </h2>
          <p className="text-gray-400">
            We encountered an error while loading FlashTrade Sim.
          </p>
        </div>
        
        <div className="glass-card p-4">
          <p className="text-sm text-red-400 mb-4">
            Error: {error.message}
          </p>
          <button
            onClick={reset}
            className="btn-primary w-full"
          >
            Try Again
          </button>
        </div>
        
        <div className="text-xs text-gray-500">
          If the problem persists, please contact support.
        </div>
      </div>
    </div>
  );
}
