import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

// import * as utils from "../lib/utils.js"

// this file contains small examples which can be toggled on/off
// to quickly experiment


// Setup rendered
var scene = new THREE.Scene();
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
var light = new THREE.AmbientLight(0xffddaa, 1)
scene.add(light);

const material = new THREE.MeshNormalMaterial({});

// Large sphere
const geometry1 = new THREE.SphereGeometry(3, 40, 40);
const large = new THREE.Mesh(geometry1, material);
scene.add(large);

// Small sphere
const geometry2 = new THREE.SphereGeometry(1, 40, 40);
const small = new THREE.Mesh(geometry2, material);
small.position.set(5, 5, 5);
scene.add(small);


camera.position.z = 10;


function animate() {
    // create a small debug printout
    // printCamera(camera, stats);

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
