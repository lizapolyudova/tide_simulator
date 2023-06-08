import * as THREE from 'three';

export function setupStats() {
    let stats = document.createElement('div');
    stats.className = "stats"
    stats.innerHTML = "some stats here"
    document.body.appendChild(stats);
    return stats;
}

export function printCamera(camera: THREE.Camera, stats: Element) {
    var x = new THREE.Vector3()
    stats.innerHTML =
        `Direction vector:<br>
        ${vectorPrint(camera.getWorldDirection(x), 3)}<br>
        Position vector:<br>
        ${vectorPrint(camera.getWorldPosition(x), 3)}<br>
        `
}

function vectorPrint(vector: THREE.Vector3, n: number) {
    return `* x = ${vector.x.toFixed(n)}<br>
        * y =  ${vector.y.toFixed(n)}<br>
        * z =  ${vector.z.toFixed(n)}<br>`
}