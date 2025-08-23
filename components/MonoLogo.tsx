// components/MonoLogoFallback.tsx
"use client";
import Image from "next/image";
import React from "react";

export default function MonoLogoFallback({
  src = "/images/path55-9.png",
  size = 96,
  alt = "logo",
}: { src?: string; size?: number; alt?: string }) {
  const px = `${size}px`;
  return (
    <div className="mono-fallback-root" style={{ width: px, height: px }}>
      {/* soft halo behind */}
      <div className="mono-fallback-halo" aria-hidden />

      {/* actual image (kept on top) */}
      <div className="mono-fallback-img">
        <Image src={src} alt={alt} width={size} height={size} style={{ objectFit: "contain" }} />
      </div>

      <style jsx>{`
        .mono-fallback-root {
          position: relative;
          display: inline-block;
          border-radius: 12px;
          overflow: visible;
        }

        /* large very soft halo */
        .mono-fallback-halo {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 220%;
          height: 220%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle at center, rgba(124,58,237,0.18) 0%, rgba(124,58,237,0.06) 40%, transparent 70%);
          filter: blur(22px);
          pointer-events: none;
        }

        .mono-fallback-img {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          /* soften the mark itself */
          opacity: 0.78;
          filter: saturate(0.85) brightness(0.98);
        }

        /* if the PNG is dark-on-white, this rule can be toggled to silhouette it (try if needed) */
        .mono-fallback-img img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        @media (prefers-reduced-motion: reduce) {
          .mono-fallback-halo { filter: none; }
        }
      `}</style>
    </div>
  );
}
