import svgPaths from "./svg-rtcp01ruut";

export default function Striker2() {
  return (
    <div className="relative size-full" data-name="Striker 2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Striker 2">
          <g clipPath="url(#clip0_86_219)">
            <rect fill="var(--fill-0, #2776C5)" height="48" rx="24" width="48" />
            <path d={svgPaths.pb90fa00} id="Star 26" stroke="var(--stroke-0, #104881)" strokeWidth="5" />
            <path d={svgPaths.p2c8c2700} id="Star 27" stroke="var(--stroke-0, #9DD6FB)" strokeWidth="2" />
          </g>
          <rect height="46" rx="23" stroke="var(--stroke-0, #104881)" strokeWidth="2" width="46" x="1" y="1" />
          <rect height="46" rx="23" stroke="var(--stroke-1, black)" strokeOpacity="0.3" strokeWidth="2" width="46" x="1" y="1" />
        </g>
        <defs>
          <clipPath id="clip0_86_219">
            <rect fill="white" height="48" rx="24" width="48" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
