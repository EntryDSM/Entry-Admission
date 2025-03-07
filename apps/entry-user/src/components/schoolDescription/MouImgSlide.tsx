import styled from '@emotion/styled';
import { colors, Flex } from '@entry/design-token';
import { AnimationBox, SlideImg } from '@entry/ui';

export const MouImgSlide = () => {
  return (
    <Container>
      <AnimationBox>
        {SlideImg.map((item, index) => {
          if (index <= 6) {
            return <div key={index}>{item}</div>;
          }
        })}
      </AnimationBox>
      <AnimationBox rotate="left">
        {SlideImg.map((item, index) => {
          if (index >= 6 && index < 12) {
            return <div key={index}>{item}</div>;
          }
        })}
      </AnimationBox>
      <AnimationBox>
        {SlideImg.map((item, index) => {
          if (index >= 12) {
            return <div key={index}>{item}</div>;
          }
        })}
      </AnimationBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.extra.white};
`;
