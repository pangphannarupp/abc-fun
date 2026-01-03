
import React from 'react';
import { LetterData, UserStats, Screen } from '../types';
import { ALPHABET } from '../constants';
import Navigation from '../components/Navigation';

import { useAudio } from '../context/AudioContext';

interface LetterGridProps {
  onSelect: (letter: LetterData) => void;
  userStats: UserStats;
  navigateTo: (screen: Screen) => void;
}

const LetterGrid: React.FC<LetterGridProps> = ({ onSelect, userStats, navigateTo }) => {
  const { playSfx } = useAudio();
  const progressPercent = (userStats.lettersCompleted / 26) * 100;

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <header className="z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-6 py-4 border-b border-primary/10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => { playSfx('click'); navigateTo(Screen.WELCOME); }}
            className="flex size-10 items-center justify-center rounded-full bg-white dark:bg-surface-dark text-slate-800 dark:text-white shadow-sm hover:bg-slate-50 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center flex-1">Pick a Letter!</h1>
          <button
            onClick={() => { playSfx('click'); navigateTo(Screen.SETTINGS); }}
            className="flex size-10 items-center justify-center rounded-full bg-white dark:bg-surface-dark text-slate-800 dark:text-white shadow-sm hover:bg-slate-50 transition-colors"
          >
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2 justify-center">
          <div className="h-2 w-full max-w-[200px] bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <span className="text-xs font-bold text-primary">{userStats.lettersCompleted}/26</span>
        </div>
      </header>

      <main className="flex-1 p-4 pb-32 overflow-y-auto overscroll-y-none">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {ALPHABET.map((letter, index) => {
            const isCompleted = userStats.completedLetters.includes(letter.id);
            // "Learning" is the first non-completed letter? Or just highlight logic?
            // Let's make "Learning" the first one that is NOT completed.
            const firstIncompleteIndex = ALPHABET.findIndex(l => !userStats.completedLetters.includes(l.id));
            const isLearning = index === firstIncompleteIndex;

            return (
              <button
                key={letter.id}
                onClick={() => { playSfx('click'); onSelect(letter); }}
                className={`card-press group relative flex aspect-square flex-col items-center justify-center rounded-2xl shadow-card hover:shadow-card-hover border-b-4 transition-all overflow-hidden ${isLearning
                  ? 'bg-primary text-white ring-4 ring-primary/20 border-primary-dark'
                  : 'bg-surface-light dark:bg-surface-dark border-gray-100 dark:border-gray-800 hover:border-primary/20'
                  }`}
              >
                <div className="absolute right-3 top-3 z-10">
                  <span className={`material-symbols-outlined text-2xl ${isCompleted ? 'text-primary' : isLearning ? 'text-white/50' : 'text-gray-300 dark:text-gray-600'} ${isCompleted ? 'filled' : ''}`}>star</span>
                </div>

                <span className={`material-symbols-outlined absolute text-[8rem] opacity-[0.05] select-none pointer-events-none rotate-12 transition-transform group-hover:scale-110 ${isLearning ? 'text-white opacity-20' : 'text-primary'}`}>
                  {letter.icon}
                </span>

                <div className="z-10 flex flex-col items-center">
                  <span className={`text-6xl font-black ${isLearning ? 'text-white' : 'text-slate-800 dark:text-white group-hover:text-primary'}`}>{letter.upper}{letter.lower}</span>
                  <span className={`text-sm font-bold uppercase tracking-widest mt-1 ${isLearning ? 'text-white/80' : 'text-gray-400 dark:text-gray-500'}`}>{letter.word}</span>
                </div>

                {isLearning && (
                  <div className="absolute bottom-2 rounded-full bg-white/20 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    Learning
                  </div>
                )}
              </button>
            );
          })}
        </div>
        <div className="mt-8 flex justify-center pb-8">
          <p className="text-gray-400 text-sm font-medium">Keep scrolling to find more!</p>
        </div>
      </main>

      <Navigation currentScreen={Screen.GRID} onNavigate={navigateTo} />
    </div>
  );
};

export default LetterGrid;
