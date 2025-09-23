import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { AuthInput } from '@entry/ui';
import { EntryAuthTitle } from '../components';
import { useAdminLogin } from '../hooks/useAdminLogin';

export const AdminLogin = () => {
  const [adminId, setAdminId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [adminIdError, setAdminIdError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleAdminIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAdminId(value);
    setAdminIdError(value.length < 1);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    const passwordRegex = /^(?=.*\d).{8,}$/;
    setPasswordError(!passwordRegex.test(value));
  };

  useEffect(() => {
    const isAdminIdValid = adminId.length > 0;
    const passwordRegex = /^(?=.*\d).{8,}$/;

    const isPasswordValid = passwordRegex.test(password);

    setIsFormValid(isAdminIdValid && isPasswordValid);
  }, [adminId, password]);

  const adminLoginMutation = useAdminLogin();

  const handleLogin = () => {
    if (isFormValid) {
      console.log('관리자 로그인 start', adminId, password);
      adminLoginMutation.mutate({
        adminId: adminId,
        password: password,
      });
    } else {
      console.log('유효성 검사 실패');
    }
  };

  return (
    <BackGroundWrapper>
      <LoginPageContainer>
        <EntryAuthTitle children="EntryDSM 로그인" isAdmin={true} />
        <InputWrapper>
          <AuthInput
            type="text"
            label="아이디"
            placeholder="아이디를 입력해주세요"
            value={adminId}
            onChange={handleAdminIdChange}
            isError={!!adminIdError}
            errorMessage="아이디를 입력해주세요."
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
          $disabled={!isFormValid || adminLoginMutation.isPending}
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
          <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            유저 로그인
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
  background-color: ${colors.green[500]};
  opacity: ${(props) => (props.$disabled ? '0.4' : '1')};
  color: ${colors.extra.realWhite};
  margin-top: 20%;
  border-radius: 12px;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  font-size: 15px;
  font-weight: 550;
  transition: all 0.4s ease;

  &:hover {
    background-color: ${colors.green[600]};
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
