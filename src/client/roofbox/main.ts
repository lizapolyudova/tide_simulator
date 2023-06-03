import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 10, 10);

function setupControls() {

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.listenToKeyEvents(window);

    // not sure if these settings are good, but at least the camera movement works
    controls.enableDamping = false; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;

    controls.update();
    return controls
}

// params
const roomColor = 0x0000ff;
const roomWidth = 10.;
const roomHeight = 2.;
const roomLength = 14.;
const roofAngle = 70. / 180.0;
const roofLength = roomWidth / 2. / Math.cos(roofAngle);

const controls = setupControls();

function tested() {
    const geometry = new THREE.PlaneGeometry(roomWidth, roomLength);
    const material = new THREE.MeshPhysicalMaterial({color: roomColor, side: THREE.DoubleSide});
    const floor = new THREE.Mesh(geometry, material);
    floor.position.set(roomWidth / 2, roomLength / 2, 0);

    const wallLength1 = new THREE.Mesh(new THREE.PlaneGeometry(roomHeight, roomLength), material);
    wallLength1.rotation.y = -Math.PI * 0.5;
    wallLength1.position.set(0, roomLength / 2, roomHeight / 2);

    const wallLength2 = new THREE.Mesh(new THREE.PlaneGeometry(roomHeight, roomLength), material);
    wallLength2.rotation.y = -Math.PI * 0.5;
    wallLength2.position.set(roomWidth, roomLength / 2, roomHeight / 2);

    const wallWidth1 = new THREE.Mesh(new THREE.PlaneGeometry(roomWidth, roomHeight), material);
    wallWidth1.rotation.x = Math.PI * 0.5;
    wallWidth1.position.set(roomWidth / 2, 0, roomHeight / 2);

    const wallWidth2 = new THREE.Mesh(new THREE.PlaneGeometry(roomWidth, roomHeight), material);
    wallWidth2.rotation.x = Math.PI * 0.5;
    wallWidth2.position.set(roomWidth / 2, roomLength, roomHeight / 2);

    scene.add(floor);
    scene.add(wallLength1);
    scene.add(wallLength2);
    scene.add(wallWidth1);
    scene.add(wallWidth2);

    const roof = new THREE.PlaneGeometry(roomWidth / 2 / Math.cos(roofAngle), roomLength);
    const roof1 = new THREE.Mesh(roof, material);
    roof1.position.set(roomWidth / 4, roomLength / 2, roomHeight + roomWidth * Math.tan(roofAngle) / 4.);
    roof1.rotation.y = -1 * roofAngle;

    const roof2 = new THREE.Mesh(roof, material);
    roof2.rotation.y = roofAngle;
    roof2.position.set(roomWidth - roomWidth / 4., roomLength / 2, roomHeight + roomWidth * Math.tan(roofAngle) / 4.);

    scene.add(roof1);
    scene.add(roof2);

    const sideRoof = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        0, 0, 0,
        roomWidth, 0, 0,
        roomWidth / 2, 0, Math.sin(roofAngle) * roofLength,
    ]);

// itemSize = 3 because there are 3 values (components) per vertex
    sideRoof.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const sideRoof1 = new THREE.Mesh(sideRoof, material);
    sideRoof1.position.z = roomHeight;
    scene.add(sideRoof1);

}


function test() {
    const material = new THREE.MeshBasicMaterial({color: 0xffff33});

    const sideRoof = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        0, 0, 0,
        roomWidth, 0, 0,
        roomWidth / 2, 0, Math.sin(roofAngle) * roofLength,
    ]);


    const sideRoof2 = new THREE.Mesh(sideRoof, material);
    sideRoof2.position.z = roomHeight;
    sideRoof2.position.y = roomLength;
    scene.add(sideRoof2);
}

function setupRoom() {
    tested();
    test();
    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper(size, divisions);
    gridHelper.rotateX(Math.PI / 2);
    scene.add(gridHelper);

}

function setupRoofbox() {

}

function setupSun() {
    const lamp = new THREE.PointLight(0xffffff, 2, 20);
    lamp.position.set(roomWidth * 1.5, roomLength / 2, roomHeight * 1.5);
    scene.add(lamp);

    const helper = new THREE.PointLightHelper(lamp);
    scene.add(helper);

    const ambient = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambient);

}

function setupMovementControls() {

}

function init() {
    // static scene setup:
    // floor, walls (4), angled roof
    setupRoom();
    // slit in the roof
    setupRoofbox();
    // light which is visible from the room
    setupSun();
    // walk around the room
    setupMovementControls();


    document.body.addEventListener('keyup', function (event) {
        console.log(`key press: ${event.key}:\t${event.code}`);
    });


    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);
}

function sunStep() {

}

function animate() {
    sunStep();
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

init();
animate();