import React from 'react';

import { THEME_COLORS } from '../constants';
import { useAudio } from '../context/AudioContext';

interface SettingsProps {
  onBack: () => void;
  currentTheme: string;
  onThemeSelect: (color: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack, currentTheme, onThemeSelect, isDarkMode, onToggleDarkMode }) => {
  const {
    isMusicEnabled, toggleMusic,
    isSfxEnabled, toggleSfx,
    isVoiceEnabled, toggleVoice,
    playSfx
  } = useAudio();

  const handleToggle = (type: 'music' | 'sfx' | 'voice' | 'darkMode') => {
    playSfx('click');
    if (type === 'music') toggleMusic();
    else if (type === 'sfx') toggleSfx();
    else if (type === 'voice') toggleVoice();
    else if (type === 'darkMode') onToggleDarkMode();
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-background-light dark:bg-background-dark font-settings">
      <header className="z-20 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <button onClick={() => { playSfx('click'); onBack(); }} className="flex h-10 w-10 items-center justify-center rounded-full text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800">
          <span className="material-symbols-outlined !text-[28px]">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold flex-1 text-center pr-10 dark:text-gray-100">Settings</h1>
      </header>

      <main className="flex-1 px-4 py-6 space-y-6 overflow-y-auto overscroll-y-none">
        <section className="bg-white dark:bg-surface-dark rounded-3xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div
                className="h-16 w-16 rounded-full bg-cover bg-center border-2 border-primary"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAtAqCXx5FK1Q9AeC8KM_riRu7dNTEwFic32iGdeGmcZmR0WAzr9GvlXtTtwSk5Rxqqui1dmgLPS1C9c-qottTAlG845eOAKq2z931OL_bXhvGNwPnWG1cauKwCT1qRdDcVrg68d1MkjOLjSdITaX5R4UgaPazH1j9lTexorXcbjhS1Yqhi7Othc5mjywHKEwBnJCu6hmzLsAR0sWHCcnrJuDCHzhn4bt1124Cmtw1npOtZee1SGwao3DWWDd5srpXfZlGo_0Mt0W7h")' }}
              ></div>
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white border-2 border-white dark:border-surface-dark">
                <span className="material-symbols-outlined !text-[14px]">edit</span>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold dark:text-gray-100">Leo</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Beginner Explorer</p>
            </div>
            <button onClick={() => playSfx('click')} className="rounded-xl bg-orange-100 dark:bg-orange-900/40 px-3 py-2 text-sm font-semibold text-primary">Switch</button>
          </div>
        </section>

        <section>
          <h3 className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Appearance</h3>
          <div className="overflow-hidden rounded-3xl bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">

            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400">dark_mode</span>
                <span className="font-medium dark:text-gray-200">Dark Mode</span>
              </div>
              <button
                onClick={() => handleToggle('darkMode')}
                className={`relative h-7 w-12 rounded-full transition-colors ${isDarkMode ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'}`}
              >
                <div className={`absolute left-[2px] top-[2px] h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${isDarkMode ? 'translate-x-[20px]' : ''}`}></div>
              </button>
            </div>

            {/* Theme Color Picker */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gray-400">palette</span>
                  <span className="font-medium dark:text-gray-200">Theme Color</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Custom</span>
                  <input
                    type="color"
                    value={currentTheme}
                    onChange={(e) => onThemeSelect(e.target.value)}
                    className="h-6 w-6 rounded-full overflow-hidden border-0 p-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {THEME_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => { playSfx('click'); onThemeSelect(color); }}
                    className={`h-9 w-9 rounded-full border-2 transition-transform active:scale-95 flex items-center justify-center ${currentTheme === color ? 'border-gray-600 dark:border-white scale-110 shadow-md' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                  >
                    {currentTheme === color && (
                      <span className="material-symbols-outlined text-white/90 !text-lg">check</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </section>

        <section>
          <h3 className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Audio & Sounds</h3>
          <div className="overflow-hidden rounded-3xl bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400">music_note</span>
                <span className="font-medium dark:text-gray-200">Background Music</span>
              </div>
              <button
                onClick={() => handleToggle('music')}
                className={`relative h-7 w-12 rounded-full transition-colors ${isMusicEnabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'}`}
              >
                <div className={`absolute left-[2px] top-[2px] h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${isMusicEnabled ? 'translate-x-[20px]' : ''}`}></div>
              </button>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400">graphic_eq</span>
                <span className="font-medium dark:text-gray-200">Sound Effects</span>
              </div>
              <button
                onClick={() => handleToggle('sfx')}
                className={`relative h-7 w-12 rounded-full transition-colors ${isSfxEnabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'}`}
              >
                <div className={`absolute left-[2px] top-[2px] h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${isSfxEnabled ? 'translate-x-[20px]' : ''}`}></div>
              </button>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400">record_voice_over</span>
                <span className="font-medium dark:text-gray-200">Voice Guidance</span>
              </div>
              <button
                onClick={() => handleToggle('voice')}
                className={`relative h-7 w-12 rounded-full transition-colors ${isVoiceEnabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'}`}
              >
                <div className={`absolute left-[2px] top-[2px] h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${isVoiceEnabled ? 'translate-x-[20px]' : ''}`}></div>
              </button>
            </div>
          </div>
        </section>

        <section>
          <h3 className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Learning Preferences</h3>
          <div className="overflow-hidden rounded-3xl bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
            {[
              { label: 'Difficulty Level', value: 'Beginner' },
              { label: 'Case Focus', value: 'Mixed (Aa)' },
              { label: 'Daily Time Limit', value: '30 mins' }
            ].map(item => (
              <button key={item.label} className="flex w-full items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 text-left">
                <span className="font-medium dark:text-gray-200">{item.label}</span>
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-sm">{item.value}</span>
                  <span className="material-symbols-outlined !text-[20px]">chevron_right</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <button className="w-full rounded-3xl bg-white dark:bg-surface-dark p-4 text-center font-bold text-red-500 shadow-sm border border-gray-100 dark:border-gray-700">
          Log Out
        </button>

        <div className="text-center pb-8 space-y-1">
          <p className="text-xs text-gray-400">Version 2.4.1 (Build 890)</p>
          <p className="text-[10px] text-gray-300 dark:text-gray-600">User ID: 8829-3992-LEO</p>
        </div>
      </main>
    </div>
  );
};

export default Settings;
