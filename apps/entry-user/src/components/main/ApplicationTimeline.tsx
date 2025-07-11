import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

export const ApplicationTimeline = () => {
  const timelineData = [
    { title: '원서 제출', date: '1/14 ~ 12/06' },
    { title: '1차 발표', date: '12/21' },
    { title: '2차 전형', date: '12/25' },
    { title: '최종 발표', date: '12/25' },
  ];

  return (
    <TimelineWrapper>
      {/* 데스크톱 타임라인 */}
      <DesktopTimeline>
        <TimelineContainer>
          <TimelineLine />

          <TimelineItem style={{ left: '80px' }}>
            <TimelineLabel>
              <LabelTitle>원서 제출</LabelTitle>
              <LabelDate>24/11 ~ 12/06</LabelDate>
            </TimelineLabel>
            <TimelineDot />
          </TimelineItem>

          <TimelineItem style={{ left: '35%' }}>
            <TimelineLabel>
              <LabelTitle>1차 발표</LabelTitle>
              <LabelDate>12/21</LabelDate>
            </TimelineLabel>
            <TimelineDot />
          </TimelineItem>

          <TimelineItem style={{ left: '62%' }}>
            <TimelineLabel>
              <LabelTitle>2차 전형</LabelTitle>
              <LabelDate>12/25</LabelDate>
            </TimelineLabel>
            <TimelineDot />
          </TimelineItem>

          <TimelineItem style={{ right: '80px' }}>
            <TimelineLabel>
              <LabelTitle>최종 발표</LabelTitle>
              <LabelDate>12/25</LabelDate>
            </TimelineLabel>
            <TimelineDot />
          </TimelineItem>
        </TimelineContainer>
      </DesktopTimeline>

      {/* 모바일 타임라인 */}
      <MobileTimeline>
        {timelineData.map((item, index) => (
          <MobileItem key={index}>
            <MobileNumber>{index + 1}</MobileNumber>
            <MobileContent>
              <MobileTitle>{item.title}</MobileTitle>
              <MobileDate>{item.date}</MobileDate>
            </MobileContent>
          </MobileItem>
        ))}
      </MobileTimeline>
    </TimelineWrapper>
  );
};

const TimelineWrapper = styled.div`
  position: relative;
  width: 100%;
`;

/* 데스크톱 타임라인 */
const DesktopTimeline = styled.div`
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  padding: 0 80px;

  @media (max-width: 1200px) {
    padding: 0 60px;
  }

  @media (max-width: 1024px) {
    padding: 0 40px;
    height: 50px;
  }
`;

const TimelineLine = styled.div`
  position: absolute;
  top: 50%;
  left: 80px;
  right: 80px;
  height: 3px;
  background: ${colors.orange[700]};
  transform: translateY(-50%);

  @media (max-width: 1200px) {
    left: 60px;
    right: 60px;
  }

  @media (max-width: 1024px) {
    left: 40px;
    right: 40px;
    height: 2px;
  }
`;

const TimelineItem = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  &:first-of-type {
    left: 80px !important;
    @media (max-width: 1200px) {
      left: 60px !important;
    }
    @media (max-width: 1024px) {
      left: 40px !important;
    }
  }

  &:last-of-type {
    right: 80px !important;
    @media (max-width: 1200px) {
      right: 60px !important;
    }
    @media (max-width: 1024px) {
      right: 40px !important;
    }
  }
`;

const TimelineDot = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${colors.orange[700]};
  border: none;
  border-radius: 50%;
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) {
    width: 10px;
    height: 10px;
  }
`;

const TimelineLabel = styled.div`
  position: absolute;
  top: -60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  white-space: nowrap;

  @media (max-width: 1024px) {
    top: -50px;
  }
`;

const LabelTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: white;
  margin-bottom: 6px;
  white-space: nowrap;
  transform: translateY(-10px);

  @media (max-width: 1200px) {
    font-size: 20px;
  }

  @media (max-width: 1024px) {
    font-size: 18px;
    transform: translateY(-8px);
  }
`;

const LabelDate = styled.div`
  font-size: 17px;
  font-weight: 600;
  color: ${colors.orange[800]};
  white-space: nowrap;

  @media (max-width: 1200px) {
    font-size: 16px;
  }

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`;

/* 모바일 타임라인 */
const MobileTimeline = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 30px;
    max-width: 300px;
    margin: 0 auto;
  }
`;

const MobileItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;

  @media (max-width: 480px) {
    gap: 12px;
    padding: 8px 0;
  }
`;

const MobileNumber = styled.div`
  width: 32px;
  height: 32px;
  background: ${colors.orange[700]};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }
`;

const MobileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const MobileTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: white;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const MobileDate = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.orange[400]};

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
