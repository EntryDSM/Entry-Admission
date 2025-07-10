import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { VideoBanner } from '@entry/ui';

export const MouCompaniesSection = () => {
  return (
    <>
      <MentContainer>
        <Top>대덕 SW 마이스터고와 함께 하는</Top>
        <Middle>
          든든한<Best> MOU</Best> 기업들,
        </Middle>
        <Description>
          <Line>350여개에 달하는 기업이 본교에 취업을 의뢰했으며,</Line>
          <Line>매년 학생들의 취업으로 이어지고 있습니다.</Line>
        </Description>
      </MentContainer>
      <VideoBanner />
    </>
  );
};

const MentContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 80px 100px 50px 100px;
  padding: 80px 0;

  @media (max-width: 1200px) {
    margin: 60px 80px 5px 80px;
    padding: 60px 0;
  }

  @media (max-width: 768px) {
    margin: 50px 40px 40px 40px;
    padding: 40px 0;
  }

  @media (max-width: 480px) {
    margin: 30px 20px 20px 20px;
    padding: 30px 0;
  }
`;

const Best = styled.span`
  color: ${colors.orange[800]};
`;

const Middle = styled.div`
  font-size: 54px;
  font-weight: 700;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    font-size: 40px;
    margin-bottom: 24px;
  }

  @media (max-width: 480px) {
    font-size: 32px;
    margin-bottom: 20px;
  }
`;

const Top = styled.div`
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 32px;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 10px;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Line = styled.div`
  font-size: 18px;
  color: #666;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
