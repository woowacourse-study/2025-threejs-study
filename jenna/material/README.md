# Three.js 스터디

## 🧩 스터디 개요

- **스터디 목표 :** 부담없이 새로운 툴 접해보기
- **스터디 일정** : 월요일 15:00~16:00
  - **과제 제출 날짜** : 스터디 전까지 깃허브 제출 / 슬랙에 깃허브 링크
- **스터디 방식** : 문서를 통한 개인 학습 + 간단한 예제 진행 + 스터디 시간에 코드 설명

## 🧩 스터디 일정

| 주제                        | 날짜                    | 학습 목표                                                                                                                        | 읽을 문서                                                                                                                                                                                                                                                                                                       | 예제                                                                                                             |
| --------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Three.js 기본 설정          | 04/22 (화) ~ 04/28 (월) | - Three.js의 역할과 구조 이해<br>- 개발 환경 세팅 (Vite 등)<br>- 기본 Scene, Camera, Renderer 구성                               | [installation](https://threejs.org/manual/#en/installation)<br>[creating-a-scene](https://threejs.org/manual/#en/creating-a-scene)<br>선택 사항) [WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer)                                                                                      | - "회색 배경에 파란색 큐브 하나 띄우기"<br>(카메라는 큐브를 정면에서 바라보게)                                   |
| Mesh, Geometry, Material    | 04/29 (화) ~ 05/05 (월) | - Mesh란 무엇인가<br>- Geometry 종류 살펴보기 (Box, Sphere 등)<br>- Material 종류 기본 (MeshBasicMaterial, MeshStandardMaterial) | [Mesh](https://threejs.org/docs/#api/en/objects/Mesh)<br>[BoxGeometry](https://threejs.org/docs/#api/en/geometries/BoxGeometry)<br>[MeshBasicMaterial](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial)<br>[MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial) | - "다양한 Material을 적용한 여러 개의 도형 만들기"<br>(Box, Sphere, Cone 등 3개 만들고, 각각 다른 Material 사용) |
| 조명 (Light)                | 05/06 (화) ~ 05/12 (월) | - Light 종류 이해하기 (Ambient, Directional, Point Light)<br>- 빛과 그림자의 관계                                                | [Light](https://threejs.org/docs/#api/en/lights/Light)<br>[AmbientLight](https://threejs.org/docs/#api/en/lights/AmbientLight)<br>[DirectionalLight](https://threejs.org/docs/#api/en/lights/DirectionalLight)                                                                                                  | - "Directional Light를 사용해 입체감을 준 씬 만들기"<br>(큐브를 두고, 빛 방향을 조정해 그림자가 보이게)          |
| 카메라 조작 (OrbitControls) | 05/13 (화) ~ 05/19 (월) | - 카메라 움직임 추가하기<br>- 사용자의 시점을 조작할 수 있게 하기                                                                | [PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)<br>[OrbitControls](https://threejs.org/examples/#controls/OrbitControls)                                                                                                                                                        | - "큐브를 중심으로 카메라를 회전시켜볼 수 있게 만들기"<br>(OrbitControls 적용만 해도 충분)                       |
| 텍스처와 맵핑               | 05/20 (화) ~ 05/26 (월) | - 텍스처 이미지 적용하기<br>- 기본 UV 맵핑 개념 이해                                                                             | [Texture](https://threejs.org/docs/#api/en/textures/Texture)<br>[MeshBasicMaterial.map](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial.map)                                                                                                                                                       | - "나만의 이미지를 큐브에 입혀보기"<br>(예: 고양이, 하늘 사진 등)                                                |
| 애니메이션 (Animation Loop) | 05/27 (화) ~ 06/02 (월) | - requestAnimationFrame 이해<br>- 객체 회전, 이동 등 간단한 애니메이션                                                           | [Creating-a-scene](https://threejs.org/manual/#en/introduction/Creating-a-scene)<br>선택 사항) [Clock](https://threejs.org/docs/#api/en/core/Clock)                                                                                                                                                             | - "큐브가 천천히 회전하는 애니메이션 만들기"<br>(자동으로 계속 기준 회전)                                        |
| 나만의 작은 씬 만들기       | 06/03 (화) ~ 06/09 (월) | - 그동안 배운 내용을 모두 활용<br>- 한 화면에 다양한 요소 배치                                                                   | [Scene](https://threejs.org/examples/Scene)                                                                                                                                                                                                                                                                     | - "나만의 작은 씬 만들기"<br>(3개 이상의 물체, 조명 적용, 카메라 조작 가능, 애니메이션 최소 1개)                 |

## 🧩 스터디원

<table >
  <tr >
    <td align="center" width="200px" >
      <a href="https://github.com/hanheel"><img src="https://avatars.githubusercontent.com/u/168459001?v=4"/></a>
    </td>
     <td align="center" width="200px" >
      <a href="https://github.com/sanghee01"><img src="https://avatars.githubusercontent.com/u/80993302?v=4"/></a>
    </td>
    <td align="center" width="200px" >
      <a href="https://github.com/dev-dino22"><img src="https://avatars.githubusercontent.com/u/141295691?v=4"/></a>
    </td>
    <td align="center" width="200px" >
      <a href="https://github.com/Daeun-100
"><img src="https://avatars.githubusercontent.com/u/141714293?v=4"/></a>
    </td>
    <td align="center" width="200px" >
      <a href="https://github.com/JeLee-river
"><img src="https://avatars.githubusercontent.com/u/106021313?v=4"/></a>
    </td>
   
  </tr>
  <tr>
    <td align="center" width="200px" >
      <a href="https://github.com/hanheel/"><strong>블루</strong></a>
    </td>
       <td align="center" width="200px" >
      <a href="https://github.com/sanghee01/"><strong>상추</strong></a>
    </td>
    <td align="center" width="200px" >
      <a href="https://github.com/dev-dino22/"><strong>카멜</strong></a>
    </td>
    <td align="center" width="200px" >
      <a href="https://github.com/Daeun-100
/"><strong>다이앤</strong></a>
    </td>
    <td align="center" width="200px" >
      <a href="https://github.com/JeLee-river/"><strong>제나</strong></a>
    </td>
    
  </tr>
</table>
