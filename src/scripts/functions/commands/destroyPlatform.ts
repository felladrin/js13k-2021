import { Sprite } from "kontra";
import { getPlatformWhichCatIsOn, setPlatformWhichCatIsOn } from "../../constants/stores/platformWhichCatIsOn";

export function destroyPlatform(platform: Sprite) {
  platform.ttl = 0;

  if (getPlatformWhichCatIsOn() === platform) setPlatformWhichCatIsOn(null);
}
