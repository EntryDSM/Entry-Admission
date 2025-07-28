import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { Cancel } from '../index';

interface IGradeType {
  grade?: string;
  isCancel?: boolean;
  isSelected: boolean;
  onSelect?: () => void;
  width?: string;
  height?: string;
  fontSize?: string;
  gap?: string;
}

export const Grade = ({
  grade,
  isCancel,
  isSelected,
  onSelect,
  width,
  height,
  fontSize,
}: IGradeType) => {
  return (
    <GradeContainer
      $width={width || '45px'}
      $height={height || '45px'}
      $fontSize={fontSize || '22px'}
      onClick={onSelect}
      $isClick={isSelected}
    >
      {isCancel ? <Cancel isClicked={isSelected} /> : grade}
    </GradeContainer>
  );
};

const GradeContainer = styled.div<{
  $isClick?: boolean;
  $width: string;
  $height: string;
  $fontSize: string;
}>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  color: ${(props) =>
    props.$isClick ? colors.extra.realWhite : colors.orange[800]};
  background-color: ${(props) =>
    props.$isClick ? colors.orange[800] : 'none'};
  border: 2px solid ${colors.orange[800]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.$fontSize};
  font-weight: 450;
  transition: all 0.2s ease;
`;
