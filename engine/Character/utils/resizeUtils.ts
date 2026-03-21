import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setCharTimeline, setAllTimeline } from "../../animations/GsapScroll";

/**
 * Returns the correct camera zoom for the current viewport aspect ratio.
 *
 * WHY the previous value (zoom = aspect ≈ 0.46) was still wrong
 * ─────────────────────────────────────────────────────────────────
 * THREE.js PerspectiveCamera uses a VERTICAL FOV (14.5°). The horizontal
 * FOV is derived: horizontalFOV = verticalFOV × aspect.
 *
 * On a portrait phone (aspect ≈ 0.46):
 *   horizontal FOV = 14.5° × 0.46 = 6.67°   ← extremely narrow
 *
 * At camera Z = 24.7 the visible half-width is:
 *   tan(FOV/2) × aspect × depth / zoom
 *   = tan(7.25°) × 0.46 × 24.7 / zoom
 *   = 1.449 / zoom  units
 *
 * The character's arms span roughly ±4 units from center (≈ 8 units total).
 * For the arms to stay inside the frustum:
 *   2 × (1.449 / zoom) ≥ 8  →  zoom ≤ 0.36
 *
 * zoom = aspect (0.46) gives frustum width ≈ 6.3 units → arms still clip.
 * zoom = aspect × 0.75 (0.345) gives frustum width ≈ 8.4 units → arms fit.
 *
 * Zoom table
 * ──────────────────────────────────────────────────────
 *  aspect  │ zoom    │ frustum width   │ arm fit?
 * ─────────┼─────────┼─────────────────┼──────────────
 *  0.46    │  0.345  │   8.4 units     │ ✓
 *  0.56    │  0.42   │   6.9 units     │ ✓
 *  0.75    │  0.56   │   5.2 units     │ ✓
 *  1.0+    │  1.1    │   2.6 units*    │ ✓ (landscape OK)
 * ──────────────────────────────────────────────────────
 */
export function getResponsiveZoom(aspect: number): number {
  if (aspect >= 1) return 1.1;
  // Pull the camera back proportionally on portrait screens.
  // aspect × 0.75 ensures the horizontal frustum is wide enough for the
  // character's outstretched arms at every portrait aspect ratio.
  // Floor of 0.28 covers very narrow edge cases (ultra-tall phones).
  return Math.max(0.28, aspect * 0.75);
}

export default function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: React.RefObject<HTMLDivElement | null>,
  character: THREE.Object3D
) {
  if (!canvasDiv.current) return;
  const canvas3d = canvasDiv.current.getBoundingClientRect();
  const width = canvas3d.width;
  const height = canvas3d.height;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  // Recalculate zoom every resize (handles portrait↔landscape flips on mobile)
  camera.zoom = getResponsiveZoom(camera.aspect);
  camera.updateProjectionMatrix();
  const workTrigger = ScrollTrigger.getById("work");
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger !== workTrigger) trigger.kill();
  });
  setCharTimeline(character, camera);
  setAllTimeline();
}
