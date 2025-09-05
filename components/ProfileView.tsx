'use client';

import { useState } from 'react';
import { User, Award, DollarSign, Clock, Settings2 } from 'lucide-react';
import { FrameContainer } from './FrameContainer';
import { formatCurrency } from '@/lib/utils';
import { PRICING } from '@/lib/constants';

export function ProfileView() {
  const [sessionsRemaining, setSessionsRemaining] = useState(2);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Mock user data
  const userData = {
    name: 'Demo User',
    joinDate: new Date('2024-01-15'),
    totalSessions: 8,
    totalTrades: 45,
    bestWinStreak: 7,
    totalPnL: 1250,
    completedModules: 3,
    achievements: [
      { id: 'first_trade', name: 'First Trade', description: 'Completed your first trade' },
      { id: 'profitable_week', name: 'Profitable Week', description: 'Made profit for 7 consecutive days' },
      { id: 'module_master', name: 'Module Master', description: 'Completed 3 learning modules' },
    ],
  };

  const handlePurchaseSession = () => {
    // In a real app, this would integrate with payment processing
    setSessionsRemaining(prev => prev + 1);
  };

  const handleSubscribe = () => {
    // In a real app, this would integrate with payment processing
    setIsSubscribed(true);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <FrameContainer>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{userData.name}</h2>
            <p className="text-sm text-gray-400">
              Member since {userData.joinDate.toLocaleDateString()}
            </p>
          </div>
        </div>
      </FrameContainer>

      {/* Session Status */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Session Status</h3>
          <Clock className="w-5 h-5 text-blue-400" />
        </div>
        
        {isSubscribed ? (
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-green-400">Unlimited</div>
            <div className="text-sm text-gray-400">Premium Subscription Active</div>
            <div className="text-xs text-gray-500">
              Next billing: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{sessionsRemaining}</div>
              <div className="text-sm text-gray-400">Sessions Remaining</div>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={handlePurchaseSession}
                className="btn-secondary w-full"
              >
                Buy Session - {formatCurrency(PRICING.sessionPrice)}
              </button>
              <button
                onClick={handleSubscribe}
                className="btn-primary w-full"
              >
                Subscribe - {formatCurrency(PRICING.monthlySubscription)}/month
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="metric-card text-center">
          <div className="text-lg font-bold text-blue-400">{userData.totalSessions}</div>
          <div className="text-sm text-gray-400">Total Sessions</div>
        </div>
        <div className="metric-card text-center">
          <div className="text-lg font-bold text-purple-400">{userData.totalTrades}</div>
          <div className="text-sm text-gray-400">Total Trades</div>
        </div>
        <div className="metric-card text-center">
          <div className="text-lg font-bold text-green-400">{userData.bestWinStreak}</div>
          <div className="text-sm text-gray-400">Best Win Streak</div>
        </div>
        <div className="metric-card text-center">
          <div className={`text-lg font-bold ${
            userData.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {formatCurrency(userData.totalPnL)}
          </div>
          <div className="text-sm text-gray-400">Virtual P&L</div>
        </div>
      </div>

      {/* Achievements */}
      <div className="glass-card p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Award className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold">Achievements</h3>
        </div>
        
        <div className="space-y-3">
          {userData.achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-white bg-opacity-5 rounded-lg">
              <div className="w-10 h-10 bg-yellow-500 bg-opacity-20 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-white">{achievement.name}</div>
                <div className="text-sm text-gray-400">{achievement.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Progress */}
      <div className="glass-card p-4">
        <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Modules Completed</span>
            <span className="text-sm font-medium">{userData.completedModules}/5</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              style={{ width: `${(userData.completedModules / 5) * 100}%` }}
            />
          </div>
          <div className="text-xs text-gray-400 text-center">
            {((userData.completedModules / 5) * 100).toFixed(0)}% Complete
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="glass-card p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Settings2 className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold">Settings</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Notifications</span>
            <button className="w-10 h-6 bg-blue-500 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Sound Effects</span>
            <button className="w-10 h-6 bg-gray-600 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Auto-save Sessions</span>
            <button className="w-10 h-6 bg-blue-500 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="glass-card p-4 text-center">
        <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
        <p className="text-sm text-gray-400 mb-4">
          Get support or provide feedback about your experience
        </p>
        <div className="space-y-2">
          <button className="btn-secondary w-full text-sm">
            Contact Support
          </button>
          <button className="btn-secondary w-full text-sm">
            Send Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
