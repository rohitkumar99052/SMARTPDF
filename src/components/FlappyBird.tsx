import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRAVITY = 0.5;
const JUMP = -8;
const PIPE_SPEED = 4;
const PIPE_WIDTH = 60;
const PIPE_GAP = 170;
const OBSTACLE_SPAWN_RATE = 100; // Frames between pipe spawns

export default function FlappyBird() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const [birdPos, setBirdPos] = useState(250);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState<{ x: number, topHeight: number, passed: boolean }[]>([]);
  
  const requestRef = useRef<number>();
  const frameCountRef = useRef<number>(0);

  const startGame = () => {
    setBirdPos(250);
    setBirdVelocity(0);
    setPipes([]);
    setScore(0);
    setGameState('playing');
    frameCountRef.current = 0;
  };

  const jump = useCallback(() => {
    if (gameState === 'playing') {
      setBirdVelocity(JUMP);
    } else if (gameState === 'menu' || gameState === 'gameover') {
      startGame();
    }
  }, [gameState]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === 'Enter') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  const updateGame = useCallback(() => {
    if (gameState !== 'playing') return;

    setBirdPos((v) => {
      let newPos = v + birdVelocity;
      // Floor collision
      if (newPos > 460) {
        newPos = 460;
        setGameState('gameover');
      }
      return newPos;
    });

    setBirdVelocity((v) => v + GRAVITY);

    setPipes((currentPipes) => {
      let newPipes = currentPipes
        .map(p => ({ ...p, x: p.x - PIPE_SPEED }))
        .filter(p => p.x + PIPE_WIDTH > 0);

      // Add new pipe
      if (frameCountRef.current % OBSTACLE_SPAWN_RATE === 0) {
        const minPipeHeight = 50;
        const maxPipeHeight = 400 - PIPE_GAP - minPipeHeight;
        const topHeight = Math.floor(Math.random() * maxPipeHeight) + minPipeHeight;
        newPipes.push({ x: 400, topHeight, passed: false });
      }

      return newPipes;
    });

    frameCountRef.current++;
    requestRef.current = requestAnimationFrame(updateGame);
  }, [gameState, birdVelocity]);

  // Handle collision and scoring separately to use updated state
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    let isColliding = false;
    let scoreGained = 0;

    const BIRD_SIZE = 30; // approx

    pipes.forEach((p) => {
      // Check collision
      const hitHorizontal = 50 + BIRD_SIZE > p.x && 50 < p.x + PIPE_WIDTH;
      const hitTopVertical = birdPos < p.topHeight;
      const hitBottomVertical = birdPos + BIRD_SIZE > p.topHeight + PIPE_GAP;

      if (hitHorizontal && (hitTopVertical || hitBottomVertical)) {
        isColliding = true;
      }

      // Check passing
      if (!p.passed && p.x + PIPE_WIDTH < 50) {
        p.passed = true;
        scoreGained++;
      }
    });

    if (isColliding) {
      setGameState('gameover');
    } else if (scoreGained > 0) {
      setScore(s => s + scoreGained);
    }
  }, [pipes, birdPos, gameState]);

  useEffect(() => {
    if (gameState === 'gameover') {
      setHighScore(prev => Math.max(prev, score));
    }
  }, [gameState, score]);

  useEffect(() => {
    if (gameState === 'playing') {
      requestRef.current = requestAnimationFrame(updateGame);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState, updateGame]);

  return (
    <div className="w-full flex justify-center py-8">
      <div 
        className="relative w-[400px] h-[500px] bg-sky-300 rounded-2xl overflow-hidden shadow-2xl overflow-hidden cursor-pointer touch-none"
        onClick={jump}
      >
        {/* Sky / Background elements could go here */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-green-500 border-t-8 border-green-600 z-10" />

        {/* Bird */}
        <div 
          className="absolute left-[50px] w-[30px] h-[30px] bg-yellow-400 border-2 border-orange-500 rounded-full z-20 transition-transform"
          style={{ 
            top: birdPos + 'px', 
            transform: `rotate(${Math.min(birdVelocity * 4, 90)}deg)` 
          }}
        >
          <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full">
            <div className="absolute right-0 top-1 w-1 h-1 bg-black rounded-full" />
          </div>
          <div className="absolute -right-2 top-3 w-4 h-2 bg-orange-500 rounded-full" />
        </div>

        {/* Pipes */}
        {pipes.map((pipe, i) => (
          <React.Fragment key={i}>
            {/* Top Pipe */}
            <div 
              className="absolute bg-green-500 border-4 border-green-700"
              style={{
                left: pipe.x + 'px',
                top: 0,
                width: PIPE_WIDTH + 'px',
                height: pipe.topHeight + 'px'
              }}
            >
              <div className="absolute bottom-0 -left-1 -right-1 h-6 bg-green-500 border-4 border-green-700" />
            </div>
            
            {/* Bottom Pipe */}
            <div 
              className="absolute bg-green-500 border-4 border-green-700"
              style={{
                left: pipe.x + 'px',
                top: pipe.topHeight + PIPE_GAP + 'px',
                width: PIPE_WIDTH + 'px',
                bottom: '48px' // above the floor
              }}
            >
              <div className="absolute top-0 -left-1 -right-1 h-6 bg-green-500 border-4 border-green-700" />
            </div>
          </React.Fragment>
        ))}

        {/* Score Overlay */}
        <div className="absolute top-4 left-0 right-0 text-center z-30 pointer-events-none">
          <span className="text-4xl font-black text-white" style={{ textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000' }}>
            {score}
          </span>
        </div>

        {/* Menus */}
        {gameState !== 'playing' && (
          <div className="absolute inset-0 bg-black/40 z-40 flex flex-col items-center justify-center p-6 text-white text-center">
            <h2 className="text-4xl font-black mb-4 tracking-tighter" style={{ textShadow: '2px 2px 0 #000' }}>
              {gameState === 'menu' ? 'FLAPPY BIRD' : 'GAME OVER'}
            </h2>
            
            {gameState === 'gameover' && (
              <div className="bg-yellow-400 p-6 rounded-2xl text-slate-800 font-bold mb-8 border-4 border-white shadow-xl">
                <p className="text-lg uppercase text-yellow-800">Score</p>
                <p className="text-4xl">{score}</p>
                <p className="text-sm mt-4 uppercase text-yellow-800">Best</p>
                <p className="text-2xl">{highScore}</p>
              </div>
            )}
            
            <button 
              className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-xl hover:bg-slate-100 active:scale-95 transition-all shadow-lg animate-bounce"
            >
              {gameState === 'menu' ? 'START GAME' : 'PLAY AGAIN'}
            </button>
            <p className="mt-4 text-white/80 font-medium text-sm">Click screen or press Space, W, Enter or ↑</p>
          </div>
        )}
      </div>
    </div>
  );
}
