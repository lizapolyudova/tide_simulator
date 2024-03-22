import {WebGLRenderer} from 'three';

function createRenderer(): THREE.WebGLRenderer {
    const renderer = new WebGLRenderer();
    renderer.physicallyCorrectLights = true;
    return renderer;
}

export {createRenderer};