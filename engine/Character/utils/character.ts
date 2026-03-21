import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { decryptFile } from "./decrypt";

// setCharTimeline and setAllTimeline are intentionally NOT called here.
// They must run after progress.loaded() resolves inside Scene.tsx so that
// ScrollTrigger timelines are never created before the loading gate closes.

const setCharacter = () => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>((resolve, reject) => {
      // Env-var guard: warn but do not throw — a throw here would reject the
      // promise and (since Scene.tsx chains .then without .catch) silently
      // freeze the loading bar at 91-92% forever.
      const modelKey = process.env.NEXT_PUBLIC_MODEL_KEY;
      if (!modelKey) {
        console.error(
          "[Character] NEXT_PUBLIC_MODEL_KEY is not set. " +
            "Restart the dev server after creating .env.local."
        );
        resolve(null);
        return;
      }

      decryptFile("/models/character.enc?v=2", modelKey)
        .then((encryptedBlob) => {
          const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

          loader.load(
            blobUrl,
            (gltf) => {
              const character = gltf.scene;

              // Material customisation — synchronous, no awaiting needed
              character.traverse((child: THREE.Object3D) => {
                if ((child as THREE.Mesh).isMesh) {
                  const mesh = child as THREE.Mesh;
                  if (mesh.material) {
                    if (mesh.name === "BODY.SHIRT") {
                      const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                      newMat.color = new THREE.Color("#8B4513");
                      mesh.material = newMat;
                    } else if (mesh.name === "Pant") {
                      const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                      newMat.color = new THREE.Color("#000000");
                      mesh.material = newMat;
                    }
                  }
                  mesh.castShadow = true;
                  mesh.receiveShadow = true;
                  mesh.frustumCulled = true;
                }
              });

              character.getObjectByName("footR")!.position.y = 3.36;
              character.getObjectByName("footL")!.position.y = 3.36;

              dracoLoader.dispose();

              // CRITICAL: resolve immediately after parsing.
              // compileAsync (shader compilation) is intentionally moved to
              // Scene.tsx where it runs in the background AFTER progress.loaded()
              // fires. This unblocks the 91→100% progress fill.
              resolve(gltf);
            },
            undefined,
            (error) => {
              console.error("Error loading GLTF model:", error);
              reject(error);
            }
          );
        })
        .catch((err) => {
          console.error("[Character] Decrypt / load failed:", err);
          reject(err);
        });
    });
  };

  return { loadCharacter };
};

export default setCharacter;
