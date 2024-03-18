import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import stackCauldronPath from "../assets/Stacked Cauldrons.glb";
import { ref } from "vue";
import * as THREE from "three";

export function stachCauldronModel(scene) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      stackCauldronPath,
      (gltf) => {
        const stachCauldronModel = gltf.scene;
        stachCauldronModel.scale.set(200, 200, 200);
        scene.add(stachCauldronModel);

        resolve(stachCauldronModel);
      },
      undefined,
      (error) => {
        console.error("An error happened loading the table model:", error);
      }
    );
  });
}
