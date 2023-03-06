let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;

//Camera, scene, and renderer
var scene = new THREE.Scene();
var cameraStatic = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
scene.add(cameraStatic);
var staticHelper = new THREE.CameraHelper(cameraStatic);
cameraStatic.position.set(0, 35, 70);
// scene.add(staticHelper);

var cameraMoving = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 200);
scene.add(cameraMoving);
var movingHelper = new THREE.CameraHelper(cameraMoving);
cameraMoving.position.set(0, 0, 0);
scene.add(movingHelper);


var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Orbit Controls
var orbitControls = new THREE.OrbitControls(cameraStatic, renderer.domElement);

//Objects (We build a mesh using a geometry and a material)

var r_earth = 50;
var r_moon = 10;

// light
bulbLight = new THREE.PointLight(0xffee88, 1, 100, 2);
bulbLight.position.set(0, 0, 0);
scene.add(bulbLight);

// Sun
var sunGeometry = new THREE.SphereGeometry(10, 50, 50);
var sunMaterial = new THREE.MeshPhongMaterial({
    color: 0xddaa22,
    specular: 0xbbbbbb,
    emissive: 0xffffaa,
    shininess: 1
});
var sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

//Earth
var earthGeometry = new THREE.SphereGeometry(5, 50, 50);
var earthMaterial = new THREE.MeshPhongMaterial({
    color: 0xf2f2f2,
    specular: 0xbbbbbb,
    shininess: 1
});
var earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.set(r_earth, 0, 0);
scene.add(earth);

//Moon
var moonGeometry = new THREE.SphereGeometry(1.2, 50, 50);
var moonMaterial = new THREE.MeshPhongMaterial({
    color: 0xadada0,
});
var moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(45, 0, 0);
scene.add(moon);


//Green dot
var dotGeometry = new THREE.SphereGeometry(.05, 50, 50);
var dotMaterial = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
});
var dot = new THREE.Mesh(dotGeometry, dotMaterial);
scene.add(dot);

var multiplier = 10;
var earth_theta = 0;
var earth_delta = 2 * Math.PI / 365 / multiplier;
var moon_theta = 0;
var moon_delta = 2 * Math.PI / 28 / multiplier;

var earth_dTheta = 2 * Math.PI / 3000;

function init() {

}

//Render loop
var render = function () {

    earth_theta += earth_delta;
    moon_theta += moon_delta;

    //Earth orbit
    earth.position.x = sun.position.x + r_earth * Math.cos(earth_theta);
    earth.position.z = sun.position.z + r_earth * Math.sin(earth_theta);

    //Earth orbit
    // moon.position.x = earth.position.x + 5;
    // moon.position.z = earth.position.z + 5;
    moon.position.x = earth.position.x + r_moon * Math.cos(moon_theta);
    moon.position.z = earth.position.z + r_moon * Math.sin(moon_theta);


    cameraMoving.position.x = (sun.position.x + r_earth - 5) * Math.cos(earth_theta);
    cameraMoving.position.y = earth.position.y;
    cameraMoving.position.z = (sun.position.z + r_earth - 5) * Math.sin(earth_theta);
    cameraMoving.lookAt(sun.position);
    // cameraMoving.position.set(earth.position);
    // renderer.setViewport(0, 0, SCREEN_WIDTH / 2, SCREEN_HEIGHT);
    // renderer.render(scene, camera);

    // renderer.setViewport(SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2, SCREEN_HEIGHT);
    renderer.render(scene, cameraStatic);

};

function animate() {

    requestAnimationFrame(animate);
    render();

}

init();
animate();
