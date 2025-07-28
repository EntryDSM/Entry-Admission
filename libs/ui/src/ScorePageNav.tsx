import styled from '@emotion/styled';
import { colors, Flex } from '@entry/design-token';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

interface IScorePageNav {
  datas: { path: string; name: string }[];
}

export const ScorePageNav = ({ datas }: IScorePageNav) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const activeIndex = useMemo(() => {
    return datas.findIndex((data) => location.pathname.endsWith(data.path));
  }, [location.pathname, datas]);

  const navClick = (index: number, path: string) => {
    navigate(path);
  };

  // 단계 수에 따른 Line width 계산
  const getLineWidth = () => {
    if (datas.length === 2) return '928px';
    if (datas.length === 4) return '196px';
    if (datas.length === 5) return '140px'; // 졸업자용
    return '150px'; // 기본값
  };

  return (
    <Flex
      width="fit-content"
      height="fit-content"
      gap={20}
      alignItems="center"
      flexWrap="nowrap"
    >
      {datas.map((data, index) => (
        <Flex
          width="fit-content"
          height="fit-content"
          gap={16}
          alignItems="center"
          key={index}
        >
          {index !== 0 && (
            <Line width={getLineWidth()} isActive={index <= activeIndex} />
          )}
          <Flex
            onClick={() => navClick(index, data.path)}
            width="fit-content"
            height="fit-content"
            isColumn={true}
            gap={4}
            alignItems="center"
          >
            <Nav isActive={index <= activeIndex} />
            <NavLabel isActive={index <= activeIndex}>{data.name}</NavLabel>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
const NavLabel = styled.div<{ isActive: boolean }>`
  white-space: nowrap;
  font-size: 16px;
  font-weight: 400;
  color: ${({ isActive }) => (isActive ? colors.gray[500] : colors.gray[400])};
`;

const Line = styled.div<{ isActive: boolean; width: string }>`
  width: ${({ width }) => width};
  height: 4px;
  background-color: ${({ isActive }) =>
    isActive ? colors.orange[800] : colors.gray[100]};
  border-radius: 100px;
  background-size: 200% 100%;
  background-position: ${({ isActive }) => (isActive ? '100% 0' : '0 0')};
  transition: background-position 0.4s ease-in-out,
    background-color 0.4s ease-in-out;
`;

const Nav = styled.button<{ isActive: boolean }>`
  cursor: pointer;
  outline: none;
  border: none;
  width: 20px;
  height: 20px;
  border-radius: 16px;
  background-color: ${({ isActive }) =>
    isActive ? colors.orange[800] : colors.gray[100]};
  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? colors.orange[800] : colors.gray[200]};
    transition: 0.35s ease-in-out;
  }
`;
