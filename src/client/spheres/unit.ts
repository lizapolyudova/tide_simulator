import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as utils from '../shared/utils'
import * as planets from "./planets";
import {earth_radius} from "./params";

// import * as utils from "../lib/utils.ts"

// this file contains small examples which can be toggled on/off
// to quickly experiment


// Setup rendered
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x00dddd);
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);


var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var stats = document.createElement('div');
stats.className = "stats"
stats.innerHTML = "some stats here"
document.body.appendChild(stats);

const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);


//Orbit Controls
// var orbitControls = new OrbitControls(camera, renderer.domElement);
new OrbitControls(camera, renderer.domElement)
// Lights
var light = new THREE.SpotLight(0xffddaa, 1)
light.position.set(2 * earth_radius, 2 * earth_radius, 2 * earth_radius);
scene.add(light);

const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
scene.add(pointLightHelper);

const material = new THREE.MeshNormalMaterial({});


// Small sphere
const geometry2 = new THREE.SphereGeometry(1, 40, 40);
const small = new THREE.Mesh(geometry2, material);
small.position.set(5, 5, 5);
scene.add(small);

planets.earth.add(camera);
camera.position.x = -earth_radius / 2;
camera.position.y = -earth_radius / 2;
camera.position.z = -earth_radius / 2;
camera.lookAt(small.position);
scene.add(planets.earth)


function animate() {
    // create a small debug printout
    utils.printCamera(camera, stats);

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
