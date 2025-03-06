import { useState, ChangeEvent, InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { EyesIcon } from './assets/icons/EyesIcon';

interface IInputType extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type: 'text' | 'password' | 'tel';
  width?: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  errorMessage?: string;
}

export const Input = ({
  placeholder,
  type = 'text',
  width = '100%',
  value,
  onChange,
  isError = false,
  errorMessage = '비밀번호가 일치하지 않습니다.',
}: IInputType) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const inputType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type;

  const clickPassword = () => {
    setShowPassword(!showPassword);
  };

  //전화번호 포맷팅
  const handlePhoneInput = () => {};

  return (
    <InputContainer>
      <RelativeWrapper>
        <InputWrapper width={width}>
          <InputField
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            isError={isError}
          />
          {type === 'password' && (
            <IconWrapper>
              <EyesIcon isOpen={showPassword} onClick={clickPassword} />
            </IconWrapper>
          )}
        </InputWrapper>
        {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </RelativeWrapper>
    </InputContainer>
  );
};

const RelativeWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ErrorMessage = styled.p`
  color: red;
  position: absolute;
  font-size: 15px;
  margin-top: 4px;
  margin-left: 190px;
`;

const InputWrapper = styled.div<{ width: string }>`
  position: relative;
  width: ${({ width }) => width};
`;

const InputField = styled.input<{ isError?: boolean }>`
  width: 100%;
  height: 44px;
  border-radius: 8px;
  padding-left: 12px;
  font-size: 15px;
  border: 1px solid ${(props) => (props.isError ? 'red' : colors.gray[400])};

  &:focus {
    outline: none;
  }

  &[type='tel'] {
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;
