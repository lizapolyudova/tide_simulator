let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;

//Camera, scene, and renderer
var scene = new THREE.Scene();

var staticCam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
var dailyCam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 50);
var moonCam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 50);
var activeCam = staticCam;
var enableHelpers = false;

scene.add(staticCam);
scene.add(dailyCam);
scene.add(moonCam);
staticCam.position.set(0, 35, 150);

if (enableHelpers) {
    var staticHelper = new THREE.CameraHelper(staticCam);
    var moonCamHelper = new THREE.CameraHelper(moonCam);
    var dailyCamHelper = new THREE.CameraHelper(dailyCam);

    scene.add(staticHelper);
    scene.add(moonCamHelper);
    // scene.add(dailyCamHelper);

}


var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Orbit Controls
var orbitControls = new THREE.OrbitControls(staticCam, renderer.domElement);

//Objects (We build a mesh using a geometry and a material)

var earth_radius = 5;
var earth_orbit_radius = 50;
var moon_orbit_radius = 10;

// light
bulbLight = new THREE.PointLight(0xffee88, 4, 100, 2);
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

function generateTexture() {
    var size = 512;

    // create canvas
    let canvas2 = document.createElement("canvas");
    canvas2.width = size;
    canvas2.height = size;

    // get context
    var context = canvas2.getContext("2d");

    // draw gradient
    context.rect(0, 0, size, size);
    var gradient = context.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, "#00ff00"); // light blue
    gradient.addColorStop(1, "#0000ff"); // dark blue
    context.fillStyle = gradient;
    context.fill();

    return canvas2;
}

var texture = new THREE.Texture(generateTexture());
texture.needsUpdate = true; // important!
var earthGeometry = new THREE.SphereGeometry(earth_radius, 50, 50);
var earthMaterial = new THREE.MeshPhongMaterial({
    map: texture,
    color: 0xf2f2f2,
    specular: 0xbbbbbb,
    shininess: 1
});
var earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.set(earth_orbit_radius, 0, 0);
scene.add(earth);

//Moon
var moonGeometry = new THREE.SphereGeometry(1.2, 50, 50);
var moonMaterial = new THREE.MeshPhongMaterial({
    color: 0xadada0,
    shininess: 1,
});
var moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(45, 0, 0);
scene.add(moon);

var multiplier = 20;
var earth_yearly = 0;
var earth_daily = 3 * Math.PI / 2;
var earth_delta = 2 * Math.PI / 365 / multiplier;
var moon_theta = 0;
var moon_delta = 2 * Math.PI / 28 / multiplier;
var daily_delta = moon_delta * 24;

var earth_dTheta = 2 * Math.PI / 3000;

function init() {
// controls

    // const gui = new GUI();
    //
    // gui.add(effectController, 'focalLength', 1, 135, 0.01).onChange(matChanger);
    // gui.add(effectController, 'fstop', 1.8, 22, 0.01).onChange(matChanger);
    // gui.add(effectController, 'focalDepth', 0.1, 100, 0.001).onChange(matChanger);
    // gui.add(effectController, 'showFocus', true).onChange(matChanger);

}

var earth_group = new THREE.Object3D()
earth_group.add(earth);
earth_group.add(dailyCam);
scene.add(earth_group);

//Render loop
var render = function () {


    function calculateOrbits() {
        earth_yearly -= earth_delta;
        earth_daily += daily_delta;
        moon_theta += moon_delta;

        //Earth orbit
        earth.position.x = sun.position.x + earth_orbit_radius * Math.cos(earth_yearly);
        earth.position.z = sun.position.z + earth_orbit_radius * Math.sin(earth_yearly);
        var earth_axis = new THREE.Vector3(0, 1, -.1).normalize();
        earth.rotateOnAxis(earth_axis, daily_delta);
        // var zero = new THREE.Vector3(0, 0, 0);
        // earth_group.rotateOnWorldAxis(zero, earth_delta);

        //Earth orbit
        // moon.position.x = earth.position.x + 5;
        // moon.position.z = earth.position.z + 5;
        moon.position.x = earth.position.x + moon_orbit_radius * Math.cos(moon_theta);
        moon.position.z = earth.position.z + moon_orbit_radius * Math.sin(moon_theta);
    }

    calculateOrbits()


    function calculateMoonCam() {
        moonCam.position.x = (earth.position.x + moon.position.x) / 2;
        moonCam.position.y = (earth.position.y + moon.position.y) / 2;
        moonCam.position.z = (earth.position.z + moon.position.z) / 2;
        moonCam.lookAt(moon.position);
    }

    function calculateDailyCam() {

        // pretty sure there should be a way to "rorate the earth" around its axis and pick a point on the sphere for the cam, would make this calculation more elegant
        dailyCam.position.x = earth.position.x + earth_radius * Math.cos(earth_daily);
        dailyCam.position.y = earth.position.y;
        dailyCam.position.z = earth.position.z + earth_radius * Math.sin(earth_daily);
        dailyCam.rotateY(-1 * daily_delta);
    }

    calculateDailyCam()
    calculateMoonCam()


    // renderer.setViewport(0, 0, SCREEN_WIDTH / 2, SCREEN_HEIGHT);
    // renderer.render(scene, cameraStatic);
    // renderer.setScissor(0, 0, SCREEN_WIDTH / 2, SCREEN_HEIGHT);
    // renderer.setClearColor(view.background);
    //
    // renderer.setViewport(SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2, SCREEN_HEIGHT);
    renderer.render(scene, activeCam);
    // renderer.render(scene, cameraStatic);

};


function animate() {

    requestAnimationFrame(animate);
    render();

}

init();
animate();
