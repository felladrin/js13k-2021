import { catSprite } from "../instances";

export function getCatCollisionObject() {
  return { world: { x: catSprite.x, y: catSprite.y - catSprite.height, height: catSprite.height, width: 1 } };
}
