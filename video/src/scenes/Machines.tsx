import React from "react";
import { useCurrentFrame } from "remotion";
import { Frame } from "../Frame";
import { C, F, prog, rise } from "../theme";

const Card: React.FC<{ label: string; title: string; text: string; start: number; dark?: boolean; children?: React.ReactNode }> = ({
  label,
  title,
  text,
  start,
  dark,
  children,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        backgroundColor: dark ? C.bleu : C.surface,
        color: dark ? C.surface : C.ink,
        border: dark ? "none" : `2px solid ${C.lineStrong}`,
        padding: "32px 36px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        ...rise(frame, start, 20, 40),
      }}
    >
      <div style={{ fontSize: 28, opacity: 0.8 }}>{label}</div>
      <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 56, lineHeight: 1.05 }}>{title}</div>
      <div style={{ fontSize: 32, lineHeight: 1.35, color: dark ? C.surface : C.muted }}>{text}</div>
      {children}
    </div>
  );
};

const Risks: React.FC<{ items: string[]; start: number }> = ({ items, start }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
      {items.map((t, i) => (
        <div key={t} style={{ display: "flex", gap: 14, alignItems: "center", fontSize: 30, fontWeight: 700, ...rise(frame, start + i * 6, 14, 16) }}>
          <span style={{ backgroundColor: C.bleu, color: C.surface, fontFamily: F.mono, fontSize: 24, padding: "6px 10px" }}>{t.slice(0, 2)}</span>
          {t.slice(3)}
        </div>
      ))}
    </div>
  );
};

export const Machines: React.FC = () => {
  const frame = useCurrentFrame();
  const line = prog(frame, 70, 24);
  return (
    <Frame chapter="1. Le cadrage, the brief" title="The ad passes through two machines. Nobody checks it in between.">
      <div style={{ position: "absolute", left: 120, right: 120, top: 360, display: "grid", gridTemplateColumns: "1fr 220px 1fr 380px", alignItems: "start" }}>
        <Card label="Machine 1" title="The writer" text="Generative AI writes the copy and makes the image." start={30}>
          <Risks start={170} items={["R1 Stereotyped image", "R5 Copies protected work", "R6 Pressure wording", "R7 No AI label", "R8 Wrong figures"]} />
        </Card>
        <div style={{ paddingTop: 90, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div style={{ width: "100%", height: 0, borderTop: `5px dashed ${C.rouge}`, transformOrigin: "0 50%", scale: `${line} 1` }} />
          <div style={{ color: C.rouge, fontWeight: 700, fontSize: 28, textAlign: "center", lineHeight: 1.2, opacity: line }}>No human check</div>
        </div>
        <Card label="Machine 2" title="The buyer" text="An algorithm picks who sees the ad: most reach for least money." start={100}>
          <Risks start={205} items={["R2 Skips costly-to-reach people", "R3 Misses people offline", "R4 Guesses income from data"]} />
        </Card>
        <div style={{ paddingLeft: 32 }}>
          <Card label="The person" title="A citizen on a low income" text="Sees the ad, or never does." start={140} dark />
        </div>
      </div>
    </Frame>
  );
};
