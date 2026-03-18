import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GameBoard } from '../components/marble-solitaire/GameBoard';
import { Button } from '../components/ui/button';
import { RotateCcw, Trophy, XCircle, Undo, Lightbulb, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export default function MarbleSolitaire() {
  const getInitialBoard = () => {
    const board = new Array(33).fill(true);
    board[16] = false;
    return board;
  };

  const [board, setBoard] = useState<boolean[]>(getInitialBoard());
  const [selectedMarble, setSelectedMarble] = useState<number | null>(null);
  const [validMoves, setValidMoves] = useState<number[]>([]);
  const [moveCount, setMoveCount] = useState(0);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(() => {
    const saved = localStorage.getItem('marbleSolitaireHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [removedMarbles, setRemovedMarbles] = useState<number[]>([]);
  const [hintMarble, setHintMarble] = useState<number | null>(null);
  const [hintMoves, setHintMoves] = useState<number[]>([]);

  type GameState = {
    board: boolean[];
    score: number;
    moveCount: number;
    removedMarbles: number[];
    gameStatus: 'playing' | 'won' | 'lost';
  };
  const [moveHistory, setMoveHistory] = useState<GameState[]>([]);

  type ScoreAnimation = { id: number; points: number };
  const [scoreAnimations, setScoreAnimations] = useState<ScoreAnimation[]>([]);
  const animationIdRef = useRef(0);
  const [showHighScoreText, setShowHighScoreText] = useState(false);

  useEffect(() => {
    document.title = 'Marble Solitaire - Sai Sravan Biyyapu';
  }, []);

  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29],
    [30, 31, 32],
  ];

  const getNeighbors = (pos: number): { [key: string]: number } => {
    const neighbors: { [key: string]: number } = {};
    let row = -1, col = -1;
    for (let r = 0; r < positions.length; r++) {
      const c = positions[r].indexOf(pos);
      if (c !== -1) { row = r; col = c; break; }
    }
    if (row === -1) return neighbors;

    const isShortRow = (r: number) => r <= 1 || r >= 5;
    const currentIsShort = isShortRow(row);

    if (row >= 1) {
      const targetRow = row - 1;
      const targetIsShort = isShortRow(targetRow);
      let targetCol = col;
      if (currentIsShort && !targetIsShort) targetCol = col + 2;
      else if (!currentIsShort && targetIsShort) targetCol = col - 2;
      if (targetCol >= 0 && targetCol < positions[targetRow].length) neighbors.up = positions[targetRow][targetCol];
    }
    if (row < 6) {
      const targetRow = row + 1;
      const targetIsShort = isShortRow(targetRow);
      let targetCol = col;
      if (currentIsShort && !targetIsShort) targetCol = col + 2;
      else if (!currentIsShort && targetIsShort) targetCol = col - 2;
      if (targetCol >= 0 && targetCol < positions[targetRow].length) neighbors.down = positions[targetRow][targetCol];
    }
    if (col > 0) neighbors.left = positions[row][col - 1];
    if (col < positions[row].length - 1) neighbors.right = positions[row][col + 1];
    return neighbors;
  };

  const getValidMovesForMarble = (pos: number, currentBoard: boolean[]): number[] => {
    const moves: number[] = [];
    const neighbors = getNeighbors(pos);
    Object.entries(neighbors).forEach(([direction, neighbor]) => {
      if (currentBoard[neighbor]) {
        const neighborNeighbors = getNeighbors(neighbor);
        const target = neighborNeighbors[direction as keyof typeof neighborNeighbors];
        if (target !== undefined && !currentBoard[target]) moves.push(target);
      }
    });
    return moves;
  };

  const hasValidMoves = (currentBoard: boolean[]): boolean => {
    for (let i = 0; i < 33; i++) {
      if (currentBoard[i] && getValidMovesForMarble(i, currentBoard).length > 0) return true;
    }
    return false;
  };

  const solvePuzzle = (currentBoard: boolean[]): { from: number; to: number }[] | null => {
    const marbleCount = currentBoard.filter(Boolean).length;
    if (marbleCount === 1 && currentBoard[16]) return [];
    if (marbleCount > 1 && !hasValidMoves(currentBoard)) return null;

    for (let i = 0; i < 33; i++) {
      if (currentBoard[i]) {
        const possibleMoves = getValidMovesForMarble(i, currentBoard);
        for (const dest of possibleMoves) {
          const tempBoard = [...currentBoard];
          const neighbors = getNeighbors(i);
          let jumpedMarble = -1;
          Object.entries(neighbors).forEach(([direction, neighbor]) => {
            const neighborNeighbors = getNeighbors(neighbor);
            if (neighborNeighbors[direction as keyof typeof neighborNeighbors] === dest) jumpedMarble = neighbor;
          });
          tempBoard[i] = false;
          tempBoard[jumpedMarble] = false;
          tempBoard[dest] = true;
          const solution = solvePuzzle(tempBoard);
          if (solution !== null) return [{ from: i, to: dest }, ...solution];
        }
      }
    }
    return null;
  };

  const getHint = () => {
    if (gameStatus !== 'playing') return;
    setSelectedMarble(null);
    setValidMoves([]);

    const solution = solvePuzzle(board);
    if (solution && solution.length > 0) {
      setHintMarble(solution[0].from);
      setHintMoves([solution[0].to]);
    } else {
      type MoveOption = { marble: number; destination: number; score: number };
      const moveOptions: MoveOption[] = [];
      for (let i = 0; i < 33; i++) {
        if (board[i]) {
          const moves = getValidMovesForMarble(i, board);
          for (const dest of moves) {
            const tempBoard = [...board];
            const neighbors = getNeighbors(i);
            let jumpedMarble = -1;
            Object.entries(neighbors).forEach(([direction, neighbor]) => {
              const neighborNeighbors = getNeighbors(neighbor);
              if (neighborNeighbors[direction as keyof typeof neighborNeighbors] === dest) jumpedMarble = neighbor;
            });
            tempBoard[i] = false;
            tempBoard[jumpedMarble] = false;
            tempBoard[dest] = true;
            let futureMovesCount = 0;
            for (let j = 0; j < 33; j++) {
              if (tempBoard[j]) futureMovesCount += getValidMovesForMarble(j, tempBoard).length;
            }
            const centerBonus = dest === 16 ? 50 : 0;
            moveOptions.push({ marble: i, destination: dest, score: futureMovesCount * 10 + centerBonus });
          }
        }
      }
      if (moveOptions.length > 0) {
        moveOptions.sort((a, b) => b.score - a.score);
        setHintMarble(moveOptions[0].marble);
        setHintMoves([moveOptions[0].destination]);
      }
    }
  };

  const handleSlotClick = (position: number) => {
    if (gameStatus !== 'playing') return;

    if (board[position]) {
      setSelectedMarble(position);
      setValidMoves(getValidMovesForMarble(position, board));
      setHintMarble(null);
      setHintMoves([]);
    } else if (selectedMarble !== null && validMoves.includes(position)) {
      const usingHintForMove = hintMarble === selectedMarble && hintMoves.includes(position);

      setMoveHistory([...moveHistory, { board: [...board], score, moveCount, removedMarbles: [...removedMarbles], gameStatus }]);

      const newBoard = [...board];
      const neighbors = getNeighbors(selectedMarble);
      let jumpedMarble = -1;
      Object.entries(neighbors).forEach(([direction, neighbor]) => {
        const neighborNeighbors = getNeighbors(neighbor);
        if (neighborNeighbors[direction as keyof typeof neighborNeighbors] === position) jumpedMarble = neighbor;
      });

      newBoard[selectedMarble] = false;
      newBoard[jumpedMarble] = false;
      newBoard[position] = true;

      const pointsEarned = usingHintForMove ? 5 : 10;

      setBoard(newBoard);
      setRemovedMarbles([...removedMarbles, jumpedMarble]);
      setSelectedMarble(null);
      setValidMoves([]);
      setMoveCount(moveCount + 1);
      const newScore = score + pointsEarned;
      setScore(newScore);
      setHintMarble(null);
      setHintMoves([]);

      const animationId = animationIdRef.current++;
      setScoreAnimations(prev => [...prev, { id: animationId, points: pointsEarned }]);

      if (newScore > highestScore) {
        setHighestScore(newScore);
        localStorage.setItem('marbleSolitaireHighScore', newScore.toString());
      }
    } else {
      setSelectedMarble(null);
      setValidMoves([]);
      setHintMarble(null);
      setHintMoves([]);
    }
  };

  useEffect(() => {
    const marbleCount = board.filter(Boolean).length;
    if (marbleCount === 1 && gameStatus !== 'won') {
      setGameStatus('won');
      const bonus = board[16] ? 25 : 0;
      if (bonus > 0) {
        setScore(prevScore => {
          const newScore = prevScore + bonus;
          const animationId = animationIdRef.current++;
          setScoreAnimations(prev => [...prev, { id: animationId, points: bonus }]);
          if (newScore > highestScore) {
            setHighestScore(newScore);
            localStorage.setItem('marbleSolitaireHighScore', newScore.toString());
          }
          return newScore;
        });
      }
    } else if (marbleCount > 1 && !hasValidMoves(board) && gameStatus !== 'lost') {
      setGameStatus('lost');
    }
  }, [board, gameStatus, highestScore]);

  const undoMove = () => {
    if (moveHistory.length === 0) return;
    const previousState = moveHistory[moveHistory.length - 1];
    setBoard(previousState.board);
    setScore(previousState.score);
    setMoveCount(previousState.moveCount);
    setRemovedMarbles(previousState.removedMarbles);
    setGameStatus(previousState.gameStatus);
    setMoveHistory(moveHistory.slice(0, -1));
    setSelectedMarble(null);
    setValidMoves([]);
    setHintMarble(null);
    setHintMoves([]);
  };

  const resetGame = () => {
    setBoard(getInitialBoard());
    setSelectedMarble(null);
    setValidMoves([]);
    setMoveCount(0);
    setScore(0);
    setGameStatus('playing');
    setRemovedMarbles([]);
    setMoveHistory([]);
    setScoreAnimations([]);
    setHintMarble(null);
    setHintMoves([]);
  };

  const removeScoreAnimation = (id: number) => {
    setScoreAnimations(prev => prev.filter(anim => anim.id !== id));
  };

  useEffect(() => {
    if ((gameStatus === 'won' || gameStatus === 'lost') && score >= highestScore && score > 0) {
      setShowHighScoreText(true);
      const textTimeout = setTimeout(() => setShowHighScoreText(false), 2000);
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) { clearInterval(interval); return; }
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
      return () => { clearInterval(interval); clearTimeout(textTimeout); };
    }
  }, [gameStatus, score, highestScore]);

  const marbleCount = board.filter(Boolean).length;

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-[120px] overflow-hidden">
      {/* Back link */}
      <Link
        to="/experiments"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 text-[#6B4423]/70 hover:text-[#6B4423] transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Experiments
      </Link>

      {/* Natural oak wood base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ddb892] via-[#d4ad88] to-[#c9a07a]" />

      {/* Oak wood natural color variation */}
      <div className="absolute inset-0 opacity-35" style={{
        background: `
          radial-gradient(ellipse at 18% 25%, rgba(210,170,130,0.25) 0%, transparent 35%),
          radial-gradient(ellipse at 72% 40%, rgba(195,155,115,0.2) 0%, transparent 38%),
          radial-gradient(ellipse at 45% 70%, rgba(200,160,120,0.22) 0%, transparent 32%),
          radial-gradient(ellipse at 85% 75%, rgba(185,145,105,0.18) 0%, transparent 30%)
        `
      }} />

      {/* Primary oak grain */}
      <div className="absolute inset-0 opacity-32" style={{
        background: `
          repeating-linear-gradient(90deg, transparent 0px, transparent 22px, rgba(140,100,70,0.12) 22px, rgba(130,90,60,0.18) 22.8px, rgba(140,100,70,0.1) 23.6px, transparent 24px, transparent 52px, rgba(135,95,65,0.1) 52px, rgba(125,85,55,0.16) 52.6px, rgba(135,95,65,0.08) 53.2px, transparent 54px, transparent 78px, rgba(145,105,75,0.14) 78px, rgba(135,95,65,0.2) 78.7px, rgba(145,105,75,0.11) 79.4px, transparent 80px, transparent 110px)
        `
      }} />

      {/* Overhead lighting */}
      <div className="absolute inset-0 opacity-30" style={{
        background: `
          linear-gradient(180deg, rgba(255,245,220,0.4) 0%, rgba(245,220,190,0.25) 30%, transparent 60%),
          radial-gradient(circle at 50% 20%, rgba(250,235,205,0.35) 0%, transparent 50%)
        `
      }} />

      {/* Natural wood texture depth */}
      <div className="absolute inset-0 opacity-20" style={{
        background: `
          radial-gradient(circle at 50% 40%, rgba(170,130,90,0.1) 0%, transparent 35%),
          linear-gradient(180deg, transparent 40%, rgba(160,120,80,0.12) 70%, rgba(150,110,70,0.15) 100%)
        `
      }} />

      <div className="relative w-full max-w-[1200px] mx-auto">
        {/* Title */}
        <div className="relative text-center mb-3">
          <h1 className="mb-3" style={{ fontFamily: 'Rye, serif', fontWeight: 'bold', fontSize: '24px', color: '#6B4423' }}>Marble Solitaire</h1>

          <p className="text-sm leading-relaxed -mt-3" style={{ color: '#6B4423' }}>
            Click a marble to select it, then click an empty space to jump over an adjacent marble.
            <br />
            Leaving only one marble at the center is the goal.
          </p>

          {/* Hint Button */}
          <div className="absolute top-0 right-0">
            <Button
              onClick={getHint}
              variant="outline"
              size="sm"
              className="gap-2 bg-white/80 border-[#B8904D]/30 hover:bg-[#B8904D]/10"
              style={{ color: '#6B4423' }}
              disabled={gameStatus !== 'playing' || !hasValidMoves(board)}
            >
              <Lightbulb className="w-4 h-4" />
              Hint
            </Button>
          </div>
        </div>

        {/* Main layout */}
        <div className="flex flex-col items-center gap-8">
          {/* Stats and Controls Bar */}
          <div className="w-[670px] bg-white/5 backdrop-blur-sm rounded-[18px] border border-[#8B6F47]/20 p-3">
            <div className="flex items-center justify-between gap-8 flex-wrap">
              <div className="flex items-center gap-8" style={{ color: '#6B4423' }}>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#8B6F47' }}>Moves:</span>
                  <span>{moveCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#8B6F47' }}>High Score:</span>
                  <span>{highestScore}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg relative">
                  <span style={{ color: '#8B6F47' }}>Score:</span>
                  <span style={{ color: score >= highestScore && score > 0 ? '#059669' : '#6B4423' }}>
                    {score}
                  </span>

                  <AnimatePresence>
                    {scoreAnimations.map((anim) => (
                      <motion.div
                        key={anim.id}
                        initial={{ y: 0, opacity: 1 }}
                        animate={{ y: -60, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        onAnimationComplete={() => removeScoreAnimation(anim.id)}
                        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                        style={{
                          fontSize: '20px',
                          fontWeight: 'bold',
                          color: 'rgba(255, 255, 255, 0.8)',
                          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                        }}
                      >
                        +{anim.points}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={undoMove}
                  variant="outline"
                  className="gap-2 bg-[rgba(255,255,255,0)] border-[#8B6F47]/30 hover:bg-[#8B6F47]/10"
                  style={{ color: '#6B4423' }}
                  disabled={moveHistory.length === 0}
                >
                  <Undo className="w-4 h-4" />
                  Undo
                </Button>
                <Button
                  onClick={resetGame}
                  className="gap-2 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:via-emerald-800 hover:to-emerald-900 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  New Game
                </Button>
              </div>
            </div>
          </div>

          {/* Status Snackbar */}
          <AnimatePresence>
            {(gameStatus === 'won' || gameStatus === 'lost') && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex justify-center -mt-6"
              >
                {gameStatus === 'won' && (
                  <div className="flex items-center gap-2 bg-white border border-green-500/40 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg">
                    <Trophy className="w-5 h-5 flex-shrink-0 text-green-600" />
                    <span className="text-sm text-green-600">You Won! Only 1 marble remaining!</span>
                  </div>
                )}
                {gameStatus === 'lost' && (
                  <div className="flex items-center gap-2 bg-white border border-red-500/40 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg">
                    <XCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
                    <span className="text-sm text-red-600">Game over! {marbleCount} marbles left.</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Game Board */}
          <div className="flex-shrink-0">
            <GameBoard
              board={board}
              selectedMarble={selectedMarble}
              validMoves={validMoves}
              onSlotClick={handleSlotClick}
              removedMarbles={removedMarbles}
              hintMarble={hintMarble}
              hintMoves={hintMoves}
            />
          </div>
        </div>
      </div>

      {/* High Score Celebration Text */}
      <AnimatePresence>
        {showHighScoreText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          >
            <div
              className="relative px-8 py-4 whitespace-nowrap"
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #ec4899 50%, #a855f7 75%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.8)) drop-shadow(0 0 40px rgba(236,72,153,0.6)) drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
                animation: 'pulse 0.5s ease-in-out',
              }}
            >
              Yay! High Score!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
