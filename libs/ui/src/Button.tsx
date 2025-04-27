import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

interface IBtnType {
  width?: string;
  color?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: string;
  backgroundColor?: string;
  borderColor?: string;
  hoverBackgroundColor?: string;
  isBlocked?: boolean;
}

export const MainButton = ({
  width = 'fit-content',
  color = colors.extra.realWhite,
  backgroundColor = colors.orange[800],
  borderColor = 'transparent',
  hoverBackgroundColor = colors.orange[850],
  children,
  onClick,
  isBlocked = false,
}: IBtnType) => {
  return (
    <MainBtnContainer
      hoverBackgroundColor={hoverBackgroundColor}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      width={width}
      color={color}
      onClick={onClick}
      isBlocked={isBlocked}
    >
      {children}
    </MainBtnContainer>
  );
};

export const SubButton = ({
  width = 'fit-content',
  color = colors.extra.realWhite,
  backgroundColor = colors.orange[800],
  borderColor = 'transparent',
  hoverBackgroundColor = colors.orange[850],
  children,
  onClick,
  isBlocked = false,
}: IBtnType) => {
  return (
    <BtnContainer
      hoverBackgroundColor={hoverBackgroundColor}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      width={width}
      color={color}
      onClick={onClick}
      isBlocked={isBlocked}
    >
      {children}
    </BtnContainer>
  );
};

const MainBtnContainer = styled.button<Omit<IBtnType, 'onClick' | 'children'>>`
  opacity: ${({ isBlocked }) => (isBlocked ? 0.5 : 1)};
  pointer-events: ${({ isBlocked }) => (isBlocked ? 'none' : 'cursor')};
  width: ${({ width }) => width};
  padding: 24px 48px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: ${({ color }) => color};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 1px solid ${({ borderColor }) => borderColor};
  cursor: pointer;
  &:hover {
    background-color: ${({ hoverBackgroundColor }) => hoverBackgroundColor};
    transition: 0.35s ease-in-out;
  }
`;

const BtnContainer = styled.button<Omit<IBtnType, 'onClick' | 'children'>>`
  opacity: ${({ isBlocked }) => (isBlocked ? 0.5 : 1)};
  pointer-events: ${({ isBlocked }) => (isBlocked ? 'none' : 'cursor')};
  width: ${({ width }) => width};
  padding: 24px 48px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: ${({ color }) => color};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 1px solid ${({ borderColor }) => borderColor};
  cursor: pointer;
  &:hover {
    background-color: ${({ hoverBackgroundColor }) => hoverBackgroundColor};
    transition: 0.35s ease-in-out;
  }
`;
