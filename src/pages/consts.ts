import { ROUTES } from '../constants/routes';

type SceneCards = {
  id: string;
  name: string;
  imageSrc: string;
  sceneUrl: string;
};

export const SCENE_CARDS: SceneCards[] = [
  {
    id: 'hanheel',
    name: 'bass',
    imageSrc: '/thumbnail/bass.png',
    sceneUrl: ROUTES.SCENES.BASS,
  },
  {
    id: 'sanghee01',
    name: 'sangchu',
    imageSrc: '/thumbnail/sangchu.png',
    sceneUrl: ROUTES.SCENES.SANGCHU,
  },
  {
    id: 'dev-dino22',
    name: 'camel space',
    imageSrc: '/thumbnail/camel.png',
    sceneUrl: ROUTES.SCENES.CAMEL_SPACE,
  },
  {
    id: 'Daeun-100',
    name: 'card orbit',
    imageSrc: '/thumbnail/card-orbit.png',
    sceneUrl: ROUTES.SCENES.CARD_ORBIT,
  },
  {
    id: 'JeLee-river',
    name: 'screens',
    imageSrc: '/thumbnail/screens.png',
    sceneUrl: ROUTES.SCENES.SCREENS,
  },
];
