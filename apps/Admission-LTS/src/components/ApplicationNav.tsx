import { colors, Flex } from '@entry/design-token';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApplicationData, useCheckPageData, usePageData, PreviousButton, previousDataRef, performSave, hasChanged, serializeStateWithFiles } from '@entry/ui';
import { useEffect, useState, useRef } from 'react';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';

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

    const currentPath = location.pathname;
    if (currentPath.includes('/activity-graduate')) {
      // 성적 검증 api 호출
      // toast.success('sddd')
    } else if (currentPath.includes('/activity-prospective-graduate')) {
      // 성적 검증 api 호출
      // toast.success('sddd')
    } else if (currentPath.includes('/ged/attendance-volunteer')) {
      // 성적 검증 api 호출
      // toast.success('sddd')
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

  const handleSubmit = async () => {
    if (!state) return;
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 4000)); //예시 api -> 연동 시 삭제
      await performSave(state, saveToStorage, true);
      navigate('/submitted');
    } finally {
      setIsLoading(false);
    }
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
