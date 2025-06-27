import styled from '@emotion/styled';
import ScenePage from '../common/ScenePage';
import { SCENE_URLS } from './const';

const BassScene = () => {
  return (
    <BassSceneContainer>
      <ScenePage sceneUrl={SCENE_URLS.blue} />
      <GuideMessage>Click the bass !</GuideMessage>
    </BassSceneContainer>
  );
};

const BassSceneContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const GuideMessage = styled.span`
  ${({ theme }) => theme.fonts.header};
  position: absolute;
  left: 50%;
  bottom: 80px;
  transform: translateX(-50%);
  color: ${({ theme }) => theme.colors.white};
`;

export default BassScene;
