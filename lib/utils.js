function printCamera(camera, stats) {

    stats.innerHTML =
        `Direction vector:<br>
        ${vectorPrint(camera.getWorldDirection())}<br>
        Position vector:<br>
        ${vectorPrint(camera.getWorldPosition())}<br>
        `
}

function vectorPrint(vector, n) {
    return `* x = ${vector.x.toFixed(n)}<br>
        * y =  ${vector.y.toFixed(n)}<br>
        * z =  ${vector.z.toFixed(n)}<br>`
}