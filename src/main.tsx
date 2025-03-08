import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import * as ex from "excalibur";
import { Resources } from "./utils/resources";
import { Level } from "./utils/level/level";
import { Config } from "./config";
import { initMuteButton } from "./utils/ui";

const positionUI = (game: ex.Engine) => {
  const ui = document.getElementsByClassName("ui")[0] as HTMLElement;
  if (ui) {
    const topLeft = game.screen.screenToPageCoordinates(
      ex.vec(0, Config.ScreenHeight - 40),
    );
    ui.style.visibility = "visible";
    ui.style.left = topLeft.x + "px";
    ui.style.top = topLeft.y + "px";
  }
};

const game = new ex.Engine({
  width: 800,
  height: 600,
  backgroundColor: ex.Color.fromHex("#237a1f"),
  pixelArt: true,
  pixelRatio: 1,
  displayMode: ex.DisplayMode.FitScreen,
  scenes: { Level },
});

// game.currentScene.world.spatialGrid = new ex.SpatialGrid(100);

const loader = new ex.Loader(Object.values(Resources));

game.start(loader).then(() => {
  const startButton = document.getElementById("excalibur-play-root")
  if (startButton) {
    startButton.style.visibility = 'hidden';
  }
  game.goToScene("Level");
  positionUI(game);
  initMuteButton();
});

game.screen.events.on("resize", () => positionUI(game));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
