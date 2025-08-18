import { colors, Flex, Text } from "@entry/design-token";
import { Button } from "@entry/ui";
import { lastDayOfMonth, getDate } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router";
import { DropDownSection } from "../components";

type ScheduleType = (string | number)[];

type ScheduleState = {
  applicationStart: ScheduleType;   // [월, 일, 시, 분]
  applicationEnd: ScheduleType;
  firstAnnouncement: ScheduleType;
  interview: ScheduleType;
  finalAnnouncement: ScheduleType;
};

export const AdmissionsSchedule = () => {
  const navigate = useNavigate()
  const [datas, setDatas] = useState<ScheduleState>({
    applicationStart: [],
    applicationEnd: [],
    firstAnnouncement: [],
    interview: [],
    finalAnnouncement: [],
  });

  console.log(datas)

  // 월, 시, 분 배열
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  // 선택된 월에 따라 일 수 계산 (윤년 기준 2024년 사용)
  const getDaysInMonth = (month?: number) => {
    if (!month) return [];
    const lastDay = lastDayOfMonth(new Date(2024, month - 1));
    const daysCount = getDate(lastDay);
    return Array.from({ length: daysCount }, (_, i) => i + 1);
  };

  const handleDropdownChange = (
    key: keyof ScheduleState,
    values: ScheduleType
  ) => {
    setDatas((prev) => ({
      ...prev,
      [key]: values,
    }));
  };

  const handleSaveClick = () => {
    //저장 api
  }

  const renderScheduleForm = (label: string, key: keyof ScheduleState) => {
    const selectedMonth = datas[key]?.[0] as number || months[0];
    const days = getDaysInMonth(selectedMonth);

    return (
      <DropDownSection
        label={label}
        onDropDownChange={(values) => handleDropdownChange(key, values)}
        dropDownDatas={[
          { label: "월", content: months },
          { label: "일", content: days },
          { label: "시", content: hours },
          { label: "분", content: minutes },
        ]}
        dropDownValues={datas[key]}
      />
    );
  };

  return (
    <Flex isColumn={true} width="100%" height="auto" gap={20}>
      <Flex width="100%" height="fit-content" justifyContent="space-between" alignItems="center">
        <Text fontSize={32} fontWeight={700}>전형 일정 수정</Text>
        <Flex width="fit-content" height="fit-content" gap={12}>
          <Button onClick={handleSaveClick} backgroundColor={colors.green[500]} hoverBackgroundColor='none'>저장</Button>
          <Button onClick={() => navigate(-1)} backgroundColor={colors.gray[50]} hoverBackgroundColor="none" borderColor={colors.gray[200]} color={colors.gray[500]}>취소</Button>
        </Flex>
      </Flex>
      <Flex width="100%" height="auto" isColumn={true} gap={16}>
        {renderScheduleForm("원서 제출 시작", "applicationStart")}
        {renderScheduleForm("원서 제출 마감", "applicationEnd")}
        {renderScheduleForm("1차 발표", "firstAnnouncement")}
        {renderScheduleForm("심층 면접", "interview")}
        {renderScheduleForm("최종 발표", "finalAnnouncement")}
      </Flex>
    </Flex>
  );
};
