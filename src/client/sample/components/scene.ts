import {Color, Scene} from 'three';

function createScene(): THREE.Scene {
    const scene = new Scene();

    scene.background = new Color('purple');
    return scene;
}

export {createScene};