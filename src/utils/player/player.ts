import * as ex from "excalibur";
import { Config } from "../../config";
import { Level } from "../level/level";
import { Enemy } from "../enemy/enemy";
import { Platform } from '../level/platform'
import { generateAnimations, updateAnimation } from "./animations";

export class Player extends ex.Actor {
  playing = false;
  wallClinging = false;
  downVamp!: ex.Animation;
  upVamp!: ex.Animation;
  leftVamp!: ex.Animation;
  rightVamp!: ex.Animation;
  lastKeyPressed!: ex.Keys;
  experience: number = 0;
  xpLabel!: ex.Label;
  health: number = Config.PlayerHealthMax;
  healthLabel!: ex.Label;
  constructor(private level: Level) {
    super({
      pos: Config.PlayerStartPos,
      radius: 18,
      color: ex.Color.Yellow,
      collisionType: ex.CollisionType.Active,
    });
    this.level = level
  }

  incrementXp = (newXp: number) => {
    this.experience += newXp;
    this.xpLabel.text = `Experience: ${this.experience}`
  }
  decrementHealth = (damage: number) => {
    this.health -= damage;
    this.healthLabel.text = `Health: ${this.health}`
    if (this.health <= 0) {
      this.level.triggerGameOver()
      this.health = Config.PlayerHealthMax
    }
  }

  findNearestEnemy(engine: ex.Engine): Enemy | null {
    const enemies = engine.currentScene.actors.filter(actor => actor instanceof Enemy);
    if (enemies.length === 0) {
      return null;
    }
    return enemies.reduce((nearest, current) => {
      const nearestDistance = this.pos.distance(nearest.pos);
      const currentDistance = this.pos.distance(current.pos);
      return currentDistance < nearestDistance ? current : nearest;
    });
  }

  override onInitialize(engine: ex.Engine): void {
    engine.input.keyboard.on("press", (evt) => {
      if (evt.key === ex.Keys.A || evt.key === ex.Keys.D) {
        this.lastKeyPressed = evt.key;
      }
    });
    engine.input.keyboard.on("hold", (evt) => {
      if (evt.key === ex.Keys.A || evt.key === ex.Keys.D) {
        this.lastKeyPressed = evt.key;
      }
    });

    generateAnimations(this);
    this.graphics.use("playerIdleRight");

    engine.currentScene.camera.strategy.lockToActor(this);
    engine.currentScene.camera.strategy.limitCameraBounds(Config.WorldBounds);

    this.on("exitviewport", () => {
      this.level.triggerGameOver();
    });
  }

  start() {
    this.playing = true;
    this.pos = Config.PlayerStartPos;
    this.acc = ex.vec(0, 0);
  }

  reset() {
    this.pos = Config.PlayerStartPos;
    this.stop();
  }

  stop() {
    this.vel = ex.vec(0, 0);
    this.acc = ex.vec(0, 0);
  }

  override onCollisionStart(_self: ex.Collider, other: ex.Collider, side: ex.Side): void {
    console.log('side', side)
    if (other.owner instanceof Enemy) {
      this.decrementHealth(5)
    } else if (other.owner instanceof Platform) {
      if (side === 'Bottom') {
        this.vel.y = 0;
        this.acc.y = 0;
        // this.wallClinging = true
      }
      if (side === 'Right' || side === 'Left') {
        this.vel.x = 0;
        this.acc.x = 0;
      }
      if (side === 'Top') {
        this.acc.y = 0;
      }
    } else {
      this.stop();
    }
  }

  override onCollisionEnd(_self: ex.Collider, other: ex.Collider): void {
    if (other.owner instanceof Platform) {
      this.acc.y = Config.PlayerFallAcc;
      this.vel.x = 0;
      this.acc.x = 0;
      this.wallClinging = false;
    }
  }

  override onPreUpdate() {
    this.pos.x = Math.max(
      Config.WorldBounds.left,
      Math.min(this.pos.x, Config.WorldBounds.right - this.width),
    );
    this.pos.y = Math.max(
      Config.WorldBounds.top,
      Math.min(this.pos.y, Config.WorldBounds.bottom - this.height),
    );
  }

  override onPostUpdate(engine: ex.Engine): void {
    if (!this.playing) return;
    updateAnimation(this, engine);
  }
}
