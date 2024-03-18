import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import skyPath from "../assets/sky.glb";

export function skyModel(scene) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      skyPath,
      (gltf) => {
        const skyModel = gltf.scene;
        skyModel.position.set(0, 0, 0);
        skyModel.scale.set(5, 5, 5);
        scene.add(skyModel);
        const skyRotationSpeed = 0.001;
        function animateSky() {
          requestAnimationFrame(animateSky);
          skyModel.rotation.y += skyRotationSpeed;
        }
        animateSky();

        resolve(skyModel);
      },
      undefined,
      (error) => {
        console.error("An error happened loading the sky model:", error);
        reject(error);
      }
    );
  });
}
