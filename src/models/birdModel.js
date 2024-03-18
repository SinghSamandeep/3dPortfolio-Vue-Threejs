import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import dragonModelPath from "../assets/adult_dragon.glb";
import * as THREE from "three";

export function dragonModel(scene) {
  return new Promise((resolve, reject) => {
    let dragonModel;
    let mixer;
    const clock = new THREE.Clock();
    let isTurning = false;
    const loader = new GLTFLoader();
    loader.load(
      dragonModelPath,
      (gltf) => {
        dragonModel = gltf.scene;
        // dragonModel.position.set(40, 0, 70);
        dragonModel.scale.set(30, 30, 30);
        scene.add(dragonModel);
        mixer = new THREE.AnimationMixer(dragonModel);
        const action = mixer.clipAction(gltf.animations[0]); // Replace 0 with the index of "Take 001"
        action.play();
        resolve(dragonModel);
      },
      undefined,
      (error) => {
        console.error("An error happened loading the bird model:", error);
      }
    );

    function animate() {
      requestAnimationFrame(animate);

      // Update mixer for animation progression
      if (mixer) {
        const delta = clock.getDelta();
        mixer.update(delta);
      }
    }

    animate();
  });
}
