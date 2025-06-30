import { colors } from '@entry/design-token';
import styled from '@emotion/styled';
import React from 'react';

interface IInputType {
  width?: string;
  readonly?: boolean;
  placeholder?: string;
  value?: string | null | number;
  type?: 'phone' | 'number' | 'text';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputContent = ({
  width,
  value,
  placeholder,
  onChange,
  type,
  readonly = false,
}: IInputType) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    let processedValue = input;

    if (type === 'phone') {
      processedValue = input
        .replace(/[^0-9]/g, '') // 숫자만
        .replace(/(^01[016789])(\d{3,4})(\d{4})$/, '$1-$2-$3'); // 하이픈 자동 삽입
    } else if (type === 'number') {
      processedValue = input.replace(/[^0-9]/g, '');
    } else if (type === 'text') {
      processedValue = input.replace(/[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\s]/g, '');
    }

    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: processedValue,
      },
    };

    onChange?.(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <InputContainer
      width={width}
      value={value ?? ''}
      onChange={handleChange}
      placeholder={placeholder}
      readOnly={readonly}
    />
  );
};

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
