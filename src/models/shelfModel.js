import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import shelfPath from "../assets/Bookcase with Books.glb";
import bookShelfPath from "../assets/Bookshelf.glb";

import { ref } from "vue";
import * as THREE from "three";

export function shelfModel(scene) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      shelfPath,
      (gltf) => {
        const shelfModel = gltf.scene;
        shelfModel.traverse(function (object) {
          if (object.isMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
          }
        });
        shelfModel.position.set(50, 0, 0);
        shelfModel.scale.set(90, 45, 90);
        scene.add(shelfModel);
        resolve(shelfModel);
      },
      undefined,
      (error) => {
        console.error("An error happened loading the table model:", error);
      }
    );
  });
}

export function bookShelfModel(scene) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      bookShelfPath,
      (gltf) => {
        const bookShelfModel = gltf.scene;
        bookShelfModel.traverse(function (object) {
          if (object.isMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
          }
        });
        bookShelfModel.position.set(50, 0, 0);
        bookShelfModel.scale.set(120, 60, 120);
        scene.add(bookShelfModel);
        resolve(bookShelfModel);
      },
      undefined,
      (error) => {
        console.error("An error happened loading the table model:", error);
      }
    );
  });
}
