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

export const Button = ({
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

const BtnContainer = styled.button<Omit<IBtnType, 'onClick' | 'children'>>`
  width: ${({width}) => width};
  height: 48px;
  min-width: 83px;
  opacity: ${({ isBlocked }) => (isBlocked ? 0.5 : 1)};
  pointer-events: ${({ isBlocked }) => (isBlocked ? 'none' : 'cursor')};
  padding: 12px 24px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: ${({ color }) => color};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 2px solid ${({ borderColor }) => borderColor};
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background-color: ${({ hoverBackgroundColor }) => hoverBackgroundColor};
    transition: 0.35s ease-in-out;
  }
`;