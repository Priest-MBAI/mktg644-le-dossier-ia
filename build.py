"""Build the one-file deck "Le Dossier IA.html" from index.html.

Inlines img/ photos and the video as data URIs, then adds three optional private inputs
that are kept out of git (see private/README.md):
  private/course.js     the professor's slide text for Ask Claude (or: put Session *.pptx in course-slides/)
  private/share-url.txt your artifact share link, used by the corner QR code
  private/qr.svg        the QR code for that link (make_qr.py writes it)
Without them the deck still builds: Ask Claude answers from the deck only and the QR is hidden.
"""
import base64, json, pathlib, re, zipfile

here = pathlib.Path(__file__).parent
priv = here / "private"
src = (here / "index.html").read_text(encoding="utf-8")

MIME = {"jpg": "image/jpeg", "mp4": "video/mp4"}
def data_uri(m):
    path = here / "img" / m.group(1)
    return "data:" + MIME[m.group(2)] + ";base64," + base64.b64encode(path.read_bytes()).decode()
out = re.sub(r"img/([a-z]+\.(jpg|mp4))", data_uri, src)

def course_from_pptx(folder):
    """Extract slide text from Session N - Title.pptx files you own."""
    items = []
    for f in sorted(folder.glob("Session *.pptx")):
        m = re.match(r"Session (\d+) - (.+)\.pptx$", f.name)
        if not m:
            continue
        z = zipfile.ZipFile(f)
        names = sorted((n for n in z.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", n)), key=lambda n: int(re.findall(r"\d+", n)[0]))
        parts = []
        for n in names:
            x = z.read(n).decode("utf8")
            paras = [t for t in ("".join(re.findall(r"<a:t>([^<]*)</a:t>", p)).strip() for p in re.findall(r"<a:p>(.*?)</a:p>", x, re.S))
                     if t and "Unknown Author" not in t and not re.match(r"^(This Photo|is licensed under|CC BY[-A-Z]*|\d+)$", t)]
            if paras:
                parts.append("[" + re.findall(r"\d+", n)[0] + "] " + " / ".join(paras))
        items.append({"n": m.group(1), "t": m.group(2).strip(), "x": "\n".join(parts)})
    items.sort(key=lambda c: int(c["n"]))
    return "var COURSE=" + json.dumps(items, ensure_ascii=False).replace("</", "<\\/") + ";\n"

course = None
if (priv / "course.js").exists():
    course = (priv / "course.js").read_text(encoding="utf-8")
elif (here / "course-slides").is_dir():
    course = course_from_pptx(here / "course-slides")
if course:
    out = out.replace("/*@COURSE@*/var COURSE=[];\n", course)

url = (priv / "share-url.txt").read_text().strip() if (priv / "share-url.txt").exists() else ""
qr = (priv / "qr.svg").read_text(encoding="utf-8") if (priv / "qr.svg").exists() else ""
out = out.replace("@SHARE_URL@", url or "#").replace("<!--@QR@-->", qr)
if not (url and qr):
    out = out.replace('<a class="qrc" id="qrc"', '<a class="qrc" id="qrc" hidden')

(here / "Le Dossier IA.html").write_text(out, encoding="utf-8")
print(f"wrote Le Dossier IA.html, {len(out)/1e6:.2f} MB" + ("" if course else " (no course slides)") + ("" if url and qr else " (no QR)"))
