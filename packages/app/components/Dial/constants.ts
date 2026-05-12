export const ARC_FILL = 0.8;
export const ARC_GAP = 1 - ARC_FILL;
export const GAP_RAD = 2 * Math.PI * ARC_GAP;
export const ARC_RAD = 2 * Math.PI * ARC_FILL;
export const ARC_DEG = 360 * ARC_FILL;
export const ROTATION = 90 - 360 * ARC_GAP + (360 * ARC_GAP) / 2;
export const ROTATION_RAD = (ROTATION * Math.PI) / 180;

export const CURSOR_WIDTH = 40;
export const CURSOR_RADIUS = CURSOR_WIDTH / 2;

export const STROKE_WIDTH = 8;
export const INNER_STROKE_WIDTH = STROKE_WIDTH * 0.32;

export const GLOW_BLEED = 40;
