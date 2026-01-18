
import { colors, Flex, Skeleton, Text } from '@entry/design-token';
import { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { usePdfPreviewPost } from '../../apis';
import { sendPdfPreviewSuccess, sendPdfPreviewFailed } from '../../apis/pdfLogging';
import { useApplicationData } from '@entry/ui';
import { toast } from 'react-toastify';
import { Document, Page, pdfjs } from 'react-pdf';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { getApplicationRemark } from '../../utils/applicationRemark';

export const ApplicationPreview = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const hasFetched = useRef(false);
  const pdfPreviewApi = usePdfPreviewPost()
  const { state } = useApplicationData();
  const sessionIdRef = useRef<string>(crypto.randomUUID());

  const formatDate = (arr: (number|string)[], graduationType: string) => {
    // 검정고시는 null 반환
    if (graduationType === "검정고시 (중학교 졸업 학력)") {
      return "XXXX";
    }

    // 배열이 비어있거나 값이 없으면 오늘 날짜를 기본값으로 사용
    const today = new Date();
    const [year = today.getFullYear(), month = today.getMonth() + 1, day = today.getDate()] = arr;

    const y = String(year).padStart(4, "0");
    const m = String(month).padStart(2, "0");

    // 졸업 예정: 년-월-00, 졸업: 년-월-일
    if (graduationType === "졸업 예정") {
      return `${y}-${m}-00`;
    } else {
      const d = String(day).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }
  }

  const typeSelectionFormat = (type: string): "COMMON" | "MEISTER" | "SOCIAL" | null => {
    const map: Record<string, "COMMON" | "MEISTER" | "SOCIAL"> = {
      "일반": "COMMON",
      "마이스터 인재": "MEISTER",
      "사회통합": "SOCIAL",
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

  const toGraduationDateDto = (arr: (number | string)[], graduationType: string) => {
    if (graduationType === "검정고시 (중학교 졸업 학력)") {
      return "2026-01";
    }

    const today = new Date();
    const [year = today.getFullYear(), month = today.getMonth() + 1] = arr;
    const yearValue = Number(year);
    const monthValue = Number(month);

    if (!Number.isFinite(yearValue) || !Number.isFinite(monthValue)) return null;

    const yyyy = String(yearValue).padStart(4, "0");
    const mm = String(Math.max(1, Math.min(12, monthValue))).padStart(2, "0");
    return `${yyyy}-${mm}`;
  };

  const isQualificationExam =
    state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ||
    state.applicationClassification.graduationType?.includes("검정고시");

  // 성적 등급을 4글자 문자열로 변환 (2-1, 2-2, 3-1, 3-2 순서)
  const buildGradeString = (
    subject: "kor" | "soc" | "his" | "math" | "sci" | "tech" | "eng"
  ): string | null => {
    const graduationType = state.applicationClassification.graduationType;

    if (isQualificationExam) {
      return "XXXX";
    }

    const toGrade = (val: string | null | undefined): string => {
      if (!val || val.trim() === "") return "X";
      return val.toUpperCase();
    };

    if (graduationType === "졸업") {
      const g1 = toGrade(state.firstGraduate[subject]);
      const g2 = toGrade(state.secondGraduate[subject]);
      const g3 = toGrade(state.thirdGraduate[subject]);
      const g4 = toGrade(state.fourthGraduate[subject]);
      return `${g1}${g2}${g3}${g4}`;
    } else if (graduationType === "졸업 예정") {
      const g1 = toGrade(state.firstGraduateProspective[subject]);
      const g2 = toGrade(state.secondGraduateProspective[subject]);
      const g3 = toGrade(state.thirdGraduateProspective[subject]);
      return `${g1}${g2}${g3}X`;
    }

    return null;
  };

  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  const convertToNumber = (value: string | number | null | undefined): number | null => {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const num = Number(value);
    return isNaN(num) ? null : num;
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchPdf = async () => {
      const startTime = Date.now();

      try {
        setIsLoading(true);

        const data = await pdfPreviewApi.mutateAsync({
          applicantInfo: {
            applicantName: state.applicantInfo.applicantName,
            applicantTel: state.applicantInfo.applicantNumber.replace(/-/g, ""),
            birthDate: formatDate(state.applicantInfo.dateOfBirth, "졸업"),
            applicantGender: genderFormat(state.applicantInfo.gender),
            parentName: state.guardianInfo.guardianName,
            parentTel: state.guardianInfo.guardianNumber.replace(/-/g, ""),
            parentRelation: state.guardianInfo.relationship[0],
          },
          addressInfo: {
            isDaejeon: state.applicationClassification.regionSelection === "대전" ? true : false,
            streetAddress: state.guardianInfo.address,
            detailAddress: state.guardianInfo.addressDetail,
            postalCode: state.guardianInfo.postalCode,
          },
          applicationInfo: {
            applicationType: typeSelectionFormat(state.applicationClassification.typeSelection),
            educationalStatus: graduationTypeFormat(state.applicationClassification.graduationType),
            studentNumber: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)"
              ? null
              : state.middleSchoolInfo.studentId,
            graduationDate: isQualificationExam
              ? "2026-01"
              : toGraduationDateDto(
                state.applicationClassification.graduationDate,
                state.applicationClassification.graduationType
              ),
            studyPlan: state.personalStatements.studyPlan,
            selfIntroduce: state.personalStatements.personalStmt,
            applicationRemark: getApplicationRemark(
              state.applicantInfo.specialNotes
            ),
          },
          schoolInfo: {
            schoolCode: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? null : state.middleSchoolInfo.schoolCode,
            schoolName: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? null : state.middleSchoolInfo.schoolName,
            schoolPhone: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? null : state.middleSchoolInfo.schoolPhone,
            teacherName: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? null : state.middleSchoolInfo.teacherName,
          },
          gradeInfo: {
            koreanGrade: isQualificationExam ? "XXXX" : buildGradeString("kor"),
            socialGrade: isQualificationExam ? "XXXX" : buildGradeString("soc"),
            historyGrade: isQualificationExam ? "XXXX" : buildGradeString("his"),
            mathGrade: isQualificationExam ? "XXXX" : buildGradeString("math"),
            scienceGrade: isQualificationExam ? "XXXX" : buildGradeString("sci"),
            englishGrade: isQualificationExam ? "XXXX" : buildGradeString("eng"),
            techAndHomeGrade: isQualificationExam ? "XXXX" : buildGradeString("tech"),
            gedKorean: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)"
              ? convertToNumber(state.gedScore.kor)
              : 0,
            gedSocial: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)"
              ? convertToNumber(state.gedScore.soc)
              : 0,
            gedMath: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)"
              ? convertToNumber(state.gedScore.math)
              : 0,
            gedScience: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)"
              ? convertToNumber(state.gedScore.sci)
              : 0,
            gedEnglish: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)"
              ? convertToNumber(state.gedScore.eng)
              : 0,
            gedHistory: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)"
              ? convertToNumber(state.gedScore.his)
              : 0,
          },
          attendanceInfo: {
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
            volunteer:
              state.applicationClassification.graduationType === "졸업 예정"
                ? Number(state.activityGraduateProspective.volunteer)
                : state.applicationClassification.graduationType === "졸업"
                  ? Number(state.activityGraduate.volunteer)
                  : null,
          },
          awardAndCertificateInfo: {
            algorithmAward:
              state.applicationClassification.graduationType === "졸업 예정"
                ? state.activityGraduateProspective.dsmAlgorithm === "O"
                : state.applicationClassification.graduationType === "졸업"
                  ? state.activityGraduate.dsmAlgorithm === "O"
                  : state.attendanceVolunteer.dsmAlgorithm === "O",
            infoProcessingCert:
              state.applicationClassification.graduationType === "졸업 예정"
                ? state.activityGraduateProspective.certificate === "O"
                : state.applicationClassification.graduationType === "졸업"
                  ? state.activityGraduate.certificate === "O"
                  : state.attendanceVolunteer.certificate === "O",
          },
        });

        const blob = new Blob([data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        setIsLoading(false);

        // PDF 미리보기 성공 로그를 Meerkat으로 전송 (에러 발생 시 메인 애플리케이션에 영향 없음)
        const generationTime = Date.now() - startTime;
        sendPdfPreviewSuccess({
          sessionId: sessionIdRef.current,
          fileSize: blob.size,
          generationTime,
        });
      } catch (error: any) {
        toast.error('pdf 생성에 실패하였습니다.')
        setIsLoading(false);

        // PDF 미리보기 실패 로그를 Meerkat으로 전송 (에러 발생 시 메인 애플리케이션에 영향 없음)
        sendPdfPreviewFailed({
          sessionId: sessionIdRef.current,
          errorMessage: error?.message || 'PDF 미리보기 생성 중 오류 발생',
        });
      }
    };

    fetchPdf();
  }, [])

  return (
    <Container>
      {isLoading ? (
        <ApplicationLoadingContainer>
          <Text fontSize={20} color={colors.gray[400]}>
            지원서 페이지를 로딩중입니다..
          </Text>
        </ApplicationLoadingContainer>
      ) : (
        <Flex width="100%" height="fit-content" isColumn={true}>
          <NoticeText>
            최종 제출 전 미리보기 PDF를 확인하고 문제가 없는지 확인하세요
          </NoticeText>
          <ApplicationContainer>
            {pdfUrl ? (
              <PdfViewport>
                <Document
                  file={pdfUrl}
                  loading={<Text color={colors.gray[400]}>PDF 로딩중...</Text>}
                  error={<Text color={colors.gray[400]}>PDF 로딩 실패</Text>}
                  onLoadError={(err) => {
                    console.error('PDF load error:', err);
                    toast.error('PDF 로딩 실패');
                  }}
                  onLoadSuccess={(info: { numPages: number }) => setNumPages(info.numPages)}
                >
                  {Array.from(new Array(numPages || 0), (_el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      width={794}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  ))}
                </Document>
              </PdfViewport>
            ) : (
              <Text color={colors.gray[400]}>PDF를 불러올 수 없습니다.</Text>
            )}
          </ApplicationContainer>
        </Flex>
      )}
    </Container>
  );
};

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  width: 100%;
`;

const ApplicationContainer = styled.div`
  width: 100%;
  background-color: ${colors.gray[400]};
  display: block;
  padding: 24px 140px;
  box-sizing: border-box;
  max-height: 80vh;
  overflow-y: auto;
`;

const PdfViewport = styled.div`
  width: 100%;
  max-width: 794px;
  background-color: ${colors.extra.realWhite};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 0;
  margin: 0 auto;
  canvas {
    max-width: 100%;
    height: auto !important;
    margin: 0 auto;
    display: block;
  }
`;

const ApplicationLoadingContainer = styled(Skeleton)`
  width: 100%;
  height: 1500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoticeText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.gray[500]};
  padding: 16px 140px;
`;
