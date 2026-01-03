import React, { useState } from 'react';
import { LetterData } from '../types';
import { useAudio } from '../context/AudioContext';

interface QuizFindProps {
    letter: LetterData;
    onBack: () => void;
    onComplete: () => void;
}

const QuizFind: React.FC<QuizFindProps> = ({ letter, onBack, onComplete }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const { playSfx, speak } = useAudio();

    const options = ['A', 'B', 'C', 'D'].filter(o => o !== letter.id).slice(0, 3);
    options.push(letter.id);
    const shuffledOptions = options.sort();

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        const correct = option === letter.id;
        setIsCorrect(correct);
        if (correct) {
            playSfx('correct');
            setTimeout(onComplete, 1500);
        } else {
            playSfx('wrong');
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark h-full flex flex-col overflow-hidden select-none animate-fade-in">
            <header className="flex items-center justify-between p-4 pt-6 pb-2 relative z-10 shrink-0">
                <button onClick={() => { playSfx('click'); onBack(); }} className="flex size-12 items-center justify-center rounded-full bg-white dark:bg-surface-dark shadow-sm text-red-400">
                    <span className="material-symbols-outlined text-3xl font-bold">cancel</span>
                </button>
                <h2 className="text-lg font-bold flex-1 text-center">Quiz: Find the Letter</h2>
                <button onClick={() => { playSfx('click'); speak(`Find the letter ${letter.id}`); }} className="flex size-12 items-center justify-center rounded-full bg-primary text-white shadow-md">
                    <span className="material-symbols-outlined filled">volume_up</span>
                </button>
            </header>

            <main className="flex-1 flex flex-col px-4 pb-6 w-full overflow-y-auto overscroll-y-none overflow-x-hidden">
                <div className="flex-1 flex flex-col items-center justify-center py-4">
                    <div className="relative w-full">
                        <div className="bg-surface-light dark:bg-surface-dark w-full rounded-xl shadow-lg p-6 flex flex-col items-center gap-4 border-b-8 border-gray-100 dark:border-gray-900">
                            <h1 className="text-3xl font-bold text-center">
                                Find the letter <span className="text-primary text-5xl inline-block transform translate-y-1">{letter.id}</span>
                            </h1>
                            <div className="w-full aspect-video rounded-lg bg-orange-50 overflow-hidden relative">
                                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${letter.image || 'https://picsum.photos/400/225'}")` }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-2">
                                    <p className="text-white font-bold text-lg flex items-center gap-2">
                                        <span className="material-symbols-outlined">play_circle</span> {letter.id} is for {letter.word}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-500 font-medium text-center">
                                Tap the circle with the letter <strong className="text-primary">{letter.id}</strong> inside!
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4">
                    {shuffledOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className={`btn-bounce group relative aspect-square rounded-full bg-white dark:bg-surface-dark shadow-sm border-4 transition-all flex flex-col items-center justify-center overflow-hidden ${selectedOption === option
                                ? (option === letter.id ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')
                                : 'border-transparent active:border-primary active:bg-orange-50'
                                }`}
                        >
                            <span className={`text-6xl font-bold transition-transform group-active:scale-110 ${selectedOption === option && option === letter.id ? 'text-green-600' : ''}`}>{option}</span>
                            {selectedOption === option && (
                                <span className={`material-symbols-outlined text-4xl mt-1 ${option === letter.id ? 'text-green-500' : 'text-red-500'}`}>
                                    {option === letter.id ? 'check_circle' : 'cancel'}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default QuizFind;
