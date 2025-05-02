import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { AuthInput } from '@entry/ui';
import { EntryAuthTitle } from '../components';
import { useEffect, useState } from 'react';

export const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    const isPhoneValid = phoneNumber.replace(/[^\d]/g, '').length >= 10;
    const isPasswordValid =
      password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setIsFormValid(isPhoneValid && isPasswordValid);
  }, [phoneNumber, password]);

  const handleLogin = () => {
    if (isFormValid) {
      console.log('로그인 start', phoneNumber, password);
    } else {
      console.log('유효성 검사 실패');
    }
  };

  return (
    <BackGroundWrapper>
      <LoginPageContainer>
        <EntryAuthTitle children="EntryDSM 로그인" />
        <InputWrapper>
          <AuthInput
            type="phone"
            label="전화번호"
            placeholder="010-xxxx-xxxx"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <AuthInput
            label="비밀번호"
            placeholder="8자 이상, 숫자, 특수문자를 포함해 비밀번호를 입력해 주세요."
            type="password"
            isEye={true}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputWrapper>
        <LoginButton onClick={handleLogin} $disabled={!isFormValid}>
          로그인
        </LoginButton>
        <LoginKindContainer>
          <div style={{ cursor: 'pointer' }}>회원가입</div>
          <AuthLink>비밀번호 찾기</AuthLink>
          <div style={{ cursor: 'pointer' }}>관리자 로그인</div>
        </LoginKindContainer>
      </LoginPageContainer>
    </BackGroundWrapper>
  );
};

const AuthLink = styled.div`
  width: 130px;
  display: flex;
  justify-content: center;
  border-inline: 2px solid ${colors.gray[100]};
  cursor: pointer;
`;

const LoginKindContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  color: ${colors.gray[300]};
  margin-top: 22px;

  div:hover {
    color: ${colors.gray[400]};
    transition: all 0.3s ease-out;
  }
`;

const LoginButton = styled.button<{ $disabled: boolean }>`
  width: 360px;
  height: 48px;
  background-color: ${(props) =>
    props.$disabled ? colors.gray[300] : colors.orange[800]};
  color: ${colors.extra.realWhite};
  margin-top: 20%;
  border-radius: 12px;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  font-size: 15px;
  font-weight: 550;
  transition: all 0.4s ease;

  &:hover {
    background-color: ${(props) =>
      props.$disabled ? colors.gray[300] : colors.orange[850]};
    color: ${colors.gray[100]};
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 55px;
  gap: 22px;
  width: 55%;
  min-width: 360px;
`;

const BackGroundWrapper = styled.div`
  background-color: ${colors.gray[50]};
  padding-top: 55px;
  padding-bottom: 55px;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
`;

const LoginPageContainer = styled.div`
  width: 45%;
  min-width: 400px;
  height: 650px;
  background-color: ${colors.extra.realWhite};
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`;
