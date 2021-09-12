import {
  leftKeyButton,
  leftKeySprite,
  rightKeyButton,
  rightKeySprite,
  upKeyButton,
  upKeySprite,
} from "../../constants/instances";
import { keyPressed } from "kontra";
import { jumpKeys, moveLeftKeys, moveRightKeys } from "../../constants/config";

export function updateKeyButtonsAnimation() {
  jumpKeys.some(keyPressed) || upKeyButton.pressed
    ? upKeySprite.playAnimation("upPressed")
    : upKeySprite.playAnimation("up");

  moveLeftKeys.some(keyPressed) || leftKeyButton.pressed
    ? leftKeySprite.playAnimation("leftPressed")
    : leftKeySprite.playAnimation("left");

  moveRightKeys.some(keyPressed) || rightKeyButton.pressed
    ? rightKeySprite.playAnimation("rightPressed")
    : rightKeySprite.playAnimation("right");
}
