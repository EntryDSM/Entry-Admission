import { Flex } from '@entry/design-token';
import { AttendanceForm, usePageData } from '@entry/ui';

export const GedScore = () => {
  const [datas, setDatas] = usePageData('gedScore');
  const handleKoreanChange = (value: string) => {
    setDatas({ ...datas, kor: value });
  };

  const handleSocialStudiesChange = (value: string) => {
    setDatas({ ...datas, soc: value });
  };

  const handleHistoryChange = (value: string) => {
    setDatas({ ...datas, his: value });
  };

  const handleScienceChange = (value: string) => {
    setDatas({ ...datas, sci: value });
  };

  const handleTechAndHomeEconomicsChange = (value: string) => {
    setDatas({ ...datas, tech: value });
  };

  const handleMathChange = (value: string) => {
    setDatas({ ...datas, math: value });
  };

  const handleEnglishChange = (value: string) => {
    setDatas({ ...datas, eng: value });
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
          value={datas.kor}
        />
        <AttendanceForm
          onChange={handleSocialStudiesChange}
          width={'498px'}
          title="사회"
          defaultCount={10}
          suffix="점"
          value={datas.soc}
        />
        <AttendanceForm
          onChange={handleHistoryChange}
          width={'498px'}
          title="역사"
          defaultCount={10}
          suffix="점"
          value={datas.his}
        />
        <AttendanceForm
          onChange={handleScienceChange}
          width={'498px'}
          title="과학"
          defaultCount={10}
          suffix="점"
          value={datas.sci}
        />
        <AttendanceForm
          onChange={handleTechAndHomeEconomicsChange}
          width={'498px'}
          title="기술 · 가정"
          defaultCount={10}
          suffix="점"
          value={datas.tech}
        />
        <AttendanceForm
          onChange={handleMathChange}
          value={datas.math}
          width={'498px'}
          title="수학"
          defaultCount={10}
          suffix="점"
        />
        <AttendanceForm
          onChange={handleEnglishChange}
          value={datas.eng}
          width={'498px'}
          title="영어"
          defaultCount={10}
          suffix="점"
        />
      </Flex>
    </div>
  );
};
