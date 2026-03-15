import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RotateCcw, HelpCircle, Info, X } from 'lucide-react';

interface NewGameButtonProps {
  onResetGame: () => void;
}

export function NewGameButton({ onResetGame }: NewGameButtonProps) {
  return (
    <Button onClick={onResetGame} className="bg-gradient-to-r from-blue-400 to-blue-700 text-white border-none px-[16px] py-[8px]" style={{ borderRadius: '9999px' }}>
      New Game
    </Button>
  );
}

interface GameRulesCardProps {
  onClose: () => void;
}

export function GameRulesCard({ onClose }: GameRulesCardProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      onClick={onClose}
    >
      <div
        style={{ position: 'relative', display: 'inline-block' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.12)',
            border: 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#3a3a3a',
          }}
        >
          <X className="h-4 w-4" />
        </button>

        {/* Tape */}
        <div style={{
          position: 'absolute',
          top: '-8px',
          left: '50%',
          transform: 'translateX(-50%) rotate(-2deg)',
          width: '100px',
          height: '30px',
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(250, 250, 250, 0.9) 50%, rgba(255, 255, 255, 0.85) 100%)',
          borderRadius: '2px',
          zIndex: 5,
          boxShadow: `
            0 2px 4px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.5),
            inset 0 -1px 0 rgba(0, 0, 0, 0.08)
          `,
          border: '1px solid rgba(220, 220, 220, 0.6)',
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.2) 2px,
              rgba(255, 255, 255, 0.2) 4px
            )
          `,
        }} />

        <Card
          className="p-4"
          style={{
            background: '#f4f1e8',
            boxShadow: `
              0 8px 16px rgba(0, 0, 0, 0.4),
              inset 2px 2px 4px rgba(0, 0, 0, 0.1),
              inset -2px -2px 4px rgba(0, 0, 0, 0.05)
            `,
            transform: 'rotate(-2deg)',
            border: 'none',
            borderRadius: '0',
            position: 'relative',
            overflow: 'visible',
            clipPath: `polygon(
              2% 0%,
              98% 1%,
              99% 4%,
              100% 8%,
              99% 15%,
              100% 25%,
              99% 35%,
              100% 50%,
              99% 65%,
              100% 75%,
              99% 85%,
              100% 92%,
              99% 96%,
              97% 100%,
              3% 99%,
              1% 96%,
              0% 92%,
              1% 85%,
              0% 75%,
              1% 65%,
              0% 50%,
              1% 35%,
              0% 25%,
              1% 15%,
              0% 8%,
              1% 4%
            )`,
            backgroundImage: `
              linear-gradient(to bottom,
                transparent 0px,
                transparent 27px,
                rgba(100, 150, 200, 0.3) 27px,
                rgba(100, 150, 200, 0.3) 28px,
                transparent 28px,
                transparent 51px,
                rgba(100, 150, 200, 0.3) 51px,
                rgba(100, 150, 200, 0.3) 52px,
                transparent 52px,
                transparent 75px,
                rgba(100, 150, 200, 0.3) 75px,
                rgba(100, 150, 200, 0.3) 76px,
                transparent 76px,
                transparent 99px,
                rgba(100, 150, 200, 0.3) 99px,
                rgba(100, 150, 200, 0.3) 100px,
                transparent 100px,
                transparent 123px,
                rgba(100, 150, 200, 0.3) 123px,
                rgba(100, 150, 200, 0.3) 124px,
                transparent 124px,
                transparent 147px,
                rgba(100, 150, 200, 0.3) 147px,
                rgba(100, 150, 200, 0.3) 148px,
                transparent 148px,
                transparent 171px,
                rgba(100, 150, 200, 0.3) 171px,
                rgba(100, 150, 200, 0.3) 172px,
                transparent 172px,
                transparent 195px,
                rgba(100, 150, 200, 0.3) 195px,
                rgba(100, 150, 200, 0.3) 196px,
                transparent 196px,
                transparent 219px,
                rgba(100, 150, 200, 0.3) 219px,
                rgba(100, 150, 200, 0.3) 220px,
                transparent 220px
              ),
              linear-gradient(to right,
                rgba(255, 100, 100, 0.15) 0%,
                rgba(255, 100, 100, 0.15) 1px,
                transparent 1px,
                transparent 100%
              ),
              radial-gradient(circle at 15% 20%, rgba(100, 80, 60, 0.1) 0%, transparent 3%),
              radial-gradient(circle at 75% 35%, rgba(120, 100, 80, 0.08) 0%, transparent 4%),
              radial-gradient(circle at 40% 70%, rgba(90, 70, 50, 0.12) 0%, transparent 5%),
              radial-gradient(circle at 85% 85%, rgba(110, 90, 70, 0.09) 0%, transparent 3%),
              radial-gradient(circle at 25% 90%, rgba(100, 80, 60, 0.11) 0%, transparent 4%),
              radial-gradient(circle at 60% 15%, rgba(80, 60, 40, 0.1) 0%, transparent 3%)
            `,
            backgroundSize: '100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%',
            backgroundPosition: '0 0, 20px 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0',
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-0">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <h3 className="mb-0" style={{ color: '#1a1a1a', fontFamily: "'Caveat', cursive", fontWeight: 'bold' }}>Game Rules</h3>
              <svg
                style={{
                  position: 'absolute',
                  bottom: '-2px',
                  left: '0',
                  width: '100%',
                  height: '8px',
                  overflow: 'visible'
                }}
                viewBox="0 0 120 8"
                preserveAspectRatio="none"
              >
                <path
                  d="M 0,4 Q 5,2 10,4 T 20,5 T 30,3 T 40,4 T 50,5 T 60,4 T 70,3 T 80,5 T 90,4 T 100,3 T 110,4 L 120,4"
                  stroke="#1a1a1a"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <ul className="space-y-0.5 -mt-4" style={{ color: '#2a2a2a', fontFamily: "'Caveat', cursive", fontSize: '1.35rem', listStyle: 'none', paddingLeft: '0' }}>
            <li>1. Drag towards a piece and release striker to shoot</li>
            <li>2. Each pocketed coin = +1 point</li>
            <li>3. Queen (after 1st piece) = +2 points</li>
            <li>4. Must cover queen next turn or lose it</li>
            <li>5. Must cover queen before last coin!</li>
            <li>6. Striker pocketed = illegal shot, lose turn & coin</li>
            <li>7. Winner gets bonus = opponent's remaining coins</li>
            <li>8. Highest score wins!</li>
          </ul>

        </Card>
      </div>
    </div>
  );
}

interface GameRulesButtonProps {
  onClick: () => void;
}

export function GameRulesButton({ onClick }: GameRulesButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}
    >
      <Info className="h-4 w-4" />
      Game Rules
    </button>
  );
}
