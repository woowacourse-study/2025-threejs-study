import * as THREE from "three";

// 장면 만들기
const scene = new THREE.Scene();

// 카메라 만들기
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 8;

// 렌더러 만들기
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#000000");
document.body.appendChild(renderer.domElement);

// 조명 추가
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(3, 3, 5);
light.intensity = 3;
scene.add(light);

// outerCube
const textureLoader = new THREE.TextureLoader();
let outerCube = null;
textureLoader.load("/texture.png", (texture) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    transparent: true,
    // emissive: 0x00ffff,
    opacity: 0.8,
  });
  outerCube = new THREE.Mesh(geometry, material);
  outerCube.position.set(-3, 0, 0);

  const edges = new THREE.EdgesGeometry(geometry);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
  const wireframe = new THREE.LineSegments(edges, lineMaterial);
  outerCube.add(wireframe);

  const pointLight = new THREE.PointLight(0x00ffff, 2, 10);
  pointLight.position.set(-3, 0, 0);
  scene.add(pointLight);

  scene.add(outerCube);
});

// innerCube
const innerCube = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.5, 0.5),
  new THREE.MeshStandardMaterial({
    color: 0x000000,
    emissive: 0x0066ff,
    emissiveIntensity: 100,
  })
);
innerCube.position.set(-3, 0, 0);
scene.add(innerCube);

// sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 16, 32),
  new THREE.MeshStandardMaterial({ metalness: 0.5, roughness: 0.5 })
);
scene.add(sphere);

// 애니메이션 루프
renderer.setAnimationLoop(() => {
  if (outerCube) {
    outerCube.rotation.x -= 0.01;
    outerCube.rotation.y -= 0.01;
  }

  innerCube.rotation.x += 0.005;
  innerCube.rotation.y += 0.005;

  sphere.rotation.x -= 0.01;
  sphere.rotation.y -= 0.01;

  renderer.render(scene, camera);
});
