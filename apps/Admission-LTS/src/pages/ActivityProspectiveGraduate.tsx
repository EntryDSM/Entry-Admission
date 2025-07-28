import { Flex, Text } from '@entry/design-token';
import { AttendanceForm, CertCheckForm, usePageData } from '@entry/ui';

export const ActivityProspectiveGraduate = () => {
  const [datas, setDatas] = usePageData('activityGraduateProspective');

  const safeData = datas || { dsmAlgorithm: null, certificate: null };

  const dsmAlgorithmChange = (value: 'O' | 'X' | null) => {
    setDatas({ ...safeData, dsmAlgorithm: value });
  };
  const certificateChange = (value: 'O' | 'X' | null) => {
    setDatas({ ...safeData, certificate: value });
  };

  const unexcusedEarlyLeaveChange = (value: string) => {
    setDatas({ ...safeData, unexcusedEarlyLeave: value });
  };

  const unexcusedTardinessChange = (value: string) => {
    setDatas({ ...safeData, unexcusedTardiness: value });
  };

  const unexcusedResultChange = (value: string) => {
    setDatas({ ...safeData, unexcusedResult: value });
  };

  const unexcusedAbsenceChange = (value: string) => {
    setDatas({ ...safeData, unexcusedAbsence: value });
  };

  const volunteerChange = (value: string) => {
    setDatas({ ...safeData, volunteer: value });
  };

  return (
    <Flex isColumn={true} gap={40} width="100%" height="100%">
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
            defaultCount={10}
            onChange={unexcusedAbsenceChange}
            value={datas.unexcusedAbsence}
            suffix="회"
          />
          <AttendanceForm
            width={'748px'}
            title="미인정 조퇴"
            defaultCount={10}
            onChange={unexcusedEarlyLeaveChange}
            value={datas.unexcusedEarlyLeave}
            suffix="회"
          />
          <AttendanceForm
            width={'748px'}
            title="미인정 지각"
            defaultCount={10}
            onChange={unexcusedTardinessChange}
            value={datas.unexcusedTardiness}
            suffix="회"
          />
          <AttendanceForm
            width={'748px'}
            title="미인정 결과"
            defaultCount={10}
            value={datas.unexcusedResult}
            suffix="회"
            onChange={unexcusedResultChange}
          />
        </Flex>
      </Flex>
      <Flex isColumn={true} gap={24} width="fit-content" height="fit-content">
        <Text fontSize={24} fontWeight={600}>
          봉사
        </Text>
        <AttendanceForm
          onChange={volunteerChange}
          value={datas.volunteer}
          suffix="시간"
          width={'748px'}
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
