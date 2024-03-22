import * as THREE from 'three';

function createCube() {
    const geometry = new THREE.CylinderGeometry(2, 2, 2);

// create a default (white) Basic material
    const material = new THREE.MeshStandardMaterial();

// create a Mesh containing the geometry and material
    return new THREE.Mesh(geometry, material);

}

export {createCube}