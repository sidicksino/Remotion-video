# Remotion-video

A workspace for motion design and short-form video editing with Claude Code, using Remotion, HyperFrames, FFmpeg, Whisper and segmentation tools.

## Setup
```bash
cd remotion-studio && npm install && npm run dev      # Remotion Studio
cd hyperframes-studio && npm install && npm run dev   # HyperFrames preview
brew install ffmpeg yt-dlp uv imagemagick whisper-cpp
cd tools && uv venv --python 3.12 .venv && uv pip install --python .venv/bin/python faster-whisper "rembg[cpu]" mediapipe opencv-python scenedetect auto-editor moviepy pillow numpy
```

See [CLAUDE.md](CLAUDE.md) for the workspace guide, [INSPIRATION.md](INSPIRATION.md) for idea sources, and [same-example/STYLE-NOTES.md](same-example/STYLE-NOTES.md) for the reference style.
