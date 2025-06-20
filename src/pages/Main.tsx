import SceneCard from "../components/sceneCard/SceneCard";
import Profile from "../components/profile/Profile";
import { PROFILES } from "../components/profile/consts";
import Header from "../components/Header";
import Banner from "../components/Banner";
import styled from "@emotion/styled";
import { SCENE_CARDS } from "../components/sceneCard/consts";
import ResponsiveFlexGrid from "../components/common/ResponsiveFlexGrid";

const Test = () => {
  return (
    <>
      <Header />
      <Container>
        <Banner />
        <ContentContainer>
          <ContentWrapper>
            <ContentTitle>Scenes</ContentTitle>
            <ResponsiveFlexGrid
              Component={SceneCard}
              mappingData={SCENE_CARDS}
            />
          </ContentWrapper>
          <ContentWrapper>
            <ContentTitle>Contributors</ContentTitle>
            <ResponsiveFlexGrid Component={Profile} mappingData={PROFILES} />
          </ContentWrapper>
        </ContentContainer>
      </Container>
    </>
  );
};
export default Test;

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-bottom: 64px;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1440px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 144px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

const ContentTitle = styled.h2`
  ${({ theme }) => theme.fonts.header}
`;
