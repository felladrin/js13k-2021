// ZzFX - Zuper Zmall Zound Zynth - Micro Edition
//
// MIT License
//
// Copyright (c) 2019 Frank Force
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
export function getZzFX() {
  const zzfxV = 0.3;
  const zzfxX = new window.AudioContext();
  return (
    p = 1,
    k = 0.05,
    b = 220,
    e = 0,
    r = 0,
    t = 0.1,
    q = 0,
    D = 1,
    u = 0,
    y = 0,
    v = 0,
    z = 0,
    l = 0,
    E = 0,
    A = 0,
    F = 0,
    c = 0,
    w = 1,
    m = 0,
    B = 0
  ) => {
    let M = Math,
      R = 44100,
      d = 2 * M.PI,
      G = (u *= (500 * d) / R / R),
      // @ts-ignore
      C = (b *= ((1 - k + 2 * k * M.random((k = []))) * d) / R),
      g = 0,
      H = 0,
      a = 0,
      n = 1,
      I = 0,
      J = 0,
      f = 0,
      x,
      h;
    e = R * e + 9;
    m *= R;
    r *= R;
    t *= R;
    c *= R;
    y *= (500 * d) / R ** 3;
    A *= d / R;
    v *= d / R;
    z *= R;
    l = (R * l) | 0;
    // @ts-ignore
    for (h = (e + m + r + t + c) | 0; a < h; k[a++] = f)
      ++J % ((100 * F) | 0) ||
        ((f = q
          ? 1 < q
            ? 2 < q
              ? 3 < q
                ? M.sin((g % d) ** 3)
                : M.max(M.min(M.tan(g), 1), -1)
              : 1 - (((((2 * g) / d) % 2) + 2) % 2)
            : 1 - 4 * M.abs(M.round(g / d) - g / d)
          : M.sin(g)),
        (f =
          (l ? 1 - B + B * M.sin((d * a) / l) : 1) *
          (0 < f ? 1 : -1) *
          M.abs(f) ** D *
          p *
          zzfxV *
          (a < e
            ? a / e
            : a < e + m
            ? 1 - ((a - e) / m) * (1 - w)
            : a < e + m + r
            ? w
            : a < h - c
            ? ((h - a - c) / t) * w
            : 0)),
        // @ts-ignore
        (f = c ? f / 2 + (c > a ? 0 : ((a < h - c ? 1 : (h - a) / c) * k[(a - c) | 0]) / 2) : f)),
        (x = (b += u += y) * M.cos(A * H++)),
        (g += x - x * E * (1 - ((1e9 * (M.sin(a) + 1)) % 2))),
        n && ++n > z && ((b += v), (C += v), (n = 0)),
        !l || ++I % l || ((b = C), (u = G), (n = n || 1));
    // @ts-ignore
    p = zzfxX.createBuffer(1, h, R);
    // @ts-ignore
    p.getChannelData(0).set(k);
    // @ts-ignore
    b = zzfxX.createBufferSource();
    // @ts-ignore
    b.buffer = p;
    // @ts-ignore
    b.connect(zzfxX.destination);
    // @ts-ignore
    b.start();
    return b;
  };
}
