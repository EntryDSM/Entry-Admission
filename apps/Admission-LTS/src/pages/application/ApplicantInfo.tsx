import React, { useState, useEffect } from 'react';
import { Flex } from '@entry/design-token';
import { FormElement } from '../../components';
import { usePageData } from '@entry/ui';
import { eachYearOfInterval, format, lastDayOfMonth, getDate } from 'date-fns';
import { usePostIdPhoto } from '../../apis';
import { getUserInfo } from '@entry/util-config';

export const ApplicantInfo = () => {
  const [datas, setDatas] = usePageData('applicantInfo');
  const [userInfoDatas, setUserInfoDatas] = useState<{isParent: boolean}>({
    isParent: false
  })

  // 1950~2025년 배열 (내림차순 정렬)
  const years = eachYearOfInterval({
    start: new Date(1950, 0, 1),
    end: new Date(2025, 11, 31),
  })
    .map((d) => parseInt(format(d, 'yyyy')))
    .sort((a, b) => b - a);

  // 월은 1~12 고정
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 선택된 년, 월에 따라 일수 배열 생성
  const getDaysInMonth = (year: number, month: number) => {
    if (!year || !month) return [];
    const lastDay = lastDayOfMonth(new Date(year, month - 1));
    const daysCount = getDate(lastDay);
    return Array.from({ length: daysCount }, (_, i) => i + 1);
  };

  // 생년월일 기본값: 2010년 1월 1일
  const selectedYear = datas?.dateOfBirth?.[0] || 2010;
  const selectedMonth = datas?.dateOfBirth?.[1] || 1;

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
      data: ['국가 유공자', '특례 입학 대상','해당 없음'],
    },
    {
      name: '성별',
      data: ['남성', '여성'],
    },
  ];

  const handleInputChange = (key: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDatas({ ...datas, [key]: value });
  };

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

  const postIdPhotoApi = usePostIdPhoto();
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleImgChange = async (file: File | null) => {
    if (file) {
      setUploadProgress(0);
      postIdPhotoApi.mutate(
        { file, onProgress: setUploadProgress },
        {
          onSuccess: () => {
            setDatas({ ...datas, idPhoto: file });
            setUploadProgress(100);
          },
        }
      );
    }
  };

  const handleGenderSelection = (value: string) => {
    setDatas({ ...datas, gender: value });
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
  
    if (cleaned.length === 11) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
    } else if (cleaned.length === 10) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
  
    return phoneNumber;
  };


  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      setUserInfoDatas({
        isParent: userInfo.isParent,
      });

      if(userInfo.isParent === false) {
        setDatas({
          ...datas,
          applicantName: userInfo.name,
          applicantNumber: formatPhoneNumber(userInfo.phoneNumber)
        })
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <Flex isColumn={true} width="100%" height="fit-content" gap={16}>
      <FormElement
        type="imgSelector"
        label="증명 사진"
        onFileChange={handleImgChange}
        imgUrl={datas.idPhoto}
        isLoading={postIdPhotoApi.isPending}
        progressPercentage={uploadProgress}
        explanation="증명사진은 3×4cm 규격이어야 하며, 파일 형식은 HEIC·JPG·JPEG·PNG만 가능합니다. 파일 용량은 5MB 이하로 제한됩니다."
      />
      <FormElement
        width="300px"
        type="input"
        label="지원자 성명"
        placeholder="지원자 성명"
        inputType="text"
        onInputChange={handleNameChange}
        value={datas.applicantName}
        readonly={userInfoDatas.isParent ? false : true}
      />
      <FormElement
        width="300px"
        type="input"
        label="지원자 연락처"
        inputType="phone"
        placeholder="전화번호를 입력해주세요."
        onInputChange={handleInputChange('applicantNumber')}
        value={datas.applicantNumber}
        readonly={userInfoDatas.isParent ? false : true}
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
        dropDownValues={datas.dateOfBirth || [2010, 1, 1]}
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
