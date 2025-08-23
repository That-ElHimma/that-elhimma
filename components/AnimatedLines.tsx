// components/AnimatedLines.tsx
export default function AnimatedLines() {
    return (
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ willChange: "transform, opacity" }}
      >
        <svg
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -50 600 C 300 480 900 380 1650 260"
            className="animated-line line-1"
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <path
            d="M -80 450 C 120 420 380 300 820 340 C 1240 380 1450 420 1700 400"
            className="animated-line line-2"
            fill="none"
            strokeWidth={1.6}
            strokeLinecap="round"
          />
          <path
            d="M -40 520 C 260 480 760 420 1260 300"
            className="animated-line line-3"
            fill="none"
            strokeWidth={1}
            strokeLinecap="round"
          />
          <path
            d="M -60 680 C 220 620 720 540 1320 440"
            className="animated-line line-4"
            fill="none"
            strokeWidth={1.2}
            strokeLinecap="round"
          />
        </svg>
  
        <style>{`
          /* visible, theme-aware color with fallback */
          .animated-line {
            stroke: var(--brand-accent, #7c3aed);
            /* stronger base opacity so lines show on light backgrounds */
            stroke-opacity: 0.92;
            /* remove blend mode to avoid invisibility on white */
            mix-blend-mode: normal;
            filter: blur(0.35px) drop-shadow(0 6px 14px rgba(0,0,0,0.06));
            transform-origin: center;
            stroke-dasharray: 240;
            stroke-dashoffset: 240;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
  
          /* tuned per-line visibility and speed */
          .line-1 { stroke-width: 2; stroke-opacity: 0.28; stroke-dasharray: 520; animation-name: slide-1; animation-duration: 8.5s; animation-delay: 0s; }
          .line-2 { stroke-width: 1.6; stroke-opacity: 0.42; stroke-dasharray: 420; animation-name: slide-2; animation-duration: 10s; animation-delay: 0.6s; }
          .line-3 { stroke-width: 1; stroke-opacity: 0.18; stroke-dasharray: 360; animation-name: slide-3; animation-duration: 6.8s; animation-delay: 0.3s; }
          .line-4 { stroke-width: 1.2; stroke-opacity: 0.44; stroke-dasharray: 200; stroke-dashoffset: 100; animation-name: slide-4; animation-duration: 5s; animation-delay: 0.15s; }
  
          @keyframes slide-1 {
            from { stroke-dashoffset: 520; transform: translateX(-2%); opacity: 0; }
            10% { opacity: 1; }
            50% { transform: translateX(2%); }
            to { stroke-dashoffset: -520; transform: translateX(-2%); opacity: 0; }
          }
          @keyframes slide-2 {
            from { stroke-dashoffset: 420; transform: translateX(0%); opacity: 0; }
            8% { opacity: 1; }
            60% { transform: translateX(-1.6%); }
            to { stroke-dashoffset: -420; transform: translateX(0%); opacity: 0; }
          }
          @keyframes slide-3 {
            from { stroke-dashoffset: 360; transform: translateX(1%); opacity: 0; }
            12% { opacity: 1; }
            55% { transform: translateX(-1%); }
            to { stroke-dashoffset: -360; transform: translateX(1%); opacity: 0; }
          }
          @keyframes slide-4 {
            from { stroke-dashoffset: 200; transform: translateX(-0.6%); opacity: 0; }
            6% { opacity: 1; }
            50% { transform: translateX(0.8%); }
            to { stroke-dashoffset: -200; transform: translateX(-0.6%); opacity: 0; }
          }
  
          /* respects user's reduced motion preference */
          @media (prefers-reduced-motion: reduce) {
            .animated-line { animation: none !important; opacity: 0.7; transform: none !important; }
          }
        `}</style>
      </div>
    );
  }
  