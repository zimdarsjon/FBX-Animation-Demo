import { CircleGeometry, MeshStandardMaterial, Mesh } from 'three';

function createGround() {
  const geometry = new CircleGeometry(32, 32);
  const material = new MeshStandardMaterial();
  const circle = new Mesh(geometry, material);
  circle.rotation.x = - Math.PI / 2;
  circle.receiveShadow = true;
  return circle;
}

export { createGround }