import { ARC_RAD, ROTATION_RAD } from "./constants";

export function toCanvas(
  { r, theta }: { r: number; theta: number },
  [cx, cy]: [number, number]
): [number, number] {
  return [cx + r * Math.cos(theta), cy - r * Math.sin(theta)];
}

export function toCartesian(
  [x, y]: [number, number],
  [cx, cy]: [number, number]
): [number, number] {
  return [x - cx, cy - y];
}

export function lerp(v0: number, v1: number, t: number): number {
  return (1 - t) * v0 + t * v1;
}

// Converts a #ffffff hex string into an [r,g,b] array
export function h2r(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result) throw new Error("Invalid color: must be in the format #rrggbb");

  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
}

// Inverse of the above
export function r2h([r, g, b]: [number, number, number]): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Interpolates two [r,g,b] colors and returns an [r,g,b] of the result
// Taken from the awesome ROT.js roguelike dev library at
// https://github.com/ondras/rot.js
function interpolateRgb(
  color1: [number, number, number],
  color2: [number, number, number],
  factor: number
): [number, number, number] {
  const result = color1.slice();
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }
  return [result[0], result[1], result[2]];
}

export function interpolateColor(
  color1: string,
  color2: string,
  factor = 0.5
): string {
  return r2h(interpolateRgb(h2r(color1), h2r(color2), factor));
}

export function inRange(x: number, y: number, r: number): boolean {
  return Math.abs(x - y) <= r;
}

export function insideRange(value: number, min: number, max: number) {
  return value >= min && value <= max;
}

export function normalizeTheta(theta: number): number {
  if (theta < 0) {
    return theta + Math.PI * 2;
  }

  return theta;
}

export function deriveNewValueFromDial(
  theta: number,
  range: number,
  min: number
): number {
  // TODO(nleach): I _know_ this can be simplified
  return (
    Math.round(
      ((lerp(
        ARC_RAD,
        0,
        (theta < 0 ? theta + Math.PI * 2 : theta) / (2 * Math.PI)
      ) -
        ROTATION_RAD) /
        (ARC_RAD - ROTATION_RAD)) *
        range
    ) + min
  );
}
