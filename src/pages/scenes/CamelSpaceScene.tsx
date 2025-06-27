import styled from '@emotion/styled';
import ScenePage from '../common/ScenePage';
import { SCENE_URLS } from './const';

const CamelSpaceScene = () => {
  return (
    <CamelSpaceSceneContainer>
      <ScenePage sceneUrl={SCENE_URLS.camelSpace} />
    </CamelSpaceSceneContainer>
  );
};

const CamelSpaceSceneContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default CamelSpaceScene;
