import { ChangeEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { colors } from '@entry/design-token';
import { Eye } from './assets';

interface IAuthInputType {
  label?: string;
  placeholder: string;
  isEye?: boolean;
  type?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  isError?: boolean;
  errorMessage?: string;
  height?: string;
  value?: string;
}

export const AuthInput = ({
  label,
  placeholder,
  isEye,
  type = 'text',
  onChange,
  maxLength,
  isError = false,
  errorMessage,
  height = '70px',
  value,
}: IAuthInputType) => {
  const [inputValue, setInputValue] = useState<string>(value || '');
  const [isClose, setIsClose] = useState<boolean>(true);
  const [showEye, setShowEye] = useState<boolean>(false);

  // 입력된 값이 하나 이상일 경우에만 eye아이콘 표시
  useEffect(() => {
    if (isEye && inputValue.length > 0) {
      setShowEye(true);
    } else {
      setShowEye(false);
    }
  }, [isEye, inputValue]);

  const changeInputType = () => {
    if (type === 'password' && !isClose) {
      return 'text';
    }
    return type;
  };

  // 각 타입에 따른 input의 onChange 이벤트 처리
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (type === 'phone') {
      const number = newValue.replace(/[^\d]/g, '');

      if (number.length <= 3) {
        newValue = number;
      } else if (number.length <= 7) {
        newValue = `${number.slice(0, 3)} - ${number.slice(3)}`;
      } else {
        newValue = `${number.slice(0, 3)} - ${number.slice(
          3,
          7
        )} - ${number.slice(7, 11)}`;
      }
    }

    setInputValue(newValue);

    if (onChange) {
      const mockEvent = {
        ...e,
        target: {
          ...e.target,
          value: newValue,
        },
      };
      onChange(mockEvent as ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <AuthInputContainer label={label} height={height}>
      <Label>{label}</Label>
      <InputWrapper>
        <Input
          $isError={isError}
          value={value}
          type={changeInputType()}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={handleInputChange}
        />
        {showEye && (
          <EyeWrapper onClick={() => setIsClose(!isClose)}>
            <Eye isClose={isClose} />
          </EyeWrapper>
        )}
      </InputWrapper>
      {isError && <ErrorMsg>{errorMessage}</ErrorMsg>}
    </AuthInputContainer>
  );
};

const ErrorMsg = styled.div`
  margin-top: 6px;
  font-size: 11px;
  color: ${colors.extra.error};
`;

const EyeWrapper = styled.div`
  position: absolute;
  right: 15px;
  top: 60%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const Input = styled.input<{ $isError: boolean }>`
  width: 100%;
  border: 1px solid
    ${({ $isError }) => ($isError ? colors.extra.error : colors.gray[300])};
  border-radius: 8px;
  padding: 15px 20px;
  transition: all 0.3s ease;

  ::placeholder {
    color: ${colors.gray[300]};
    font-weight: 400;
  }
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: 550;
  /* margin-bottom: 6px; */
`;

const AuthInputContainer = styled.div<Pick<IAuthInputType, 'height' | 'label'>>`
  width: 100%;
  height: ${({ height }) => height};
  display: flex;
  flex-direction: column;
  gap: ${({ label }) => (label ? 6 : 0)}px;
`;
