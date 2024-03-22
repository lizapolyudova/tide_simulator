//Moon
import * as THREE from "three";
import * as params from "./params";
import {moon_radius, sun_radius} from "./params";

export var enableDebugAxis = true;

// Sun
var sunGeometry = new THREE.SphereGeometry(sun_radius, 50, 50);
var sunMaterial = new THREE.MeshPhongMaterial({
    color: 0xddaa22,
    specular: 0xbbbbbb,
    emissive: 0xffffaa,
    shininess: 1
});
var sun = new THREE.Mesh(sunGeometry, sunMaterial);

function generateTexture() {
    var size = 512;

    // create canvas
    let canvas2 = document.createElement("canvas");
    canvas2.width = size;
    canvas2.height = size;

    var context = canvas2.getContext("2d");
    if (context === null) {
        return;
    }
    // draw gradient
    context.rect(0, 0, size, size);
    var gradient = context.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, "#2c7c2c"); // light blue
    gradient.addColorStop(1, "#0077ff"); // dark red
    context.fillStyle = gradient;
    context.fill();

    return canvas2;
}

var texture = new THREE.Texture(generateTexture());
texture.needsUpdate = true; // important!
var earthGeometry = new THREE.SphereGeometry(params.earth_radius, 50, 50);
var earthMaterial = new THREE.MeshPhongMaterial({
    map: texture,
    shininess: 1,
});

var atmosphereMaterial = new THREE.MeshStandardMaterial({
    opacity: 0.4,
    transparent: true,
    color: 0x0099dd, // blue
});
atmosphereMaterial.side = THREE.BackSide;
var atmosphereGeometry = new THREE.SphereGeometry(params.earth_radius * 1.4, 50, 50);
var atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);


var moonGeometry = new THREE.SphereGeometry(moon_radius, 50, 50);
var moonMaterial = new THREE.MeshPhongMaterial({
    color: 0x0000ff,
    emissiveIntensity: .005,
    emissive: 0xfffff,
    shininess: 1,
});

var moon = new THREE.Mesh(moonGeometry, moonMaterial);
var earth = new THREE.Mesh(earthGeometry, earthMaterial);

if (enableDebugAxis) {
    earth.add(new THREE.AxesHelper(5));
    moon.add(new THREE.AxesHelper(5));
    sun.add(new THREE.AxesHelper(20));
}
// earth.add(atmosphere);

export {sun, earth, moon};