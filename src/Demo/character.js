import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { AnimationMixer } from 'three';

async function createCharacter() {
  const loader = new FBXLoader();

  const character = await loader.loadAsync('/assets/character/tpose.fbx');
  const shuffle = await loader.loadAsync('/assets/character/shuffle.fbx');
  const dropkick = await loader.loadAsync('/assets/character/dropkick.fbx');
  const crouchturn = await loader.loadAsync('/assets/character/crouchturn.fbx');
  const death = await loader.loadAsync('/assets/character/death.fbx');
  const flair = await loader.loadAsync('/assets/character/flair.fbx');
  const flip = await loader.loadAsync('/assets/character/flip.fbx');
  const idle = await loader.loadAsync('/assets/character/idle.fbx');
  const run = await loader.loadAsync('/assets/character/run.fbx');
  const shoulder = await loader.loadAsync('/assets/character/shoulder.fbx');

  const mixer = new AnimationMixer(character);
  const animations = {
    default: mixer.clipAction(character.animations[0]),
    shuffle: mixer.clipAction(shuffle.animations[0]),
    idle: mixer.clipAction(idle.animations[0]),
    death: mixer.clipAction(death.animations[0]),
    flair: mixer.clipAction(flair.animations[0]),
    flip: mixer.clipAction(flip.animations[0]),
    run: mixer.clipAction(run.animations[0]),
    shoulder: mixer.clipAction(shoulder.animations[0]),
    crouchturn: mixer.clipAction(crouchturn.animations[0]),
    dropkick: mixer.clipAction(dropkick.animations[0])
  }

  // Set the default action to T-Pose
  let activeAction = animations.default;
  activeAction.play();


  // Controls the change action script
  function switchAction (action) {
    if (animations[action] !== activeAction) {
      let lastAction = activeAction;
      activeAction = animations[action];
      lastAction.fadeOut(1);
      activeAction.reset();
      activeAction.fadeIn(1);
      activeAction.play();
    }
  }

  // Add event listeners for number keys
  window.addEventListener('keydown', (e) => {
    switch(e.key) {
      case '0': {
        switchAction('default');
        break;
      }
      case '1': {
        switchAction('shuffle');
        break;
      }
      case '2': {
        switchAction('dropkick');
        break;
      }
      case '3': {
        switchAction('death');
        break;
      }
      case '4': {
        switchAction('idle');
        break;
      }
      case '5': {
        switchAction('flair');
        break;
      }
      case '6': {
        switchAction('flip');
        break;
      }
      case '7': {
        switchAction('run');
        break;
      }
      case '8': {
        switchAction('shoulder');
        break;
      }
      case '9': {
        switchAction('crouchturn');
        break;
      }
    }
  });

  // Add event listeners for buttons
  document.getElementById('one').addEventListener('click', (e) => switchAction('shuffle'));
  document.getElementById('two').addEventListener('click', (e) => switchAction('dropkick'));
  document.getElementById('three').addEventListener('click', (e) => switchAction('death'));
  document.getElementById('four').addEventListener('click', (e) => switchAction('idle'));
  document.getElementById('five').addEventListener('click', (e) => switchAction('flair'));
  document.getElementById('six').addEventListener('click', (e) => switchAction('flip'));
  document.getElementById('seven').addEventListener('click', (e) => switchAction('run'));
  document.getElementById('eight').addEventListener('click', (e) => switchAction('shoulder'));
  document.getElementById('nine').addEventListener('click', (e) => switchAction('crouchturn'));
  document.getElementById('zero').addEventListener('click', (e) => switchAction('default'));

  // Adjust the size of the asset
  character.scale.setScalar(0.1);

  // The character has a child array with two children
  //  0 - SkinnedMesh
  //  1 - Bone

  // Tell the skin to cast a shadow
  character.children[0].castShadow = true;;

  // Tick event for the loop to access
  character.tick = (delta) => mixer.update(delta);

  return character;
}

export { createCharacter }