
import React from 'react';

interface WelcomeProps {
  onPlay: () => void;
  onSettings: () => void;
  onProfile: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onPlay, onSettings, onProfile }) => {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="floating-shape top-[-5%] left-[-10%] text-primary text-[200px] rotate-[-15deg] font-bold select-none">A</div>
      <div className="floating-shape bottom-[10%] right-[-5%] text-primary text-[150px] rotate-[20deg] font-bold select-none">B</div>
      <div className="floating-shape top-[40%] left-[-5%] size-32 rounded-full bg-primary/20 blur-xl"></div>

      <div className="relative z-10 flex items-center p-4 pb-2 justify-between">
        <button
          onClick={onProfile}
          className="flex size-12 items-center justify-center rounded-full bg-white dark:bg-white/10 shadow-sm text-primary transition-transform active:scale-95"
        >
          <span className="material-symbols-outlined text-[32px]">child_care</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">ABC Fun</h2>
        <div className="flex w-12 items-center justify-end">
          <button
            onClick={onSettings}
            className="flex size-12 items-center justify-center rounded-full bg-white dark:bg-white/10 shadow-sm text-text-light dark:text-text-dark transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined text-[24px]">settings</span>
          </button>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center w-full px-4 overflow-y-auto">
        <div className="w-full max-w-sm mb-6 px-10">
          <div className="w-full aspect-square relative flex flex-col justify-end overflow-hidden rounded-full bg-white dark:bg-white/5 border-4 border-white dark:border-white/10 shadow-lg ring-4 ring-primary/20">
            <div
              className="absolute inset-0 bg-center bg-no-repeat bg-cover animate-pulse-slow"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDnusKEIjbSAvWdQZ42gtq2Cry12ldr2y0vtfCOjZR57IqL2msRYTOGf51-0f1vC2BDMJ-SZDPgXModRyK0IvoV0iRacrYVTlRFlWNh-u5lg4-aAfgtSEJVwW6insacIhpFzHqy5-TYfKyaB7GIWO47_AhnXXfxQTJ0Q9HMOeYtLBMRqRd0xo7ePRsw10oe7q4p5Em_Ta4mfG9JhQqkU8bDafChcVLYNzITVUnaFR1qINhajU42Pb5_E3IepbCvT0o1b-xXR4LicZkB")' }}
            ></div>
          </div>
        </div>

        <h1 className="tracking-tight text-[36px] font-extrabold leading-tight px-4 text-center pb-2 drop-shadow-sm">
          Welcome to <br /><span className="text-primary">ABC Fun!</span>
        </h1>
        <p className="text-text-light/70 dark:text-text-dark/70 text-lg font-medium leading-normal pb-8 px-8 text-center max-w-xs">
          Let's learn letters, play games, and have a blast together!
        </p>
      </div>

      <div className="relative z-10 pb-10 pt-4 px-6 w-full flex justify-center bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark">
        <button
          onClick={onPlay}
          className="flex w-full max-w-xs cursor-pointer items-center justify-center rounded-full h-16 px-8 bg-primary hover:bg-primary-hover text-[#1c160d] text-xl font-black shadow-xl hover:-translate-y-1 transition-all duration-300 group"
        >
          <span className="mr-3">PLAY</span>
          <span className="material-symbols-outlined text-[32px] group-hover:translate-x-1 transition-transform">play_circle</span>
        </button>
      </div>
    </div>
  );
};

export default Welcome;
