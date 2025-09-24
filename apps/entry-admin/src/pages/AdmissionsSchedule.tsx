import { colors, Flex, Text } from "@entry/design-token";
import { Button } from "@entry/ui";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DropDownSection } from "../components";
import { useGetAllSchedule, useUpdateSchedule } from "../apis";

// 서버 요청용 형식 변환 (yyyy-MM-ddTHH:mm:ss)
const formatForServer = (value: string) => {
  if (!value) return "";
  return value.length === 16 ? value + ":00" : value; // input은 초가 없으므로 :00 붙이기
};

// input에 넣기 위한 변환 (yyyy-MM-ddTHH:mm)
const formatForInput = (value: string) => {
  if (!value) return "";
  return value.slice(0, 16); // 초(:ss) 제거
};

export const AdmissionsSchedule = () => {
  const navigate = useNavigate();
  const [datas, setDatas] = useState<{
    applicationStart: string;
    applicationEnd: string;
    firstAnnouncement: string;
    interview: string;
    finalAnnouncement: string;
  }>({
    applicationStart: "",
    applicationEnd: "",
    firstAnnouncement: "",
    interview: "",
    finalAnnouncement: "",
  });

  const { data: scheduleData } = useGetAllSchedule();

  // 서버 응답값을 input value 형식으로 변환 후 state 세팅
  useEffect(() => {
  if (!scheduleData?.schedules) return;

  const findDate = (type: string) =>
    scheduleData.schedules.find((s: any) => s.type === type)?.date || "";

  setDatas({
    applicationStart: formatForInput(findDate("START_DATE")),
    applicationEnd: formatForInput(findDate("END_DATE")),
    firstAnnouncement: formatForInput(findDate("FIRST_ANNOUNCEMENT")),
    interview: formatForInput(findDate("INTERVIEW")),
    finalAnnouncement: formatForInput(findDate("SECOND_ANNOUNCEMENT")),
  });
}, [scheduleData]);


  const handleChange = useCallback(
    (key: keyof typeof datas) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setDatas((prev) => ({ ...prev, [key]: e.target.value }));
    },
    []
  );

  const updateScheduleApi = useUpdateSchedule();

  const handleSaveClick = () => {
    updateScheduleApi.mutate({
      schedules: [
        { type: "START_DATE", date: formatForServer(datas.applicationStart) },
        { type: "END_DATE", date: formatForServer(datas.applicationEnd) },
        { type: "FIRST_ANNOUNCEMENT", date: formatForServer(datas.firstAnnouncement) },
        { type: "INTERVIEW", date: formatForServer(datas.interview) },
        { type: "SECOND_ANNOUNCEMENT", date: formatForServer(datas.finalAnnouncement) },
      ],
    });
  };

  return (
    <Flex isColumn={true} width="100%" height="auto" gap={20}>
      <Flex width="100%" height="fit-content" justifyContent="space-between" alignItems="center">
        <Text fontSize={32} fontWeight={700}>
          전형 일정 수정
        </Text>
        <Flex width="fit-content" height="fit-content" gap={12}>
          <Button
            onClick={handleSaveClick}
            backgroundColor={colors.green[500]}
            hoverBackgroundColor="none"
          >
            저장
          </Button>
          <Button
            onClick={() => navigate(-1)}
            backgroundColor={colors.gray[50]}
            hoverBackgroundColor="none"
            borderColor={colors.gray[200]}
            color={colors.gray[500]}
          >
            취소
          </Button>
        </Flex>
      </Flex>
      <Flex width="100%" height="auto" isColumn={true} gap={16}>
        <DropDownSection
          onChange={handleChange("applicationStart")}
          label={"원서 제출 시작"}
          value={datas.applicationStart}
        />
        <DropDownSection
          onChange={handleChange("applicationEnd")}
          label={"원서 제출 마감"}
          value={datas.applicationEnd}
        />
        <DropDownSection
          onChange={handleChange("firstAnnouncement")}
          label={"1차 발표"}
          value={datas.firstAnnouncement}
        />
        <DropDownSection
          onChange={handleChange("interview")}
          label={"심층 면접"}
          value={datas.interview}
        />
        <DropDownSection
          onChange={handleChange("finalAnnouncement")}
          label={"최종 발표"}
          value={datas.finalAnnouncement}
        />
      </Flex>
    </Flex>
  );
};
