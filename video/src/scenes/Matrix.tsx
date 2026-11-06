import React from "react";
import { useCurrentFrame } from "remotion";
import { Frame } from "../Frame";
import { C, F, rise } from "../theme";

// Same scores as slide 3 of the deck (likelihood x impact per stakeholder).
const ROWS: [string, string[], string[], string[]][] = [
  ["Target citizens", ["R7"], ["R4", "R6"], ["R1", "R2", "R3", "R8"]],
  ["Ministry", [], ["R1", "R5", "R6", "R7"], ["R2", "R3", "R4", "R8"]],
  ["Platform", ["R2", "R7", "R8"], ["R4", "R5"], []],
  ["Society", ["R5", "R6", "R7"], ["R2", "R4"], []],
];
const BG = [C.sevLow, C.sevMed, C.sevHigh];

export const Matrix: React.FC = () => {
  const frame = useCurrentFrame();
  let k = 0;
  return (
    <Frame chapter="3. La matrice. Severity = likelihood × impact, each scored 1 to 3 (Alan’s judgement)." title="Every high-severity risk lands on citizens or the ministry.">
      <div style={{ position: "absolute", left: 120, top: 330, width: 1080, display: "grid", gridTemplateColumns: "250px 1fr 1fr 1fr", gap: 10 }}>
        <div />
        {["Low", "Medium", "High"].map((h) => (
          <div key={h} style={{ fontFamily: F.head, fontWeight: 700, fontSize: 40, paddingBottom: 6 }}>{h}</div>
        ))}
        {ROWS.map(([name, ...cells]) => (
          <React.Fragment key={name}>
            <div style={{ fontSize: 32, fontWeight: 700, display: "flex", alignItems: "center", backgroundColor: C.surface, border: `2px solid ${C.lineStrong}`, padding: "0 18px" }}>{name}</div>
            {cells.map((ids, ci) => (
              <div key={ci} style={{ backgroundColor: BG[ci], minHeight: 118, padding: 12, display: "flex", flexWrap: "wrap", alignContent: "flex-start", gap: 8 }}>
                {ids.map((id) => (
                  <span key={id} style={{ backgroundColor: C.bleu, color: C.surface, fontFamily: F.mono, fontSize: 26, padding: "8px 12px", height: "fit-content", ...rise(frame, 16 + k++ * 3, 12, 12) }}>{id}</span>
                ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div style={{ position: "absolute", left: 1280, right: 120, top: 330, display: "flex", flexDirection: "column", gap: 32 }}>
        <div style={{ fontSize: 34, lineHeight: 1.35, ...rise(frame, 110, 20) }}>
          <b style={{ color: C.bleu }}>Deliberate risks</b> need a policy and a named owner: a minimum reach for every income band.
        </div>
        <div style={{ fontSize: 34, lineHeight: 1.35, ...rise(frame, 140, 20) }}>
          <b style={{ color: C.bleu }}>Accidental risks</b> need checking and monitoring: a human check before launch, and offline help at France Services counters.
        </div>
        <div style={{ borderTop: `3px solid ${C.bleu}`, paddingTop: 22, fontSize: 26, lineHeight: 1.4, color: C.muted, ...rise(frame, 180, 20) }}>
          <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 40, color: C.ink }}>Le Dossier IA</div>
          Alan Asman, MKTG 644. Mock figures, illustrative. Photos: besopha (CC BY 2.0), Rémih (CC BY-SA 4.0), Wikimedia Commons.
        </div>
      </div>
    </Frame>
  );
};
