import * as THREE from 'three';
import {createCamera} from './components/camera';
import {createCube} from './components/cube';
import {createScene} from './components/scene';
import {createLight} from './components/light';

import {createRenderer} from './systems/renderer';
import {Resizer} from './systems/Resizer';
import {WebGLRenderer} from "three/src/renderers/WebGLRenderer";

class World {
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;

    constructor(container: Element) {
        this.camera = createCamera(container);
        this.scene = createScene();
        this.renderer = createRenderer();
        container.append(this.renderer.domElement);

        const cube1 = createCube();
        const cube2 = createCube();

        cube1.position.set(3, 0, -2);
        this.scene.add(cube2);
        this.scene.add(cube1);
        cube2.position.set(2, 2, 2);
        this.scene.add(cube1);

        createLight(this.scene);

        const resizer = new Resizer(container, this.camera, this.renderer);
    }

// 2. Render the scene
    render() {
        this.renderer.render(this.scene, this.camera);
    }
}

export {World};