import { useSnakeGame } from '../hooks/useSnakeGame';

export function SnakeGame() {
  const { snake, food, gameOver, score, isPlaying, resetGame, gridSize } = useSnakeGame();

  const formattedScore = score.toString().padStart(6, '0');
  const maxScore = Math.max(score, 4892).toString().padStart(6, '0');

  return (
    <div className="flex flex-col w-full h-full font-mono">
      {/* Header Navigation from Theme */}
      <header className="flex justify-between items-center border-b border-[#00f3ff]/30 pb-6 mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#00f3ff] rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.5)] shrink-0">
            <div className="w-4 h-4 bg-[#050507] rotate-45"></div>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-[#00f3ff]">SYNTH_SNAKE <span className="text-[#ff00ff]">OS</span></h1>
            <p className="text-[10px] opacity-50 uppercase tracking-[0.2em]">System Version 4.2.0 // Neural Link Active</p>
          </div>
        </div>
        <div className="flex gap-8 sm:gap-12 text-right justify-end grow sm:grow-0">
          <div>
            <p className="text-[10px] opacity-40 uppercase">Session Score</p>
            <p className="text-2xl font-bold text-[#ff00ff]">{formattedScore}</p>
          </div>
          <div>
            <p className="text-[10px] opacity-40 uppercase">High Record</p>
            <p className="text-2xl font-bold text-[#00f3ff]">{maxScore}</p>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <section className="flex flex-col items-center flex-grow justify-center relative">
        <div className="w-full aspect-square max-h-[60vh] max-w-[60vh] bg-[#0a0a0f] border-2 border-white/10 relative overflow-hidden flex-shrink-0">
          
          {/* Game Grid Background */}
          <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(20,minmax(0,1fr))] opacity-10 pointer-events-none">
            {Array.from({ length: 400 }).map((_, i) => (
              <div key={`bg-${i}`} className="w-full h-full border-r border-b border-white/20"></div>
            ))}
          </div>

          {/* Setup Game grid dynamically */}
          <div 
            className="absolute inset-0 grid"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              gridTemplateRows: `repeat(${gridSize}, 1fr)`
            }}
          >
            {Array.from({ length: gridSize * gridSize }).map((_, i) => {
              const x = i % gridSize;
              const y = Math.floor(i / gridSize);
              
              const isSnake = snake.some(s => s.x === x && s.y === y);
              const isHead = snake[0].x === x && snake[0].y === y;
              const isFood = food.x === x && food.y === y;

              return (
                <div 
                  key={i}
                  className={`flex items-center justify-center
                    ${isHead ? 'bg-[#00f3ff] shadow-[0_0_10px_#00f3ff] z-10' : ''}
                    ${isSnake && !isHead ? 'bg-[#00f3ff] shadow-[0_0_10px_#00f3ff] opacity-70 z-10' : ''}
                    ${isFood ? 'bg-[#ff00ff] shadow-[0_0_20px_#ff00ff] rounded-full z-10' : ''}
                  `}
                >
                  {isFood && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>}
                </div>
              );
            })}
          </div>

          {(!isPlaying && !gameOver) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20">
              <button 
                onClick={resetGame}
                className="px-6 py-4 border border-[#00f3ff] text-[#00f3ff] bg-[#00f3ff]/5 hover:bg-[#00f3ff]/20 transition-all cursor-pointer font-bold uppercase tracking-widest text-sm"
              >
                INITIALIZE GAME
              </button>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050507]/90 backdrop-blur-sm z-20">
              <div className="text-[#ff00ff] text-2xl font-black mb-2 tracking-widest uppercase text-shadow">
                COLLISION DETECTED
              </div>
              <div className="text-white text-xs sm:text-sm mb-8 opacity-60 uppercase tracking-widest text-center px-4">
                Session Terminated at Length: {snake.length}
              </div>
              <button 
                onClick={resetGame}
                className="px-6 py-3 border border-[#00f3ff]/50 text-[#00f3ff] bg-[#00f3ff]/10 hover:bg-[#00f3ff]/30 transition-all cursor-pointer uppercase text-sm font-bold tracking-widest flex items-center gap-3 group"
              >
                <div className="w-2 h-2 bg-[#00f3ff] group-hover:animate-ping"></div>
                REBOOT SEQUENCE
              </button>
            </div>
          )}
          
          <div className="absolute bottom-2 right-2 text-[8px] opacity-30 tracking-widest">
            X: {(snake[0].x * 10).toFixed(2)} Y: {(snake[0].y * 10).toFixed(2)}
          </div>
        </div>
        
        {/* Game Stats Bottom Block */}
        <div className="mt-8 p-4 border border-[#ff00ff]/30 bg-[#ff00ff]/5 w-full max-w-[60vh] m-auto flex flex-col sm:flex-row gap-4 sm:justify-between items-start sm:items-center">
            <div>
              <p className="text-[10px] text-[#ff00ff] uppercase font-bold mb-1">Game Stats</p>
              <div className="text-[10px] opacity-60 uppercase tracking-widest">&gt; Control: W,A,S,D / ARROWS</div>
            </div>
            <div className="flex gap-6 w-full sm:w-auto">
              <div className="flex flex-col text-xs">
                <span className="opacity-60 mb-1">Length:</span>
                <span className="font-bold">{snake.length} Units</span>
              </div>
              <div className="flex flex-col text-xs">
                <span className="opacity-60 mb-1">Speed:</span>
                <span className="font-bold">2.4 Mach</span>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
}
