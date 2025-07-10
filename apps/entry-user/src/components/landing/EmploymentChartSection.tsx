import styled from '@emotion/styled';
import { JobRateLineImg, JobRatePieImg } from '../../assets';
import { colors } from '@entry/design-token';

export const EmploymentChartSection = () => {
  return (
    <Container>
      <ContentWrapper>
        <Title>
          <HighlightText>취업률</HighlightText>은 계속 성장세예요!
        </Title>
        <Subtitle>
          대덕소프트웨어마이스터고등학교 학생들은 10년 동안 취업률을 높여
          <br />
          다양한 기업에 취업하고 있습니다.
        </Subtitle>

        <ChartsContainer>
          <PieChartImage src={JobRatePieImg} alt="취업률 원형 차트" />
          <LineChartImage src={JobRateLineImg} alt="취업률 라인 차트" />
        </ChartsContainer>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 80px 0;
  background: transparent;

  @media (max-width: 768px) {
    padding: 50px 0;
  }

  @media (max-width: 480px) {
    padding: 40px 0;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1330px;
  margin: 0 auto;

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
  font-size: 45px;
  font-weight: 700;
  margin-bottom: 20px;
  color: ${colors.gray[500]};
  text-align: left;

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 26px;
  }
`;

const HighlightText = styled.span`
  color: ${colors.orange[800]};
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #888;
  line-height: 1.6;
  margin-bottom: 60px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 40px;
    br {
      display: none;
    }
  }

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 30px;
  }
`;

const ChartsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const PieChartImage = styled.img`
  max-width: 45%;
  height: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    max-width: 80%;
  }

  @media (max-width: 480px) {
    max-width: 90%;
  }
`;

const LineChartImage = styled.img`
  max-width: 49%;
  height: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    max-width: 80%;
  }

  @media (max-width: 480px) {
    max-width: 90%;
  }
`;
