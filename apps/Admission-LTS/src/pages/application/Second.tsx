import { Flex } from '@entry/design-token';
import { FormElement } from '@entry/ui';
import React, { useEffect, useState } from 'react';
import { usePageData } from '@entry/ui';

export const Second = () => {
  const [imgUrlValue, setImgUrlValue] = useState<string | null>(null);

  console.log(imgUrlValue);

  const [datas, setDatas] = usePageData('second');

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDatas({ ...datas, applicantName: value });
  };

  const handleDropdownChange = (values: (string | number)[]) => {
    setDatas({ ...datas, dateOfBirth: values });
  };

  const handleEtcChange: React.Dispatch<React.SetStateAction<string>> = (
    value
  ) => {
    const newValue =
      typeof value === 'function' ? value(datas.specialNotes) : value;
    setDatas({ ...datas, specialNotes: newValue });
  };

  useEffect(() => {
    setDatas({ ...datas, idPhoto: imgUrlValue });
  }, [imgUrlValue]);

  //radio data
  const formRadioData = [
    {
      data: ['국가 유공자', '특례 입학 대상'],
    },
  ];

  //dropdown data
  const formDropDownData = [
    {
      data: [
        { label: '년', content: [2023, 2024, 2025, 2026] },
        { label: '월', content: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
        { label: '일', content: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
      ],
    },
  ];

  console.log(datas);

  return (
    <Flex isColumn={true} width="100%" height="fit-content">
      <FormElement
        type="imgSelector"
        label="증명 사진"
        setImgUrl={setImgUrlValue}
        imgUrl={imgUrlValue}
      />
      <FormElement
        width="300px"
        type="input"
        label="지원자 성명"
        placeholder="지원자 성명"
        onChange={handleNameChange}
        value={datas.applicantName}
      />
      <FormElement
        type="dropDown"
        label="생년월일"
        explanation="졸업 예정자의 경우 졸업 예정월만 선택해주세요."
        dropDownDatas={formDropDownData[0].data}
        warning="졸업 예정자의 경우 졸업 예정월만 선택해주세요."
        onDropDownChange={handleDropdownChange}
        dropDownValues={datas.dateOfBirth}
      />
      <FormElement
        type="radio"
        label="특기 사항"
        radioDatas={formRadioData[0].data}
        warning="특기사항에 해당하시는 항목이 있으면 체크해주세요."
        setSelectedRadio={handleEtcChange}
        selectedRadio={datas.specialNotes}
      />
    </Flex>
  );
};
