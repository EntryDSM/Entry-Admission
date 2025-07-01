import { colors, Flex } from '@entry/design-token';
import styled from '@emotion/styled';
import { PreviousButton } from './PreviousButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useApplicationData, useCheckPageData } from '@entry/ui';
import { useEffect, useState, useRef } from 'react';

interface IApplicationNavType {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

// 페이지네이션 관련 상수
const PAGES_PER_GROUP = 6;

export const ApplicationNav = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: IApplicationNavType) => {
  // 제출 버튼 활성화 상태
  const [isSubmitBlocked, setIsSubmitBlocked] = useState<boolean>(true);

  // 저장 관련 상태
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const previousDataRef = useRef<string | null>(null);
  const isSavingRef = useRef<boolean>(false);
  const isNavigationSavingRef = useRef<boolean>(false);

  // 훅들
  const { saveToStorage, state } = useApplicationData();
  const [checkData] = useCheckPageData('check');
  const navigate = useNavigate();

  // 페이지네이션 계산
  const paginationInfo = calculatePaginationInfo(currentPage, totalPages);

  // 초기 데이터 설정
  useEffect(() => {
    if (state && previousDataRef.current === null) {
      previousDataRef.current = JSON.stringify(state);
      setHasUnsavedChanges(false);
    }
  }, [state]);

  // 데이터 변경 감지
  useEffect(() => {
    if (!state || !previousDataRef.current || isSavingRef.current) {
      return;
    }

    const currentDataString = JSON.stringify(state);
    const hasChanged = currentDataString !== previousDataRef.current;
    setHasUnsavedChanges(hasChanged);
  }, [state]);

  // 제출 버튼 활성화 조건 확인
  useEffect(() => {
    const isConfirmed = checkData.message === '확인했습니다';
    setIsSubmitBlocked(!isConfirmed);
  }, [checkData.message]);

  // 저장 완료 후 상태 업데이트
  const updateAfterSave = () => {
    if (state) {
      previousDataRef.current = JSON.stringify(state);
      setHasUnsavedChanges(false);
    }
  };

  // 페이지 이동 전 저장 처리
  const saveBeforeNavigation = async () => {
    if (
      !hasUnsavedChanges ||
      isSavingRef.current ||
      isNavigationSavingRef.current
    ) {
      return;
    }

    isNavigationSavingRef.current = true;
    isSavingRef.current = true;

    try {
      await saveToStorage();
      toast.success('임시저장이 완료되었습니다.');
      updateAfterSave();
    } catch (error) {
      console.error('저장 실패:', error);
      toast.error('저장에 실패했습니다.');
    } finally {
      isNavigationSavingRef.current = false;
      isSavingRef.current = false;
    }
  };

  // 이벤트 핸들러들
  const handlePreviousPage = async () => {
    await saveBeforeNavigation();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = async () => {
    await saveBeforeNavigation();
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = async (targetPage: number) => {
    if (targetPage === currentPage) {
      return; // 현재 페이지와 동일하면 아무것도 하지 않음
    }

    await saveBeforeNavigation();
    setCurrentPage(targetPage);
  };

  const handleSubmit = () => {
    navigate('/submitted');
  };

  return (
    <Flex
      paddingTop="44px"
      paddingBottom="44px"
      height="fit-content"
      alignItems="end"
      gap={20}
      width="100%"
      justifyContent="space-between"
    >
      {/* 이전 버튼 */}
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

      {/* 페이지 인디케이터 */}
      <Flex gap={12} width="fit-content" height="fit-content">
        {renderPageIndicators(paginationInfo, currentPage, handlePageClick)}
      </Flex>

      {/* 다음/제출 버튼 */}
      {currentPage < totalPages ? (
        <PreviousButton onClick={handleNextPage}>다음</PreviousButton>
      ) : (
        <PreviousButton isBlocked={isSubmitBlocked} onClick={handleSubmit}>
          제출
        </PreviousButton>
      )}
    </Flex>
  );
};

// 페이지네이션 정보 계산 함수
function calculatePaginationInfo(currentPage: number, totalPages: number) {
  const groupStart =
    Math.floor((currentPage - 1) / PAGES_PER_GROUP) * PAGES_PER_GROUP + 1;
  const groupEnd = Math.min(groupStart + PAGES_PER_GROUP - 1, totalPages);

  return { groupStart, groupEnd };
}

// 페이지 인디케이터 렌더링 함수
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

// 스타일드 컴포넌트
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
