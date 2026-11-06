import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F, prog } from "./theme";

/** Shared page: paper ground, tricolore band drawn in, a chapter line and a headline. */
export const Frame: React.FC<{
  chapter: string;
  title?: React.ReactNode;
  children: React.ReactNode;
}> = ({ chapter, title, children }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper, fontFamily: F.body, color: C.ink }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 12, display: "flex" }}>
        {[C.bleu, C.surface, C.rouge].map((bg, i) => (
          <div
            key={bg}
            style={{
              flex: 1,
              backgroundColor: bg,
              borderBottom: i === 1 ? `1px solid ${C.line}` : undefined,
              transformOrigin: "0 50%",
              scale: `${prog(frame, i * 4, 16)} 1`,
            }}
          />
        ))}
      </div>
      <div style={{ position: "absolute", left: 120, right: 120, top: 84, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 30, color: C.muted, opacity: prog(frame, 6, 14) }}>{chapter}</div>
        {title ? (
          <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 72, lineHeight: 1.06, letterSpacing: "-0.01em", maxWidth: 1600 }}>
            {title}
          </div>
        ) : null}
      </div>
      {children}
    </AbsoluteFill>
  );
};

/** Headline whose words light up one after another. */
export const WordReveal: React.FC<{ text: string; start: number; perWord?: number; color?: string }> = ({
  text,
  start,
  perWord = 3,
  color,
}) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");
  return (
    <span style={{ color }}>
      {words.map((w, i) => {
        const p = prog(frame, start + i * perWord, 12);
        return (
          <span key={i} style={{ opacity: 0.15 + 0.85 * p, filter: `blur(${(1 - p) * 6}px)` }}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
};
