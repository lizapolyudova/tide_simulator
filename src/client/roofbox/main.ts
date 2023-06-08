import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {BufferGeometry, Mesh} from "three";
import * as utils from '../shared/utils';
import {VSMShadowMap} from "three/src/constants";

THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1);

var debugMode = true;
const scene = new THREE.Scene();
const globalCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const firstPersonCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

globalCamera.position.set(0, 10, 10);

const stats = utils.setupStats();

function setupControls() {

    // const controls = new OrbitControls(globalCamera, renderer.domElement);
    const controls = new OrbitControls(firstPersonCamera, renderer.domElement);
    controls.listenToKeyEvents(window);

    // // not sure if these settings are good, but at least the camera movement works
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
    const slitRoofWidth = roomWidth / 2 / Math.cos(roofAngle) * (1 - roofBoxLengthRatio) / 2;
    const roofBoxPartialHorizontal = new THREE.PlaneGeometry(roomWidth / 2 / Math.cos(roofAngle), slitRoofLength, 100, 100);
    const roofBoxPartialVertical = new THREE.PlaneGeometry(slitRoofWidth, roomLength - slitRoofLength * 2, 100, 100);

    // this roof will have a box in it
    const roofBoxRight = prepSide(roofBoxPartialHorizontal);
    roofBoxRight.rotation.y = roofAngle;
    roofBoxRight.position.set(roomWidth - roomWidth / 4., roomLength - slitRoofLength / 2, roomHeight + roomWidth * Math.tan(roofAngle) / 4.);

    const roofBoxLeft = prepSide(roofBoxPartialHorizontal);
    roofBoxLeft.rotation.y = roofAngle;
    roofBoxLeft.position.set(roomWidth - roomWidth / 4., slitRoofLength / 2, roomHeight + roomWidth * Math.tan(roofAngle) / 4.);

    const roofBoxAbove = prepSide(roofBoxPartialVertical);
    roofBoxAbove.rotation.y = roofAngle;
    roofBoxAbove.position.set(
        roomWidth / 2. + roomWidth * Math.sin(roofAngle) * .2,
        roomLength / 2,
        roomHeight + roomWidth * Math.tan(roofAngle) * .8 / 2);


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

    house.add(firstPersonCamera);
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

var running = true;

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

    document.body.addEventListener('keyup', function (event) {
        console.log(`key press: ${event.key}:\t${event.code}`);
        if (event.code == 'Space') {
            running = !running;
        }
        if (event.key == '?') {
            console.log(`camera position: ${firstPersonCamera.position.x}, ${firstPersonCamera.position.y}, ${firstPersonCamera.position.z}`);
        }
    });

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
    if (running) {
        sunStep();
    }
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, firstPersonCamera);
}

init();
setScene();
animate();