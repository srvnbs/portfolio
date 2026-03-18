import { useRef, useEffect, useState } from "react";

const bayerMatrix = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((row) => row.map((v) => ((v + 0.5) / 16) * 255));

const BOOT_CHARS = "0123456789ABCDEF>_$%#@!&";
const INTRO_DURATION = 120;
const FLICKER_CYCLES = 3;

class Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  active: boolean;
  color: string;
  originalColor: string;
  char: string;
  originalChar: string;
  isAnimatedEdge: boolean;
  brightness: number;
  decryptFrame: number;
  resolved: boolean;

  constructor(
    tx: number,
    ty: number,
    color: string,
    char: string,
    isAnimatedEdge: boolean = false,
    brightness: number = 255
  ) {
    this.targetX = tx;
    this.targetY = ty;
    this.color = color;
    this.originalColor = color;
    this.char = char;
    this.originalChar = char;
    this.isAnimatedEdge = isAnimatedEdge;
    this.brightness = brightness;
    this.x = tx;
    this.y = ty;
    this.size = Math.random() > 0.7 ? Math.random() * 0.8 + 0.6 : 1.0;
    this.active = true;
    this.decryptFrame = 0;
    this.resolved = false;
  }

  getColorForBrightness(alpha: number): string {
    return `rgba(0, 255, 65, ${alpha})`;
  }

  update(
    frame: number,
    mouseX: number,
    mouseY: number,
    isHovering: boolean
  ) {
    this.active = true;
    let offsetX = 0;
    let offsetY = 0;

    const baseOpacity = Math.max(0.3, 0.25 + (this.brightness / 255) * 0.75);

    if (!this.resolved) {
      if (frame < this.decryptFrame) {
        if (Math.random() < 0.3) {
          this.char = BOOT_CHARS[Math.floor(Math.random() * BOOT_CHARS.length)];
        }
        const noiseAlpha = 0.15 + Math.random() * 0.25;
        this.color = this.getColorForBrightness(noiseAlpha);
        this.x = this.targetX + (Math.random() - 0.5) * 2;
        this.y = this.targetY + (Math.random() - 0.5) * 2;
        return;
      }

      const flickerWindow = FLICKER_CYCLES * 4;
      const elapsed = frame - this.decryptFrame;
      if (elapsed < flickerWindow) {
        if (elapsed % 4 < 2) {
          this.char = BOOT_CHARS[Math.floor(Math.random() * BOOT_CHARS.length)];
          this.color = this.getColorForBrightness(0.6);
        } else {
          this.char = this.originalChar;
          this.color = this.getColorForBrightness(baseOpacity);
        }
        this.x = this.targetX;
        this.y = this.targetY;
        return;
      }

      this.resolved = true;
    }

    this.char = this.originalChar;
    this.color = this.getColorForBrightness(baseOpacity);

    let isInsideLens = false;
    let isLensEdge = false;

    if (isHovering) {
      const dx = Math.abs(this.targetX - mouseX);
      const dy = Math.abs(this.targetY - mouseY);
      if (dx < 90 && dy < 90) {
        isInsideLens = true;
      } else if (dx < 102 && dy < 102) {
        isLensEdge = true;
      }
    }

    if (isInsideLens) {
      this.active = false;
    } else if (isLensEdge) {
      const hex = "0123456789ABCDEF>_$";
      this.char = hex[Math.floor(Math.random() * hex.length)];
      this.color = this.getColorForBrightness(0.8);
      if (Math.random() < 0.4) offsetX = (Math.random() - 0.5) * 12;
      if (Math.random() < 0.4) offsetY = (Math.random() - 0.5) * 12;
    } else {
      if (Math.random() < 0.0005) {
        this.char = Math.random() > 0.5 ? "0" : "1";
        offsetX = (Math.random() - 0.5) * 5;
      }
    }

    this.x = this.targetX + offsetX;
    this.y = this.targetY + offsetY;
  }
}

export function TerminalGlitchCanvas({ imageUrl }: { imageUrl: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const isHovering = useRef(false);
  const isTouch = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let frameCount = 0;
    let width = 800;
    let height = 800;

    let imgDrawX = 0;
    let imgDrawY = 0;
    let imgDrawW = 0;
    let imgDrawH = 0;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      setLoading(false);

      const container = canvas.parentElement;
      const containerW = container?.clientWidth || 800;
      const containerH = container?.clientHeight || 600;

      width = Math.min(containerW, 1200);
      height = Math.min(containerH, 900);

      canvas.width = width;
      canvas.height = height;

      const dotSpacing = 7;
      const cw = Math.floor(width / dotSpacing);
      const ch = Math.floor(height / dotSpacing);

      const offscreen = document.createElement("canvas");
      offscreen.width = cw;
      offscreen.height = ch;
      const octx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!octx) return;

      octx.clearRect(0, 0, cw, ch);

      const imgAspect = img.width / img.height;
      const fillScale = 0.95;
      let drawH = ch * fillScale;
      let drawW = drawH * imgAspect;

      const drawX = (cw - drawW) / 2;
      const drawY = ch - drawH + ch * 0.05;

      octx.drawImage(img, drawX, drawY, drawW, drawH);

      imgDrawX = drawX * dotSpacing;
      imgDrawY = drawY * dotSpacing;
      imgDrawW = drawW * dotSpacing;
      imgDrawH = drawH * dotSpacing;

      const imageData = octx.getImageData(0, 0, cw, ch).data;
      particles = [];

      for (let y = 0; y < ch; y++) {
        for (let x = 0; x < cw; x++) {
          const idx = (y * cw + x) * 4;
          const r = imageData[idx];
          const g = imageData[idx + 1];
          const b = imageData[idx + 2];
          const a = imageData[idx + 3];

          if (a < 64) continue;
          if (r > 240 && g > 240 && b > 240) continue;

          const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

          const asciiChars = "@%#*+=:-. ";
          const threshold = bayerMatrix[y % 4][x % 4];
          const ditheredBrightness = Math.max(
            0,
            Math.min(255, brightness + (threshold - 128) * 0.5)
          );

          const charIndex = Math.floor(
            (ditheredBrightness / 256) * asciiChars.length
          );
          const char = asciiChars[charIndex];

          if (char !== " ") {
            const targetX = x * dotSpacing + dotSpacing / 2;
            const targetY = y * dotSpacing + dotSpacing / 2;
            const dotColor = `rgba(${r}, ${g}, ${b}, 0.95)`;

            let isEdge = false;
            if (x > 0 && x < cw - 1 && y > 0 && y < ch - 1) {
              const dirs = [
                [0, -1],
                [0, 1],
                [-1, 0],
                [1, 0],
              ];
              for (const [dx, dy] of dirs) {
                const nIdx = ((y + dy) * cw + (x + dx)) * 4;
                const nA = imageData[nIdx + 3];
                const nR = imageData[nIdx];
                const nG = imageData[nIdx + 1];
                const nB = imageData[nIdx + 2];
                if (nA < 128 || (nR > 240 && nG > 240 && nB > 240)) {
                  isEdge = true;
                  break;
                }
              }
            } else {
              isEdge = true;
            }

            const isAnimatedEdge = isEdge && Math.random() < 0.15;

            particles.push(
              new Particle(targetX, targetY, dotColor, char, isAnimatedEdge, brightness)
            );
          }
        }
      }

      particles.sort(() => Math.random() - 0.5);

      const centerX = width / 2;
      const centerY = height / 2;
      const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
      for (const p of particles) {
        const dx = p.targetX - centerX;
        const dy = p.targetY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy) / maxDist;
        p.decryptFrame = Math.floor(
          20 + dist * (INTRO_DURATION - 30) + Math.random() * 20
        );
      }

      const bgColor = "#050505";
      const scanColor = "rgba(0, 255, 65, 0.06)";
      const lensAccent = "0, 255, 255";

      // Static background noise — sparse random chars in empty areas
      const occupiedSet = new Set<string>();
      for (const p of particles) {
        const col = Math.floor(p.targetX / dotSpacing);
        const row = Math.floor(p.targetY / dotSpacing);
        occupiedSet.add(`${col},${row}`);
      }
      const bgCharsData: { x: number; y: number; char: string }[] = [];
      const BG_CHARS = "01.:;+-=~";
      const bgCols = Math.floor(width / dotSpacing);
      const bgRows = Math.floor(height / dotSpacing);
      for (let row = 0; row < bgRows; row++) {
        for (let col = 0; col < bgCols; col++) {
          if (occupiedSet.has(`${col},${row}`)) continue;
          if (Math.random() < 0.12) {
            bgCharsData.push({
              x: col * dotSpacing + dotSpacing / 2,
              y: row * dotSpacing + dotSpacing / 2,
              char: BG_CHARS[Math.floor(Math.random() * BG_CHARS.length)],
            });
          }
        }
      }

      const render = () => {
        frameCount++;

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = scanColor;
        for (let y = 0; y < height; y += 3) {
          ctx.fillRect(0, y, width, 1);
        }

        // Static background noise chars
        ctx.font = `${dotSpacing - 1}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgba(0, 255, 65, 0.08)";
        for (const bg of bgCharsData) {
          ctx.fillText(bg.char, bg.x, bg.y);
        }


        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.update(frameCount, mousePos.current.x, mousePos.current.y, isHovering.current);
          if (p.active) {
            const fontSize = Math.floor(9 * p.size);
            ctx.font = `bold ${fontSize}px monospace`;
            ctx.fillStyle = p.color;
            ctx.fillText(p.char, Math.floor(p.x), Math.floor(p.y));
          }
        }

        if (isHovering.current) {
          const tx = mousePos.current.x;
          const ty = mousePos.current.y;
          const isMobileCanvas = width < 500;
          const touchActive = isTouch.current;

          const size = touchActive ? 156 : isMobileCanvas ? 60 : 90;
          const cornerLen = touchActive ? 29 : isMobileCanvas ? 17 : 24;

          const cx = tx;
          const cy = ty;

          ctx.save();
          ctx.beginPath();
          ctx.rect(cx - size, cy - size, size * 2, size * 2);
          ctx.clip();
          ctx.fillStyle = bgColor;
          ctx.fillRect(cx - size, cy - size, size * 2, size * 2);
          ctx.drawImage(img, imgDrawX, imgDrawY, imgDrawW, imgDrawH);
          ctx.fillStyle = `rgba(${lensAccent}, 0.05)`;
          for (let y = cy - size; y < cy + size; y += 4) {
            ctx.fillRect(cx - size, y, size * 2, 1);
          }
          ctx.restore();

          ctx.strokeStyle = `rgba(${lensAccent}, 0.8)`;
          ctx.lineWidth = 2;

          ctx.beginPath();
          ctx.moveTo(cx - size, cy - size + cornerLen);
          ctx.lineTo(cx - size, cy - size);
          ctx.lineTo(cx - size + cornerLen, cy - size);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx + size - cornerLen, cy - size);
          ctx.lineTo(cx + size, cy - size);
          ctx.lineTo(cx + size, cy - size + cornerLen);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx - size, cy + size - cornerLen);
          ctx.lineTo(cx - size, cy + size);
          ctx.lineTo(cx - size + cornerLen, cy + size);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx + size - cornerLen, cy + size);
          ctx.lineTo(cx + size, cy + size);
          ctx.lineTo(cx + size, cy + size - cornerLen);
          ctx.stroke();

          ctx.strokeStyle = `rgba(${lensAccent}, 0.3)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cx, cy - 15);
          ctx.lineTo(cx, cy + 15);
          ctx.moveTo(cx - 15, cy);
          ctx.lineTo(cx + 15, cy);
          ctx.stroke();

          const scanOffset = Math.sin(frameCount * 0.05) * size;
          ctx.strokeStyle = `rgba(${lensAccent}, 0.5)`;
          ctx.beginPath();
          ctx.moveTo(cx - size, cy + scanOffset);
          ctx.lineTo(cx + size, cy + scanOffset);
          ctx.stroke();
          ctx.fillStyle = `rgba(${lensAccent}, 0.1)`;
          ctx.fillRect(cx - size, cy + scanOffset - 2, size * 2, 4);

          if (!isMobileCanvas && !touchActive) {
            ctx.fillStyle = `rgba(${lensAccent}, 0.9)`;
            ctx.font = '10px monospace';
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";

            const hex1 = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, "0").toUpperCase();
            const hex2 = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, "0").toUpperCase();

            ctx.fillText(`DEC::${hex1}`, cx + size + 10, cy - size + 10);
            ctx.fillText(`LOC::[${Math.floor(cx)},${Math.floor(cy)}]`, cx + size + 10, cy - size + 25);
            ctx.fillText(`SYS::${hex2}`, cx + size + 10, cy - size + 40);

            ctx.textAlign = "right";
            ctx.fillText("TRG_LCK", cx - size - 10, cy + size - 5);
          }
        }

        animationFrameId = requestAnimationFrame(render);
      };

      render();
    };

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [imageUrl]);

  return (
    <div className="w-full h-full relative flex items-center justify-center rounded-lg overflow-hidden bg-[#050505]">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 z-10 bg-[#050505]">
          <div className="w-10 h-10 border-2 rounded-full animate-spin border-neutral-800 border-t-neutral-400" />
          <div className="font-mono text-xs tracking-[0.2em] animate-pulse text-neutral-500">
            PROCESSING IMAGE DATA...
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        onMouseMove={(e) => {
          if (!canvasRef.current) return;
          const rect = canvasRef.current.getBoundingClientRect();
          const scaleX = canvasRef.current.width / rect.width;
          const scaleY = canvasRef.current.height / rect.height;
          mousePos.current = {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY,
          };
        }}
        onMouseEnter={() => {
          isHovering.current = true;
          isTouch.current = false;
        }}
        onMouseLeave={() => {
          isHovering.current = false;
          mousePos.current = { x: -1000, y: -1000 };
        }}
        onTouchStart={(e) => {
          if (!canvasRef.current) return;
          isTouch.current = true;
          isHovering.current = true;
          const rect = canvasRef.current.getBoundingClientRect();
          const scaleX = canvasRef.current.width / rect.width;
          const scaleY = canvasRef.current.height / rect.height;
          const touch = e.touches[0];
          mousePos.current = {
            x: (touch.clientX - rect.left) * scaleX,
            y: (touch.clientY - rect.top) * scaleY,
          };
        }}
        onTouchMove={(e) => {
          if (!canvasRef.current) return;
          const rect = canvasRef.current.getBoundingClientRect();
          const scaleX = canvasRef.current.width / rect.width;
          const scaleY = canvasRef.current.height / rect.height;
          const touch = e.touches[0];
          mousePos.current = {
            x: (touch.clientX - rect.left) * scaleX,
            y: (touch.clientY - rect.top) * scaleY,
          };
        }}
        onTouchEnd={() => {
          isHovering.current = false;
          mousePos.current = { x: -1000, y: -1000 };
        }}
        onTouchCancel={() => {
          isHovering.current = false;
          mousePos.current = { x: -1000, y: -1000 };
        }}
        className={`w-full h-full object-contain cursor-crosshair ${loading ? "opacity-0" : "opacity-100"}`}
        style={{
          filter: "drop-shadow(0px 0px 3px rgba(255,255,255,0.05))",
          touchAction: "pan-y",
        }}
      />
    </div>
  );
}
