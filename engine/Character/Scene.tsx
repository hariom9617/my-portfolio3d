"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "@/components/ui/loading/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "@/components/ui/loading/Loading";
import {
  setCharTimeline,
  setAllTimeline,
} from "@/engine/animations/GsapScroll";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  const [character, setChar] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    // Collect teardown work registered inside the deferred init block.
    // useEffect's return can only run the teardown captured here, since the
    // actual setup runs inside a setTimeout (different call-stack frame).
    let teardown: (() => void) | undefined;

    // Defer all WebGL initialisation by one task so React completes its first
    // commit/paint before the GPU context is created. The loading screen is
    // visible immediately instead of appearing 300-500ms late.
    const initTimer = setTimeout(() => {
      if (!canvasDiv.current) return;

      const rect = canvasDiv.current.getBoundingClientRect();
      const aspect = rect.width / rect.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      // Cap at 2 — a ratio of 3-4× triples render work with no visible benefit
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: THREE.Object3D | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();
      const light = setLighting(scene);
      const progress = setProgress((value) => setLoading(value));

      // setCharacter no longer needs renderer/camera — compileAsync moved here
      const { loadCharacter } = setCharacter();

      loadCharacter()
        .then((gltf) => {
          if (!gltf) {
            // env-var missing or model resolved null — still complete loading
            // so the site doesn't freeze on the loading screen
            progress.loaded();
            return;
          }

          const animations = setAnimations(gltf);
          hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
          mixer = animations.mixer;
          const character = gltf.scene;
          setChar(character);
          scene.add(character);
          headBone = character.getObjectByName("spine006") || null;
          screenLight = character.getObjectByName("screenlight") || null;

          // Kick off shader compilation in the background.
          // It no longer blocks progress.loaded() — the bar fills 91→100%
          // immediately, and shaders are ready by the time the intro animation
          // starts (2500ms later).
          renderer.compileAsync(character, camera, scene).catch(() => {
            // Non-fatal: the scene still renders; first frame may hitch briefly
          });

          progress.loaded().then(() => {
            setCharTimeline(character, camera);
            setAllTimeline();

            setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });

          // Store the handler reference so the cleanup can remove the exact same fn
          const onResize = () => handleResize(renderer, camera, canvasDiv, character);
          window.addEventListener("resize", onResize);
          (renderer as THREE.WebGLRenderer & { __onResize?: () => void }).__onResize = onResize;
        })
        .catch((err) => {
          // Model load failed (network error, decrypt error, etc.)
          // Force loading to complete so the site is still usable without the 3-D character
          console.error("[Scene] loadCharacter failed:", err);
          progress.loaded();
        });

      let mouse = { x: 0, y: 0 };
      let interpolation = { x: 0.1, y: 0.2 };

      // Named handlers so cleanup can remove the exact same references
      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: ReturnType<typeof setTimeout> | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y })),
          );
        }, 200);
      };
      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      // Use named handlers directly — no wrapping arrow fn (keeps reference stable)
      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }

      const animate = () => {
        requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp,
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) mixer.update(delta);
        renderer.render(scene, camera);
      };
      animate();

      // Register teardown so the useEffect cleanup (below) can call it
      teardown = () => {
        clearTimeout(debounce);

        // Dispose all Three.js GPU resources to prevent memory leaks
        scene.traverse((obj) => {
          const mesh = obj as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.geometry?.dispose();
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => m.dispose());
            } else {
              (mesh.material as THREE.Material)?.dispose();
            }
          }
        });
        scene.clear();
        renderer.dispose();

        // Remove the exact same resize handler reference that was registered
        const storedResize = (renderer as THREE.WebGLRenderer & { __onResize?: () => void }).__onResize;
        if (storedResize) window.removeEventListener("resize", storedResize);

        document.removeEventListener("mousemove", onMouseMove);
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
        if (canvasDiv.current) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
      };
    }, 0);

    return () => {
      clearTimeout(initTimer); // cancels the deferred init if component unmounts before it fires
      teardown?.();            // runs Three.js cleanup if init already ran
    };
  }, []);

  return (
    // character-model is the GSAP translation target for x shifts between sections.
    // It wraps the canvas so GSAP can move it as a single unit without touching
    // renderer internals or camera state.
    <div className="character-model fixed inset-0 z-[2] pointer-events-none flex items-end justify-center">
      <div ref={canvasDiv} className="relative w-full max-w-[1920px] h-[100vh]">
        <div className="absolute left-1/2 bottom-[20%] w-[400px] h-[400px] -translate-x-1/2 rounded-full bg-cyan-400 blur-[60px] opacity-40 z-[-1]" />
        <div
          ref={hoverDivRef}
          className="absolute left-1/2 top-1/2 w-[280px] h-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
      </div>
    </div>
  );
};

export default Scene;