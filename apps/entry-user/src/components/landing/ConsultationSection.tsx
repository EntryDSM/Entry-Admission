import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

export const ConsultationSection = () => {
  const handleHomepageClick = () => {
    window.open('https://dsmhs.djsch.kr/main.do', '_blank');
  };

  return (
    <Container>
      <TextContent>
        아직 고민중이라면, <HighlightText>학교 홈페이지</HighlightText>를 통해{' '}
        <HighlightText>입학 상담</HighlightText>을 진행 해보세요!
      </TextContent>
      <Button onClick={handleHomepageClick}>학교 홈페이지 바로가기</Button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-top: 60px;

  @media (max-width: 768px) {
    padding: 40px 20px;
    gap: 20px;
  }

  @media (max-width: 480px) {
    padding: 30px 15px;
    gap: 18px;
  }
`;

const TextContent = styled.p`
  font-size: 23px;
  color: ${colors.gray[500]};
  text-align: center;
  font-weight: 550;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    line-height: 1.3;
  }
`;

const HighlightText = styled.span`
  color: ${colors.orange[800]};
  font-weight: 700;
`;

const Button = styled.button`
  background-color: ${colors.orange[800]};
  color: ${colors.extra.realWhite};
  border: none;
  border-radius: 20px;
  padding: 18px 38px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.orange[700]};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 102, 51, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 10px 28px;
    font-size: 15px;
  }

  @media (max-width: 480px) {
    padding: 8px 24px;
    font-size: 14px;
  }
`;
