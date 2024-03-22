import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {BufferGeometry, Mesh} from "three";
import * as utils from '../shared/utils';
import * as keys from '../shared/keys';
import {VSMShadowMap} from "three/src/constants";
import {FirstPersonControls} from "three/examples/jsm/controls/FirstPersonControls";
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls'
import {activeCam} from "../spheres/cameras";


let raycaster: THREE.Raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();


THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1);

var debugMode = true;
var clock = new THREE.Clock();
const scene = new THREE.Scene();
const globalCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const firstPersonCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
firstPersonCamera.lookAt(1, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

globalCamera.position.set(0, 10, 10);

const stats = utils.setupStats();
const walkSpeed = 2;
const runSpeed = 4;
var movementSpeed = 2;


function setupControls() {

    // const controls = new OrbitControls(globalCamera, renderer.domElement);
    // const camControls = new FirstPersonControls(firstPersonCamera, renderer.domElement);
    // camControls.activeLook = true;
    // camControls.movementSpeed = walkSpeed;
    // // camControls.lookVertical = true;
    // camControls.constrainVertical = true;

    const controls = new PointerLockControls(firstPersonCamera, document.body);
    scene.add(controls.getObject());
    // controls.unlock();

    const onKeyDown = function (event: KeyboardEvent) {

        switch (event.code) {

            case 'ArrowUp':
            case 'KeyW':
                moveForward = true;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = true;
                break;

            case 'ArrowDown':
            case 'KeyS':
                moveBackward = true;
                break;

            case 'ArrowRight':
            case 'KeyD':
                moveRight = true;
                break;

            case 'Space':
                if (canJump === true) velocity.y += 350;
                canJump = false;
                break;

        }

    };

    const onKeyUp = function (event: KeyboardEvent) {

        switch (event.code) {

            case 'ArrowUp':
            case 'KeyW':
                moveForward = false;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = false;
                break;

            case 'ArrowDown':
            case 'KeyS':
                moveBackward = false;
                break;

            case 'ArrowRight':
            case 'KeyD':
                moveRight = false;
                break;

        }

    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);


    // controls.lookAt(1, 0, 0);

    // const controls = new OrbitControls(firstPersonCamera, renderer.domElement);
    // controls.listenToKeyEvents(window);
    //
    // // // not sure if these settings are good, but at least the camera movement works
    // controls.enableDamping = false; // an animation loop is required when either damping or auto-rotation are enabled
    // controls.dampingFactor = 0.05;
    // controls.screenSpacePanning = false;
    // controls.maxPolarAngle = Math.PI / 2;

    controls.unlock();
    return controls
}

// params
const roomColor = 0x0000ff;
const roomWidth = 10.;
const roomHeight = 2.;
const roomLength = 14.;
const wallDepth = .2;
const roofAngle = 70. / 180.0;
const roofLength = roomWidth / 2. / Math.cos(roofAngle);

const controls = setupControls();
const house = new THREE.Group();

function tested() {

    const floorGeometry = new THREE.PlaneGeometry(roomWidth, roomLength);
    const lengthWallGeometry = new THREE.PlaneGeometry(roomHeight, roomLength);
    const widthWallGeometry = new THREE.PlaneGeometry(roomWidth, roomHeight)

    const floor = prepSide(floorGeometry);
    floor.position.set(roomWidth / 2, roomLength / 2, 0);

    const wallLength1 = prepSide(lengthWallGeometry);
    wallLength1.rotation.y = -Math.PI * 0.5;
    wallLength1.position.set(0, roomLength / 2, roomHeight / 2);

    const wallLength2 = prepSide(lengthWallGeometry);
    wallLength2.rotation.y = -Math.PI * 0.5;
    wallLength2.position.set(roomWidth, roomLength / 2, roomHeight / 2);

    const wallWidth1 = prepSide(widthWallGeometry);
    wallWidth1.rotation.x = Math.PI * 0.5;
    wallWidth1.position.set(roomWidth / 2, 0, roomHeight / 2);

    const wallWidth2 = prepSide(widthWallGeometry);
    wallWidth2.rotation.x = Math.PI * 0.5;
    wallWidth2.position.set(roomWidth / 2, roomLength, roomHeight / 2);

    const roofGeometry = new THREE.PlaneGeometry(roomWidth / 2 / Math.cos(roofAngle), roomLength);
    const roofFullSide = prepSide(roofGeometry);
    roofFullSide.position.set(roomWidth / 4, roomLength / 2, roomHeight + roomWidth * Math.tan(roofAngle) / 4.);
    roofFullSide.rotation.y = -1 * roofAngle;


    const roofBoxWidthRatio = .2;
    const roofBoxLengthRatio = .6;
    const slitRoofLength = roomLength / 2 * (1 - roofBoxWidthRatio);
    const slitRoofWidth = roofLength * (1 - roofBoxLengthRatio) / 2;
    const roofBoxPartialHorizontal = new THREE.PlaneGeometry(roomWidth / 2 / Math.cos(roofAngle), slitRoofLength, 10, 10);
    const roofBoxPartialVertical = new THREE.PlaneGeometry(slitRoofWidth, roomLength - slitRoofLength * 2, 10, 10);

    // this roof will have a box in it
    const roofBoxRight = prepSide(roofBoxPartialHorizontal);
    roofBoxRight.rotation.y = roofAngle;
    roofBoxRight.position.set(roomWidth - roomWidth / 4., roomLength - slitRoofLength / 2, roomHeight + roomWidth * Math.tan(roofAngle) / 4.);

    const roofBoxLeft = prepSide(roofBoxPartialHorizontal);
    roofBoxLeft.rotation.y = roofAngle;
    roofBoxLeft.position.set(roomWidth - roomWidth / 4., slitRoofLength / 2, roomHeight + roomWidth * Math.tan(roofAngle) / 4.);

    const roofBoxBelow = prepSide(roofBoxPartialVertical);
    roofBoxBelow.rotation.y = roofAngle;
    roofBoxBelow.position.set(
        roomWidth - slitRoofWidth / 2,
        roomLength / 2,
        roomHeight + slitRoofWidth * Math.sin(roofAngle) / 2 + 0.01);

    const roofBoxAbove = prepSide(roofBoxPartialVertical);
    roofBoxAbove.rotation.y = roofAngle;
    roofBoxAbove.position.set(
        roomWidth / 2 + slitRoofWidth / 2,
        roomLength / 2,
        roomHeight + slitRoofWidth * Math.sin(roofAngle) / 2 + 0.01);


    const sideRoof = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        0, 0, 0,
        roomWidth, 0, 0,
        roomWidth / 2, 0, Math.sin(roofAngle) * roofLength,
    ]);

    // itemSize = 3 because there are 3 values (components) per vertex
    sideRoof.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    // necessary for the lighting to correctly work
    sideRoof.computeVertexNormals();

    const sideRoof1 = prepSide(sideRoof);
    sideRoof1.position.z = roomHeight;

    const sideRoof2 = prepSide(sideRoof);
    sideRoof2.position.z = roomHeight;
    sideRoof2.position.y = roomLength;

    firstPersonCamera.position.set(roomWidth * .8, roomLength * .2, roomHeight * .4);
    // house.add(firstPersonCamera);
    scene.add(house);

}


function test() {
    const material = new THREE.MeshBasicMaterial({
        color: 0xffff33,
        side: THREE.DoubleSide,
    });

    const sideRoof = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        0, 0, 0,
        roomWidth, 0, 0,
        roomWidth / 2, 0, Math.sin(roofAngle) * roofLength,
    ]);
    sideRoof.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const sideRoof2 = new THREE.Mesh(sideRoof, material);
    sideRoof2.position.z = roomHeight;
    sideRoof2.position.y = roomLength;
    scene.add(sideRoof2);
}

function setupRoom() {
    tested();
    // test();
    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper(size, divisions);
    gridHelper.rotateX(Math.PI / 2);
    scene.add(gridHelper);

}

function setupRoofbox() {

}


const radius = 20;

const sun = new THREE.PointLight(0xffffff, 2);

function setupSun() {

    sun.position.set(-1 * radius, 0, 0);
    sun.castShadow = true;
    scene.add(sun);

    const helper = new THREE.PointLightHelper(sun);
    scene.add(helper);

    const ambient = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambient);

}

function setupMovementControls() {

}

var timePaused = true;
var isRunning = false;


function setScene() {
    // static scene setup:
    // floor, walls (4), angled roof
    setupRoom();
    house.rotateZ(-.56);
    // slit in the roof
    setupRoofbox();
    // light which is visible from the room
    setupSun();
    // walk around the room
    setupMovementControls();
}

function init() {
    keys.timeControlKeyListener(new keys.TimeProperties(true, activeCam));

    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

}

const sunStepRadian = .01;
var sunAngle = 0;
const origin = new THREE.Object3D();


const material = new THREE.MeshPhysicalMaterial({
    color: roomColor,
    shadowSide: THREE.DoubleSide,
    side: THREE.DoubleSide,
});

function prepSide(geometry: BufferGeometry) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    house.add(mesh);
    return mesh;
}


function testInit() {
}

function sunStep() {
    sunAngle += sunStepRadian;
    sun.position.setX(radius * Math.cos(sunAngle));
    sun.position.setZ(radius * Math.sin(sunAngle));
}

function animate() {
    if (debugMode) {
        utils.printCamera(firstPersonCamera, stats);
    }
    if (!timePaused) {
        sunStep();
    }
    movementSpeed = isRunning ? runSpeed : walkSpeed;

    requestAnimationFrame(animate);

    // copied from
    // https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_pointerlock.html#L105
    const time = performance.now();

    if (controls.isLocked === true) {

        raycaster.ray.origin.copy(controls.getObject().position);
        raycaster.ray.origin.y -= 10;

        // const intersections = raycaster.intersectObjects(objects, false);

        // const onObject = intersections.length > 0;

        const delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize(); // this ensures consistent movements in all directions

        if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

        // if (onObject === true) {
        //
        //     velocity.y = Math.max(0, velocity.y);
        //     canJump = true;
        //
        // }

        controls.moveRight(-velocity.x * delta);
        controls.moveForward(-velocity.z * delta);

        controls.getObject().position.y += (velocity.y * delta); // new behavior

        if (controls.getObject().position.y < 10) {

            velocity.y = 0;
            controls.getObject().position.y = 10;

            canJump = true;

        }

    }

    prevTime = time;


    renderer.render(scene, firstPersonCamera);
}

init();
setScene();
animate();