import React from "react";
import { useCurrentFrame } from "remotion";
import { Frame } from "../Frame";
import { C, F, prog, rise } from "../theme";

const SWITCH = 120;

export const Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const overall = 1 - prog(frame, SWITCH, 14);
  const byGroup = prog(frame, SWITCH + 10, 16);
  return (
    <Frame
      chapter="Mock delivery report, week 1. Figures come from the model, not a real campaign."
      title={frame < SWITCH + 8 ? "The dashboard says the campaign worked." : "Split by group, the failure shows."}
    >
      <div style={{ position: "absolute", left: 120, right: 120, top: 330, height: 520 }}>
        <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40, alignItems: "start", opacity: overall }}>
          {[
            ["People reached", "2.25 M", "of 3.0 M in the target group"],
            ["Reach of target group", "75 %", "Target 70 %"],
            ["Cost per person reached", "€0.11", "Target €0.15 or less"],
          ].map(([l, v, t], i) => (
            <div key={l} style={{ backgroundColor: C.surface, border: `2px solid ${C.line}`, padding: "36px 40px", display: "flex", flexDirection: "column", gap: 16, ...rise(frame, 10 + i * 12, 18) }}>
              <div style={{ fontSize: 32, color: C.muted }}>{l}</div>
              <div style={{ fontFamily: F.mono, fontSize: 96, fontWeight: 500 }}>{v}</div>
              <div style={{ fontSize: 28, color: C.muted }}>{t}</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: C.ok }}>✓ On track</div>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", gap: 34, opacity: byGroup }}>
          {[
            ["Online every day", C.gA, 100, true],
            ["Online some days", C.gB, 83, true],
            ["Rarely online", C.gC, 0, false],
          ].map(([l, col, p, ok], i) => (
            <div key={l as string} style={{ display: "grid", gridTemplateColumns: "420px 1fr 220px", alignItems: "center", gap: 28 }}>
              <div>
                <div style={{ fontSize: 40, fontWeight: 700 }}>{l}</div>
                <div style={{ fontSize: 30, fontWeight: 700, color: ok ? C.ok : C.rouge }}>{ok ? "✓ On track" : "✕ Off track"}</div>
              </div>
              <div style={{ position: "relative", height: 64 }}>
                <div
                  style={{
                    height: "100%",
                    backgroundColor: col as string,
                    transformOrigin: "0 50%",
                    scale: `${((p as number) / 100) * prog(frame, SWITCH + 20 + i * 10, 24)} 1`,
                  }}
                />
                <div style={{ position: "absolute", top: -14, bottom: -14, left: "60%", borderLeft: `3px dashed ${C.ink}` }} />
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 56, textAlign: "right", whiteSpace: "nowrap", color: ok ? C.ink : C.rouge }}>{p as number} %</div>
            </div>
          ))}
          <div style={{ fontSize: 28, color: C.muted, marginLeft: 448 }}>Dashed line: target of 60 % per group</div>
          <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 52, color: C.bleu, marginTop: 10, ...rise(frame, 190, 20) }}>
            Session 9 calls this optimising the wrong metric.
          </div>
        </div>
      </div>
    </Frame>
  );
};
