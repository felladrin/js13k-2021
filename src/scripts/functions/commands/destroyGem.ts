import { Sprite } from "kontra";

export function destroyGem(gem: Sprite) {
  gem.ttl = 0;
}
