import * as ex from "excalibur";

export class Platform extends ex.Actor {
  xScale: number
  constructor(pos: ex.Vector, xScale: number) {
    super({
      pos,
      width: 100,
      height: 20,
      color: ex.Color.Blue,
      z: 5,
      collisionType: ex.CollisionType.Passive
    });
    this.graphics.opacity = 1;
    this.xScale = xScale
  }

  reset(pos: ex.Vector) {
    this.pos = pos;
    this.graphics.opacity = 1;
  }

  hide() {
    this.graphics.opacity = 0;
  }

  override onInitialize(): void {
    this.scale = new ex.Vector(this.xScale, 1);
  }
}
