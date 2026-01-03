import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AudioContextType {
    isMusicEnabled: boolean;
    isSfxEnabled: boolean;
    isVoiceEnabled: boolean;
    toggleMusic: () => void;
    toggleSfx: () => void;
    toggleVoice: () => void;
    playBgm: () => void;
    pauseBgm: () => void;
    playSfx: (type: 'click' | 'success' | 'correct' | 'wrong') => void;
    speak: (text: string) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMusicEnabled, setIsMusicEnabled] = useState(() => localStorage.getItem('bgm') !== 'false');
    const [isSfxEnabled, setIsSfxEnabled] = useState(() => localStorage.getItem('sfx') !== 'false');
    const [isVoiceEnabled, setIsVoiceEnabled] = useState(() => localStorage.getItem('voice') !== 'false');

    // Single shared AudioContext
    const audioCtx = useRef<AudioContext | null>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null); // Keep reference to prevent GC on Android
    const nextNoteTime = useRef<number>(0);
    const timerID = useRef<number | null>(null);
    const melodyIndex = useRef(0);

    // Twinkle Twinkle Little Star Melody
    // formatting: [note_frequency, duration_beats]
    // BPM = 100 -> 1 beat = 0.6s
    const BPM = 90;
    const BEAT_TIME = 60 / BPM;

    const NOTES = {
        C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00,
    };

    const MELODY = [
        [NOTES.C4, 1], [NOTES.C4, 1], [NOTES.G4, 1], [NOTES.G4, 1], [NOTES.A4, 1], [NOTES.A4, 1], [NOTES.G4, 2],
        [NOTES.F4, 1], [NOTES.F4, 1], [NOTES.E4, 1], [NOTES.E4, 1], [NOTES.D4, 1], [NOTES.D4, 1], [NOTES.C4, 2],
        [NOTES.G4, 1], [NOTES.G4, 1], [NOTES.F4, 1], [NOTES.F4, 1], [NOTES.E4, 1], [NOTES.E4, 1], [NOTES.D4, 2],
        [NOTES.G4, 1], [NOTES.G4, 1], [NOTES.F4, 1], [NOTES.F4, 1], [NOTES.E4, 1], [NOTES.E4, 1], [NOTES.D4, 2],
        [NOTES.C4, 1], [NOTES.C4, 1], [NOTES.G4, 1], [NOTES.G4, 1], [NOTES.A4, 1], [NOTES.A4, 1], [NOTES.G4, 2],
        [NOTES.F4, 1], [NOTES.F4, 1], [NOTES.E4, 1], [NOTES.E4, 1], [NOTES.D4, 1], [NOTES.D4, 1], [NOTES.C4, 2],
    ];

    const scheduler = () => {
        if (!audioCtx.current) return;

        // While there are notes that will need to play before the next interval, schedule them
        // and advance the pointer.
        while (nextNoteTime.current < audioCtx.current.currentTime + 0.1) {
            playNote(melodyIndex.current, nextNoteTime.current);
            // Advance beat
            const duration = MELODY[melodyIndex.current][1];
            nextNoteTime.current += duration * BEAT_TIME;

            melodyIndex.current++;
            if (melodyIndex.current >= MELODY.length) {
                melodyIndex.current = 0;
            }
        }
        timerID.current = window.setTimeout(scheduler, 25);
    };

    const playNote = (index: number, time: number) => {
        if (!audioCtx.current) return;
        const osc = audioCtx.current.createOscillator();
        const gain = audioCtx.current.createGain();

        osc.connect(gain);
        gain.connect(audioCtx.current.destination);

        const freq = MELODY[index][0];
        const duration = MELODY[index][1] * BEAT_TIME;

        osc.type = 'sine'; // Soft sine wave
        osc.frequency.value = freq;

        // Envelope
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.05, time + 0.05); // Attack (quieter volume 0.05)
        gain.gain.setValueAtTime(0.05, time + duration - 0.05);
        gain.gain.linearRampToValueAtTime(0, time + duration); // Release

        osc.start(time);
        osc.stop(time + duration);
    };

    // Helper to ensure context exists and is running (must be called from user gesture)
    const unlockAudio = () => {
        if (!audioCtx.current) {
            audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (audioCtx.current.state === 'suspended') {
            audioCtx.current.resume();
        }
    };

    const startBgm = () => {
        // Only start if context exists and is running
        if (!audioCtx.current || audioCtx.current.state !== 'running') return;

        // Reset if just starting
        if (timerID.current === null) {
            nextNoteTime.current = audioCtx.current.currentTime + 0.1;
            melodyIndex.current = 0;
            scheduler();
        }
    };

    const stopBgm = () => {
        if (timerID.current !== null) {
            window.clearTimeout(timerID.current);
            timerID.current = null;
        }
        // We don't close the context, just stop scheduling
    };

    const toggleMusic = () => setIsMusicEnabled(prev => !prev);
    const toggleSfx = () => setIsSfxEnabled(prev => !prev);
    const toggleVoice = () => setIsVoiceEnabled(prev => !prev);

    // BGM Effect: Only tries to start if logic allows.
    // If context is suspended, this will effectively do nothing,
    // and the unlock listener will pick it up later.
    useEffect(() => {
        localStorage.setItem('bgm', String(isMusicEnabled));
        if (isMusicEnabled) {
            startBgm();
        } else {
            stopBgm();
        }
    }, [isMusicEnabled]);

    // Clean up
    useEffect(() => {
        return () => stopBgm();
    }, []);

    useEffect(() => {
        localStorage.setItem('sfx', String(isSfxEnabled));
    }, [isSfxEnabled]);

    useEffect(() => {
        localStorage.setItem('voice', String(isVoiceEnabled));
    }, [isVoiceEnabled]);

    // Warm up TTS engine
    useEffect(() => {
        if (!('speechSynthesis' in window)) return;

        const loadVoices = () => {
            try {
                const voices = window.speechSynthesis.getVoices();
                // Android often needs this call to initialize the engine
            } catch (e) {
                console.warn("Failed to load voices:", e);
            }
        };

        loadVoices();

        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    // Initial Interaction Listener (The "Unlock" Phase)
    useEffect(() => {
        const handleUnlock = () => {
            unlockAudio();
            // If music was supposed to be playing but couldn't, start it now
            if (isMusicEnabled && timerID.current === null) {
                startBgm();
            }

            // Once unlocked, we should be good for the session
            // Removing listeners to avoid re-triggering logic unnecessarily
            if (audioCtx.current?.state === 'running') {
                document.removeEventListener('click', handleUnlock);
                document.removeEventListener('keydown', handleUnlock);
                document.removeEventListener('touchstart', handleUnlock);
            }
        };

        document.addEventListener('click', handleUnlock);
        document.addEventListener('keydown', handleUnlock);
        document.addEventListener('touchstart', handleUnlock); // Important for iOS

        return () => {
            document.removeEventListener('click', handleUnlock);
            document.removeEventListener('keydown', handleUnlock);
            document.removeEventListener('touchstart', handleUnlock);
        };
    }, [isMusicEnabled]);

    const playBgm = () => {
        if (isMusicEnabled) startBgm();
    };

    const pauseBgm = () => {
        stopBgm();
    };

    const playSfx = (type: 'click' | 'success' | 'correct' | 'wrong') => {
        if (!isSfxEnabled) return;

        // Ensure we try to unlock if this is a click event calling us
        unlockAudio();

        if (!audioCtx.current) return;
        const ctx = audioCtx.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        switch (type) {
            case 'click':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;
            case 'success':
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.linearRampToValueAtTime(600, now + 0.1);
                osc.frequency.linearRampToValueAtTime(1000, now + 0.3);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.5);
                osc.start(now);
                osc.stop(now + 0.5);
                break;
            case 'correct':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.linearRampToValueAtTime(900, now + 0.1);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
                break;
            case 'wrong':
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.linearRampToValueAtTime(200, now + 0.2);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
                break;
        }
    };

    const speak = (text: string) => {
        if (!isVoiceEnabled || !('speechSynthesis' in window)) return;

        // Cancel previous *and* clear ref
        try {
            window.speechSynthesis.cancel();
        } catch (e) {
            console.warn("TTS Cancel failed:", e);
        }
        if (utteranceRef.current) {
            utteranceRef.current = null;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        utterance.volume = 1.0; // Explicit volume
        utterance.lang = 'en-US'; // Android requires valid BCP 47 language tag

        // Android Bug Fix: Keep reference alive
        utteranceRef.current = utterance;

        utterance.onend = () => {
            utteranceRef.current = null;
        };
        utterance.onerror = (e) => {
            console.error("TTS Error:", e);
            utteranceRef.current = null;
        };

        window.speechSynthesis.speak(utterance);
    };

    return (
        <AudioContext.Provider value={{
            isMusicEnabled,
            isSfxEnabled,
            isVoiceEnabled,
            toggleMusic,
            toggleSfx,
            toggleVoice,
            playBgm,
            pauseBgm,
            playSfx,
            speak
        }}>
            {children}
        </AudioContext.Provider>
    );
};
