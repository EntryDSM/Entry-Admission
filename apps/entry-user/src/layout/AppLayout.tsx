import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { CommonHeader, FormElement } from '@entry/ui';
import { useState, useEffect } from 'react';

export const AppLayout = () => {
  // dropDown 데이터 정의 - 컴포넌트 외부에 선언해도 됨
  const dropData = [
    {
      label: '년',
      content: [2012, 2013, 2014, 2015],
    },
    {
      label: '일',
      content: [1, 2, 3, 4],
    },
  ];

  const radioDate = ['옵션1', '옵션2', '옵션3'];

  // 기본값으로 각 드롭다운의 첫 번째 옵션을 설정
  const initialDropDownValues = dropData.map((item) =>
    Array.isArray(item.content) ? item.content[0] : item.content
  );

  // 상태 초기화
  const [formValues, setFormValues] = useState({
    textArea: '',
    search: '',
    input: '',
    radio: radioDate[0], // 첫 번째 라디오 옵션을 기본값으로 설정
    dropDown: initialDropDownValues, // 초기화된 드롭다운 값 사용
    imgUrl: null as string | null,
  });

  // 드롭다운 값 변경 핸들러
  const handleDropDownChange = (values: (string | number)[]) => {
    setFormValues((prev) => ({ ...prev, dropDown: values }));
  };

  // 라디오 버튼 선택 핸들러
  const handleRadioSelect = (value: string) => {
    setFormValues((prev) => ({ ...prev, radio: value }));
  };

  // 이미지 업로드 핸들러
  const handleImageChange = (url: string | null) => {
    setFormValues((prev) => ({ ...prev, imgUrl: url }));
  };

  // 파일 변경 핸들러 - 필요한 경우 사용
  const handleFileChange = (file: File | null) => {
    if (file) {
      console.log('File selected:', file.name);
      // 필요한 경우 파일 처리 로직 추가
    }
  };

  return (
    <>
      <CommonHeader />
      <Main>
        <FormElement
          explanation="텍스트 영역에 내용을 입력하세요"
          warning="이 필드는 필수입니다"
          type="textArea"
          label="텍스트에어리어"
          value={formValues.textArea}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, textArea: e.target.value }))
          }
        />

        <FormElement
          explanation="검색어를 입력하세요"
          warning="검색 결과는 제한적일 수 있습니다"
          type="search"
          label="검색"
          value={formValues.search}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, search: e.target.value }))
          }
        />

        <FormElement
          explanation="텍스트를 입력하세요"
          warning="이 필드는 필수입니다"
          type="input"
          label="일반 인풋"
          placeholder="입력하세요"
          value={formValues.input}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, input: e.target.value }))
          }
        />

        <FormElement
          explanation="옵션 중 하나를 선택하세요"
          warning="반드시 하나를 선택해야 합니다"
          type="radio"
          label="라디오 선택"
          radioDatas={radioDate}
          selectedRadio={formValues.radio}
          setSelectedRadio={handleRadioSelect}
        />

        <FormElement
          explanation="날짜를 선택하세요"
          warning="유효한 날짜를 선택해야 합니다"
          type="dropDown"
          label="드롭다운"
          dropDownDatas={dropData}
          dropDownValues={formValues.dropDown}
          onDropDownChange={handleDropDownChange}
        />

        <FormElement
          imgUrl={formValues.imgUrl}
          setImgUrl={handleImageChange}
          onFileChange={handleFileChange}
          explanation="이미지를 업로드하세요"
          warning="허용된 파일 형식: JPG, PNG"
          type="imgSelector"
          label="이미지 업로드"
        />

        <Outlet />
      </Main>
    </>
  );
};

const Main = styled.main`
  width: 100vw;
  margin-top: 70px;
`;
