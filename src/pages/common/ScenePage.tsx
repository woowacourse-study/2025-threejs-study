import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import GoBackIcon from '../../assets/icons/ic_arrow_back.svg';
import { ROUTES } from '../../constants/routes';

interface ScenePageProps {
  sceneUrl: string;
  title: string;
  children?: React.ReactNode;
}

const ScenePage = ({ sceneUrl, title, children }: ScenePageProps) => {
  const navigate = useNavigate();
  const handleExit = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <ScenePageContainer>
      <SceneFrame src={sceneUrl} title={title} />
      <ExitButton onClick={handleExit} aria-label="뒤로가기">
        <Icon src={GoBackIcon} alt="뒤로가기 아이콘" />
        Exit
      </ExitButton>
      {children}
    </ScenePageContainer>
  );
};

const ScenePageContainer = styled.div`
   width: 100vw;
   height: 100vh;
   border: none;
`;

const SceneFrame = styled.iframe`
  width: 100%;
  height: 100%;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
`;

const ExitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: absolute;
  top: 40px;
  left: 40px;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.header};
  &:hover{
    transform: scale(1.05);
  }
`;

export default ScenePage;
