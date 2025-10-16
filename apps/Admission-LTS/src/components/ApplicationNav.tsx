import { colors, Flex } from '@entry/design-token';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApplicationData, useCheckPageData, usePageData, PreviousButton, previousDataRef, performSave, hasChanged, serializeStateWithFiles } from '@entry/ui';
import { useEffect, useState, useRef } from 'react';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useAdmissionSubmitPost } from '../apis';
import { convertGradeToScore } from '../hooks';

interface IApplicationNavType {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  graduationType?: string;
  validateCurrentPage?: (page: number) => { canProceed: boolean; message?: string };
  // toast?: (message: string) => void; // 외부에서 toast 전달
}

const PAGES_PER_GROUP = 6;

export const ApplicationNav = ({
  totalPages,
  currentPage,
  setCurrentPage,
  graduationType,
  validateCurrentPage,
  // toast = (msg: string) => window.alert(msg),
}: IApplicationNavType) => {
  const [datas] = usePageData('applicationClassification');
  const [isSubmitBlocked, setIsSubmitBlocked] = useState<boolean>(true);
  const [_, setHasUnsavedChanges] = useState(false);
  const isNavigationSavingRef = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { saveToStorage, state } = useApplicationData();
  const [checkData] = useCheckPageData('check');
  const navigate = useNavigate();
  const location = useLocation();

  const paginationInfo = calculatePaginationInfo(currentPage, totalPages);

  // ✅ previousDataRef 초기화 시 validation 체크
  useEffect(() => {
    if (state && previousDataRef.current === null) {
      if (validateCurrentPage) {
        const validation = validateCurrentPage(1);
        if (validation.canProceed) {
          previousDataRef.current = serializeStateWithFiles(state);
          setHasUnsavedChanges(false);
        }
      } else {
        previousDataRef.current = serializeStateWithFiles(state);
        setHasUnsavedChanges(false);
      }
    }
  }, [state, validateCurrentPage]);

  // 변경 여부 추적
  useEffect(() => {
    if (!state || !previousDataRef.current) return;
    const currentDataString = serializeStateWithFiles(state);
    const hasDataChanged = currentDataString !== previousDataRef.current;
    setHasUnsavedChanges(hasDataChanged);
  }, [state]);

  // 제출 버튼 활성화
  useEffect(() => {
    const isConfirmed = checkData.message === '확인했습니다';
    setIsSubmitBlocked(!isConfirmed);
  }, [checkData.message]);

  const updateAfterSave = () => {
    if (state) {
      previousDataRef.current = serializeStateWithFiles(state);
      setHasUnsavedChanges(false);
    }
  };

  const saveBeforeNavigation = async () => {
    if (!hasChanged(state)) return;
    if (isNavigationSavingRef.current) return;

    isNavigationSavingRef.current = true;
    try {
      const wasSaved = await performSave(state, saveToStorage, true);
      if (wasSaved) updateAfterSave();
    } finally {
      isNavigationSavingRef.current = false;
    }
  };

  const handlePreviousPage = async () => {
    // 이전 페이지로 이동 전에 저장
    await saveBeforeNavigation();
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = async () => {
    if (!state) return toast.success('데이터를 불러오는 중입니다.');

    if (currentPage === 1 && (!datas.graduationType || !datas.graduationType.trim())) {
      return toast.error('졸업 구분은 필수값입니다.');
    }

    // ✅ validation 먼저 체크
    if (validateCurrentPage) {
      const validation = validateCurrentPage(currentPage);
      if (!validation.canProceed) return toast.error(validation.message || '필수 항목을 모두 입력해주세요.');
    }
    await saveBeforeNavigation();
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = async (targetPage: number) => {
    if (targetPage === currentPage) return;
    if (!state) return toast.success('데이터를 불러오는 중입니다.');


    // ✅ validation 먼저 체크
    if (validateCurrentPage) {
      const validation = validateCurrentPage(currentPage);
      if (!validation.canProceed) return toast.error(validation.message || '필수 항목을 모두 입력해주세요.');
    }

    await saveBeforeNavigation();
    setCurrentPage(targetPage);
  };

  const formatDate = (arr: (number|string)[], graduationType: string) => {
    // 검정고시는 null 반환
    if (graduationType === "검정고시 (중학교 졸업 학력)") {
      return null;
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

  const convertToNumber = (value: string | number | null | undefined): number | null => {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const num = Number(value);
    return isNaN(num) ? null : num;
  };

  
  const submitApi = useAdmissionSubmitPost()
  const handleSubmit = async () => {
    if (!state) return;
    setIsLoading(true)
    submitApi.mutate({
      applicantName: state.applicantInfo.applicantName,
      applicantTel: state.applicantInfo.applicantNumber,
      applicationType: typeSelectionFormat(state.applicationClassification.typeSelection),//포맷
      educationalStatus: graduationTypeFormat(state.applicationClassification.graduationType),//포맷
      birthDate: formatDate(state.applicantInfo.dateOfBirth, "졸업"),//date 포맷 (배열 -> YYYY-MM-DD)
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
      graduationDate: formatDate(state.applicationClassification.graduationDate, state.applicationClassification.graduationType),//날짜 포맷 (졸업구분에 따라 다르게)
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
      gedKorean: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? convertToNumber(state.gedScore.kor) : null,
      gedSocial: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? convertToNumber(state.gedScore.soc) : null,
      gedHistory: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? convertToNumber(state.gedScore.his) : null,
      gedMath: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? convertToNumber(state.gedScore.math) : null,
      gedScience: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? convertToNumber(state.gedScore.sci) : null,
      gedTech: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? convertToNumber(state.gedScore.tech) : null,
      gedEnglish: state.applicationClassification.graduationType === "검정고시 (중학교 졸업 학력)" ? convertToNumber(state.gedScore.eng) : null,
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
      // unexcused: 
      //   state.applicationClassification.graduationType === "졸업 예정"
      //     ? Number(state.activityGraduateProspective.unexcused)
      //     : state.applicationClassification.graduationType === "졸업"
      //       ? Number(state.activityGraduate.unexcused)
      //       : null,
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
    }, {
      onSuccess: () => {
        setIsLoading(false);
        navigate('/submitted');
        window.indexedDB.deleteDatabase('ApplicationFormDB'); //db 초기화
      },
      onError: () => {
        // window.indexedDB.deleteDatabase('ApplicationFormDB'); //db 초기화
      }
    })
    // try {
    //   setIsLoading(true);
    //   await new Promise(resolve => setTimeout(resolve, 4000)); //예시 api -> 연동 시 삭제
    //   await performSave(state, saveToStorage, true);
    // } finally {
    // }
  };

  const isGraduationTypeSelected = Boolean(graduationType && graduationType.trim());

  return (
    <>
      <Flex paddingTop="44px" paddingBottom="44px" height="fit-content" alignItems="end" gap={20} width="100%" justifyContent="space-between">
        <PreviousButton
          backgroundColor={colors.gray[50]}
          color={colors.orange[800]}
          borderColor={colors.orange[800]}
          onClick={handlePreviousPage}
          isBlocked={currentPage <= 1}
          hoverBackgroundColor={colors.gray[50]}
        >
          이전
        </PreviousButton>

        <Flex gap={12} width="fit-content" height="fit-content">
          {renderPageIndicators(paginationInfo, currentPage, handlePageClick)}
        </Flex>

        {currentPage === totalPages ? (
          isGraduationTypeSelected ? (
            <PreviousButton isBlocked={isSubmitBlocked} onClick={handleSubmit}>제출</PreviousButton>
          ) : (
            <PreviousButton isBlocked={true}>다음</PreviousButton>
          )
        ) : (
          <PreviousButton onClick={handleNextPage}>다음</PreviousButton>
        )}

        {isLoading && (
          <LoadingModal>
            <BeatLoader color={colors.orange[800]} />
          </LoadingModal>
        )}
      </Flex>
    </>
  );
};

// 페이징 계산
function calculatePaginationInfo(currentPage: number, totalPages: number) {
  const groupStart = Math.floor((currentPage - 1) / PAGES_PER_GROUP) * PAGES_PER_GROUP + 1;
  const groupEnd = Math.min(groupStart + PAGES_PER_GROUP - 1, totalPages);
  return { groupStart, groupEnd };
}

// 페이지 인디케이터
function renderPageIndicators(
  paginationInfo: { groupStart: number; groupEnd: number },
  currentPage: number,
  onPageClick: (page: number) => void
) {
  const { groupStart, groupEnd } = paginationInfo;
  const pageCount = groupEnd - groupStart + 1;
  return Array.from({ length: pageCount }, (_, index) => {
    const pageNumber = groupStart + index;
    return <PageIndicator key={pageNumber} isActive={currentPage === pageNumber} onClick={() => onPageClick(pageNumber)} />;
  });
}

const LoadingModal = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.08);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const PageIndicator = styled.nav<{ isActive: boolean }>`
  cursor: pointer;
  width: 54px;
  height: 4px;
  background-color: ${({ isActive }) => (isActive ? colors.orange[800] : colors.gray[200])};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${({ isActive }) => (isActive ? colors.orange[800] : colors.orange[400])};
  }
`;
