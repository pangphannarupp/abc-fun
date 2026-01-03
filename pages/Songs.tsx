
import React, { useState } from 'react';
import { SONGS } from '../constants';
import { Screen, Song } from '../types';
import Navigation from '../components/Navigation';

interface SongsProps {
  onBack: () => void;
  navigateTo: (screen: Screen) => void;
}

const Songs: React.FC<SongsProps> = ({ onBack, navigateTo }) => {
  const [currentSong, setCurrentSong] = useState<Song>(SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  // Reset/Auto-play when song changes
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSong.audioUrl || '';
      setCurrentTime(0);
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Playback failed", e));
      }
    }
  }, [currentSong]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative flex h-full flex-col overflow-x-hidden">
      <audio
        ref={audioRef}
        loop
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <div className="sticky top-0 z-20 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between">
        <button
          onClick={() => { setIsPlaying(false); onBack(); }}
          className="group flex size-12 items-center justify-center rounded-full bg-white dark:bg-surface-dark shadow-sm hover:bg-gray-50 transition-all border border-gray-100"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-xl font-bold flex-1 text-center pr-12">Music Time 🎵</h2>
      </div>

      <main className="flex-1 overflow-y-auto overscroll-y-contain pb-32 scrollbar-hide">
        <div className="px-5 py-4 w-full">
          <div className="flex flex-col gap-4 rounded-lg bg-primary shadow-xl shadow-primary/30 px-6 py-6 relative overflow-hidden transition-transform hover:scale-[1.01]">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/10 to-transparent"></div>

            <div className="relative z-10 flex flex-col items-center text-center gap-4">
              <div
                className={`aspect-square bg-cover bg-center rounded-lg size-44 shadow-lg border-4 border-white/30 transition-transform duration-[4s] ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}
                style={{ backgroundImage: `url("${currentSong.image}")` }}
              ></div>

              <div className="w-full mt-2">
                <p className="text-text-light text-2xl font-bold truncate">{currentSong.title}</p>
                <p className="text-text-light/70 text-base font-medium mt-1 truncate">{currentSong.artist}</p>
              </div>

              <div className="w-full pt-2 px-2">
                <div className="flex h-3 items-center bg-text-light/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-text-light rounded-full transition-all duration-300 ease-linear"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-text-light/60 text-xs font-bold uppercase tracking-wider">{formatTime(currentTime)}</p>
                  <p className="text-text-light/60 text-xs font-bold uppercase tracking-wider">{currentSong.duration}</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-8 mt-2">
                <button className="text-text-light/60 hover:text-text-light active:scale-90">
                  <span className="material-symbols-outlined text-[36px]">skip_previous</span>
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex size-20 items-center justify-center rounded-full bg-text-light text-primary shadow-xl hover:scale-105 active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined text-[44px] ml-1 filled">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <button className="text-text-light/60 hover:text-text-light active:scale-90">
                  <span className="material-symbols-outlined text-[36px]">skip_next</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <h2 className="tracking-tight text-2xl font-bold px-6 pb-3 pt-2">Sing-Along List</h2>
        <div className="flex flex-col gap-4 px-5">
          {SONGS.map(song => (
            <button
              key={song.id}
              onClick={() => {
                setCurrentSong(song);
                setIsPlaying(true);
              }}
              className="group flex items-center gap-4 bg-surface-light dark:bg-surface-dark p-3.5 rounded-lg shadow-sm border border-transparent hover:border-primary/20 active:scale-[0.98] transition-all"
            >
              <div
                className="aspect-square bg-cover bg-center rounded-full h-16 w-16 shrink-0 border-2 border-background-light"
                style={{ backgroundImage: `url("${song.image}")` }}
              ></div>
              <div className="flex flex-col flex-1 overflow-hidden text-left">
                <p className="text-lg font-bold truncate">{song.title}</p>
                <span className="inline-flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  <span className="text-xs font-medium uppercase tracking-wide">{song.duration}</span>
                </span>
              </div>
              <div className="shrink-0 flex items-center justify-center size-12 rounded-full bg-background-light text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined filled">play_circle</span>
              </div>
            </button>
          ))}
        </div>
      </main>

      <Navigation currentScreen={Screen.SONGS} onNavigate={navigateTo} />
    </div>
  );
};

export default Songs;
