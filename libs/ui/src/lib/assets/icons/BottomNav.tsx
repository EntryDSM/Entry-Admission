import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

interface IBottomNavType {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const BottomNav = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: IBottomNavType) => {
  const [pages, setPages] = useState<number[]>([]);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 페이지 번호 배열 생성
  useEffect(() => {
    // 기본적으로 보여줄 페이지 수
    const visiblePageCount = 5;

    let startPage = Math.max(1, currentPage - Math.floor(visiblePageCount / 2));
    let endPage = Math.min(totalPages, startPage + visiblePageCount - 1);

    if (endPage - startPage + 1 < visiblePageCount && startPage > 1) {
      startPage = Math.max(1, endPage - visiblePageCount + 1);
    }

    const newPages = [];
    for (let i = startPage; i <= endPage; i++) {
      newPages.push(i);
    }

    setPages(newPages);
  }, [currentPage, totalPages]);

  return (
    <BottomNavContainer>
      {/* 이전 버튼 */}
      <NavButton
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <LeftArrow
          width="10"
          height="18"
          viewBox="0 0 10 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.37765 1.16414L9.37757 1.16423L1.90643 8.64154L1.55335 8.9949L1.90639 9.34831L9.37753 16.8274L9.37749 16.8275L9.38241 16.8322C9.42273 16.8715 9.45281 16.9164 9.47239 16.9635C9.49194 17.0105 9.50103 17.0598 9.49991 17.1086C9.49878 17.1574 9.48742 17.2065 9.46556 17.253C9.44366 17.2996 9.41127 17.3436 9.3688 17.3815C9.32627 17.4195 9.27466 17.4504 9.21635 17.4712C9.15801 17.492 9.09508 17.5019 9.0315 17.4997C8.96793 17.4976 8.90618 17.4835 8.85004 17.4591C8.79394 17.4346 8.74538 17.4007 8.70637 17.3606L8.70641 17.3605L8.70153 17.3557L0.613822 9.25951L0.613619 9.25931C0.537469 9.18317 0.5 9.0881 0.5 8.99495C0.5 8.90179 0.537469 8.80672 0.613619 8.73058L0.613802 8.7304L8.70141 0.635248C8.70144 0.635214 8.70148 0.635181 8.70151 0.635147C8.74088 0.59579 8.78955 0.562685 8.84549 0.539006C8.90152 0.515292 8.96291 0.501868 9.02598 0.500181C9.08905 0.498494 9.15137 0.508612 9.20912 0.529436C9.26684 0.550249 9.31794 0.581002 9.3601 0.618664C9.40221 0.656276 9.43441 0.699855 9.45629 0.746059C9.47814 0.792183 9.48966 0.840756 9.49111 0.889211C9.49255 0.937656 9.48396 0.986496 9.46509 1.03325C9.44619 1.08009 9.41698 1.1248 9.37765 1.16414Z"
            fill={currentPage === 1 ? '#D9D9D9' : 'black'}
            stroke={currentPage === 1 ? '#D9D9D9' : '#B0B0B0'}
          />
        </LeftArrow>
      </NavButton>

      {/* 페이지 번호 버튼들 */}
      {pages.map((page) => (
        <PageNumberButton
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageNumberButton>
      ))}

      {/* 다음 버튼 */}
      <NavButton
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
      >
        <RightArrow
          width="10"
          height="18"
          viewBox="0 0 10 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.622351 16.8359L0.622432 16.8358L8.09357 9.35846L8.44665 9.0051L8.09361 8.65169L0.622475 1.17258L0.622508 1.17254L0.617587 1.16775C0.577266 1.12848 0.54719 1.08361 0.52761 1.0365C0.508063 0.989464 0.498968 0.940248 0.500093 0.891403C0.501219 0.84255 0.512581 0.793545 0.534441 0.747007C0.556341 0.700388 0.588731 0.656408 0.6312 0.618498C0.673726 0.580536 0.725343 0.54961 0.783652 0.528824C0.841992 0.508026 0.904919 0.498148 0.968496 0.500284C1.03207 0.50242 1.09382 0.516479 1.14996 0.540926C1.20606 0.565355 1.25462 0.599287 1.29363 0.639423L1.29359 0.639456L1.29847 0.644337L9.38618 8.74049L9.38638 8.74069C9.46253 8.81683 9.5 8.9119 9.5 9.00505C9.5 9.09821 9.46253 9.19328 9.38638 9.26942L9.3862 9.2696L1.29859 17.3648C1.29856 17.3648 1.29852 17.3648 1.29849 17.3649C1.25912 17.4042 1.21045 17.4373 1.15451 17.461C1.09848 17.4847 1.03709 17.4981 0.974016 17.4998C0.910946 17.5015 0.848625 17.4914 0.790877 17.4706C0.733158 17.4498 0.682055 17.419 0.639895 17.3813C0.597792 17.3437 0.565595 17.3001 0.543711 17.2539C0.521864 17.2078 0.510345 17.1592 0.508895 17.1108C0.507445 17.0623 0.516044 17.0135 0.534911 16.9667C0.553809 16.9199 0.583025 16.8752 0.622351 16.8359Z"
            fill={currentPage === totalPages ? `${colors.gray[200]}` : 'black'}
            stroke={
              currentPage === totalPages
                ? `${colors.gray[200]}`
                : `${colors.gray[400]}`
            }
          />
        </RightArrow>
      </NavButton>
    </BottomNavContainer>
  );
};

const BottomNavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 32px;
  margin: 20px 0;
`;

const NavButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  margin: 0 18px;
`;

const PageNumberButton = styled.button<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  margin: 0 8px;
  font-size: 15px;
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? `${colors.orange[500]}` : 'transparent'};
  color: ${(props) =>
    props.active ? `${colors.extra.white}` : `${colors.gray[300]}`};

  &:hover {
    background-color: ${(props) =>
      props.active ? `${colors.orange[500]}` : `${colors.extra.white}`};
  }
`;

const RightArrow = styled.svg`
  width: 10px;
  height: 18px;
`;

const LeftArrow = styled.svg`
  width: 10px;
  height: 18px;
`;
