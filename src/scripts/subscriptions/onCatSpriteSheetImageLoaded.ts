import { SpriteSheet } from "kontra";
import { onCatSpriteSheetImageLoaded } from "../constants/events";
import { catSprite } from "../constants/instances";

onCatSpriteSheetImageLoaded((image) => {
  catSprite.animations = SpriteSheet({
    image,
    frameWidth: 18,
    frameHeight: 18,
    animations: {
      idle: {
        frames: "0..3",
        frameRate: 8,
      },
      walk: {
        frames: "4..11",
        frameRate: 20,
      },
      up: {
        frames: 12,
      },
      down: {
        frames: 13,
      },
    },
  }).animations;
});
