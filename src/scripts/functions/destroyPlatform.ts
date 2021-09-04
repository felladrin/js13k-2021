import { Sprite } from "kontra";
import { getPlatformWhichCatIsOn, setPlatformWhichCatIsOn } from "../stores";

export function destroyPlatform(platform: Sprite) {
  platform.ttl = 0;

  if (getPlatformWhichCatIsOn() === platform) setPlatformWhichCatIsOn(null);
}
