import { SpriteSheet } from "kontra";
import { onGemSpriteSheetImageLoaded } from "../constants/events";
import { setGemAnimations } from "../constants/stores";

onGemSpriteSheetImageLoaded((image) => {
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
});
