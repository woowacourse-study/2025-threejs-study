import styled from '@emotion/styled';

const Banner = () => {
  return (
    <BannerContainer>
      <SubTitle>woowahan-three-js products.</SubTitle>
    </BannerContainer>
  );
};

export default Banner;

const BannerContainer = styled.section`
  width: 100%;
  padding: 194px 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubTitle = styled.h2(({ theme }) => ({
  width: '332px',

  textAlign: 'center',
  whiteSpace: 'wrap',
  ...theme.fonts.header,
}));
