import *  as THREE from 'three';

export class TimeProperties {
    timePaused: boolean
    camera: THREE.Camera

    constructor(timePaused: boolean, camera: THREE.Camera) {
        this.timePaused = timePaused;
        this.camera = camera;
    }
}

export function timeControlKeyListener(properties: TimeProperties) {
    document.body.addEventListener('keydown', function (event) {
        console.log(`key press: ${event.key}:\t${event.code}`);
        if (event.code == 'Space') {
            properties.timePaused = !properties.timePaused;
        }
        if (event.key == '?') {
            console.log(`camera position: ${properties.camera.position.x}, ${properties.camera.position.y}, ${properties.camera.position.z}`);
        }
    });
}