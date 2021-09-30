import { SpriteSheet } from "kontra";
import { onKeysSpriteSheetImageLoaded } from "../constants/events";
import { upKeySprite, leftKeySprite, rightKeySprite } from "../constants/instances";

onKeysSpriteSheetImageLoaded((image) => {
  const keySpriteAnimations = SpriteSheet({
    image,
    frameWidth: 32,
    frameHeight: 32,
    animations: {
      up: {
        frames: 0,
      },
      upPressed: {
        frames: 1,
      },
      right: {
        frames: 2,
      },
      rightPressed: {
        frames: 3,
      },
      left: {
        frames: 4,
      },
      leftPressed: {
        frames: 5,
      },
    },
  }).animations;

  upKeySprite.animations = keySpriteAnimations;
  leftKeySprite.animations = keySpriteAnimations;
  rightKeySprite.animations = keySpriteAnimations;
});
