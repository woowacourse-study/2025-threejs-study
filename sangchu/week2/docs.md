# 학습 내용

# Three

```jsx
import * as THREE from "three";
```

- `as THREE:` three라는 라이브러리 안에 있는 모든 것을 THREE라는 이름으로 사용하겠다는 약속
- `“three”:` 3D 그래픽을 쉽게 만들 수 있게 도와주는 **Three.js** 라이브러리

# Scene

```jsx
const scene = new THREE.Scene();
```

- `new THREE.Scene()`: 새로운 **씬(Scene)** 객체를 만드는 코드
- Scene: 3D 세계의 모든 것을 담는 컨테이너(Container)와 같음. 여기에 3D 객체, 카메라, 광원 등을 모두 넣고 관리

# Camera

```jsx
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
```

- `new THREE.PerspectiveCamera(...)`: 새로운 **카메라(Camera)** 객체를 만드는 코드
- PerspectiveCamera: 원근법이 적용된 카메라
  - 사람 눈처럼 멀리 있는 것은 작게, 가까이 있는 것은 크게 보임
  - 괄호 안의 숫자들은 카메라의 설정 값
    1. 시야각
    2. 화면 비율( 렌더링될 화면의 가로세로 비율, 보통 웹 페이지의 현재 창 크기 비율을 사용)
    3. 가까이 보이는 최소 거리
    4. 멀리 보이는 최대 거리

# Renderer

```jsx
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x808080);
document.body.appendChild(renderer.domElement);
```

- `new THREE.WebGLRenderer()` : 새로운 **렌더러(Renderer)** 객체를 만드는 코드
  - renderer: 3D 씬을 2D 화면에 **그려주는(Rendering)** 역할
  - WebGLRenderer: 웹 브라우저의 WebGL 기술을 사용하여 3D 그래픽을 고성능으로 그려줌
  - `antialias` 옵션: true를 주면 계단현상 줄여줌
- `setSize` : 렌더러가 그림을 그릴 캔버스(Canvas)의 크기를 설정
- `setClearColor`: 씬을 그리기 전에 배경을 특정 색으로 채움
- `renderer.domElement`
  - 렌더러가 그림을 그리는 결과물은 HTML <canvas> 요소
  - 이 코드는 그 <canvas> 요소를 웹 페이지의 <body> 안에 추가하여 눈으로 볼 수 있게 만듦

# geometry

- geometry: 3D 객체의 **모양(Shape)**, 즉 구조(Structure)를 정의하는 객체를 담을 변수
  - 정점(Vertex, 꼭짓점), 면(Face) 등의 정보가 들어있음
- geometry
  - BufferGeometry의 인스턴스이며 객체의 구조를 정의.
  - Mesh 생성자에 필요

## BoxGeometry

```jsx
const geometry = new THREE.BoxGeometry(1, 1, 1);
```

- `BoxGeometry` : Three.js에서 기본으로 제공하는 정육면체 모양의 구조.
- `new THREE.BoxGeometry(1, 1, 1)` : 새로운 **Geometry** 객체를 만듦.
  - 가로, 세로, 깊이 길이를 각각 1로 설정

## SphereGeometry

```jsx
const sphereGeometry = new THREE.SphereGeometry(0.75, 32, 16);
```

- `new THREE.SphereGeometry(0.75, 32, 16)`: 반지름, 가로 분할 수, 세로 분할 수

## ConeGeometry

```jsx
const coneGeometry = new THREE.ConeGeometry(0.7, 1, 32);
```

- `new THREE.ConeGeometry(0.7, 1, 32)`: 밑면 반지름, 높이, 방사 분할 수

# material

## MeshBasicMaterial

- material: 3D 객체의 **외형(Appearance)**을 정의하는 객체를 담을 변수
- material
  - Material 기반 클래스에서 파생된 인스턴스 또는 배열이며 객체의 외형을 정의
  - Mesh 생성자에 필요
  - 기본값은 MeshBasicMaterial

## MeshBasicMaterial

```jsx
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
```

- `new THREE.MeshBasicMaterial(...)` : 새로운 **재질(Material)** 객체를 만듦
- `MeshBasicMaterial`: 가장 기본적인 재질로, 빛의 영향을 받지 않고 단순히 정해진 색으로 보이는 재질
- `color`: 이 재질의 색상을 설정

## MeshStandardMaterial

```jsx
const standardMaterialRed = new THREE.MeshStandardMaterial({
  color: 0xff0000, // 빨간색
  metalness: 0.1, // 금속성
  roughness: 0.8, // 거칠기
});
```

- **물리 기반 렌더링(PBR)**을 사용하며 **빛의 영향**을 받음 → **광원**을 추가해야함
- MeshBasicMaterial보다 **더 사실적인 결과**를 제공하지만, 계산 비용이 더 많이 듦
- 생성자 역시 매개변수 객체를 받음(속성이 다양함)
  - color: 색깔
  - metalness: 금속성
  - roughness: 거칠기

### AmbientLight

```jsx
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 색상, 강도
scene.add(ambientLight);
```

- 주변광(AmbientLight): 모든 객체에 균등하게 빛을 비춤. 그림자는 생기지 않음
- 색상, 강도 지정

### DirectionalLight

```jsx
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // 색상, 강도
directionalLight.position.set(5, 5, 5); // 빛의 위치 설정
scene.add(directionalLight);
```

- 방향광(DirectionalLight): 특정 방향에서 오는 빛을 나타냄(태양 빛처럼)
- 색상, 강도 지정
- `position.set`: 빛의 위치 설정

# Texture

- 객체에 시각적인 디테일과 사실감을 더해줌
- 기본적으로 이미지를 객체의 표면에 매핑하는 것임속성
- `.map`**:** 객체의 **기본 색상 또는 패턴**을 정의하는 데 사용되는 **컬러 맵(Color Map)** 또는 **알베도 맵(Albedo Map)** 역할
  - MeshStandardMaterial: .map 속성에 할당된 텍스처의 색상은 재질의 기본 .color 속성과 함께 변조되어 최종 색상이 결정됨
  - MeshBasicMaterial: .map 속성이 기본 색상 역할
- 텍스처를 객체에 적용하기 위한 과정
  1. **텍스처 이미지 파일 준비:** 사용할 이미지 파일(.jpg, .png 등)이 필요합니다.
  2. **`THREE.TextureLoader` 사용:** Three.js에서 제공하는 TextureLoader 객체를 사용하여 이미지 파일을 웹에서 비동기적으로 로드합니다.
  3. **Material의 `.map` 속성에 할당:** 로드된 Texture 객체를 해당 Mesh에 사용될 Material의 .map 속성에 할당합니다.
- 다양한 텍스처 맵을 사용하여 표면의 특성을 더욱 세밀하게 제어할 수 있음
  - 텍스처 맵 종류
    - .alphaMap: 투명도를 제어하는 맵
    - .aoMap: 앰비언트 오클루전(주변광 차폐) 효과를 위한 맵
    - .bumpMap: 표면에 깊이감을 주지만 실제 지오메트리를 변경하지 않는 범프 맵
    - .displacementMap: 실제 버텍스 위치를 이동시켜 지오메트리를 변경하는 디스플레이스먼트 맵
    - .emissiveMap: 자체 발광하는 부분을 표현하는 맵
    - .envMap: 환경 반사/굴절을 위한 환경 맵
    - .lightMap: 미리 구워진 라이트 정보를 표현하는 맵
    - .metalnessMap: 금속성을 제어하는 맵
    - .normalMap: 표면의 노멀 방향을 변경하여 세부적인 조명 효과를 내는 노멀 맵
    - .roughnessMap: 거칠기를 제어하는 맵
  - (Mesh별로 사용할수 있는 텍스처 맵이 좀 다른가?)

```jsx
const textureLoader = new THREE.TextureLoader();
```

- Three.js에서 텍스처를 로드하기 위한 인스턴스 생성

```jsx
textureLoader.load(
  "./public/texture2.jpg",
  function (texture) {
    console.log("텍스처 로드 성공:", texture);

    if (standardMaterialRed) {
      standardMaterialRed.map = texture;
      standardMaterialRed.needsUpdate = true;

      console.log("Sphere에 텍스처 적용 완료!");
    } else {
      console.error(
        "Sphere Material을 찾을 수 없습니다. 텍스처를 적용할 수 없습니다."
      );
    }
  },
  undefined,
  function (err) {
    console.error("텍스처 로드 중 오류 발생:", err);
  }
);
```

- 첫 번째 인자: **로드할 이미지 파일의 경로**
- 두 번째 인자: **이미지 로딩이 성공적으로 완료되었을 때 실행될 콜백 함수**
  - 로드된 THREE.Texture 객체를 인자로 받고,`.map` 속성에 할당
  - `needsUpdate = true`: Material의 속성이 변경되었음을 Three.js 렌더러에게 알려주는 역할
    - .map을 처음 할당할 때는 자동으로 업데이트되는 경우도 있지만, 안전을 위해 추가하는 것이 좋음
- 세 번째 인자: 로딩 진행 상황을 알리는 콜백 (선택 사항)
- 네 번째 인자: 로딩 실패 시 호출될 콜백 함수 (선택 사항)

# Mesh

```jsx
const cube = new THREE.Mesh(geometry, material);
```

- cube: 이제 실제로 화면에 보일 3D 객체, 즉 **메쉬(Mesh)**를 담을 변수
- `new THREE.Mesh(geometry, material)` : 새로운 **메쉬(Mesh)** 객체를 만듦
  - **지오메트리(geometry)**와 **재질(material)**을 합쳐서 만들어지는 최종 3D 객체
- Mesh는 혼자서는 존재할 수 없고, 반드시 어떤 **형태 (Geometry)**로 만들어지고 어떤 **외관 (Material)**을 가질지를 정의받아야만 완성된 3D 객체로 기능

```jsx
scene.add(cube);
```

- `scene.add(cube);` : 이전에 만든 씬(scene)에 새로운 객체를 추가하는 메소드

```jsx
camera.position.z = 5;
```

- `camera.position` : 카메라 객체의 현재 위치를 나타내는 속성
- 기본적으로 카메라와 객체는 원점(0, 0, 0)에 위치
  - Three.js의 기본 설정에서 z축 양의 방향은 화면에서 멀어지는 방향
  - 카메라를 z축 방향으로 5만큼 뒤로 물리면 원점에 있는 객체를 카메라가 볼 수 있게 됨

```jsx
renderer.render(scene, camera);
```

- `renderer.render(...)` : 렌더러에게 그림을 그리도록 명령하는 메소드
- `(scene, camera)`: 어떤 씬(scene)을 어떤 카메라(camera)의 시점으로 그릴 것인지 지정
- 렌더러가 씬에 있는 모든 객체들을 카메라 시점에서 계산하여 2D 이미지로 만들어 웹 페이지의 캔버스에 표시
