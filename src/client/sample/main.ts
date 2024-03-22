import {World} from './World';

// create the main function
function main() {
    // Get a reference to the container element
    const container = document.querySelector('#scene-container');
    if (container == null) {
        console.log("no matching element for canvas was found, exit");
        return
    }

    // 1. Create an instance of the World app
    const world = new World(container);
    // We can access member variables from the instance
    console.log(world.camera);
    console.log(world.renderer);
    console.log(world.scene);
    world.render();
}

main();