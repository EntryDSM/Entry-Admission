import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import React from 'react';

interface IPreviousButtonType {
  width?: string;
  color?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: string;
  backgroundColor?: string;
  borderColor?: string;
  hoverBackgroundColor?: string;
  isBlocked?: boolean;
}

export const PreviousButton: React.FC<IPreviousButtonType> = ({
  width = 'fit-content',
  color = colors.extra.realWhite,
  backgroundColor = colors.orange[800],
  borderColor = 'transparent',
  hoverBackgroundColor = colors.orange[850],
  children,
  onClick,
  isBlocked = false,
}) => {
  return (
    <StyledButton
      hoverBackgroundColor={hoverBackgroundColor}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      width={width}
      color={color}
      onClick={onClick}
      isBlocked={isBlocked}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<
  Omit<IPreviousButtonType, 'onClick' | 'children'>
>`
  opacity: ${({ isBlocked }) => (isBlocked ? 0.5 : 1)};
  pointer-events: ${({ isBlocked }) => (isBlocked ? 'none' : 'cursor')};
  width: ${({ width }) => width};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  color: ${({ color }) => color};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 2px solid ${({ borderColor }) => borderColor};
  border-radius: 12px;
  padding: 12px 24px;
  cursor: pointer;
  &:hover {
    background-color: ${({ hoverBackgroundColor }) => hoverBackgroundColor};
    transition: 0.35s ease-in-out;
  }
`;
