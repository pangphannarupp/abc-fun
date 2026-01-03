
import React, { useState } from 'react';
import { LetterData } from '../types';
import { gemini } from '../services/geminiService';
import { useAudio } from '../context/AudioContext';

interface LetterDetailProps {
  letter: LetterData;
  onBack: () => void;
  onTrace: () => void;
}

const LetterDetail: React.FC<LetterDetailProps> = ({ letter, onBack, onTrace }) => {
  const [funFact, setFunFact] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { speak, playSfx } = useAudio();

  const handleListen = async () => {
    if (loading) return;
    setLoading(true);
    playSfx('click');
    const fact = await gemini.getFunFact(letter.word);
    setFunFact(fact);
    if (fact) speak(`Did you know? ${fact}`);
    else speak(`${letter.id} is for ${letter.word}. ${letter.description}`);

    setLoading(false);
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-background-light dark:bg-background-dark">
      <div className="flex items-center justify-between p-4 pb-2 z-10">
        <button
          onClick={onBack}
          className="flex size-12 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark shadow-sm hover:bg-gray-50 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-xl font-bold flex-1 text-center">Letter {letter.id}</h2>
        <div className="flex w-12 items-center justify-end">
          <div className="flex h-8 px-3 items-center justify-center rounded-full bg-primary/20">
            <p className="text-primary text-sm font-bold">1/26</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-4 py-4">
          <div className="relative flex flex-col items-center justify-center rounded-3xl bg-primary p-8 shadow-lg overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-full blur-xl"></div>

            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="flex items-baseline gap-2 text-white">
                <span className="text-[120px] font-bold leading-none tracking-tighter drop-shadow-md">{letter.upper}</span>
                <span className="text-[120px] font-bold leading-none tracking-tighter drop-shadow-md">{letter.lower}</span>
              </div>

              <button
                onClick={handleListen}
                disabled={loading}
                className={`flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-full shadow-md active:scale-95 transition-transform ${loading ? 'opacity-50' : ''}`}
              >
                <span className={`material-symbols-outlined filled ${loading ? 'animate-pulse' : ''}`}>volume_up</span>
                <span className="text-lg font-bold">{loading ? 'Thinking...' : 'Listen'}</span>
              </button>
            </div>
          </div>
        </div>

        {funFact && (
          <div className="px-6 py-2">
            <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border-l-4 border-primary shadow-sm animate-bounce-in">
              <p className="text-sm font-medium italic text-primary">Bear says: {funFact}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between px-6 pt-4 pb-2">
          <h3 className="text-xl font-bold">Words with {letter.id}</h3>
          <button className="text-primary text-sm font-bold">See All</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 pb-4">
          {(letter.examples.length > 0 ? letter.examples : [
            { word: letter.word, description: `Starts with ${letter.id}`, image: 'https://picsum.photos/200' }
          ]).map((ex, i) => (
            <div key={i} className="flex flex-col gap-3 p-3 rounded-2xl bg-surface-light dark:bg-surface-dark shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-full aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden relative">
                <div
                  className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url("${ex.image}")` }}
                ></div>
              </div>
              <div>
                <p className="text-lg font-bold leading-tight">{ex.word}</p>
                <p className="text-gray-500 text-sm font-medium">{ex.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark pt-8 pointer-events-none flex justify-center">
        <button
          onClick={onTrace}
          className="w-full max-w-md pointer-events-auto flex items-center justify-center gap-3 rounded-full bg-primary h-14 text-white font-bold text-lg shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-colors active:scale-95"
        >
          <span className="material-symbols-outlined filled">edit</span>
          <span>Trace Letter {letter.id}</span>
        </button>
      </div>
    </div>
  );
};

export default LetterDetail;
