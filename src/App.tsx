import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  return (
    <div className="w-full min-h-screen bg-[#050507] text-[#e0e0e0] font-mono overflow-x-hidden relative flex flex-col p-4 sm:p-8">
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow max-w-7xl mx-auto w-full">
        <div className="col-span-1 lg:col-span-8 flex flex-col">
          <SnakeGame />
        </div>
        
        <div className="col-span-1 lg:col-span-4 flex flex-col pt-4 lg:pt-[104px]">
          <MusicPlayer />
        </div>
      </main>

      <footer className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] tracking-widest opacity-40 flex-wrap gap-4 max-w-7xl mx-auto w-full">
        <div className="flex gap-4 sm:gap-6 uppercase">
          <span>Status: Operating</span>
          <span className="hidden sm:inline">Latency: 14ms</span>
          <span className="hidden sm:inline">Buffers: Optimized</span>
        </div>
        <div className="uppercase">
          &copy; 2026 NEURAL_AUDIO_SYSTEMS
        </div>
      </footer>
    </div>
  );
}
