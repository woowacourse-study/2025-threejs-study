import * as THREE from "three";

export const createRaycasterControls = (scene, camera, onObjectClick) => {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const onMouseClick = (event) => {
    // 마우스 위치를 정규화된 장치 좌표로 변환
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Raycaster 업데이트
    raycaster.setFromCamera(mouse, camera);

    // 씬의 모든 오브젝트와 교차 검사
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      // 가장 가까운 오브젝트 찾기
      const object = intersects[0].object;

      // 부모 오브젝트를 찾아서 이름 확인
      let parent = object;
      while (parent.parent && parent.parent !== scene) {
        parent = parent.parent;
      }

      // 클릭된 오브젝트 이름 전달
      onObjectClick(parent.name);
    }
  };

  window.addEventListener("click", onMouseClick);

  return () => {
    window.removeEventListener("click", onMouseClick);
  };
};
