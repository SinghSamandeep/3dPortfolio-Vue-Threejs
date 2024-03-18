import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import wizardModelPath from "../assets/byron_wizard_win.glb";
import * as THREE from "three";
import { Raycaster, Vector2 } from "three";

export function wizardModel(scene, camera) {
  return new Promise((resolve, reject) => {
    let wizardModel;
    let mixer;
    const clock = new THREE.Clock();
    let animations;
    let stopAnimation = true;
    const raycaster = new Raycaster();
    const pointer = new Vector2();
    const loader = new GLTFLoader();

    loader.load(
      wizardModelPath,
      (gltf) => {
        wizardModel = gltf.scene;
        wizardModel.scale.set(12, 12, 12);
        wizardModel.traverse(function (object) {
          if (object.isMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
          }
        });
        scene.add(wizardModel);
        mixer = new THREE.AnimationMixer(wizardModel);
        animations = gltf.animations;
        resolve(wizardModel);
      },
      undefined,
      (error) => {
        console.error("An error happened loading the model:", error);
      }
    );

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);
    }
    animate();

    function onClick(event) {
      event.preventDefault();
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(wizardModel.children, true);
      if (intersects.length > 0) {
        console.log("Clicked on wizard");
        stopAnimation = false;
        // Play the animation
        if (mixer && animations && !stopAnimation) {
          const action = mixer.clipAction(animations[0]);
          action.reset();
          action.loop = THREE.LoopOnce;
          action.play();
        }
      }
    }
    window.addEventListener("click", onClick);
  });
}
