# 👋🏻 Five.js 
: 우아한테크코스 7기 프론트엔드 크루들이 모여, React와 Three.js를 활용해 3D 씬을 웹에서 인터랙티브하게 구현한 프로젝트입니다.


## 🚀 Try it out

[https://five-js.vercel.app](실제배포링크로변경예정)



## 🎬 Scenes
각 팀원이 구현한 3D 씬과 그에 따른 인터랙션을 소개합니다.

| 제작자 | 씬 | 인터렉션 |
|:--:|:--:|:-----|
| **블루**<br>[@hanheel](https://github.com/hanheel) | <img src="https://github.com/user-attachments/assets/e4d4ab75-44d5-4d3b-ab5f-a67ad7ea8945" width="300"/> <br> 🎵 **Bass** | 줄 클릭 시 진동 + 사운드 + 음표 표출 |
| **상추**<br>[@sanghee01](https://github.com/sanghee01) | <img src="https://github.com/user-attachments/assets/d35f7a48-877a-465b-8987-a08e0ae46d05" width="300"/> <br> 🛰 **Sangchu** | 클릭 시 회전 애니메이션 + 사운드 + 말풍선 |
| **다이앤**<br>[@Daeun-100](https://github.com/Daeun-100) | <img src="https://github.com/user-attachments/assets/13cc5e79-305d-48b1-9419-d3c7d8cf29da" width="300"/> <br> 🪐 **Card Orbit** | 클릭 시 회전 및 빛 방출 |
| **카멜**<br>[@dev-dino22](https://github.com/dev-dino22) | <img src="https://github.com/user-attachments/assets/41932716-6b18-4533-9452-2d78cb27ac9b" width="300"/> <br> 🐫 **Camel Space** | 내부 오브젝트 접근 및 말풍선 생성 |
| **제나**<br>[@JeLee-river](https://github.com/JeLee-river) | <img src="https://github.com/user-attachments/assets/4cf99da7-3ea7-45b0-8044-3576861a0eaf" width="300"/> <br> 🌌 **Screens** | 클릭 시 장면 이미지들이 스크린 주변에 생성 |



## 📁 폴더 구조
```bash
src/
├── assets       # 정적 자산 (이미지, GLB 모델 등)
├── components   # 공통 UI 컴포넌트
├── constants    # 라우팅 등 전역 상수 모음
├── hooks        # 커스텀 React 훅
├── pages        # 라우팅되는 페이지 컴포넌트
│   ├── common   # 공통 페이지 (e.g., 씬 래퍼 등)
│   └── scenes   # 각 Three.js 씬 페이지
├── router       # 라우터 설정
├── styles       # 글로벌 스타일, 테마 설정
├── util         # 유틸리티 함수 모음
```


## ⚙️ 설치 및 실행

```bash
git clone https://github.com/your-org/five-js.git
npm install
npm run dev
```


## 👥 Contributors
| | | |
|:--:|:--:|:--:|
| [![Blue](https://avatars.githubusercontent.com/u/168459001?v=4)](https://github.com/hanheel)<br>[**Blue**](https://github.com/hanheel) | [![Sangchu](https://avatars.githubusercontent.com/u/80993302?v=4)](https://github.com/sanghee01)<br>[**Sangchu**](https://github.com/sanghee01) | [![Camel](https://avatars.githubusercontent.com/u/141295691?v=4)](https://github.com/dev-dino22)<br>[**Camel**](https://github.com/dev-dino22) |
| [![Diane](https://avatars.githubusercontent.com/u/141714293?v=4)](https://github.com/Daeun-100)<br>[**Diane**](https://github.com/Daeun-100) | [![Jenna](https://avatars.githubusercontent.com/u/106021313?v=4)](https://github.com/JeLee-river)<br>[**Jenna**](https://github.com/JeLee-river) |  |
