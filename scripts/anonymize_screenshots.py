#!/usr/bin/env python3
"""
Anonymize real player names and school names on landing-page screenshots.

For each (search_phrase -> replacement_phrase) pair, OCR-locates every
occurrence of the search phrase in the image, masks it with the surrounding
background color, and draws the replacement text in a comparable font.

Usage:
    python3 scripts/anonymize_screenshots.py
"""
import os
import re
from PIL import Image, ImageDraw, ImageFont
import pytesseract

HERE = os.path.dirname(os.path.abspath(__file__))
PUBLIC = os.path.join(HERE, "..", "public")

# Fonts available on macOS that approximate the app's Inter/Oswald.
FONT_REGULAR = "/System/Library/Fonts/HelveticaNeue.ttc"
FONT_BOLD = "/System/Library/Fonts/HelveticaNeue.ttc"

# ─── Per-screenshot substitution maps ─────────────────────────────────────
# All keys are EXACT case-insensitive phrases to find via OCR. Values are
# the fictional replacements. Multi-word phrases are matched as consecutive
# tokens in the OCR output (case-insensitive).

OVERVIEW = {
    # Real schools / programs on the Overview shot
    "Vanderbilt": "Coastal State",
    "VANDERBILT": "COASTAL STATE",
    "Vanderbilt Commodores": "Coastal State Pelicans",
    "San Francisco": "Bay College",
    "Grand Canyon": "Desert State",
    "Omaha": "Heartland University",
    "Penn State": "Northeast University",
    "Florida International": "South Atlantic",
    "New Mexico": "Southwest State",
    "Kent State": "Great Lakes",
    "Ohio": "Midwest College",
    "Northwestern State": "Delta University",
    "Kentucky": "Midland State",
    "Tennessee": "Southern Tech",
    "Texas": "Coastal Tech",
    "Saint Joseph's": "Capital University",
    "Georgia Tech": "Gulf State",
    # Player names on the shot (per Trevor: swap first + last of every name)
    "Kai Yovanovich": "Brooks Carter",
    "Trevor Schmidt": "Ryan Bell",
    "Maddox Meyer": "Cole Reid",
    "Dimond Loosli": "Drew Vance",
    "Luca Reyes": "Jaxon Pope",
    "Seth Edgerton": "Owen Bryant",
    "Alex Alberico": "Quinn Frye",
    "Colton Landtiser": "Sam Lane",
    "Dylan Marionneaux": "Tate Wells",
    "Hudson Brown": "Eli Drake",
    "Trent Grindlinger": "Finn Knight",
    "Gavin Kelly": "Grant Reeves",
    "Vahn Lackey": "Hayes Caldwell",
    "Blake Primrose": "Isaac Banks",
    "Dylan Volantis": "Knox Hudson",
    "Albert Roblez": "Ryan Sloan",
    "Ben Davis": "Cole Pierce",
    "Sean Jenkins": "Drew Stone",
    "Tomas Valincius": "Owen Ellis",
}

TEAMBUILDER = {
    # Real program references
    "Arizona State": "Coastal State",
    "Arizona State Sun Devils": "Coastal State Pelicans",
    "ARIZONA STATE": "COASTAL STATE",
    "Big 12": "Coastal Conf",
    "SEC": "PWR",
    # Player rows visible
    "Landon Hairston": "Brooks Carter",
    "Ryker Waite": "Eli Drake",
}

PLAYER_DASHBOARD = {
    # Real programs in the team column
    "Kentucky": "Midland State",
    "Arizona State": "Coastal State",
    "Arizona State Sun Devils": "Coastal State Pelicans",
    "Florida": "Coastal College",
    "Mississippi State": "Pacific State",
    "Tennessee": "Southern Tech",
    "West Virginia": "Highland University",
    "Big 12": "Coastal Conf",
    # Player names
    "Hudson Brown": "Eli Drake",
    "Landon Hairston": "Brooks Carter",
    "Brendan Lawson": "Tate Wells",
    "Ace Reese": "Cole Pierce",
    "Trent Grindlinger": "Finn Knight",
    "Gavin Kelly": "Grant Reeves",
}

PLAYER_PROFILE = {
    "Tre Phelps": "Brooks Carter",
    "Georgia": "Coastal State",
    "GEORGIA": "COASTAL STATE",
    "SEC": "PWR",
}

PORTAL = {
    "Landon Hairston": "Brooks Carter",
    "Arizona State": "Coastal State",
    "Big 12": "Coastal Conf",
    "Georgia": "Coastal State",
}

JOBS = [
    ("screen-overview.png", OVERVIEW),
    ("screen-teambuilder.png", TEAMBUILDER),
    ("screen-player-dashboard.png", PLAYER_DASHBOARD),
    ("screen-player.png", PLAYER_PROFILE),
    ("screen-portal.png", PORTAL),
]

# ─── OCR helpers ──────────────────────────────────────────────────────────

def ocr_tokens(im):
    """Return list of word tokens with bboxes. Each: (text, left, top, w, h, conf).
    Runs TWO passes (default PSM=6 block and PSM=11 sparse) and unions the
    detections, deduplicating overlapping boxes. Sparse mode catches words
    the block mode misses (UI rows, isolated labels)."""
    out = []
    for cfg in ("--psm 6", "--psm 11"):
        data = pytesseract.image_to_data(im, output_type=pytesseract.Output.DICT, config=cfg)
        for i, txt in enumerate(data["text"]):
            if not txt or not txt.strip():
                continue
            try:
                conf = int(data["conf"][i])
            except Exception:
                conf = -1
            out.append((
                txt.strip(),
                int(data["left"][i]),
                int(data["top"][i]),
                int(data["width"][i]),
                int(data["height"][i]),
                conf,
            ))
    # Dedup by approximate (text, left, top).
    seen = set()
    uniq = []
    for t in out:
        key = (t[0].lower(), t[1] // 6, t[2] // 6)
        if key in seen: continue
        seen.add(key)
        uniq.append(t)

    # Drop partial-word fragments when a longer token substantially overlaps
    # them. PSM 6 sometimes splits long words into pieces ("Phel"/"elps"); when
    # PSM 11 finds the whole "Phelps" at nearly the same bbox, prefer that one
    # and discard the fragments — otherwise the fragments sit between matched
    # tokens and break multi-word phrase adjacency.
    def bbox_of(t): return (t[1], t[2], t[1] + t[3], t[2] + t[4])
    def overlap_ratio(a, b):
        l = max(a[0], b[0]); r = min(a[2], b[2])
        t_ = max(a[1], b[1]); bot = min(a[3], b[3])
        if l >= r or t_ >= bot: return 0.0
        inter = (r - l) * (bot - t_)
        a_area = (a[2] - a[0]) * (a[3] - a[1])
        return inter / max(a_area, 1)
    keep = [True] * len(uniq)
    for i, ti in enumerate(uniq):
        if not keep[i]: continue
        bi = bbox_of(ti)
        for j, tj in enumerate(uniq):
            if i == j or not keep[j]: continue
            bj = bbox_of(tj)
            # Only drop ti if it's REALLY a sub-fragment of tj: substantial
            # bbox overlap, ti's text appears inside tj's text, AND tj itself
            # is a single clean word (no hyphens/digits/multi-caps). Skipping
            # mashed multi-word PSM 6 tokens like "State-Big12" prevents them
            # from killing valid distinct tokens ("State", "Big") that overlap
            # the same span.
            tj_text = tj[0]
            tj_is_mashed = (
                "-" in tj_text
                or any(c.isdigit() for c in tj_text)
                or sum(1 for c in tj_text if c.isupper()) > 1
            )
            if (overlap_ratio(bi, bj) > 0.55
                and len(tj_text) > len(ti[0])
                and ti[0].lower() in tj_text.lower()
                and not tj_is_mashed):
                keep[i] = False
                break
    uniq = [t for t, k in zip(uniq, keep) if k]

    # Sort by approximate row then left so multi-word phrases are consecutive.
    uniq.sort(key=lambda t: (t[2] // 8, t[1]))
    return uniq

def _norm(s):
    return re.sub(r"[^\w'-]", "", s).lower()

def find_phrase_bboxes(tokens, phrase):
    """Find all bboxes whose tokens (in reading order) form `phrase` —
    matched SPATIALLY rather than by strict list adjacency, so OCR row-bucket
    quirks or interleaved junk tokens don't break multi-word phrases.

    Algorithm: for each occurrence of the first phrase word, walk forward in
    space looking for the next phrase word on the same row within a small gap.
    Also handles the case where OCR mashed two words into one token (e.g.
    'ColtonLandtiser') by checking if a single token concatenates the phrase
    words.
    """
    words = phrase.split()
    n = len(words)
    out = []
    used = set()  # token indices already consumed by an earlier match

    def vcenter(tok):
        return tok[2] + tok[4] / 2

    # First: handle single-token concatenation (e.g., "ColtonLandtiser" matches "Colton Landtiser")
    if n >= 2:
        joined = "".join(_norm(w) for w in words)
        for i, t in enumerate(tokens):
            if _norm(t[0]) == joined:
                out.append((t[1], t[2], t[1] + t[3], t[2] + t[4]))
                used.add(i)

    # Then: spatial multi-word matching.
    for i, t in enumerate(tokens):
        if i in used: continue
        if _norm(t[0]) != _norm(words[0]): continue
        cur_left = t[1] + t[3]
        cur_vc = vcenter(t)
        cur_h = t[4]
        matched_idx = [i]
        matched_boxes = [(t[1], t[2], t[1] + t[3], t[2] + t[4])]
        ok = True
        for w in words[1:]:
            wn = _norm(w)
            found = None
            best_dist = None
            for j, tj in enumerate(tokens):
                if j in used or j in matched_idx: continue
                if _norm(tj[0]) != wn: continue
                # Same row: vertical centers close (within ~70% of current row height)
                if abs(vcenter(tj) - cur_vc) > max(cur_h, tj[4]) * 0.7: continue
                # To the right of current cursor, within a reasonable horizontal gap
                gap = tj[1] - cur_left
                if gap < -8 or gap > 200: continue
                if best_dist is None or gap < best_dist:
                    best_dist = gap
                    found = (j, tj)
            if not found:
                ok = False
                break
            j, tj = found
            matched_idx.append(j)
            matched_boxes.append((tj[1], tj[2], tj[1] + tj[3], tj[2] + tj[4]))
            cur_left = tj[1] + tj[3]
            cur_vc = (cur_vc + vcenter(tj)) / 2
            cur_h = (cur_h + tj[4]) / 2
        if ok:
            for k in matched_idx:
                used.add(k)
            lefts = [b[0] for b in matched_boxes]
            tops = [b[1] for b in matched_boxes]
            rights = [b[2] for b in matched_boxes]
            bottoms = [b[3] for b in matched_boxes]
            out.append((min(lefts), min(tops), max(rights), max(bottoms)))
    return out

def sample_bg_color(im, bbox, pad=4):
    """Sample the row's actual background color by looking LEFT and RIGHT of
    the text (same vertical band), then taking the MODE (most-common color) of
    the samples. Mode avoids averaging text-antialias pixels into a fake gray
    — which is what caused visible gray-rectangle artifacts when the prior
    "average above and below" approach contaminated the sample."""
    from collections import Counter
    px = im.load()
    l, t, r, b = bbox
    samples = []
    # Sample to the LEFT of the bbox in the same row, at clean cell space
    for x in range(max(0, l - 220), max(0, l - 28), 3):
        for y in range(max(0, t), min(im.height, b + 1)):
            samples.append(px[x, y])
    # Sample to the RIGHT of the bbox in the same row
    for x in range(min(im.width, r + 28), min(im.width, r + 220), 3):
        for y in range(max(0, t), min(im.height, b + 1)):
            samples.append(px[x, y])
    if not samples:
        return (10, 15, 35)
    # Mode by /8 buckets; ignore very bright/white-ish samples (text edges)
    filtered = [c for c in samples if sum(c) < 600]
    if not filtered:
        filtered = samples
    bucketed = Counter((c[0]//6*6, c[1]//6*6, c[2]//6*6) for c in filtered)
    return bucketed.most_common(1)[0][0]

def is_bright_text(im, bbox):
    """Quick check: is the masked text light-on-dark or dark-on-light?
    Sample the center of the bbox."""
    px = im.load()
    l, t, r, b = bbox
    cx, cy = (l + r) // 2, (t + b) // 2
    samples = []
    for dy in range(-3, 4):
        for dx in range(-12, 13, 4):
            x, y = cx + dx, cy + dy
            if 0 <= x < im.width and 0 <= y < im.height:
                samples.append(px[x, y])
    if not samples:
        return True
    avg = sum(sum(s[:3]) for s in samples) / (3 * len(samples))
    return avg > 120

def fit_font(text, max_w, font_path, max_size, draw):
    """Find largest font size that fits text within max_w."""
    size = max_size
    while size > 6:
        try:
            f = ImageFont.truetype(font_path, size)
        except Exception:
            f = ImageFont.load_default()
        bb = draw.textbbox((0, 0), text, font=f)
        w = bb[2] - bb[0]
        if w <= max_w:
            return f
        size -= 1
    return ImageFont.truetype(font_path, 6)

def process(image_path, subs, out_path):
    im = Image.open(image_path).convert("RGB")
    draw = ImageDraw.Draw(im)

    tokens = ocr_tokens(im)
    print(f"  {len(tokens)} tokens detected")

    # Sort substitutions by phrase length descending so multi-word phrases
    # ("Vanderbilt Commodores") are matched before single ("Vanderbilt").
    items = sorted(subs.items(), key=lambda kv: -len(kv[0].split()))

    consumed = []  # list of bboxes already replaced (to avoid double-replacement)

    def overlap_area_ratio(a, b):
        """Fraction of a's area that overlaps b."""
        l = max(a[0], b[0]); r = min(a[2], b[2])
        t = max(a[1], b[1]); bot = min(a[3], b[3])
        if l >= r or t >= bot: return 0.0
        inter = (r - l) * (bot - t)
        a_area = max(1, (a[2] - a[0]) * (a[3] - a[1]))
        return inter / a_area

    for original, replacement in items:
        bboxes = find_phrase_bboxes(tokens, original)
        for bbox in bboxes:
            # Skip only if substantially overlapping a previously-consumed bbox
            # (≥30% of this bbox). Touching by a few pixels at row boundaries
            # is not double-replacement.
            if any(overlap_area_ratio(bbox, c) > 0.30 for c in consumed):
                continue
            l, t, r, b = bbox
            available_w = (r - l)
            # Font size derived from ORIGINAL char density so scale matches.
            est_h = max(14, int(available_w / (max(len(original), 4) * 0.55)))
            font = fit_font(replacement, available_w, FONT_BOLD, est_h, draw)
            tb = draw.textbbox((0, 0), replacement, font=font)
            tw, th = tb[2] - tb[0], tb[3] - tb[1]

            # If OCR returned a wrongly-tall bbox (h >> est_h), clamp the
            # effective height. The drawn text top should land near the
            # ORIGINAL text top, not in the middle of a tall padded region.
            bbox_h = b - t
            effective_h = min(bbox_h, max(est_h + 8, 30))

            # Mask: cover the original bbox plus any horizontal overflow from
            # a longer replacement. Vertically restrict to the effective text
            # band so we don't paint over neighboring rows.
            mask_l = l - 2
            mask_r = max(r + 2, l + tw + 4)
            mask_t = t - 2
            mask_b = t + effective_h + 2
            bg = sample_bg_color(im, (l, t, r, t + effective_h))
            draw.rectangle((mask_l, mask_t, mask_r, mask_b), fill=bg)

            # Text color based on bg brightness
            bright_bg = sum(bg) / 3 > 120
            text_color = (40, 40, 40) if bright_bg else (235, 235, 235)

            # Position: top-anchor with small offset so text baseline aligns
            # with the original's first-line baseline rather than the middle
            # of an OCR-padded region.
            tx = l
            ty = t + max(0, (effective_h - th) // 2) - tb[1]
            draw.text((tx, ty), replacement, fill=text_color, font=font)
            consumed.append((mask_l, mask_t, mask_r, mask_b))
            print(f"    {original!r} -> {replacement!r} @ {bbox} (eff_h={effective_h})")

    im.save(out_path, optimize=True)
    print(f"  wrote {out_path}")

def main():
    for fname, subs in JOBS:
        path = os.path.join(PUBLIC, fname)
        if not os.path.exists(path):
            print(f"SKIP {fname}: not found")
            continue
        print(f"\n=== {fname} ===")
        # Overwrite in place
        process(path, subs, path)

if __name__ == "__main__":
    main()
