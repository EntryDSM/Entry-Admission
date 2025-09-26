import { colors, Flex, Text } from '@entry/design-token';
import { InputContent, useCheckPageData, Button } from '@entry/ui';
import { submitApplication, confirmApplication, ApplicationData } from '../apis';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const SubmitCheck = () => {
  const [datas, setDatas] = useCheckPageData('check');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDatas({ ...datas, message: value });
  };

  // 모든 페이지 데이터를 가져와서 API 형식으로 변환
  const getAllApplicationData = (): ApplicationData => {
    // localStorage에서 모든 페이지 데이터 수집
    const applicationClassification = JSON.parse(localStorage.getItem('applicationClassification') || '{}');
    const applicantInfo = JSON.parse(localStorage.getItem('applicantInfo') || '{}');
    const guardianInfo = JSON.parse(localStorage.getItem('guardianInfo') || '{}');
    const middleSchoolInfo = JSON.parse(localStorage.getItem('middleSchoolInfo') || '{}');
    const personalStatements = JSON.parse(localStorage.getItem('personalStatements') || '{}');

    // 성적 데이터들 수집
    const scoreData = JSON.parse(localStorage.getItem('scoreData') || '{}');
    const activityData = JSON.parse(localStorage.getItem('activityData') || '{}');

    return {
      entranceYear: "2025",
      receiptCode: "",
      schoolCode: middleSchoolInfo.schoolCode || "",
      userName: applicantInfo.applicantName || "",
      applicantTel: applicantInfo.phoneNumber || "",
      birthday: applicantInfo.dateOfBirth ? applicantInfo.dateOfBirth.join('-') : "",
      schoolRegion: applicationClassification.regionSelection || "",
      gender: applicantInfo.gender || "",
      schoolName: middleSchoolInfo.schoolName || "",
      educationalStatus: applicationClassification.graduationType || "",
      address: guardianInfo.address || "",
      detailAddress: guardianInfo.detailAddress || "",
      parentName: guardianInfo.parentName || "",
      parentRelation: guardianInfo.parentRelation || "",
      parentTel: guardianInfo.parentPhoneNumber || "",
      region: applicationClassification.regionSelection || "",
      applicationType: applicationClassification.typeSelection || "",
      applicationRemark: applicantInfo.specialNotes || "",
      imageUrl: applicantInfo.idPhoto || "",
      absenceDayCount: activityData.absenceDayCount || "0",
      latenessCount: activityData.latenessCount || "0",
      earlyLeaveCount: activityData.earlyLeaveCount || "0",
      lectureAbsenceCount: activityData.lectureAbsenceCount || "0",
      volunteerTime: activityData.volunteerTime || "0",
      koreanThirdGradeSecondSemester: scoreData.korean?.[3]?.[1] || "",
      koreanThirdGradeFirstSemester: scoreData.korean?.[3]?.[0] || "",
      koreanSecondGradeSecondSemester: scoreData.korean?.[2]?.[1] || "",
      koreanSecondGradeFirstSemester: scoreData.korean?.[2]?.[0] || "",
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
      applicationCase: applicationClassification.typeSelection || "",
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
      year: applicationClassification.graduationDate?.[0]?.toString() || "2025",
      month: applicationClassification.graduationDate?.[1]?.toString() || "3",
      day: applicationClassification.graduationDate?.[2]?.toString() || "1",
      veteransNumber: applicantInfo.veteransNumber || "",
      teacherName: middleSchoolInfo.teacherName || "",
      teacherTel: middleSchoolInfo.teacherPhoneNumber || "",
      examCode: "",
      selfIntroduction: personalStatements.selfIntroduction || "",
      studyPlan: personalStatements.studyPlan || ""
    };
  };

  const handleSubmit = async () => {
    if (datas.message !== "확인했습니다") {
      alert('제출을 위해서는 "확인했습니다"라고 정확히 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const applicationData = getAllApplicationData();

      // 원서 제출
      await submitApplication(applicationData);
      console.log('원서 제출 성공');

      // 원서 확정
      await confirmApplication();
      console.log('원서 확정 성공');

      // 제출 완료 페이지로 이동
      navigate('/submitted');
    } catch (error) {
      console.error('원서 제출 실패:', error);
      alert('원서 제출에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
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
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || datas.message !== "확인했습니다"}
          width="300px"
        >
          {isSubmitting ? '제출 중...' : '원서 제출'}
        </Button>
      </Flex>
    </Flex>
  );
};
