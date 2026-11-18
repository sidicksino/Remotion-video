import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadSerif } from "@remotion/google-fonts/InstrumentSerif";
import { Easing, interpolate, spring } from "remotion";

export const display = loadAnton("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily;
export const sans = loadInter("normal", { weights: ["500", "700", "900"], subsets: ["latin"] }).fontFamily;
loadInter("italic", { weights: ["500", "900"], subsets: ["latin"] });
export const serif = loadSerif("italic", { weights: ["400"], subsets: ["latin"] }).fontFamily;

export const C = {
  red: "#E11D2E",
  redDeep: "#9E0F1C",
  paper: "#F3F1EE",
  ink: "#111111",
  grey: "#2A2A2C",
  mute: "#8A8A8E",
};

/** 0→1 spring that starts at `delay` frames. */
export const pop = (frame: number, fps: number, delay = 0, damping = 14) =>
  spring({ frame: frame - delay, fps, config: { damping, stiffness: 170, mass: 0.7 } });

/** Clamped ease-out interpolate. */
export const ease = (frame: number, input: [number, number], output: [number, number]) =>
  interpolate(frame, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
