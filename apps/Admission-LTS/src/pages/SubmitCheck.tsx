import { colors, Flex, Text } from '@entry/design-token';
import { InputContent, useCheckPageData, Button, useApplicationData } from '@entry/ui';
// import { submitApplication, confirmApplication, ApplicationData } from '../apis';
import { ApplicationData } from '../apis';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const SubmitCheck = () => {
  const [datas, setDatas] = useCheckPageData('check');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { state } = useApplicationData(); // 전체 상태 가져오기

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDatas({ ...datas, message: value });
  };

  // 모든 페이지 데이터를 가져와서 API 형식으로 변환
  const getAllApplicationData = (): ApplicationData => {
    // useApplicationData에서 데이터 가져오기
    const applicationClassification = state.applicationClassification || {};
    const applicantInfo = state.applicantInfo || {};
    const guardianInfo = state.guardianInfo || {};
    const middleSchoolInfo = state.middleSchoolInfo || {};
    const personalStatements = state.personalStatements || {};

    // 성적 관련 데이터들
    const firstGraduate = state.firstGraduate || {};
    const secondGraduate = state.secondGraduate || {};
    const thirdGraduate = state.thirdGraduate || {};
    const fourthGraduate = state.fourthGraduate || {};

    // 활동 관련 데이터들
    const activityGraduate = state.activityGraduate || {};
    const attendanceVolunteer = state.attendanceVolunteer || {};

    return {
      entranceYear: "2025",
      receiptCode: "",
      schoolCode: middleSchoolInfo.schoolCode || "",
      userName: applicantInfo.applicantName || "",
      applicantTel: applicantInfo.applicantNumber || "",
      birthday: applicantInfo?.dateOfBirth ? applicantInfo.dateOfBirth.join('-') : "",
      schoolRegion: applicationClassification?.regionSelection || "",
      gender: applicantInfo.gender || "",
      schoolName: middleSchoolInfo.schoolName || "",
      educationalStatus: applicationClassification?.graduationType || "",
      address: guardianInfo.address || "",
      detailAddress: guardianInfo.addressDetail || "",
      parentName: guardianInfo.guardianName || "",
      parentRelation: guardianInfo.relationship ? guardianInfo.relationship.join('') : "",
      parentTel: guardianInfo.guardianNumber || "",
      region: applicationClassification?.regionSelection || "",
      applicationType: applicationClassification?.typeSelection || "",
      applicationRemark: applicantInfo.specialNotes || "",
      imageUrl: applicantInfo.idPhoto || "",
      absenceDayCount: attendanceVolunteer.absenceDayCount || activityGraduate.absenceDayCount || "0",
      latenessCount: attendanceVolunteer.latenessCount || activityGraduate.latenessCount || "0",
      earlyLeaveCount: attendanceVolunteer.earlyLeaveCount || activityGraduate.earlyLeaveCount || "0",
      lectureAbsenceCount: attendanceVolunteer.lectureAbsenceCount || activityGraduate.lectureAbsenceCount || "0",
      volunteerTime: attendanceVolunteer.volunteerTime || activityGraduate.volunteerTime || "0",

      // 3학년 성적
      koreanThirdGradeSecondSemester: thirdGraduate.korean?.[1] || "",
      koreanThirdGradeFirstSemester: thirdGraduate.korean?.[0] || "",
      // 2학년 성적
      koreanSecondGradeSecondSemester: secondGraduate.korean?.[1] || "",
      koreanSecondGradeFirstSemester: secondGraduate.korean?.[0] || "",
      socialThirdGradeSecondSemester: scoreData.social?.[3]?.[1] || "",
      socialThirdGradeFirstSemester: scoreData.social?.[3]?.[0] || "",
      socialSecondGradeSecondSemester: scoreData.social?.[2]?.[1] || "",
      socialSecondGradeFirstSemester: scoreData.social?.[2]?.[0] || "",
      historyThirdGradeSecondSemester: scoreData.history?.[3]?.[1] || "",
      historyThirdGradeFirstSemester: scoreData.history?.[3]?.[0] || "",
      historySecondGradeSecondSemester: scoreData.history?.[2]?.[1] || "",
      historySecondGradeFirstSemester: scoreData.history?.[2]?.[0] || "",
      mathThirdGradeSecondSemester: scoreData.math?.[3]?.[1] || "",
      mathThirdGradeFirstSemester: scoreData.math?.[3]?.[0] || "",
      mathSecondGradeSecondSemester: scoreData.math?.[2]?.[1] || "",
      mathSecondGradeFirstSemester: scoreData.math?.[2]?.[0] || "",
      scienceThirdGradeSecondSemester: scoreData.science?.[3]?.[1] || "",
      scienceThirdGradeFirstSemester: scoreData.science?.[3]?.[0] || "",
      scienceSecondGradeSecondSemester: scoreData.science?.[2]?.[1] || "",
      scienceSecondGradeFirstSemester: scoreData.science?.[2]?.[0] || "",
      applicationCase: applicationClassification?.typeSelection || "",
      techAndHomeThirdGradeSecondSemester: scoreData.techAndHome?.[3]?.[1] || "",
      techAndHomeThirdGradeFirstSemester: scoreData.techAndHome?.[3]?.[0] || "",
      techAndHomeSecondGradeSecondSemester: scoreData.techAndHome?.[2]?.[1] || "",
      techAndHomeSecondGradeFirstSemester: scoreData.techAndHome?.[2]?.[0] || "",
      englishThirdGradeSecondSemester: scoreData.english?.[3]?.[1] || "",
      englishThirdGradeFirstSemester: scoreData.english?.[3]?.[0] || "",
      englishSecondGradeSecondSemester: scoreData.english?.[2]?.[1] || "",
      englishSecondGradeFirstSemester: scoreData.english?.[2]?.[0] || "",
      hasCompetitionPrize: "",
      hasCertificate: "",
      year: applicationClassification?.graduationDate?.[0]?.toString() || "2025",
      month: applicationClassification?.graduationDate?.[1]?.toString() || "3",
      day: applicationClassification?.graduationDate?.[2]?.toString() || "1",
      veteransNumber: applicantInfo.veteransNumber || "",
      teacherName: middleSchoolInfo.teacherName || "",
      teacherTel: middleSchoolInfo.schoolPhone || "",
      examCode: "",
      selfIntroduction: personalStatements.personalStmt || "",
      studyPlan: personalStatements.studyPlan || ""
    };
  };

  const handleSubmit = async () => {
    // if (datas.message !== "확인했습니다") {
    //   alert('제출을 위해서는 "확인했습니다"라고 정확히 입력해주세요.');
    //   return;
    // }

    // setIsSubmitting(true);
    // try {
    //   const applicationData = getAllApplicationData();

    //   // 원서 접수
    //   await submitApplication(applicationData);
    //   console.log('원서 접수 성공');

    //   // 원서 확정
    //   await confirmApplication();
    //   console.log('원서 확정 성공');

    //   // 제출 완료 페이지로 이동
    //   navigate('/submitted');
    // } catch (error) {
    //   console.error('원서 제출 실패:', error);
    //   alert('원서 제출에 실패했습니다. 다시 시도해주세요.');
    // } finally {
    //   setIsSubmitting(false);
    // }
    alert('원서 제출 기능이 일시적으로 비활성화되었습니다.');
  };

  return (
    <Flex
      width="100%"
      height="calc(100vh - 300px)"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        width="fit-content"
        height="fit-content"
        isColumn={true}
        alignItems="center"
        gap={140}
      >
        <Flex
          width="fit-content"
          height="fit-content"
          isColumn={true}
          alignItems="center"
          gap={32}
        >
          <Text fontSize={32} fontWeight={700}>
            수고하셨습니다!
          </Text>
          <Text fontSize={20} color={colors.gray[400]}>
            제출을 위해서는 “확인했습니다"라고 작성해주세요.
          </Text>
        </Flex>
        <InputContent
          value={datas.message}
          onChange={handleInputChange}
          placeholder='"확인했습니다"라고 작성해 주세요.'
        />
        {/* <Button
          onClick={handleSubmit}
          disabled={isSubmitting || datas.message !== "확인했습니다"}
          width="300px"
        >
          {isSubmitting ? '제출 중...' : '원서 제출'}
        </Button> */}
      </Flex>
    </Flex>
  );
};
