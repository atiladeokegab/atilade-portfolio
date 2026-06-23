"use client";

import { useEffect, useState } from "react";
import Snowfall from "react-snowfall";
import { useSeasonStore } from "@/store/useSeasonStore";

export default function SnowfallEffect() {
  const season = useSeasonStore((state) => state.season);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [mounted, setMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: '100vw', height: '100vh' });

  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      setWindowSize({
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight}px`,
      });
    };
    
    // Set initial size
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (season === "spring") {
      const blossom = document.createElement("img");
      blossom.src = "/svg/cherry-blossom.svg";
      blossom.onload = () => {
        setImages([blossom]);
      };
    } else {
      setImages([]);
    }
  }, [season]);

  if (!mounted) return null;

  if (season === "none") return null;

  if (season === "spring" && images.length > 0) {
    return (
      <div key={`${windowSize.width}-${windowSize.height}`} style={{ position: "fixed", top: 0, left: 0, width: windowSize.width, height: windowSize.height, zIndex: 9999, pointerEvents: "none" }}>
        {/* Background Layer: Distant, small, blurry, slow */}
        <Snowfall
          images={images}
          snowflakeCount={6}
          radius={[3, 6]}
          speed={[0.2, 0.6]}
          wind={[-0.1, 0.5]}
          rotationSpeed={[-0.5, 0.5]}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", filter: "blur(4px)", opacity: 0.4 }}
        />

        {/* Middle Layer: Mid-distance, medium size, slight blur, normal speed */}
        <Snowfall
          images={images}
          snowflakeCount={4}
          radius={[6, 12]}
          speed={[0.5, 1.2]}
          wind={[-0.3, 0.8]}
          rotationSpeed={[-0.8, 0.8]}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", filter: "blur(2px)", opacity: 0.7 }}
        />

        {/* Foreground Layer: Close, large, sharp, fast */}
        <Snowfall
          images={images}
          snowflakeCount={3}
          radius={[12, 18]}
          speed={[1.0, 2.5]}
          wind={[-0.5, 1.2]}
          rotationSpeed={[-1.2, 1.2]}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", filter: "blur(0px)", opacity: 1 }}
        />
      </div>
    );
  }

  // Default Winter Snow
  return (
    <Snowfall
      key={`winter-${windowSize.width}-${windowSize.height}`}
      color="#dee4fd"
      snowflakeCount={150}
      radius={[0.5, 3]}
      speed={[0.5, 3]}
      wind={[-0.5, 2]}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: windowSize.width,
        height: windowSize.height,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}
