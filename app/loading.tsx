export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">Loading FlashTrade Sim</h2>
          <p className="text-gray-400">Preparing your trading environment...</p>
        </div>
      </div>
    </div>
  );
}
