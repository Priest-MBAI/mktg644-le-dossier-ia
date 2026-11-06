import React from "react";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Title } from "./scenes/Title";
import { Machines } from "./scenes/Machines";
import { MapScene } from "./scenes/MapScene";
import { Dashboard } from "./scenes/Dashboard";
import { Matrix } from "./scenes/Matrix";

// 5 scenes, 4 fades of 15 frames: 195 + 285 + 435 + 255 + 240 - 60 = 1350 frames = 45 s at 30 fps.
export const LeDossierIA: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Title" durationInFrames={195}>
      <Title />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
    <TransitionSeries.Sequence name="Machines" durationInFrames={285}>
      <Machines />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
    <TransitionSeries.Sequence name="Map" durationInFrames={435}>
      <MapScene />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
    <TransitionSeries.Sequence name="Dashboard" durationInFrames={255}>
      <Dashboard />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
    <TransitionSeries.Sequence name="Matrix" durationInFrames={240}>
      <Matrix />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
