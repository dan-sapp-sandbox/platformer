import * as ex from "excalibur";
import { Player } from "../player/player";
import { Resources } from "../resources";
import { generatePauseScreen } from './pause'
import { Platform } from "./platform";
import { Config } from '../../config'

export class Level extends ex.Scene {
  player: Player = new Player(this);

  override onActivate(): void {
    Resources.BackgroundMusic.loop = true;
    Resources.BackgroundMusic.play();
  }

  override onInitialize(engine: ex.Engine): void {
    generatePauseScreen(engine);

    this.add(this.player);
    const plat1 = new Platform(ex.vec(Config.WorldWidth / 4, Config.WorldHeight / 2), 1.1)
    const plat2 = new Platform(ex.vec(3 * Config.WorldWidth / 4, Config.WorldHeight / 2), 1.2)
    const floor = new Platform(ex.vec(Config.WorldWidth / 2, Config.WorldHeight - 50), Config.WorldWidth)
    this.add(plat1);
    this.add(plat2);
    this.add(floor);

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
