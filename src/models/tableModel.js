import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import tableModelPath from "../assets/wizard table.glb";
import { ref } from "vue";
import * as THREE from "three";

export function tableModel(scene) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      tableModelPath,
      (gltf) => {
        const tableModel = gltf.scene;
        tableModel.scale.set(60, 60, 60);
        scene.add(tableModel);
        resolve(tableModel);
      },
      undefined,
      (error) => {
        console.error("An error happened loading the table model:", error);
      }
    );
  });
}
