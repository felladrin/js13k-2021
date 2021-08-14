declare module "math-fit" {
  function contain(
    targetSize: {
      w: number;
      h: number;
    },
    parentSize: {
      w: number;
      h: number;
    }
  ): {
    left: number;
    top: number;
    width: number;
    height: number;
    scale: number;
  };
}
