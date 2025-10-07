import { colors, Flex, Skeleton, Text } from '@entry/design-token';
import { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { usePdfPreviewPost } from '../../apis';
import { useApplicationData } from '@entry/ui';
import { convertGradeToScore } from '../../hooks';
import { toast } from 'react-toastify';

export const ApplicationPreview = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const formatDate = (arr: (number|string)[]) => {
    const [year, month = 0, day = 0] = arr;

    const y = String(year).padStart(4, "0");
    const m = String(month).padStart(2, "0");
    const d = String(day).padStart(2, "0");

    return `${y}-${m}-${d}`;
  }

  const typeSelectionFormat = (type: string): "COMMON" | "MEISTER" | "SOCIAL" | null => {
    const map: Record<string, "COMMON" | "MEISTER" | "SOCIAL"> = {
      "일반": "COMMON",
      "마이스터 인재": "MEISTER",
      "사회통합 인재": "SOCIAL",
    };

    return map[type] ?? null;
  };

  const graduationTypeFormat = (
    status: string
  ): "PROSPECTIVE_GRADUATE" | "GRADUATE" | "QUALIFICATION_EXAM" | null => {
    const map: Record<string, "PROSPECTIVE_GRADUATE" | "GRADUATE" | "QUALIFICATION_EXAM"> = {
      "졸업 예정": "PROSPECTIVE_GRADUATE",
      "졸업": "GRADUATE",
      "검정고시 (중학교 졸업 학력)": "QUALIFICATION_EXAM",
    };

    return map[status] ?? null;
  };

  const genderFormat = (
    status: string
  ): "MALE" | "FEMALE" | null => {
    const map: Record<string, "MALE" | "FEMALE"> = {
      "남성": "MALE",
      "여성": "FEMALE",
    };

    return map[status] ?? null;
  };

  const pdfPreviewApi = usePdfPreviewPost()
  const { saveToStorage, state } = useApplicationData();

  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchPdf = async () => {
      try {
        setIsLoading(true);
        
        const data = await pdfPreviewApi.mutateAsync({
          applicantName: state.applicantInfo.applicantName,
          applicantTel: state.applicantInfo.applicantNumber,
          applicationType: typeSelectionFormat(state.applicationClassification.typeSelection),//포맷
          educationalStatus: graduationTypeFormat(state.applicationClassification.graduationType),//포맷
          birthDate: formatDate(state.applicantInfo.dateOfBirth),//date 포맷 (배열 -> YYYY-MM-DD)
          applicantGender: genderFormat(state.applicantInfo.gender),
          streetAddress: state.guardianInfo.address,
          postalCode: state.guardianInfo.postalCode,
          detailAddress: state.guardianInfo.addressDetail,
          isDaejeon: state.applicationClassification.regionSelection === "대전" ? true : false,
          parentName: state.guardianInfo.guardianName,
          parentTel: state.guardianInfo.guardianNumber,
          parentRelation: state.guardianInfo.relationship[0], //배열이니까 0번째 값을 넣어야함
          guardianGender: genderFormat(state.guardianInfo.gender),
          schoolCode: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? null : state.middleSchoolInfo.schoolCode,
          schoolName: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? null : state.middleSchoolInfo.schoolName,
          studentId: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? null : state.middleSchoolInfo.studentId,
          schoolPhone: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? null : state.middleSchoolInfo.schoolPhone,
          teacherName: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? null : state.middleSchoolInfo.teacherName,
          nationalMeritChild: state.applicantInfo.specialNotes === "국가 유공자" ? true : false,
          specialAdmissionTarget: state.applicantInfo.specialNotes === "특례 입학 대상" ? true : false,
          graduationDate: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? null : formatDate(state.applicationClassification.graduationDate),//날짜 포맷
          studyPlan: state.personalStatements.studyPlan,
          selfIntroduce: state.personalStatements.personalStmt,
    
          //성적
          korean_3_1:
            state.applicationClassification.graduationType === "졸업 예정"
              ? convertGradeToScore(state.firstGraduateProspective.kor)
              : state.applicationClassification.graduationType === "졸업"
                ? convertGradeToScore(state.secondGraduate.kor)
                : null,
          social_3_1: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? convertGradeToScore(state.firstGraduateProspective.soc)
              : state.applicationClassification.graduationType === "졸업"
                ? convertGradeToScore(state.secondGraduate.soc)
                : null,
          history_3_1: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? convertGradeToScore(state.firstGraduateProspective.his)
              : state.applicationClassification.graduationType === "졸업"
                ? convertGradeToScore(state.secondGraduate.his)
                : null,
          math_3_1: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? convertGradeToScore(state.firstGraduateProspective.math)
              : state.applicationClassification.graduationType === "졸업"
                ? convertGradeToScore(state.secondGraduate.math)
                : null,
          science_3_1: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? convertGradeToScore(state.firstGraduateProspective.sci)
              : state.applicationClassification.graduationType === "졸업"
                ? convertGradeToScore(state.secondGraduate.sci)
                : null,
          tech_3_1: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? convertGradeToScore(state.firstGraduateProspective.tech)
              : state.applicationClassification.graduationType === "졸업"
                ? convertGradeToScore(state.secondGraduate.tech)
                : null,
          english_3_1: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? convertGradeToScore(state.firstGraduateProspective.eng)
              : state.applicationClassification.graduationType === "졸업"
                ? convertGradeToScore(state.secondGraduate.eng)
                : null,
          korean_3_2: state.applicationClassification.graduationType === "졸업" ? convertGradeToScore(state.firstGraduate.kor) : null,
          social_3_2: state.applicationClassification.graduationType === "졸업" ? convertGradeToScore(state.firstGraduate.soc) : null,
          history_3_2: state.applicationClassification.graduationType === "졸업" ? convertGradeToScore(state.firstGraduate.his) : null,
          math_3_2: state.applicationClassification.graduationType === "졸업" ? convertGradeToScore(state.firstGraduate.math) : null,
          science_3_2: state.applicationClassification.graduationType === "졸업" ? convertGradeToScore(state.firstGraduate.sci) : null,
          tech_3_2: state.applicationClassification.graduationType === "졸업" ? convertGradeToScore(state.firstGraduate.tech) : null,
          english_3_2: state.applicationClassification.graduationType === "졸업" ? convertGradeToScore(state.firstGraduate.eng) : null,
          korean_2_2: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? convertGradeToScore(state.secondGraduateProspective.kor)
              : state.applicationClassification.graduationType === "졸업"
                ? convertGradeToScore(state.thirdGraduate.kor)
                : null,
          social_2_2: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? convertGradeToScore(state.secondGraduateProspective.soc)
              : state.applicationClassification.graduationType === "졸업"
                ? convertGradeToScore(state.thirdGraduate.soc)
                : null,
          history_2_2: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? convertGradeToScore(state.secondGraduateProspective.his)
              : state.applicationClassification.graduationType === "졸업"
                ? convertGradeToScore(state.thirdGraduate.his)
                : null,
          math_2_2: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? convertGradeToScore(state.secondGraduateProspective.math)
              : state.applicationClassification.graduationType === "졸업"
                ? convertGradeToScore(state.thirdGraduate.math)
                : null,
          science_2_2: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? convertGradeToScore(state.secondGraduateProspective.sci)
              : state.applicationClassification.graduationType === "졸업"
                ? convertGradeToScore(state.thirdGraduate.sci)
                : null,
          tech_2_2: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? convertGradeToScore(state.secondGraduateProspective.tech)
              : state.applicationClassification.graduationType === "졸업"
                ? convertGradeToScore(state.thirdGraduate.tech)
                : null,
          english_2_2: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? convertGradeToScore(state.secondGraduateProspective.eng)
              : state.applicationClassification.graduationType === "졸업"
                ? convertGradeToScore(state.thirdGraduate.eng)
                : null,
          korean_2_1: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? convertGradeToScore(state.thirdGraduateProspective.kor)
              : state.applicationClassification.graduationType === "졸업"
                ? convertGradeToScore(state.fourthGraduate.kor)
                : null,
          social_2_1: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? convertGradeToScore(state.thirdGraduateProspective.soc)
              : state.applicationClassification.graduationType === "졸업"
                ? convertGradeToScore(state.fourthGraduate.soc)
                : null,
          history_2_1: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? convertGradeToScore(state.thirdGraduateProspective.his)
              : state.applicationClassification.graduationType === "졸업"
                ? convertGradeToScore(state.fourthGraduate.his)
                : null,
          math_2_1: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? convertGradeToScore(state.thirdGraduateProspective.math)
              : state.applicationClassification.graduationType === "졸업"
                ? convertGradeToScore(state.fourthGraduate.math)
                : null,
          science_2_1: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? convertGradeToScore(state.thirdGraduateProspective.sci)
              : state.applicationClassification.graduationType === "졸업"
                ? convertGradeToScore(state.fourthGraduate.sci)
                : null,
          tech_2_1: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? convertGradeToScore(state.thirdGraduateProspective.tech)
              : state.applicationClassification.graduationType === "졸업"
                ? convertGradeToScore(state.fourthGraduate.tech)
                : null,
          english_2_1: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? convertGradeToScore(state.thirdGraduateProspective.eng)
              : state.applicationClassification.graduationType === "졸업"
                ? convertGradeToScore(state.fourthGraduate.eng)
                : null,
          gedKorean: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? Number(state.gedScore.kor) : null,
          gedSocial: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? Number(state.gedScore.soc) : null,
          gedHistory: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? Number(state.gedScore.his) : null,
          gedMath: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? Number(state.gedScore.math) : null,
          gedScience: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? Number(state.gedScore.sci) : null,
          gedTech: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? Number(state.gedScore.tech) : null,
          gedEnglish: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? Number(state.gedScore.eng) : null,
          //출결
          absence: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? Number(state.activityGraduateProspective.absence)
              : state.applicationClassification.graduationType === "졸업"
                ? Number(state.activityGraduate.absence)
                : null,
          tardiness: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? Number(state.activityGraduateProspective.tardiness)
              : state.applicationClassification.graduationType === "졸업"
                ? Number(state.activityGraduate.tardiness)
                : null,
          earlyLeave: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? Number(state.activityGraduateProspective.earlyLeave)
              : state.applicationClassification.graduationType === "졸업"
                ? Number(state.activityGraduate.earlyLeave)
                : null,
          classExit: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? Number(state.activityGraduateProspective.classExit)
              : state.applicationClassification.graduationType === "졸업"
                ? Number(state.activityGraduate.classExit)
                : null,
          unexcused: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? Number(state.activityGraduateProspective.unexcused)
              : state.applicationClassification.graduationType === "졸업"
                ? Number(state.activityGraduate.unexcused)
                : null,
          volunteer: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? Number(state.activityGraduateProspective.volunteer)
              : state.applicationClassification.graduationType === "졸업"
                ? Number(state.activityGraduate.volunteer)
                : null,
          algorithmAward: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? state.activityGraduateProspective.dsmAlgorithm === "O" ? true : false
              : state.applicationClassification.graduationType === "졸업"
                ? state.activityGraduate.dsmAlgorithm === "O" ? true : false
                : state.attendanceVolunteer.dsmAlgorithm === "O" ? true : false,
          infoProcessingCert: 
            state.applicationClassification.graduationType === "졸업 예정"
              ? state.activityGraduateProspective.certificate === "O" ? true : false
              : state.applicationClassification.graduationType === "졸업"
                ? state.activityGraduate.certificate === "O" ? true : false
                : state.attendanceVolunteer.certificate === "O" ? true : false,
        });

        const blob = new Blob([data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        setIsLoading(false);
      } catch (error) {
        toast.error('pdf 생성에 실패하였습니다.')
        setIsLoading(false);
      }
    };

    fetchPdf();
  }, [])

  return (
    <Container>
      <Flex width="fit-content" height="fit-content" isColumn={true} gap={12}>
        <Text fontSize={20} fontWeight={400} color={colors.gray[400]}>
          대덕소프트웨어마이스터고등학교
        </Text>
        <Text fontSize={32} fontWeight={600}>
          지원서 미리보기
        </Text>
      </Flex>
      {isLoading ? (
        <ApplicationLoadingContainer>
          <Text fontSize={20} color={colors.gray[400]}>
            지원서 페이지를 로딩중입니다..
          </Text>
        </ApplicationLoadingContainer>
      ) : (
        <Flex width="100%" height="fit-content" isColumn={true}>
          <ApplicationTitle>입학원서 미리보기</ApplicationTitle>
          <ApplicationContainer>
            <ApplicationContent>
              {pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  title="지원서 PDF 미리보기"
                />
              ) : (
                <Text color={colors.gray[400]}>PDF를 불러올 수 없습니다.</Text>
              )}
            </ApplicationContent>
          </ApplicationContainer>
        </Flex>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  width: 100%;
`;

const ApplicationTitle = styled.div`
  width: 100%;
  height: 100px;
  background-color: ${colors.gray[500]};
  padding-left: 48px;
  display: flex;
  align-items: center;
  font-size: 24px;
  color: ${colors.extra.realWhite};
`;
const ApplicationContainer = styled.div`
  width: 100%;
  background-color: ${colors.gray[400]};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 104px 140px;
  box-sizing: border-box;
`;

const ApplicationContent = styled.div`
  width: 100%;
  max-width: 794px;
  aspect-ratio: 210 / 297;
  background-color: ${colors.extra.realWhite};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

const ApplicationLoadingContainer = styled(Skeleton)`
  width: 100%;
  height: 1500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;