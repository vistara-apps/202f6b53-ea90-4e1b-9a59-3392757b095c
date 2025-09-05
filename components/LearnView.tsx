'use client';

import { useState } from 'react';
import { BookOpen, Award, Clock } from 'lucide-react';
import { ModuleCard } from './ModuleCard';
import { FrameContainer } from './FrameContainer';
import { SKILL_MODULES } from '@/lib/constants';
import { SkillModule } from '@/lib/types';

export function LearnView() {
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [currentModule, setCurrentModule] = useState<SkillModule | null>(null);

  const getModuleVariant = (module: SkillModule) => {
    if (completedModules.includes(module.moduleId)) {
      return 'completed';
    }
    
    const hasPrerequisites = module.prerequisites.every(prereq => 
      completedModules.includes(prereq)
    );
    
    if (!hasPrerequisites && module.prerequisites.length > 0) {
      return 'locked';
    }
    
    return 'inProgress';
  };

  const handleStartModule = (module: SkillModule) => {
    setCurrentModule(module);
  };

  const handleCompleteModule = (moduleId: string) => {
    setCompletedModules(prev => [...prev, moduleId]);
    setCurrentModule(null);
  };

  const totalModules = SKILL_MODULES.length;
  const completedCount = completedModules.length;
  const progressPercentage = (completedCount / totalModules) * 100;

  if (currentModule) {
    return (
      <div className="space-y-6">
        <FrameContainer variant="bordered">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{currentModule.title}</h2>
              <button
                onClick={() => setCurrentModule(null)}
                className="btn-secondary text-sm"
              >
                Back
              </button>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{currentModule.estimatedTime} min</span>
              </div>
              <span className="capitalize">{currentModule.difficulty}</span>
              <span className="capitalize">{currentModule.type}</span>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed">
                {currentModule.content}
              </p>
            </div>

            {currentModule.type === 'lesson' && (
              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-semibold">Key Concepts:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Understanding market volatility and timing</li>
                  <li>• Risk management strategies</li>
                  <li>• Entry and exit point identification</li>
                  <li>• Position sizing fundamentals</li>
                </ul>
              </div>
            )}

            {currentModule.type === 'quiz' && (
              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-semibold">Quick Quiz:</h3>
                <div className="space-y-3">
                  <div className="glass-card p-4">
                    <p className="mb-3">What is the most important factor in flash trading?</p>
                    <div className="space-y-2">
                      <button className="w-full text-left p-2 rounded bg-white bg-opacity-5 hover:bg-opacity-10">
                        A) Speed of execution
                      </button>
                      <button className="w-full text-left p-2 rounded bg-white bg-opacity-5 hover:bg-opacity-10">
                        B) Risk management
                      </button>
                      <button className="w-full text-left p-2 rounded bg-white bg-opacity-5 hover:bg-opacity-10">
                        C) Market analysis
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => handleCompleteModule(currentModule.moduleId)}
              className="btn-primary w-full"
            >
              Complete Module
            </button>
          </div>
        </FrameContainer>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <FrameContainer>
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Award className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold">Learning Progress</h2>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Modules Completed</span>
              <span>{completedCount}/{totalModules}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="text-xs text-gray-400">
              {progressPercentage.toFixed(0)}% Complete
            </div>
          </div>
        </div>
      </FrameContainer>

      {/* Module Categories */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold">Skill Modules</h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {SKILL_MODULES.map((module) => (
            <ModuleCard
              key={module.moduleId}
              module={module}
              variant={getModuleVariant(module)}
              onStart={() => handleStartModule(module)}
            />
          ))}
        </div>
      </div>

      {/* Learning Tips */}
      <div className="glass-card p-4">
        <h3 className="text-lg font-semibold mb-3">💡 Learning Tips</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>• Complete modules in order for the best learning experience</li>
          <li>• Practice concepts in the simulator after each lesson</li>
          <li>• Review your trading history to identify improvement areas</li>
          <li>• Take breaks between intensive modules to absorb information</li>
        </ul>
      </div>
    </div>
  );
}
