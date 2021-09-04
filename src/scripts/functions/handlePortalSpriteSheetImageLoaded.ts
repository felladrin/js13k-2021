import { SpriteSheet } from "kontra";
import { portalSprite } from "../constants";

export function handlePortalSpriteSheetImageLoaded(image: HTMLImageElement) {
  portalSprite.animations = SpriteSheet({
    image,
    frameWidth: 64,
    frameHeight: 64,
    animations: {
      idle: {
        frames: "0..7",
        frameRate: 10,
      },
      open: {
        frames: "12..8",
        frameRate: 8,
        loop: false,
      },
      close: {
        frames: "8..14",
        frameRate: 8,
        loop: false,
      },
    },
  }).animations;
}
