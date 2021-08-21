import { GameObject } from "kontra";
import { contain } from "math-fit";
import { canvas } from "./constants";
import { zzfx } from "zzfx";

export function resizeGame() {
  if (!canvas.parentElement) return;

  const fittingProps = contain(
    { w: canvas.width, h: canvas.height },
    {
      w: canvas.parentElement.clientWidth,
      h: canvas.parentElement.clientHeight,
    }
  );

  const style: Partial<CSSStyleDeclaration> = {
    marginTop: `${fittingProps.top}px`,
    marginLeft: `${fittingProps.left}px`,
    width: `${fittingProps.width}px`,
    height: `${fittingProps.height}px`,
  };

  for (const declaration of Object.keys(style)) {
    canvas.style[declaration as any] = (style as Record<string, string>)[declaration];
  }

  window.scrollTo(1, 0);
}

export function isOutOfCanvasBounds(gameObject: GameObject) {
  return gameObject.x > canvas.width || gameObject.y > canvas.height || gameObject.x < 0 || gameObject.y < 0;
}

export function playShootSound() {
  zzfx(2.18, 0.05, 382, 0.04, 0.02, 0, 3, 0.11, -7.2, 0.3, 0, 0, 0.06, 0, 0, 0, 0.08, 0.9, 0.04, 0.26);
}
