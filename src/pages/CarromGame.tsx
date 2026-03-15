import { useState, useEffect, useCallback } from 'react';
import { CarromBoard } from '@/components/carrom/CarromBoard';
import { NewGameButton, GameRulesCard, GameRulesButton } from '@/components/carrom/GameControls';
import { GameOverModal } from '@/components/carrom/GameOverModal';
import { GameState, Piece, Controls, BOARD_SIZE, PIECE_RADIUS, STRIKER_RADIUS, MAX_POWER } from '@/types/carrom';
import { updatePhysics, checkPockets, areAllPiecesStopped } from '@/utils/carrom-physics';
import { calculateAIShot } from '@/utils/carrom-ai';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Helper function to check if two pieces overlap
function checkOverlap(piece1: Piece, piece2: Piece): boolean {
  const dx = piece1.x - piece2.x;
  const dy = piece1.y - piece2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < (piece1.radius + piece2.radius);
}

// Helper function to find a non-overlapping position near the center
function findNonOverlappingPosition(pieces: Piece[], radius: number): { x: number; y: number } {
  const centerX = BOARD_SIZE / 2;
  const centerY = BOARD_SIZE / 2;
  const maxAttempts = 100;
  const spreadRadius = 60;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * spreadRadius;
    const testX = centerX + Math.cos(angle) * distance;
    const testY = centerY + Math.sin(angle) * distance;

    const testPiece: Piece = {
      id: 'temp',
      x: testX,
      y: testY,
      vx: 0,
      vy: 0,
      radius,
      mass: 1,
      color: 'white',
      active: true,
      rotation: 0,
      angularVelocity: 0,
    };

    const hasOverlap = pieces.some(p => p.active && checkOverlap(testPiece, p));

    if (!hasOverlap) {
      return { x: testX, y: testY };
    }
  }

  return {
    x: centerX + (Math.random() - 0.5) * 20,
    y: centerY + (Math.random() - 0.5) * 20,
  };
}

function findNonOverlappingBaselinePosition(pieces: Piece[], baselineY: number, radius: number, isTopBaseline: boolean): number {
  const centerX = BOARD_SIZE / 2;
  const baselineWidth = 310;
  const baselineLeft = centerX - baselineWidth / 2;
  const baselineRight = centerX + baselineWidth / 2;

  const testPiece: Piece = {
    id: 'temp',
    x: centerX,
    y: baselineY,
    vx: 0,
    vy: 0,
    radius,
    mass: 1,
    color: 'white',
    active: true,
    rotation: 0,
    angularVelocity: 0,
  };

  const centerHasOverlap = pieces.some(p => p.active && checkOverlap(testPiece, p));
  if (!centerHasOverlap) {
    return centerX;
  }

  const step = 5;
  const maxDistance = baselineWidth / 2 - radius;

  for (let offset = step; offset <= maxDistance; offset += step) {
    const leftX = centerX - offset;
    if (leftX >= baselineLeft + radius) {
      testPiece.x = leftX;
      if (!pieces.some(p => p.active && checkOverlap(testPiece, p))) {
        return leftX;
      }
    }

    const rightX = centerX + offset;
    if (rightX <= baselineRight - radius) {
      testPiece.x = rightX;
      if (!pieces.some(p => p.active && checkOverlap(testPiece, p))) {
        return rightX;
      }
    }
  }

  return centerX;
}

export default function CarromGame() {
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  const [showRules, setShowRules] = useState(false);
  const [controls, setControls] = useState<Controls>({
    strikerX: BOARD_SIZE / 2,
    aimAngle: -Math.PI / 2,
    power: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
  });

  // Animation loop
  useEffect(() => {
    if (gameState.gamePhase !== 'moving') return;

    const interval = setInterval(() => {
      setGameState(prevState => {
        const allPieces = prevState.striker
          ? [...prevState.pieces, prevState.striker]
          : prevState.pieces;

        const updatedAllPieces = updatePhysics(allPieces);

        const striker = prevState.striker
          ? updatedAllPieces.find(p => p.id === 'striker') || null
          : null;
        const updatedPieces = updatedAllPieces.filter(p => p.id !== 'striker');

        const pocketed = checkPockets(updatedAllPieces);

        let newState = {
          ...prevState,
          pieces: updatedPieces,
          striker,
        };

        let ownPiecePocketed = false;

        const strikerPocketed = pocketed.some(({ piece }) => piece.color === 'striker');

        if (pocketed.length > 0) {
          pocketed.forEach(({ piece }) => {
            if (piece.color === 'striker') {
              newState.striker = null;
              newState.message = 'Illegal shot! Striker pocketed';
              newState.extraTurn = false;

              const returnedPiece = newState.pieces.find(
                p => !p.active && p.color === newState.currentPlayer
              );
              if (returnedPiece) {
                const index = newState.pieces.findIndex(p => p.id === returnedPiece.id);
                const newPosition = findNonOverlappingPosition(newState.pieces, PIECE_RADIUS);
                newState.pieces[index] = {
                  ...returnedPiece,
                  active: true,
                  x: newPosition.x,
                  y: newPosition.y,
                  vx: 0,
                  vy: 0,
                };
                newState.pocketedPieces = {
                  ...newState.pocketedPieces,
                  [newState.currentPlayer]: Math.max(0, newState.pocketedPieces[newState.currentPlayer] - 1),
                };
                if (newState.pocketedCoinsDisplay[newState.currentPlayer].length > 0) {
                  newState.pocketedCoinsDisplay = {
                    ...newState.pocketedCoinsDisplay,
                    [newState.currentPlayer]: newState.pocketedCoinsDisplay[newState.currentPlayer].slice(0, -1),
                  };
                }
                newState.scores = {
                  ...newState.scores,
                  [newState.currentPlayer]: Math.max(0, newState.scores[newState.currentPlayer] - 1),
                };
              }

              toast.error('Illegal shot! Striker pocketed - penalty applied, turn lost');
            } else if (strikerPocketed && piece.color !== newState.currentPlayer && piece.color !== 'red') {
              const pieceIndex = newState.pieces.findIndex(p => p.id === piece.id);
              if (pieceIndex !== -1) {
                newState.pieces[pieceIndex] = { ...piece, active: false };
              }
            } else if (strikerPocketed && piece.color === newState.currentPlayer) {
              const pieceIndex = newState.pieces.findIndex(p => p.id === piece.id);
              if (pieceIndex !== -1) {
                newState.pieces[pieceIndex] = { ...piece, active: false };
                newState.pocketedPieces = {
                  ...newState.pocketedPieces,
                  [piece.color]: newState.pocketedPieces[piece.color] + 1,
                };
              }
            } else if (strikerPocketed && piece.color === 'red') {
              const pieceIndex = newState.pieces.findIndex(p => p.id === piece.id);
              if (pieceIndex !== -1) {
                const newPosition = findNonOverlappingPosition(newState.pieces, PIECE_RADIUS);
                newState.pieces[pieceIndex] = {
                  ...piece,
                  active: true,
                  x: newPosition.x,
                  y: newPosition.y,
                  vx: 0,
                  vy: 0,
                };
              }
            } else if (!strikerPocketed) {
              const pieceIndex = newState.pieces.findIndex(p => p.id === piece.id);
              if (pieceIndex !== -1) {
                newState.pieces[pieceIndex] = { ...piece, active: false };

                if (piece.color === 'red') {
                  newState.lastPocketedPiece = 'red';

                  if (newState.pocketedPieces[newState.currentPlayer] === 0) {
                    newState.message = 'Cannot pocket queen yet! Need to pocket own piece first.';
                    const newPosition = findNonOverlappingPosition(newState.pieces, PIECE_RADIUS);
                    newState.pieces[pieceIndex] = {
                      ...piece,
                      active: true,
                      x: newPosition.x,
                      y: newPosition.y,
                      vx: 0,
                      vy: 0,
                    };
                    toast.warning('Queen returned to center!');
                  } else {
                    newState.queenPocketed = true;
                    newState.queenPocketedBy = newState.currentPlayer;
                    newState.queenNeedsCover = true;
                    newState.extraTurn = true;
                    newState.message = 'Queen pocketed! Cover it on your next turn!';
                    toast.success('Queen pocketed! Cover it next turn!');
                  }
                } else if (piece.color === newState.currentPlayer) {
                  const wouldBeLastPiece = newState.pocketedPieces[newState.currentPlayer] === 8;
                  const hasntCoveredQueen = !newState.queenCovered || newState.queenCoveredBy !== newState.currentPlayer;

                  if (wouldBeLastPiece && hasntCoveredQueen) {
                    newState.message = 'Cannot pocket your last piece! Must cover queen first!';
                    const newPosition = findNonOverlappingPosition(newState.pieces, PIECE_RADIUS);
                    newState.pieces[pieceIndex] = {
                      ...piece,
                      active: true,
                      x: newPosition.x,
                      y: newPosition.y,
                      vx: 0,
                      vy: 0,
                    };
                    toast.error('Cannot pocket last piece without covering queen first!');
                  } else {
                    ownPiecePocketed = true;
                    newState.pocketedPieces = {
                      ...newState.pocketedPieces,
                      [piece.color]: newState.pocketedPieces[piece.color] + 1,
                    };
                    newState.pocketedCoinsDisplay = {
                      ...newState.pocketedCoinsDisplay,
                      [newState.currentPlayer]: [
                        ...newState.pocketedCoinsDisplay[newState.currentPlayer],
                        { color: piece.color, id: piece.id }
                      ],
                    };
                    console.log(`${newState.currentPlayer} pocketed own piece (${piece.color}), adding +1 point`);
                    newState.scores = {
                      ...newState.scores,
                      [newState.currentPlayer]: newState.scores[newState.currentPlayer] + 1,
                    };
                    newState.lastPocketedPiece = piece.color;
                    newState.extraTurn = true;
                    newState.message = `${piece.color} piece pocketed! +1 point, extra turn!`;

                    if (newState.queenNeedsCover && newState.queenPocketedBy === newState.currentPlayer) {
                      newState.queenCovered = true;
                      newState.queenCoveredBy = newState.currentPlayer;
                      newState.queenNeedsCover = false;
                      const queenPiece = newState.pieces.find(p => p.color === 'red');
                      if (queenPiece) {
                        newState.pocketedCoinsDisplay = {
                          ...newState.pocketedCoinsDisplay,
                          [newState.currentPlayer]: [
                            ...newState.pocketedCoinsDisplay[newState.currentPlayer],
                            { color: 'red', id: queenPiece.id }
                          ],
                        };
                      }
                      console.log(`${newState.currentPlayer} covered the queen, adding +2 points`);
                      newState.scores = {
                        ...newState.scores,
                        [newState.currentPlayer]: newState.scores[newState.currentPlayer] + 2,
                      };
                      newState.message = 'Queen covered! +2 points!';
                      toast.success('Queen covered! +2 points!');
                    }

                    toast.success('Extra turn!');
                  }
                } else {
                  newState.pocketedPieces = {
                    ...newState.pocketedPieces,
                    [piece.color]: newState.pocketedPieces[piece.color] + 1,
                  };
                  const opponentColor = piece.color as 'white' | 'black';
                  newState.pocketedCoinsDisplay = {
                    ...newState.pocketedCoinsDisplay,
                    [opponentColor]: [
                      ...newState.pocketedCoinsDisplay[opponentColor],
                      { color: piece.color, id: piece.id }
                    ],
                  };
                  console.log(`${newState.currentPlayer} accidentally pocketed opponent's piece (${piece.color}), ${piece.color} gets +1 point`);
                  newState.scores = {
                    ...newState.scores,
                    [piece.color]: newState.scores[piece.color] + 1,
                  };
                  newState.extraTurn = false;
                  newState.message = `Opponent's piece pocketed! Opponent gets +1 point, you lose your turn!`;
                  toast.warning("Opponent's piece pocketed! Opponent gets +1 point");
                }
              }
            }
          });
        }

        if (areAllPiecesStopped([...newState.pieces, ...(newState.striker ? [newState.striker] : [])])) {
          if (newState.queenNeedsCover && newState.queenPocketedBy === newState.currentPlayer && !ownPiecePocketed && !newState.extraTurn) {
            const queenPiece = newState.pieces.find(p => p.color === 'red');
            if (queenPiece) {
              const queenIndex = newState.pieces.findIndex(p => p.id === queenPiece.id);
              const newPosition = findNonOverlappingPosition(newState.pieces, PIECE_RADIUS);
              newState.pieces[queenIndex] = {
                ...queenPiece,
                active: true,
                x: newPosition.x,
                y: newPosition.y,
                vx: 0,
                vy: 0,
              };
              newState.queenPocketed = false;
              newState.queenNeedsCover = false;
              newState.queenPocketedBy = null;
              toast.warning('Failed to cover queen! Queen returned to board.');
              newState.message = 'Queen returned to board - not covered!';
            }
          }

          const whiteFinished = newState.pocketedPieces.white === 9;
          const blackFinished = newState.pocketedPieces.black === 9;

          if (whiteFinished || blackFinished) {
            newState.gamePhase = 'gameOver';

            if (whiteFinished) {
              const opponentRemaining = 9 - newState.pocketedPieces.black;
              newState.scores = {
                ...newState.scores,
                white: newState.scores.white + opponentRemaining,
              };
            } else if (blackFinished) {
              const opponentRemaining = 9 - newState.pocketedPieces.white;
              newState.scores = {
                ...newState.scores,
                black: newState.scores.black + opponentRemaining,
              };
            }

            const finalWhiteScore = newState.scores.white;
            const finalBlackScore = newState.scores.black;

            toast.info('Game Over!');

            if (finalWhiteScore > finalBlackScore) {
              newState.message = `White wins! Final score: ${finalWhiteScore} - ${finalBlackScore}`;
              toast.success(`You win! Final score: ${finalWhiteScore} - ${finalBlackScore}`);

              import('canvas-confetti').then((confetti) => {
                confetti.default({
                  particleCount: 100,
                  spread: 70,
                  origin: { y: 0.6 }
                });
                setTimeout(() => {
                  confetti.default({
                    particleCount: 50,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 }
                  });
                  confetti.default({
                    particleCount: 50,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 }
                  });
                }, 200);
              });
            } else if (finalBlackScore > finalWhiteScore) {
              newState.message = `Black wins! Final score: ${finalBlackScore} - ${finalWhiteScore}`;
              toast.error(`AI wins! Final score: ${finalBlackScore} - ${finalWhiteScore}`);
            } else {
              newState.message = `It's a tie! Final score: ${finalWhiteScore} - ${finalBlackScore}`;
              toast.info(`It's a tie! Final score: ${finalWhiteScore} - ${finalBlackScore}`);
            }

            return newState;
          }

          const needsTransfer = !newState.extraTurn && newState.striker !== null;

          if (!newState.extraTurn) {
            newState.currentPlayer = newState.currentPlayer === 'white' ? 'black' : 'white';
            newState.message = `${newState.currentPlayer}'s turn`;
          } else {
            newState.extraTurn = false;
          }

          if (needsTransfer && newState.striker) {
            const decorativeLayerTop = 54;
            const decorativeLayerBottom = 54 + 412;
            const targetY = newState.currentPlayer === 'white'
              ? decorativeLayerBottom - STRIKER_RADIUS
              : decorativeLayerTop + STRIKER_RADIUS;
            const targetX = BOARD_SIZE / 2;

            newState.gamePhase = 'transferring';
            newState.strikerTransfer = {
              fromX: newState.striker.x,
              fromY: newState.striker.y,
              toX: targetX,
              toY: targetY,
              progress: 0,
              startTime: Date.now() + 500,
            };
          } else {
            newState.gamePhase = 'setup';
            newState.striker = null;
          }

          return newState;
        }

        return newState;
      });
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [gameState.gamePhase]);

  // Striker transfer animation
  useEffect(() => {
    if (gameState.gamePhase !== 'transferring') return;

    const animationDuration = 600;

    const interval = setInterval(() => {
      setGameState(prevState => {
        if (prevState.gamePhase !== 'transferring' || !prevState.strikerTransfer) {
          return prevState;
        }

        const elapsed = Date.now() - prevState.strikerTransfer.startTime;

        if (elapsed < 0) {
          return prevState;
        }

        const progress = Math.min(elapsed / animationDuration, 1);

        const easeProgress = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        if (progress >= 1) {
          const isTopBaseline = prevState.currentPlayer === 'black';
          const safeX = findNonOverlappingBaselinePosition(
            prevState.pieces,
            prevState.strikerTransfer.toY,
            STRIKER_RADIUS,
            isTopBaseline
          );

          const finalStriker: Piece = {
            id: 'striker',
            x: safeX,
            y: prevState.strikerTransfer.toY,
            vx: 0,
            vy: 0,
            radius: STRIKER_RADIUS,
            mass: 2,
            color: 'striker',
            active: true,
            rotation: 0,
            angularVelocity: 0,
          };

          return {
            ...prevState,
            gamePhase: 'setup',
            striker: finalStriker,
            strikerTransfer: undefined,
            isStrikerOverlapping: false,
            message: `${prevState.currentPlayer}'s turn`,
          };
        }

        return {
          ...prevState,
          strikerTransfer: {
            ...prevState.strikerTransfer,
            progress: easeProgress,
          },
        };
      });
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [gameState.gamePhase]);

  // AI turn
  useEffect(() => {
    if (gameState.gamePhase === 'gameOver') return;

    if (gameState.gamePhase === 'setup' && gameState.currentPlayer === 'black') {
      setTimeout(() => {
        const aiShot = calculateAIShot(
          gameState.pieces,
          'black',
          gameState.queenPocketed,
          gameState.pocketedPieces
        );

        const decorativeLayerTop = 54;
        const striker: Piece = {
          id: 'striker',
          x: aiShot.strikerX,
          y: decorativeLayerTop + STRIKER_RADIUS,
          vx: Math.cos(aiShot.angle) * aiShot.power * MAX_POWER,
          vy: Math.sin(aiShot.angle) * aiShot.power * MAX_POWER,
          radius: STRIKER_RADIUS,
          mass: 2,
          color: 'striker',
          active: true,
          rotation: 0,
          angularVelocity: 0,
        };

        setGameState(prev => ({
          ...prev,
          striker,
          gamePhase: 'moving',
          message: 'AI is shooting...',
        }));


      }, 1000);
    }
  }, [gameState.gamePhase, gameState.currentPlayer]);

  // Initialize striker on baseline
  useEffect(() => {
    if (gameState.gamePhase === 'gameOver') return;

    if (gameState.gamePhase === 'setup' && gameState.currentPlayer === 'white' && !gameState.striker) {
      const decorativeLayerBottom = 54 + 412;
      const baselineY = decorativeLayerBottom;

      const striker: Piece = {
        id: 'striker',
        x: BOARD_SIZE / 2,
        y: baselineY - STRIKER_RADIUS,
        vx: 0,
        vy: 0,
        radius: STRIKER_RADIUS,
        mass: 2,
        color: 'striker',
        active: true,
        rotation: 0,
        angularVelocity: 0,
      };

      const wouldOverlap = gameState.pieces.some(
        piece => piece.active && checkOverlap(striker, piece)
      );

      setGameState(prev => ({
        ...prev,
        striker,
        isStrikerOverlapping: wouldOverlap,
      }));
    }
  }, [gameState.gamePhase, gameState.currentPlayer, gameState.striker, gameState.pieces]);

  const handleCanvasMouseDown = useCallback((x: number, y: number) => {
    if (gameState.gamePhase === 'gameOver') return;

    if (gameState.gamePhase !== 'setup' || gameState.currentPlayer !== 'white' || !gameState.striker) return;

    if (gameState.isStrikerOverlapping) {
      toast.error('Cannot shoot! Striker is overlapping with a coin.');
      return;
    }

    setGameState(prev => ({ ...prev, gamePhase: 'aiming' }));
    setControls(prev => ({
      ...prev,
      isDragging: true,
      dragStartX: x,
      dragStartY: y,
    }));
  }, [gameState.gamePhase, gameState.currentPlayer, gameState.striker, gameState.isStrikerOverlapping]);

  const handleCanvasMouseMove = useCallback((x: number, y: number) => {
    if (gameState.currentPlayer !== 'white') return;

    const decorativeLayerBottom = 54 + 412;
    const baselineY = decorativeLayerBottom;
    const baselineWidth = 310;
    const centerX = BOARD_SIZE / 2;
    const baselineLeft = centerX - baselineWidth / 2;
    const baselineRight = centerX + baselineWidth / 2;

    if (!controls.isDragging && gameState.gamePhase === 'setup' && gameState.striker) {
      const isInHoverZone = y >= baselineY - 36 && y <= baselineY + 10 &&
                           x >= baselineLeft && x <= baselineRight;

      if (isInHoverZone) {
        const clampedX = Math.max(
          baselineLeft + STRIKER_RADIUS,
          Math.min(baselineRight - STRIKER_RADIUS, x)
        );

        const updatedStriker: Piece = {
          ...gameState.striker,
          x: clampedX,
        };

        const wouldOverlap = gameState.pieces.some(
          piece => piece.active && checkOverlap(updatedStriker, piece)
        );

        setGameState(prev => ({
          ...prev,
          striker: updatedStriker,
          isStrikerOverlapping: wouldOverlap,
          message: wouldOverlap ? 'Cannot place striker on a coin!' : 'Click on baseline to place striker',
        }));
      }
      return;
    }

    if (controls.isDragging && gameState.striker) {
      const dx = x - gameState.striker.x;
      const dy = y - gameState.striker.y;
      const angle = Math.atan2(dy, dx);
      const distance = Math.sqrt(dx ** 2 + dy ** 2);
      const power = Math.min(1, distance / 150);

      setControls(prev => ({
        ...prev,
        aimAngle: angle,
        power,
      }));
    }
  }, [controls.isDragging, gameState.striker, gameState.gamePhase, gameState.currentPlayer]);

  const handleCanvasMouseUp = useCallback((x: number, y: number) => {
    if (!controls.isDragging || !gameState.striker || gameState.gamePhase !== 'aiming') return;

    if (gameState.isStrikerOverlapping) {
      toast.error('Cannot shoot! Striker is overlapping with a coin.');
      setGameState(prev => ({ ...prev, gamePhase: 'setup' }));
      setControls(prev => ({
        ...prev,
        isDragging: false,
        power: 0,
      }));
      return;
    }

    const power = controls.power;

    if (power > 0.1) {
      const updatedStriker: Piece = {
        ...gameState.striker,
        vx: Math.cos(controls.aimAngle) * power * MAX_POWER,
        vy: Math.sin(controls.aimAngle) * power * MAX_POWER,
      };

      setGameState(prev => ({
        ...prev,
        striker: updatedStriker,
        gamePhase: 'moving',
        message: 'Shooting...',
        isStrikerOverlapping: false,
      }));


    } else {
      setGameState(prev => ({ ...prev, gamePhase: 'setup' }));
    }

    setControls(prev => ({
      ...prev,
      isDragging: false,
      power: 0,
    }));
  }, [controls, gameState.striker, gameState.gamePhase, gameState.isStrikerOverlapping]);

  const handleResetGame = () => {
    setGameState(initializeGame());
    setControls({
      strikerX: BOARD_SIZE / 2,
      aimAngle: -Math.PI / 2,
      power: 0,
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0,
    });
  };

  const getCursorStyle = () => {
    if (gameState.gamePhase === 'gameOver') {
      return 'cursor-default';
    }
    if (gameState.isStrikerOverlapping && gameState.gamePhase === 'setup') {
      return 'cursor-not-allowed';
    }
    if (gameState.gamePhase === 'aiming' && controls.isDragging) {
      return 'cursor-grabbing';
    }
    if (gameState.gamePhase === 'setup' && gameState.currentPlayer === 'white') {
      return 'cursor-pointer';
    }
    return 'cursor-pointer';
  };

  const getWinner = (): 'white' | 'black' | 'tie' => {
    if (gameState.scores.white > gameState.scores.black) return 'white';
    if (gameState.scores.black > gameState.scores.white) return 'black';
    return 'tie';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{
      backgroundColor: '#1a1612',
      backgroundImage: `
        radial-gradient(ellipse 1100px 850px at 50% 45%, rgba(255, 230, 180, 0.12) 0%, rgba(255, 200, 120, 0.06) 20%, transparent 50%),
        radial-gradient(ellipse 900px 700px at 50% 48%, rgba(80, 65, 50, 0.4) 0%, rgba(60, 48, 38, 0.3) 15%, rgba(40, 32, 25, 0.2) 30%, transparent 50%),
        linear-gradient(180deg, rgba(25, 20, 16, 0.95) 0%, rgba(30, 24, 19, 0.85) 50%, rgba(20, 16, 13, 0.95) 100%),
        repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(0,0,0,0.03) 80px, rgba(0,0,0,0.03) 81px),
        repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(0,0,0,0.03) 80px, rgba(0,0,0,0.03) 81px),
        linear-gradient(135deg, rgba(35, 28, 22, 0.5) 0%, rgba(25, 20, 16, 0.7) 50%, rgba(30, 24, 19, 0.5) 100%)
      `,
      backgroundSize: '100% 100%, 100% 100%, 100% 100%, 80px 80px, 80px 80px, 100% 100%',
      boxShadow: 'inset 0 0 200px rgba(0,0,0,0.7), inset 0 0 100px rgba(0,0,0,0.5)',
    }}>
      <Link to="/" className="fixed top-6 left-6 z-50 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="relative w-full flex flex-col items-center justify-center">
        {/* Mobile: buttons above board */}
        <div className="flex items-center gap-4 mb-3 lg:hidden">
          <NewGameButton onResetGame={handleResetGame} />
          <GameRulesButton onClick={() => setShowRules(true)} />
        </div>

        <div className="flex flex-col items-center gap-2 relative">
          <CarromBoard
            pieces={gameState.pieces}
            striker={gameState.striker}
            aimAngle={controls.aimAngle}
            power={controls.power}
            isAiming={gameState.gamePhase === 'aiming'}
            cursorStyle={getCursorStyle()}
            isStrikerOverlapping={gameState.isStrikerOverlapping}
            pocketedCoinsDisplay={gameState.pocketedCoinsDisplay}
            scores={gameState.scores}
            currentPlayer={gameState.currentPlayer}
            strikerTransfer={gameState.strikerTransfer}
            pocketedPieces={gameState.pocketedPieces}
            onCanvasMouseDown={handleCanvasMouseDown}
            onCanvasMouseMove={handleCanvasMouseMove}
            onCanvasMouseUp={handleCanvasMouseUp}
          />
        </div>

        {/* Desktop: buttons to the right */}
        <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 flex-col items-center gap-3" style={{ left: 'calc(50% + 344px)' }}>
          <NewGameButton onResetGame={handleResetGame} />
          <GameRulesButton onClick={() => setShowRules(true)} />
        </div>
      </div>

      {showRules && <GameRulesCard onClose={() => setShowRules(false)} />}

      <GameOverModal
        isOpen={gameState.gamePhase === 'gameOver'}
        winner={getWinner()}
        whiteScore={gameState.scores.white}
        blackScore={gameState.scores.black}
        onPlayAgain={handleResetGame}
      />
    </div>
  );
}

function initializeGame(): GameState {
  const pieces: Piece[] = [];
  const centerX = BOARD_SIZE / 2;
  const centerY = BOARD_SIZE / 2;

  const innerRadius = PIECE_RADIUS * 2.4 - 2;
  const outerRadius = PIECE_RADIUS * 4.8 - 5;
  const midRadius = innerRadius + PIECE_RADIUS * 2 - 6;

  const rotationOffset = -Math.PI / 6;

  const positions: Array<{ x: number; y: number; color: 'white' | 'black' | 'red' }> = [];

  positions.push({ x: 0, y: 0, color: 'red' });

  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI / 3) + rotationOffset;
    positions.push({
      x: innerRadius * Math.cos(angle),
      y: innerRadius * Math.sin(angle),
      color: i % 2 === 0 ? 'white' : 'black',
    });
  }

  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI / 6) + rotationOffset;
    const isVertex = i % 2 === 0;
    const radius = isVertex ? outerRadius : midRadius;
    positions.push({
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
      color: isVertex ? 'white' : 'black',
    });
  }

  positions.forEach((pos, index) => {
    pieces.push({
      id: `piece-${index}`,
      x: centerX + pos.x,
      y: centerY + pos.y,
      vx: 0,
      vy: 0,
      radius: PIECE_RADIUS,
      mass: 1,
      color: pos.color,
      active: true,
      rotation: 0,
      angularVelocity: 0,
    });
  });

  return {
    pieces,
    striker: null,
    currentPlayer: 'white',
    scores: { white: 0, black: 0 },
    pocketedPieces: { white: 0, black: 0 },
    pocketedCoinsDisplay: { white: [], black: [] },
    queenPocketed: false,
    queenCovered: false,
    queenCoveredBy: null,
    queenPocketedBy: null,
    queenNeedsCover: false,
    lastPocketedPiece: null,
    gamePhase: 'setup',
    message: 'Click on baseline to place striker',
    extraTurn: false,
    turn: 1,
    isStrikerOverlapping: false,
  };
}
