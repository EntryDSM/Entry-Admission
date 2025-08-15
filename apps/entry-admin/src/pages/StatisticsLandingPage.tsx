import styled from '@emotion/styled';
import { colors, Flex, Text } from '@entry/design-token';
import {
  ApplicationPeriodIcon,
  AdmissionRateIcon,
  CompetitionRateIcon,
  FirstRoundDeadlineIcon,
  OneIcon,
  TwoIcon,
  ThreeIcon,
  FourIcon,
  NationalMapMarker,
  ArrowIcon,
} from '../assets';
import React from 'react';

const mockData = {
  applicationPeriod: '03/15~03/19',
  admissionRate: '12명 /64명',
  competitionRate: '2.8 : 1',
  firstRoundDeadline: '5일',
  processSchedule: [
    { step: '원서 제출', date: '10/22~10/30' },
    { step: '1차 발표', date: '11/05' },
    { step: '2차 전형', date: '11/10~11/15' },
    { step: '최종 합격자 발표', date: '11/25' }
  ],
  applicationTypes: [
    { type: '일반 전형', count: '11/64', percentage: '12.00%', color: '#1DB954' },
    { type: '마이스터 전형', count: '11/64', percentage: '12.00%', color: '#FF7A00' },
    { type: '사회 통합 전형', count: '11/64', percentage: '12.00%', color: '#007BFF' },
  ],
  genderStats: [
    { gender: '남성', count: '12명', percentage: '12.00%' },
    { gender: '여성', count: '12명', percentage: '12.00%' },
  ],
  regionStats: [
    { region: '대전', count: '12명' },
    { region: '서울', count: '12명' },
    { region: '경기', count: '12명' },
    { region: '부산', count: '12명' },
    { region: '대구', count: '12명' },
    { region: '광주', count: '12명' },
    { region: '세종', count: '12명' },
    { region: '울산', count: '12명' },
    { region: '인천', count: '12명' },
    { region: '제주', count: '12명' },
    { region: '강원도', count: '12명' },
    { region: '경상남도', count: '12명' },
    { region: '전라남도', count: '12명' },
    { region: '전라북도', count: '12명' },
    { region: '충청남도', count: '12명' },
    { region: '충청북도', count: '12명' },
  ],
};

export const StatisticsLandingPage = () => {
  return (
    <Container>
      <ProcessTitle>전형 일정</ProcessTitle>
      <ProcessSection>
        <ProcessSteps>
          {mockData.processSchedule.map((item, index) => (
            <React.Fragment key={index}>
              <ProcessItem>
                <StepIcon>
                  {index === 0 && <OneIcon />}
                  {index === 1 && <TwoIcon />}
                  {index === 2 && <ThreeIcon />}
                  {index === 3 && <FourIcon />}
                </StepIcon>
                <StepLabel>{item.step}</StepLabel>
                <StepDate>{item.date}</StepDate>
              </ProcessItem>
              {index < mockData.processSchedule.length - 1 && (
                <ArrowContainer>
                  <ArrowIcon />
                </ArrowContainer>
              )}
            </React.Fragment>
          ))}
        </ProcessSteps>
      </ProcessSection>

      <StatsGrid>
        <StatCard>
          <StatContent>
            <StatTitle>원서 제출 기간</StatTitle>
            <StatValue>{mockData.applicationPeriod}</StatValue>
          </StatContent>
          <StatIcon>
            <ApplicationPeriodIcon />
          </StatIcon>
        </StatCard>

        <StatCard>
          <StatContent>
            <StatTitle>신입생 지원율</StatTitle>
            <StatValue>{mockData.admissionRate}</StatValue>
          </StatContent>
          <StatIcon>
            <AdmissionRateIcon />
          </StatIcon>
        </StatCard>

        <StatCard>
          <StatContent>
            <StatTitle>경쟁률</StatTitle>
            <StatValue>{mockData.competitionRate}</StatValue>
          </StatContent>
          <StatIcon>
            <CompetitionRateIcon />
          </StatIcon>
        </StatCard>

        <StatCard>
          <StatContent>
            <StatTitle>1차 전형 마감일</StatTitle>
            <StatValue><StatSubtitle>앞으로</StatSubtitle> {mockData.firstRoundDeadline}</StatValue>
          </StatContent>
          <StatIcon>
            <FirstRoundDeadlineIcon />
          </StatIcon>
        </StatCard>
      </StatsGrid>

      <SectionSpacing />

      <SectionContainer>
        <SectionTitle>전형별 접수 현황</SectionTitle>
        <ApplicationTypesGrid>
          {mockData.applicationTypes.map((item, index) => (
            <ApplicationTypeCard key={index}>
              <ApplicationTypeHeader>
                <ApplicationTypeTitle>{item.type}</ApplicationTypeTitle>
                <ApplicationTypeCount>{item.count}</ApplicationTypeCount>
              </ApplicationTypeHeader>
              <ProgressBarContainer>
                <ProgressBar progress={18.75} color={item.color} />
              </ProgressBarContainer>
              <ApplicationTypePercentage>
                {item.percentage}가 지원했습니다.
              </ApplicationTypePercentage>
            </ApplicationTypeCard>
          ))}
        </ApplicationTypesGrid>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>지원자 성비</SectionTitle>
        <GenderGrid>
          {mockData.genderStats.map((item, index) => (
            <GenderCard key={index}>
              <GenderTitle>{item.gender}</GenderTitle>
              <GenderCount>{item.count}</GenderCount>
              <ProgressBarContainer>
                <ProgressBar
                  progress={18.75}
                  color={index === 0 ? "#4F46E5" : "#EC4899"}
                />
              </ProgressBarContainer>
              <GenderPercentage>
                {item.percentage}가 지원했습니다.
              </GenderPercentage>
            </GenderCard>
          ))}
        </GenderGrid>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>지역별 접수 현황</SectionTitle>
        <RegionGrid>
          {mockData.regionStats.map((item, index) => (
            <RegionCard key={index}>
              <RegionName>{item.region}</RegionName>
              <RegionCount>{item.count}</RegionCount>
            </RegionCard>
          ))}
        </RegionGrid>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>지역별 접수 현황 - 지도</SectionTitle>
        <MapDescription>
          대전, 전국 지역별 지원현황을 조회할수 있어요!
        </MapDescription>
        <MapContainer>
          <MapWrapper>
            <NationalMapMarker />
          </MapWrapper>
          <MapLegend>
            <MapLegendItem>
              <MapLegendText>서울</MapLegendText>
              <MapLegendCount>12명</MapLegendCount>
            </MapLegendItem>
            <MapLegendItem>
              <MapLegendText>대전</MapLegendText>
              <MapLegendCount>12명</MapLegendCount>
            </MapLegendItem>
            <MapLegendItem>
              <MapLegendText>서울</MapLegendText>
              <MapLegendCount>12명</MapLegendCount>
            </MapLegendItem>
            <MapLegendItem>
              <MapLegendText>서울</MapLegendText>
              <MapLegendCount>12명</MapLegendCount>
            </MapLegendItem>
          </MapLegend>
        </MapContainer>
      </SectionContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.extra.realWhite};
  margin: 0 auto;
`;

const ProcessSection = styled.div`
  width: 100%;
  margin-bottom: 60px;
  border-radius: 8px;
  border: 1px solid ${colors.gray[200]};
`;

const ProcessTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: ${colors.gray[500]};
  margin-bottom: 24px;
`;

const ProcessSteps = styled.div`
  width: 100%;
  height: 133px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 80px;
  background-color: ${colors.extra.realWhite};
  border-radius: 8px;
`;

const ProcessItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
`;

const StepIcon = styled.div`
  width: 64px;
  height: 64px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepLabel = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.gray[500]};
`;

const StatsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 44px;
  margin-bottom: 44px;
`;

const StepDate = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: ${colors.extra.realBlack};
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 180px;
  padding: 24px 32px;
  background-color: ${colors.extra.realWhite};
  border-radius: 8px;
  border: 1px solid ${colors.gray[200]};
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StatTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${colors.gray[500]};
  margin-bottom: 6px;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${colors.gray[500]};
`;

const StatSubtitle = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${colors.gray[300]};
`;

const SectionSpacing = styled.div`
  height: 100px;
`;

const SectionContainer = styled.section`
  width: 100%;
  margin-bottom: 44px;
  padding: 32px;
  background-color: ${colors.extra.realWhite};
  border-radius: 12px;
  border: 1px solid ${colors.gray[200]};
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: ${colors.gray[500]};
  margin-bottom: 24px;
`;

const ApplicationTypesGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
`;

const ApplicationTypeCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background-color: ${colors.extra.realWhite};
  border-radius: 12px;
`;

const ApplicationTypeTitle = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: ${colors.gray[500]};
`;

const ApplicationTypeCount = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.gray[500]};
`;
const ApplicationTypeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${colors.gray[200]};
  border-radius: 4px;
  overflow: hidden;
  margin: 8px 0;
`;

const ProgressBar = styled.div<{ progress: number; color: string }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: ${({ color }) => color};
  transition: width 0.3s ease;
`;

const ApplicationTypePercentage = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: ${colors.gray[400]};
`;

const GenderGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

const GenderCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background-color: ${colors.extra.realWhite};
  border-radius: 12px;
  border: 1px solid ${colors.gray[200]};
`;

const GenderTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.gray[500]};
`;

const GenderCount = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.gray[500]};
`;

const GenderPercentage = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: ${colors.gray[400]};
`;

const RegionGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const RegionCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: ${colors.extra.realWhite};
  border-radius: 8px;
  border: 1px solid ${colors.gray[200]};
`;

const RegionName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.gray[500]};
`;

const RegionCount = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.gray[500]};
`;

const MapDescription = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${colors.gray[400]};
  margin-bottom: 24px;
`;

const MapContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  height: 591px;
`;

const MapWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MapLegend = styled.div`
  width: 417px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MapLegendItem = styled.div`
  display: flex;
  width: 417px;
  height: 102px;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: ${colors.extra.realWhite};
  border-radius: 8px;
  border: 1px solid ${colors.gray[200]};
`;

const MapLegendText = styled.div`
  font-size: 32px;
  font-weight: 500;
  color: ${colors.gray[500]};
`;

const MapLegendCount = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: ${colors.gray[500]};
`;
