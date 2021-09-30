import { SpriteSheet } from "kontra";
import { getGemSpriteSheetImage } from "../../constants/stores";

export function getGemAnimations() {
  const image = getGemSpriteSheetImage();
  if (image)
    return SpriteSheet({
      image,
      frameWidth: 16,
      frameHeight: 16,
      animations: {
        idle: {
          frames: "0..3",
          frameRate: 5,
        },
      },
    }).animations;
}
