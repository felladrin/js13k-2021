import { SpriteSheet } from "kontra";
import { setGemAnimations } from "../constants";

export function handleGemSpriteSheetImageLoaded(image: HTMLImageElement) {
  setGemAnimations(
    SpriteSheet({
      image,
      frameWidth: 16,
      frameHeight: 16,
      animations: {
        idle: {
          frames: "0..3",
          frameRate: 5,
        },
      },
    }).animations
  );
}
