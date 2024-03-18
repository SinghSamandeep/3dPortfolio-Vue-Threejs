import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import ghostModelPath from "../assets/Dragon Evolved.glb";
import * as THREE from "three";
import { Raycaster, Vector2 } from "three";

export function ghostModel(scene, camera, islandTopY) {
  return new Promise((resolve, reject) => {
    let ghostModel;
    let mixer;
    const clock = new THREE.Clock();
    let animations;
    let stopAnimation = true;
    const raycaster = new Raycaster();
    const pointer = new Vector2();
    const loader = new GLTFLoader();

    loader.load(
      ghostModelPath,
      (gltf) => {
        ghostModel = gltf.scene;
        ghostModel.scale.set(30, 30, 30);
        ghostModel.position.set(
          (Math.random() - 0.5) * 500,
          islandTopY + 200 + Math.random() * 100,
          (Math.random() - 0.5) * 500
        );
        scene.add(ghostModel);
        mixer = new THREE.AnimationMixer(ghostModel);
        animations = gltf.animations;

        const defaultAction = mixer.clipAction(animations[1]);
        defaultAction.play();
        resolve(ghostModel);
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
      const intersects = raycaster.intersectObjects(ghostModel.children, true);
      if (intersects.length > 0) {
        console.log("Clicked on Ghost");
        stopAnimation = false;
        // Play the animation
        if (mixer && animations && !stopAnimation) {
          const randomIndex = Math.floor(Math.random() * animations.length);

          // Retrieve and play the animation at the randomly chosen index
          const action = mixer.clipAction(animations[randomIndex]);
          action.reset();
          action.loop = THREE.LoopOnce;
          action.play();
        }
      }
    }
    window.addEventListener("click", onClick);
  });
}
