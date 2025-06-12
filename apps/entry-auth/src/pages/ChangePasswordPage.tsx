import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { AuthInput } from '@entry/ui';
import { EntryAuthTitle } from '../components';

export const ChangePasswordPage = () => {
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordCheckError, setPasswordCheckError] = useState<boolean>(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    setPasswordError(value.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(value));
  };

  const handlePasswordCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPasswordCheck(value);

    setPasswordCheckError(value !== password);
  };

  useEffect(() => {
    const isPasswordValid =
      password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isPasswordCheckValid = password === passwordCheck;

    setIsFormValid(isPasswordValid && isPasswordCheckValid);
  }, [password, passwordCheck]);

  return (
    <BackGroundWrapper>
      <ChangePasswordContainer>
        <EntryAuthTitle children="EntryDSM 비밀번호 변경" />
        <InputsWrapper>
          <AuthInput
            type="password"
            isEye={true}
            label="비밀번호"
            placeholder="변경할 비밀번호를 입력해주세요."
            onChange={handlePasswordChange}
            isError={!!passwordError}
            errorMessage="비밀번호 형식이 올바르지 않습니다."
          />
          <AuthInput
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요."
            onChange={handlePasswordCheckChange}
            isError={!!passwordCheckError}
            errorMessage="비밀번호가 일치하지 않습니다."
            isEye={true}
          />
          <CheckButton $disabled={!isFormValid}>확인</CheckButton>
        </InputsWrapper>
      </ChangePasswordContainer>
    </BackGroundWrapper>
  );
};

const CheckButton = styled.button<{ $disabled: boolean }>`
  width: 100%;
  height: 50px;
  border-radius: 12px;
  background-color: ${colors.orange[800]};
  opacity: ${(props) => (props.$disabled ? '0.4' : '1')};
  color: ${colors.extra.realWhite};
  font-size: 14px;
  font-weight: 550;
  margin-top: 180px;
  transition: all 0.3s ease;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${colors.orange[850]};
  }
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin-top: 58px;
  gap: 22px;

  @media (max-width: 1065px) {
    width: 70%;
  }
`;

const ChangePasswordContainer = styled.div`
  width: 45%;
  height: 80%;
  min-width: 400px;
  background-color: ${colors.extra.realWhite};
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  margin-bottom: 30px;
  padding-bottom: 20px;
`;

const BackGroundWrapper = styled.div`
  background-color: ${colors.gray[50]};
  padding-top: 35px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  min-height: 100vh;
  width: 100%;
`;
