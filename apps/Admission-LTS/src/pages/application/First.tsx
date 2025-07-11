import { Flex } from '@entry/design-token';
import { FormElement } from '@entry/ui';
import React from 'react';
import { usePageData } from '@entry/ui';

export const First = () => {
  const [datas, setDatas] = usePageData('first'); //context 데이터

  // Radio data
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

  const handleTypeSelection: React.Dispatch<React.SetStateAction<string>> = (
    value
  ) => {
    setDatas({ ...datas, typeSelection: value });
  };

  const handleRegionSelection: React.Dispatch<React.SetStateAction<string>> = (
    value
  ) => {
    setDatas({ ...datas, regionSelection: value });
  };

  const handleGraduationTypeSelection: React.Dispatch<
    React.SetStateAction<string>
  > = (value) => {
    setDatas({ ...datas, graduationType: value });
  };

  const handleDropdownChange = (values: (string | number)[]) => {
    setDatas({ ...datas, graduationDate: values });
  };

  const formDropDownData = [
    {
      data: [
        { label: '년', content: [2023, 2024, 2025, 2026] },
        { label: '월', content: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
      ],
    },
  ];

  console.log(datas);

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
        label="졸업 연월"
        type="dropDown"
        dropDownDatas={formDropDownData[0].data}
        dropDownValues={datas.graduationDate}
        onDropDownChange={handleDropdownChange}
      />
    </Flex>
  );
};
