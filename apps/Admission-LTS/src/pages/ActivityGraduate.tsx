import { colors, Flex, Text } from '@entry/design-token';
import { AttendanceForm, Caution, CertCheckForm, usePageData } from '@entry/ui';

export const ActivityGraduate = () => {
  const [datas, setDatas] = usePageData('activityGraduate');

  const safeData = datas || { dsmAlgorithm: null, certificate: null };

  const dsmAlgorithmChange = (value: 'O' | 'X' | null) => {
    setDatas({ ...safeData, dsmAlgorithm: value });
  };
  const certificateChange = (value: 'O' | 'X' | null) => {
    setDatas({ ...safeData, certificate: value });
  };

  const earlyLeaveChange = (value: string) => {
    setDatas({ ...safeData, earlyLeave: value });
  };

  const tardinessChange = (value: string) => {
    setDatas({ ...safeData, tardiness: value });
  };

  const classExitChange = (value: string) => {
    setDatas({ ...safeData, classExit: value });
  };

  const absenceChange = (value: string) => {
    setDatas({ ...safeData, absence: value });
  };

  const unexcusedChange = (value: string) => {
    setDatas({ ...safeData, unexcused: value });
  };

  const volunteerChange = (value: string) => {
    setDatas({ ...safeData, volunteer: value });
  };

  return (
    <Flex isColumn={true} gap={40} width="100%" height="100%">
      <Flex isColumn={true} gap={24} width="100%" height="fit-content">
        <Flex flexWrap='wrap' width='fit-content' height='fit-content' alignItems='center' gap={20}>
          <Text fontSize={24} fontWeight={600}>
            출결
          </Text>
          <Flex width='fit-content' height='fit-content' gap={8} alignItems='center'>
            <Caution/>
            <Text fontSize={16} fontWeight={300} color={colors.orange[700]}>
              출결은 9월 30일까지의 1,2,3학년 전체 합산합니다.
            </Text>
          </Flex>
        </Flex>
        <Flex
          height="fit-content"
          flexWrap="wrap"
          width="100%"
          gapX={22}
          gapY={24}
        >
          <AttendanceForm
            width={'48%'}
            title="미인정 결석"
            defaultCount={10}
            onChange={absenceChange}
            value={datas.absence}
            suffix="회"
          />
          <AttendanceForm
            width={'48%'}
            title="미인정 조퇴"
            defaultCount={10}
            onChange={earlyLeaveChange}
            value={datas.earlyLeave}
            suffix="회"
          />
          <AttendanceForm
            width={'48%'}
            title="미인정 지각"
            defaultCount={10}
            onChange={tardinessChange}
            value={datas.tardiness}
            suffix="회"
          />
          <AttendanceForm
            width={'48%'}
            title="미인정 결과"
            defaultCount={10}
            value={datas.classExit}
            suffix="회"
            onChange={classExitChange}
          />
          {/* <AttendanceForm
            width={'48%'}
            title="미인정"
            defaultCount={10}
            value={datas.unexcused}
            suffix="회"
            onChange={unexcusedChange}
          /> */}
        </Flex>
      </Flex>
      <Flex isColumn={true} gap={24} width="fit-content" height="fit-content">
        <Flex flexWrap='wrap' width='fit-content' height='fit-content' alignItems='center' gap={20}>
          <Text fontSize={24} fontWeight={600}>
            봉사
          </Text>
          <Flex width='fit-content' height='fit-content' gap={8} alignItems='center'>
            <Caution/>
            <Text fontSize={16} fontWeight={300} color={colors.orange[700]}>
              봉사 시간은 9월 30일까지의 1, 2, 3학년 전체 시간을 합산합니다.
            </Text>
          </Flex>
        </Flex>
        <AttendanceForm
          onChange={volunteerChange}
          value={datas.volunteer}
          suffix="시간"
          width={'400px'}
          title="봉사시간"
          defaultCount={10}
        />
      </Flex>
      <Flex isColumn={true} gap={24} width="100%" height="fit-content">
        <Text fontSize={24} fontWeight={600}>
          자격증
        </Text>
        <Flex isColumn={true} width="100%" gap={0} height="fit-content">
          <CertCheckForm
            onChange={dsmAlgorithmChange}
            title="DSM 알고리즘 대회 입상"
            value={safeData.dsmAlgorithm}
          />
          <CertCheckForm
            onChange={certificateChange}
            title="정보처리기능사 자격증 취득"
            value={safeData.certificate}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
