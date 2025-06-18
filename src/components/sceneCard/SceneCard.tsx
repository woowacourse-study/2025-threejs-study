import styled from "@emotion/styled";
import { handleImageError } from "../../util/handleImageError";
import fallbackImage from "../../assets/fallback-image.png";

interface SceneCardProps {
  imageSrc: string;
  name: string;
}

const SceneCard = ({ imageSrc, name }: SceneCardProps) => {
  return (
    <SceneCardContainer>
      <SceneCardImage
        src={imageSrc}
        onError={(e) => handleImageError(e, fallbackImage)}
      />
      <SceneName>{name}</SceneName>
    </SceneCardContainer>
  );
};

const SceneCardContainer = styled.div`
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
`;

const SceneName = styled.h3`
  font-size: ${({ theme }) => theme.fonts.body.fontSize};
  font-weight: ${({ theme }) => theme.fonts.body.fontWeight};
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
`;

export default SceneCard;
