import { Scene, CubeTextureLoader } from 'three';

const createScene = () => {
  const scene = new Scene();
  const loader = new CubeTextureLoader();
  const texture = loader.load([
    '/assets/sky/FS002_Day_Cubemap_left.png',
    '/assets/sky/FS002_Day_Cubemap_right.png',
    '/assets/sky/FS002_Day_Cubemap_up.png',
    '/assets/sky/FS002_Day_Cubemap_down.png',
    '/assets/sky/FS002_Day_Cubemap_front.png',
    '/assets/sky/FS002_Day_Cubemap_back.png'
  ]);
  scene.background = texture;
  return scene;
}

export { createScene }