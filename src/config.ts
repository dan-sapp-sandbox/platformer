import * as ex from "excalibur";

const WorldWidth = 800;
const WorldHeight = 600;

export const Config = {
  PlayerStartPos: ex.vec(WorldWidth / 2, WorldHeight / 2),
  PlayerWalkVelocity: 350,
  PlayerRunVelocity: 200,
  PlayerHealthMax: 100,
  PlayerJumpVelocity: -400,
  PlayerFallAcc: 600,

  ProjectileSpeed: 400,
  ProjectileRate: 1500,
  ProjectileSize: .5,

  EnemyVelocity: 30,
  EnemySizeMin: 1.1,
  EnemySizeRange: 1.7,
  EnemyAnimDuration: 225,

  TreeSizeMin: 1,
  TreeSizeRange: 2.0,

  CrystalSize: 1.5,
  CrystalAnimDuration: 200,
  
  WorldHeight,
  WorldWidth,
  ScreenWidth: 800,
  ScreenHeight: 600,
  WorldBounds: new ex.BoundingBox(0, 0, WorldWidth, WorldHeight),
} as const;
