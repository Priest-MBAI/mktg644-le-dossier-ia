import React from "react";
import { useCurrentFrame } from "remotion";
import { Frame, WordReveal } from "../Frame";
import { C, F, rise } from "../theme";

export const Title: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Frame chapter="MKTG 644 AI-Powered Marketing, Session 9: AI risk and governance. Alan Asman.">
      <div style={{ position: "absolute", left: 120, right: 200, top: 300, display: "flex", flexDirection: "column", gap: 40 }}>
        <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 112, lineHeight: 1.04, letterSpacing: "-0.015em" }}>
          <WordReveal text="France uses AI to teach lower‑income citizens about money." start={14} perWord={4} />
        </div>
        <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 112, lineHeight: 1.04, color: C.rouge, ...rise(frame, 78, 20) }}>
          What could go wrong?
        </div>
        <div style={{ fontSize: 40, color: C.muted, maxWidth: 1300, lineHeight: 1.35, ...rise(frame, 110, 20) }}>
          A class exercise: find the risks, then map who gets hurt and how badly.
        </div>
      </div>
    </Frame>
  );
};
