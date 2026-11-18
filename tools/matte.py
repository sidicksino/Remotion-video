"""Person cutout for 'text behind subject' edits.

Usage:
  tools/.venv/bin/python tools/matte.py input.mp4            # -> input.matte.webm (VP9 with alpha: person only)
  tools/.venv/bin/python tools/matte.py input.mp4 --mask     # -> input.mask.mp4 (white person on black)
  tools/.venv/bin/python tools/matte.py photo.jpg            # -> photo.cutout.png (via rembg)

In Remotion/HyperFrames: layer = [original video] -> [big text] -> [matte.webm on top].
"""
import argparse, pathlib, subprocess, sys
import cv2, numpy as np

p = argparse.ArgumentParser()
p.add_argument("input")
p.add_argument("--mask", action="store_true", help="output a B/W mask video instead of alpha video")
a = p.parse_args()
src = pathlib.Path(a.input)

if src.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}:
    from rembg import remove
    out = src.with_suffix(".cutout.png")
    out.write_bytes(remove(src.read_bytes()))
    sys.exit(print(f"-> {out}"))

import urllib.request
import mediapipe as mp
from mediapipe.tasks.python import BaseOptions, vision

MODEL = pathlib.Path(__file__).parent / "models" / "selfie_segmenter.tflite"
if not MODEL.exists():
    MODEL.parent.mkdir(exist_ok=True)
    urllib.request.urlretrieve("https://storage.googleapis.com/mediapipe-models/image_segmenter/"
                               "selfie_segmenter/float16/latest/selfie_segmenter.tflite", MODEL)
seg = vision.ImageSegmenter.create_from_options(vision.ImageSegmenterOptions(
    base_options=BaseOptions(model_asset_path=str(MODEL)), output_confidence_masks=True))
cap = cv2.VideoCapture(str(src))
fps = cap.get(cv2.CAP_PROP_FPS) or 30
w, h = int(cap.get(3)), int(cap.get(4))
out = src.with_suffix(".mask.mp4" if a.mask else ".matte.webm")
fmt = "gray" if a.mask else "rgba"
enc = ["-c:v", "libx264", "-pix_fmt", "yuv420p"] if a.mask else ["-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-auto-alt-ref", "0", "-b:v", "4M"]
ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", fmt, "-s", f"{w}x{h}", "-r", str(fps), "-i", "-", *enc, str(out)], stdin=subprocess.PIPE)
prev = None
while True:
    ok, frame = cap.read()
    if not ok:
        break
    img = mp.Image(image_format=mp.ImageFormat.SRGB, data=cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    m = seg.segment(img).confidence_masks[0].numpy_view().squeeze().astype(np.float32)
    m = cv2.GaussianBlur(m, (7, 7), 0)
    if prev is not None:
        m = 0.6 * m + 0.4 * prev  # temporal smoothing to reduce flicker
    prev = m
    alpha = np.clip((m - 0.35) / 0.3, 0, 1)
    a8 = (alpha * 255).astype(np.uint8)
    if a.mask:
        ff.stdin.write(a8.tobytes())
    else:
        rgba = cv2.cvtColor(frame, cv2.COLOR_BGR2RGBA)
        rgba[..., 3] = a8
        ff.stdin.write(rgba.tobytes())
ff.stdin.close(); ff.wait()
print(f"-> {out}")
