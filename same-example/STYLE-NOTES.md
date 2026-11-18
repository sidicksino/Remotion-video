# Reference reels: style breakdown

All 5 are Instagram reels: **720×1280 (9:16), 30 fps, 10–32 s**, talking-head footage with heavy motion-graphic overlays. Contact sheets are in `_analysis/`.

| # | File | Look | Signature moves |
|---|------|------|-----------------|
| 1 | `-1296665855023507072.mp4` (32 s) | Dark red studio, cinematic | Giant distressed red word **behind** the subject ("WRONG"), slow push-ins and angle changes, floating photo cards with drop shadows, curved/arched text over the head, B&W photo grid, "SPONSORS" type reveal, then a white-background outro |
| 2 | `-7008063919343503988.mp4` (18 s) | Light grey, "NO EDIT vs FINAL" mockup | Before/after phone frames, bold sans captions with one emphasized word ("9/10 times"), serif/script mixed type ("just" + handwriting), cross-shaped image mask, sticker/paper collage scene, persistent CTA "DM ME TO START" |
| 3 | `-8633429828117983363.mp4` (10 s) | White studio + red brand colour | Pixel/blocky red squares as transitions, letters typing on ("H" → "Hera"), heavy italic red titles ("CEO", "Marketing Agency"), framed photo cards popping beside the subject, phone UI mockup, 3D astronaut and clouds cut-in scene |
| 4 | `7240081750434608915.mp4` (15 s) | Green and black, ad-style, "Before/After" | Big word behind the subject ("DENIED") with emoji stickers, icon cards fanning out, checklist pills animating in, credit-score gauge counting up (741 → 414), hand holding a phone UI, money falling, face-tracking corner brackets |
| 5 | `8130777845241110082.mp4` (16 s) | Teal neon on black, "Made in Alight Motion" | Glowing cyan display type ("CEO", "EDIT"), bullet list revealing line by line, glow-edge card frames, neon line-art illustration (person at laptop), word captions with one keyword much larger |

## Shared patterns (the house style we're aiming for)

1. **Text behind the subject**: person matte over big type. Use `tools/matte.py`, then stack video → text → matte.
2. **Keyword-emphasis captions**: small lead-in words, one huge keyword in a brand colour or a different font. Get word timing from `tools/transcribe.py`.
3. **Floating cards**: rounded photos and UI with soft shadows that pop in (spring) beside the subject.
4. **Device mockups**: a phone or "before/after" frame around the footage, plus a persistent CTA line underneath.
5. **Scene cut-ins**: full-screen graphic scenes (gauge, checklist, illustration) between talking-head shots.
6. **Single accent palette per reel**: red/white, green/black, teal/black.
7. **Snappy timing**: a new visual beat every 1–2 s, spring easing, short blurs and whip transitions.

Build in `remotion-studio/` at **1080×1920, 30 fps**.
