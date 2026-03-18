import { MarbleSlot } from './MarbleSlot';

interface GameBoardProps {
  board: boolean[];
  selectedMarble: number | null;
  validMoves: number[];
  onSlotClick: (index: number) => void;
  removedMarbles: number[];
  hintMarble: number | null;
  hintMoves: number[];
}

export function GameBoard({ board, selectedMarble, validMoves, onSlotClick, removedMarbles, hintMarble, hintMoves }: GameBoardProps) {
  // The classic cross-shaped solitaire board layout
  // -1 means no slot, 0-32 are the positions
  const layout = [
    [-1, -1,  0,  1,  2, -1, -1],
    [-1, -1,  3,  4,  5, -1, -1],
    [ 6,  7,  8,  9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [-1, -1, 27, 28, 29, -1, -1],
    [-1, -1, 30, 31, 32, -1, -1],
  ];

  return (
    <div className="relative w-[600px] h-[600px] flex items-center justify-center">
      {/* Contact shadow - board sitting on table with overhead lighting */}
      <div className="absolute inset-0 rounded-full" style={{
        background: 'radial-gradient(ellipse 90% 88% at 50% 48%, rgba(80,50,30,0.14) 0%, rgba(60,40,20,0.1) 35%, transparent 65%)',
        filter: 'blur(10px)',
        transform: 'translateY(6px) scaleY(0.92)'
      }} />

      {/* Soft ambient shadow - directly below board from overhead light */}
      <div className="absolute inset-0 rounded-full" style={{
        boxShadow: '0 12px 28px rgba(80,50,30,0.18), 0 6px 14px rgba(60,40,20,0.12), 0 2px 6px rgba(50,30,10,0.08)'
      }} />

      {/* Circular board with rim */}
      <div className="absolute inset-0 rounded-full shadow-xl" style={{
        transform: 'translateZ(0)',
        background: 'linear-gradient(140deg, #fdfcfa 0%, #faf8f5 40%, #f7f5f2 100%)'
      }}>
        {/* Outer edge - smooth rounded bevel with matte finish */}
        <div className="absolute inset-0 rounded-full" style={{
          background: 'linear-gradient(135deg, rgba(255,252,248,0.8) 0%, rgba(250,245,240,0.85) 50%, rgba(255,250,245,0.75) 100%)',
          boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.6), inset 0 -2px 5px rgba(0,0,0,0.04)'
        }} />

        {/* Honed white marble base with creamy undertones */}
        <div className="absolute inset-[16px] rounded-full" style={{
          background: 'linear-gradient(145deg, #fefdfb 0%, #faf8f5 30%, #f8f6f3 60%, #faf9f6 100%)'
        }} />

        {/* Creamy undertones - soft warmth */}
        <div className="absolute inset-[16px] rounded-full opacity-25" style={{
          background: `
            radial-gradient(circle at 28% 32%, rgba(250,245,235,0.35) 0%, transparent 50%),
            radial-gradient(circle at 72% 68%, rgba(245,240,230,0.3) 0%, transparent 48%),
            radial-gradient(circle at 50% 50%, rgba(255,250,240,0.28) 0%, transparent 55%)
          `
        }} />

        {/* Subtle grey veining - primary delicate lines */}
        <div className="absolute inset-[16px] rounded-full opacity-16" style={{
          background: `
            linear-gradient(125deg, transparent 0%, transparent 32%, rgba(180,185,190,0.12) 32.2%, rgba(170,175,180,0.08) 32.5%, transparent 32.8%, transparent 58%, rgba(175,180,185,0.1) 58.2%, rgba(165,170,175,0.07) 58.4%, transparent 58.7%),
            linear-gradient(155deg, transparent 0%, transparent 68%, rgba(185,190,195,0.11) 68.2%, rgba(175,180,185,0.08) 68.4%, transparent 68.6%)
          `
        }} />

        {/* Secondary soft grey veining */}
        <div className="absolute inset-[16px] rounded-full opacity-14" style={{
          background: `
            linear-gradient(95deg, transparent 0%, transparent 45%, rgba(180,185,190,0.09) 45.2%, rgba(170,175,180,0.06) 45.4%, transparent 45.7%, transparent 78%, rgba(175,180,185,0.1) 78.2%, rgba(165,170,175,0.07) 78.3%, transparent 78.5%),
            linear-gradient(210deg, transparent 0%, transparent 22%, rgba(185,190,195,0.08) 22.1%, rgba(175,180,185,0.05) 22.2%, transparent 22.4%)
          `
        }} />

        {/* Delicate natural marbling - organic patterns */}
        <div className="absolute inset-[16px] rounded-full opacity-12" style={{
          background: `
            radial-gradient(ellipse at 25% 35%, rgba(190,195,200,0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 70% 60%, rgba(185,190,195,0.08) 0%, transparent 45%),
            radial-gradient(ellipse at 48% 72%, rgba(180,185,190,0.09) 0%, transparent 42%)
          `
        }} />

        {/* Fine grey shadowing - subtle depth */}
        <div className="absolute inset-[16px] rounded-full opacity-10" style={{
          background: `
            radial-gradient(ellipse at 32% 28%, rgba(175,180,185,0.12) 0%, transparent 45%),
            radial-gradient(ellipse at 68% 65%, rgba(170,175,180,0.1) 0%, transparent 48%)
          `
        }} />

        {/* Faint translucent depth - stone luminosity */}
        <div className="absolute inset-[16px] rounded-full opacity-18" style={{
          background: `
            radial-gradient(circle at 40% 38%, rgba(255,255,255,0.3) 0%, transparent 52%),
            radial-gradient(circle at 65% 62%, rgba(253,252,250,0.25) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(250,248,245,0.22) 0%, transparent 58%)
          `
        }} />

        {/* Realistic stone texture - fine grain */}
        <div className="absolute inset-[16px] rounded-full opacity-08" style={{
          backgroundImage: `
            radial-gradient(circle at 18% 22%, rgba(200,205,210,0.08) 0%, transparent 1px),
            radial-gradient(circle at 42% 35%, rgba(195,200,205,0.06) 0%, transparent 0.8px),
            radial-gradient(circle at 65% 28%, rgba(205,210,215,0.07) 0%, transparent 0.9px),
            radial-gradient(circle at 32% 58%, rgba(198,203,208,0.06) 0%, transparent 0.85px),
            radial-gradient(circle at 58% 72%, rgba(202,207,212,0.07) 0%, transparent 0.9px),
            radial-gradient(circle at 78% 65%, rgba(196,201,206,0.06) 0%, transparent 0.8px)
          `,
          backgroundSize: '2.5px 2.5px, 2px 2px, 2.3px 2.3px, 2.1px 2.1px, 2.4px 2.4px, 2px 2px'
        }} />

        {/* Matte satin finish - soft overhead light */}
        <div className="absolute inset-[16px] rounded-full" style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.12) 18%, transparent 40%, rgba(255,255,255,0.08) 85%, rgba(255,255,255,0.15) 100%)'
        }} />

        {/* Subtle satin sheen - gentle specular highlight */}
        <div className="absolute inset-[16px] rounded-full" style={{
          background: 'radial-gradient(ellipse at 50% 18%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.15) 20%, transparent 40%)'
        }} />

        {/* Soft ambient reflection - minimal */}
        <div className="absolute inset-[16px] rounded-full opacity-40" style={{
          background: `
            linear-gradient(155deg, rgba(255,255,255,0.18) 0%, transparent 28%),
            linear-gradient(205deg, rgba(255,255,255,0.15) 0%, transparent 25%)
          `
        }} />

        {/* Elegant refined surface - minimal shimmer */}
        <div className="absolute inset-[16px] rounded-full opacity-20" style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 48%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.15) 52%, transparent 100%)'
        }} />

        {/* Outer rim groove for removed marbles */}
        <div className="absolute inset-[16px] rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]">
          {/* Groove edge bevel */}
          <div className="absolute inset-0 rounded-full" style={{
            boxShadow: 'inset 0 4px 6px rgba(255,255,255,0.3), inset 0 -4px 6px rgba(0,0,0,0.15)'
          }} />
          <div className="absolute inset-[20px] rounded-full border-4 border-gray-300/60" />

          {/* Inner raised playing surface */}
          <div className="absolute inset-[52px] rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.4)]" style={{
            background: 'linear-gradient(148deg, #fefdfb 0%, #faf8f5 28%, #f8f6f3 58%, #faf9f6 85%, #fcfbf8 100%)'
          }}>
            {/* Inner surface edge bevel - smooth matte */}
            <div className="absolute inset-0 rounded-full" style={{
              background: 'linear-gradient(135deg, rgba(255,252,248,0.75) 0%, rgba(250,245,240,0.8) 50%, rgba(255,250,245,0.7) 100%)',
              boxShadow: 'inset 0 4px 8px rgba(255,255,255,0.55), inset 0 -3px 6px rgba(0,0,0,0.04)'
            }} />

            {/* Honed white marble base with creamy undertones */}
            <div className="absolute inset-[16px] rounded-full" style={{
              background: 'linear-gradient(152deg, #fefdfb 0%, #faf8f5 25%, #f8f6f3 52%, #f9f7f4 78%, #fbfaf7 100%)'
            }} />

            {/* Creamy undertones - warm depth */}
            <div className="absolute inset-[16px] rounded-full opacity-28" style={{
              background: `
                radial-gradient(circle at 32% 35%, rgba(250,245,235,0.38) 0%, transparent 52%),
                radial-gradient(circle at 70% 66%, rgba(245,240,230,0.32) 0%, transparent 50%),
                radial-gradient(circle at 48% 50%, rgba(255,250,240,0.3) 0%, transparent 58%)
              `
            }} />

            {/* Subtle grey veining */}
            <div className="absolute inset-[16px] rounded-full opacity-18" style={{
              background: `
                linear-gradient(128deg, transparent 0%, transparent 35%, rgba(180,185,190,0.13) 35.2%, rgba(170,175,180,0.09) 35.5%, transparent 35.8%, transparent 62%, rgba(175,180,185,0.11) 62.2%, rgba(165,170,175,0.08) 62.4%, transparent 62.7%),
                linear-gradient(158deg, transparent 0%, transparent 72%, rgba(185,190,195,0.12) 72.2%, rgba(175,180,185,0.09) 72.4%, transparent 72.6%)
              `
            }} />

            {/* Matte satin finish */}
            <div className="absolute inset-[16px] rounded-full" style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.14) 16%, transparent 38%, rgba(255,255,255,0.1) 82%, rgba(255,255,255,0.18) 100%)'
            }} />

            {/* Gentle satin sheen */}
            <div className="absolute inset-[16px] rounded-full" style={{
              background: 'radial-gradient(ellipse at 50% 15%, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.18) 18%, transparent 38%)'
            }} />
          </div>
        </div>

        {/* Removed marbles in the rim groove */}
        {removedMarbles.map((marble, index) => {
          const angle = index * 11.25;
          const radius = 258;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <div
              key={`removed-${marble}-${index}`}
              className="absolute top-1/2 left-1/2 w-9 h-9"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              {/* Removed Indian Emerald marble */}
              <div className="relative w-9 h-9 rounded-full">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 shadow-[0_3px_12px_rgba(16,185,129,0.4),0_1px_4px_rgba(0,0,0,0.3)]" />
                <div className="absolute inset-0 rounded-full opacity-70" style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(52,211,153,0.4) 0%, rgba(16,185,129,0.5) 35%, rgba(5,150,105,0.7) 70%, rgba(4,120,87,0.9) 100%)'
                }} />
                <div className="absolute inset-0 rounded-full opacity-50" style={{
                  backgroundImage: `
                    radial-gradient(circle at 28% 35%, rgba(255,255,255,0.25) 0%, transparent 3px),
                    radial-gradient(circle at 65% 45%, rgba(255,255,255,0.18) 0%, transparent 2.5px),
                    radial-gradient(circle at 42% 68%, rgba(255,255,255,0.22) 0%, transparent 3px)
                  `
                }} />
                <div className="absolute inset-0 rounded-full opacity-35" style={{
                  background: `
                    linear-gradient(125deg, transparent 0%, transparent 25%, rgba(255,255,255,0.15) 25.5%, transparent 26%),
                    linear-gradient(65deg, transparent 0%, transparent 58%, rgba(255,255,255,0.18) 58.2%, transparent 58.5%)
                  `
                }} />
                <div className="absolute top-[7px] left-[8px] w-[12px] h-[12px] rounded-full bg-white/80 blur-[1px]" />
                <div className="absolute top-[8px] left-[9px] w-[8px] h-[8px] rounded-full bg-white/90" />
                <div className="absolute top-[9px] left-[10px] w-[5px] h-[5px] rounded-full bg-white shadow-[0_0_3px_rgba(255,255,255,0.9)]" />
                <div className="absolute top-0 inset-x-0 h-[45%] rounded-t-full bg-gradient-to-b from-emerald-300/35 via-emerald-400/20 to-transparent" />
                <div className="absolute inset-0 rounded-full border-[0.5px] border-emerald-400/40" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Board grid - centered on the raised surface */}
      <div className="relative z-10 grid grid-cols-7 gap-1 p-8">
        {layout.map((row, rowIndex) =>
          row.map((position, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`}>
              {position === -1 ? (
                <div className="w-12 h-12" />
              ) : (
                <MarbleSlot
                  hasMarble={board[position]}
                  isSelected={selectedMarble === position}
                  isValidMove={validMoves.includes(position)}
                  onClick={() => onSlotClick(position)}
                  position={position}
                  isHintMarble={hintMarble === position}
                  isHintMove={hintMoves.includes(position)}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
