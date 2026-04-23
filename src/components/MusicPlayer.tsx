import { useState, useRef, useEffect } from 'react';

const TRACKS = [
  { id: 1, title: 'SYNTHETIC_DREAMS', producer: 'SYNTH-AI', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 2, title: 'NEURO_GRID_CHASE', producer: 'GLITCH-GEN', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
  { id: 3, title: 'MAINFRAME_BREACH', producer: 'WAVE-LLM', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3' },
];

export function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const track = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const dur = audioRef.current.duration;
      setCurrentTime(current);
      setDuration(dur || 0);
      setProgress(dur ? (current / dur) * 100 : 0);
    }
  };

  const skipNext = () => setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  const skipPrev = () => setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  const togglePlay = () => setIsPlaying(!isPlaying);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full font-mono">
      {/* Audio Queue section */}
      <div>
        <h2 className="text-xs font-bold text-[#00f3ff] mb-4 border-l-2 border-[#00f3ff] pl-2 uppercase tracking-widest">Audio Queue</h2>
        <div className="space-y-2">
          {TRACKS.map((t, idx) => {
            const isCurrent = idx === currentTrackIndex;
            return (
              <button 
                key={t.id}
                onClick={() => {
                  setCurrentTrackIndex(idx);
                  setIsPlaying(true);
                }}
                className={`w-full text-left p-3 flex justify-between items-center transition-all cursor-pointer ${
                  isCurrent 
                    ? 'bg-[#00f3ff]/10 border border-[#00f3ff]/20 opacity-100' 
                    : 'bg-white/5 border border-white/10 opacity-60 hover:opacity-100'
                }`}
              >
                <div>
                  <p className={`text-sm font-bold ${isCurrent ? 'text-[#00f3ff]' : 'text-white'}`}>{t.title}</p>
                  <p className="text-[10px] opacity-50 uppercase mt-0.5">PROD. {t.producer}</p>
                </div>
                {isCurrent && isPlaying ? (
                  <div className="w-2 h-2 bg-[#00f3ff] animate-pulse"></div>
                ) : (
                  <span className="text-[10px] uppercase">{formatTime(idx * 73 + 120)}</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Visualizer & Now Playing */}
      <div className="flex-grow border border-white/10 bg-black/40 p-4 flex flex-col mt-4 sm:mt-auto">
        <audio ref={audioRef} src={track.url} onTimeUpdate={handleTimeUpdate} onEnded={skipNext} preload="auto" />
        <h2 className="text-xs font-bold text-[#ff00ff] mb-6 border-l-2 border-[#ff00ff] pl-2 uppercase tracking-widest">Audio Spectrum</h2>
        
        <div className="flex items-end justify-between h-20 sm:h-32 px-2 sm:px-4 mb-4">
          {[40, 60, 90, 70, 40, 20, 50, 80, 30, 90].map((height, i) => (
            <div 
              key={i} 
              className={`w-1 transition-all duration-300 ${i % 3 === 0 ? 'bg-[#ff00ff]' : 'bg-[#00f3ff]'}`}
              style={{ height: isPlaying ? `${Math.random() * 50 + height/2}%` : '4px' }}
            ></div>
          ))}
        </div>

        <div className="mt-auto">
          <p className="text-[10px] opacity-40 uppercase mb-2">Currently Playing</p>
          <p className="text-sm sm:text-lg font-black text-white leading-tight truncate uppercase">{track.title}</p>
          <div className="w-full h-1 bg-white/10 mt-4 overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full bg-[#00f3ff]" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex justify-between text-[8px] mt-1 opacity-50 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex gap-2 h-12 shrink-0">
        <button onClick={skipPrev} className="flex-1 h-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00f3ff]/20 group transition-all cursor-pointer">
          <div className="flex items-center">
            <div className="w-1 h-3 bg-white group-hover:bg-[#00f3ff] mr-1 transition-colors"></div>
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-r-[10px] border-r-white group-hover:border-r-[#00f3ff] border-b-[6px] border-b-transparent transition-colors"></div>
          </div>
        </button>
        
        <button onClick={togglePlay} className={`flex-1 h-full flex items-center justify-center transition-all cursor-pointer ${isPlaying ? 'bg-[#00f3ff] shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:bg-[#00f3ff]/80 text-[#050507]' : 'bg-white/5 border border-white/10 hover:bg-[#00f3ff]/20 group'}`}>
          {isPlaying ? (
            <div className="flex gap-1.5">
              <div className="w-2 h-5 bg-[#050507]"></div>
              <div className="w-2 h-5 bg-[#050507]"></div>
            </div>
          ) : (
            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white group-hover:border-l-[#00f3ff] border-b-[8px] border-b-transparent ml-2 transition-colors"></div>
          )}
        </button>

        <button onClick={skipNext} className="flex-1 h-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00f3ff]/20 group transition-all cursor-pointer">
          <div className="flex items-center">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white group-hover:border-l-[#00f3ff] border-b-[6px] border-b-transparent transition-colors"></div>
            <div className="w-1 h-3 bg-white group-hover:bg-[#00f3ff] ml-1 transition-colors"></div>
          </div>
        </button>
      </div>
    </div>
  );
}
