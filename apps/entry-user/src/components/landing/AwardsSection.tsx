import styled from '@emotion/styled';
import {
  Award1,
  Activity1,
  Activity2,
  Activity3,
  Activity4,
} from '../../assets/landing/award';
import { colors } from '@entry/design-token';

export const AwardsSection = () => {
  const awards = [
    {
      image: Activity1,
      year: '2024년',
      title: '임베디드 경진대회',
    },
    {
      image: Activity2,
      year: '2024년',
      title: 'stac',
    },
    {
      image: Activity3,
      year: '2024년',
      title: '유성구청 리빙랩',
    },
    {
      image: Activity4,
      year: '2024년',
      title: '르완다 교류',
    },
  ];

  return (
    <Container>
      <Title>
        다양한 <Highlight>대외 활동</Highlight>도 진행합니다!
      </Title>
      <AwardsGrid>
        {awards.map((award, index) => (
          <AwardCard key={index}>
            <AwardImage src={award.image} alt={award.title} />
            <AwardInfo>
              <Year>{award.year}</Year>
              <AwardTitle>{award.title}</AwardTitle>
            </AwardInfo>
          </AwardCard>
        ))}
      </AwardsGrid>
    </Container>
  );
};

const Container = styled.div`
  padding: 80px 100px;

  @media (max-width: 1200px) {
    padding: 60px 80px;
  }

  @media (max-width: 768px) {
    padding: 40px 40px;
  }

  @media (max-width: 480px) {
    padding: 30px 20px;
  }
`;

const Title = styled.h2`
  font-size: 42px;
  font-weight: 700;
  color: ${colors.gray[500]};
  text-align: left;
  margin: 0 0 90px 0;

  @media (max-width: 768px) {
    font-size: 32px;
    margin-bottom: 40px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
    margin-bottom: 30px;
  }
`;

const Highlight = styled.span`
  color: ${colors.orange[800]};
`;

const AwardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 45px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  @media (max-width: 480px) {
    gap: 30px;
  }
`;

const AwardCard = styled.div`
  display: flex;
  gap: 0;
  align-items: stretch;
  background: ${colors.orange[200]};
  padding: 0;
  border-radius: 24px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
  height: 250px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    height: 120px;
  }

  @media (max-width: 480px) {
    height: 100px;
  }
`;

const AwardImage = styled.img`
  width: 250px;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 170px;
  }

  @media (max-width: 480px) {
    width: 100px;
  }
`;

const AwardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  flex: 1;
  padding: 24px;

  @media (max-width: 768px) {
    padding: 20px;
    gap: 6px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    gap: 4px;
  }
`;

const Year = styled.div`
  font-size: 25px;
  font-weight: 700;
  color: #ff6b35;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const AwardTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;
