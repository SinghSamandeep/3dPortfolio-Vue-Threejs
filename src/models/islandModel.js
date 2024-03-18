import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import floatingCityPath from "../assets/Floating City.glb";
import campingSpotPath from "../assets/wizard_tower_animated.glb";
import { Raycaster, Vector2 } from "three";

import * as THREE from "three";

export function floatingCity(scene, camera) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    let isClicked = false;
    let clickTimeout;
    const raycaster = new Raycaster();
    const pointer = new Vector2();
    loader.load(
      floatingCityPath,
      (gltf) => {
        const floatingCityModel = gltf.scene;
        floatingCityModel.traverse(function (object) {
          if (object.isMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
          }
        });
        floatingCityModel.scale.set(400, 400, 400);
        scene.add(floatingCityModel);

        function animate() {
          requestAnimationFrame(animate);
          floatingCityModel.rotation.y += isClicked ? 0.05 : 0.01;
        }
        animate();
        function onClick(event) {
          event.preventDefault();
          pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
          pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
          raycaster.setFromCamera(pointer, camera);
          const intersects = raycaster.intersectObjects(
            floatingCityModel.children,
            true
          );
          if (intersects.length > 0) {
            isClicked = true;

            clearTimeout(clickTimeout);
            clickTimeout = setTimeout(() => {
              isClicked = false;
            }, 2000);
          }
        }
        window.addEventListener("click", onClick);

        resolve(floatingCityModel);
      },
      undefined,
      (error) => {
        reject(error);
        console.error(
          "An error happened loading the floating city model:",
          error
        );
      }
    );
  });
}
export function animatedWizardTower(scene, camera) {
  return new Promise((resolve, reject) => {
    let animatedWizardTower;
    let mixer;
    const clock = new THREE.Clock();
    let animations;
    let stopAnimation = true;
    let defaultAction;
    const raycaster = new Raycaster();
    const pointer = new Vector2();
    const loader = new GLTFLoader();
    loader.load(
      campingSpotPath,
      (gltf) => {
        animatedWizardTower = gltf.scene;
        animatedWizardTower.traverse(function (object) {
          if (object.isMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
          }
        });
        animatedWizardTower.scale.set(50, 50, 50);
        scene.add(animatedWizardTower);
        mixer = new THREE.AnimationMixer(animatedWizardTower);
        animations = gltf.animations;
        defaultAction = mixer.clipAction(animations[0]);
        defaultAction.play();
        resolve(animatedWizardTower);
      },
      undefined,
      (error) => {
        console.error("An error happened loading the table model:", error);
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
      const intersects = raycaster.intersectObjects(
        animatedWizardTower.children,
        true
      );
      if (intersects.length > 0) {
        console.log("Clicked on wizard");
        stopAnimation = false;
        // Play the animation
        if (mixer && animations && !stopAnimation) {
          const action = mixer.clipAction(animations[0]);
          action.reset();
          action.play();
        }
      }
    }
    window.addEventListener("click", onClick);
  });
}
