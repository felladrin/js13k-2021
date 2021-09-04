import { portalSprite } from "../constants";

export function processPortalAnimation() {
  if (
    portalSprite.animations.open &&
    portalSprite.currentAnimation === portalSprite.animations.open &&
    (portalSprite.currentAnimation as unknown as { _f: number })._f === portalSprite.currentAnimation.frames.length - 1
  ) {
    portalSprite.playAnimation("idle");
  }
}
