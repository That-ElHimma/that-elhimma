"use client";

import React, { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import { Locale } from "@/lib/types";
import { useTheme } from "next-themes";

type Props = {
  lat: number;
  lng: number;
  zoom?: number;
  addressEn?: string;
  addressAr?: string;
  height?: number;
  openUrl?: string;
  locale: Locale;
};

export default function CompanyMap({
  lat,
  lng,
  zoom = 16,
  addressEn,
  addressAr,
  height = 360,
  openUrl = "https://maps.app.goo.gl/e6pWAzkPmCRzHdSH7",
  locale,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme: resolvedTheme } = useTheme();
  const theme = mounted
    ? resolvedTheme === "light"
      ? "light"
      : "dark"
    : "light"; // neutral default on SSR

  const key = process.env.NEXT_PUBLIC_MAPTILER_KEY || "YOUR_MAPTILER_KEY";
  const isArabic = locale === "ar";

  const styleName = theme === "dark" ? "outdoor-v2-dark" : "outdoor-v2";
  const styleUrl = `https://api.maptiler.com/maps/${styleName}/style.json?key=${key}`;
  const staticUrl = `https://api.maptiler.com/maps/${styleName.replace(
    "-dark",
    ""
  )}/static/${lng},${lat},${zoom}/${800}x${Math.round(
    (height * 800) / 360
  )}.png?key=${key}`;
  
  // Mount detection
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Lazy-init visibility
  const rtlPluginLoaded = useRef(false);
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // Init map after visible
  // Init map after visible
  useEffect(() => {
    if (!mounted || !isVisible || !containerRef.current) return;

    let active = true;

    (async () => {
      const maplibregl = (await import("maplibre-gl")).default;

      // cleanup old map/marker before creating new
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch {}
        mapRef.current = null;
      }
      markerRef.current = null;
      if (!rtlPluginLoaded.current) {
        maplibregl.setRTLTextPlugin("/mapbox-gl-rtl-text.js", true);
        rtlPluginLoaded.current = true;
      }
  
      // await maplibregl.setRTLTextPlugin("/mapbox-gl-rtl-text.js", true);

  
      const map = new maplibregl.Map({
        container: containerRef.current!,
        style: styleUrl,
        center: [lng, lat],
        zoom,
        attributionControl: false,
      });

      map.on("load", () => {
        if (!active) return;

        // cleanup previous marker if exists
        if (markerRef.current) {
          markerRef.current.remove();
          markerRef.current = null;
        }

        const pin = document.createElement("div");
        pin.style.width = "30px";
        pin.style.height = "54px";
        pin.style.backgroundImage = `url("/marker.svg")`;
        pin.style.backgroundSize = "contain";
        pin.style.backgroundRepeat = "no-repeat";
        pin.style.backgroundPosition = "center";
        pin.style.transform = "translate(-50%, -100%)";

        const marker = new maplibregl.Marker({ element: pin, anchor: "bottom" })
          .setLngLat([lng, lat])
          .addTo(map);

        markerRef.current = marker;
      });

      map.on("click", () => window.open(openUrl, "_blank"));
      mapRef.current = map;
    })();

    return () => {
      active = false;
      try {
        markerRef.current?.remove();
        mapRef.current?.remove();
      } catch {}
      markerRef.current = null;
      mapRef.current = null;
    };
  }, [mounted, isVisible, styleUrl, lat, lng, zoom, openUrl]);

  return (
    <figure>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height,
          overflow: "hidden",
          position: "relative",
          background: mounted
            ? theme === "dark"
              ? "#0b1220"
              : "#f6f7f9"
            : "#f6f7f9", // neutral SSR background
          cursor: "pointer",
        }}
        aria-label={openUrl}
        role="region"
      >
        {!isVisible && (
          <a
            href={openUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <Image
              src={staticUrl}
              alt={
                addressEn
                  ? `Map showing location of ${addressEn}`
                  : addressAr
                  ? `خريطة موقع ${addressAr}`
                  : "Company location map"
              }
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 800px) 100vw, 800px"
            />
          </a>
        )}
      </div>

      <figcaption className="m-2 p-1 text-muted">
        {isArabic ? (
          <div style={{ direction: "rtl" }}>{addressAr}</div>
        ) : (
          <div>{addressEn}</div>
        )}
      </figcaption>
    </figure>
  );
}
