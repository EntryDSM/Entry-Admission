import { colors, Flex } from '@entry/design-token';
import styled from '@emotion/styled';
import { PreviousButton } from './PreviousButton';
import { useNavigate } from 'react-router-dom';
import { useApplicationData, useCheckPageData } from './contexts';
import { useEffect, useState, useRef } from 'react';
import {
  previousDataRef,
  performSave,
  hasChanged,
  serializeStateWithFiles,
} from './utils/skipNextAutoSave';
import { BeatLoader } from 'react-spinners';


interface IApplicationNavType {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  graduationType?: string;
}

const PAGES_PER_GROUP = 6;

export const ApplicationNav = ({
  totalPages,
  currentPage,
  setCurrentPage,
  graduationType,
}: IApplicationNavType) => {
  const [isSubmitBlocked, setIsSubmitBlocked] = useState<boolean>(true);
  const [_, setHasUnsavedChanges] = useState(false);
  const isNavigationSavingRef = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { saveToStorage, state } = useApplicationData();
  const [checkData] = useCheckPageData('check');
  const navigate = useNavigate();

  const paginationInfo = calculatePaginationInfo(currentPage, totalPages);

  useEffect(() => {
    if (state && previousDataRef.current === null) {
      previousDataRef.current = serializeStateWithFiles(state);
      setHasUnsavedChanges(false);
    }
  }, [state]);

  useEffect(() => {
    if (!state || !previousDataRef.current) return;

    const currentDataString = serializeStateWithFiles(state);
    const hasDataChanged = currentDataString !== previousDataRef.current;
    setHasUnsavedChanges(hasDataChanged);
  }, [state]);

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
    
    if (!hasChanged(state)) {
      return;
    }

    if (isNavigationSavingRef.current) {
      return;
    }

    isNavigationSavingRef.current = true;

    try {
      // isManual = true로 설정하여 수동 저장임을 표시
      const wasSaved = await performSave(state, saveToStorage, true);
      
      if (wasSaved) {
        updateAfterSave();
      }
    } catch (error) {
    } finally {
      isNavigationSavingRef.current = false;
    }
  };

  const handlePreviousPage = async () => {
    await saveBeforeNavigation();
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = async () => {
    await saveBeforeNavigation();
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = async (targetPage: number) => {
    if (targetPage === currentPage) return;
    await saveBeforeNavigation();
    setCurrentPage(targetPage);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      // 제출 API 호출
      await new Promise(resolve => setTimeout(resolve, 4000)); //예시 api -> 연동 시 삭제
      await performSave(state, saveToStorage, true); 
      navigate('/submitted');
    } catch (error) {
      console.error('제출 중 오류 발생', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isGraduationTypeSelected = Boolean(
    graduationType && graduationType.trim()
  );

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
          <PreviousButton isBlocked={true} onClick={() => {}}>
            다음
          </PreviousButton>
        )
      ) : (
        <PreviousButton
          onClick={handleNextPage}
          isBlocked={!isGraduationTypeSelected} // 졸업유형 없으면 막기
        >
          다음
        </PreviousButton>
      )}
      {isLoading && (
        <LoadingModal>
          <BeatLoader color={colors.orange[800]}/>
        </LoadingModal>
      )}
    </Flex>
  );
};

function calculatePaginationInfo(currentPage: number, totalPages: number) {
  const groupStart =
    Math.floor((currentPage - 1) / PAGES_PER_GROUP) * PAGES_PER_GROUP + 1;
  const groupEnd = Math.min(groupStart + PAGES_PER_GROUP - 1, totalPages);
  return { groupStart, groupEnd };
}

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

const LoadingModal = styled.div `
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.08);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`

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