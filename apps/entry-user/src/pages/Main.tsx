import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { ApplicationTimeline, FaqSection, InfoSection } from '../components';
import { school } from '../assets';

export const Main = () => {
  const handleApplyClick = () => {
    window.location.href = 'https://admission.entrydsm.kr';
  };

  return (
    <>
      <MainContainer>
        <BackgroundImage src={school} alt="대덕소프트웨어마이스터고등학교" />
        <Overlay />

        <ContentWrapper>
          <Title>
            <OrangeText>대덕 소프트웨어 마이스터고등학교</OrangeText>는
            <br />
            IT 업계를 선도할 미래 인재를 모집하고 있어요!
          </Title>

          <TimelineSection>
            <ApplicationTimeline />
            <ApplyButton onClick={handleApplyClick}>지원하기</ApplyButton>
          </TimelineSection>
        </ContentWrapper>
      </MainContainer>
      <InfoSection />
      <FaqSection />
    </>
  );
};

const MainContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 3;
  text-align: center;
  padding: 0 20px;

  @media (max-width: 480px) {
    padding: 0 15px;
  }
`;

const Title = styled.h1`
  font-size: 52px;
  font-weight: 700;
  color: white;
  line-height: 1.2;
  margin-bottom: 120px;

  @media (max-width: 1200px) {
    font-size: 48px;
    margin-bottom: 100px;
  }

  @media (max-width: 768px) {
    font-size: 36px;
    margin-bottom: 80px;
    br {
      display: none;
    }
  }

  @media (max-width: 480px) {
    font-size: 28px;
    margin-bottom: 60px;
    line-height: 1.3;
  }

  @media (max-width: 360px) {
    font-size: 24px;
    margin-bottom: 50px;
  }
`;

const OrangeText = styled.span`
  color: ${colors.orange[800]};
`;

const TimelineSection = styled.div`
  position: relative;
  width: 100%;
  margin-top: 50px;

  @media (max-width: 1024px) {
    margin-top: 40px;
  }
`;

const ApplyButton = styled.button`
  width: 210px;
  margin-top: 60px;
  background-color: ${colors.orange[800]};
  color: white;
  border: none;
  border-radius: 16px;
  padding: 16px 40px;
  font-size: 21px;
  font-weight: 450;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.orange[850]};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 1200px) {
    width: 190px;
    font-size: 19px;
    padding: 15px 35px;
  }

  @media (max-width: 1024px) {
    width: 170px;
    font-size: 17px;
    padding: 14px 30px;
    margin-top: 50px;
  }

  @media (max-width: 768px) {
    width: 200px;
    margin-top: 60px;
    padding: 16px 40px;
    font-size: 18px;
  }

  @media (max-width: 480px) {
    width: 180px;
    margin-top: 50px;
    padding: 14px 32px;
    font-size: 16px;
    border-radius: 12px;
  }

  @media (max-width: 360px) {
    width: 160px;
    padding: 12px 28px;
    font-size: 14px;
  }
`;
