<template>
    <div v-show="isLoading" class="loading-overlay">
        <div class="loader">
            <img src="../assets/magic_circle.png" class="magic-circle" alt="Magic Circle" />
            <p>Loading enchantments...</p>
        </div>
    </div>
    <div v-show="showWelcomeMessage" @click="closeMessageButton">
        <WelcomeMessage />
    </div>
    <div v-show="!isLoading">
        <div ref="rendererContainer" @mousedown="onDocumentMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp"
            @wheel="onMouseWheel" style="width: 100%; height: 100vh;"></div>
        <div v-if="isOverlayVisible" class="overlay">
            <component :is="currentComponent" />
            <button @click="closeOverlay">Close</button>
        </div>
        <div v-if="isScrollLabelVisible" ref="scroll1Label" class="scroll-label" v-show="showScroll1Label">{{
        scroll1LabelContent }}
        </div>
        <div v-if="isScrollLabelVisible" ref="scroll2Label" class="scroll-label" v-show="showScroll2Label">{{
        scroll2LabelContent }}
        </div>
        <div v-if="isScrollLabelVisible" ref="scroll3Label" class="scroll-label" v-show="showScroll3Label">{{
        scroll3LabelContent }}
        </div>
    </div>

</template>
<script setup>
import { onMounted, ref, onUnmounted, reactive, watchEffect } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import islandPath from "../assets/Floating_Island.glb";
import AboutMe from '../pages/AboutMe.vue';
import ContactMe from '../pages/ContactMe.vue';
import ProjectAndExperience from '../pages/ProjectAndExperience.vue';
import WelcomeMessage from '../pages/WelcomeMessage.vue';
import { initializeScene } from '../utils/sceneInit';

const showWelcomeMessage = ref(false);
const isOverlayVisible = ref(false);
const currentComponent = ref('');
const isLoading = ref(true);  // Add isLoading to track loading state
const scroll1Label = ref(null);
const scroll2Label = ref(null);
const scroll3Label = ref(null);
const showScroll1Label = ref(false);
const showScroll2Label = ref(false);
const showScroll3Label = ref(false);
const scroll1LabelContent = ref('About Me');
const scroll2LabelContent = ref('Contact Me');
const scroll3LabelContent = ref('Experience');
const rendererContainer = ref(null);
const isScrollLabelVisible = ref(false);
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true; // Enable shadows in the renderer
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
let island;
let islandTopY;
let controls;
let models;
onMounted(async () => {
    initScene();
    console.log(window.innerWidth, window.innerHeight);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 450, 200);
    controls.maxDistance = 1400;
    camera.position.set(-10, 900, 900);
    controls.update();


    island = await loadIslandModel();
    const islandBox = new THREE.Box3().setFromObject(island);
    islandTopY = islandBox.max.y;

    models = await initializeScene(scene, camera, islandTopY);
    isLoading.value = false;
    showWelcomeMessage.value = true;
    animate();

    window.addEventListener('resize', onWindowResize, false);

});

onUnmounted(() => {
    window.removeEventListener('resize', onWindowResize, false);
});
function closeMessageButton() {
    showWelcomeMessage.value = false;
    isScrollLabelVisible.value = true;
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}
function initScene() {
    const nearPlane = 1;
    const farPlane = 10000;

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, nearPlane, farPlane);
    camera.position.set(0, 250, 520);
    // Example positions, adjust as needed
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererContainer.value.appendChild(renderer.domElement);
    setupLights();

}

function setupLights() {
    // Hemisphere light for overall ambient light with a sky and ground color
    let hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 200, 0);
    scene.add(hemiLight);

    // Directional light setup for shadows
    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(200, 200, 200);
    directionalLight.target.position.set(0, 0, 0);
    scene.add(directionalLight);
    directionalLight.castShadow = true;


    let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);


    const d = 350;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 1000;

    let pointLight = new THREE.PointLight(0xffffff, 1.5, 800);
    pointLight.position.set(0, 150, 0);
    pointLight.castShadow = true;
    pointLight.shadow.camera.near = 0.1;
    pointLight.shadow.camera.far = 100;
    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    scene.add(pointLight);
}

function animate() {
    requestAnimationFrame(animate);

    if (models && models.scroll && scroll1Label.value) {
        updateScrollLabelPosition(models.scroll, scroll1Label, showScroll1Label);
    }

    if (models && models.scroll2 && scroll2Label.value) {
        updateScrollLabelPosition(models.scroll2, scroll2Label, showScroll2Label);
    }

    if (models && models.scroll3 && scroll3Label.value) {
        updateScrollLabelPosition(models.scroll3, scroll3Label, showScroll3Label);
    }
    renderer.render(scene, camera);
}
function updateScrollLabelPosition(scrollModel, labelRef, showLabel) {
    if (scrollModel && labelRef.value) {
        const vector = new THREE.Vector3();
        scrollModel.getWorldPosition(vector);
        vector.project(camera);

        const x = (vector.x * .5 + .5) * renderer.domElement.clientWidth;
        const y = (-(vector.y * .5) + .5) * renderer.domElement.clientHeight;

        labelRef.value.style.top = `${y}px`;
        labelRef.value.style.left = `${x}px`;

        showLabel.value = true;
    } else {
        showLabel.value = false;
    }
}

function onScrollClick(event) {

    if (isOverlayVisible.value || showWelcomeMessage.value) {
        event.preventDefault();
        event.stopPropagation();
        return;
    }
    event.preventDefault();
    let mouse = new THREE.Vector2();
    let raycaster = new THREE.Raycaster();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects([models.scroll, models.scroll2, models.scroll3]);

    if (intersects.length > 0) {
        let intersected = intersects[0].object;
        while (intersected && intersected !== models.scroll && intersected !== models.scroll2 && intersected !== models.scroll3 && intersected.parent) {
            intersected = intersected.parent;
        }
        console.log(intersected);
        if (intersected === models.scroll) {
            currentComponent.value = AboutMe;
            isOverlayVisible.value = true
            isScrollLabelVisible.value = false;
        } else if (intersected === models.scroll2) {
            currentComponent.value = ContactMe;
            isOverlayVisible.value = true;
            isScrollLabelVisible.value = false;
        } else if (intersected === models.scroll3) {
            currentComponent.value = ProjectAndExperience;
            isOverlayVisible.value = true;
            isScrollLabelVisible.value = false;
        }

        console.log("Overlay visibility:", isOverlayVisible.value);
    }
}

function closeOverlay() {
    isOverlayVisible.value = false;
    camera.position.set(-10, 900, 900);
    controls.update();
    isScrollLabelVisible.value = true;
    // Re-enable controls
}

function loadIslandModel() {
    const loader = new GLTFLoader();
    return new Promise((resolve) => {
        loader.load(
            islandPath,
            (gltf) => {
                island = gltf.scene;
                island.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.receiveShadow = true;
                    }
                });
                island.position.set(0, -400, 0);
                island.scale.set(800, 800, 800);
                island.rotation.y = Math.PI / 2
                scene.add(island);
                resolve(island);
            },
            undefined,
            (error) => {
                console.error("An error happened loading the island model:", error);
            }
        );
    });
}

window.addEventListener('mousedown', onScrollClick, false);
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Yuji+Boku&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Tangerine:wght@700&display=swap');

.scroll-label {
    position: absolute;
    background: rgba(28, 20, 64, 0.9);
    color: #f8e9a1;
    padding: 14px 18px;
    border-radius: 10px;
    pointer-events: none;
    font-family: 'Tangerine', cursive;
    font-size: 1.5em;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
    border: 1px solid #897bac;
}

.scroll-label * {
    pointer-events: auto;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

.overlay-content {
    position: relative;
    max-width: 600px;
    padding: 40px;
    background: white;
    border-radius: 10px;
    text-align: center;
    color: black;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px 10px;
    cursor: pointer;
    background-color: #f44336;
    border: none;
    color: white;
    border-radius: 5px;
}

.close-button:hover {
    background-color: #d32f2f;
}


@media (orientation: portrait) {

    #info,
    .close-button {
        /* Adjustments for portrait mode */
        font-size: clamp(1.5em, 3vw, 2.5em);
    }
}

@media (max-width: 600px) {

    #info,
    .close-button {
        /* Adjustments for small screens */
        font-size: clamp(1em, 4vw, 1.5em);
    }
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
    color: #fff;
}

.loader {
    text-align: center;
}

.loader p {
    color: #f8e9a1;
    font-family: 'Tangerine', cursive;
    font-size: 2em;
    margin-top: 20px;
}

.magic-circle {
    width: 150px;
    height: 150px;
    animation: spin 5s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>