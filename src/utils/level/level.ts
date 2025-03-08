import * as ex from "excalibur";
import { Player } from "../player/player";
import { Resources } from "../resources";
import { generatePauseScreen } from './pause'

export class Level extends ex.Scene {
  player: Player = new Player(this);

  override onActivate(): void {
    Resources.BackgroundMusic.loop = true;
    Resources.BackgroundMusic.play();
  }

  override onInitialize(engine: ex.Engine): void {
    generatePauseScreen(engine);

    this.add(this.player);

    this.player.start();
  }

  reset() {
    this.player.reset();
  }

  triggerGameOver() {
    this.player.stop();
    this.player.reset();
  }
}
