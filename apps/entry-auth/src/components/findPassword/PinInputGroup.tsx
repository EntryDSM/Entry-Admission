import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

interface IPinInputGroupType {
  length?: number;
  onComplete?: (code: string) => void;
  error?: string;
  onErrorClear: () => void;
}

export const PinInputGroup = ({
  length = 8,
  onComplete,
  error,
  onErrorClear,
}: IPinInputGroupType) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const [localError, setLocalError] = useState<string>('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // sms코드 입력값 유효성 검사
  const handleChange = (index: number, value: string) => {
    if (!/^[a-zA-Z0-9]?$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value.toUpperCase();
    setValues(newValues);
    setLocalError('');

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newValues.every((v) => v !== '') && onComplete) {
      onComplete(newValues.join(''));
    }

    // 입력 중일 때만 에러 메세지 초기화 (입력이 완성되지 않은 상태)
    if (onErrorClear && !newValues.every((v) => v !== '')) {
      onErrorClear();
    }
  };

  // 백스페이스 클릭 시 이전 인덱스로 이동하며 삭제
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const currentError = error || localError;

  return (
    <Container>
      <InputContainer>
        {values.map((value, index) => (
          <Input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            hasError={!!currentError}
          />
        ))}
      </InputContainer>
      {currentError && <ErrorMessage>{currentError}</ErrorMessage>}
    </Container>
  );
};

const ErrorMessage = styled.div`
  font-size: 14px;
  color: ${colors.extra.error};
  margin-top: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
`;

const InputContainer = styled.div`
  margin-top: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1%;
`;

const Input = styled.input<{ hasError: boolean }>`
  width: 3rem;
  height: 4rem;
  text-align: center;
  font-size: 1.5rem;
  border: 2px solid
    ${(props) => (props.hasError ? colors.extra.error : colors.gray[300])};
  border-radius: 0.5rem;
  outline: none;

  &:focus {
    border-color: ${(props) =>
      props.hasError ? colors.extra.error : colors.orange[800]};
  }

  @media (max-width: 1065px) {
    width: 2.6rem;
    height: 4rem;
  }
`;
