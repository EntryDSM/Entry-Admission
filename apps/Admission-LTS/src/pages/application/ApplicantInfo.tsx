import React, { useState, useEffect } from 'react';
import { Flex } from '@entry/design-token';
import { FormElement } from '../../components';
import { usePageData } from '@entry/ui';
import { eachYearOfInterval, format, lastDayOfMonth, getDate } from 'date-fns';
import { uploadImage } from '../../apis';

export const ApplicantInfo = () => {
  const [datas, setDatas] = usePageData('applicantInfo');

  // 1990~2025년 배열
  const years = eachYearOfInterval({
    start: new Date(1990, 0, 1),
    end: new Date(2025, 11, 31),
  }).map((d) => parseInt(format(d, 'yyyy')));

  // 월은 1~12 고정
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 선택된 년, 월에 따라 일수 배열을 생성 (윤년, 30일, 31일)
  const getDaysInMonth = (year: number, month: number) => {
    if (!year || !month) return [];
    const lastDay = lastDayOfMonth(new Date(year, month - 1));
    const daysCount = getDate(lastDay);
    return Array.from({ length: daysCount }, (_, i) => i + 1);
  };

  const selectedYear = datas?.dateOfBirth?.[0] || years[0];
  const selectedMonth = datas?.dateOfBirth?.[1] || months[0];

  // day 배열 계산
  const days = getDaysInMonth(selectedYear as number, selectedMonth as number);

  const formDropDownData = [
    {
      data: [
        { label: '년', content: years },
        { label: '월', content: months },
        { label: '일', content: days },
      ],
    },
  ];

  const formRadioData = [
    {
      data: ['국가 유공자', '특례 입학 대상'],
    },
    {
      name: '성별',
      data: ['남성', '여성'],
    },
  ];

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDatas({ ...datas, applicantName: value });
  };

  const handleDropdownChange = (values: (string | number)[]) => {
    setDatas({ ...datas, dateOfBirth: values });
  };

  const handleEtcChange = (value: string) => {
    setDatas({ ...datas, specialNotes: value });
  };

  const handleImgChange = async (file: File | null) => {
    if (file) {
      try {
        const response = await uploadImage(file);
        setDatas({ ...datas, idPhoto: response.imageUrl });
        console.log('이미지 업로드 성공:', response.imageUrl);
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        // 업로드 실패 시 로컬 파일로 설정 (임시)
        setDatas({ ...datas, idPhoto: file });
      }
    }
  };

  const handleGenderSelection = (value: string) => {
    setDatas({ ...datas, gender: value });
  };

  return (
    <Flex isColumn={true} width="100%" height="fit-content" gap={16}>
      <FormElement
        type="imgSelector"
        label="증명 사진"
        onFileChange={handleImgChange}
        imgUrl={datas.idPhoto}
      />
      <FormElement
        width="300px"
        type="input"
        label="지원자 성명"
        placeholder="지원자 성명"
        inputType="text"
        onInputChange={handleNameChange}
        value={datas.applicantName}
      />
      <FormElement
        label={formRadioData[1].name}
        type="radio"
        radioDatas={formRadioData[1].data}
        selectedRadio={datas.gender}
        setSelectedRadio={handleGenderSelection}
      />
      <FormElement
        type="dropDown"
        label="생년월일"
        onDropDownChange={handleDropdownChange}
        dropDownDatas={formDropDownData[0].data}
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