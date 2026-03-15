import { Piece, BOARD_SIZE, STRIKER_RADIUS } from '@/types/carrom';

export interface AIShot {
  strikerX: number;
  angle: number;
  power: number;
}

function checkStrikerOverlap(strikerX: number, strikerY: number, pieces: Piece[]): boolean {
  return pieces.some(piece => {
    if (!piece.active) return false;
    const dx = strikerX - piece.x;
    const dy = strikerY - piece.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = STRIKER_RADIUS + piece.radius;
    return distance < minDistance;
  });
}

export function calculateAIShot(
  pieces: Piece[],
  aiColor: 'white' | 'black',
  queenPocketed: boolean,
  pocketedCount: { white: number; black: number }
): AIShot {
  const targetPieces = pieces.filter(p => p.active && p.color === aiColor);
  const queenPiece = pieces.find(p => p.active && p.color === 'red');

  let target: Piece | undefined;

  if (!queenPocketed && queenPiece && pocketedCount[aiColor] > 0) {
    target = queenPiece;
  } else if (targetPieces.length > 0) {
    target = findBestTargetPiece(targetPieces);
  }

  if (!target) {
    const baselineY = 40;
    const baselineWidth = 310;
    const centerX = BOARD_SIZE / 2;
    const baselineLeft = centerX - baselineWidth / 2;
    const baselineRight = centerX + baselineWidth / 2;
    const strikerY = baselineY + STRIKER_RADIUS;

    let strikerX = BOARD_SIZE / 2 + (Math.random() - 0.5) * 200;
    let attempts = 0;
    while (checkStrikerOverlap(strikerX, strikerY, pieces) && attempts < 20) {
      strikerX = baselineLeft + STRIKER_RADIUS + Math.random() * (baselineWidth - 2 * STRIKER_RADIUS);
      attempts++;
    }

    if (checkStrikerOverlap(strikerX, strikerY, pieces)) {
      strikerX = centerX;
    }

    return {
      strikerX,
      angle: Math.PI / 4 + Math.random() * Math.PI / 4,
      power: 0.6 + Math.random() * 0.3,
    };
  }

  const pockets = [
    { x: 24, y: 24 },
    { x: BOARD_SIZE - 24, y: 24 },
    { x: 24, y: BOARD_SIZE - 24 },
    { x: BOARD_SIZE - 24, y: BOARD_SIZE - 24 },
  ];

  const nearestPocket = pockets.reduce((nearest, pocket) => {
    const dist = Math.sqrt((target!.x - pocket.x) ** 2 + (target!.y - pocket.y) ** 2);
    const nearestDist = Math.sqrt((target!.x - nearest.x) ** 2 + (target!.y - nearest.y) ** 2);
    return dist < nearestDist ? pocket : nearest;
  });

  const targetToPocketAngle = Math.atan2(nearestPocket.y - target.y, nearestPocket.x - target.x);

  const baselineY = 40;
  const baselineWidth = 310;
  const centerX = BOARD_SIZE / 2;
  const baselineLeft = centerX - baselineWidth / 2;
  const baselineRight = centerX + baselineWidth / 2;

  let strikerX = Math.max(baselineLeft + STRIKER_RADIUS, Math.min(baselineRight - STRIKER_RADIUS, target.x + (Math.random() - 0.5) * 100));
  const strikerY = baselineY + STRIKER_RADIUS;

  let attempts = 0;
  const maxAttempts = 20;
  while (checkStrikerOverlap(strikerX, strikerY, pieces) && attempts < maxAttempts) {
    strikerX = baselineLeft + STRIKER_RADIUS + Math.random() * (baselineWidth - 2 * STRIKER_RADIUS);
    attempts++;
  }

  if (checkStrikerOverlap(strikerX, strikerY, pieces)) {
    strikerX = centerX;
  }

  const angle = Math.atan2(target.y - strikerY, target.x - strikerX);

  const angleVariation = (Math.random() - 0.5) * 0.2;
  const finalAngle = angle + angleVariation;

  const distance = Math.sqrt((target.x - strikerX) ** 2 + (target.y - strikerY) ** 2);
  const power = Math.min(0.9, 0.5 + distance / 800);

  return {
    strikerX,
    angle: finalAngle,
    power,
  };
}

function findBestTargetPiece(pieces: Piece[]): Piece {
  const pockets = [
    { x: 24, y: 24 },
    { x: BOARD_SIZE - 24, y: 24 },
    { x: 24, y: BOARD_SIZE - 24 },
    { x: BOARD_SIZE - 24, y: BOARD_SIZE - 24 },
  ];

  let bestPiece = pieces[0];
  let minDistance = Infinity;

  pieces.forEach(piece => {
    pockets.forEach(pocket => {
      const dist = Math.sqrt((piece.x - pocket.x) ** 2 + (piece.y - pocket.y) ** 2);
      if (dist < minDistance) {
        minDistance = dist;
        bestPiece = piece;
      }
    });
  });

  return bestPiece;
}
