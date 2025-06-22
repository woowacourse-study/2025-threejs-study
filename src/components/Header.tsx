import GithubIcon from '../assets/github-mark.svg';
import styled from '@emotion/styled';

interface HeaderProps {
  onScrollToScenes: () => void;
  onScrollToContributors: () => void;
  onScrollToTop: () => void;
}

export const HEADER_HEIGHT = 92;

const Header = ({
  onScrollToScenes,
  onScrollToContributors,
  onScrollToTop,
}: HeaderProps) => {
  return (
    <HeaderContainer>
      <Navigator>
        <NavButton onClick={onScrollToScenes}>Gallery</NavButton>
        <NavButton onClick={onScrollToContributors}>AboutUs</NavButton>
      </Navigator>

      <Logo>
        <button type="button" onClick={onScrollToTop}>
          Five.js
        </button>
      </Logo>
      <ExternalLink
        href="https://github.com/woowacourse-study/2025-threejs-study"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={GithubIcon} alt="깃허브 아이콘" />
      </ExternalLink>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header(({ theme }) => ({
  position: 'fixed',
  width: '100%',
  height: `${HEADER_HEIGHT}px`,

  padding: '0 12px',
  zIndex: 1000,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  textAlign: 'center',
  ...theme.fonts.subHeading,

  backgroundColor: '#ffffff80',
  backdropFilter: 'blur(10px)',

  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
  WebkitBackdropFilter: 'blur(10px)',
}));

const Navigator = styled.nav`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const NavButton = styled.button(({ theme }) => ({
  padding: '4px',
  borderRadius: '4px',

  '&:hover': {
    transition: 'background-color 0.2s ease',
    backgroundColor: theme.colors.gray1,
  },
}));

const Logo = styled.nav`
  flex: 2;
`;

const ExternalLink = styled.a`
  flex: 1;
`;
