import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

interface IButtonType {
  children: string;
  width?: string;
  backgroundColor?: string;
  color?: string;
  backgroundHoverColor?: string;
}

export const Button = ({
  children,
  width = '100%',
  backgroundColor = colors.orange[500],
  color = colors.gray[50],
  backgroundHoverColor = colors.orange[600],
}: IButtonType) => {
  return (
    <BtnContainer
      width={width}
      backgroundColor={backgroundColor}
      color={color}
      backgroundHoverColor={backgroundHoverColor}
    >
      {children}
    </BtnContainer>
  );
};

const BtnContainer = styled.button<Omit<IButtonType, 'children'>>`
  width: ${({ width }) => width};
  height: 54px;
  border-radius: 8px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ color }) => color};
  font-size: 20px;
  font-weight: 600;
  &:hover {
    background-color: ${({ backgroundHoverColor }) => backgroundHoverColor};
  }
`;
