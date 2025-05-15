import { colors, Flex } from '@entry/design-token';
import styled from '@emotion/styled';
import { SubButton } from './Button';

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
  const pagesPerGroup = 6;
  const currentGroupStart =
    Math.floor((currentPage - 1) / pagesPerGroup) * pagesPerGroup + 1;
  const currentGroupEnd = Math.min(
    currentGroupStart + pagesPerGroup - 1,
    totalPages
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  return (
    <Flex
      height="fit-content"
      alignItems="end"
      gap={20}
      width="100%"
      justifyContent="space-between"
    >
      {currentPage > 1 ? (
        <SubButton onClick={handlePrevPage}>이전</SubButton>
      ) : (
        <SubButton isBlocked={true}>이전</SubButton>
      )}
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
        <SubButton width="" onClick={handleNextPage}>
          다음
        </SubButton>
      ) : (
        <SubButton isBlocked={true}>다음</SubButton>
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
