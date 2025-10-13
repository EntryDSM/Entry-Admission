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
      // 숫자와 '-'만 허용
      const filteredInput = input.replace(/[^0-9-]/g, '');
      const onlyNums = filteredInput.replace(/[^0-9]/g, '');
      processedValue = filteredInput;

      // 9~11자리 번호 기준
      if (onlyNums.startsWith('02')) {
        // 02 지역번호 (2자리) - 총 9~10자리
        if (onlyNums.length === 9) {
          processedValue = onlyNums.replace(/^(02)(\d{3})(\d{4})$/, '$1-$2-$3');
        } else if (onlyNums.length === 10) {
          processedValue = onlyNums.replace(/^(02)(\d{4})(\d{4})$/, '$1-$2-$3');
        }
      } else {
        // 그 외 3자리 지역번호 or 휴대폰
        if (onlyNums.length === 10) {
          // 000-000-0000 형식 (070 등)
          processedValue = onlyNums.replace(/^(0\d{2})(\d{3})(\d{4})$/, '$1-$2-$3');
        } else if (onlyNums.length === 11) {
          // 000-0000-0000 형식 (010 등)
          processedValue = onlyNums.replace(/^(0\d{2})(\d{4})(\d{4})$/, '$1-$2-$3');
        } else {
          processedValue = onlyNums; // 중간 입력 시 숫자만
        }
      }
    } else if (type === 'number') {
      // 숫자만 허용
      processedValue = input.replace(/[^0-9]/g, '');
    } else if (type === 'text') {
      // 문자만 허용 (한글, 영어, 공백)
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
      type="text"
      inputMode={type === 'phone' || type === 'number' ? 'numeric' : 'text'}
      maxLength={type === 'phone' ? 13 : undefined}
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
  pointer-events: ${({ isBlocked }) => (isBlocked ? 'none' : 'auto')};

  &::placeholder {
    color: ${colors.gray[300]};
    font-size: 16px;
  }
`;
