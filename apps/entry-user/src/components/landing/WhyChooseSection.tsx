import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { SeniorImg } from '../../assets/landing';

export const WhyChooseSection = () => {
  const cards = [
    {
      id: 1,
      title: '대마고가 좋은 이유 대마고가 좋은 이유 대마고가 좋은',
      students: '7기 000 학생',
      image: SeniorImg,
    },
    {
      id: 2,
      title: '대마고가 좋은 이유 대마고가 좋은 이유 대마고가 좋은',
      students: '7기기 000 학생',
      image: SeniorImg,
    },
    {
      id: 3,
      title: '대마고가 좋은 이유 대마고가 좋은 이유 대마고가 좋은',
      students: '7기기 000 학생',
      image: SeniorImg,
    },
    {
      id: 4,
      title: '대마고가 좋은 이유 대마고가 좋은 이유 대마고가 좋은',
      students: '7기기 000 학생',
      image: SeniorImg,
    },
  ];

  return (
    <Container>
      <Title>대덕 SW 마이스터고와 함께 하는 이유</Title>
      <Subtitle>
        대덕소프트웨어 마이스터고를 졸업한 선배들의 이야기예요!
      </Subtitle>

      <ScrollContainer>
        <CardList>
          {cards.map((card) => (
            <Card key={card.id}>
              <ImageWrapper>
                <CardImage src={card.image} alt="학생 이미지" />
              </ImageWrapper>

              <CardTitle>{card.title}</CardTitle>
              <CardSubtitle>{card.students}</CardSubtitle>
            </Card>
          ))}
        </CardList>
      </ScrollContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 24px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 46px;
  font-weight: bold;
  color: ${colors.gray[500]};
  margin-bottom: 32px;
  text-align: left;
  margin-top: 180px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: ${colors.gray[400]};
  text-align: left;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ScrollContainer = styled.div`
  position: relative;
`;

const CardList = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 35px;
  padding-top: 10px;
  padding-bottom: 16px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    height: 9px;
  }

  &::-webkit-scrollbar-track {
    background: ${colors.gray[200]};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.gray[500]};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${colors.gray[400]};
  }
`;

const Card = styled.div`
  flex-shrink: 0;
  width: 400px;
  background: ${colors.orange[200]};
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
  transform: translateY(0);

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-8px);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.gray[500]};
  margin-bottom: 25px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: left;
  line-height: 1.6;
`;

const CardSubtitle = styled.p`
  color: #6b7280;
  font-size: 16px;
  text-align: left;
`;
