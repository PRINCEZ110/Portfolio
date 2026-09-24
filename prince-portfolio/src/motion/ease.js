/* Shared motion language — one easing family, three speeds.
   MICRO: hovers, toggles, micro-interactions (fast, snappy)
   UI:    panel opens, menus, reveals (medium, smooth)
   STAGE: pinned scenes, hero choreography (slow, cinematic) */
export const EASE = [0.16, 1, 0.3, 1];

export const DURATION = {
  micro: 0.3,
  ui: 0.7,
  stage: 1.1,
};

export const LENIS_EASING = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
