# Where to find ideas

## Prompt and skill libraries (made with Claude)
- **[Prompt Motion](https://prompt-motion.com/)**: 240+ AI motion-graphics videos, each with the prompt or skill that produced it. Categories include Product UI, Kinetic type, Charts, Diagrams, Particles, Phone, Photos and Code. See also `/templates` and `/customize` on the site.
- **[HyperFrames prompting guide](https://hyperframes.heygen.com/prompting/overview)** and its **registry** (about 450 blocks: transitions, kinetic type, captions, charts, 3D, camera moves). Browse the registry with the `/hyperframes-registry` skill.
- **[Remotion showcase](https://www.remotion.dev/showcase)** and **[Remotion templates](https://www.remotion.dev/templates)**, for real products built on Remotion.
- **[skills.sh](https://skills.sh)**: the skills registry. Search it with `npx skills find "<topic>"`.

## Motion-design inspiration
- **[LottieFiles](https://lottiefiles.com)**: free Lottie animations you can drop into Remotion with `@remotion/lottie`.
- **[Codrops](https://tympanus.net/codrops/)** and the **[GSAP showcase](https://gsap.com/showcase/)**: web animation techniques that carry over to HyperFrames.
- **[Dribbble (motion)](https://dribbble.com/tags/motion-graphics)**, **[Behance (motion)](https://www.behance.net/galleries/motion)** and **[Pinterest](https://pinterest.com)** for kinetic typography and reel layouts.
- **[Rive community](https://rive.app/community)**: interactive and vector motion.
- **Instagram / TikTok**: save reels to `same-example/` and ask Claude to break them down. The `/reverse-any-video` skill rebuilds a reel as an editable project.

## Workflow for a reference reel
1. Drop the `.mp4` into `same-example/`.
2. Ask: *"Analyze this reel and add it to STYLE-NOTES.md."*
3. Ask: *"Recreate the style of reel #4 with my footage `inputs/me.mp4`."*
