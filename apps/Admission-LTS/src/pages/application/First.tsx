import { Flex } from '@entry/design-token';
import { FormElement } from '@entry/ui';
import { usePageData } from '@entry/ui';
import { eachYearOfInterval, format, lastDayOfMonth, getDate } from 'date-fns';

export const First = () => {
  const [datas, setDatas] = usePageData('first');

  // 1990 ~ 2025년 생성
  const yearDates = eachYearOfInterval({
    start: new Date(1990, 0, 1),
    end: new Date(2025, 11, 31),
  });
  const years = yearDates.map((date) => parseInt(format(date, 'yyyy')));

  // 월은 고정 1~12
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 선택된 년, 월에 따라 일수 배열을 생성 (윤년, 30일, 31일)
  const getDaysInMonth = (year: number, month: number) => {
    if (!year || !month) return [];
    const lastDay = lastDayOfMonth(new Date(year, month - 1));
    const daysCount = getDate(lastDay);
    return Array.from({ length: daysCount }, (_, i) => i + 1);
  };

  const selectedYear = datas.graduationDate?.[0] || years[0];
  const selectedMonth = datas.graduationDate?.[1] || months[0];

  // day 배열 계산
  const days = getDaysInMonth(selectedYear as number, selectedMonth as number);

  // 졸업구분에 따른 드롭다운 데이터 생성
  const getFormDropDownData = () => {
    if (datas.graduationType === "졸업") {
      // 졸업: 년월일 모두 표시
      return [
        {
          data: [
            { label: '년', content: years },
            { label: '월', content: months },
            { label: '일', content: days },
          ],
        },
      ];
    } else if (datas.graduationType === "졸업 예정") {
      // 졸업 예정: 년월만 표시
      return [
        {
          data: [
            { label: '년', content: years },
            { label: '월', content: months },
          ],
        },
      ];
    }
    // 검정고시의 경우 빈 배열 반환 (드롭다운 숨김)
    return [];
  };

  const formDropDownData = getFormDropDownData();

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
    // 졸업구분이 변경되면 기존 졸업날짜 초기화
    setDatas({ ...datas, graduationType: value, graduationDate: [] });
  };

  const handleDropdownChange = (values: (string | number)[]) => {
    setDatas({ ...datas, graduationDate: values });
  };

  // 설명 텍스트 동적 생성
  const getExplanationText = () => {
    if (datas.graduationType === "졸업") {
      return "졸업한 연월일을 모두 선택해주세요.";
    } else if (datas.graduationType === "졸업 예정") {
      return "졸업 예정자의 경우 졸업 예정월만 선택해주세요.";
    }
    return "";
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
      {datas.graduationType && 
       datas.graduationType !== "검정고시 (중학교 졸업 학력)" && 
       formDropDownData.length > 0 && (
        <FormElement
          explanation={getExplanationText()}
          label={datas.graduationType === "졸업" ? "졸업 연월일" : "졸업 예정 연월"}
          type="dropDown"
          dropDownDatas={formDropDownData[0].data}
          dropDownValues={datas.graduationDate}
          onDropDownChange={handleDropdownChange}
        />
      )}
    </Flex>
  );
};