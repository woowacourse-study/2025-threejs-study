import styled from '@emotion/styled';

type ProfileProps = {
  name: string;
  imgUrl: string;
  linkUrl: string;
};

const Profile = ({ name, imgUrl, linkUrl }: ProfileProps) => {
  return (
    <ProfileContainer href={linkUrl} target="_blank" rel="noopener noreferrer">
      <ProfileImage src={imgUrl} alt="Profile" />
      <ProfileName>{name}</ProfileName>
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.a`
  display: flex;
  flex-direction: column;
  width: 262px;
  height: 312px;
  justify-content: space-between;
  text-decoration: none;
  color: inherit;
  box-sizing: border-box;
  padding: 6px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray1};
  }
`;

const ProfileImage = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 50%;
`;

const ProfileName = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: inherit;
`;
