import styled from '@emotion/styled';
import { handleImageError } from '../../util/handleImageError';
import fallbackImage from '../../assets/fallback-image.png';

interface SceneCardProps {
  imageSrc: string;
  name: string;
  sceneUrl: string;
}

const SceneCard = ({ imageSrc, name, sceneUrl }: SceneCardProps) => {
  return (
    <SceneCardContainer>
      <a href={sceneUrl} target="_blank" rel="noopener noreferrer">
        <SceneCardImage
          src={imageSrc}
          alt={`${name} 썸네일`}
          onError={(e) => handleImageError(e, fallbackImage)}
        />
      </a>
      <a href={sceneUrl} target="_blank" rel="noopener noreferrer">
        <SceneName>{name}</SceneName>
      </a>
    </SceneCardContainer>
  );
};

const SceneCardContainer = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 56px;
`;

const SceneCardImage = styled.img`
  max-width: 330px;
  width: 100%;
  height: 400px;
  object-fit: cover;
  cursor: pointer;
  box-shadow: -3px 3px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const SceneName = styled.figcaption`
  ${({ theme }) => theme.fonts.body}
  cursor: pointer;
`;

export default SceneCard;
