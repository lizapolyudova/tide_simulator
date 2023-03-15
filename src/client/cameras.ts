import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as planets from "./planets";
import * as params from "./params";
import {earth_orbit_radius, earth_radius, moon_orbit_radius} from "./params";


var staticCam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, earth_orbit_radius * 10);
var dailyCam = new THREE.PerspectiveCamera(20, 3*window.innerWidth / window.innerHeight, earth_radius * .025
    , earth_orbit_radius*1.2);
var moonCam = new THREE.PerspectiveCamera(20, 3*window.innerWidth / window.innerHeight, earth_radius * .025
    , earth_orbit_radius*1.2);
staticCam.position.set(0, earth_orbit_radius * 3, earth_orbit_radius * 3);


var activeCam = staticCam;
var enableHelpers = false;

function helpers(scene: THREE.Scene, renderer: THREE.Renderer) {
    scene.add(staticCam);
    if (enableHelpers) {
        const staticHelper = new THREE.CameraHelper(staticCam);
        var moonCamHelper = new THREE.CameraHelper(moonCam);
        var dailyCamHelper = new THREE.CameraHelper(dailyCam);

        scene.add(staticHelper);
        scene.add(moonCamHelper);
        scene.add(dailyCamHelper);

        const axesHelper = new THREE.AxesHelper(100);
        scene.add(axesHelper);
    }
    //Orbit Controls
    new OrbitControls(staticCam, renderer.domElement);
}

// dailyCam.lookAt(planets.moon.position);
dailyCam.position.z = -1 * params.earth_radius;
planets.earth.add(dailyCam);

moonCam.lookAt(planets.moon.position);
moonCam.position.z = -1 * params.earth_radius;

export {moonCam, activeCam, helpers};





