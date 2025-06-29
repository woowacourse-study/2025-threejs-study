import styled from '@emotion/styled';
import ScenePage from '../common/ScenePage';
import { SCENE_TITLES, SCENE_URLS } from './const';

const ScreensScene = () => {
  return (
    <ScreensSceneContainer>
      <ScenePage sceneUrl={SCENE_URLS.screens} title={SCENE_TITLES.screens} />
    </ScreensSceneContainer>
  );
};

const ScreensSceneContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default ScreensScene;
