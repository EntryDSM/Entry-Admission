import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
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

  return (
    <Container>
      {datas.map((data, index) => (
        <NavItem isFirst={index === 0} key={index} flex={1}>
          {index !== 0 && (
            <Line isActive={index <= activeIndex} />
          )}
          <NavButton
            onClick={() => navClick(index, data.path)}
            isActive={index <= activeIndex}
          >
            <NavCircle isActive={index <= activeIndex} />
            <NavLabel isActive={index <= activeIndex}>{data.name}</NavLabel>
          </NavButton>
        </NavItem>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 20px;
  height: fit-content;
`;

const NavItem = styled.div<{ isFirst: boolean; flex: number }>`
  display: flex;
  flex: ${({ isFirst, flex }) => (isFirst ? '0 0 auto' : `${flex} 1 0`)};
  align-items: center;
  gap: 16px;
  min-width: 0; 
`;

const Line = styled.div<{ isActive: boolean }>`
  flex-grow: 1;
  height: 4px;
  border-radius: 100px;
  min-width: 20px;
  background-color: ${({ isActive }) =>
    isActive ? colors.orange[800] : colors.gray[100]};
  transition: background-color 0.4s ease-in-out;
`;

const NavButton = styled.button<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  outline: none;
  min-width: 0;

  &:focus-visible {
    outline: 2px solid ${colors.orange[800]};
    outline-offset: 2px;
  }
`;

const NavCircle = styled.div<{ isActive: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ isActive }) =>
    isActive ? colors.orange[800] : colors.gray[100]};
  transition: background-color 0.35s ease-in-out;

  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? colors.orange[800] : colors.gray[200]};
  }
`;

const NavLabel = styled.div<{ isActive: boolean }>`
  white-space: nowrap;
  font-size: 16px;
  font-weight: 400;
  color: ${({ isActive }) =>
    isActive ? colors.gray[500] : colors.gray[400]};
  user-select: none;
  text-align: center;
  min-width: 0;
`;
