import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { AuthInput } from '@entry/ui';
import { colors } from '@entry/design-token';
import { useNavigate } from 'react-router-dom';
import { EntryAuthTitle } from '../components';
import { getPassVerifyInfo } from '../apis';

export const UserInfoPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoadingPassData, setIsLoadingPassData] = useState(true);
  const [checkedToken, setCheckedToken] = useState(false);

  useEffect(() => {
    if (checkedToken) return; // 이미 체크했으면 다시 실행하지 않음

    const loadPassData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const mdlToken =
        urlParams.get('mdl_tkn') || localStorage.getItem('mdlToken');

      if (!mdlToken) {
        navigate('/signup');
        return;
      }

      localStorage.setItem('mdlToken', mdlToken);

      try {
        const passData = await getPassVerifyInfo(mdlToken);
        setName(passData.name);
        setPhoneNumber(passData.phoneNumber);

        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('mdl_tkn');
        window.history.replaceState({}, '', newUrl.toString());
      } catch (error) {
        console.error(error);
        navigate('/signup');
        return;
      }

      setIsLoadingPassData(false);
      setCheckedToken(true);
    };

    loadPassData();
  }, [navigate, checkedToken]);

  useEffect(() => {
    const isNameValid = name.length > 0;
    const isPhoneValid = phoneNumber.replace(/[^\d]/g, '').length >= 10;
    const isPasswordValid =
      password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isPasswordCheckValid = password === passwordCheck;
    setIsFormValid(
      isNameValid && isPhoneValid && isPasswordValid && isPasswordCheckValid
    );
  }, [name, phoneNumber, password, passwordCheck]);

  const handleSignUp = async () => {
    if (!isFormValid) return;

    console.log({
      name,
      phoneNumber: phoneNumber.replace(/[^\d]/g, ''),
      password,
      isParent: JSON.parse(localStorage.getItem('isParent') || 'false'),
    });

    setIsCompleted(true);
  };

  const handleCompleted = () => {
    if (isCompleted) {
      navigate("/");
    }
  };

  if (isLoadingPassData) {
    return (
      <BackGroundWrapper>
        <PageContainer>
          <EntryAuthTitle isAdmin={false} children="EntryDSM 회원가입" />
          <LoadingContainer>
            <div>PASS 인증 정보를 확인하는 중...</div>
          </LoadingContainer>
        </PageContainer>
      </BackGroundWrapper>
    );
  }

  return (
    <BackGroundWrapper>
      <PageContainer>
        <EntryAuthTitle isAdmin={false} children="EntryDSM 회원가입" />

        {isCompleted ? (
          <CompletedContainer>
            <Title>회원가입이 완료되었습니다!</Title>
            <Description>확인 버튼을 눌러 서비스를 이용해보세요!</Description>
            <SubmitButton onClick={handleCompleted}>확인</SubmitButton>
          </CompletedContainer>
        ) : (
          <FormContainer>
            <AuthInput
              label="이름"
              placeholder="이름을 입력해 주세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <AuthInput
              label="전화번호"
              placeholder="010-XXXX-XXXX"
              type="phone"
              value={phoneNumber}
              onChange={(e) => {
                const onlyNumber = e.target.value.replace(/[^\d]/g, '');
                let formatted = '';
                if (onlyNumber.length < 4) formatted = onlyNumber;
                else if (onlyNumber.length < 8)
                  formatted = `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(
                    3
                  )}`;
                else
                  formatted = `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(
                    3,
                    7
                  )}-${onlyNumber.slice(7, 11)}`;
                setPhoneNumber(formatted);
              }}
            />
            <AuthInput
              label="비밀번호"
              placeholder="8자 이상, 특수문자 포함"
              type="password"
              isEye
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <AuthInput
              label="비밀번호 확인"
              placeholder="비밀번호 확인"
              type="password"
              isEye
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <SignUpButton $disabled={!isFormValid} onClick={handleSignUp}>
              회원가입
            </SignUpButton>
            <BackToSignUpButton onClick={() => navigate('/signup')}>
              이전 단계로
            </BackToSignUpButton>
          </FormContainer>
        )}
      </PageContainer>
    </BackGroundWrapper>
  );
};

const BackGroundWrapper = styled.div`
  background-color: ${colors.gray[50]};
  padding-top: 35px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  min-height: calc(100vh - 70px);
`;

const PageContainer = styled.div`
  width: 50%;
  min-width: 400px;
  max-width: 600px;
  background-color: ${colors.extra.realWhite};
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  margin-bottom: 30px;
  padding: 0 40px 40px 40px;

  @media (max-width: 768px) {
    width: 90%;
    padding: 0 20px 20px 20px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: ${colors.gray[500]};
  font-size: 16px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  width: 100%;
  align-items: center;
  margin-top: 40px;
`;

const CompletedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 130px;
  width: 100%;
  text-align: center;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 12px;
  background-color: ${colors.orange[800]};
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: 550;
  margin-top: 100px;

  &:hover {
    background-color: ${colors.orange[850]};
  }
`;

const SignUpButton = styled.button<{ $disabled: boolean }>`
  width: 100%;
  height: 45px;
  border-radius: 12px;
  background-color: ${colors.orange[800]};
  opacity: ${(props) => (props.$disabled ? 0.4 : 1)};
  color: white;
  font-weight: 550;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  font-size: 15px;
  margin-top: 20px;

  &:hover {
    background-color: ${(props) =>
      props.$disabled ? colors.orange[800] : colors.orange[850]};
  }
`;

const BackToSignUpButton = styled.button`
  background: none;
  border: none;
  color: ${colors.gray[400]};
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
  margin-top: 10px;

  &:hover {
    color: ${colors.gray[500]};
  }
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 550;
  color: ${colors.orange[800]};
`;

const Description = styled.div`
  font-size: 18px;
  color: ${colors.gray[500]};
`;
