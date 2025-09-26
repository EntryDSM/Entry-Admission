import { colors, Flex, Skeleton, Text } from '@entry/design-token';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Button, useApplicationData } from '@entry/ui';
import { downloadApplicationPDF, submitApplication, ApplicationData } from '../../apis';
import { useNavigate } from 'react-router-dom';

export const ApplicationPreview = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
  const [loadingStage, setLoadingStage] = useState<string>('원서 데이터 수집 중...');
  const navigate = useNavigate();
  const { state, clearAllData } = useApplicationData(); // 전체 상태 가져오기

  // useApplicationData에서 모든 페이지 데이터를 가져와서 API 형식으로 변환
  const getAllApplicationData = (): ApplicationData => {
    console.log('전체 state:', state);

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

    console.log('applicationClassification:', applicationClassification);
    console.log('applicantInfo:', applicantInfo);
    console.log('guardianInfo:', guardianInfo);
    console.log('middleSchoolInfo:', middleSchoolInfo);
    console.log('personalStatements:', personalStatements);

    // 성적 데이터 디버깅
    console.log('성적 데이터 디버깅:');
    console.log('firstGraduate:', firstGraduate);
    console.log('secondGraduate:', secondGraduate);
    console.log('thirdGraduate:', thirdGraduate);
    console.log('fourthGraduate:', fourthGraduate);

    // 성적 데이터 상세 디버깅
    console.log('thirdGraduate.kor:', thirdGraduate.kor);
    console.log('thirdGraduate.math:', thirdGraduate.math);
    console.log('thirdGraduate.eng:', thirdGraduate.eng);
    console.log('secondGraduate.kor:', secondGraduate.kor);
    console.log('secondGraduate.math:', secondGraduate.math);
    console.log('secondGraduate.eng:', secondGraduate.eng);

    return {
      entranceYear: "2025",
      receiptCode: "",
      schoolCode: middleSchoolInfo.schoolCode || "",
      userName: applicantInfo.applicantName || "",
      applicantTel: applicantInfo.applicantNumber || "", // 수정된 필드명
      birthday: applicantInfo?.dateOfBirth ? applicantInfo.dateOfBirth.join('-') : "",
      schoolRegion: applicationClassification?.regionSelection || "",
      gender: applicantInfo.gender || "",
      schoolName: middleSchoolInfo.schoolName || "",
      educationalStatus: applicationClassification?.graduationType || "",
      address: guardianInfo.address || "",
      detailAddress: guardianInfo.addressDetail || "", // 수정된 필드명
      parentName: guardianInfo.guardianName || "", // 수정된 필드명
      parentRelation: guardianInfo.relationship ? guardianInfo.relationship.join('') : "", // 수정된 필드명
      parentTel: guardianInfo.guardianNumber || "", // 수정된 필드명
      region: applicationClassification?.regionSelection || "",
      applicationType: applicationClassification?.typeSelection || "",
      applicationRemark: applicantInfo.specialNotes || "",
      imageUrl: applicantInfo.idPhoto || "",
      absenceDayCount: attendanceVolunteer.absenceDayCount || activityGraduate.absenceDayCount || "0",
      latenessCount: attendanceVolunteer.latenessCount || activityGraduate.latenessCount || "0",
      earlyLeaveCount: attendanceVolunteer.earlyLeaveCount || activityGraduate.earlyLeaveCount || "0",
      lectureAbsenceCount: attendanceVolunteer.lectureAbsenceCount || activityGraduate.lectureAbsenceCount || "0",
      volunteerTime: attendanceVolunteer.volunteerTime || activityGraduate.volunteerTime || "0",
      // 3학년 성적 (thirdGraduate에서) - 1학기/2학기 모두 같은 값 사용
      koreanThirdGradeFirstSemester: thirdGraduate.kor || "",
      koreanThirdGradeSecondSemester: thirdGraduate.kor || "",
      socialThirdGradeFirstSemester: thirdGraduate.soc || "",
      socialThirdGradeSecondSemester: thirdGraduate.soc || "",
      historyThirdGradeFirstSemester: thirdGraduate.his || "",
      historyThirdGradeSecondSemester: thirdGraduate.his || "",
      mathThirdGradeFirstSemester: thirdGraduate.math || "",
      mathThirdGradeSecondSemester: thirdGraduate.math || "",
      scienceThirdGradeFirstSemester: thirdGraduate.sci || "",
      scienceThirdGradeSecondSemester: thirdGraduate.sci || "",
      techAndHomeThirdGradeFirstSemester: thirdGraduate.tech || "",
      techAndHomeThirdGradeSecondSemester: thirdGraduate.tech || "",
      englishThirdGradeFirstSemester: thirdGraduate.eng || "",
      englishThirdGradeSecondSemester: thirdGraduate.eng || "",

      // 2학년 성적 (secondGraduate에서) - 1학기/2학기 모두 같은 값 사용
      koreanSecondGradeFirstSemester: secondGraduate.kor || "",
      koreanSecondGradeSecondSemester: secondGraduate.kor || "",
      socialSecondGradeFirstSemester: secondGraduate.soc || "",
      socialSecondGradeSecondSemester: secondGraduate.soc || "",
      historySecondGradeFirstSemester: secondGraduate.his || "",
      historySecondGradeSecondSemester: secondGraduate.his || "",
      mathSecondGradeFirstSemester: secondGraduate.math || "",
      mathSecondGradeSecondSemester: secondGraduate.math || "",
      scienceSecondGradeFirstSemester: secondGraduate.sci || "",
      scienceSecondGradeSecondSemester: secondGraduate.sci || "",
      techAndHomeSecondGradeFirstSemester: secondGraduate.tech || "",
      techAndHomeSecondGradeSecondSemester: secondGraduate.tech || "",
      englishSecondGradeFirstSemester: secondGraduate.eng || "",
      englishSecondGradeSecondSemester: secondGraduate.eng || "",

      applicationCase: applicationClassification?.typeSelection || "",
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

  useEffect(() => {
    const processApplication = async () => {
      try {
        // 1단계: 원서 데이터 수집
        setLoadingStage('원서 데이터 수집 중...');
        await new Promise(resolve => setTimeout(resolve, 500));
        const applicationData = getAllApplicationData();

        // 2단계: 원서 접수
        setLoadingStage('원서 접수 중...');
        const submittedData = await submitApplication(applicationData);
        console.log('원서 접수 성공');

        // 3단계: 미리보기 준비
        setLoadingStage('미리보기 준비 중...');
        setApplicationData(submittedData.applicationData || submittedData);
        console.log('설정된 applicationData:', submittedData.applicationData || submittedData);

        setLoadingStage('완료');
      } catch (error) {
        console.error('원서 처리 실패:', error);
        alert('원서 처리에 실패했습니다. 다시 시도해주세요.');
        navigate('/submit-check');
      } finally {
        setIsLoading(false);
      }
    };

    processApplication();
  }, [navigate]);


  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      await downloadApplicationPDF();
      console.log('PDF 다운로드 성공');
    } catch (error) {
      console.error('PDF 다운로드 실패:', error);
      alert('PDF 다운로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsDownloading(false);
    }
  };


  return (
    <Container>
      <Flex width="100%" height="fit-content" justifyContent="space-between" alignItems="center">
        <Flex width="fit-content" height="fit-content" isColumn={true} gap={12}>
          <Text fontSize={20} fontWeight={400} color={colors.gray[400]}>
            대덕소프트웨어마이스터고등학교
          </Text>
          <Text fontSize={32} fontWeight={600}>
            지원서 미리보기
          </Text>
        </Flex>
        <Flex width="fit-content" height="fit-content" gap={12}>
          <Button
            onClick={() => {
              clearAllData();
              window.location.reload();
            }}
            width="150px"
            variant="outline"
          >
            데이터 초기화
          </Button>
          <Button
            onClick={handleDownloadPDF}
            disabled={isDownloading || isLoading}
            width="150px"
          >
            {isDownloading ? '다운로드 중...' : 'PDF 다운로드'}
          </Button>
        </Flex>
      </Flex>
      {isLoading ? (
        <ApplicationLoadingContainer>
          <LoadingContent>
            <LoadingSpinner />
            <LoadingText>
              <Text fontSize={24} fontWeight={600} color={colors.gray[500]}>
                원서 처리 중
              </Text>
              <Text fontSize={16} color={colors.gray[400]}>
                {loadingStage}
              </Text>
            </LoadingText>
            <ProgressSteps>
              <ProgressStep active={loadingStage.includes('수집')}>
                <StepNumber active={loadingStage.includes('수집')}>1</StepNumber>
                <StepLabel>데이터 수집</StepLabel>
              </ProgressStep>
              <ProgressStep active={loadingStage.includes('접수')}>
                <StepNumber active={loadingStage.includes('접수')}>2</StepNumber>
                <StepLabel>원서 접수</StepLabel>
              </ProgressStep>
              <ProgressStep active={loadingStage.includes('준비') || loadingStage.includes('완료')}>
                <StepNumber active={loadingStage.includes('준비') || loadingStage.includes('완료')}>3</StepNumber>
                <StepLabel>미리보기 준비</StepLabel>
              </ProgressStep>
            </ProgressSteps>
          </LoadingContent>
        </ApplicationLoadingContainer>
      ) : (
        <Flex width="100%" height="fit-content" isColumn={true}>
          <ApplicationTitle>입학원서 미리보기</ApplicationTitle>
          <ApplicationContainer>
            <ApplicationContent>
              {applicationData ? (
                <ApplicationForm>
                  <FormSection>
                    <SectionTitle>지원자 정보</SectionTitle>
                    <FormRow>
                      <FormField>
                        <Label>성명</Label>
                        <Value>{applicationData.userName}</Value>
                      </FormField>
                      <FormField>
                        <Label>성별</Label>
                        <Value>{applicationData.gender}</Value>
                      </FormField>
                      <FormField>
                        <Label>생년월일</Label>
                        <Value>{applicationData.birthday}</Value>
                      </FormField>
                    </FormRow>
                    <FormRow>
                      <FormField>
                        <Label>전화번호</Label>
                        <Value>{applicationData.applicantTel}</Value>
                      </FormField>
                      <FormField>
                        <Label>주소</Label>
                        <Value>{applicationData.address} {applicationData.detailAddress}</Value>
                      </FormField>
                    </FormRow>
                  </FormSection>

                  <FormSection>
                    <SectionTitle>학교 정보</SectionTitle>
                    <FormRow>
                      <FormField>
                        <Label>학교명</Label>
                        <Value>{applicationData.schoolName}</Value>
                      </FormField>
                      <FormField>
                        <Label>지역</Label>
                        <Value>{applicationData.schoolRegion}</Value>
                      </FormField>
                      <FormField>
                        <Label>졸업구분</Label>
                        <Value>{applicationData.educationalStatus}</Value>
                      </FormField>
                    </FormRow>
                  </FormSection>

                  <FormSection>
                    <SectionTitle>보호자 정보</SectionTitle>
                    <FormRow>
                      <FormField>
                        <Label>보호자명</Label>
                        <Value>{applicationData.parentName}</Value>
                      </FormField>
                      <FormField>
                        <Label>관계</Label>
                        <Value>{applicationData.parentRelation}</Value>
                      </FormField>
                      <FormField>
                        <Label>전화번호</Label>
                        <Value>{applicationData.parentTel}</Value>
                      </FormField>
                    </FormRow>
                  </FormSection>

                  <FormSection>
                    <SectionTitle>성적 정보</SectionTitle>
                    <FormRow>
                      <FormField>
                        <Label>3학년 국어</Label>
                        <Value>{applicationData.koreanThirdGradeFirstSemester || '미입력'}</Value>
                      </FormField>
                      <FormField>
                        <Label>3학년 수학</Label>
                        <Value>{applicationData.mathThirdGradeFirstSemester || '미입력'}</Value>
                      </FormField>
                      <FormField>
                        <Label>3학년 영어</Label>
                        <Value>{applicationData.englishThirdGradeFirstSemester || '미입력'}</Value>
                      </FormField>
                    </FormRow>
                    <FormRow>
                      <FormField>
                        <Label>2학년 국어</Label>
                        <Value>{applicationData.koreanSecondGradeFirstSemester || '미입력'}</Value>
                      </FormField>
                      <FormField>
                        <Label>2학년 수학</Label>
                        <Value>{applicationData.mathSecondGradeFirstSemester || '미입력'}</Value>
                      </FormField>
                      <FormField>
                        <Label>2학년 영어</Label>
                        <Value>{applicationData.englishSecondGradeFirstSemester || '미입력'}</Value>
                      </FormField>
                    </FormRow>
                  </FormSection>

                  <FormSection>
                    <SectionTitle>지원 정보</SectionTitle>
                    <FormRow>
                      <FormField>
                        <Label>전형구분</Label>
                        <Value>{applicationData.applicationType}</Value>
                      </FormField>
                      <FormField>
                        <Label>지원연도</Label>
                        <Value>{applicationData.entranceYear}</Value>
                      </FormField>
                    </FormRow>
                  </FormSection>
                </ApplicationForm>
              ) : (
                <Text>원서 데이터를 불러올 수 없습니다.</Text>
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

  @media (max-width: 1024px) {
    max-width: 100%;
    aspect-ratio: auto;
    height: auto;
  }
`;


const ApplicationLoadingContainer = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, ${colors.gray[100]} 0%, ${colors.gray[50]} 100%);
  border-radius: 12px;
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 40px;
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid ${colors.gray[200]};
  border-top: 4px solid ${colors.orange[800]};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
`;

const ProgressSteps = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const ProgressStep = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: ${props => props.active ? 1 : 0.4};
  transition: opacity 0.3s ease;
`;

const StepNumber = styled.div<{ active: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.active ? colors.orange[800] : colors.gray[300]};
  color: ${colors.extra.realWhite};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s ease;
`;

const StepLabel = styled.span`
  font-size: 12px;
  color: ${colors.gray[400]};
  font-weight: 500;
`;

const ApplicationForm = styled.div`
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.gray[500]};
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 2px solid ${colors.orange[800]};
`;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 200px;
  flex: 1;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.gray[400]};
`;

const Value = styled.span`
  font-size: 16px;
  color: ${colors.gray[500]};
  padding: 8px 12px;
  background-color: ${colors.gray[100]};
  border-radius: 4px;
  min-height: 20px;
`;

