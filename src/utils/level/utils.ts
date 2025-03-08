import * as ex from 'excalibur'
import { Config } from '../../config'
import { Enemy } from '../enemy/enemy';

export const makeEnemies = (engine: ex.Engine) => {
  function generateEnemyPosition(): ex.Vector {
    let attempts = 0;
    let pos: ex.Vector;
    let collides: boolean;

    do {
      pos = new ex.Vector(
        Math.random() * Config.WorldBounds.right,
        Math.random() * Config.WorldBounds.bottom,
      );

      collides = engine.currentScene.actors.some((actor) => {
        return (
          actor.collider.bounds.intersect(
            new ex.BoundingBox(pos.x - 10, pos.y - 10, pos.x - 10, pos.y - 10),
          )
        );
      });

      attempts++;
    } while (collides && attempts < 10);

    return pos;
  }

  const enemyPool: Enemy[] = [];
  for (let i = 0; i < 500; i++) {
    const pos = generateEnemyPosition();
    const enemyType = Math.floor(Math.random() * 999) % 3
    const enemySize = (Math.random() * Math.random() * Math.random() * Config.EnemySizeRange) + Config.EnemySizeMin
    const enemy = new Enemy(pos, enemyType, enemySize);


    enemy.on("exitviewport", () => enemy.hide());
    enemy.on("enterviewport", () => enemy.graphics.opacity = 1);

    enemyPool.push(enemy);
    engine.add(enemy);
  }
};