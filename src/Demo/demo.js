import { createCamera } from './camera.js';
import { createLights } from './lights.js';
import { createControls } from './controls.js';
import { createRenderer } from './renderer.js';
import { createScene } from './scene.js';
import { createGround } from './ground.js';
import { createCharacter } from './character.js';
import { Loop } from './loop.js';
import { Resizer } from './resizer.js';

let loop, scene;

class Demo {
  constructor(container) {
    const camera = createCamera();
    scene = createScene();
    const renderer = createRenderer();
    const controls = createControls(camera, renderer);
    const ground = createGround();
    const { directionalLight, hemisphereLight } = createLights();

    // Add renderer to screen
    container.append(renderer.domElement);

    // Add elements to the scene
    scene.add(directionalLight, hemisphereLight, ground);

    // Adjusts view to size of screen
    // Watches for screen size changes
    const resizer = new Resizer(container, camera, renderer);

    // Create the animation loop
    // This is what tells our animations to move
    // The renderer rerenders the scene after every tick
    loop = new Loop(camera, scene, renderer);

    // Anything in the updatables array will update in the animation loop
    loop.updatables.push(controls);
  }
  async init() {
    // We will load async functions here
    const character = await createCharacter();
    loop.updatables.push(character);
    scene.add(character);
  }
  start() {
    // Start the Animation loop when the demo starts
    loop.start();
  }
  stop() {
    // Allows us to stop the animation loop
    loop.stop();
  }
}

export { Demo }