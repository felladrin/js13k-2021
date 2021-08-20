import { GameObject } from "kontra";
import { contain } from "math-fit";
import { canvas } from "./constants";

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
    top: `${fittingProps.top}px`,
    left: `${fittingProps.left}px`,
    width: `${fittingProps.width}px`,
    height: `${fittingProps.height}px`,
  };

  for (const declaration of Object.keys(style)) {
    canvas.style[declaration as any] = (style as Record<string, string>)[
      declaration
    ];
  }

  window.scrollTo(1, 0);
}

export function isOutOfCanvasBounds(gameObject: GameObject) {
  return (
    gameObject.x > canvas.width ||
    gameObject.y > canvas.height ||
    gameObject.x < 0 ||
    gameObject.y < 0
  );
}
