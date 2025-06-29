import styled from '@emotion/styled';
import ScenePage from '../common/ScenePage';
import { SCENE_URLS } from './const';

const ScreensScene = () => {
  return (
    <ScreensSceneContainer>
      <ScenePage sceneUrl={SCENE_URLS.jenna} />
    </ScreensSceneContainer>
  );
};

const ScreensSceneContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default ScreensScene;
