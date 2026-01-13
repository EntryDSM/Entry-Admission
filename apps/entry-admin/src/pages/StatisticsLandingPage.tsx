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
import { useGetAllSchedule, useGetRegionStatistics, useGetCompetitionRate, useGetGenderStatistics } from '../apis';

// 날짜 포맷 변환 함수 (yyyy-MM-ddTHH:mm:ss -> MM/DD)
const formatDateToMMDD = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}/${day}`;
};

// D-day 계산 함수
const calculateDday = (dateString: string) => {
  if (!dateString) return null;
  const targetDate = new Date(dateString);
  const today = new Date();

  // 시간 제거하고 날짜만 비교
  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

// 성별 통계는 API와 연동한다

export const StatisticsLandingPage = () => {
  const { data: scheduleData, isLoading } = useGetAllSchedule();
  const { data: regionData, isLoading: isRegionLoading } = useGetRegionStatistics();
  const { data: competitionData, isLoading: isCompetitionLoading } = useGetCompetitionRate();
  const { data: genderData, isLoading: isGenderLoading } = useGetGenderStatistics();
  const regionItems = React.useMemo(() => {
    if (!regionData) return [];
    return Object.entries(regionData).map(([regionName, count]) => ({
      regionName,
      count,
    }));
  }, [regionData]);

  // 스케줄 데이터에서 날짜 찾기
  const findDate = (type: string) =>
    scheduleData?.schedules?.find((s: any) => s.type === type)?.date || '';

  const startDate = findDate('START_DATE');
  const endDate = findDate('END_DATE');
  const firstAnnouncement = findDate('FIRST_ANNOUNCEMENT');
  const interview = findDate('INTERVIEW');
  const finalAnnouncement = findDate('SECOND_ANNOUNCEMENT');

  // 원서 제출 기간 포맷
  const applicationPeriod = isLoading
    ? ''
    : startDate && endDate
      ? `${formatDateToMMDD(startDate)}~${formatDateToMMDD(endDate)}`
      : '--/--~--/--';

  // 전형 일정
  const processSchedule = [
    { step: '원서 제출', date: isLoading ? '' : applicationPeriod },
    { step: '1차 발표', date: isLoading ? '' : firstAnnouncement ? formatDateToMMDD(firstAnnouncement) : '--/--' },
    { step: '2차 전형', date: isLoading ? '' : interview ? formatDateToMMDD(interview) : '--/--' },
    { step: '최종 합격자 발표', date: isLoading ? '' : finalAnnouncement ? formatDateToMMDD(finalAnnouncement) : '--/--' }
  ];

  // 각 단계별 마감일 계산
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 각 단계 완료 여부 확인
  const endDateTime = endDate ? new Date(endDate) : null;
  const firstAnnouncementTime = firstAnnouncement ? new Date(firstAnnouncement) : null;
  const interviewTime = interview ? new Date(interview) : null;
  const finalAnnouncementTime = finalAnnouncement ? new Date(finalAnnouncement) : null;

  if (endDateTime) endDateTime.setHours(0, 0, 0, 0);
  if (firstAnnouncementTime) firstAnnouncementTime.setHours(0, 0, 0, 0);
  if (interviewTime) interviewTime.setHours(0, 0, 0, 0);
  if (finalAnnouncementTime) finalAnnouncementTime.setHours(0, 0, 0, 0);

  const isStep1Complete = endDateTime ? endDateTime <= today : false; // 원서 제출 마감
  const isStep2Complete = firstAnnouncementTime ? firstAnnouncementTime <= today : false; // 1차 발표
  const isStep3Complete = interviewTime ? interviewTime <= today : false; // 2차 전형
  const isStep4Complete = finalAnnouncementTime ? finalAnnouncementTime <= today : false; // 최종 발표

  // 현재 진행 중인 단계의 마감일 계산
  let currentDeadline = '';
  let currentDeadlineDate = '';

  if (!isStep1Complete && endDate) {
    // 1차: 원서 제출 마감
    const dday = calculateDday(endDate);
    currentDeadlineDate = endDate;
    currentDeadline = dday === null ? '--일' : dday > 0 ? `${dday}일` : dday === 0 ? '오늘' : '마감';
  } else if (!isStep2Complete && firstAnnouncement) {
    // 2차: 1차 발표일
    const dday = calculateDday(firstAnnouncement);
    currentDeadlineDate = firstAnnouncement;
    currentDeadline = dday === null ? '--일' : dday > 0 ? `${dday}일` : dday === 0 ? '오늘' : '마감';
  } else if (!isStep3Complete && interview) {
    // 3차: 2차 전형일
    const dday = calculateDday(interview);
    currentDeadlineDate = interview;
    currentDeadline = dday === null ? '--일' : dday > 0 ? `${dday}일` : dday === 0 ? '오늘' : '마감';
  } else if (!isStep4Complete && finalAnnouncement) {
    // 4차: 최종 발표일
    const dday = calculateDday(finalAnnouncement);
    currentDeadlineDate = finalAnnouncement;
    currentDeadline = dday === null ? '--일' : dday > 0 ? `${dday}일` : dday === 0 ? '오늘' : '마감';
  } else {
    currentDeadline = '0일';
  }

  const displayDeadline = isLoading ? '' : currentDeadline;
  const ddayValue = currentDeadlineDate ? calculateDday(currentDeadlineDate) : null;

  return (
    <Container>
      <ProcessTitle>전형 일정</ProcessTitle>
      <ProcessSection>
        <ProcessSteps>
          {processSchedule.map((item, index) => (
            <React.Fragment key={index}>
              <ProcessItem>
                <StepIcon>
                  {index === 0 && <OneIcon isActive={isStep1Complete} />}
                  {index === 1 && <TwoIcon isActive={isStep2Complete} />}
                  {index === 2 && <ThreeIcon isActive={isStep3Complete} />}
                  {index === 3 && <FourIcon isActive={isStep4Complete} />}
                </StepIcon>
                <StepLabel>{item.step}</StepLabel>
                {isLoading ? (
                  <SkeletonDate />
                ) : (
                  <StepDate>{item.date}</StepDate>
                )}
              </ProcessItem>
              {index < processSchedule.length - 1 && (
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
            {isLoading ? <SkeletonValue /> : <StatValue>{applicationPeriod}</StatValue>}
          </StatContent>
          <StatIcon>
            <ApplicationPeriodIcon />
          </StatIcon>
        </StatCard>

        <StatCard>
          <StatContent>
            <StatTitle>신입생 지원율</StatTitle>
            {isCompetitionLoading ? (
              <SkeletonValue />
            ) : (
              <StatValue>
                {competitionData?.data?.total?.applicants || 0}명 /{competitionData?.data?.total?.capacity || 0}명
              </StatValue>
            )}
          </StatContent>
          <StatIcon>
            <AdmissionRateIcon />
          </StatIcon>
        </StatCard>

        <StatCard>
          <StatContent>
            <StatTitle>경쟁률</StatTitle>
            {isCompetitionLoading ? (
              <SkeletonValue />
            ) : (
              <StatValue>
                {competitionData?.data?.total?.rate?.toFixed(1) || 0} : 1
              </StatValue>
            )}
          </StatContent>
          <StatIcon>
            <CompetitionRateIcon />
          </StatIcon>
        </StatCard>

        <StatCard>
          <StatContent>
            <StatTitle>
              {!isStep1Complete && endDate
                ? '1차 전형 마감일'
                : !isStep2Complete && firstAnnouncement
                  ? '2차 전형 마감일'
                  : !isStep3Complete && interview
                    ? '입학절차 마감일'
                    : !isStep4Complete && finalAnnouncement
                      ? '입학절차 마감일'
                      : '전형 마감일'}
            </StatTitle>
            {isLoading ? (
              <SkeletonValue />
            ) : (
              <StatValue>
                {ddayValue !== null && ddayValue > 0 && (
                  <StatSubtitle>앞으로 </StatSubtitle>
                )}
                {displayDeadline}
              </StatValue>
            )}
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
          {isCompetitionLoading ? (
            <>
              <ApplicationTypeCard><SkeletonValue /></ApplicationTypeCard>
              <ApplicationTypeCard><SkeletonValue /></ApplicationTypeCard>
              <ApplicationTypeCard><SkeletonValue /></ApplicationTypeCard>
            </>
          ) : (
            competitionData?.data?.byType?.map((item, index) => {
              const typeColors: { [key: string]: string } = {
                'GENERAL': '#1DB954',
                'COMMON': '#1DB954', // COMMON도 일반 전형 색상 사용
                'MEISTER': '#FF7A00',
                'SOCIAL': '#007BFF',
              };
              const typeNames: { [key: string]: string } = {
                'GENERAL': '일반 전형',
                'COMMON': '일반 전형',
                'MEISTER': '마이스터 전형',
                'SOCIAL': '사회 통합 전형',
              };
              const progressPercentage = item.capacity > 0 ? (item.applicants / item.capacity) * 100 : 0;
              const percentage = item.capacity > 0 ? ((item.applicants / item.capacity) * 100).toFixed(2) : '0.00';

              return (
                <ApplicationTypeCard key={index}>
                  <ApplicationTypeHeader>
                    <ApplicationTypeTitle>{typeNames[item.applicationType] || item.applicationType}</ApplicationTypeTitle>
                    <ApplicationTypeCount>{item.applicants}/{item.capacity}</ApplicationTypeCount>
                  </ApplicationTypeHeader>
                  <ProgressBarContainer>
                    <ProgressBar progress={progressPercentage} color={typeColors[item.applicationType] || '#666'} />
                  </ProgressBarContainer>
                  <ApplicationTypePercentage>
                    {percentage}%가 지원했습니다.
                  </ApplicationTypePercentage>
                </ApplicationTypeCard>
              );
            })
          )}
        </ApplicationTypesGrid>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>지원자 성비</SectionTitle>
        <GenderGrid>
          {isGenderLoading ? (
            <>
              <GenderCard>
                <SkeletonValue />
              </GenderCard>
              <GenderCard>
                <SkeletonValue />
              </GenderCard>
            </>
          ) : (
            genderData?.data?.byGender?.slice(0, 2).map((item, index) => {
              const rawPercentage = typeof item.percentage === 'number' ? item.percentage : 0;
              // 백엔드가 0~1 또는 0~100 둘 다 반환할 수 있으므로 정규화
              const normalizedPercentage = rawPercentage <= 1 ? rawPercentage * 100 : rawPercentage;
              const displayPercentage = `${normalizedPercentage.toFixed(2)}%`;
              const color = index === 0 ? '#4F46E5' : '#EC4899';

              return (
                <GenderCard key={`${item.gender}-${index}`}>
                  <GenderTitle>{item.genderName ?? item.gender}</GenderTitle>
                  <GenderCount>{item.count}명</GenderCount>
                  <ProgressBarContainer>
                    <ProgressBar progress={normalizedPercentage} color={color} />
                  </ProgressBarContainer>
                  <GenderPercentage>
                    {displayPercentage}가 지원했습니다.
                  </GenderPercentage>
                </GenderCard>
              );
            })
          )}
        </GenderGrid>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>지역별 접수 현황</SectionTitle>
        <RegionGrid>
          {isRegionLoading ? (
            <>
              {Array.from({ length: 6 }).map((_, index) => (
                <RegionCard key={index}>
                  <SkeletonValue />
                </RegionCard>
              ))}
            </>
          ) : (
            regionItems.map((item, index) => (
              <RegionCard key={index}>
                <RegionName>{item.regionName}</RegionName>
                <RegionCount>{item.count}명</RegionCount>
              </RegionCard>
            ))
          )}
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
            {isRegionLoading ? (
              <>
                {Array.from({ length: 4 }).map((_, index) => (
                  <MapLegendItem key={index}>
                    <SkeletonValue />
                  </MapLegendItem>
                ))}
              </>
            ) : (
              regionItems.slice(0, 4).map((item, index) => (
                <MapLegendItem key={index}>
                  <MapLegendText>{item.regionName}</MapLegendText>
                  <MapLegendCount>{item.count}명</MapLegendCount>
                </MapLegendItem>
              ))
            )}
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

const SkeletonDate = styled.div`
  width: 80px;
  height: 20px;
  background-color: ${colors.gray[200]};
  border-radius: 4px;
  margin-bottom: 20px;
  animation: skeleton-loading 1.5s infinite ease-in-out;

  @keyframes skeleton-loading {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`;

const SkeletonValue = styled.div`
  width: 120px;
  height: 32px;
  background-color: ${colors.gray[200]};
  border-radius: 4px;
  animation: skeleton-loading 1.5s infinite ease-in-out;

  @keyframes skeleton-loading {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`;
