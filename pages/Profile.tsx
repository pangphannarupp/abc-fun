
import React from 'react';
import { Screen, UserStats } from '../types';
import { ALPHABET } from '../constants';
import Navigation from '../components/Navigation';

interface ProfileProps {
  stats: UserStats;
  onContinue: () => void;
  onSettings: () => void;
  navigateTo: (screen: Screen) => void;
}

const Profile: React.FC<ProfileProps> = ({ stats, onContinue, onSettings, navigateTo }) => {
  const nextLetter = ALPHABET.find(l => !stats.completedLetters.includes(l.id));

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-background-light dark:bg-background-dark">
      <header className="flex items-center p-4 pb-2 justify-between">
        <h2 className="text-xl font-extrabold text-primary">My Profile</h2>
        <button onClick={onSettings} className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-surface-dark shadow-sm hover:bg-gray-50">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto overscroll-y-contain pb-32 scrollbar-hide">
        <h1 className="tracking-tight text-[32px] font-extrabold px-4 text-center pb-2 pt-4">
          Hello, {stats.name}! 👋
        </h1>

        <div className="flex flex-col items-center px-4 py-4 w-full">
          <div className="relative group cursor-pointer">
            <div
              className="rounded-full h-40 w-40 border-4 border-white dark:border-surface-dark shadow-lg bg-cover bg-center"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAtAqCXx5FK1Q9AeC8KM_riRu7dNTEwFic32iGdeGmcZmR0WAzr9GvlXtTtwSk5Rxuqui1dmgLPS1C9c-qottTAlG845eOAKq2z931OL_bXhvGNwPnWG1cauKwCT1qRdDcVrg68d1MkjOLjSdITaX5R4UgaPazH1j9lTexorXcbjhS1Yqhi7Othc5mjywHKEwBnJCu6hmzLsAR0sWHCcnrJuDCHzhn4bt1124Cmtw1npOtZee1SGwao3DWWDd5srpXfZlGo_0Mt0W7h")' }}
            ></div>
            <button className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-2 shadow-md border-2 border-white dark:border-background-dark">
              <span className="material-symbols-outlined !text-[20px]">edit</span>
            </button>
          </div>
          <div className="mt-4 flex flex-col items-center gap-1">
            <p className="text-xl font-bold">Super Learner</p>
            <div className="inline-flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
              <span className="material-symbols-outlined text-yellow-600 text-sm filled">workspace_premium</span>
              <span className="text-xs font-bold text-yellow-700 uppercase">Level {stats.level}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 p-4 w-full">
          <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl p-4 bg-white dark:bg-surface-dark shadow-sm border border-gray-100">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600 mb-1">
              <span className="material-symbols-outlined">calendar_month</span>
            </div>
            <p className="text-2xl font-black">{stats.daysLearned}</p>
            <p className="text-gray-400 text-[10px] font-bold uppercase">Days Learned</p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl p-4 bg-white dark:bg-surface-dark shadow-sm border border-gray-100">
            <div className="p-2 rounded-full bg-primary/20 text-primary mb-1">
              <span className="material-symbols-outlined filled">star</span>
            </div>
            <p className="text-2xl font-black">{stats.starsEarned}</p>
            <p className="text-gray-400 text-[10px] font-bold uppercase">Stars Earned</p>
          </div>
        </div>

        <div className="flex flex-col px-4 pt-2 pb-6">
          <div className="flex justify-between items-end mb-3">
            <h2 className="text-xl font-bold">Alphabet Journey</h2>
            <span className="text-primary font-bold">{stats.lettersCompleted}/26 Letters</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-surface-dark rounded-full h-6 p-1 relative overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-1000"
              style={{ width: `${(stats.lettersCompleted / 26) * 100}%` }}
            ></div>
          </div>
          <p className="text-gray-400 text-sm mt-2 font-medium">Next up: {nextLetter ? <>Letter <span className="font-bold text-slate-800 dark:text-white">'{nextLetter.upper}'</span></> : <span className="font-bold text-primary">All Done!</span>}</p>
        </div>

        <div className="px-4 pb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">My Stickers</h2>
            <button className="text-sm font-bold text-primary">See All</button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 1, title: 'Vowel Master', icon: 'school', unlocked: true },
              { id: 2, title: 'Speedy Reader', icon: 'timer', unlocked: true },
              { id: 3, title: 'Secret Hero', icon: 'lock', unlocked: false },
              { id: 4, title: 'Word Wizard', icon: 'lock', unlocked: false },
              { id: 5, title: 'Alphabet King', icon: 'lock', unlocked: false },
              { id: 6, title: 'Super Star', icon: 'lock', unlocked: false }
            ].map(sticker => (
              <div key={sticker.id} className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 border-2 ${sticker.unlocked ? 'bg-orange-50 border-primary/20' : 'bg-gray-100 border-gray-200 opacity-60'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-sm ${sticker.unlocked ? 'bg-white' : 'bg-gray-200'}`}>
                  <span className={`material-symbols-outlined text-3xl ${sticker.unlocked ? 'text-primary' : 'text-gray-400'}`}>{sticker.icon}</span>
                </div>
                <span className={`text-[10px] font-bold text-center leading-tight ${sticker.unlocked ? '' : 'text-gray-400'}`}>{sticker.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 pt-2 pb-8 w-full">
          <button
            onClick={onContinue}
            className="w-full bg-primary hover:bg-orange-600 text-white font-extrabold text-lg h-14 rounded-xl shadow-xl flex items-center justify-center gap-2 transform active:scale-95 transition-all"
          >
            <span>Continue Learning</span>
            <span className="material-symbols-outlined">play_circle</span>
          </button>
        </div>
      </main>

      <Navigation currentScreen={Screen.PROFILE} onNavigate={navigateTo} />
    </div>
  );
};

export default Profile;
