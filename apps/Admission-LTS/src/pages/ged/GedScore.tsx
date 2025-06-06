import { Flex } from '@entry/design-token';
import { AttendanceForm } from '@entry/ui';

export const GedScore = () => {
  return (
    <div>
      <Flex
        height="fit-content"
        flexWrap="wrap"
        width="100%"
        gapX={22}
        gapY={24}
      >
        <AttendanceForm width={'498px'} title="국어" defaultCount={10} />{' '}
        <AttendanceForm width={'498px'} title="사회" defaultCount={10} />
        <AttendanceForm width={'498px'} title="역사" defaultCount={10} />
        <AttendanceForm width={'498px'} title="과학" defaultCount={10} />
        <AttendanceForm width={'498px'} title="기술 · 가정" defaultCount={10} />
        <AttendanceForm width={'498px'} title="수학" defaultCount={10} />
      </Flex>
    </div>
  );
};
