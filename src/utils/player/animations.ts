import * as ex from 'excalibur'
import { Player } from "./player";
import { Resources } from '../resources';
import { Config } from '../../config';

export const generateAnimations = (self: Player) => {
  const spriteSheet = ex.SpriteSheet.fromImageSource({
    image: Resources.Vampire,
    grid: {
      rows: 4,
      columns: 6,
      spriteWidth: 64,
      spriteHeight: 64,
    },
  });
  const walkSpeed = 75;
  const walkLeft = ex.Animation.fromSpriteSheet(
    spriteSheet,
    ex.range(12, 17),
    walkSpeed,
  );
  const walkRight = ex.Animation.fromSpriteSheet(
    spriteSheet,
    ex.range(18, 23),
    walkSpeed,
  );
  const idleLeftSprite = spriteSheet.getSprite(0, 2);
  const idleRightSprite = spriteSheet.getSprite(0, 3);

  self.graphics.add("playerIdleLeft", idleLeftSprite);
  self.graphics.add("playerIdleRight", idleRightSprite);
  self.graphics.add("playerWalkLeft", walkLeft);
  self.graphics.add("playerWalkRight", walkRight);

}

export const updateAnimation = (player: Player, engine: ex.Engine) => {
  updateWalkingAnimation(player, engine)
  if (!player.vel.x && !player.vel.y) {
    updateIdleAnimation(player)
  }
}

const updateWalkingAnimation = (player: Player, engine: ex.Engine) => {
  if (engine.input.keyboard.wasPressed(ex.Keys.W)) {
    // player.graphics.use("playerWalkUp");
    player.vel.y = Config.PlayerJumpVelocity;
    player.acc.y = Config.PlayerFallAcc;
  }
  if (engine.input.keyboard.isHeld(ex.Keys.D)) {
    player.graphics.use("playerWalkRight");
    if (!player.wallClinging) {
      player.vel.x = Config.PlayerWalkVelocity;
    }
  } else if (engine.input.keyboard.isHeld(ex.Keys.A)) {
    player.graphics.use("playerWalkLeft");
    if (!player.wallClinging) {
      player.vel.x = -Config.PlayerWalkVelocity;
    }
  } else {
    player.vel.x = 0;
  }
}

const updateIdleAnimation = (player: Player) => {
  switch (player.lastKeyPressed) {
    case ex.Keys.D:
      player.graphics.use("playerIdleRight");
      break;
    case ex.Keys.A:
      player.graphics.use("playerIdleLeft");
      break;
    default:
      player.graphics.use("playerIdleRight");
  }
}