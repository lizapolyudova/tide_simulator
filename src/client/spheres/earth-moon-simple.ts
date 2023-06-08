import * as THREE from 'three';

import * as cameras from './cameras'
import {printCamera} from "../shared/utils";
import {sun, earth, moon} from "./planets";
import {moon_radius, earth_orbit_radius, moon_orbit_radius, daily_delta, moon_delta, earth_delta} from "./params";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { GUI } from 'dat.gui';
import {activeCam, moonCam, staticCam} from "./cameras";
import * as planets from "./planets";


// add controls

//Camera, scene, and renderer
var scene = new THREE.Scene();
const loader = new THREE.TextureLoader();
loader.load('https://c.pxhere.com/photos/1a/9d/stars_background_blue_photoshop_color_space_sky_dark-610854.jpg!d' , function(texture)
{
    console.log("ready!");
    scene.background = texture;
});

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearAlpha(0);
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
moonCam.lookAt(moon.getWorldPosition(new THREE.Vector3()));


// earthOrbit object manages rotating around the sun together with the earth.
const earthOrbit = new THREE.Object3D();
earthOrbit.position.set(sun.position.x, sun.position.y, sun.position.z);
earthOrbit.add(earth);
earthOrbit.add(moonOrbit);
scene.add(earthOrbit);



function init() {
    cameras.helpers(scene, renderer);
    // call the render function
    render();

    const gui = new GUI();
    const planetsFolder = gui.addFolder('Planets');
    // planetsFolder.add(moon_radius, 'moon radius', .1, 2);
    planetsFolder.open();

}


//Render loop
var render = function () {
    cameras.updateSize(renderer)


    function calculateOrbits() {
        var earth_axis = new THREE.Vector3(0, 1, -.1).normalize();
        earth.rotateOnAxis(earth_axis, daily_delta);
        earthOrbit.rotateOnAxis(new THREE.Vector3(0, 1, 0), earth_delta);
        moonOrbit.rotateOnAxis(new THREE.Vector3(0, 1, .28).normalize(), moon_delta);
    }

    calculateOrbits()

    cameras.setupCamera(scene, renderer, cameras.staticCam, 0);
    cameras.setupCamera(scene, renderer, cameras.activeCam, 1);
};


var stats = document.createElement('div');
stats.className = "stats"
document.body.appendChild(stats);


function animate() {
    // printCamera(cameras.activeCam, stats);
    requestAnimationFrame(animate);
    render();

}

init();
animate();
