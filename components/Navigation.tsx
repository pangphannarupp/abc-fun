
import React from 'react';
import { Screen } from '../types';
import { useAudio } from '../context/AudioContext';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentScreen, onNavigate }) => {
  const { playSfx } = useAudio();

  const handleNavigate = (screen: Screen) => {
    if (currentScreen !== screen) {
      playSfx('click');
      onNavigate(screen);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md border-t border-primary/10 pt-1 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-around px-4">
        <button
          onClick={() => handleNavigate(Screen.GRID)}
          className={`group flex flex-1 flex-col items-center gap-1 p-1 ${currentScreen === Screen.GRID ? 'text-primary' : 'text-gray-400'}`}
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${currentScreen === Screen.GRID ? 'bg-primary/10' : 'group-hover:bg-gray-100 dark:group-hover:bg-gray-800'}`}>
            <span className={`material-symbols-outlined text-2xl ${currentScreen === Screen.GRID ? 'filled' : ''}`}>home</span>
          </div>
          <span className="text-[10px] font-bold">Home</span>
        </button>

        <button
          onClick={() => handleNavigate(Screen.SONGS)}
          className={`group flex flex-1 flex-col items-center gap-1 p-1 ${currentScreen === Screen.SONGS ? 'text-primary' : 'text-gray-400'}`}
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${currentScreen === Screen.SONGS ? 'bg-primary/10' : 'group-hover:bg-gray-100 dark:group-hover:bg-gray-800'}`}>
            <span className={`material-symbols-outlined text-2xl ${currentScreen === Screen.SONGS ? 'filled' : ''}`}>music_note</span>
          </div>
          <span className="text-[10px] font-bold">Songs</span>
        </button>

        <button
          onClick={() => handleNavigate(Screen.PROFILE)}
          className={`group flex flex-1 flex-col items-center gap-1 p-1 ${currentScreen === Screen.PROFILE || currentScreen === Screen.SETTINGS ? 'text-primary' : 'text-gray-400'}`}
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${currentScreen === Screen.PROFILE ? 'bg-primary/10' : 'group-hover:bg-gray-100 dark:group-hover:bg-gray-800'}`}>
            <span className={`material-symbols-outlined text-2xl ${currentScreen === Screen.PROFILE ? 'filled' : ''}`}>face</span>
          </div>
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
