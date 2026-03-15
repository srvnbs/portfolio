import { useEffect, useRef } from 'react';
import { Piece, BOARD_SIZE, PocketedCoin, PIECE_RADIUS } from '@/types/carrom';
import DecorativeLayer from './imports/DecorativeLayer';
import WhiteCoin from './imports/WhiteCoin';
import BlackCoin from './imports/BlackCoin';
import Queen from './imports/Queen';
import Striker2 from './imports/Striker2';

interface CarromBoardProps {
  pieces: Piece[];
  striker: Piece | null;
  aimAngle: number;
  power: number;
  isAiming: boolean;
  cursorStyle: string;
  isStrikerOverlapping: boolean;
  pocketedCoinsDisplay: {
    white: PocketedCoin[];
    black: PocketedCoin[];
  };
  scores: {
    white: number;
    black: number;
  };
  currentPlayer: 'white' | 'black';
  strikerTransfer?: {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    progress: number;
    startTime: number;
  };
  pocketedPieces: {
    white: number;
    black: number;
  };
  onCanvasClick?: (x: number, y: number) => void;
  onCanvasMouseMove?: (x: number, y: number) => void;
  onCanvasMouseDown?: (x: number, y: number) => void;
  onCanvasMouseUp?: (x: number, y: number) => void;
}

function Container() {
  return <div className="absolute left-0 rounded-[30px] size-[520px] top-0" data-name="Container" />;
}

function Pocket() {
  return <div className="absolute bg-black right-0 rounded-[30px] size-[44px] top-0" data-name="pocket" />;
}

function Pocket1() {
  return <div className="absolute bg-black left-0 rounded-[30px] size-[44px] top-0" data-name="pocket" />;
}

function Pocket2() {
  return <div className="absolute bg-black bottom-0 right-0 rounded-[30px] size-[44px]" data-name="pocket" />;
}

function Pocket3() {
  return <div className="absolute bg-black bottom-0 left-0 rounded-[30px] size-[44px]" data-name="pocket" />;
}

function PocketedCoinDisplay({ color }: { color: 'white' | 'black' | 'red' }) {
  const coinSize = PIECE_RADIUS * 2;

  return (
    <div
      className="flex-shrink-0"
      style={{
        width: coinSize,
        height: coinSize,
      }}
    >
      {color === 'white' && <WhiteCoin />}
      {color === 'black' && <BlackCoin />}
      {color === 'red' && <Queen />}
    </div>
  );
}

function PlayArea() {
  return (
    <div className="bg-[#f1cb96] relative rounded-[22px] shrink-0 size-[520px]" data-name="Play Area">
      <div aria-hidden="true" className="absolute border-[#5d370c] border-[10px] border-solid inset-[-10px] pointer-events-none rounded-[32px]" />
      <Container />
      <Pocket />
      <Pocket1 />
      <Pocket2 />
      <Pocket3 />
      <div className="absolute left-1/2 size-[412px] top-1/2 translate-x-[-50%] translate-y-[-50%] pointer-events-none">
        <DecorativeLayer />
      </div>
    </div>
  );
}

export function CarromBoard({
  pieces,
  striker,
  aimAngle,
  power,
  isAiming,
  cursorStyle,
  isStrikerOverlapping,
  pocketedCoinsDisplay,
  scores,
  currentPlayer,
  strikerTransfer,
  pocketedPieces,
  onCanvasMouseDown,
  onCanvasMouseMove,
  onCanvasMouseUp,
}: CarromBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);

      const shouldHighlight = pocketedPieces[currentPlayer] === 0;
      const time = Date.now() / 1000;
      const pulseIntensity = 0.4 + 0.6 * (Math.sin(time * 3) * 0.5 + 0.5);

      pieces.forEach(piece => {
        if (!piece.active) return;

        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.rotation);

        if (shouldHighlight && piece.color === currentPlayer) {
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;

          const glowColor = currentPlayer === 'white' ? '255, 255, 100' : '100, 200, 255';
          const gradient = ctx.createRadialGradient(0, 0, piece.radius, 0, 0, piece.radius + 8);
          gradient.addColorStop(0, `rgba(${glowColor}, ${0.2 * pulseIntensity})`);
          gradient.addColorStop(0.6, `rgba(${glowColor}, ${0.5 * pulseIntensity})`);
          gradient.addColorStop(1, `rgba(${glowColor}, 0)`);

          ctx.beginPath();
          ctx.arc(0, 0, piece.radius + 8, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        const centerX = BOARD_SIZE / 2;
        const centerY = BOARD_SIZE / 2;
        const dx = piece.x - centerX;
        const dy = piece.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const shadowDistance = 2;

        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = distance > 0 ? (dx / distance) * shadowDistance : 0;
        ctx.shadowOffsetY = distance > 0 ? (dy / distance) * shadowDistance : 0;

        ctx.beginPath();
        ctx.arc(0, 0, piece.radius, 0, Math.PI * 2);

        if (piece.color === 'white') {
          ctx.fillStyle = '#eeeeee';
        } else if (piece.color === 'black') {
          ctx.fillStyle = '#545454';
        } else if (piece.color === 'red') {
          ctx.fillStyle = '#d33a78';
        }

        ctx.fill();

        if (piece.color === 'white') {
          ctx.strokeStyle = '#ffffff';
        } else if (piece.color === 'black') {
          ctx.strokeStyle = '#151515';
        } else if (piece.color === 'red') {
          ctx.strokeStyle = '#ff639d';
        }
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.shadowColor = 'transparent';
        ctx.beginPath();
        ctx.arc(0, 0, piece.radius * 0.5, 0, Math.PI * 2);

        if (piece.color === 'white') {
          ctx.fillStyle = '#eeeeee';
          ctx.strokeStyle = '#ffffff';
        } else if (piece.color === 'black') {
          ctx.fillStyle = '#545454';
          ctx.strokeStyle = '#151515';
        } else if (piece.color === 'red') {
          ctx.fillStyle = '#d33a78';
          ctx.strokeStyle = '#ff639d';
        }

        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.restore();
      });

      if (isAiming && striker) {
        ctx.save();

        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        const guideLength = Math.max(200, 200 * power);

        ctx.fillStyle = 'rgba(255, 0, 0, 0.6)';
        const dotRadius = 2;
        const dotSpacing = 12;
        const numDots = Math.floor(guideLength / dotSpacing);

        for (let i = 1; i <= numDots; i++) {
          const dotX = striker.x + Math.cos(aimAngle) * (i * dotSpacing);
          const dotY = striker.y + Math.sin(aimAngle) * (i * dotSpacing);

          ctx.beginPath();
          ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        const powerBarWidth = 100;
        const powerBarHeight = 12;
        const powerBarX = striker.x - powerBarWidth / 2;
        const powerBarY = striker.y + 45;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.fillRect(powerBarX - 3, powerBarY - 3, powerBarWidth + 6, powerBarHeight + 6);

        ctx.fillStyle = 'rgba(150, 150, 150, 0.5)';
        ctx.fillRect(powerBarX, powerBarY, powerBarWidth, powerBarHeight);

        if (power > 0) {
          const fillWidth = powerBarWidth * power;
          ctx.fillStyle = `rgba(255, ${Math.floor(255 - power * 255)}, 0, 0.9)`;
          ctx.fillRect(powerBarX, powerBarY, fillWidth, powerBarHeight);
        }

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(powerBarX, powerBarY, powerBarWidth, powerBarHeight);

        ctx.fillStyle = '#000';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.round(power * 100)}%`, striker.x, powerBarY - 8);

        ctx.restore();
      }

      if (shouldHighlight) {
        animationFrameRef.current = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [pieces, striker, aimAngle, power, isAiming, isStrikerOverlapping, currentPlayer, strikerTransfer, pocketedPieces]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !onCanvasMouseDown) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    onCanvasMouseDown(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !onCanvasMouseMove) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    onCanvasMouseMove(x, y);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !onCanvasMouseUp) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    onCanvasMouseUp(x, y);
  };

  return (
    <div
      className="relative rounded-[82px] w-[640px] h-[640px]"
      data-name="CarromBoard"
      style={{
        backgroundColor: '#5d370c',
        backgroundImage: `
          radial-gradient(ellipse 900px 700px at 50% 48%, rgba(139, 101, 63, 0.6) 0%, rgba(92, 64, 38, 0.4) 30%, rgba(60, 40, 20, 0.2) 60%, transparent 80%),
          radial-gradient(ellipse 700px 550px at 50% 48%, rgba(255, 248, 230, 0.15) 0%, rgba(255, 248, 230, 0.06) 25%, transparent 45%),
          repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 3px),
          repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 3px),
          linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(0,0,0,0.12) 100%)
        `,
        backgroundSize: '100% 100%, 100% 100%, 4px 4px, 4px 4px, 100% 100%',
        backgroundBlendMode: 'screen, screen, multiply, multiply, normal',
        boxShadow: `
          inset 0 3px 6px rgba(255, 248, 230, 0.25),
          inset 0 -3px 6px rgba(0, 0, 0, 0.35),
          0 0 25px rgba(0, 0, 0, 0.5)
        `
      } as React.CSSProperties}
    >
      <div className="absolute inset-0 pointer-events-none rounded-[82px] z-20" style={{
        background: `
          radial-gradient(ellipse 500px 400px at 50% 50%, rgba(255, 248, 230, 0.15) 0%, rgba(255, 248, 230, 0.08) 25%, rgba(255, 240, 200, 0.04) 40%, transparent 60%),
          radial-gradient(ellipse 650px 550px at 50% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0.4) 80%, rgba(0, 0, 0, 0.6) 100%)
        `,
        mixBlendMode: 'overlay'
      }} />

      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip p-[60px] relative size-full">
          <PlayArea />
        </div>
      </div>

      <div className="absolute left-[60px] top-[17px] w-[520px] h-[26px] flex items-center justify-between z-30 pointer-events-none">
        <div className="flex items-center gap-1.5 flex-1 justify-end pr-3">
          {pocketedCoinsDisplay.black.slice(0, Math.ceil(pocketedCoinsDisplay.black.length / 2)).map((coin, index) => (
            <PocketedCoinDisplay key={`black-left-${coin.id}-${index}`} color={coin.color} />
          ))}
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span
            className="text-xl transition-all duration-300"
            style={{
              filter: currentPlayer === 'black' ? 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.9))' : 'none',
              animation: currentPlayer === 'black' ? 'pulse-zoom 1s ease-in-out infinite' : 'none',
            }}
          >
            🤖
          </span>
          <span
            className="text-white transition-all duration-300"
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              textShadow: currentPlayer === 'black' ? '0 0 10px rgba(255, 215, 0, 0.8)' : 'none',
            }}
          >
            {scores.black}
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-1 justify-start pl-3">
          {pocketedCoinsDisplay.black.slice(Math.ceil(pocketedCoinsDisplay.black.length / 2)).map((coin, index) => (
            <PocketedCoinDisplay key={`black-right-${coin.id}-${index}`} color={coin.color} />
          ))}
        </div>
      </div>

      <div className="absolute left-[60px] bottom-[17px] w-[520px] h-[26px] flex items-center justify-between z-30 pointer-events-none">
        <div className="flex items-center gap-1.5 flex-1 justify-end pr-3">
          {pocketedCoinsDisplay.white.slice(0, Math.ceil(pocketedCoinsDisplay.white.length / 2)).map((coin, index) => (
            <PocketedCoinDisplay key={`white-left-${coin.id}-${index}`} color={coin.color} />
          ))}
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span
            className="text-xl transition-all duration-300"
            style={{
              filter: currentPlayer === 'white' ? 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.9))' : 'none',
              animation: currentPlayer === 'white' ? 'pulse-zoom 1s ease-in-out infinite' : 'none',
            }}
          >
            👤
          </span>
          <span
            className="text-white transition-all duration-300"
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              textShadow: currentPlayer === 'white' ? '0 0 10px rgba(255, 215, 0, 0.8)' : 'none',
            }}
          >
            {scores.white}
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-1 justify-start pl-3">
          {pocketedCoinsDisplay.white.slice(Math.ceil(pocketedCoinsDisplay.white.length / 2)).map((coin, index) => (
            <PocketedCoinDisplay key={`white-right-${coin.id}-${index}`} color={coin.color} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse-zoom {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }
      `}</style>

      <canvas
        ref={canvasRef}
        width={BOARD_SIZE}
        height={BOARD_SIZE}
        className={`absolute left-[60px] top-[60px] z-10 ${cursorStyle}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ pointerEvents: 'auto' }}
      />

      {(() => {
        let strikerToDraw = null;

        if (strikerTransfer) {
          strikerToDraw = {
            x: strikerTransfer.fromX + (strikerTransfer.toX - strikerTransfer.fromX) * strikerTransfer.progress,
            y: strikerTransfer.fromY + (strikerTransfer.toY - strikerTransfer.fromY) * strikerTransfer.progress,
            radius: 18,
          };
        } else if (striker) {
          strikerToDraw = striker;
        }

        if (!strikerToDraw) return null;

        let scale = 1;
        let shadowBlur = 5;
        let shadowOpacity = 0.15;

        if (strikerTransfer) {
          const liftProgress = strikerTransfer.progress < 0.3
            ? strikerTransfer.progress / 0.3
            : strikerTransfer.progress > 0.7
            ? 1 - ((strikerTransfer.progress - 0.7) / 0.3)
            : 1;

          scale = 1 + (liftProgress * 0.3);
          shadowBlur = 5 + (liftProgress * 15);
          shadowOpacity = 0.15 + (liftProgress * 0.15);
        }

        const strikerSize = strikerToDraw.radius * 2;

        return (
          <div
            className="absolute z-20 pointer-events-none"
            style={{
              left: `${60 + strikerToDraw.x - strikerSize / 2}px`,
              top: `${60 + strikerToDraw.y - strikerSize / 2}px`,
              width: `${strikerSize}px`,
              height: `${strikerSize}px`,
              transform: `scale(${scale})`,
              filter: `drop-shadow(0 0 ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity}))`,
              transition: strikerTransfer ? 'none' : 'transform 0.1s ease-out',
            }}
          >
            <Striker2 />
            {isStrikerOverlapping && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ fontSize: '36px' }}
              >
                🚫
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}
