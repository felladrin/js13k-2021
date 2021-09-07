import { leftKeyButton, rightKeyButton, upKeyButton } from "../../constants/instances";
import { keyPressed } from "kontra";
import { jumpKeys, moveLeftKeys, moveRightKeys } from "../../constants/config";

export function updateKeyButtonsAnimation() {
  jumpKeys.some(keyPressed) || upKeyButton.pressed
    ? upKeyButton.playAnimation("upPressed")
    : upKeyButton.playAnimation("up");

  moveLeftKeys.some(keyPressed) || leftKeyButton.pressed
    ? leftKeyButton.playAnimation("leftPressed")
    : leftKeyButton.playAnimation("left");

  moveRightKeys.some(keyPressed) || rightKeyButton.pressed
    ? rightKeyButton.playAnimation("rightPressed")
    : rightKeyButton.playAnimation("right");
}
