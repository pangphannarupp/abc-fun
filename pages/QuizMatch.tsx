import React, { useState, useRef, useEffect } from 'react';
import { LetterData } from '../types';
import { useAudio } from '../context/AudioContext';
import { ALPHABET } from '../constants';

interface QuizMatchProps {
    letter: LetterData;
    onBack: () => void;
    onComplete: () => void;
    themeColor: string;
}

const QuizMatch: React.FC<QuizMatchProps> = ({ letter, onBack, onComplete, themeColor }) => {
    const { playSfx, speak } = useAudio();
    const [options, setOptions] = useState<LetterData[]>([]);


    // Dragging State
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 }); // Visual offset from original position

    // Game State
    const [isMatched, setIsMatched] = useState(false);
    const [showHint, setShowHint] = useState(false);

    // Animation State
    const [guidePath, setGuidePath] = useState<{ startX: number, startY: number, endX: number, endY: number } | null>(null);
    // Track animation step purely in JS to avoid Keyframe CSS issues on some WebViews
    const [animStep, setAnimStep] = useState(0);

    const targetRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<Map<string, HTMLDivElement>>(new Map());
    const dragStartCoords = useRef({ x: 0, y: 0 });

    // Initialize Game
    useEffect(() => {
        try {
            // 1. Get distractors
            const others = ALPHABET.filter(l => l.id !== letter.id);
            const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 2);

            // 2. Mix with correct answer
            const all = [letter, ...shuffledOthers].sort(() => 0.5 - Math.random());
            setOptions(all);

            // 3. Reset state
            setIsMatched(false);
            setDraggingId(null);
            setDragOffset({ x: 0, y: 0 });

            speak(`Drag the small ${letter.lower} to the big ${letter.upper}!`);

            // 4. Delay hint
            const hintTimer = setTimeout(() => setShowHint(true), 2000);

            return () => clearTimeout(hintTimer);
        } catch (e) {
            console.error("Error initializing QuizMatch", e);
        }
    }, [letter]);

    // Calculate Guide Path safely
    useEffect(() => {
        if (!options.length) return;

        const calculatePath = () => {
            const targetEl = targetRef.current;
            const correctEl = optionsRef.current.get(letter.id);

            if (targetEl && correctEl) {
                try {
                    const targetRect = targetEl.getBoundingClientRect();
                    const correctRect = correctEl.getBoundingClientRect();

                    // We need these relative to the screen to position "fixed" element
                    setGuidePath({
                        startX: correctRect.left + correctRect.width / 2,
                        startY: correctRect.top + correctRect.height / 2,
                        endX: targetRect.left + targetRect.width / 2,
                        endY: targetRect.top + targetRect.height / 2
                    });
                } catch (e) {
                    console.error("Failed to calculate path", e);
                }
            }
        };

        const timer = setTimeout(calculatePath, 500);
        window.addEventListener('resize', calculatePath);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', calculatePath);
        };
    }, [options, letter, showHint]);

    // Simple JS Animation Loop for the Guide Hand
    useEffect(() => {
        if (!showHint || !guidePath || draggingId || isMatched) {
            setAnimStep(0);
            return;
        }

        let step = 0;
        const interval = setInterval(() => {
            step = (step + 1) % 100;
            setAnimStep(step);
        }, 30); // ~30fps

        return () => clearInterval(interval);
    }, [showHint, guidePath, draggingId, isMatched]);


    const handlePointerDown = (e: React.PointerEvent, id: string) => {
        if (isMatched) return;
        setDraggingId(id);

        // Safety check for pointer capture support
        try {
            e.currentTarget.setPointerCapture(e.pointerId);
        } catch (err) {
            console.warn("Pointer capture not supported", err);
        }

        dragStartCoords.current = { x: e.clientX, y: e.clientY };
        setDragOffset({ x: 0, y: 0 });
        setShowHint(false);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!draggingId) return;
        const dx = e.clientX - dragStartCoords.current.x;
        const dy = e.clientY - dragStartCoords.current.y;
        setDragOffset({ x: dx, y: dy });
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        if (!draggingId) return;

        const draggedEl = optionsRef.current.get(draggingId);
        const targetEl = targetRef.current;

        if (draggedEl && targetEl) {
            const dragRect = draggedEl.getBoundingClientRect();
            const targetRect = targetEl.getBoundingClientRect();

            const dragCenter = { x: dragRect.left + dragRect.width / 2, y: dragRect.top + dragRect.height / 2 };
            const targetCenter = { x: targetRect.left + targetRect.width / 2, y: targetRect.top + targetRect.height / 2 };

            const distance = Math.hypot(dragCenter.x - targetCenter.x, dragCenter.y - targetCenter.y);

            if (distance < 100) {
                // Check if correct
                if (draggingId === letter.id) {
                    setIsMatched(true);
                    playSfx('correct');
                    playSfx('success');
                    setDragOffset({ x: 0, y: 0 }); // Reset visual transform, let logic hiding handle it
                    setTimeout(onComplete, 2000);
                } else {
                    playSfx('wrong');
                    setDraggingId(null);
                    setDragOffset({ x: 0, y: 0 });
                }
            } else {
                // Snapped back
                setDraggingId(null);
                setDragOffset({ x: 0, y: 0 });
            }
        }

        try {
            e.currentTarget.releasePointerCapture(e.pointerId);
        } catch (err) {
            // Ignore capture errors on release
        }

        if (!isMatched) setDraggingId(null);
    };

    // Calculate interpolated position for guide hand
    const getGuideStyle = () => {
        if (!guidePath) return {};
        // Simple linear interpolation based on animStep (0-100)
        // 0-20: Fade In at Start
        // 20-60: Move to End
        // 60-80: Stay at End
        // 80-100: Fade Out

        let x = guidePath.startX;
        let y = guidePath.startY;
        let opacity = 0;
        let scale = 1;

        if (animStep < 20) {
            opacity = animStep / 20;
        } else if (animStep < 60) {
            opacity = 1;
            const progress = (animStep - 20) / 40; // 0 to 1
            x = guidePath.startX + (guidePath.endX - guidePath.startX) * progress;
            y = guidePath.startY + (guidePath.endY - guidePath.startY) * progress;
            scale = 1 - (progress * 0.1); // Slight shrink
        } else if (animStep < 80) {
            opacity = 1;
            x = guidePath.endX;
            y = guidePath.endY;
            scale = 0.9;
        } else {
            opacity = 1 - ((animStep - 80) / 20);
            x = guidePath.endX;
            y = guidePath.endY;
        }

        return {
            transform: `translate(${x}px, ${y}px) scale(${scale})`,
            opacity: opacity,
            top: 0,
            left: 0
        };
    };

    if (!letter) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="bg-background-light dark:bg-background-dark h-full flex flex-col overflow-hidden select-none animate-fade-in touch-none relative">
            <header className="flex items-center justify-between p-4 pt-6 pb-2 relative z-10 shrink-0">
                <button onClick={() => { playSfx('click'); onBack(); }} className="flex size-12 items-center justify-center rounded-full bg-white dark:bg-surface-dark shadow-sm text-red-400">
                    <span className="material-symbols-outlined text-3xl font-bold">cancel</span>
                </button>
                <div className="flex-1 flex flex-col items-center">
                    <h2 className="text-lg font-bold text-center">Quiz: Match the Pair!</h2>
                    <p className="text-xs text-gray-500 font-bold">Drag to match</p>
                </div>
                <button onClick={() => { playSfx('click'); speak(`Drag the small ${letter.lower} to the big ${letter.upper}`); }} className="flex size-12 items-center justify-center rounded-full bg-primary text-white shadow-md">
                    <span className="material-symbols-outlined filled">volume_up</span>
                </button>
            </header>

            <main className="flex-1 flex flex-col items-center justify-around w-full relative pb-10">

                {/* Target Zone */}
                <div
                    ref={targetRef}
                    className={`w-40 h-40 sm:w-56 sm:h-56 rounded-3xl border-4 border-dashed flex items-center justify-center transition-all duration-300 ${isMatched ? 'border-green-500 bg-green-100 scale-110' : 'border-gray-300 bg-white/50'}`}
                >
                    <span className={`text-8xl sm:text-9xl font-black ${isMatched ? 'text-green-600' : 'text-gray-300'}`}>{letter.upper}</span>
                </div>

                {/* Draggables Row */}
                <div className="flex flex-wrap gap-4 sm:gap-8 justify-center items-center w-full px-4 min-h-[160px]">
                    {options.map((opt) => {
                        const isDraggingThis = draggingId === opt.id;
                        const isCorrect = opt.id === letter.id;

                        // Hide correct one if matched
                        if (isMatched && isCorrect) return null;

                        return (
                            <div
                                key={opt.id}
                                ref={(el) => { if (el) optionsRef.current.set(opt.id, el); }}
                                onPointerDown={(e) => handlePointerDown(e, opt.id)}
                                onPointerMove={handlePointerMove}
                                onPointerUp={handlePointerUp}
                                style={{
                                    transform: isDraggingThis ? `translate(${dragOffset.x}px, ${dragOffset.y}px)` : 'none',
                                    touchAction: 'none',
                                    cursor: 'grab',
                                    zIndex: isDraggingThis ? 50 : 1,
                                    position: 'relative' // Keeps layout space
                                }}
                                className={`
                                    w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-lg flex items-center justify-center
                                    bg-white border-4 border-primary
                                    transition-transform duration-75 select-none
                                    ${isDraggingThis ? 'scale-110 shadow-2xl rotate-3' : 'active:scale-95'}
                                `}
                            >
                                <span className="text-5xl sm:text-6xl font-bold text-primary">{opt.lower}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Guide Animation Overlay (JS Based) */}
                {showHint && guidePath && !draggingId && !isMatched && (
                    <div
                        className="fixed z-50 pointer-events-none"
                        style={getGuideStyle()}
                    >
                        <div
                            className="bg-white/90 dark:bg-gray-700/90 p-3 rounded-full shadow-xl border-2 border-white dark:border-gray-600 -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm"
                        >
                            <span
                                className="material-symbols-outlined text-4xl text-gray-900 dark:text-white transform rotate-[0deg]"
                            >
                                touch_app
                            </span>
                        </div>
                    </div>
                )}

                {/* Result Message */}
                <div className={`absolute bottom-4 transition-all duration-500 ${isMatched ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="bg-green-500 text-white px-6 py-2 rounded-full shadow-lg font-bold text-xl animate-bounce">
                        Match Found!
                    </div>
                </div>

            </main>
        </div>
    );
};

export default QuizMatch;
