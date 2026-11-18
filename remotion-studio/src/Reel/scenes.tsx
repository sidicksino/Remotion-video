import { createTikTokStyleCaptions, type Caption } from "@remotion/captions";
import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Card, CTA, Grain, PixelBurst, Speaker, Word } from "./parts";
import { C, display, ease, pop, sans, serif } from "./theme";

/* ───────────── 1. HOOK: kinetic type + pixel bursts (reel #3) ───────────── */
export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <AbsoluteFill style={{ scale: String(interpolate(frame, [0, durationInFrames], [1, 1.07])) }}>
        <PixelBurst x={110} y={300} delay={2} />
        <PixelBurst x={760} y={1300} delay={40} size={40} />
        <div style={{ position: "absolute", top: 200, width: "100%", textAlign: "center", fontFamily: sans, fontWeight: 700, fontSize: 30, letterSpacing: 6, color: C.mute, opacity: ease(frame, [0, 12], [0, 1]) }}>
          @YOUREDITOR · DEMO REEL
        </div>
        <div style={{ position: "absolute", top: 610, left: 120, fontFamily: sans, fontStyle: "italic", fontWeight: 500, fontSize: 90, color: C.ink }}>
          <Word delay={4}>Your</Word>
        </div>
        <div style={{ position: "absolute", top: 700, width: "100%", display: "flex", justifyContent: "center", overflow: "hidden", height: 470 }}>
          {"CLIPS".split("").map((ch, i) => {
            const p = pop(frame, fps, 8 + i * 3, 12);
            return (
              <span key={i} style={{ fontFamily: display, fontSize: 420, lineHeight: 1.1, color: C.red, display: "inline-block", translate: `0 ${(1 - p) * 110}%`, rotate: `${(1 - p) * 12}deg` }}>
                {ch}
              </span>
            );
          })}
        </div>
        <div style={{ position: "absolute", top: 1170, width: "100%", textAlign: "center", fontFamily: serif, fontSize: 160, lineHeight: 1, color: C.ink }}>
          <Word delay={28}>deserve</Word> <Word delay={34} style={{ color: C.red }}>better.</Word>
        </div>
        <div style={{ position: "absolute", top: 1350, left: 290, height: 12, borderRadius: 6, background: C.red, width: ease(frame, [44, 64], [0, 500]) }} />
      </AbsoluteFill>
      <Grain />
    </AbsoluteFill>
  );
};

/* ───────────── 2. BEFORE / AFTER device frames + text behind subject (reels #2, #4) ───────────── */
const Phone: React.FC<{ w: number; h: number; tag: string; style?: React.CSSProperties; children: React.ReactNode }> = ({ w, h, tag, style, children }) => (
  <div style={{ position: "absolute", width: w, height: h, borderRadius: w * 0.09, border: "8px solid #0b0b0c", overflow: "hidden", boxShadow: "0 50px 90px rgba(0,0,0,0.55)", ...style }}>
    {children}
    <div style={{ position: "absolute", top: 14, left: "50%", translate: "-50% 0", background: "#0b0b0c", color: "white", fontFamily: sans, fontWeight: 700, fontSize: w * 0.045, padding: "6px 22px", borderRadius: 40, letterSpacing: 1 }}>
      {tag}
    </div>
  </div>
);

export const BeforeAfter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const slide = pop(frame, fps, 4, 16);
  const word = pop(frame, fps, 16, 11);
  return (
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 35%, #4a4a4e 0%, #1c1c1e 70%)" }}>
      <Phone w={360} h={640} tag="NO EDIT" style={{ left: 70, top: 470, rotate: "-6deg", filter: "saturate(0.2) brightness(0.8)" }}>
        <AbsoluteFill style={{ background: "#6b6b70" }}>
          <Speaker color="#3c3c40" rim="transparent" style={{ position: "absolute", bottom: 0, width: "100%" }} />
        </AbsoluteFill>
      </Phone>
      <Phone w={620} h={1100} tag="FINAL" style={{ left: 390, top: 260, translate: `${(1 - slide) * 900}px 0`, rotate: `${(1 - slide) * 8}deg` }}>
        <AbsoluteFill style={{ background: `linear-gradient(160deg, ${C.red} 0%, ${C.redDeep} 60%, #2a0507 100%)` }}>
          {/* text BEHIND the subject */}
          <div style={{ position: "absolute", top: 210, width: "100%", textAlign: "center", fontFamily: display, fontSize: 330, lineHeight: 1, color: "white", scale: String(0.6 + word * 0.4), opacity: word, letterSpacing: 4 }}>
            STOP
          </div>
          <Speaker color="#141416" rim="rgba(255,120,120,0.55)" style={{ position: "absolute", bottom: 0, width: "100%" }} />
          {/* stickers + fanned cards in FRONT */}
          {[
            { e: "😳", x: 40, y: 190, d: 30 },
            { e: "🔥", x: 470, y: 470, d: 36 },
          ].map((s) => (
            <div key={s.e} style={{ position: "absolute", left: s.x, top: s.y, fontSize: 110, scale: String(pop(frame, fps, s.d, 9)), rotate: `${Math.sin((frame + s.d) / 9) * 8}deg` }}>
              {s.e}
            </div>
          ))}
          {["HOOK", "CUTS", "CAPS"].map((l, i) => {
            const p = pop(frame, fps, 46 + i * 4, 13);
            return (
              <Card key={l} w={170} h={210} label={l} bg={["#ffb4b4", "#ffe2a8", "#bfe3ff"][i]} style={{ left: 225 + (i - 1) * 165, top: 760, rotate: `${(i - 1) * 12 * p}deg`, scale: String(p), translate: `0 ${(1 - p) * 80}px`, borderRadius: 26 }}>
                <div style={{ position: "absolute", top: 34, fontSize: 70 }}>{["🎣", "✂️", "💬"][i]}</div>
              </Card>
            );
          })}
        </AbsoluteFill>
      </Phone>
      <CTA dark />
      <Grain strength={0.05} />
    </AbsoluteFill>
  );
};

/* ───────────── 3. KEYWORD CAPTIONS (reel #5) — same Caption[] format tools/transcribe.py writes ───────────── */
const words: [string, number, number][] = [
  ["Most", 0, 260], [" viewers", 260, 620], [" decide", 620, 980], [" in", 1120, 1260],
  [" two", 1260, 1600], [" seconds", 1600, 2100], [" to", 2350, 2480], [" scroll", 2480, 2950], [" away.", 2950, 3300],
];
const captions: Caption[] = words.map(([text, startMs, endMs]) => ({ text, startMs, endMs, timestampMs: startMs, confidence: 1 }));
const KEY = new Set(["two", "seconds", "scroll"]);

export const KeywordCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const { pages } = useMemo(() => createTikTokStyleCaptions({ captions, combineTokensWithinMilliseconds: 1000 }), []);
  const t = (frame / fps) * 1000 - 200;
  const page = [...pages].reverse().find((p) => t >= p.startMs) ?? pages[0];
  return (
    <AbsoluteFill style={{ background: "#0a0a0b" }}>
      <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 70%, ${C.red}55 0%, transparent 55%)` }} />
      <Speaker color="#121214" rim={`${C.red}cc`} style={{ position: "absolute", bottom: -40, left: 90, width: 900, scale: String(interpolate(frame, [0, durationInFrames], [1, 1.08])) }} />
      <div style={{ position: "absolute", top: 330, left: 70, right: 70, display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "baseline", columnGap: 26 }}>
        {page.tokens.map((tok) => {
          const clean = tok.text.trim().replace(/[^a-z]/gi, "").toLowerCase();
          const big = KEY.has(clean);
          const local = (tok.fromMs - page.startMs) / 1000;
          const p = pop(frame - Math.round(((page.startMs + 200) / 1000) * fps), fps, local * fps, 12);
          const active = t >= tok.fromMs && t < tok.toMs;
          return (
            <span
              key={tok.fromMs}
              style={{
                fontFamily: big ? display : sans,
                fontWeight: big ? 400 : 900,
                fontSize: big ? 250 : 92,
                lineHeight: big ? 1.05 : 1.3,
                textTransform: big ? "uppercase" : "none",
                color: big ? C.red : "white",
                opacity: t >= tok.fromMs ? 1 : 0,
                scale: String((0.7 + p * 0.3) * (active && !big ? 1.06 : 1)),
                textShadow: big ? "0 10px 40px rgba(225,29,46,0.45)" : "0 6px 24px rgba(0,0,0,0.6)",
                width: big ? "100%" : undefined,
                textAlign: "center",
              }}
            >
              {tok.text.trim()}
            </span>
          );
        })}
      </div>
      <Grain strength={0.08} />
    </AbsoluteFill>
  );
};

/* ───────────── 4. STATS: gauge count-up + checklist (reel #4) ───────────── */
export const Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const v = ease(frame, [10, 62], [0, 92]);
  const R = 220;
  const arc = Math.PI * 1.5 * R;
  const card = pop(frame, fps, 0, 15);
  const items = ["Kinetic typography", "Word-by-word captions", "Motion cards & mockups"];
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <div style={{ position: "absolute", top: 210, width: "100%", textAlign: "center", fontFamily: sans, fontStyle: "italic", fontWeight: 900, fontSize: 54, color: C.red, letterSpacing: 2 }}>
        <Word delay={0}>THE RESULT</Word>
      </div>
      <div style={{ position: "absolute", left: 160, top: 320, width: 760, height: 640, background: "white", borderRadius: 48, boxShadow: "0 40px 80px rgba(0,0,0,0.12)", scale: String(0.85 + card * 0.15), opacity: card }}>
        <svg width={760} height={560} viewBox="0 0 760 560" style={{ position: "absolute", top: 20 }}>
          <g transform="translate(380 300) rotate(135)">
            <circle r={R} fill="none" stroke="#ececec" strokeWidth={44} strokeLinecap="round" strokeDasharray={`${arc} 9999`} />
            <circle r={R} fill="none" stroke={C.red} strokeWidth={44} strokeLinecap="round" strokeDasharray={`${(arc * v) / 100} 9999`} />
          </g>
        </svg>
        <div style={{ position: "absolute", top: 225, width: "100%", textAlign: "center", fontFamily: display, fontSize: 165, color: C.ink, lineHeight: 1 }}>
          {Math.round(v)}%
        </div>
        <div style={{ position: "absolute", top: 410, width: "100%", textAlign: "center", fontFamily: sans, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: C.mute }}>
          AVG. WATCH TIME
        </div>
        <div style={{ position: "absolute", top: 535, width: "100%", textAlign: "center", fontFamily: serif, fontSize: 64, color: C.red }}>after the edit</div>
      </div>
      {items.map((txt, i) => {
        const p = pop(frame, fps, 48 + i * 9, 15);
        const chk = pop(frame, fps, 56 + i * 9, 10);
        return (
          <div key={txt} style={{ position: "absolute", left: 160, top: 1040 + i * 135, width: 760, height: 110, borderRadius: 60, background: "white", boxShadow: "0 16px 36px rgba(0,0,0,0.09)", display: "flex", alignItems: "center", gap: 28, paddingLeft: 26, translate: `${(1 - p) * -1100}px 0` }}>
            <div style={{ width: 64, height: 64, borderRadius: 32, background: C.red, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: sans, fontWeight: 900, fontSize: 40, scale: String(chk) }}>✓</div>
            <div style={{ fontFamily: sans, fontWeight: 900, fontSize: 48, color: C.ink }}>{txt}</div>
          </div>
        );
      })}
      <Grain strength={0.05} />
    </AbsoluteFill>
  );
};

/* ───────────── 5. FLOATING CARDS + CTA (reels #1, #3) ───────────── */
const cards = [
  { l: "REELS", bg: "linear-gradient(160deg,#ff8a8a,#e11d2e)", x: 70, y: 190, r: -10, w: 290, h: 360 },
  { l: "ADS", bg: "linear-gradient(160deg,#ffd580,#ff8a3d)", x: 395, y: 140, r: 4, w: 290, h: 360 },
  { l: "PODCAST", bg: "linear-gradient(160deg,#9ad0ff,#4a6cff)", x: 720, y: 210, r: 11, w: 290, h: 360 },
  { l: "UGC", bg: "linear-gradient(160deg,#c9b6ff,#7b4dff)", x: 90, y: 1230, r: 8, w: 270, h: 330 },
  { l: "LAUNCH", bg: "linear-gradient(160deg,#9ff0c8,#1fae6c)", x: 405, y: 1290, r: -4, w: 270, h: 330 },
  { l: "YOUTUBE", bg: "linear-gradient(160deg,#ffb3d1,#e0336f)", x: 720, y: 1225, r: -11, w: 270, h: 330 },
];

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const btn = pop(frame, fps, 42, 10);
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      {cards.map((c, i) => {
        const p = pop(frame, fps, i * 4, 12);
        return (
          <Card key={c.l} w={c.w} h={c.h} bg={c.bg} label={c.l} style={{ left: c.x, top: c.y + Math.sin(frame / 18 + i) * 10, rotate: `${c.r * p}deg`, scale: String(p) }}>
            <Speaker color="rgba(0,0,0,0.55)" rim="rgba(255,255,255,0.4)" style={{ position: "absolute", bottom: 50, width: "85%" }} />
          </Card>
        );
      })}
      <div style={{ position: "absolute", top: 640, width: "100%", textAlign: "center", fontFamily: serif, fontSize: 150, color: C.ink, lineHeight: 1 }}>
        <Word delay={14}>Let’s</Word> <Word delay={19}>make</Word>
      </div>
      <div style={{ position: "absolute", top: 760, width: "100%", display: "flex", justifyContent: "center", overflow: "hidden", height: 340 }}>
        {"YOURS.".split("").map((ch, i) => {
          const p = pop(frame, fps, 22 + i * 2.5, 12);
          return (
            <span key={i} style={{ fontFamily: display, fontSize: 300, lineHeight: 1.1, color: C.red, display: "inline-block", translate: `0 ${(1 - p) * 110}%` }}>
              {ch}
            </span>
          );
        })}
      </div>
      <div style={{ position: "absolute", top: 1085, left: "50%", translate: "-50% 0", scale: String(btn * (1 + Math.sin(Math.max(0, frame - 60) / 5) * 0.025)), background: C.red, color: "white", fontFamily: sans, fontWeight: 900, fontSize: 60, padding: "22px 60px", borderRadius: 80, boxShadow: "0 20px 40px rgba(225,29,46,0.35)", whiteSpace: "nowrap" }}>
        DM “EDIT” →
      </div>
      <Grain />
    </AbsoluteFill>
  );
};
