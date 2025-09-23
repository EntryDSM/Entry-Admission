import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { AuthInput } from '@entry/ui';
import { EntryAuthTitle } from '../components';
import { useUserLogin } from '../hooks/useLogin';

export const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 숫자만 추출
    const onlyNumber = value.replace(/[^\d]/g, '');

    // 000-0000-0000 포맷팅
    let formattedNumber = '';

    if (onlyNumber.length < 4) {
      formattedNumber = onlyNumber;
    } else if (onlyNumber.length < 8) {
      formattedNumber = `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(3)}`;
    } else {
      formattedNumber = `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(
        3,
        7
      )}-${onlyNumber.slice(7, 11)}`;
    }

    setPhoneNumber(formattedNumber);

    setPhoneError(onlyNumber.length < 10);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    setPasswordError(value.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(value));
  };

  useEffect(() => {
    const isPhoneValid = phoneNumber.replace(/[^\d]/g, '').length >= 10;
    const isPasswordValid =
      password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setIsFormValid(isPhoneValid && isPasswordValid);
  }, [phoneNumber, password]);

  const loginMutation = useUserLogin();

  const handleLogin = () => {
    if (!isFormValid) return;

    loginMutation.mutate(
      {
        phoneNumber: phoneNumber.replace(/[^\d]/g, ''),
        password,
      },
      {
        onSuccess: (data) => {
          // 페이지 이동 추가
          navigate('/');
        },
      }
    );
  };

  return (
    <BackGroundWrapper>
      <LoginPageContainer>
        <EntryAuthTitle children="EntryDSM 로그인" isAdmin={false} />
        <InputWrapper>
          <AuthInput
            type="phone"
            label="전화번호"
            value={phoneNumber}
            placeholder="010-XXXX-XXXX"
            onChange={handlePhoneChange}
            isError={!!phoneError}
            errorMessage="올바른 형식이 아닙니다."
          />
          <AuthInput
            label="비밀번호"
            placeholder="8자 이상, 숫자, 특수문자를 포함해 비밀번호를 입력해 주세요."
            type="password"
            isEye={true}
            onChange={handlePasswordChange}
            isError={!!passwordError}
            errorMessage="비밀번호 형식이 올바르지 않습니다."
          />
        </InputWrapper>
        <LoginButton
          onClick={handleLogin}
          $disabled={!isFormValid || loginMutation.isPending}
        >
          로그인
        </LoginButton>
        <LoginKindContainer>
          <div
            onClick={() => navigate('/signup')}
            style={{ cursor: 'pointer' }}
          >
            회원가입
          </div>
          <AuthLink onClick={() => navigate('/find-password')}>
            비밀번호 찾기
          </AuthLink>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/admin-login')}
          >
            관리자 로그인
          </div>
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
  background-color: ${colors.orange[800]};
  opacity: ${(props) => (props.$disabled ? '0.4' : '1')};
  color: ${colors.extra.realWhite};
  margin-top: 20%;
  border-radius: 12px;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  font-size: 15px;
  font-weight: 550;
  transition: all 0.4s ease;

  &:hover {
    background-color: ${colors.orange[850]};
    color: ${colors.gray[100]};
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 55px;
  gap: 40px;
  width: 55%;
  min-width: 360px;
`;

const BackGroundWrapper = styled.div`
  background-color: ${colors.gray[50]};
  padding-top: 35px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  height: calc(100vh - 70px);
`;

const LoginPageContainer = styled.div`
  padding: 0 100px;
  background-color: ${colors.extra.realWhite};
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  margin-bottom: 30px;
`;
