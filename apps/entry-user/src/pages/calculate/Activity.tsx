import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Flex, Text } from '@entry/design-token';
import { AttendanceForm, usePageData } from '@entry/ui';

export const Activity = () => {
  const location = useLocation();
  
  // 경로에 따라 다른 키 사용
  const getDataKey = () => {
    if (location.pathname.includes('primary/activity')) return 'primaryActivity';
    if (location.pathname.includes('graduated/activity')) return 'graduatedActivity';
    if (location.pathname.includes('qe/activity')) return 'qeActivity';
    return 'activity'; // 기본값
  };
  
  const [activityData, setActivityData] = usePageData(getDataKey());
  
  // 초기값이 없으면 빈 객체로 설정
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
    <>
      <Flex isColumn={true} gap={24} width="fit-content" height="fit-content">
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
            width={'748px'}
            title="미인정 결석"
            value={safeActivityData?.absences || ''}
            onChange={handleAbsencesChange}
            suffix="회"
            defaultCount={10}
          />
          <AttendanceForm
            width={'748px'}
            title="미인정 조퇴"
            value={safeActivityData?.earlyLeaves || ''}
            onChange={handleEarlyLeavesChange}
            suffix="회"
            defaultCount={10}
          />
          <AttendanceForm
            width={'748px'}
            title="미인정 지각"
            value={safeActivityData?.lateArrivals || ''}
            onChange={handleLateArrivalsChange}
            suffix="회"
            defaultCount={10}
          />
          <AttendanceForm
            width={'748px'}
            title="미인정 결과"
            value={safeActivityData?.resultMissing || ''}
            onChange={handleResultMissingChange}
            suffix="회"
            defaultCount={10}
          />
        </Flex>
      </Flex>
      <Flex isColumn={true} gap={24} width="fit-content" height="fit-content">
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
      </Flex>
    </>
  );
};
