import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { C, ease, pop, sans } from "./theme";

/** Stylized speaker silhouette (stand-in for a real person cutout from tools/matte.py). */
export const Speaker: React.FC<{ color?: string; rim?: string; style?: React.CSSProperties }> = ({
  color = "#1b1b1d",
  rim = "rgba(255,255,255,0.35)",
  style,
}) => (
  <svg viewBox="0 0 600 760" style={style}>
    <defs>
      <linearGradient id="rim" x1="0" x2="1">
        <stop offset="0" stopColor={rim} />
        <stop offset="0.25" stopColor="transparent" />
        <stop offset="0.75" stopColor="transparent" />
        <stop offset="1" stopColor={rim} />
      </linearGradient>
    </defs>
    {[color, "url(#rim)"].map((fill, i) => (
      <g key={i} fill={fill}>
        <ellipse cx="300" cy="200" rx="118" ry="140" />
        <rect x="255" y="300" width="90" height="90" rx="30" />
        <path d="M40 760 C40 520 140 400 300 400 C460 400 560 520 560 760 Z" />
      </g>
    ))}
  </svg>
);

/** Rounded media card with soft shadow (photo cards in the reference reels). */
export const Card: React.FC<{
  w: number;
  h: number;
  bg: string;
  label?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ w, h, bg, label, style, children }) => (
  <div
    style={{
      position: "absolute",
      width: w,
      height: h,
      borderRadius: 36,
      background: bg,
      boxShadow: "0 30px 60px rgba(0,0,0,0.28), 0 8px 18px rgba(0,0,0,0.18)",
      border: "6px solid white",
      overflow: "hidden",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      ...style,
    }}
  >
    {children}
    {label ? (
      <div
        style={{
          fontFamily: sans,
          fontWeight: 900,
          fontSize: 38,
          letterSpacing: 2,
          color: C.ink,
          background: "rgba(255,255,255,0.92)",
          width: "100%",
          textAlign: "center",
          padding: "14px 0",
          zIndex: 2,
        }}
      >
        {label}
      </div>
    ) : null}
  </div>
);

/** Blocky pixel squares that flicker in and out (transition accent from reel #3). */
export const PixelBurst: React.FC<{ x: number; y: number; delay?: number; size?: number }> = ({
  x,
  y,
  delay = 0,
  size = 46,
}) => {
  const frame = useCurrentFrame();
  const cells = [
    [0, 0], [1, 0], [2, 0], [1, 1], [2, 1], [3, 1], [0, 2], [2, 2], [3, 3], [1, 3],
  ];
  return (
    <>
      {cells.map(([cx, cy], i) => {
        const t = frame - delay - i * 1.2;
        const on = t > 0 && t < 26 - (i % 4) * 3;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + cx * size,
              top: y + cy * size,
              width: size,
              height: size,
              background: i % 3 === 0 ? C.redDeep : C.red,
              opacity: on ? (i % 2 ? 0.9 : 0.6) : 0,
            }}
          />
        );
      })}
    </>
  );
};

/** Persistent call-to-action under the device frames (reels #2 and #4). */
export const CTA: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = pop(frame, fps, 6, 18);
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 300 }}>
      <div style={{ textAlign: "center", opacity: p, translate: `0 ${(1 - p) * 40}px` }}>
        <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 36, letterSpacing: 1, color: dark ? "#cfcfd2" : C.grey }}>
          YOUR CLIPS CAN LOOK LIKE THIS TOO
        </div>
        <div style={{ fontFamily: sans, fontWeight: 900, fontSize: 76, color: dark ? "white" : C.ink, marginTop: 6 }}>
          DM ME <span style={{ color: C.red }}>“EDIT”</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Subtle film grain + vignette to take the flat-digital edge off. */
export const Grain: React.FC<{ strength?: number }> = ({ strength = 0.07 }) => {
  const frame = useCurrentFrame();
  const seed = frame % 8;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg width="100%" height="100%" style={{ opacity: strength, mixBlendMode: "multiply" }}>
        <filter id={`g${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed} />
        </filter>
        <rect width="100%" height="100%" filter={`url(#g${seed})`} />
      </svg>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.28) 100%)" }} />
    </AbsoluteFill>
  );
};

export const Word: React.FC<{ delay: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  delay,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const p = ease(frame, [delay, delay + 14], [0, 1]);
  return (
    <span
      style={{
        display: "inline-block",
        opacity: p,
        translate: `0 ${(1 - p) * 50}px`,
        filter: `blur(${(1 - p) * 12}px)`,
        ...style,
      }}
    >
      {children}
    </span>
  );
};
