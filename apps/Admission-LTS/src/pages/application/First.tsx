import { Flex } from '@entry/design-token';
import { FormElement } from '@entry/ui';
import { usePageData } from '@entry/ui';
import { eachYearOfInterval, format } from 'date-fns';

export const First = () => {
  const [datas, setDatas] = usePageData('first');

  // 1990 ~ 2026 연도 생성
  const yearDates = eachYearOfInterval({
    start: new Date(1990, 0, 1),
    end: new Date(2026, 11, 31),
  });
  const years = yearDates.map((date) => parseInt(format(date, 'yyyy')));

  //월은 고정 1~12
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const formDropDownData = [
    {
      data: [
        { label: '년', content: years },
        { label: '월', content: months },
      ],
    },
  ];

  const formRadioData = [
    {
      name: '전형선택',
      data: ['일반', '마이스터 인재', '사회통합 인재'],
    },
    {
      name: '지역선택',
      data: ['대전', '전국'],
    },
    {
      name: '졸업구분',
      data: ['졸업 예정', '졸업', '검정고시 (중학교 졸업 학력)'],
    },
  ];

  const handleTypeSelection = (value: string) => {
    setDatas({ ...datas, typeSelection: value });
  };

  const handleRegionSelection = (value: string) => {
    setDatas({ ...datas, regionSelection: value });
  };

  const handleGraduationTypeSelection = (value: string) => {
    setDatas({ ...datas, graduationType: value });
  };

  const handleDropdownChange = (values: (string | number)[]) => {
    setDatas({ ...datas, graduationDate: values });
  };


  return (
    <Flex width="100%" height="fit-content" isColumn={true} gap={16}>
      <FormElement
        label="전형 선택"
        type="radio"
        radioDatas={formRadioData[0].data}
        selectedRadio={datas.typeSelection}
        setSelectedRadio={handleTypeSelection}
      />

      <FormElement
        label="지역 선택"
        type="radio"
        radioDatas={formRadioData[1].data}
        selectedRadio={datas.regionSelection}
        setSelectedRadio={handleRegionSelection}
      />

      <FormElement
        label="졸업 구분"
        type="radio"
        radioDatas={formRadioData[2].data}
        selectedRadio={datas.graduationType}
        setSelectedRadio={handleGraduationTypeSelection}
      />

      <FormElement
        explanation="졸업 예정자의 경우 졸업 예정월만 선택해주세요."
        label="졸업 연월"
        type="dropDown"
        dropDownDatas={formDropDownData[0].data}
        dropDownValues={datas.graduationDate}
        onDropDownChange={handleDropdownChange}
      />
    </Flex>
  );
};
