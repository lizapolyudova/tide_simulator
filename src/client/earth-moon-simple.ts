import * as THREE from 'three';

import * as cameras from './cameras'
import {printCamera} from "./utils";
import {sun, earth, moon} from "./planets";
import {earth_orbit_radius, moon_orbit_radius, daily_delta, moon_delta, earth_delta} from "./params";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {activeCam} from "./cameras";


// add controls

//Camera, scene, and renderer
var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// light
var bulbLight = new THREE.PointLight(0xffee88, 10, earth_orbit_radius * 2);
bulbLight.position.set(0, 0, 0);
scene.add(bulbLight);

// arrange original positions of the planets

scene.add(sun);
moon.position.set(moon_orbit_radius, 0, 0);
earth.position.set(earth_orbit_radius, 0, 0);

// moonOrbit object manages objects rotating around earth together with the moon
const moonOrbit = new THREE.Object3D();
moonOrbit.position.set(earth.position.x, earth.position.y, earth.position.z);
moonOrbit.add(moon);
moonOrbit.add(cameras.moonCam);

// earthOrbit object manages rotating around the sun together with the earth.
const earthOrbit = new THREE.Object3D();
earthOrbit.position.set(sun.position.x, sun.position.y, sun.position.z);
earthOrbit.add(earth);
earthOrbit.add(moonOrbit);
scene.add(earthOrbit);

var control;

function init() {
    cameras.helpers(scene, renderer);
    // call the render function
    render();
}


//Render loop
var render = function () {


    function calculateOrbits() {
        var earth_axis = new THREE.Vector3(0, 1, -.1).normalize();
        earth.rotateOnAxis(earth_axis, daily_delta);
        earthOrbit.rotateOnAxis(new THREE.Vector3(0, 1, 0), earth_delta);
        moonOrbit.rotateOnAxis(new THREE.Vector3(0, 1, .28).normalize(), moon_delta);
    }

    calculateOrbits()
    renderer.render(scene, cameras.activeCam);

};


var stats = document.createElement('div');
stats.className = "stats"
stats.innerHTML = "some stats here"
document.body.appendChild(stats);


function animate() {
    printCamera(cameras.activeCam, stats);
    requestAnimationFrame(animate);
    render();

}

init();
animate();