import * as THREE from 'https://esm.sh/three';
import { GLTFLoader } from 'https://esm.sh/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://esm.sh/three/examples/jsm/controls/OrbitControls.js';

const canvas = document.getElementById("webgl");

const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xD8D8D8);

const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 1.5, 8);

const loader = new GLTFLoader().setPath('2020_bmw_m8_coupe/');
loader.load('scene.gltf', (gltf) => {
    const mesh = gltf.scene;
    mesh.traverse((child) => {
        if (child.isMesh && child.material){
            const mat = child.material;
            mat.metalness = 1;
            mat.roughness = 0.6;
            mat.envMapIntensity = 2;
        }
    });
    mesh.position.y = -0.6;
    mesh.scale.set(100, 100, 100);
    scene.add(mesh);
});

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;

const intensity = 2;
const lightDistance = 3;

const frontLight = new THREE.DirectionalLight(0xffffff, intensity);
frontLight.position.set(0, 0, lightDistance);
scene.add(frontLight);

const backLight = new THREE.DirectionalLight(0xffffff, intensity);
backLight.position.set(0, 0, -lightDistance);
scene.add(backLight);

const rightLight = new THREE.DirectionalLight(0xffffff, intensity);
rightLight.position.set(lightDistance, 0, 0);
scene.add(rightLight);

const leftLight = new THREE.DirectionalLight(0xffffff, intensity);
leftLight.position.set(-lightDistance, 0, 0);
scene.add(leftLight);

const topLight = new THREE.DirectionalLight(0xffffff, intensity);
topLight.position.set(0, lightDistance, 0);
scene.add(topLight);

const bottomLight = new THREE.DirectionalLight(0xffffff, intensity);
bottomLight.position.set(0, -lightDistance, 0);
scene.add(bottomLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();