import styled from '@emotion/styled';
import { colors, Flex } from '@entry/design-token';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IScorePageNav {
  datas: [{ path: string; name: string }];
}

export const ScorePageNav = ({ datas }: IScorePageNav) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const navClick = (index: number, path: string) => {
    setActiveIndex(index);
    navigate(path);
    console.log('click');
  };
  return (
    <Flex width="fit-content" height="fit-content" gap={20} alignItems="center">
      {datas.map((data, index) => (
        <Flex
          width="fit-content"
          height="fit-content"
          gap={16}
          alignItems="center"
          key={index}
        >
          {0 !== index && <Line isActive={index <= activeIndex} />}
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
  font-size: 16px;
  font-weight: 400;
  color: ${({ isActive }) => (isActive ? colors.gray[500] : colors.gray[400])};
`;

const Line = styled.div<{ isActive: boolean }>`
  width: 420px;
  height: 6px;
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
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${({ isActive }) =>
    isActive ? colors.orange[800] : colors.gray[100]};
  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? colors.orange[800] : colors.gray[200]};
    transition: 0.35s ease-in-out;
  }
`;
