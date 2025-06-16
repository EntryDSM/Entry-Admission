import { Flex } from '@entry/design-token';
import { AttendanceForm, usePageData } from '@entry/ui';

export const GedScore = () => {
  const [datas, setDatas] = usePageData('gedScore');
  const handleKoreanChange = (value: string) => {
    setDatas({ ...datas, korean: value });
  };

  const handleSocialStudiesChange = (value: string) => {
    setDatas({ ...datas, socialStudies: value });
  };

  const handleHistoryChange = (value: string) => {
    setDatas({ ...datas, history: value });
  };

  const handleScienceChange = (value: string) => {
    setDatas({ ...datas, science: value });
  };

  const handleTechAndHomeEconomicsChange = (value: string) => {
    setDatas({ ...datas, techAndHomeEconomics: value });
  };

  const handleMathChange = (value: string) => {
    setDatas({ ...datas, math: value });
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
        <AttendanceForm
          onChange={handleKoreanChange}
          width={'498px'}
          title="국어"
          defaultCount={10}
          suffix="점"
          value={datas.korean}
        />{' '}
        <AttendanceForm
          onChange={handleSocialStudiesChange}
          width={'498px'}
          title="사회"
          defaultCount={10}
          suffix="점"
          value={datas.socialStudies}
        />
        <AttendanceForm
          onChange={handleHistoryChange}
          width={'498px'}
          title="역사"
          defaultCount={10}
          suffix="점"
          value={datas.history}
        />
        <AttendanceForm
          onChange={handleScienceChange}
          width={'498px'}
          title="과학"
          defaultCount={10}
          suffix="점"
          value={datas.science}
        />
        <AttendanceForm
          onChange={handleTechAndHomeEconomicsChange}
          width={'498px'}
          title="기술 · 가정"
          defaultCount={10}
          suffix="점"
          value={datas.techAndHomeEconomics}
        />
        <AttendanceForm
          onChange={handleMathChange}
          value={datas.math}
          width={'498px'}
          title="수학"
          defaultCount={10}
          suffix="점"
        />
      </Flex>
    </div>
  );
};
