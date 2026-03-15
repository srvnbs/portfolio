export interface Piece {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  color: 'white' | 'black' | 'red' | 'striker';
  active: boolean;
  rotation: number;
  angularVelocity: number;
}

export interface PocketedCoin {
  color: 'white' | 'black' | 'red';
  id: string;
}

export interface GameState {
  pieces: Piece[];
  striker: Piece | null;
  currentPlayer: 'white' | 'black';
  scores: {
    white: number;
    black: number;
  };
  pocketedPieces: {
    white: number;
    black: number;
  };
  pocketedCoinsDisplay: {
    white: PocketedCoin[];
    black: PocketedCoin[];
  };
  queenPocketed: boolean;
  queenCovered: boolean;
  queenCoveredBy: 'white' | 'black' | null;
  queenPocketedBy: 'white' | 'black' | null;
  queenNeedsCover: boolean;
  lastPocketedPiece: 'white' | 'black' | 'red' | null;
  gamePhase: 'setup' | 'aiming' | 'shooting' | 'moving' | 'transferring' | 'gameOver';
  message: string;
  extraTurn: boolean;
  turn: number;
  isStrikerOverlapping: boolean;
  strikerTransfer?: {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    progress: number;
    startTime: number;
  };
}

export interface Controls {
  strikerX: number;
  aimAngle: number;
  power: number;
  isDragging: boolean;
  dragStartX: number;
  dragStartY: number;
}

export const BOARD_SIZE = 520;
export const POCKET_RADIUS = 22;
export const PIECE_RADIUS = 13;
export const STRIKER_RADIUS = 18;
export const QUEEN_RADIUS = 13;
export const BASELINE_Y = 480;
export const FRICTION = 0.98;
export const RESTITUTION = 0.8;
export const MAX_POWER = 30;
export const MIN_VELOCITY = 0.05;
