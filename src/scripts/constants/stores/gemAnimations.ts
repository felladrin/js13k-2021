import { SpriteSheet } from "kontra";
import { createDerivedPubSub } from "../../functions/getters/createDerivedPubSub";
import { getGemSpriteSheetImage, onGemSpriteSheetImageLoaded } from "./gemSpriteSheetImage";

export const [, , getGemAnimations] = createDerivedPubSub([onGemSpriteSheetImageLoaded], () => {
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
});
