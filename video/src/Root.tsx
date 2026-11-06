import React from "react";
import { Composition, Folder } from "remotion";
import { LeDossierIA } from "./Video";
import { Title } from "./scenes/Title";
import { Machines } from "./scenes/Machines";
import { MapScene } from "./scenes/MapScene";
import { Dashboard } from "./scenes/Dashboard";
import { Matrix } from "./scenes/Matrix";
import { MistralEpilogue, MISTRAL_FRAMES } from "./mistral/Mistral";

const base = { width: 1920, height: 1080, fps: 30 };

export const RemotionRoot: React.FC = () => (
  <>
    <Folder name="Scenes">
      <Composition id="Title" component={Title} durationInFrames={195} {...base} />
      <Composition id="Machines" component={Machines} durationInFrames={285} {...base} />
      <Composition id="Map" component={MapScene} durationInFrames={435} {...base} />
      <Composition id="Dashboard" component={Dashboard} durationInFrames={255} {...base} />
      <Composition id="Matrix" component={Matrix} durationInFrames={240} {...base} />
    </Folder>
    <Composition id="LeDossierIA" component={LeDossierIA} durationInFrames={1350} {...base} />
    <Composition id="MistralEpilogue" component={MistralEpilogue} durationInFrames={MISTRAL_FRAMES} {...base} />
  </>
);
