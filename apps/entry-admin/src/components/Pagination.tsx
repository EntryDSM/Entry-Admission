import styled from '@emotion/styled';
import { left, right } from '../assets';
import { colors } from '@entry/design-token';

interface IPagiNationType {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export const PagiNation = ({
  currentPage,
  totalPage,
  onPageChange,
}: IPagiNationType) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  const goToPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPage) {
      onPageChange(currentPage + 1);
    }
  };

  const goToPage = (page: number) => {
    onPageChange(page);
  };

  return (
    <Container>
      <PageButton id="left" onClick={goToPrevious} disabled={currentPage === 1}>
        <img src={left} alt="<" />
      </PageButton>

      {pageNumbers.map((number) => (
        <PageButton
          key={number}
          onClick={() => goToPage(number)}
          isActive={number === currentPage}
        >
          {number}
        </PageButton>
      ))}

      <PageButton
        id="right"
        onClick={goToNext}
        disabled={currentPage === totalPage}
      >
        <img src={right} alt=">" />
      </PageButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;

  @media (max-width: 768px) {
    margin-top: 70px;
  }

  #left {
    margin-right: 5px;
  }

  #right {
    margin-left: 5px;
  }
`;

const PageButton = styled.button<{ isActive?: boolean }>`
  min-width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: none;
  color: ${({ isActive }) => (isActive ? colors.green[500] : colors.gray[400])};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  img {
    width: 7px;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  }

  @media (max-width: 768px) {
    min-width: 36px;
    height: 36px;
    font-size: 13px;

    img {
      width: 14px;
      height: 14px;
    }
  }

  @media (max-width: 480px) {
    min-width: 32px;
    height: 32px;
    font-size: 12px;

    img {
      width: 12px;
      height: 12px;
    }
  }
`;
