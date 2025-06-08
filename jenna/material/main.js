import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
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

const SCREEN_WIDTH = 5;
const SCREEN_HEIGHT = 3;
const RADIUS = 5;

const scene = new THREE.Scene();
scene.background = new THREE.Color('#00023a');

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = RADIUS * 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
scene.add(new THREE.AxesHelper(2 * RADIUS));
scene.add(new THREE.AmbientLight('#f2f2ff', 2.8));
const dirLight = new THREE.DirectionalLight('#ffffff', 2);
dirLight.position.set(5, 8, 5);
scene.add(dirLight);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const loader = new THREE.TextureLoader();
const textures = SCREEN_IMAGE.map((u) => loader.load(baseUrl + u));

function makePatch(texture, phiStart, phiLength, thetaStart, thetaLength) {
  // SphereGeometry 순서: (radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
  const geo = new THREE.SphereGeometry(
    RADIUS,
    1,
    1,
    phiStart,
    phiLength,
    thetaStart,
    thetaLength
  );
  const mat = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide,
    emissive: '#111111',
    roughness: 0.8,
  });
  return new THREE.Mesh(geo, mat);
}

const screensGroup = new THREE.Group();
const rows = Math.ceil((Math.PI * RADIUS) / SCREEN_HEIGHT);
const fullBands = rows + 2;
const unitTheta = Math.PI / fullBands;

for (let i = 1; i < fullBands - 1; i++) {
  const thetaStart = i * unitTheta;
  const thetaLength = unitTheta;

  const latitude = Math.sin(thetaStart + thetaLength / 2) * RADIUS;
  const cols = Math.ceil((2 * Math.PI * latitude) / SCREEN_WIDTH);
  if (cols < 1) continue;

  const phiLength = (2 * Math.PI) / cols;
  for (let j = 0; j < cols; j++) {
    const phiStart = j * phiLength;
    const texture = textures[(i * cols + j) % textures.length];

    const patch = makePatch(
      texture,
      phiStart,
      phiLength,
      thetaStart,
      thetaLength
    );
    screensGroup.add(patch);
  }
}

scene.add(screensGroup);

// ----------------------------------------------------
// 전역 변수: 현재 클릭된 패치 정보 + 모서리 정점 + 빔 배열
// ----------------------------------------------------
let floatingPatch = null;
let hitMesh = null;
let localVertices = []; // 클릭된 패치의 "로컬 정점(for corners)"
let beams = []; // Beam용 Mesh 배열

// 실린더(빔)용 기본 기하 객체 (높이=1, 반지름=0.02)
const beamGeom = new THREE.CylinderGeometry(0.02, 0.02, 1, 8);
const beamMat = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  transparent: true,
  opacity: 0.6,
});

// ----------------------------------------------------
// 클릭 이벤트: 패치를 복제해서 떠오르게(animateFloatingPatch) + 빔 생성
// ----------------------------------------------------
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(screensGroup.children, true);
  if (intersects.length === 0) return;

  const hit = intersects[0];
  hitMesh = hit.object; // 클릭된 원본 패치
  const hitFace = hit.face;
  if (!hitFace) return;

  // **클릭 위치(월드 좌표)**
  const worldHitPoint = hit.point.clone();
  //  screensGroup 기준 로컬 좌표
  const localHitPoint = screensGroup.worldToLocal(worldHitPoint);

  // **구 중심 → 클릭 위치** 방향
  const direction = localHitPoint.clone().normalize();
  const OFFSET = 2;
  // **떠오른 위치(로컬)** = 패치 표면 위치 + 방향×OFFSET
  const localOffset = localHitPoint
    .clone()
    .add(direction.multiplyScalar(OFFSET));

  // 기존 떠있던 패치와 빔 제거
  if (floatingPatch) {
    screensGroup.remove(floatingPatch);
    floatingPatch.geometry.dispose();
    floatingPatch.material.dispose();
    floatingPatch = null;
  }
  beams.forEach((b) => {
    scene.remove(b);
    b.geometry.dispose();
    b.material.dispose();
  });
  beams = [];
  localVertices = [];

  // **복제 패치 생성 (시작 위치=구 표면)**
  floatingPatch = hitMesh.clone();
  // 처음에는 바로 표면 위로 배치
  floatingPatch.position.copy(localHitPoint);
  floatingPatch.scale.set(0.1, 0.1, 0.1);
  screensGroup.add(floatingPatch);

  // 1) 클릭된 hitMesh에서 “4개 정점(local)”을 뽑아서 저장
  const posAttr = hitMesh.geometry.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(posAttr, i);
    localVertices.push(v.clone());
  }

  // 2) localVertices를 기반으로 빔 Mesh 4개 생성 (높이=1짜리 실린더)
  for (let i = 0; i < localVertices.length; i++) {
    // 실린더 기하 + 머티리얼 공유
    const beam = new THREE.Mesh(beamGeom, beamMat.clone());
    scene.add(beam);
    beams.push(beam);
  }

  // 3) 애니메이션 시작
  animateFloatingPatch(localHitPoint.clone(), localOffset.clone());
});

// ----------------------------------------------------
// 빔 업데이트 함수: 매 프레임마다 “원본 모서리 → 떠난 모서리”를 재계산하여 실린더 위치·회전·스케일 조정
// ----------------------------------------------------
function updateBeams() {
  if (!hitMesh || !floatingPatch) return;

  for (let i = 0; i < localVertices.length; i++) {
    // 로컬 정점을 이용하여 원본 패치 모서리(월드) 계산
    const origLocal = localVertices[i].clone();
    const worldOrig = hitMesh.localToWorld(origLocal.clone());

    // 같은 로컬 정점을 이용해서 떠오른 패치 모서리(월드) 계산
    const floatLocal = localVertices[i].clone();
    const worldFloat = floatingPatch.localToWorld(floatLocal.clone());

    // 방향 벡터 & 길이
    const dir = new THREE.Vector3().subVectors(worldFloat, worldOrig);
    const length = dir.length();

    // 실린더 중앙(중점) 좌표
    const midPoint = worldOrig.clone().add(
      dir
        .clone()
        .normalize()
        .multiplyScalar(length / 2)
    );

    // 빔(mesh) 가져오기
    const beam = beams[i];
    // 위치(지구 상의 중점)
    beam.position.copy(midPoint);
    // 높이 스케일: 원래 기하에서는 y축 길이가 1이므로, scale.y = 실제 길이로 하면 됨
    beam.scale.set(1, length, 1);

    // y축을 (0,1,0) 표준 방향으로 두고, dir 방향으로 회전
    const up = new THREE.Vector3(0, 1, 0);
    const quat = new THREE.Quaternion().setFromUnitVectors(
      up,
      dir.clone().normalize()
    );
    beam.setRotationFromQuaternion(quat);
  }
}

// ----------------------------------------------------
// animateFloatingPatch: 떠오르는 패치 보간 + 매 프레임 빔 업데이트
// ----------------------------------------------------
function animateFloatingPatch(startPos, targetPos) {
  const startTime = performance.now();
  const duration = 1000; // 1초

  function update() {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // 부드러운 easing (ease-out)
    const smoothProgress = 1 - Math.pow(1 - progress, 2);

    // 패치 위치 보간
    floatingPatch.position.lerpVectors(startPos, targetPos, smoothProgress);
    // 패치 스케일 보간 (0.1 → 1)
    const scaleVal = 0.1 + 0.9 * smoothProgress;
    floatingPatch.scale.set(scaleVal, scaleVal, scaleVal);

    // 매 프레임 빔 갱신
    updateBeams();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ----------------------------------------------------
// 리사이즈 대응
// ----------------------------------------------------
window.addEventListener('resize', () => {
  const W = window.innerWidth,
    H = window.innerHeight;
  renderer.setSize(W, H);
  camera.aspect = W / H;
  camera.updateProjectionMatrix();
  composer.setSize(W, H);
});

// ----------------------------------------------------
// 메인 애니메이션 루프: 구 회전 + 컨트롤 + 렌더링
// ----------------------------------------------------
function animate() {
  requestAnimationFrame(animate);
  screensGroup.rotation.y += 0.002;
  controls.update();
  updateBeams();

  composer.render();
}

animate();
