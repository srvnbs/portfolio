import React, { useEffect, useState } from 'react';

interface ScoreChange {
  id: string;
  player: 'white' | 'black';
  change: number;
  timestamp: number;
}

interface ScoreChangeIndicatorProps {
  scoreChanges: ScoreChange[];
}

export function ScoreChangeIndicator({ scoreChanges }: ScoreChangeIndicatorProps) {
  const [activeChanges, setActiveChanges] = useState<ScoreChange[]>([]);

  useEffect(() => {
    const newChanges = scoreChanges.filter(
      change => !activeChanges.some(ac => ac.id === change.id)
    );

    if (newChanges.length > 0) {
      setActiveChanges(prev => [...prev, ...newChanges]);

      newChanges.forEach(change => {
        setTimeout(() => {
          setActiveChanges(prev => prev.filter(ac => ac.id !== change.id));
        }, 2000);
      });
    }
  }, [scoreChanges]);

  return (
    <>
      {activeChanges.map(change => {
        const isBlack = change.player === 'black';
        const isPositive = change.change > 0;
        const changeText = isPositive ? `+${change.change}` : `${change.change}`;

        return (
          <div
            key={change.id}
            className="absolute z-50 pointer-events-none"
            style={{
              left: '50%',
              top: isBlack ? '17px' : 'auto',
              bottom: isBlack ? 'auto' : '17px',
              transform: 'translateX(-50%)',
              animation: `score-float-${isBlack ? 'up' : 'down'} 2s ease-out forwards`,
            }}
          >
            <span
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: isPositive ? '#4ade80' : '#f87171',
                textShadow: `
                  0 0 10px ${isPositive ? 'rgba(74, 222, 128, 0.8)' : 'rgba(248, 113, 113, 0.8)'},
                  0 2px 4px rgba(0, 0, 0, 0.5)
                `,
                display: 'inline-block',
                animation: 'score-pulse 2s ease-out forwards',
              }}
            >
              {changeText}
            </span>
          </div>
        );
      })}

      <style>{`
        @keyframes score-float-up {
          0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-60px);
          }
        }

        @keyframes score-float-down {
          0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(60px);
          }
        }

        @keyframes score-pulse {
          0% {
            transform: scale(0.5);
          }
          20% {
            transform: scale(1.3);
          }
          40% {
            transform: scale(1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}

export type { ScoreChange };
