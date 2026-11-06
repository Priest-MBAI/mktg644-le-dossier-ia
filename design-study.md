# Design study: AI ad risk map (MKTG 644, Session 9)

Order: reference sites, teardown, principles, direction. Mock-up only after this file.

## Why the first deck failed

- Below 900px wide (the chat side panel, a phone) the CSS switched to a stacked "reading mode" and hid the slide buttons. Alan saw one long page and no slides.
- It opened on a statistic, not on the exercise. A reader who had not built it could not tell what the project was.
- Landmarks (Eiffel Tower, Arc de Triomphe) were hand-drawn ornaments with no content job.

## References and teardown

| Reference | What makes it work | Take |
|---|---|---|
| DSFR, the French state's design system (systeme-de-design.gouv.fr) | Bleu France `#000091` for structure, rouge Marianne `#E1000F` only for alerts. Flat surfaces, square corners, left-aligned bold headings. Tags and badges carry real states (info, warning, error). Spectral (Production Type, a French foundry) is its secondary face. | The palette, square corners, and the tag and badge language. Not the Marianne logo or Marianne typeface: they are reserved for real government publications, and copying them would impersonate the state. |
| Apple product pages (apple.com/iphone) | One claim per screen, giant type, the object itself as hero, and content that builds in sequence while the claim stays put. | Click-to-build steps inside each slide, one headline per slide. |
| The Pudding (pudding.cool) | Explains a mechanism with a small model the reader moves. The insight lands because the reader causes it. | The budget slider as the signature moment. |
| Bloomberg, "Humans are biased. Generative AI is even worse" (2023) | Grids where each mark is a person, so bias reads as a count of people, not a percentage. | Unit dots, one dot per hypothetical person. |
| Le Monde, Les Décodeurs | Sober charts, one alert colour, a source on every number. | Inline source numbers on every figure. |

## Principles derived

1. The deck is slides first: a stage that scales at every width, a counter, arrows, keyboard steps. No mode that hides navigation.
2. Slide 1 says what the exercise is in plain words before any statistic.
3. Each Session 9 term (severity, inherited or added, deliberate or accidental) is defined on the slide where it first appears.
4. Every French motif carries content. The hexagon is the delivery map that the budget slider fills, one dot per person.
5. Red appears only for harm (high severity, people not reached). Blue is structure.
6. Layers mean something: each risk is a sheet in a dossier, and the panel that opens on top of the matrix is the sheet you are reading.
7. Motion explains state: the headline reveals word by word as the slide builds, dots light up in the order the optimiser buys them.

## Direction

- Visual thesis: a French ministry's internal risk dossier, designed with the state's own colour and component language, with one live model at its centre.
- Type: Spectral for headlines (French foundry, used by the DSFR), Inria Sans for body and UI (made for Inria, the French research institute), IBM Plex Mono for figures.
- Colour: paper white `#F6F6F6`, ink `#161616`, bleu France `#000091`, rouge Marianne `#E1000F`, plus a three-step severity ramp. Dark mode: deep navy ground, lightened blue and red.
- Shape: square corners everywhere, one hairline weight.
- Structure: three slides (the exercise caps it at three) plus an annex for the mock campaign report and sources.
  1. Le cadrage: the exercise, the scenario, the two machines, the eight risks attached to the machine that causes each.
  2. Le mécanisme: the delivery map and slider, with a live mock delivery report beside it.
  3. La matrice: stakeholder by severity, click a risk for why and the control, plus the governance rule from Session 9.
  Annex: mock campaign performance report, sources.
- Motion stack: GSAP 3.12.5 for the word reveal, dot fills and number counts. No smooth-scroll engine (Lenis or Locomotive): the deck does not scroll, it steps.
- Skills followed: build-awwwards-quality-sites and no-ai-design-slop as the quality gate, apple-design for motion and layering, scroll-scrubbed-word-reveal (driven by step progress, not scroll), marketing:performance-report for the annex. landing-page-design does not apply (no offer, no CTA, no FAQ).

## Addendum, 6 Nov: projector pass after Alan's review

What failed in the room test: a dashboard-dense stage. Small type (17 to 24px), a postcard-sized ad, and up to 20 clicks per slide on tabs and chips.

| Reference | What makes it work | Take |
|---|---|---|
| Apple keynotes | One idea per screen, type at 100 pt and up, each click replaces the whole frame | Three full-screen beats per slide, two clicks |
| French affiches (Savignac, Cassandre) | One huge object, flat colour fields, the message in a few words | The ad shown as a full-height poster on a bleu France field |
| Paris street plaques (plaques de rue) | Enamel blue, white lettering, green frame: instantly Paris | The chapter label is a street plaque ("Diapositive 1 sur 3", "Le cadrage") |
| Didot and Bodoni, French and Italian Didones | High contrast, fashion and state print | Bodoni Moda for headlines at 84 to 120px |

New rules: body text at least 32px on the stage, labels at least 26px, ink near black on paper, colour blocks carry meaning (bleu France for the brief and the close, rouge for the failure beat).

## Addendum, 6 Nov evening: French motifs, fuller frames, persistent name

What failed in Alan's second review: beats stopped at about 60 % of the stage height, the palette was only bleu and rouge, the only French object was the street plaque, and his name and the exercise question appeared on the cover only. The mini poster on slide 1 part 2 was cropped.

| Reference | What makes it work | Take, and the content it carries |
|---|---|---|
| Paris métro station walls: white bevelled tiles (carreaux biseautés, 7.5 × 15 cm, laid in running bond) | Instantly Paris; light, glossy, gridded | The backdrop of the buyer beat (slide 2 part 1): the buyer sells screens where people wait, such as the métro in the slide 1 photo |
| Banque de France and euro notes: guilloché engraving (machine-turned rosettes in fine gold or green lines) | The visual language of money and anti-forgery; reads as official and precious | Drawn behind the 365 € poster on the cover and the close (the ad is about money), and as Alan's seal in the footer |
| French administrative dossier: card folder (chemise cartonnée) with a tab and a rubber stamp (tampon) | The deck is "Le Dossier IA"; stamps carry status ("Jamais atteints", "Vérifié par un humain") | A footer band on every beat: the exercise question on the left, Alan's seal and name on the right, a tricolour edge on top |
| Haussmann façades: cream limestone (pierre de Lutèce), zinc roofs | The colour of Paris streets | Paper becomes limestone cream instead of grey-white |
| Guimard métro entrances and Wallace fountains: cast-iron green | Paris street furniture | Group B ("online some days") becomes métro green, so the three groups read bleu, vert, terracotta |
| Apple keynote motion | Headlines arrive word by word, photos drift slowly, numbers count up, frames dissolve with a slight scale | One signature motion per beat; the footer never re-animates |

Rules added: every beat's lowest content reaches the footer (at least 960 px on the stage); red still means harm only; gold, green and cream each come from a reference above.
