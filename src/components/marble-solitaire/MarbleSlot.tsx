interface MarbleSlotProps {
  hasMarble: boolean;
  isSelected: boolean;
  isValidMove: boolean;
  onClick: () => void;
  position: number;
  isHintMarble: boolean;
  isHintMove: boolean;
}

export function MarbleSlot({ hasMarble, isSelected, isValidMove, onClick, isHintMarble, isHintMove }: MarbleSlotProps) {
  return (
    <div
      onClick={onClick}
      className="relative w-12 h-12 flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
    >
      {/* Hole in the white marble board with Indian-oriental pattern */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-200/90 to-gray-300/95 shadow-inner overflow-hidden">
        {/* Inner shadow for depth */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_3px_12px_rgba(0,0,0,0.65)]" />

        {/* Indian-Oriental decorative pattern base */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-100/60 via-orange-50/50 to-red-100/40" />

        {/* Central mandala pattern */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Center dot */}
          <div className="absolute w-1 h-1 rounded-full bg-red-600/40" />

          {/* Inner petals ring */}
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(circle at 50% 50%, transparent 15%, rgba(220,38,38,0.25) 16%, transparent 17%),
              radial-gradient(circle at 50% 50%, transparent 20%, rgba(234,88,12,0.2) 21%, transparent 23%)
            `
          }} />
        </div>

        {/* Decorative paisley-inspired curves */}
        <div className="absolute inset-0 rounded-full opacity-40" style={{
          background: `
            radial-gradient(ellipse 8px 12px at 50% 30%, rgba(220,38,38,0.4) 0%, transparent 70%),
            radial-gradient(ellipse 8px 12px at 50% 70%, rgba(220,38,38,0.4) 0%, transparent 70%),
            radial-gradient(ellipse 12px 8px at 30% 50%, rgba(234,88,12,0.35) 0%, transparent 70%),
            radial-gradient(ellipse 12px 8px at 70% 50%, rgba(234,88,12,0.35) 0%, transparent 70%)
          `
        }} />

        {/* Floral motif corners */}
        <div className="absolute inset-0 rounded-full opacity-30" style={{
          background: `
            radial-gradient(ellipse 6px 6px at 35% 35%, rgba(220,38,38,0.5) 0%, transparent 60%),
            radial-gradient(ellipse 6px 6px at 65% 35%, rgba(220,38,38,0.5) 0%, transparent 60%),
            radial-gradient(ellipse 6px 6px at 35% 65%, rgba(220,38,38,0.5) 0%, transparent 60%),
            radial-gradient(ellipse 6px 6px at 65% 65%, rgba(220,38,38,0.5) 0%, transparent 60%)
          `
        }} />

        {/* Outer decorative ring */}
        <div className="absolute inset-0 rounded-full" style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 65%, rgba(234,88,12,0.3) 70%, transparent 75%)'
        }} />

        {/* Fine decorative dots */}
        <div className="absolute inset-0 rounded-full opacity-50" style={{
          backgroundImage: `
            radial-gradient(circle at 50% 25%, rgba(220,38,38,0.6) 0%, transparent 2px),
            radial-gradient(circle at 25% 50%, rgba(220,38,38,0.6) 0%, transparent 2px),
            radial-gradient(circle at 75% 50%, rgba(220,38,38,0.6) 0%, transparent 2px),
            radial-gradient(circle at 50% 75%, rgba(220,38,38,0.6) 0%, transparent 2px)
          `
        }} />

        {/* Subtle marble color on edges */}
        <div className="absolute inset-0 rounded-full" />
      </div>

      {/* Indian Emerald marble */}
      {hasMarble && (
        <div className={`relative w-9 h-9 rounded-full transition-all duration-200 ${isSelected ? 'scale-110' : ''}`}>
          {/* Deep emerald green base with translucency */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 shadow-[0_3px_12px_rgba(16,185,129,0.4),0_1px_4px_rgba(0,0,0,0.3)]" />

          {/* Translucent emerald layers - depth */}
          <div className="absolute inset-0 rounded-full opacity-70" style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(52,211,153,0.4) 0%, rgba(16,185,129,0.5) 35%, rgba(5,150,105,0.7) 70%, rgba(4,120,87,0.9) 100%)'
          }} />

          {/* Frozen crystalline structure - ice-like inclusions */}
          <div className="absolute inset-0 rounded-full opacity-50" style={{
            backgroundImage: `
              radial-gradient(circle at 28% 35%, rgba(255,255,255,0.25) 0%, transparent 3px),
              radial-gradient(circle at 65% 45%, rgba(255,255,255,0.18) 0%, transparent 2.5px),
              radial-gradient(circle at 42% 68%, rgba(255,255,255,0.22) 0%, transparent 3px),
              radial-gradient(circle at 72% 72%, rgba(255,255,255,0.15) 0%, transparent 2px),
              radial-gradient(circle at 18% 58%, rgba(255,255,255,0.2) 0%, transparent 2.5px)
            `
          }} />

          {/* Crystalline fracture patterns - frozen texture */}
          <div className="absolute inset-0 rounded-full opacity-35" style={{
            background: `
              linear-gradient(125deg, transparent 0%, transparent 25%, rgba(255,255,255,0.15) 25.5%, transparent 26%, transparent 45%, rgba(209,250,229,0.12) 45.3%, transparent 45.6%),
              linear-gradient(65deg, transparent 0%, transparent 58%, rgba(255,255,255,0.18) 58.2%, transparent 58.5%, transparent 78%, rgba(209,250,229,0.1) 78.2%, transparent 78.4%),
              linear-gradient(200deg, transparent 0%, transparent 35%, rgba(255,255,255,0.12) 35.2%, transparent 35.5%)
            `
          }} />

          {/* Internal "jardin" inclusions - natural emerald characteristic */}
          <div className="absolute inset-0 rounded-full opacity-45" style={{
            backgroundImage: `
              radial-gradient(ellipse 2px 3px at 32% 28%, rgba(6,95,70,0.6) 0%, transparent 70%),
              radial-gradient(ellipse 3px 2px at 58% 38%, rgba(6,95,70,0.5) 0%, transparent 70%),
              radial-gradient(ellipse 2.5px 2.5px at 45% 62%, rgba(6,95,70,0.55) 0%, transparent 70%),
              radial-gradient(ellipse 2px 2px at 68% 58%, rgba(6,95,70,0.45) 0%, transparent 70%)
            `
          }} />

          {/* Color banding - natural color variation in emerald */}
          <div className="absolute inset-0 rounded-full opacity-40" style={{
            background: `
              radial-gradient(circle at 35% 40%, rgba(52,211,153,0.35) 0%, transparent 45%),
              radial-gradient(circle at 60% 65%, rgba(6,95,70,0.4) 0%, transparent 40%),
              radial-gradient(circle at 48% 52%, rgba(16,185,129,0.3) 0%, transparent 50%)
            `
          }} />

          {/* Primary specular highlight - bright gemstone shine */}
          <div className="absolute top-[7px] left-[8px] w-[12px] h-[12px] rounded-full bg-white/80 blur-[1px]" />
          <div className="absolute top-[8px] left-[9px] w-[8px] h-[8px] rounded-full bg-white/90" />
          <div className="absolute top-[9px] left-[10px] w-[5px] h-[5px] rounded-full bg-white shadow-[0_0_3px_rgba(255,255,255,0.9)]" />

          {/* Secondary highlight - catching light */}
          <div className="absolute top-[5px] right-[9px] w-[7px] h-[7px] rounded-full bg-white/60 blur-[1px]" />

          {/* Top hemisphere light transmission */}
          <div className="absolute top-0 inset-x-0 h-[45%] rounded-t-full bg-gradient-to-b from-emerald-300/35 via-emerald-400/20 to-transparent" />

          {/* Translucent light glow through emerald */}
          <div className="absolute inset-[6px] rounded-full bg-gradient-to-br from-emerald-400/25 via-transparent to-transparent blur-[2px]" />

          {/* Bottom depth shadow - darker emerald core */}
          <div className="absolute bottom-0 inset-x-0 h-[50%] rounded-b-full bg-gradient-to-t from-emerald-950/60 via-emerald-900/35 to-transparent" />

          {/* Subsurface scattering - light passing through edges */}
          <div className="absolute inset-0 rounded-full" style={{
            background: 'radial-gradient(circle at 65% 68%, transparent 45%, rgba(52,211,153,0.25) 65%, rgba(16,185,129,0.35) 80%, transparent 100%)'
          }} />

          {/* Rim light - emerald edge glow */}
          <div className="absolute inset-0 rounded-full" style={{
            background: 'linear-gradient(135deg, transparent 25%, rgba(16,185,129,0.4) 48%, rgba(52,211,153,0.5) 50%, rgba(16,185,129,0.4) 52%, transparent 75%)'
          }} />

          {/* Frosted/icy surface texture */}
          <div className="absolute inset-0 rounded-full opacity-25" style={{
            backgroundImage: `
              radial-gradient(circle at 22% 18%, rgba(255,255,255,0.3) 0%, transparent 1.5px),
              radial-gradient(circle at 48% 25%, rgba(209,250,229,0.25) 0%, transparent 1.2px),
              radial-gradient(circle at 68% 32%, rgba(255,255,255,0.28) 0%, transparent 1.3px),
              radial-gradient(circle at 35% 55%, rgba(209,250,229,0.22) 0%, transparent 1px),
              radial-gradient(circle at 58% 78%, rgba(255,255,255,0.26) 0%, transparent 1.4px),
              radial-gradient(circle at 78% 68%, rgba(209,250,229,0.24) 0%, transparent 1.1px)
            `
          }} />

          {/* Gemstone facet reflections */}
          <div className="absolute inset-0 rounded-full opacity-30" style={{
            background: `
              linear-gradient(155deg, transparent 30%, rgba(255,255,255,0.2) 48%, transparent 52%),
              linear-gradient(85deg, transparent 60%, rgba(209,250,229,0.18) 68%, transparent 72%)
            `
          }} />

          {/* Edge definition with emerald glow */}
          <div className="absolute inset-0 rounded-full border-[0.5px] border-emerald-400/40" />

          {/* Reflected light from white marble surface */}
          <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 w-[40%] h-[18%] rounded-full bg-slate-200/20 blur-[2px]" />

          {/* Contact shadow */}
          <div className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-[70%] h-[15%] rounded-full bg-gray-900/30 blur-[4px]" />

          {/* Ambient occlusion with emerald tint */}
          <div className="absolute inset-0 rounded-full" style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 55%, rgba(6,78,59,0.18) 85%)'
          }} />

          {/* Selection ring */}
          {isSelected && (
            <div className="absolute -inset-1 rounded-full border-2 border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.8)] animate-pulse" />
          )}

          {/* Hint ring - golden amber glow */}
          {isHintMarble && (
            <div className="absolute -inset-1 rounded-full border-2 border-amber-400 shadow-[0_0_16px_rgba(251,191,36,0.9)] animate-pulse" />
          )}
        </div>
      )}

      {/* Valid move indicator */}
      {!hasMarble && isValidMove && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-blue-400/50 border-2 border-blue-400 animate-pulse" />
        </div>
      )}

      {/* Hint move indicator - golden amber */}
      {!hasMarble && isHintMove && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-amber-400/50 border-2 border-amber-400 animate-pulse" />
        </div>
      )}
    </div>
  );
}
