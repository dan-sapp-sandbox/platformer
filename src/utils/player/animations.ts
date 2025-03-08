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
  if (engine.input.keyboard.isHeld(ex.Keys.S)) {
    // player.graphics.use("playerWalkDown");
    player.vel.y = Config.PlayerVelocity;
  } else if (engine.input.keyboard.isHeld(ex.Keys.W)) {
    // player.graphics.use("playerWalkUp");
    player.vel.y = -Config.PlayerVelocity;
  } else {
    player.vel.y = 0;
  }
  if (engine.input.keyboard.isHeld(ex.Keys.D)) {
    player.graphics.use("playerWalkRight");
    player.vel.x = Config.PlayerVelocity;
  } else if (engine.input.keyboard.isHeld(ex.Keys.A)) {
    player.graphics.use("playerWalkLeft");
    player.vel.x = -Config.PlayerVelocity;
  } else {
    player.vel.x = 0;
  }
}

const updateIdleAnimation = (player: Player) => {
  switch (player.lastKeyPressed) {
    case ex.Keys.S:
      player.graphics.use("playerIdleDown");
      break;
    case ex.Keys.W:
      player.graphics.use("playerIdleUp");
      break;
    case ex.Keys.D:
      player.graphics.use("playerIdleRight");
      break;
    case ex.Keys.A:
      player.graphics.use("playerIdleLeft");
      break;
    default:
      player.graphics.use("playerIdleDown");
  }
}