import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { Flex, Text } from '@entry/design-token';
import { AttendanceForm, usePageData } from '@entry/ui';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 48px;
  width: 100%;
  height: fit-content;
`;

const Section = styled.div`
  flex: 1;
  width: calc(50% - 24px);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Activity = () => {
  const location = useLocation();
  
  const getDataKey = () => {
    if (location.pathname.includes('primary/activity')) return 'primaryActivity';
    if (location.pathname.includes('graduated/activity')) return 'graduatedActivity';
    if (location.pathname.includes('qe/activity')) return 'qeActivity';
    return 'activity';
  };
  
  const [activityData, setActivityData] = usePageData(getDataKey());
  
  const safeActivityData = activityData || {};
  const safeSetActivityData = (data: any) => {
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

  return (
    <Container>
      <Section>
        <Text fontSize={24} fontWeight={600}>
          출석
        </Text>
        <Flex
          height="fit-content"
          flexWrap="wrap"
          width="100%"
          gapX={22}
          gapY={24}
        >
          <AttendanceForm
            width={'100%'}
            title="미인정 결석"
            value={safeActivityData?.absences || ''}
            onChange={handleAbsencesChange}
            suffix="회"
            defaultCount={10}
          />
          <AttendanceForm
            width={'100%'}
            title="미인정 조퇴"
            value={safeActivityData?.earlyLeaves || ''}
            onChange={handleEarlyLeavesChange}
            suffix="회"
            defaultCount={10}
          />
          <AttendanceForm
            width={'100%'}
            title="미인정 지각"
            value={safeActivityData?.lateArrivals || ''}
            onChange={handleLateArrivalsChange}
            suffix="회"
            defaultCount={10}
          />
          <AttendanceForm
            width={'100%'}
            title="미인정 결과"
            value={safeActivityData?.resultMissing || ''}
            onChange={handleResultMissingChange}
            suffix="회"
            defaultCount={10}
          />
        </Flex>
      </Section>
      <Section>
        <Text fontSize={24} fontWeight={600}>
          봉사
        </Text>
        <AttendanceForm 
          width={'100%'} 
          title="봉사시간" 
          value={safeActivityData?.volunteerHours || ''}
          onChange={handleVolunteerHoursChange}
          suffix="시간"
          defaultCount={10} 
        /> 
      </Section>
    </Container>
  );
};