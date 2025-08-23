"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  src?: string;               // PNG path (prefer transparent PNG)
  size?: number;              // px square
  color?: string;             // e.g. "var(--brand-accent)" | "#8b5cf6" | "rgb(...)"
  softness?: number;          // 0..1 logo opacity
  haloInner?: number;         // 0..1 inner halo opacity
  haloOuter?: number;         // 0..1 outer halo opacity
  threshold?: number;         // bg removal sensitivity for opaque PNGs (10..120)
  alt?: string;
  className?: string;
};

export default function MonoLogoCanvas({
  src = "/images/path55-9.png",
  size = 96,
  color = "var(--logo-brand)",
  softness = 0.72,
  haloInner = 0.16,
  haloOuter = 0.06,
  threshold = 40,
  alt = "logo",
  className = "",
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [resolved, setResolved] = useState<string>("");

  // ---- helpers -------------------------------------------------------------

  // Normalize any CSS color (named, hex, rgb/rgba) into "rgba(r,g,b,1)"
  const normalizeToRGBA = (c: string) => {
    const can = document.createElement("canvas");
    can.width = 1;
    can.height = 1;
    const ctx = can.getContext("2d")!;
    ctx.fillStyle = "#000";
    try {
      ctx.fillStyle = c;
    } catch {
      // keep default
    }
    // returns standardized rgba(...) string
    return ctx.fillStyle as string;
  };

  // Resolve var(--x) against computed styles of our root (or document root)
  const resolveColor = () => {
    const el = rootRef.current || document.documentElement;
    let c = color.trim();

    if (c.startsWith("var(")) {
      const m = c.match(/var\(\s*(--[^,\s)]+)\s*(?:,\s*([^)]+))?\)/);
      if (m) {
        const varName = m[1];
        const fallback = (m[2] || "").trim();
        let val = getComputedStyle(el).getPropertyValue(varName).trim();
        if (!val && el !== document.documentElement) {
          val = getComputedStyle(document.documentElement)
            .getPropertyValue(varName)
            .trim();
        }
        c = val || fallback || "#7c3aed"; // final fallback
      }
    }

    return normalizeToRGBA(c);
  };

  // recompute color on mount & when theme changes (class/style mutations)
  useEffect(() => {
    setResolved(resolveColor());

    const el = rootRef.current || document.documentElement;

    const recheck = () => setResolved(resolveColor());

    // watch class/style changes on html and our root
    const obs = new MutationObserver(recheck);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
    if (rootRef.current) {
      obs.observe(rootRef.current, { attributes: true, attributeFilter: ["class", "style"] });
    }

    // watch system theme change too
    const mm = window.matchMedia?.("(prefers-color-scheme: dark)");
    const onMM = () => recheck();
    mm?.addEventListener?.("change", onMM);

    return () => {
      obs.disconnect();
      mm?.removeEventListener?.("change", onMM);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  // extract RGB numbers from rgba(...) string
  const rgb = useMemo(() => {
    const m = resolved.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!m) return { r: 124, g: 58, b: 237 }; // fallback purple
    return { r: +m[1], g: +m[2], b: +m[3] };
  }, [resolved]);

  const innerHaloRGBA = `rgba(${rgb.r},${rgb.g},${rgb.b},${haloInner})`;
  const outerHaloRGBA = `rgba(${rgb.r},${rgb.g},${rgb.b},${haloOuter})`;

  const [dataUrl, setDataUrl] = useState<string | null>(null);

  // ---- draw once color or src/size changes --------------------------------
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      if (cancelled) return;

      const cw = 512, ch = 512; // working resolution
      const work = document.createElement("canvas");
      work.width = cw; work.height = ch;
      const wctx = work.getContext("2d")!;
      wctx.clearRect(0, 0, cw, ch);

      // fit image preserving aspect
      const ratio = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = Math.round(img.naturalWidth * ratio);
      const dh = Math.round(img.naturalHeight * ratio);
      const dx = Math.round((cw - dw) / 2);
      const dy = Math.round((ch - dh) / 2);
      wctx.drawImage(img, dx, dy, dw, dh);

      // Check if source already has transparency. If not, do coarse bg removal.
      const data = wctx.getImageData(0, 0, cw, ch);
      const hasAlpha = (() => {
        const a = data.data;
        for (let i = 3; i < a.length; i += 4) {
          if (a[i] < 250) return true;
        }
        return false;
      })();

      if (!hasAlpha) {
        // estimate bg color from corners
        const px = data.data;
        const corners = [
          (2 * cw + 2) * 4,
          (2 * cw + (cw - 3)) * 4,
          ((ch - 3) * cw + 2) * 4,
          ((ch - 3) * cw + (cw - 3)) * 4,
        ];
        let br = 0, bg = 0, bb = 0;
        for (const idx of corners) {
          br += px[idx]; bg += px[idx + 1]; bb += px[idx + 2];
        }
        br = Math.round(br / corners.length);
        bg = Math.round(bg / corners.length);
        bb = Math.round(bb / corners.length);

        const thr = Math.max(10, Math.min(120, threshold));
        for (let y = 0; y < ch; y++) {
          for (let x = 0; x < cw; x++) {
            const i = (y * cw + x) * 4;
            const dr = px[i] - br, dg = px[i + 1] - bg, db = px[i + 2] - bb;
            const dist = Math.sqrt(dr * dr + dg * dg + db * db);
            px[i + 3] = dist > thr ? 255 : 0;
          }
        }
        wctx.putImageData(data, 0, 0);
      }

      // Recolor using alpha mask
      const colored = document.createElement("canvas");
      colored.width = cw; colored.height = ch;
      const cctx = colored.getContext("2d")!;

      // 1) draw mask
      cctx.clearRect(0, 0, cw, ch);
      cctx.drawImage(work, 0, 0);
      // 2) apply fill only where mask exists
      cctx.globalCompositeOperation = "source-in";
      cctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${Math.max(0, Math.min(1, softness))})`;
      cctx.fillRect(0, 0, cw, ch);
      cctx.globalCompositeOperation = "source-over";

      // downscale to requested size
      const final = document.createElement("canvas");
      final.width = size; final.height = size;
      const fctx = final.getContext("2d")!;
      fctx.imageSmoothingQuality = "high";
      fctx.clearRect(0, 0, size, size);
      fctx.drawImage(colored, 0, 0, size, size);

      const url = final.toDataURL("image/png");
      if (!cancelled) setDataUrl(url);
    };

    img.onerror = () => { if (!cancelled) setDataUrl(null); };
    return () => { cancelled = true; };
  }, [src, size, softness, rgb.r, rgb.g, rgb.b, threshold]);

  // ---- render --------------------------------------------------------------
  const innerHaloSize = Math.round(size * 1.08);
  const outerHaloSize = Math.round(size * 1.7);

  return (
    <div
      ref={rootRef}
      className={className}
      aria-label={alt}
      role="img"
      style={{ width: size, height: size, position: "relative", display: "inline-block" }}
    >
      {/* outer soft glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: outerHaloSize,
          height: outerHaloSize,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle at center, ${outerHaloRGBA} 0%, transparent 60%)`,
          filter: "blur(42px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {/* inner halo */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: innerHaloSize,
          height: innerHaloSize,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle at center, ${innerHaloRGBA} 0%, transparent 65%)`,
          filter: "blur(26px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      {/* logo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        {dataUrl ? (
          <img
            src={dataUrl}
            alt={alt}
            width={size}
            height={size}
            style={{ display: "block", width: size, height: size, objectFit: "contain" }}
          />
        ) : (
          // fallback if processing didn’t finish yet
          <img
            src={src}
            alt={alt}
            width={size}
            height={size}
            style={{
              display: "block",
              width: size,
              height: size,
              objectFit: "contain",
              opacity: 0.7,
              filter: "saturate(0.85) brightness(0.98)",
            }}
          />
        )}
      </div>
    </div>
  );
}
