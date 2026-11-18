import { Audio } from "@remotion/media";
import { linearTiming, springTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { BeforeAfter, Hook, KeywordCaptions, Outro, Stats } from "./scenes";

// Scene lengths (frames @30fps) and transition length. Starts: 0, 78, 171, 269, 357 → total 477.
const T = 12;
const D = { hook: 90, ba: 105, caps: 110, stats: 100, outro: 120 };
export const DEMO_REEL_DURATION = D.hook + D.ba + D.caps + D.stats + D.outro - 4 * T;

const timing = springTiming({ config: { damping: 200 }, durationInFrames: T });

const sfx: [string, number, number?][] = [
  ["impact-bass-1", 8, 0.55], ["whoosh", 72], ["pop", 98, 0.5], ["pop", 104, 0.5],
  ["click-soft", 123], ["click-soft", 127], ["click-soft", 131], ["whoosh-short", 165],
  ["impact-bass-1", 211, 0.45], ["whoosh", 263], ["ping", 330, 0.4], ["click-soft", 317], ["click-soft", 326], ["click-soft", 335],
  ["whoosh-short", 351], ["pop", 357, 0.4], ["pop", 365, 0.4], ["pop", 373, 0.4], ["impact-bass-1", 381, 0.5], ["ping", 399, 0.5],
];

export const DemoReel: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={D.hook} name="Hook">
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={timing} />
      <TransitionSeries.Sequence durationInFrames={D.ba} name="Before / After">
        <BeforeAfter />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={timing} />
      <TransitionSeries.Sequence durationInFrames={D.caps} name="Keyword captions">
        <KeywordCaptions />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={timing} />
      <TransitionSeries.Sequence durationInFrames={D.stats} name="Stats">
        <Stats />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={D.outro} name="Outro">
        <Outro />
      </TransitionSeries.Sequence>
    </TransitionSeries>

    <Sequence name="Riser" from={250} durationInFrames={110}>
      <Audio src={staticFile("sfx/riser.mp3")} volume={(f) => Math.min(1, f / 40) * 0.35} />
    </Sequence>
    {sfx.map(([name, at, vol = 0.7], i) => (
      <Sequence key={i} name={`sfx ${name}`} from={at} durationInFrames={70}>
        <Audio src={staticFile(`sfx/${name}.mp3`)} volume={vol} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
