import { Easing, interpolate } from "remotion";
import { loadFont as loadSpectral } from "@remotion/google-fonts/Spectral";
import { loadFont as loadInria } from "@remotion/google-fonts/InriaSans";
import { loadFont as loadPlex } from "@remotion/google-fonts/IBMPlexMono";

// Same look as the deck: the French state's colours on paper white.
export const C = {
  paper: "#F6F6F6",
  surface: "#FFFFFF",
  ink: "#161616",
  muted: "#53535F",
  line: "#D9D9E0",
  lineStrong: "#B4B4C2",
  bleu: "#000091",
  bleuSoft: "#E3E3FD",
  rouge: "#E1000F",
  ok: "#18753C",
  sevHigh: "#FFC9C5",
  sevMed: "#FFE6E1",
  sevLow: "#EDEDF3",
  gA: "#2F2FC8",
  gB: "#2E8FB5",
  gC: "#C9541E",
};

export const F = {
  head: loadSpectral("normal", { weights: ["700"], subsets: ["latin", "latin-ext"] }).fontFamily,
  body: loadInria("normal", { weights: ["400", "700"], subsets: ["latin", "latin-ext"] }).fontFamily,
  mono: loadPlex("normal", { weights: ["500"], subsets: ["latin"] }).fontFamily,
};

export const ease = Easing.bezier(0.22, 1, 0.36, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0 to 1 progress between two frames, eased. */
export const prog = (frame: number, start: number, dur = 18) =>
  interpolate(frame, [start, start + dur], [0, 1], { ...clamp, easing: ease });

/** Fade and rise in from below. */
export const rise = (frame: number, start: number, dur = 18, dist = 28) => {
  const p = prog(frame, start, dur);
  return { opacity: p, translate: `0px ${(1 - p) * dist}px` };
};
