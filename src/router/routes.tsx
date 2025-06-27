import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import Main from '../pages/Main';
import BassScene from '../pages/scenes/BassScene';
import CamelSpaceScene from '../pages/scenes/CamelSpaceScene';

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
    path: ROUTES.SCENES.CAMEL_SPACE,
    element: <CamelSpaceScene />,
  },
]);
