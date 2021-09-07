import { portalSprite } from "../../constants/instances";

export function getPortalCollisionObject() {
  return { world: { x: portalSprite.x - 16, y: portalSprite.y - 16, height: 32, width: 32 } };
}
