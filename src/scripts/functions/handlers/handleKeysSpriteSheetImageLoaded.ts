import { SpriteSheet } from "kontra";
import { upKeyButton, leftKeyButton, rightKeyButton } from "../../constants/instances";

export function handleKeysSpriteSheetImageLoaded(image: HTMLImageElement) {
  const keyButtonAnimations = SpriteSheet({
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

  upKeyButton.animations = keyButtonAnimations;
  leftKeyButton.animations = keyButtonAnimations;
  rightKeyButton.animations = keyButtonAnimations;
}
