import * as ex from "excalibur";
import { Player } from "../player/player";
import { Config } from '../../config'
import { generateAnimations } from './animations'

export class Enemy extends ex.Actor {
  enemyType: number;
  enemySize: number;
  downWalk!: ex.Animation;
  upWalk!: ex.Animation;
  leftWalk!: ex.Animation;
  rightWalk!: ex.Animation;
  xp: number = 7;
  constructor(pos: ex.Vector, enemyType: number, enemySize: number) {
    super({
      pos,
      width: 1,
      height: 1,
      color: ex.Color.Green,
      z: 5,
      collisionType: ex.CollisionType.Active
    });
    this.enemyType = enemyType;
    this.enemySize = enemySize;
    this.graphics.opacity = 1;
  }

  reset(pos: ex.Vector) {
    this.pos = pos;
    this.graphics.opacity = 1;
  }

  hide() {
    this.graphics.opacity = 0;
  }

  override onInitialize(): void {
    generateAnimations(this);
    this.graphics.use("enemyIdle");
    this.scale = new ex.Vector(this.enemySize, this.enemySize);
  }

  // Update method for moving the enemy towards the player
  override onPostUpdate(engine: ex.Engine): void {
    const player = engine.currentScene.actors.find(actor => actor instanceof Player);
    if (player) {
      const direction = player.pos.sub(this.pos).normalize();
      this.vel = direction.scale(Config.EnemyVelocity);
      if (Math.abs(this.vel.x) > Math.abs(this.vel.y)) {
        if (this.vel.x > 0) {
          this.graphics.use("enemyWalkRight");
        } else {
          this.graphics.use("enemyWalkLeft");
        }
      } else {
        if (this.vel.y > 0) {
          this.graphics.use("enemyWalkDown");
        } else {
          this.graphics.use("enemyWalkUp");
        }
      }
    }
  }
}
