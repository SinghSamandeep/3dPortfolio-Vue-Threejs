import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import scrollPath from "../assets/Scroll.glb";
import magicBookPath from "../assets/demon_book.glb";

export function bookShelfModel(scene) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      magicBookPath,
      (gltf) => {
        const bookShelfModel = gltf.scene;
        bookShelfModel.traverse(function (object) {
          if (object.isMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
          }
        });
        bookShelfModel.scale.set(60, 30, 60);
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
export function scrollModel(scene) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      scrollPath,
      (gltf) => {
        const scrollModel = gltf.scene;
        scrollModel.traverse(function (object) {
          if (object.isMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
          }
        });
        scrollModel.scale.set(80, 60, 60);
        scene.add(scrollModel);
        resolve(scrollModel);
      },
      undefined,
      (error) => {
        console.error("An error happened loading the table model:", error);
      }
    );
  });
}
