import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import Main from '../pages/Main';
import BassScene from '../pages/scenes/BassScene';
import ScreensScene from '../pages/scenes/ScreensScene';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Main />,
  },
  {
    path: ROUTES.SCENES.BASS,
    element: <BassScene />,
  },
  {
    path: ROUTES.SCENES.SCREENS,
    element: <ScreensScene />,
  },
]);
