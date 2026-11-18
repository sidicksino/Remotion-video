# Edit-videos: motion design and video editing workspace

This workspace is for making motion graphics and editing short-form video (mainly 9:16 reels) with code.

## Layout
| Path | What |
|---|---|
| `remotion-studio/` | **Main engine.** Remotion 4 (React) + Tailwind v4. `npm run dev` opens the Studio; `npx remotion render <Comp> ../outputs/x.mp4` renders. |
| `hyperframes-studio/` | HyperFrames (HTML + GSAP), portrait 1080×1920. `npm run dev` / `npm run check` / `npm run render`. |
| `tools/` | Python 3.12 venv (`tools/.venv`) with helper scripts (below). |
| `same-example/` | Reference reels from Instagram. **Read `same-example/STYLE-NOTES.md` before designing**, because it defines the house style. |
| `inputs/` | Raw footage, photos, music from the user. |
| `outputs/` | Final renders. |
| `INSPIRATION.md` | Idea sources (prompt-motion.com, etc.). |

## Which engine
- **Remotion** (default): talking-head edits with captions, text behind subject, floating cards, data and charts, 3D (`@remotion/three`), Lottie. Skills: `remotion-best-practices`, `remotion-captions`, `remotion-multimedia`, `remotion-render`, …
- **HyperFrames**: fast HTML/GSAP compositions, ready-made registry blocks, and recreating a reference video (`/reverse-any-video`, `/style-sampling`, `/hyperframes-registry`).

## Installed libraries (remotion-studio)
remotion, @remotion/{transitions, captions, media, media-utils, google-fonts, fonts, lottie, three, shapes, paths, noise, motion-blur, layout-utils, animation-utils, gif, light-leaks, renderer, install-whisper-cpp}, three + @react-three/fiber + drei, gsap, lottie-web, tailwindcss v4.
Rule: drive all animation from `useCurrentFrame()` / `interpolate` / `spring`. Never use CSS transitions or `setTimeout`; they don't render deterministically.

## Tools (CLI)
- `ffmpeg`/`ffprobe` 9, `yt-dlp`, `magick` (ImageMagick), `whisper-cli` (whisper.cpp)
- `tools/.venv/bin/python tools/transcribe.py <video> [--model small] [--lang en]` writes word-level `*.captions.json` (Remotion `Caption[]`) and `.srt`
- `tools/.venv/bin/python tools/matte.py <video|image>` produces a person cutout (`.matte.webm` with alpha, or `.cutout.png`) for text-behind-subject
- `tools/.venv/bin/auto-editor <video>` removes silences / dead air
- `tools/.venv/bin/scenedetect -i <video> detect-adaptive list-scenes` finds cut points

## Defaults
- Reels: **1080×1920, 30 fps**, H.264 MP4, AAC audio. Keep text inside the safe zone: ~120 px top margin, ~380 px bottom margin (UI overlays), 60 px sides.
- Put user media in `remotion-studio/public/` (use `staticFile()`), and render to `outputs/`.
- After rendering, pull a few frames with ffmpeg and look at them before reporting that it's done.
