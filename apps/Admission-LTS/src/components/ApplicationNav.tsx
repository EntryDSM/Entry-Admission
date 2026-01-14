import { colors, Flex, Text } from '@entry/design-token';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useApplicationData,
  useCheckPageData,
  usePageData,
  PreviousButton,
  previousDataRef,
  performSave,
  hasChanged,
  serializeStateWithFiles,
} from '@entry/ui';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useAdmissionSubmitPost } from '../apis';
import { convertGradeToScore } from '../hooks';
import { getApplicationRemark } from '../utils/applicationRemark';
import { GlobalLoader } from './';

interface IApplicationNavType {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  graduationType?: string;
  validateCurrentPage?: (page: number) => {
    canProceed: boolean;
    message?: string;
  };
  // toast?: (message: string) => void; // 외부에서 toast 전달
}

const PAGES_PER_GROUP = 6;

export const ApplicationNav = ({
  totalPages,
  currentPage,
  setCurrentPage,
  graduationType,
  validateCurrentPage,
}: // toast = (msg: string) => window.alert(msg),
IApplicationNavType) => {
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

    if (
      currentPage === 1 &&
      (!datas.graduationType || !datas.graduationType.trim())
    ) {
      return toast.error('졸업 구분은 필수값입니다.');
    }

    // ✅ validation 먼저 체크
    if (validateCurrentPage) {
      const validation = validateCurrentPage(currentPage);
      if (!validation.canProceed)
        return toast.error(
          validation.message || '필수 항목을 모두 입력해주세요.'
        );
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
      if (!validation.canProceed)
        return toast.error(
          validation.message || '필수 항목을 모두 입력해주세요.'
        );
    }

    await saveBeforeNavigation();
    setCurrentPage(targetPage);
  };

  const formatDate = (arr: (number | string)[], graduationType: string) => {
    // 검정고시는 null 반환
    if (graduationType === '검정고시 (중학교 졸업 학력)') {
      return 'XXXX';
    }

    // 배열이 비어있거나 값이 없으면 오늘 날짜를 기본값으로 사용
    const today = new Date();
    const [
      year = today.getFullYear(),
      month = today.getMonth() + 1,
      day = today.getDate(),
    ] = arr;

    const y = String(year).padStart(4, '0');
    const m = String(month).padStart(2, '0');

    // 졸업 예정: 년-월-00, 졸업: 년-월-일
    if (graduationType === '졸업 예정') {
      return `${y}-${m}-00`;
    } else {
      const d = String(day).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
  };

  const toGraduationDateDto = (
    arr: (number | string)[],
    graduationType: string
  ) => {
    if (graduationType === '검정고시 (중학교 졸업 학력)') {
      return null;
    }

    const today = new Date();
    const [year = today.getFullYear(), month = today.getMonth() + 1] = arr;
    const yearValue = Number(year);
    const monthValue = Number(month);

    if (!Number.isFinite(yearValue) || !Number.isFinite(monthValue))
      return null;

    const yyyy = String(yearValue).padStart(4, '0');
    const mm = String(Math.max(1, Math.min(12, monthValue))).padStart(2, '0');
    return `${yyyy}-${mm}`;
  };

  const typeSelectionFormat = (
    type: string
  ): 'COMMON' | 'MEISTER' | 'SOCIAL' | null => {
    const map: Record<string, 'COMMON' | 'MEISTER' | 'SOCIAL'> = {
      일반: 'COMMON',
      '마이스터 인재': 'MEISTER',
      사회통합: 'SOCIAL',
    };

    return map[type] ?? null;
  };

  const graduationTypeFormat = (
    status: string
  ): 'PROSPECTIVE_GRADUATE' | 'GRADUATE' | 'QUALIFICATION_EXAM' | null => {
    const map: Record<
      string,
      'PROSPECTIVE_GRADUATE' | 'GRADUATE' | 'QUALIFICATION_EXAM'
    > = {
      '졸업 예정': 'PROSPECTIVE_GRADUATE',
      졸업: 'GRADUATE',
      '검정고시 (중학교 졸업 학력)': 'QUALIFICATION_EXAM',
    };

    return map[status] ?? null;
  };

  const genderFormat = (status: string): 'MALE' | 'FEMALE' | null => {
    const map: Record<string, 'MALE' | 'FEMALE'> = {
      남성: 'MALE',
      여성: 'FEMALE',
    };

    return map[status] ?? null;
  };

  const convertToNumber = (
    value: string | number | null | undefined
  ): number | null => {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const num = Number(value);
    return isNaN(num) ? null : num;
  };

  const isQualificationExam =
    state?.applicationClassification.graduationType === '검정고시 (중학교 졸업 학력)' ||
    state?.applicationClassification.graduationType?.includes('검정고시');

  // 성적 등급을 4글자 문자열로 변환 (2-1, 2-2, 3-1, 3-2 순서)
  const buildGradeString = (
    subject: 'kor' | 'soc' | 'his' | 'math' | 'sci' | 'tech' | 'eng'
  ): string | null => {
    if (!state) return null;

    const graduationType = state.applicationClassification.graduationType;

    if (isQualificationExam) {
      return 'XXXX';
    }

    const toGrade = (val: string | null | undefined): string => {
      if (!val || val.trim() === '') return 'X';
      return val.toUpperCase();
    };

    if (graduationType === '졸업') {
      const g1 = toGrade(state.firstGraduate[subject]);
      const g2 = toGrade(state.secondGraduate[subject]);
      const g3 = toGrade(state.thirdGraduate[subject]);
      const g4 = toGrade(state.fourthGraduate[subject]);
      return `${g1}${g2}${g3}${g4}`;
    } else if (graduationType === '졸업 예정') {
      const g1 = toGrade(state.firstGraduateProspective[subject]);
      const g2 = toGrade(state.secondGraduateProspective[subject]);
      const g3 = toGrade(state.thirdGraduateProspective[subject]);
      return `${g1}${g2}${g3}X`;
    }

    return null;
  };

  const submitApi = useAdmissionSubmitPost();
  const handleSubmit = async () => {
    if (!state) return;
    setIsLoading(true);
    submitApi.mutate(
      {
        applicantInfo: {
          applicantName: state.applicantInfo.applicantName,
          applicantTel: state.applicantInfo.applicantNumber.replace(/-/g, ''),
          birthDate: formatDate(state.applicantInfo.dateOfBirth, '졸업'),
          applicantGender: genderFormat(state.applicantInfo.gender),
          parentName: state.guardianInfo.guardianName,
          parentTel: state.guardianInfo.guardianNumber.replace(/-/g, ''),
          parentRelation: state.guardianInfo.relationship[0],
        },
        addressInfo: {
          isDaejeon:
            state.applicationClassification.regionSelection === '대전'
              ? true
              : false,
          streetAddress: state.guardianInfo.address,
          detailAddress: state.guardianInfo.addressDetail,
          postalCode: state.guardianInfo.postalCode,
        },
        applicationInfo: {
          applicationType: typeSelectionFormat(
            state.applicationClassification.typeSelection
          ),
          educationalStatus: graduationTypeFormat(
            state.applicationClassification.graduationType
          ),
          studentNumber:
            state.applicationClassification.graduationType ===
            '검정고시 (중학교 졸업 학력)'
              ? null
              : state.middleSchoolInfo.studentId,
          graduationDate: toGraduationDateDto(
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
          schoolCode:
            state.applicationClassification.graduationType ===
            '검정고시 (중학교 졸업 학력)'
              ? null
              : state.middleSchoolInfo.schoolCode,
          schoolName:
            state.applicationClassification.graduationType ===
            '검정고시 (중학교 졸업 학력)'
              ? null
              : state.middleSchoolInfo.schoolName,
          schoolPhone:
            state.applicationClassification.graduationType ===
            '검정고시 (중학교 졸업 학력)'
              ? null
              : state.middleSchoolInfo.schoolPhone,
          teacherName:
            state.applicationClassification.graduationType ===
            '검정고시 (중학교 졸업 학력)'
              ? null
              : state.middleSchoolInfo.teacherName,
        },
        gradeInfo: {
          koreanGrade: isQualificationExam ? 'XXXX' : buildGradeString('kor'),
          socialGrade: isQualificationExam ? 'XXXX' : buildGradeString('soc'),
          historyGrade: isQualificationExam ? 'XXXX' : buildGradeString('his'),
          mathGrade: isQualificationExam ? 'XXXX' : buildGradeString('math'),
          scienceGrade: isQualificationExam ? 'XXXX' : buildGradeString('sci'),
          englishGrade: isQualificationExam ? 'XXXX' : buildGradeString('eng'),
          techAndHomeGrade: isQualificationExam ? 'XXXX' : buildGradeString('tech'),
          gedKorean:
            state.applicationClassification.graduationType ===
            '검정고시 (중학교 졸업 학력)'
              ? convertToNumber(state.gedScore.kor)
              : 0,
          gedSocial:
            state.applicationClassification.graduationType ===
            '검정고시 (중학교 졸업 학력)'
              ? convertToNumber(state.gedScore.soc)
              : 0,
          gedMath:
            state.applicationClassification.graduationType ===
            '검정고시 (중학교 졸업 학력)'
              ? convertToNumber(state.gedScore.math)
              : 0,
          gedScience:
            state.applicationClassification.graduationType ===
            '검정고시 (중학교 졸업 학력)'
              ? convertToNumber(state.gedScore.sci)
              : 0,
          gedEnglish:
            state.applicationClassification.graduationType ===
            '검정고시 (중학교 졸업 학력)'
              ? convertToNumber(state.gedScore.eng)
              : 0,
          gedHistory:
            state.applicationClassification.graduationType ===
            '검정고시 (중학교 졸업 학력)'
              ? convertToNumber(state.gedScore.his)
              : 0,
        },
        attendanceInfo: {
          absence:
            state.applicationClassification.graduationType === '졸업 예정'
              ? Number(state.activityGraduateProspective.absence)
              : state.applicationClassification.graduationType === '졸업'
              ? Number(state.activityGraduate.absence)
              : null,
          tardiness:
            state.applicationClassification.graduationType === '졸업 예정'
              ? Number(state.activityGraduateProspective.tardiness)
              : state.applicationClassification.graduationType === '졸업'
              ? Number(state.activityGraduate.tardiness)
              : null,
          earlyLeave:
            state.applicationClassification.graduationType === '졸업 예정'
              ? Number(state.activityGraduateProspective.earlyLeave)
              : state.applicationClassification.graduationType === '졸업'
              ? Number(state.activityGraduate.earlyLeave)
              : null,
          classExit:
            state.applicationClassification.graduationType === '졸업 예정'
              ? Number(state.activityGraduateProspective.classExit)
              : state.applicationClassification.graduationType === '졸업'
              ? Number(state.activityGraduate.classExit)
              : null,
          volunteer:
            state.applicationClassification.graduationType === '졸업 예정'
              ? Number(state.activityGraduateProspective.volunteer)
              : state.applicationClassification.graduationType === '졸업'
              ? Number(state.activityGraduate.volunteer)
              : null,
        },
        awardAndCertificateInfo: {
          algorithmAward:
            state.applicationClassification.graduationType === '졸업 예정'
              ? state.activityGraduateProspective.dsmAlgorithm === 'O'
              : state.applicationClassification.graduationType === '졸업'
              ? state.activityGraduate.dsmAlgorithm === 'O'
              : state.attendanceVolunteer.dsmAlgorithm === 'O',
          infoProcessingCert:
            state.applicationClassification.graduationType === '졸업 예정'
              ? state.activityGraduateProspective.certificate === 'O'
              : state.applicationClassification.graduationType === '졸업'
              ? state.activityGraduate.certificate === 'O'
              : state.attendanceVolunteer.certificate === 'O',
        },
      },
      {
        onSuccess: () => {
          setIsLoading(false);
          navigate('/submitted');
          window.indexedDB.deleteDatabase('ApplicationFormDB'); //db 초기화
        },
        onError: () => {
          // window.indexedDB.deleteDatabase('ApplicationFormDB'); //db 초기화
        },
      }
    );
    // try {
    //   setIsLoading(true);
    //   await new Promise(resolve => setTimeout(resolve, 4000)); //예시 api -> 연동 시 삭제
    //   await performSave(state, saveToStorage, true);
    // } finally {
    // }
  };

  const isGraduationTypeSelected = Boolean(
    graduationType && graduationType.trim()
  );

  return (
    <>
      <Flex
        paddingTop="44px"
        paddingBottom="44px"
        height="fit-content"
        alignItems="end"
        gap={20}
        width="100%"
        justifyContent="space-between"
      >
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
            <PreviousButton isBlocked={isSubmitBlocked} onClick={handleSubmit}>
              제출
            </PreviousButton>
          ) : (
            <PreviousButton isBlocked={true}>다음</PreviousButton>
          )
        ) : (
          <PreviousButton onClick={handleNextPage}>다음</PreviousButton>
        )}

        <GlobalLoader isLoading={isLoading} />
      </Flex>
    </>
  );
};

// 페이징 계산
function calculatePaginationInfo(currentPage: number, totalPages: number) {
  const groupStart =
    Math.floor((currentPage - 1) / PAGES_PER_GROUP) * PAGES_PER_GROUP + 1;
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
    return (
      <PageIndicator
        key={pageNumber}
        isActive={currentPage === pageNumber}
        onClick={() => onPageClick(pageNumber)}
      />
    );
  });
}

const PageIndicator = styled.nav<{ isActive: boolean }>`
  cursor: pointer;
  width: 54px;
  height: 4px;
  background-color: ${({ isActive }) =>
    isActive ? colors.orange[800] : colors.gray[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? colors.orange[800] : colors.orange[400]};
  }
`;
