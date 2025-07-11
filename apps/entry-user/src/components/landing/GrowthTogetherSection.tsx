import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

interface GrowthTogetherSectionProps {
  backgroundImage: string;
}

export const GrowthTogetherSection = ({
  backgroundImage,
}: GrowthTogetherSectionProps) => {
  return (
    <Container backgroundImage={backgroundImage}>
      <ContentWrapper>
        <Title>성장할 수 있도록</Title>
        <Subtitle>
          <HighlightText>우리</HighlightText>가 도와드려요!
        </Subtitle>
        <Description>
          개발 학습을 위한 노트북 제공, 기숙사 무료운영, 학업장진을 위한 방과후
          운영 등
          <br />
          이외에도 여러가지 지원을 통해 학생이 학교에 적응하고 성장할 수 있는
          최적의 환경을 제공합니다.
        </Description>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div<{ backgroundImage: string }>`
  width: 100%;
  height: 500px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 130px;

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 350px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  padding: 0 100px;
  text-align: left;

  @media (max-width: 1200px) {
    padding: 0 80px;
  }

  @media (max-width: 768px) {
    padding: 0 40px;
  }

  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;

const Title = styled.h2`
  font-size: 44px;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${colors.gray[100]};
  text-align: left;

  @media (max-width: 768px) {
    font-size: 26px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

const Subtitle = styled.h3`
  font-size: 60px;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: left;
  color: ${colors.gray[100]};

  @media (max-width: 768px) {
    font-size: 42px;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    font-size: 32px;
    margin-bottom: 25px;
  }
`;

const HighlightText = styled.span`
  color: ${colors.orange[800]};
`;

const Description = styled.p`
  font-size: 17	px;
  line-height: 1.8;
  color: ${colors.gray[100]};
  max-width: 800px;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 1.6;
  }

  @media (max-width: 480px) {
    font-size: 14px;

    br {
      display: none;
    }
  }
`;
