import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../components/Layout';

const poem = [
  'The morning folds its silver map',
  'over rooftops softened by rain.',
  'A quiet street forgets its name,',
  'and windows hold the cloudy light.',
  'I walk where puddles keep the sky,',
  'one trembling piece at a time.',
  'The wind unthreads a passing word;',
  'it drifts between the falling drops.',
  'A stranger lowers their small umbrella,',
  'chin tucked toward the weather,',
  'while letters loosen from the page',
  'and gather briefly on the curve.',
  'They slide, then let the daylight go.',
  'The street keeps nothing, yet remembers',
  'how every story sounds like rain.',
];

type RainParticle = {
  character: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  state: 'falling' | 'sliding';
  age: number;
  slideDirection: number;
};

function UmbrellaFigure({ color }: { color: string }) {
  return (
    <svg
      className="letter-rain-figure"
      viewBox="0 0 320 340"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        className="letter-rain-canopy"
        d="M22 105 Q160 6 298 105 Q282 95 266 105 Q250 95 234 105 Q218 95 202 105 Q186 95 170 105 Q154 95 138 105 Q122 95 106 105 Q90 95 74 105 Q58 95 42 105 Q32 99 22 105Z"
      />
      <path d="M160 28 L160 207 Q160 222 174 222 Q184 222 184 212" />
      <path d="M160 29 L36 102 M160 29 L92 102 M160 29 L228 102 M160 29 L284 102" strokeWidth="1.25" />
      <path d="M181 153 Q190 157 193 168 L197 184" />
      <path d="M154 150 Q145 153 142 164 L137 180" />
      <path d="M143 162 Q151 173 169 174 Q187 174 194 163" />
      <path d="M150 167 Q145 177 148 190 L154 204 Q169 212 185 204 L191 188 Q193 177 187 169" />
      <path d="M149 176 Q154 180 161 179 M177 179 Q183 181 188 176" strokeWidth="1.4" />
      <path d="M163 182 Q159 188 164 189" strokeWidth="1.4" />
      <path d="M157 197 Q168 201 179 196" strokeWidth="1.4" />
      <path d="M153 205 Q141 208 132 216 L121 248 Q119 257 127 259 L155 261" />
      <path d="M184 205 Q197 210 205 220 L214 245 Q218 253 211 257 L190 261" />
      <path d="M133 218 Q154 230 200 218" />
      <path d="M154 207 L150 260 M184 207 L190 260" />
      <path d="M151 259 L147 303 Q145 310 137 314 L126 318 Q122 321 126 324 L158 324 Q163 322 162 317 L163 262" />
      <path d="M190 259 L195 302 Q196 309 203 313 L217 319 Q221 322 217 324 L184 324 Q180 322 181 317 L177 263" />
      <path d="M143 153 Q147 146 154 145 M183 146 Q188 148 190 154" strokeWidth="1.5" />
    </svg>
  );
}

export default function LetterRain() {
  const { theme } = useTheme();
  const lineRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<RainParticle[]>([]);

  useEffect(() => {
    document.title = 'Letter Rain - Sai Sravan Biyyapu';
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const resizeCanvas = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const releaseLine = (line: HTMLParagraphElement) => {
      const letters = line.querySelectorAll<HTMLElement>('.letter-rain-character');

      letters.forEach((letter) => {
        const character = letter.textContent ?? '';
        if (!character.trim()) return;

        const rect = letter.getBoundingClientRect();
        particlesRef.current.push({
          character,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          vx: (Math.random() - 0.5) * 70,
          vy: 45 + Math.random() * 60,
          state: 'falling',
          age: 0,
          slideDirection: 0,
        });
      });
      line.classList.add('letter-rain-spent');
      line.setAttribute('aria-label', line.textContent ?? '');
      line.setAttribute('aria-label', line.textContent ?? '');
    };

    let lastScrollY = window.scrollY;
    if (lastScrollY > 0) figureRef.current?.classList.add('letter-rain-art-active');
    const checkLines = () => {
      const scrollY = window.scrollY;
      if (scrollY > 0) figureRef.current?.classList.add('letter-rain-art-active');
      if (scrollY <= lastScrollY) {
        lastScrollY = scrollY;
        return;
      }
      lastScrollY = scrollY;

      lineRefs.current.forEach((line) => {
        if (line && !line.classList.contains('letter-rain-spent') && line.getBoundingClientRect().top <= 0) {
          releaseLine(line);
        }
      });
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', checkLines, { passive: true });

    let frame = 0;
    let previousTime = performance.now();

    const draw = (time: number) => {
      const delta = Math.min((time - previousTime) / 1000, 0.04);
      previousTime = time;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const figureBounds = figureRef.current?.getBoundingClientRect();
      const scale = figureBounds ? figureBounds.width / 320 : 1;
      const canopyCenter = figureBounds ? figureBounds.left + figureBounds.width / 2 : 0;
      const canopyTop = figureBounds ? figureBounds.top + 6 * scale : 0;
      const canopyHalfWidth = 138 * scale;

      context.fillStyle = theme.text;
      context.font = '18px Merriweather, Georgia, serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.age += delta;
        if (particle.age > 7) return false;

        if (particle.state === 'sliding' && figureBounds) {
          particle.x += particle.slideDirection * 58 * delta;
          const distance = Math.min(Math.abs(particle.x - canopyCenter) / canopyHalfWidth, 1);
          particle.y = canopyTop + 99 * scale * distance ** 1.5;
          if (Math.abs(particle.x - canopyCenter) >= canopyHalfWidth) {
            particle.state = 'falling';
            particle.vx = particle.slideDirection * 50;
            particle.vy = 70;
          }
        } else {
          const previousY = particle.y;
          if (figureBounds) {
            const pull = Math.max(-120, Math.min(120, (canopyCenter - particle.x) * 0.35));
            particle.vx += pull * delta;
          }
          particle.x += particle.vx * delta;
          particle.y += particle.vy * delta;
          particle.vy += 480 * delta;

          if (figureBounds && particle.vy > 0 && particle.x >= canopyCenter - canopyHalfWidth && particle.x <= canopyCenter + canopyHalfWidth) {
            const distance = Math.abs(particle.x - canopyCenter) / canopyHalfWidth;
            const canopyY = canopyTop + 99 * scale * distance ** 1.5;
            if (previousY <= canopyY && particle.y >= canopyY) {
              particle.y = canopyY;
              particle.state = 'sliding';
              particle.slideDirection = particle.x < canopyCenter
                ? -1
                : particle.x > canopyCenter
                  ? 1
                  : Math.random() < 0.5 ? -1 : 1;
            }
          }
        }

        context.globalAlpha = Math.max(0, 1 - particle.age / 7);
        context.fillText(particle.character, particle.x, particle.y);
        context.globalAlpha = 1;
        return particle.y < window.innerHeight + 40 && particle.x > -40 && particle.x < window.innerWidth + 40;
      });

      frame = window.requestAnimationFrame(draw);
    };

    frame = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', checkLines);
    };
  }, [theme.text]);

  return (
    <main className="letter-rain-page" style={{ color: theme.text }}>
      <div className="letter-rain-content">
        <Link
          to="/playground"
          className="letter-rain-back"
          style={{ color: theme.textMuted }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to playground
        </Link>

        <header className="letter-rain-header">
          <p className="letter-rain-kicker" style={{ color: theme.textMuted }}>A SCROLLING EXPERIMENT</p>
          <h1>When words become weather</h1>
          <p className="letter-rain-instruction" style={{ color: theme.textMuted }}>
            Scroll slowly. When a line slips away, its letters will fall like rain.
          </p>
        </header>

        <section className="letter-rain-poem" aria-label="A poem about rain">
          {poem.map((line, index) => (
            <p
              className="letter-rain-line"
              key={line}
              ref={(element) => { lineRefs.current[index] = element; }}
            >
              {Array.from(line).map((character, characterIndex) => (
                <span className="letter-rain-character" key={`${characterIndex}-${character}`}>
                  {character === ' ' ? '\u00a0' : character}
                </span>
              ))}
            </p>
          ))}
        </section>
        <div className="letter-rain-runway" aria-hidden="true" />
      </div>

      <div className="letter-rain-art" ref={figureRef}>
        <UmbrellaFigure color={theme.textMuted} />
      </div>
      <canvas className="letter-rain-canvas" ref={canvasRef} aria-hidden="true" />
    </main>
  );
}
