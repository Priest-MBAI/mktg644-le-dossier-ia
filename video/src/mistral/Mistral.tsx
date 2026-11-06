import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { loadFont as loadBodoni } from "@remotion/google-fonts/BodoniModa";
import { loadFont as loadInria } from "@remotion/google-fonts/InriaSans";
import { loadFont as loadPlex } from "@remotion/google-fonts/IBMPlexMono";
import { prog } from "../theme";

/* Epilogue to "Le Dossier IA": Mistral AI and a bridge to Session 10. Silent, captioned, no logo. */

const F = {
  head: loadBodoni("normal", { weights: ["800"], subsets: ["latin", "latin-ext"] }).fontFamily,
  body: loadInria("normal", { weights: ["400", "700"], subsets: ["latin", "latin-ext"] }).fontFamily,
  mono: loadPlex("normal", { weights: ["500"], subsets: ["latin"] }).fontFamily,
};

const K = {
  nuit: "#0A0F52",
  paper: "#F1EBDF",
  surface: "#FFFDF8",
  ink: "#15131C",
  muted: "#4A4656",
  line: "#CFC5B2",
  bleu: "#000091",
  rouge: "#C8000D",
  gold: "#E3C27A",
  // Mistral-style warm gradient (colours only, no logo)
  o1: "#E10500",
  o2: "#FA500F",
  o3: "#FF8205",
  o4: "#FFAF00",
  o5: "#FFD800",
};
const GRAD = `linear-gradient(90deg, ${K.o1}, ${K.o2} 25%, ${K.o3} 50%, ${K.o4} 75%, ${K.o5})`;

/* one scene: background, headline, visual, big caption band; fades in and out */
const Scene: React.FC<{ dark?: boolean; head: string; cap?: string; dur: number; children?: React.ReactNode }> = ({
  dark,
  head,
  cap,
  dur,
  children,
}) => {
  const f = useCurrentFrame();
  const fade = Math.min(prog(f, 0, 12), 1 - prog(f, dur - 12, 12));
  const words = head.split(" ");
  const ink = dark ? "#F6F2EA" : K.ink;
  return (
    <AbsoluteFill style={{ backgroundColor: dark ? K.nuit : K.paper, color: ink, fontFamily: F.body, opacity: fade }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 14, background: GRAD }} />
      <div style={{ position: "absolute", left: 110, top: 58, fontFamily: F.mono, fontSize: 24, letterSpacing: "0.08em", textTransform: "uppercase", color: dark ? K.gold : K.o2 }}>
        Le Dossier IA · Épilogue : Mistral AI
      </div>
      <div style={{ position: "absolute", left: 110, right: 110, top: 104, fontFamily: F.head, fontWeight: 800, fontSize: 92, lineHeight: 1.04, letterSpacing: "-0.01em" }}>
        {words.map((w, i) => {
          const p = prog(f, 4 + i * 3, 16);
          return (
            <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: 8 }}>
              <span style={{ display: "inline-block", translate: `0 ${(1 - p) * 105}%` }}>{w}&nbsp;</span>
            </span>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 110, right: 110, top: 250, bottom: 220 }}>{children}</div>
      {cap ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            minHeight: 190,
            background: "rgba(10,15,82,0.94)",
            borderTop: `6px solid ${K.o3}`,
            display: "flex",
            alignItems: "center",
            padding: "0 110px",
          }}
        >
          <div style={{ color: "#FFFFFF", fontSize: 50, lineHeight: 1.25, fontWeight: 700, opacity: prog(f, 10, 14), maxWidth: 1700 }}>{cap}</div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

const Card: React.FC<{ style?: React.CSSProperties; children: React.ReactNode }> = ({ style, children }) => (
  <div style={{ background: K.surface, border: `4px solid ${K.ink}`, padding: "26px 30px", color: K.ink, ...style }}>{children}</div>
);

/* ---------- scenes ---------- */

const S1: React.FC = () => {
  const f = useCurrentFrame();
  const v = Math.round(interpolate(f, [20, 110], [0, 1e12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const txt = v.toLocaleString("fr-FR").replace(/ | /g, " ");
  return (
    <Scene dark head="France built its own frontier AI." cap="On 29 October, Mistral opened the weights of Le Chonk: a 1-trillion-parameter model." dur={180}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", gap: 20 }}>
        <div style={{ fontFamily: F.mono, fontSize: 170, letterSpacing: "-0.03em", background: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{txt}</div>
        <div style={{ fontSize: 44, color: K.gold, opacity: prog(f, 100, 16) }}>parameters, open for anyone to download</div>
      </div>
    </Scene>
  );
};

const S2: React.FC = () => {
  const f = useCurrentFrame();
  const p = prog(f, 20, 80);
  return (
    <Scene head="Anyone can download it." cap="Inspect it, run it, build on it. Mistral says it was trained from scratch in Europe." dur={180}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", gap: 34 }}>
        <div style={{ fontFamily: F.mono, fontSize: 40 }}>Mistral-Large-4 · open weights</div>
        <div style={{ height: 70, border: `4px solid ${K.ink}`, background: K.surface }}>
          <div style={{ height: "100%", width: `${p * 100}%`, background: GRAD }} />
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Inspect", "Run", "Build on"].map((t, i) => (
            <div key={t} style={{ fontSize: 46, fontWeight: 700, padding: "14px 34px", border: `4px solid ${K.o2}`, color: K.ink, opacity: prog(f, 90 + i * 10, 14) }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    </Scene>
  );
};

const S3: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene dark head="Sovereignty: own it, don't rent it." cap="Your data, your model, your servers, instead of AI rented from abroad." dur={180}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 60, height: "100%" }}>
        {["Data", "Model", "Servers"].map((t, i) => {
          const p = prog(f, 20 + i * 14, 20);
          return (
            <div key={t} style={{ width: 400, height: 300, background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.head, fontWeight: 800, fontSize: 72, color: K.nuit, opacity: p, translate: `0 ${(1 - p) * -80}px` }}>
              {t}
            </div>
          );
        })}
      </div>
    </Scene>
  );
};

const S4: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene head="€3 billion bet on it." cap="Series D, 8 September 2026, led by Samsung Electronics." dur={150}>
      <div style={{ display: "flex", alignItems: "center", gap: 90, height: "100%" }}>
        <div style={{ fontFamily: F.head, fontWeight: 800, fontSize: 260, lineHeight: 1, color: K.o2, opacity: prog(f, 16, 18) }}>€3 B</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, opacity: prog(f, 40, 18) }}>
          <div style={{ fontFamily: F.mono, fontSize: 90 }}>&gt; €21 B</div>
          <div style={{ fontSize: 40, color: K.muted }}>valuation after the round</div>
        </div>
      </div>
    </Scene>
  );
};

const S5: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene dark head="Too big for a laptop." cap="Alan's note: a trillion parameters needs server hardware. Smaller Mistral models fit on a laptop." dur={180}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 160, height: "100%", paddingBottom: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, opacity: prog(f, 14, 18) }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ width: 360, height: 48, border: `3px solid ${K.gold}`, display: "flex", alignItems: "center", gap: 10, padding: "0 16px" }}>
                {[0, 1, 2].map((j) => (
                  <span key={j} style={{ width: 12, height: 12, borderRadius: 6, background: (Math.floor(f / 6) + i + j) % 4 === 0 ? K.o4 : "#3A3F7A" }} />
                ))}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 38, color: K.gold }}>Le Chonk: data centre</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, opacity: prog(f, 40, 18) }}>
          <div style={{ width: 340, height: 210, border: `6px solid #F6F2EA`, borderRadius: 12, background: GRAD }} />
          <div style={{ width: 420, height: 18, background: "#F6F2EA", borderRadius: 4 }} />
          <div style={{ fontSize: 38, color: K.gold }}>Small models: your laptop</div>
        </div>
      </div>
    </Scene>
  );
};

const S6: React.FC = () => {
  const f = useCurrentFrame();
  const bub = (t: string, me: boolean, at: number) => (
    <div style={{ alignSelf: me ? "flex-end" : "flex-start", maxWidth: "82%", padding: "14px 20px", borderRadius: 16, fontSize: 30, background: me ? K.bleu : "#F1EBDF", color: me ? "#fff" : K.ink, opacity: prog(f, at, 12) }}>{t}</div>
  );
  return (
    <Scene head="Try 1: the free assistant." cap="Mistral's free assistant, on the web and on mobile." dur={180}>
      <div style={{ display: "flex", alignItems: "center", gap: 70, height: "100%" }}>
        <Card style={{ width: 900, height: 470, display: "flex", flexDirection: "column", gap: 16, padding: 0 }}>
          <div style={{ height: 50, borderBottom: `3px solid ${K.ink}`, display: "flex", alignItems: "center", gap: 10, padding: "0 18px" }}>
            {[K.o1, K.o3, K.o5].map((c) => (
              <span key={c} style={{ width: 16, height: 16, borderRadius: 8, background: c }} />
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "0 26px" }}>
            <div style={{ alignSelf: "flex-start", fontFamily: F.mono, fontSize: 22, color: K.o2, border: `2px solid ${K.o2}`, padding: "4px 10px" }}>EXAMPLE CONVERSATION</div>
            {bub("Explique-moi l'inflation en 3 phrases.", true, 30)}
            {bub("L'inflation, c'est la hausse générale des prix…", false, 60)}
            {bub("Now in English, please.", true, 90)}
          </div>
        </Card>
        <div style={{ width: 250, height: 470, border: `8px solid ${K.ink}`, borderRadius: 36, background: K.surface, display: "flex", alignItems: "center", justifyContent: "center", opacity: prog(f, 50, 16) }}>
          <div style={{ width: 150, height: 150, background: GRAD, borderRadius: 24 }} />
        </div>
      </div>
    </Scene>
  );
};

const S7: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene dark head="Try 2: run AI offline." cap="Mistral says Small 3.1 runs on a Mac with 32 GB of RAM. Free under Apache 2.0." dur={210}>
      <div style={{ display: "flex", alignItems: "center", gap: 90, height: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          <div style={{ width: 620, height: 380, border: `8px solid #F6F2EA`, borderRadius: 14, background: "#11165E", display: "flex", flexDirection: "column", justifyContent: "center", padding: 36, gap: 16 }}>
            <div style={{ fontFamily: F.mono, fontSize: 36, color: K.o4 }}>Mistral Small 3.1</div>
            <div style={{ fontSize: 30, color: "#D9D9FF" }}>Apache 2.0 · open weights</div>
            <div style={{ fontSize: 30, color: "#D9D9FF", opacity: prog(f, 50, 14) }}>Runs on your own machine</div>
          </div>
          <div style={{ width: 740, height: 22, background: "#F6F2EA", borderRadius: 4 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, opacity: prog(f, 40, 18) }}>
          <svg width="170" height="150" viewBox="0 0 120 100">
            <g fill="none" stroke="#F6F2EA" strokeWidth="8" strokeLinecap="round">
              <path d="M10 40 Q60 0 110 40" />
              <path d="M28 58 Q60 32 92 58" />
              <path d="M46 76 Q60 66 74 76" />
            </g>
            <circle cx="60" cy="90" r="7" fill="#F6F2EA" />
            <path d="M14 10 L106 96" stroke={K.o2} strokeWidth="10" strokeLinecap="round" />
          </svg>
          <div style={{ fontFamily: F.mono, fontSize: 34, color: K.gold }}>huggingface.co/mistralai</div>
        </div>
      </div>
    </Scene>
  );
};

const S8: React.FC = () => {
  const f = useCurrentFrame();
  const cmd = "uv tool install mistral-vibe";
  const n = Math.floor(interpolate(f, [24, 100], [0, cmd.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const cursor = Math.floor(f / 15) % 2 === 0;
  return (
    <Scene head="Try 3: an open-source agent." cap="Mistral Vibe on GitHub: an AI agent in your terminal. Free, Apache 2.0." dur={210}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 30, height: "100%" }}>
        <div style={{ background: "#14121C", border: `4px solid ${K.ink}`, borderRadius: 12, padding: "40px 46px", fontFamily: F.mono, fontSize: 56, color: "#F6F2EA" }}>
          <span style={{ color: K.o3 }}>$ </span>
          {cmd.slice(0, n)}
          <span style={{ opacity: cursor ? 1 : 0, color: K.o4 }}>▌</span>
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 44, color: K.o1, opacity: prog(f, 110, 16) }}>github.com/mistralai/mistral-vibe</div>
      </div>
    </Scene>
  );
};

const AGENTS = ["Create", "Check", "Buy", "Measure"];

const S9: React.FC = () => {
  const f = useCurrentFrame();
  const split = prog(f, 30, 40);
  return (
    <Scene dark head="Agents, made in France." cap="Mistral's Studio, expanded on 5 November, builds agents that run in the cloud, your own VPC or on-premises." dur={180}>
      <div style={{ position: "relative", height: "100%" }}>
        {AGENTS.map((t, i) => {
          const x = 560 + (i - 1.5) * 330 * split;
          return (
            <div key={t} style={{ position: "absolute", left: x, top: 90, width: 260, height: 170, background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.head, fontWeight: 800, fontSize: 52, color: K.nuit, opacity: 0.5 + 0.5 * prog(f, 10, 12) }}>
              {split > 0.7 ? t : ""}
            </div>
          );
        })}
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ position: "absolute", left: 560 + (i - 1.5) * 330 + 270, top: 150, fontSize: 60, color: K.gold, opacity: prog(f, 80 + i * 8, 10) }}>→</div>
        ))}
      </div>
    </Scene>
  );
};

const S10: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene head="Alan's campaign, run by agents." cap="Create, check, a person at the gate, buy, measure, and back to create." dur={270}>
      <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          {AGENTS.map((t, i) => (
            <React.Fragment key={t}>
              <div style={{ width: 300, height: 190, background: K.bleu, color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 26px", opacity: prog(f, 14 + i * 12, 16), translate: `0 ${(1 - prog(f, 14 + i * 12, 16)) * 40}px` }}>
                <div style={{ fontFamily: F.mono, fontSize: 22, color: K.gold }}>AGENT</div>
                <div style={{ fontFamily: F.head, fontWeight: 800, fontSize: 52 }}>{t}</div>
              </div>
              {i === 1 ? (
                <div style={{ border: `6px solid ${K.o2}`, background: K.surface, padding: "14px 20px", rotate: "-5deg", textAlign: "center", opacity: prog(f, 80, 12), scale: `${1.5 - 0.5 * prog(f, 80, 12)}` }}>
                  <div style={{ fontFamily: F.head, fontWeight: 800, fontSize: 44, color: K.o2 }}>Gate</div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>A person signs off</div>
                </div>
              ) : i < 3 ? (
                <div style={{ fontSize: 50, color: K.muted }}>→</div>
              ) : null}
            </React.Fragment>
          ))}
        </div>
        <div style={{ height: 70, marginLeft: 150, width: 1290, borderLeft: `5px solid ${K.o3}`, borderRight: `5px solid ${K.o3}`, borderBottom: `5px solid ${K.o3}`, position: "relative", opacity: prog(f, 120, 18) }}>
          <div style={{ position: "absolute", left: "50%", bottom: -50, translate: "-50% 0", fontSize: 30, fontWeight: 700, color: K.o1, whiteSpace: "nowrap" }}>Daily reach by group feeds back to Create</div>
        </div>
      </div>
    </Scene>
  );
};

const S11: React.FC = () => {
  const f = useCurrentFrame();
  const layers: [string, string][] = [
    ["Alan's agent loop", "Create · Check · Gate · Buy · Measure"],
    ["Studio", "agents and workflows"],
    ["Open weights (Le Chonk)", "a model the ministry can inspect"],
    ["Its own servers", "cloud, private cloud or on-premises"],
  ];
  return (
    <Scene dark head="Build it on a French stack." cap="Open weights the ministry can inspect, and agents it can run on its own servers." dur={240}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 14, height: "100%" }}>
        {layers.map(([t, d], i) => {
          const p = prog(f, 20 + (3 - i) * 14, 18);
          return (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 30, height: 110, width: 1300 - i * 0, padding: "0 34px", background: i === 0 ? GRAD : "transparent", border: `4px solid ${i === 0 ? "transparent" : K.gold}`, opacity: p, translate: `0 ${(1 - p) * -40}px` }}>
              <div style={{ fontFamily: F.head, fontWeight: 800, fontSize: 48, color: i === 0 ? K.nuit : "#F6F2EA", minWidth: 560 }}>{t}</div>
              <div style={{ fontSize: 34, color: i === 0 ? K.nuit : K.gold }}>{d}</div>
            </div>
          );
        })}
      </div>
    </Scene>
  );
};

const S12: React.FC = () => {
  const f = useCurrentFrame();
  const rows = ["Run the campaign as an agentic workflow", "Keep a person at the gate", "Build it on French, open-weight AI"];
  return (
    <Scene head="Alan's recommendation." cap="Use agentic workflows, with a person at the gate, on AI that France can own." dur={210}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 26, height: "100%" }}>
        {rows.map((r, i) => (
          <div key={r} style={{ display: "flex", alignItems: "center", gap: 30, opacity: prog(f, 20 + i * 22, 16), translate: `${(1 - prog(f, 20 + i * 22, 16)) * -40}px 0` }}>
            <div style={{ width: 84, height: 84, background: [K.bleu, "#FFFFFF", K.rouge][i], border: `4px solid ${K.ink}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 54, fontWeight: 700, color: i === 1 ? K.ink : "#fff" }}>✓</div>
            <div style={{ fontFamily: F.head, fontWeight: 800, fontSize: 64 }}>{r}</div>
          </div>
        ))}
      </div>
    </Scene>
  );
};

const S13: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Scene dark head="Garder un humain dans la boucle." dur={180}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", gap: 40 }}>
        <div style={{ display: "flex", height: 16, width: 1100 }}>
          {[K.bleu, "#FFFFFF", K.rouge].map((c, i) => (
            <div key={c} style={{ flex: 1, background: c, transformOrigin: "0 50%", scale: `${prog(f, 10 + i * 8, 16)} 1`, border: i === 0 ? "2px solid #F6F2EA" : undefined }} />
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 40, opacity: prog(f, 30, 18) }}>
          <svg width="150" height="150" viewBox="-100 -100 200 200">
            <circle r="96" fill={K.rouge} />
            <circle r="64" fill="#FFFFFF" />
            <circle r="34" fill={K.bleu} />
          </svg>
          <div style={{ fontFamily: F.head, fontWeight: 800, fontSize: 70, lineHeight: 1.1, maxWidth: 1400 }}>
            La souveraineté, c’est aussi garder un humain dans la boucle.
          </div>
        </div>
        <div style={{ fontSize: 46, color: K.gold, opacity: prog(f, 60, 18) }}>Sovereignty also means keeping a human in the loop.</div>
      </div>
    </Scene>
  );
};

const S14: React.FC = () => {
  const src = [
    "mistral.ai/news/mistral-large-4-oss (29 Oct 2026)",
    "mistral.ai/news/mistral-makes-sovereign-open-weight-ai-to-frontier (8 Sep 2026)",
    "mistral.ai/news/build-with-studio (5 Nov 2026)",
    "mistral.ai/news/mistral-small-3-1 · mistral.ai/pricing",
    "github.com/mistralai/mistral-vibe · huggingface.co/mistralai",
    "Mistral AI SAS, Paris: annuaire-entreprises.data.gouv.fr (French state register)",
    "Agent loop: Alan Asman’s answer to the MKTG 644 Session 10 exercise",
  ];
  return (
    <Scene head="Sources: mistral.ai/news" dur={180}>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, paddingTop: 10 }}>
        {src.map((s) => (
          <div key={s} style={{ fontFamily: F.mono, fontSize: 32, borderTop: `2px solid ${K.line}`, paddingTop: 12 }}>{s}</div>
        ))}
        <div style={{ marginTop: 26, fontFamily: F.head, fontWeight: 800, fontSize: 56 }}>Alan Asman · MKTG 644</div>
        <div style={{ fontSize: 30, color: K.muted }}>Vendor claims are Mistral’s own. No Mistral logo used. Class exercise, not affiliated with Mistral AI.</div>
      </div>
    </Scene>
  );
};

/* timeline (30 fps): 91 seconds */
const PLAN: [React.FC, number][] = [
  [S1, 180],
  [S2, 180],
  [S3, 180],
  [S4, 150],
  [S5, 180],
  [S6, 180],
  [S7, 210],
  [S8, 210],
  [S9, 180],
  [S10, 270],
  [S11, 240],
  [S12, 210],
  [S13, 180],
  [S14, 180],
];
export const MISTRAL_FRAMES = PLAN.reduce((a, [, d]) => a + d, 0);

export const MistralEpilogue: React.FC = () => {
  let at = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: K.nuit }}>
      {PLAN.map(([C, d], i) => {
        const from = at;
        at += d;
        return (
          <Sequence key={i} from={from} durationInFrames={d}>
            <C />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
