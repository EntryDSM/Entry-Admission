import { colors } from '@entry/design-token';
import styled from '@emotion/styled';

interface IInputType {
  width?: string;
  readonly?: boolean;
  placeholder?: string;
  value?: string | null | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputContent = ({
  width,
  value,
  placeholder,
  onChange,
}: IInputType) => (
  <InputContainer
    width={width}
    value={value ?? undefined}
    onChange={onChange}
    placeholder={placeholder}
  />
);

const InputContainer = styled.input<{ isBlocked?: boolean; width?: string }>`
  width: ${({ width }) => (width ? width : '100%')};
  height: 40px;
  border-radius: 6px;
  border: 1px solid ${colors.gray[300]};
  padding: 10px 0 10px 12px;
  background-color: ${colors.extra.realWhite};
  color: ${colors.gray[500]};
  font-size: 16px;
  opacity: ${({ isBlocked }) => (isBlocked ? 0.4 : 1)};
  pointer-events: ${({ isBlocked }) => (isBlocked ? 'none' : 'cursor')};
  &::placeholder {
    color: ${colors.gray[300]};
    font-size: 16px;
  }
`;
