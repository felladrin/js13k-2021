import { SpriteSheet } from "kontra";
import { entryPortalSprite, portalSprite } from "../../constants/instances";

export function handlePortalSpriteSheetImageLoaded(image: HTMLImageElement) {
  portalSprite.animations = entryPortalSprite.animations = SpriteSheet({
    image,
    frameWidth: 64,
    frameHeight: 64,
    animations: {
      nil: {
        frames: [12, 13, 14, 13, 12],
        frameRate: 3,
      },
      min: {
        frames: [9, 10, 9, 10, 11, 10, 9],
        frameRate: 3,
      },
      mid: {
        frames: [8, 9, 10, 9, 10, 10, 9, 10, 8],
        frameRate: 3,
      },
      max: {
        frames: "0..7",
        frameRate: 8,
      },
      entry: {
        frames: ["0..14"],
        frameRate: 8,
        loop: false,
      },
    },
  }).animations;
}
