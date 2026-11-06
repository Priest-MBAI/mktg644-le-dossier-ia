"""Write private/share-url.txt and private/qr.svg for your own artifact link.

Usage:  uv run --with qrcode python make_qr.py "https://claude.ai/artifact/<id>?sk=<key>"
"""
import pathlib, sys
import qrcode

url = sys.argv[1]
priv = pathlib.Path(__file__).parent / "private"
priv.mkdir(exist_ok=True)
q = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, border=2)
q.add_data(url); q.make(fit=True)
m = q.get_matrix(); n = len(m)
d = "".join("M%d %dh1v1h-1z" % (x, y) for y, row in enumerate(m) for x, v in enumerate(row) if v)
svg = ('<svg class="qr" viewBox="0 0 %d %d" role="img" aria-label="QR code: opens this deck on claude.ai" shape-rendering="crispEdges">'
       '<rect width="%d" height="%d" fill="#FFFFFF"/><path fill="#15131C" d="%s"/></svg>') % (n, n, n, n, d)
(priv / "qr.svg").write_text(svg, encoding="utf-8")
(priv / "share-url.txt").write_text(url + "\n")
print("wrote private/qr.svg and private/share-url.txt")
