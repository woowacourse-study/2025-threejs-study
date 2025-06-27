import styled from '@emotion/styled';
import Banner from '../components/Banner';
import ResponsiveFlexGrid from '../components/common/ResponsiveFlexGrid';
import Header from '../components/Header';
import { PROFILES } from '../components/profile/consts';
import Profile from '../components/profile/Profile';
import { SCENE_CARDS } from '../components/sceneCard/consts';
import SceneCard from '../components/sceneCard/SceneCard';
import { useScrollToSection } from '../hooks/useScrollToSection';

const Main = () => {
  const {
    scenesRef,
    contributorsRef,
    scrollToScenes,
    scrollToContributors,
    scrollToTop,
  } = useScrollToSection();

  return (
    <>
      <Header
        onScrollToScenes={scrollToScenes}
        onScrollToContributors={scrollToContributors}
        onScrollToTop={scrollToTop}
      />
      <Container>
        <Banner />
        <ContentContainer>
          <ContentWrapper ref={scenesRef}>
            <ContentTitle>Scenes</ContentTitle>
            <ResponsiveFlexGrid
              RenderComponent={SceneCard}
              mappingData={SCENE_CARDS}
            />
          </ContentWrapper>
          <ContentWrapper ref={contributorsRef}>
            <ContentTitle>Contributors</ContentTitle>
            <ResponsiveFlexGrid
              RenderComponent={Profile}
              mappingData={PROFILES}
            />
          </ContentWrapper>
        </ContentContainer>
      </Container>
    </>
  );
};

export default Main;

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
  gap: 64px;
`;

const ContentTitle = styled.h2`
  ${({ theme }) => theme.fonts.header}
`;
