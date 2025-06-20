import { Link } from "react-router-dom";
import GithubIcon from "../assets/github-mark.svg";
import styled from "@emotion/styled";

const Header = () => {
  return (
    <HeaderContainer>
      <Navigator>
        <Link to={"/"}>Gallery</Link>
        <Link to={"/"}>AboutUs</Link>
      </Navigator>

      <Logo>
        <Link to={"/"}>Five.js</Link>
      </Logo>

      <ExternalLink>
        <img src={GithubIcon} alt="깃허브 아이콘" />
      </ExternalLink>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header(({ theme }) => ({
  padding: "30px 0",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  textAlign: "center",
  ...theme.fonts.subHeading,

  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
  userSelect: "none",
}));

const Navigator = styled.nav(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "24px",

  a: {
    padding: "4px",
    borderRadius: "4px",

    "&:hover": {
      transition: "background-color 0.2s ease",
      backgroundColor: theme.colors.gray1,
    },
  },
}));

const Logo = styled.nav`
  flex: 2;
`;

const ExternalLink = styled.div`
  flex: 1;
`;
