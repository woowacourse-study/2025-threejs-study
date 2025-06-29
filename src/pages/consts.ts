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
    name: 'Sangchu',
    imageSrc: 'https://avatars.githubusercontent.com/u/80993302?v=4',
    sceneUrl: 'https://github.com/sanghee01/',
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
    name: 'Jenna',
    imageSrc: 'https://avatars.githubusercontent.com/u/106021313?v=4',
    sceneUrl: 'https://github.com/JeLee-river/',
  },
];
