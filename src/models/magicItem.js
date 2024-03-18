import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import magicVasePath from "../assets/Magic Vase.glb";
import magicCauldronPath from "../assets/Magic cauldron.glb";
import chestPath from "../assets/Chest.glb";
import grassPath from "../assets/Grass.glb";

import { ref } from "vue";
import * as THREE from "three";

export function magicVaseModel(scene) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      magicVasePath,
      (gltf) => {
        const magicVaseModel = gltf.scene;
        magicVaseModel.traverse(function (object) {
          if (object.isMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
          }
        });
        magicVaseModel.rotation.y = (2 * Math.PI) / 2;
        magicVaseModel.scale.set(120, 120, 120);
        scene.add(magicVaseModel);
        resolve(magicVaseModel);
      },
      undefined,
      (error) => {
        console.error("An error happened loading the table model:", error);
      }
    );
  });
}
export function magicCauldronModel(scene) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      magicCauldronPath,
      (gltf) => {
        const magicCauldronModel = gltf.scene;
        magicCauldronModel.scale.set(60, 60, 60);
        scene.add(magicCauldronModel);
        resolve(magicCauldronModel);
      },
      undefined,
      (error) => {
        console.error("An error happened loading the table model:", error);
      }
    );
  });
}

export function chestModel(scene) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      chestPath,
      (gltf) => {
        const chestModel = gltf.scene;
        chestModel.scale.set(600, 600, 600);
        scene.add(chestModel);
        resolve(chestModel);
      },
      undefined,
      (error) => {
        console.error("An error happened loading the table model:", error);
      }
    );
  });
}
export function grassModel(scene) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      grassPath,
      (gltf) => {
        const grassModel = gltf.scene;
        grassModel.scale.set(3, 3, 3);
        scene.add(grassModel);

        let clock = new THREE.Clock();

        function animate() {
          requestAnimationFrame(animate);
          let time = clock.getElapsedTime();
          let frequency = 0.2;
          let amplitude = 0.1;
          let windStrength = Math.cos(time * frequency) * amplitude;

          grassModel.traverse((child) => {
            if (child.isMesh) {
              child.rotation.y = windStrength;
            }
          });
        }

        animate();
        resolve(grassModel);
      },
      undefined,
      (error) => {
        console.error("An error happened loading the grass model:", error);
        reject(error);
      }
    );
  });
}
