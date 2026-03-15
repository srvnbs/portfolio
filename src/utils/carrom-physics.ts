import { Piece, BOARD_SIZE, POCKET_RADIUS, FRICTION, RESTITUTION, MIN_VELOCITY } from '@/types/carrom';

export function updatePhysics(pieces: Piece[], deltaTime: number = 1): Piece[] {
  const updatedPieces = pieces.map(piece => {
    if (!piece.active) return piece;

    const speed = Math.sqrt(piece.vx ** 2 + piece.vy ** 2);
    if (speed < MIN_VELOCITY) {
      return { ...piece, vx: 0, vy: 0, angularVelocity: 0 };
    }

    const newVx = piece.vx * FRICTION;
    const newVy = piece.vy * FRICTION;
    const newAngularVelocity = piece.angularVelocity * FRICTION;

    let newX = piece.x + newVx * deltaTime;
    let newY = piece.y + newVy * deltaTime;
    let vx = newVx;
    let vy = newVy;

    const margin = 0;
    const minPos = margin + piece.radius;
    const maxPos = BOARD_SIZE - margin - piece.radius;

    if (newX < minPos || newX > maxPos) {
      vx = -vx * RESTITUTION;
      newX = newX < minPos ? minPos : maxPos;
    }
    if (newY < minPos || newY > maxPos) {
      vy = -vy * RESTITUTION;
      newY = newY < minPos ? minPos : maxPos;
    }

    return {
      ...piece,
      x: newX,
      y: newY,
      vx,
      vy,
      rotation: piece.rotation + newAngularVelocity,
      angularVelocity: newAngularVelocity,
    };
  });

  let result = handleCollisions(updatedPieces);
  result = resolveOverlaps(result);

  return result;
}

function handleCollisions(pieces: Piece[]): Piece[] {
  const activePieces = pieces.filter(p => p.active);
  const result = [...pieces];

  for (let i = 0; i < activePieces.length; i++) {
    for (let j = i + 1; j < activePieces.length; j++) {
      const p1Index = pieces.findIndex(p => p.id === activePieces[i].id);
      const p2Index = pieces.findIndex(p => p.id === activePieces[j].id);

      const p1 = result[p1Index];
      const p2 = result[p2Index];

      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const distance = Math.sqrt(dx ** 2 + dy ** 2);
      const minDist = p1.radius + p2.radius;

      if (distance < minDist) {
        const angle = Math.atan2(dy, dx);
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);

        const v1x = p1.vx * cos + p1.vy * sin;
        const v1y = p1.vy * cos - p1.vx * sin;
        const v2x = p2.vx * cos + p2.vy * sin;
        const v2y = p2.vy * cos - p2.vx * sin;

        const totalMass = p1.mass + p2.mass;
        const newV1x = ((p1.mass - p2.mass) * v1x + 2 * p2.mass * v2x) / totalMass;
        const newV2x = ((p2.mass - p1.mass) * v2x + 2 * p1.mass * v1x) / totalMass;

        result[p1Index] = {
          ...p1,
          vx: (newV1x * cos - v1y * sin) * RESTITUTION,
          vy: (v1y * cos + newV1x * sin) * RESTITUTION,
          angularVelocity: p1.angularVelocity + (newV1x - v1x) * 0.1,
        };

        result[p2Index] = {
          ...p2,
          vx: (newV2x * cos - v2y * sin) * RESTITUTION,
          vy: (v2y * cos + newV2x * sin) * RESTITUTION,
          angularVelocity: p2.angularVelocity + (newV2x - v2x) * 0.1,
        };

        const overlap = minDist - distance + 0.1;
        const separationX = (overlap * dx / distance) / 2;
        const separationY = (overlap * dy / distance) / 2;

        result[p1Index] = {
          ...result[p1Index],
          x: result[p1Index].x - separationX,
          y: result[p1Index].y - separationY,
        };
        result[p2Index] = {
          ...result[p2Index],
          x: result[p2Index].x + separationX,
          y: result[p2Index].y + separationY,
        };
      }
    }
  }

  return result;
}

function resolveOverlaps(pieces: Piece[]): Piece[] {
  const result = [...pieces];
  const activePieces = pieces.filter(p => p.active);
  const maxIterations = 5;

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    let hadOverlap = false;

    for (let i = 0; i < activePieces.length; i++) {
      for (let j = i + 1; j < activePieces.length; j++) {
        const p1Index = result.findIndex(p => p.id === activePieces[i].id);
        const p2Index = result.findIndex(p => p.id === activePieces[j].id);

        if (p1Index === -1 || p2Index === -1) continue;

        const p1 = result[p1Index];
        const p2 = result[p2Index];

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDist = p1.radius + p2.radius;

        if (distance < minDist && distance > 0) {
          hadOverlap = true;
          const overlap = minDist - distance + 0.2;
          const separationX = (overlap * dx / distance) / 2;
          const separationY = (overlap * dy / distance) / 2;

          result[p1Index] = {
            ...result[p1Index],
            x: result[p1Index].x - separationX,
            y: result[p1Index].y - separationY,
          };
          result[p2Index] = {
            ...result[p2Index],
            x: result[p2Index].x + separationX,
            y: result[p2Index].y + separationY,
          };
        }
      }
    }

    if (!hadOverlap) break;
  }

  return result;
}

export function checkPockets(pieces: Piece[]): { piece: Piece; pocket: string }[] {
  const pockets = [
    { x: POCKET_RADIUS, y: POCKET_RADIUS, name: 'topLeft' },
    { x: BOARD_SIZE - POCKET_RADIUS, y: POCKET_RADIUS, name: 'topRight' },
    { x: POCKET_RADIUS, y: BOARD_SIZE - POCKET_RADIUS, name: 'bottomLeft' },
    { x: BOARD_SIZE - POCKET_RADIUS, y: BOARD_SIZE - POCKET_RADIUS, name: 'bottomRight' },
  ];

  const pocketed: { piece: Piece; pocket: string }[] = [];

  pieces.forEach(piece => {
    if (!piece.active) return;

    pockets.forEach(pocket => {
      const dx = piece.x - pocket.x;
      const dy = piece.y - pocket.y;
      const distance = Math.sqrt(dx ** 2 + dy ** 2);

      if (distance < POCKET_RADIUS) {
        pocketed.push({ piece, pocket: pocket.name });
      }
    });
  });

  return pocketed;
}

export function isStrikerInValidPosition(x: number, y: number): boolean {
  const baselineY = BOARD_SIZE - 40;
  const minX = 60;
  const maxX = BOARD_SIZE - 60;

  return y >= baselineY - 10 && y <= baselineY + 10 && x >= minX && x <= maxX;
}

export function areAllPiecesStopped(pieces: Piece[]): boolean {
  return pieces.every(piece => {
    if (!piece.active) return true;
    const speed = Math.sqrt(piece.vx ** 2 + piece.vy ** 2);
    return speed < MIN_VELOCITY;
  });
}
