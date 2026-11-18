"""Word-level transcription -> Remotion Caption JSON (+ SRT).

Usage:
  tools/.venv/bin/python tools/transcribe.py input.mp4 [--model small] [--lang en]

Writes <input>.captions.json  ([{text, startMs, endMs, timestampMs, confidence}])
which matches @remotion/captions `Caption[]`, and <input>.srt.
"""
import argparse, json, pathlib
from faster_whisper import WhisperModel

p = argparse.ArgumentParser()
p.add_argument("input")
p.add_argument("--model", default="small")
p.add_argument("--lang", default=None)
a = p.parse_args()

src = pathlib.Path(a.input)
model = WhisperModel(a.model, device="auto", compute_type="int8")
segments, info = model.transcribe(str(src), language=a.lang, word_timestamps=True, vad_filter=True)

caps, srt = [], []
for i, seg in enumerate(segments, 1):
    for w in seg.words or []:
        caps.append({
            "text": w.word if not caps else w.word,  # keeps leading space, as Remotion expects
            "startMs": round(w.start * 1000),
            "endMs": round(w.end * 1000),
            "timestampMs": round((w.start + w.end) / 2 * 1000),
            "confidence": round(w.probability, 3),
        })
    f = lambda t: f"{int(t//3600):02}:{int(t%3600//60):02}:{int(t%60):02},{int(t%1*1000):03}"
    srt.append(f"{i}\n{f(seg.start)} --> {f(seg.end)}\n{seg.text.strip()}\n")

out = src.with_suffix(".captions.json")
out.write_text(json.dumps(caps, indent=1, ensure_ascii=False))
src.with_suffix(".srt").write_text("\n".join(srt))
print(f"lang={info.language} words={len(caps)} -> {out}")
