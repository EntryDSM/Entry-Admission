import { colors, Flex } from '@entry/design-token';
import styled from '@emotion/styled';
import { PreviousButton } from './PreviousButton';

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
  // 한 번에 보여줄 페이지 수
  const pagesPerGroup = 6;

  // 현재 그룹의 첫 번째 페이지 번호 계산
  const currentGroupStart =
    Math.floor((currentPage - 1) / pagesPerGroup) * pagesPerGroup + 1;

  // 현재 그룹의 마지막 페이지 번호 계산
  const currentGroupEnd = Math.min(
    currentGroupStart + pagesPerGroup - 1,
    totalPages
  );

  // 이전 페이지로 이동하는 이벤트 핸들러
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // 다음 페이지로 이동하는 이벤트 핸들러
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // 마지막 페이지에서 제출 버튼 클릭 시 실행되는 함수
  const completeClick = () => {
    //제출 api
  };
  return (
    <Flex
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
        <PreviousButton onClick={completeClick}>제출</PreviousButton>
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
