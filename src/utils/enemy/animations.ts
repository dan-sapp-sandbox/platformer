import * as ex from "excalibur";
import { Enemy } from "./enemy";
import { Config } from "../../config";
import { Resources } from "../resources";

export const generateAnimations = (self: Enemy) => {
  let spriteType;
  switch (self.enemyType) {
    case 0:
      spriteType = Resources.Slime1
      break;
    case 1:
      spriteType = Resources.Slime2
      break;
    case 2:
      spriteType = Resources.Slime3
      break;
    default:
      spriteType = Resources.Slime1

  }
  const spriteSheet = ex.SpriteSheet.fromImageSource({
    image: spriteType,
    grid: {
      rows: 4,
      columns: 8,
      spriteWidth: 34,
      spriteHeight: 32,
    },
    spacing: {
      originOffset: {
        x: 15,
        y: 15
      },
      margin: {
        x: 30,
        y: 32
      }
    }
  });
  self.downWalk = ex.Animation.fromSpriteSheet(
    spriteSheet,
    ex.range(0, 7),
    Config.EnemyAnimDuration,
  );
  self.upWalk = ex.Animation.fromSpriteSheet(
    spriteSheet,
    ex.range(8, 15),
    Config.EnemyAnimDuration,
  );
  self.leftWalk = ex.Animation.fromSpriteSheet(
    spriteSheet,
    ex.range(16, 23),
    Config.EnemyAnimDuration,
  );
  self.rightWalk = ex.Animation.fromSpriteSheet(
    spriteSheet,
    ex.range(24, 31),
    Config.EnemyAnimDuration,
  );
  const idleSprite = spriteSheet.getSprite(self.enemyType, 0);
  self.graphics.add("enemyIdle", idleSprite);
  self.graphics.add("enemyWalkDown", self.downWalk);
  self.graphics.add("enemyWalkUp", self.upWalk);
  self.graphics.add("enemyWalkLeft", self.leftWalk);
  self.graphics.add("enemyWalkRight", self.rightWalk);
}