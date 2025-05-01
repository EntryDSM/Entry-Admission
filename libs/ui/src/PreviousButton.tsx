import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import React from 'react';

interface PreviousButtonProps {
  onClick?: () => void;
}

export const PreviousButton: React.FC<PreviousButtonProps> = ({ onClick }) => {
  return <StyledButton onClick={onClick}>이전</StyledButton>;
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  color: ${colors.orange[800]};
  background-color: transparent;
  border: 2px solid ${colors.orange[800]};
  border-radius: 12px;
  padding: 10px 32px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

export default PreviousButton;
