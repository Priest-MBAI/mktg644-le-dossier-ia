import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame, Easing } from "remotion";
import { Frame } from "../Frame";
import { C, F, rise } from "../theme";

// Same model as slide 2 of the deck: 300 dots, one per 10,000 hypothetical people.
const POLY: [number, number][] = [[60.2,6.2],[73.8,18.3],[86,22.7],[90.5,28.2],[104.2,29.3],[99.6,43.6],[95.1,50.2],[88.2,59],[95.1,62.3],[95.1,81],[99.6,85.4],[92,93.1],[82.9,90.9],[72.3,89.8],[65.5,99.7],[55.6,99.7],[41.9,96.4],[28.3,90.9],[32.8,76.6],[32.8,61.2],[25.3,48],[7.8,41.4],[6.3,34.8],[19.2,30.4],[29.8,31.5],[30.6,21.6],[43.5,23.8],[53.3,16.1]];
const inside = (x: number, y: number) => {
  let c = false;
  for (let i = 0, j = POLY.length - 1; i < POLY.length; j = i++) {
    const [ax, ay] = POLY[i];
    const [bx, by] = POLY[j];
    if (ay > y !== by > y && x < ((bx - ax) * (y - ay)) / (by - ay) + ax) c = !c;
  }
  return c;
};
const rng = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const N = 300, NA = 150, NB = 90, NC = 60, UNIT = 800;
const build = () => {
  let pts: [number, number][] = [];
  let sp = 6;
  for (; sp > 2; sp -= 0.02) {
    pts = [];
    let row = 0;
    for (let y = 4; y < 102; y += sp * 0.866, row++) {
      for (let x = 4 + (row % 2 ? sp / 2 : 0); x < 106; x += sp) if (inside(x, y)) pts.push([x, y]);
    }
    if (pts.length >= N) break;
  }
  const r = rng(644);
  for (let i = pts.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [pts[i], pts[j]] = [pts[j], pts[i]];
  }
  pts = pts.slice(0, N);
  return { pts, sp, grp: pts.map((_, i) => (i < NA ? "A" : i < NA + NB ? "B" : "C")) };
};
const { pts, sp, grp } = build();
const GCOL: Record<string, string> = { A: C.gA, B: C.gB, C: C.gC };
const model = (budget: number) => {
  let u = Math.floor(budget / UNIT);
  const a = Math.min(NA, u);
  u -= a;
  const b = Math.min(NB, Math.floor(u / 2));
  u -= b * 2;
  const c = Math.min(NC, Math.floor(u / 4));
  return { a, b, c };
};

export const MapScene: React.FC = () => {
  const frame = useCurrentFrame();
  const budget =
    Math.round(
      interpolate(frame, [50, 290], [0, 240000], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.cubic),
      }) / 8000,
    ) * 8000;
  const m = model(budget);
  const seen: Record<string, number> = { A: 0, B: 0, C: 0 };
  const quota: Record<string, number> = { A: m.a, B: m.b, C: m.c };
  return (
    <Frame chapter="2. Le mécanisme, the biggest risk (R2). Each dot is 10,000 hypothetical people." title="Told to save money, the buyer reaches the cheapest people first.">
      <svg viewBox="0 0 108 103" style={{ position: "absolute", left: 120, top: 300, width: 720, height: 687 }}>
        <path d={"M" + POLY.map((p) => p.join(" ")).join(" L") + " Z"} fill="none" stroke={C.lineStrong} strokeWidth={0.5} />
        {pts.map((p, i) => {
          const g = grp[i];
          const on = seen[g]++ < quota[g];
          return <circle key={i} cx={p[0]} cy={p[1]} r={sp * 0.36} fill={on ? GCOL[g] : "transparent"} stroke={GCOL[g]} strokeWidth={sp * 0.11} />;
        })}
      </svg>
      <div style={{ position: "absolute", left: 900, top: 330, width: 480, display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={rise(frame, 20, 16)}>
          <div style={{ fontSize: 30, color: C.muted }}>Campaign budget</div>
          <div style={{ fontFamily: F.mono, fontSize: 84, fontWeight: 500 }}>€{budget.toLocaleString("en-GB")}</div>
        </div>
        {[
          ["Online every day", C.gA, m.a, NA, 60],
          ["Online some days", C.gB, m.b, NB, 120],
          ["Rarely online", C.gC, m.c, NC, 200],
        ].map(([label, col, n, tot, st]) => (
          <div key={label as string} style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32, ...rise(frame, st as number, 16) }}>
            <span style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: col as string }} />
            <span style={{ flex: 1 }}>{label}</span>
            <span style={{ fontFamily: F.mono, color: C.muted }}>{n} of {tot}</span>
          </div>
        ))}
        <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 56, lineHeight: 1.1, color: C.rouge, marginTop: 16, ...rise(frame, 320, 20) }}>
          Rarely online: 0 of 60 reached.
        </div>
      </div>
      <div style={{ position: "absolute", left: 1440, right: 120, top: 330, display: "flex", flexDirection: "column", gap: 28 }}>
        {[
          ["metro.jpg", "Cheapest to reach: people already on their phones, Paris métro.", 70],
          ["mafate.jpg", "Costliest to reach: France Services in Mafate, La Réunion, no road access.", 250],
        ].map(([src, cap, st]) => (
          <div key={src as string} style={{ display: "flex", flexDirection: "column", gap: 10, ...rise(frame, st as number, 18) }}>
            <Img src={staticFile(src as string)} style={{ width: "100%", height: 230, objectFit: "cover" }} />
            <div style={{ fontSize: 24, lineHeight: 1.3, color: C.muted }}>{cap}</div>
          </div>
        ))}
      </div>
    </Frame>
  );
};
