import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { Text } from '@entry/design-token';
import { AttendanceForm, CertCheckForm } from '@entry/ui';
import { useCalculationPageData } from '../../contexts';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 100%;
  height: fit-content;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  width: 100%;
`;

export const Activity = () => {
  const location = useLocation();

  const getDataKey = (): 'primaryActivity' | 'graduatedActivity' | 'qeActivity' => {
    if (location.pathname.includes('primary')) return 'primaryActivity';
    if (location.pathname.includes('graduated')) return 'graduatedActivity';
    if (location.pathname.includes('qe')) return 'qeActivity';
    return 'primaryActivity';
  };

  const isQE = location.pathname.includes('qe');

  const [activityData, setActivityData] = useCalculationPageData(getDataKey());

  const safeActivityData = activityData || {};
  const safeSetActivityData = (data: typeof activityData) => {
    setActivityData(data || {});
  };

  const handleAbsencesChange = (value: string) => {
    safeSetActivityData({ ...safeActivityData, absences: value });
  };

  const handleEarlyLeavesChange = (value: string) => {
    safeSetActivityData({ ...safeActivityData, earlyLeaves: value });
  };

  const handleLateArrivalsChange = (value: string) => {
    safeSetActivityData({ ...safeActivityData, lateArrivals: value });
  };

  const handleResultMissingChange = (value: string) => {
    safeSetActivityData({ ...safeActivityData, resultMissing: value });
  };

  const handleVolunteerHoursChange = (value: string) => {
    safeSetActivityData({ ...safeActivityData, volunteerHours: value });
  };

  const handleDsmAlgorithmChange = (value: 'O' | 'X') => {
    safeSetActivityData({ ...safeActivityData, dsmAlgorithm: value });
  };

  const handleInfoProcessingChange = (value: 'O' | 'X') => {
    safeSetActivityData({ ...safeActivityData, infoProcessing: value });
  };

  return (
    <Container>
      {/* 검정고시가 아닐 때만 출석/봉사 보이기 */}
      {!isQE && (
        <>
          <Section>
            <Text fontSize={24} fontWeight={600}>
              출석
            </Text>
            <GridContainer>
              <AttendanceForm
                width={'100%'}
                title="결석"
                value={safeActivityData?.absences || ''}
                onChange={handleAbsencesChange}
                suffix="회"
                defaultCount={10}
                prefix='미인정'
              />
              <AttendanceForm
                width={'100%'}
                title="조퇴"
                value={safeActivityData?.earlyLeaves || ''}
                onChange={handleEarlyLeavesChange}
                suffix="회"
                defaultCount={10}
                prefix='미인정'
              />
              <AttendanceForm
                width={'100%'}
                title="지각"
                value={safeActivityData?.lateArrivals || ''}
                onChange={handleLateArrivalsChange}
                suffix="회"
                defaultCount={10}
                prefix='미인정'
              />
              <AttendanceForm
                width={'100%'}
                title="결과"
                value={safeActivityData?.resultMissing || ''}
                onChange={handleResultMissingChange}
                suffix="회"
                defaultCount={10}
                prefix='미인정'
              />
            </GridContainer>
          </Section>
          <Section>
            <Text fontSize={24} fontWeight={600}>
              봉사
            </Text>
            <AttendanceForm
              width={'748px'}
              title="봉사시간"
              value={safeActivityData?.volunteerHours || ''}
              onChange={handleVolunteerHoursChange}
              suffix="시간"
              defaultCount={10}
            />
          </Section>
        </>
      )}
      <Section>
        <Text fontSize={24} fontWeight={600}>
          자격증
        </Text>
        <CertCheckForm
          width={'100%'}
          title="DSM 알고리즘 대회 입상"
          value={safeActivityData?.dsmAlgorithm || null}
          onChange={handleDsmAlgorithmChange}
        />
        <CertCheckForm
          width={'100%'}
          title="정보처리기능사 자격증 취득"
          value={safeActivityData?.infoProcessing || null}
          onChange={handleInfoProcessingChange}
        />
      </Section>
    </Container>
  );
};