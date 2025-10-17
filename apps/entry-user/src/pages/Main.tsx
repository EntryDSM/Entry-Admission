import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { ApplicationTimeline, FaqSection, InfoSection } from '../components';
import { school } from '../assets';
import { getAccessToken } from '@entry/util-config';
import { useSchedule } from '../hooks/useSchedule';
import { toast } from 'react-toastify';
import { getApplicationStatus, IApplicationStatusResponse } from '../apis';
import { useEffect, useState } from 'react';

export const Main = () => {
  const [status, setStatus] = useState<IApplicationStatusResponse | null>(null);
  const isLoggedIn = !!getAccessToken();

  useEffect(() => {
    // 로그인한 사용자만 원서 상태 조회
    if (!isLoggedIn) return;

    getApplicationStatus()
      .then((data) => {
        setStatus(data);
      })
      .catch((err) => {
        console.error('원서 상태 불러오기 실패', err);
      });
  }, [isLoggedIn]);

  const { data: startDate } = useSchedule({ type: 'START_DATE' });
  const { data: endDate } = useSchedule({ type: 'END_DATE' });
  const now = new Date();

  const isTrueSchedule =
    startDate && endDate
      ? now >= new Date(startDate.date) && now <= new Date(endDate.date)
      : false;

  const handleApplyClick = () => {
    if (!isLoggedIn) {
      toast.error('로그인 후 지원이 가능합니다.');
      return;
    }
    if (!isTrueSchedule) {
      toast.error('아직 지원 기간이 아닙니다.');
      return;
    }
    if (status?.isSubmitted) {
      toast.error('이미 원서를 제출하였습니다.');
      return;
    }

    window.location.href = 'https://admission.entrydsm.kr';
  };

  const canApply = isLoggedIn && isTrueSchedule && !status?.isSubmitted;

  return (
    <>
      <MainContainer>
        <BackgroundImage src={school} alt="대덕소프트웨어마이스터고등학교" />
        <Overlay />

        <ContentWrapper>
          <Title>
            <OrangeText>대덕소프트웨어마이스터고등학교</OrangeText>는
            <br />
            IT 업계를 선도할 미래 인재를 모집하고 있어요!
          </Title>

          <TimelineSection>
            <ApplicationTimeline />
            <ApplyButton onClick={handleApplyClick} $disabled={!canApply}>
              지원하기
            </ApplyButton>
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

const ApplyButton = styled.button<{ $disabled?: boolean }>`
  width: 210px;
  margin-top: 60px;
  background-color: ${({ $disabled }) =>
    $disabled ? colors.orange[500] : colors.orange[800]};
  color: white;
  border: none;
  border-radius: 16px;
  padding: 16px 40px;
  font-size: 21px;
  font-weight: 450;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ $disabled }) =>
      $disabled ? colors.orange[500] : colors.orange[850]};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: ${colors.orange[500]};
    transform: none;
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
