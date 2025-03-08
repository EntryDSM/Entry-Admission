import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { AnimationBox, SlideImg } from '@entry/ui';

export const MouImgSlide = () => {
  return (
    <Container>
      <AnimationBox>
        {SlideImg.filter((_, index) => index < 6).map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </AnimationBox>
      <AnimationBox rotate="left">
        {SlideImg.filter((_, index) => index >= 6 && index < 12).map(
          (item, index) => (
            <div key={index}>{item}</div>
          )
        )}
      </AnimationBox>
      <AnimationBox>
        {SlideImg.filter((_, index) => index >= 12).map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </AnimationBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.extra.white};
`;
