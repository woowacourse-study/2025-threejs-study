import styled from '@emotion/styled';

type ProfileProps = {
  name: string;
  imgUrl: string;
  linkUrl: string;
};

const Profile = ({ name, imgUrl, linkUrl }: ProfileProps) => {
  return (
    <ProfileContainer>
      <ProfileLink href={linkUrl} target="_blank" rel="noopener noreferrer">
        <ProfileImage src={imgUrl} alt="Profile" />
      </ProfileLink>
      <ProfileNameContainer>
        <ProfileName href={linkUrl} target="_blank" rel="noopener noreferrer">
          {name}
        </ProfileName>
      </ProfileNameContainer>
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 301px;
  justify-content: space-between;
  text-decoration: none;
  color: inherit;
`;

const ProfileLink = styled.a`
  display: inline-block;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 50%;
  clip-path: circle(50% at 50% 50%);
  cursor: pointer;
`;

const ProfileNameContainer = styled.div`
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.fonts.subHeading};
`;

const ProfileName = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;
