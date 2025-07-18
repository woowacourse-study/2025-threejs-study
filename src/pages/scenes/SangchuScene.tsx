import styled from '@emotion/styled';
import ScenePage from '../common/ScenePage';
import { SCENE_TITLES, SCENE_URLS } from './const';

const SangchuScene = () => {
  return (
    <SanchuSceneContainer>
      <ScenePage sceneUrl={SCENE_URLS.sangchu} title={SCENE_TITLES.sangchu} />
    </SanchuSceneContainer>
  );
};

const SanchuSceneContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default SangchuScene;
