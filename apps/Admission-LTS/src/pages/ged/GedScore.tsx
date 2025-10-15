import { Flex } from '@entry/design-token';
import { AttendanceForm, usePageData } from '@entry/ui';

const SUBJECTS = [
  { key: 'kor', title: '국어' },
  { key: 'soc', title: '사회' },
  { key: 'his', title: '역사' },
  { key: 'sci', title: '과학' },
  { key: 'tech', title: '기술 · 가정' },
  { key: 'math', title: '수학' },
  { key: 'eng', title: '영어' },
] as const;

export const GedScore = () => {
  const [datas, setDatas] = usePageData('gedScore');

  const handleChange = (key: string) => (value: string) => {
    setDatas({ ...datas, [key]: value === '' ? null : value });
  };

  return (
    <div>
      <Flex
        height="fit-content"
        flexWrap="wrap"
        width="100%"
        gapX={22}
        gapY={24}
      >
        {SUBJECTS.map(({ key, title }) => (
          <AttendanceForm
            key={key}
            onChange={handleChange(key)}
            width="498px"
            title={title}
            suffix="점"
            value={datas[key]}
            maxScore={100}
          />
        ))}
      </Flex>
    </div>
  );
};
