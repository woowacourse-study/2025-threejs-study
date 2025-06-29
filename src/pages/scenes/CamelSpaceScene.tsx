import styled from '@emotion/styled';
import ScenePage from '../common/ScenePage';
import { SCENE_TITLES, SCENE_URLS } from './const';

const CamelSpaceScene = () => {
  return (
    <CamelSpaceSceneContainer>
      <ScenePage
        sceneUrl={SCENE_URLS.camelSpace}
        title={SCENE_TITLES.camelSpace}
      />
    </CamelSpaceSceneContainer>
  );
};

const CamelSpaceSceneContainer = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
`;

export default CamelSpaceScene;
