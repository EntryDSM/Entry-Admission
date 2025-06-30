import { Flex, Text } from '@entry/design-token';
import { AttendanceForm } from '@entry/ui';

export const Activity = () => {
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
            defaultCount={10}
          />{' '}
          <AttendanceForm
            width={'748px'}
            title="미인정 조퇴"
            defaultCount={10}
          />
          <AttendanceForm
            width={'748px'}
            title="미인정 지각"
            defaultCount={10}
          />
          <AttendanceForm
            width={'748px'}
            title="미인정 결과"
            defaultCount={10}
          />
        </Flex>
      </Flex>
      <Flex isColumn={true} gap={24} width="fit-content" height="fit-content">
        <Text fontSize={24} fontWeight={600}>
          봉사
        </Text>
        <AttendanceForm width={'748px'} title="봉사시간" defaultCount={10} />
      </Flex>
    </>
  );
};
