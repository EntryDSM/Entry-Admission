import { colors, Flex } from '@entry/design-token';
import styled from '@emotion/styled';
import { PreviousButton } from './PreviousButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useApplicationData, useCheckPageData } from '@entry/ui';
import { useEffect, useState } from 'react';

interface IApplicationNavType {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const ApplicationNav = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: IApplicationNavType) => {
  const [isBlocked, setIsBlocked] = useState<boolean>(true);
  const { saveToStorage, state } = useApplicationData();
  const [datas, _] = useCheckPageData('check');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // state가 변경될 때마다 플래그 설정
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [state]);

  // 한 번에 보여줄 페이지 수
  const pagesPerGroup = 6;
  const navigate = useNavigate();

  // 현재 그룹의 첫 번째 페이지 번호 계산
  const currentGroupStart =
    Math.floor((currentPage - 1) / pagesPerGroup) * pagesPerGroup + 1;

  // 현재 그룹의 마지막 페이지 번호 계산
  const currentGroupEnd = Math.min(
    currentGroupStart + pagesPerGroup - 1,
    totalPages
  );

  // 이전 페이지로 이동하는 이벤트 핸들러
  const handlePrevPage = async () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    //페이지 넘어갈 시 임시저장 기능
    if (hasUnsavedChanges) {
      await saveToStorage();
      toast.success('임시저장이 완료되었습니다.');
      setHasUnsavedChanges(false);
    }
  };

  // 다음 페이지로 이동하는 이벤트 핸들러
  const handleNextPage = async () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    //페이지 넘어갈 시 임시저장 기능
    if (hasUnsavedChanges) {
      await saveToStorage();
      toast.success('임시저장이 완료되었습니다.');
      setHasUnsavedChanges(false);
    }
  };

  //check가 확인했습니다인지 확인
  useEffect(() => {
    setIsBlocked(datas.message === '확인했습니다' ? false : true);
  }, [datas.message]);

  // 마지막 페이지에서 제출 버튼 클릭 시 실행되는 함수
  const completeClick = () => {
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
      <PreviousButton
        backgroundColor={colors.gray[50]}
        color={colors.orange[800]}
        borderColor={colors.orange[800]}
        onClick={handlePrevPage}
        isBlocked={currentPage > 1 ? false : true}
        hoverBackgroundColor={colors.gray[50]}
      >
        이전
      </PreviousButton>
      <Flex gap={12} width="fit-content" height="fit-content">
        {Array.from(
          { length: currentGroupEnd - currentGroupStart + 1 },
          (_, i) => {
            const page = currentGroupStart + i;
            return (
              <Nav
                key={page}
                isActive={currentPage === page}
                onClick={() => setCurrentPage(page)}
              ></Nav>
            );
          }
        )}
      </Flex>
      {currentPage < totalPages ? (
        <PreviousButton onClick={handleNextPage}>다음</PreviousButton>
      ) : (
        <PreviousButton isBlocked={isBlocked} onClick={completeClick}>
          제출
        </PreviousButton>
      )}
    </Flex>
  );
};

const Nav = styled.nav<{ isActive: boolean }>`
  cursor: pointer;
  width: 54px;
  height: 4px;
  background-color: ${({ isActive }) =>
    isActive ? colors.orange[800] : colors.gray[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease-in;
`;
