import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import Main from '../pages/Main';
import ScenePage from '../pages/ScenePage';
import { SCENE_URLS } from './routerConstants';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Main />,
  },
  {
    path: ROUTES.SCENES.BASS,
    element: <ScenePage sceneUrl={SCENE_URLS.blue} />,
  },
]);
