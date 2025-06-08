import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
const SCREEN_IMAGE = [
  '/v1740585635/woowacourse/web-wiki/sydney5.jpg',
  '/v1740585635/woowacourse/web-wiki/sydney.jpg',
  '/v1740585631/woowacourse/web-wiki/sydney7.jpg',
  '/v1740589241/woowacourse/web-wiki/sydney10.jpg',
  '/v1748972031/Study/Three.js/study_attendance.jpg',
  '/v1748972275/Study/Three.js/dining.jpg',
  '/v1748972069/Study/Three.js/grow_Graph.jpg',
  '/v1748973468/Study/Three.js/seolleung.jpg',
  '/v1748973453/Study/Three.js/bossam.jpg',
  '/v1748973446/Study/Three.js/fe_hangsungee.jpg',
  '/v1749379638/Study/Three.js/ramen.jpg',
  '/v1749379638/Study/Three.js/pairRoom.jpg',
  '/v1749379639/Study/Three.js/ground.jpg',
  '/v1749379638/Study/Three.js/portrait.jpg',
  '/v1749379639/Study/Three.js/bottle.jpg',
  '/v1749379639/Study/Three.js/takeoff.jpg',
  '/v1749379910/Study/Three.js/techotalk.png',
];

const RADIUS = 5;
const PLANE_HEIGHT = 2;
const SPIN_DURATION = 1;
const SPIN_SPEED = 20;
const SPAWN_DURATION = 1;
const MARGIN = 4;

const PARTICLE_COUNT = 200;
const PARTICLE_SPEED = 8;
const PARTICLE_LIFE = 2;

const loadingManager = new THREE.LoadingManager();
let texturesReady = false;

loadingManager.onLoad = () => {
  texturesReady = true;
  initScene();
};

const loader = new THREE.TextureLoader(loadingManager);
const textures = SCREEN_IMAGE.map((u) => loader.load(baseUrl + u));

textures.forEach((tex) => {
  tex.anisotropy =
    loader.manager.handlers[0].capabilities?.getMaxAnisotropy() || 1;
  tex.encoding = THREE.sRGBEncoding;
  tex.minFilter = THREE.LinearMipMapLinearFilter;
  tex.generateMipmaps = true;
});

function initScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#001155');

  const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
  );
  camera.position.z = RADIUS * 3;

  const renderer = new THREE.WebGLRenderer({ antialias: false });
  renderer.setSize(innerWidth, innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.toneMappingWhitePoint = 1.0;
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  scene.add(new THREE.AxesHelper(2 * RADIUS));

  scene.add(new THREE.AmbientLight('#ffffff', 2.0));

  const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  const directionalLight2 = new THREE.DirectionalLight('#ffffff', 1.0);
  directionalLight2.position.set(-5, -5, -5);
  scene.add(directionalLight2);

  const topLight = new THREE.DirectionalLight('#ffffff', 0.8);
  topLight.position.set(0, 10, 0);
  scene.add(topLight);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(innerWidth, innerHeight),
    0.15,
    0.2,
    0.95
  );
  composer.addPass(bloomPass);

  const fxaaPass = new ShaderPass(FXAAShader);
  fxaaPass.uniforms['resolution'].value.set(1 / innerWidth, 1 / innerHeight);
  composer.addPass(fxaaPass);

  const screensGroup = new THREE.Group();
  {
    const SCREEN_WIDTH = 5,
      SCREEN_HEIGHT = 3;
    const rows = Math.ceil((Math.PI * RADIUS) / SCREEN_HEIGHT) + 2;
    const unitΘ = Math.PI / rows;
    for (let i = 1; i < rows - 1; i++) {
      const θ0 = i * unitΘ,
        θLen = unitΘ;
      const lat = Math.sin(θ0 + θLen / 2) * RADIUS;
      const cols = Math.ceil((2 * Math.PI * lat) / SCREEN_WIDTH);
      if (cols < 1) continue;
      const φLen = (2 * Math.PI) / cols;
      for (let j = 0; j < cols; j++) {
        const φ0 = j * φLen;
        const tex = textures[(i * cols + j) % textures.length];
        const geo = new THREE.SphereGeometry(RADIUS, 1, 1, φ0, φLen, θ0, θLen);
        const mat = new THREE.MeshStandardMaterial({
          map: tex,
          side: THREE.DoubleSide,
          emissive: '#000000',
          emissiveIntensity: 0,
          roughness: 0.4,
          metalness: 0.05,
        });
        screensGroup.add(new THREE.Mesh(geo, mat));
      }
    }
  }
  scene.add(screensGroup);

  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const velocities = new Float32Array(PARTICLE_COUNT * 3);
  const lifeTimes = new Float32Array(PARTICLE_COUNT);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);
  const initialPositions = new Float32Array(PARTICLE_COUNT * 3); // 구 표면의 초기 위치 저장

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;

    const phi = Math.random() * Math.PI * 2;
    const cosTheta = 2 * Math.random() - 1;
    const theta = Math.acos(cosTheta);

    const sphereX = Math.sin(theta) * Math.cos(phi) * RADIUS;
    const sphereY = Math.cos(theta) * RADIUS;
    const sphereZ = Math.sin(theta) * Math.sin(phi) * RADIUS;

    positions[i3] = sphereX;
    positions[i3 + 1] = sphereY;
    positions[i3 + 2] = sphereZ;

    initialPositions[i3] = sphereX;
    initialPositions[i3 + 1] = sphereY;
    initialPositions[i3 + 2] = sphereZ;

    const normalX = sphereX / RADIUS;
    const normalY = sphereY / RADIUS;
    const normalZ = sphereZ / RADIUS;

    velocities[i3] = normalX * PARTICLE_SPEED;
    velocities[i3 + 1] = normalY * PARTICLE_SPEED;
    velocities[i3 + 2] = normalZ * PARTICLE_SPEED;

    lifeTimes[i] = Math.random() * PARTICLE_LIFE;

    colors[i3] = 1.0; // R
    colors[i3 + 1] = 1.0; // G
    colors[i3 + 2] = 1.0; // B

    sizes[i] = Math.random() * 0.15 + 0.1;
  }

  particleGeometry.setAttribute(
    'initialPosition',
    new THREE.BufferAttribute(initialPositions, 3)
  );

  particleGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  );
  particleGeometry.setAttribute(
    'velocity',
    new THREE.BufferAttribute(velocities, 3)
  );
  particleGeometry.setAttribute(
    'lifeTime',
    new THREE.BufferAttribute(lifeTimes, 1)
  );
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 1.0,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  particleSystem.visible = false;
  scene.add(particleSystem);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let lastTime = 0;
  let isSpinning = false;
  let spinStartTime = 0;
  let clickPoint = new THREE.Vector3();
  let floatingGroup = null;
  let spawnData = [];

  window.addEventListener('click', (e) => {
    if (!texturesReady) return;

    mouse.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(screensGroup.children, true);
    if (!hits.length) return;
    clickPoint.copy(hits[0].point);

    isSpinning = true;
    spinStartTime = performance.now() / 1000;

    particleSystem.visible = true;

    const positions = particleSystem.geometry.attributes.position.array;
    const initialPositions =
      particleSystem.geometry.attributes.initialPosition.array;
    const lifeTimes = particleSystem.geometry.attributes.lifeTime.array;
    const velocities = particleSystem.geometry.attributes.velocity.array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      const phi = Math.random() * Math.PI * 2;
      const cosTheta = 2 * Math.random() - 1;
      const theta = Math.acos(cosTheta);

      const sphereX = Math.sin(theta) * Math.cos(phi) * RADIUS;
      const sphereY = Math.cos(theta) * RADIUS;
      const sphereZ = Math.sin(theta) * Math.sin(phi) * RADIUS;

      positions[i3] = sphereX;
      positions[i3 + 1] = sphereY;
      positions[i3 + 2] = sphereZ;

      initialPositions[i3] = sphereX;
      initialPositions[i3 + 1] = sphereY;
      initialPositions[i3 + 2] = sphereZ;

      const normalX = sphereX / RADIUS;
      const normalY = sphereY / RADIUS;
      const normalZ = sphereZ / RADIUS;

      velocities[i3] = normalX * PARTICLE_SPEED;
      velocities[i3 + 1] = normalY * PARTICLE_SPEED;
      velocities[i3 + 2] = normalZ * PARTICLE_SPEED;

      lifeTimes[i] = 0;
    }

    particleSystem.geometry.attributes.position.needsUpdate = true;
    particleSystem.geometry.attributes.initialPosition.needsUpdate = true;
    particleSystem.geometry.attributes.velocity.needsUpdate = true;
    particleSystem.geometry.attributes.lifeTime.needsUpdate = true;

    if (floatingGroup) {
      scene.remove(floatingGroup);
      floatingGroup.children.forEach((m) => {
        m.geometry.dispose();
        m.material.dispose();
      });
    }
    floatingGroup = new THREE.Group();
    scene.add(floatingGroup);

    spawnData = textures.map((tex, i) => {
      const φ = Math.random() * Math.PI * 2;
      const cosθ = 2 * Math.random() - 1;
      const θ = Math.acos(cosθ);
      const dir = new THREE.Vector3(
        Math.sin(θ) * Math.cos(φ),
        Math.cos(θ),
        Math.sin(θ) * Math.sin(φ)
      );
      const targetPos = dir.multiplyScalar(RADIUS + MARGIN);
      const delay = (i / textures.length) * SPIN_DURATION;
      return {
        tex,
        targetPos,
        spawnTime: spinStartTime + delay,
        mesh: null,
        startTime: null,
      };
    });
  });

  function updateParticles(dt) {
    if (!particleSystem.visible) return;

    const positions = particleSystem.geometry.attributes.position.array;
    const velocities = particleSystem.geometry.attributes.velocity.array;
    const lifeTimes = particleSystem.geometry.attributes.lifeTime.array;
    const colors = particleSystem.geometry.attributes.color.array;
    const initialPositions =
      particleSystem.geometry.attributes.initialPosition.array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      lifeTimes[i] += dt;

      if (lifeTimes[i] < PARTICLE_LIFE) {
        positions[i3] += velocities[i3] * dt;
        positions[i3 + 1] += velocities[i3 + 1] * dt;
        positions[i3 + 2] += velocities[i3 + 2] * dt;

        velocities[i3 + 1] -= 0.5 * dt;

        const alpha = Math.max(0.3, 1 - lifeTimes[i] / PARTICLE_LIFE);
        colors[i3] = alpha; // R
        colors[i3 + 1] = alpha; // G
        colors[i3 + 2] = alpha; // B
      } else {
        const phi = Math.random() * Math.PI * 2;
        const cosTheta = 2 * Math.random() - 1;
        const theta = Math.acos(cosTheta);

        const sphereX = Math.sin(theta) * Math.cos(phi) * RADIUS;
        const sphereY = Math.cos(theta) * RADIUS;
        const sphereZ = Math.sin(theta) * Math.sin(phi) * RADIUS;

        positions[i3] = sphereX;
        positions[i3 + 1] = sphereY;
        positions[i3 + 2] = sphereZ;

        initialPositions[i3] = sphereX;
        initialPositions[i3 + 1] = sphereY;
        initialPositions[i3 + 2] = sphereZ;

        lifeTimes[i] = 0;

        const normalX = sphereX / RADIUS;
        const normalY = sphereY / RADIUS;
        const normalZ = sphereZ / RADIUS;

        velocities[i3] = normalX * PARTICLE_SPEED;
        velocities[i3 + 1] = normalY * PARTICLE_SPEED;
        velocities[i3 + 2] = normalZ * PARTICLE_SPEED;
      }
    }

    particleSystem.geometry.attributes.position.needsUpdate = true;
    particleSystem.geometry.attributes.color.needsUpdate = true;
  }

  function animate(time) {
    requestAnimationFrame(animate);
    const now = time / 1000;
    const dt = now - lastTime;
    lastTime = now;

    if (isSpinning) {
      const elapsed = now - spinStartTime;
      screensGroup.rotation.y += SPIN_SPEED * dt;

      updateParticles(dt);

      if (elapsed >= SPIN_DURATION) {
        isSpinning = false;
        setTimeout(() => {
          particleSystem.visible = false;
        }, PARTICLE_LIFE * 1000);
      }

      spawnData.forEach((data) => {
        if (now >= data.spawnTime && !data.mesh) {
          const img = data.tex.image;
          const aspect = img.width && img.height ? img.width / img.height : 1;
          const geo = new THREE.PlaneGeometry(
            aspect * PLANE_HEIGHT,
            PLANE_HEIGHT
          );
          const mat = new THREE.MeshStandardMaterial({
            map: data.tex,
            side: THREE.DoubleSide,
            roughness: 0.3,
            metalness: 0.05,
            emissive: '#000000',
            emissiveIntensity: 0,
          });
          const m = new THREE.Mesh(geo, mat);
          m.position.copy(clickPoint);
          floatingGroup.add(m);
          data.mesh = m;
          data.startTime = now;
        }
      });
    }

    spawnData.forEach((data) => {
      if (data.mesh && data.startTime !== null) {
        const t = (now - data.startTime) / SPAWN_DURATION;
        const p = Math.min(Math.max(t, 0), 1);
        const ease = 1 - Math.pow(1 - p, 2);
        data.mesh.position.lerpVectors(clickPoint, data.targetPos, ease);
        data.mesh.lookAt(camera.position);
        if (p >= 1) data.startTime = null;
      }
    });

    if (!isSpinning && floatingGroup) {
      floatingGroup.rotation.y += 0.001;
      floatingGroup.children.forEach((m) => m.lookAt(camera.position));
    }

    controls.update();
    composer.render();
  }

  requestAnimationFrame(animate);
}
