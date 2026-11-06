# Le Dossier IA (MKTG 644, Sessions 9 and 10)

Alan Asman's class deck for MKTG 644 AI-Powered Marketing (Prof Ernst Osinga), SMU.

- **Slides 1–3, Session 9 exercise:** risks of a French government financial-literacy ad written by generative AI and delivered by a cost-optimising algorithm, mapped by stakeholder and severity.
- **Slide 4, Session 10 exercise:** the same campaign redesigned as an agentic workflow, with the human role.
- **Video and close:** a 91-second, captioned epilogue on Mistral AI recommending a French, open-weight stack for the agents. It ends on a Merci card.
- **Annexes:** the mock campaign report and 27 sources.

## Files

| Path | What it is |
|---|---|
| `index.html` | Deck source (1920×1080 stage, keyboard driven, Ask Claude panel) |
| `build.py` | Builds the one-file deck `Le Dossier IA.html` (inlines photos, video and the optional private inputs) |
| `make_qr.py` | Makes the corner QR code for your own artifact link |
| `speaker-script.md` | What to say, part by part, plus the Ask Claude guide |
| `design-study.md` | References, teardown and design rules |
| `mistral-conclusion-plan.md` | Research, script and storyboard for the Mistral video |
| `video/` | Remotion source for both videos (copy of `~/Curriculum/ai-powered-marketing/le-dossier-ia-video`) |
| `*.mp4` | Rendered videos |

## Build your own copy

```bash
python3 build.py
```

This writes `Le Dossier IA.html`, one self-contained file you can open in a browser or publish as a Claude artifact. Three optional inputs stay out of git:

| Input | What it adds | How |
|---|---|---|
| `course-slides/Session N - Title.pptx` | Your own copies of the course slides, so Ask Claude can cite them (the slides are not in this repo) | Put the files there, then build |
| `private/share-url.txt` + `private/qr.svg` | The QR code in the top-right corner, pointing at your published artifact | `uv run --with qrcode python make_qr.py "<your artifact link>"` |

Without them, the deck still works: Ask Claude answers from the deck alone and the QR is hidden. Ask Claude only works when the file is opened as a Claude artifact.

Render the videos:

```bash
cd video && npm install && npx remotion render MistralEpilogue out/mistral-epilogue.mp4
```

Keys in the deck: arrows to move, N notes, Q Ask Claude, 1–3 and 4 for slides, E for the video.

Photos: Wikimedia Commons (credits in Annexe B). Class exercise; not a French government publication and not affiliated with Mistral AI.
