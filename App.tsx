
import React, { useState, useEffect } from 'react';
import { Screen, UserStats, LetterData } from './types';
import { ALPHABET } from './constants';
import Welcome from './pages/Welcome';
import LetterGrid from './pages/LetterGrid';
import LetterDetail from './pages/LetterDetail';
import Tracing from './pages/Tracing';
import Quiz from './pages/Quiz';
import Songs from './pages/Songs';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

import { AudioProvider } from './context/AudioContext';

const AppContent: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.WELCOME);
  const [previousScreen, setPreviousScreen] = useState<Screen>(Screen.PROFILE);
  const [themeColor, setThemeColor] = useState(() => localStorage.getItem('themeColor') || '#f49d25');
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('isDarkMode') === 'true');
  const [selectedLetter, setSelectedLetter] = useState<LetterData | null>(null);
  const [userStats, setUserStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('userStats');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      name: 'Leo',
      daysLearned: 1,
      starsEarned: 0,
      lettersCompleted: 0,
      completedLetters: [],
      level: 1
    };
  });

  useEffect(() => {
    localStorage.setItem('themeColor', themeColor);
  }, [themeColor]);

  useEffect(() => {
    localStorage.setItem('isDarkMode', String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('userStats', JSON.stringify(userStats));
  }, [userStats]);

  const navigateTo = (screen: Screen, letter?: LetterData) => {
    if (screen === Screen.SETTINGS) {
      setPreviousScreen(currentScreen);
    }
    if (letter) setSelectedLetter(letter);
    setCurrentScreen(screen);
  };

  const handleCompleteLetter = () => {
    setUserStats(prev => {
      // Avoid duplicates
      if (selectedLetter && prev.completedLetters.includes(selectedLetter.id)) {
        return prev;
      }

      const newCompleted = selectedLetter ? [...prev.completedLetters, selectedLetter.id] : prev.completedLetters;

      return {
        ...prev,
        starsEarned: prev.starsEarned + 5,
        lettersCompleted: newCompleted.length,
        completedLetters: newCompleted
      };
    });
    navigateTo(Screen.GRID);
  };

  // Basic "router" mapping
  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.WELCOME:
        return <Welcome onPlay={() => navigateTo(Screen.GRID)} onSettings={() => navigateTo(Screen.SETTINGS)} onProfile={() => navigateTo(Screen.PROFILE)} />;
      case Screen.GRID:
        return <LetterGrid onSelect={(l) => navigateTo(Screen.DETAIL, l)} userStats={userStats} navigateTo={navigateTo} />;
      case Screen.DETAIL:
        return <LetterDetail letter={selectedLetter || ALPHABET[0]} onBack={() => navigateTo(Screen.GRID)} onTrace={() => navigateTo(Screen.TRACING)} />;
      case Screen.TRACING:
        return <Tracing letter={selectedLetter || ALPHABET[0]} onBack={() => navigateTo(Screen.DETAIL)} onComplete={() => navigateTo(Screen.QUIZ)} themeColor={themeColor} />;
      case Screen.QUIZ:
        return <Quiz letter={selectedLetter || ALPHABET[0]} onBack={() => navigateTo(Screen.TRACING)} onComplete={handleCompleteLetter} themeColor={themeColor} />;
      case Screen.SONGS:
        return <Songs onBack={() => navigateTo(Screen.GRID)} navigateTo={navigateTo} />;
      case Screen.PROFILE:
        return <Profile stats={userStats} onContinue={() => navigateTo(Screen.GRID)} onSettings={() => navigateTo(Screen.SETTINGS)} navigateTo={navigateTo} />;
      case Screen.SETTINGS:
        return (
          <Settings
            onBack={() => navigateTo(previousScreen)}
            currentTheme={themeColor}
            onThemeSelect={setThemeColor}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(prev => !prev)}
          />
        );
      default:
        return <Welcome onPlay={() => navigateTo(Screen.GRID)} onSettings={() => navigateTo(Screen.SETTINGS)} onProfile={() => navigateTo(Screen.PROFILE)} />;
    }
  };

  return (
    <div
      className="flex h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-hidden pt-[env(safe-area-inset-top)]"
      style={{ '--color-primary': themeColor } as React.CSSProperties}
    >
      <div className="relative h-full w-full overflow-hidden">
        {renderScreen()}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  );
};

export default App;
