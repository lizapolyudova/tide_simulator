import * as THREE from 'three';

function createLight(scene: THREE.Scene) {
    // scene.add(new THREE.AmbientLight(0xdddd00));
    scene.add(new THREE.DirectionalLight(0xffffff, 0.5));
}

export {createLight}