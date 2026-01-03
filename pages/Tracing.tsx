
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { LetterData } from '../types';

import { useAudio } from '../context/AudioContext';

interface TracingProps {
  letter: LetterData;
  onBack: () => void;
  onComplete: () => void;
  themeColor: string;
}

const Tracing: React.FC<TracingProps> = ({ letter, onBack, onComplete, themeColor }) => {
  const { playSfx, speak } = useAudio();
  const [progress, setProgress] = useState(0);
  const [isTracing, setIsTracing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPos = useRef<{ x: number, y: number } | null>(null);

  // Initialize canvas with letter outline - defined as reusable function
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and setup
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over'; // Reset composite mode
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Draw background letter (The Mask)
    // We only draw the filled letter now for a precise fit ("fill out fit")
    // The previous stroke made it "fat" and bleed into gaps.
    ctx.font = 'bold 180px Lexend';
    ctx.fillStyle = '#e5e7eb'; // Gray-200
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter.upper, 150, 150);

    // Set composite mode to 'source-atop'
    // This ensures new strokes (Source) only appear where they overlap existing content
    ctx.globalCompositeOperation = 'source-atop';

    // Create a pattern for the stroke ("drawn as pattern")
    const patternCanvas = document.createElement('canvas');
    patternCanvas.width = 20;
    patternCanvas.height = 20;
    const pCtx = patternCanvas.getContext('2d');
    if (pCtx) {
      pCtx.fillStyle = themeColor; // Primary Theme Color
      pCtx.fillRect(0, 0, 20, 20);
      pCtx.fillStyle = 'rgba(255, 255, 255, 0.3)'; // Semi-transparent white stripes
      pCtx.beginPath();
      // Draw stripes
      pCtx.moveTo(0, 20);
      pCtx.lineTo(20, 0);
      pCtx.lineTo(20, 5);
      pCtx.lineTo(5, 20);
      pCtx.fill();

      const pattern = ctx.createPattern(patternCanvas, 'repeat');
      if (pattern) ctx.strokeStyle = pattern;
      else ctx.strokeStyle = themeColor;
    } else {
      ctx.strokeStyle = themeColor;
    }

    // Larger brush to make filling easier
    ctx.lineWidth = 60;
  }, [letter, themeColor]);

  // Initial load
  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsTracing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    lastPos.current = {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const handlePointerUp = () => {
    setIsTracing(false);
    lastPos.current = null;
    // Auto-complete if they drew enough
    if (progress > 50) setProgress(100);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isTracing || !lastPos.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const currentX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const currentY = (e.clientY - rect.top) * (canvas.height / rect.height);

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(currentX, currentY);
    // Stroke style is already set in init, but safe to re-apply if needed (though context persists)
    ctx.stroke();

    lastPos.current = { x: currentX, y: currentY };

    // Simple progress simulation: just increment a bit on move
    setProgress(prev => Math.min(100, prev + 0.5));
  };

  const resetCanvas = () => {
    setProgress(0);
    initCanvas();
  };

  useEffect(() => {
    if (progress === 100) {
      playSfx('success');
      setTimeout(onComplete, 1000);
    }
  }, [progress, onComplete, playSfx]);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark">
      <div className="flex items-center justify-between p-4 pt-6 pb-2 z-10">
        <button
          onClick={() => { playSfx('click'); onBack(); }}
          className="flex size-12 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark shadow-sm hover:bg-gray-100 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark"></div>
          <div className="h-3 w-3 rounded-full bg-gray-300"></div>
          <div className="h-3 w-3 rounded-full bg-gray-300"></div>
        </div>
        <button
          onClick={() => { playSfx('click'); speak(`Trace the letter ${letter.id}`); }}
          className="flex size-12 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark shadow-sm text-primary">
          <span className="material-symbols-outlined text-2xl filled">volume_up</span>
        </button>
      </div>

      <div className="px-4 py-2 text-center z-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Trace the letter <span className="text-primary text-4xl align-middle">{letter.id}</span>
        </h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative p-6 w-full cursor-crosshair touch-none">
        <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center bg-white dark:bg-surface-dark rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="touch-none rounded-2xl"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          />
          {!isTracing && progress === 0 && (
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-bounce">
              <span className="material-symbols-outlined text-primary/50 text-6xl">touch_app</span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full p-4 pb-8 flex flex-col gap-4">
        <div className="flex items-center gap-4 bg-surface-light dark:bg-surface-dark p-3 pr-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="relative shrink-0 w-16 h-16 rounded-2xl overflow-hidden bg-primary/20 flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
            <span className="material-symbols-outlined text-primary text-4xl filled">face_6</span>
          </div>
          <div className="flex flex-col flex-1">
            <p className="text-lg font-bold leading-tight">Keep going!</p>
            <p className="text-gray-500 text-sm">Trace the letter to continue!</p>
          </div>
          <span className={`material-symbols-outlined text-yellow-400 text-2xl filled ${progress === 100 ? 'animate-spin-slow' : ''}`}>star</span>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-3 mt-2">
          <button
            onClick={resetCanvas}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">refresh</span>
          </button>
          <button
            onClick={onComplete}
            disabled={progress < 100}
            className={`flex items-center justify-center h-14 rounded-full text-white text-lg font-bold shadow-lg transition-all active:scale-95 ${progress === 100
              ? 'bg-primary shadow-primary/30 hover:bg-primary-hover'
              : 'bg-gray-300 cursor-not-allowed shadow-none'
              }`}
          >
            <span>Continue</span>
            <span className="material-symbols-outlined ml-2 text-2xl">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tracing;
