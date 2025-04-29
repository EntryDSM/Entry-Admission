import { colors, Flex } from '@entry/design-token';
import styled from '@emotion/styled';
import { ArrowNav } from './assets';

interface IPageNav {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const PageNav = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: IPageNav) => {
  const pagesPerGroup = 7;
  const currentGroupStart =
    Math.floor((currentPage - 1) / pagesPerGroup) * pagesPerGroup + 1;
  const currentGroupEnd = Math.min(
    currentGroupStart + pagesPerGroup - 1,
    totalPages
  );

  const handlePrevGroup = () => {
    const prevGroupStart = Math.max(1, currentGroupStart - pagesPerGroup);
    setCurrentPage(prevGroupStart);
  };

  const handleNextGroup = () => {
    const nextGroupStart = Math.min(
      totalPages,
      currentGroupStart + pagesPerGroup
    );
    setCurrentPage(nextGroupStart);
  };

  return (
    <Flex alignItems="center" gap={20}>
      {currentGroupStart > 1 ? (
        <NavChange onClick={handlePrevGroup}>
          <ArrowNav />
        </NavChange>
      ) : (
        <NavChange>
          <ArrowNav isBlocked={true} />
        </NavChange>
      )}
      {Array.from(
        { length: currentGroupEnd - currentGroupStart + 1 },
        (_, i) => {
          const page = currentGroupStart + i;
          return (
            <Nav
              key={page}
              isActive={currentPage === page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Nav>
          );
        }
      )}
      {currentGroupEnd < totalPages ? (
        <NavChange onClick={handleNextGroup}>
          <ArrowNav isRight={true} />
        </NavChange>
      ) : (
        <NavChange>
          <ArrowNav isRight={true} isBlocked={true} />
        </NavChange>
      )}
    </Flex>
  );
};
const NavChange = styled.button`
  background-color: transparent;
  width: fit-content;
  outline: none;
  border: none;
`;

const Nav = styled.nav<{ isActive: boolean }>`
  cursor: pointer;
  width: 30px;
  height: 30px;
  color: ${({ isActive }) =>
    isActive ? colors.orange[800] : colors.gray[500]};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease-in;
  &:hover {
    transform: translateY(-2px);
    transition: 0.3s ease-in;
  }
`;
