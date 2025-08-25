import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { AuthInput } from '@entry/ui';
import { colors } from '@entry/design-token';
import { useNavigate } from 'react-router-dom';

export const UserInfoInput = () => {
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false); // inputs 유효성 상태 관리
  const [isCompleted, setIsCompleted] = useState<boolean>(false); // 회원가입 완료 여부
  const [nameError, setNameError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passowrdCheckError, setPassowrdCheckError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);

    setNameError(!(value.length >= 0));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 숫자만 추출
    const onlyNumber = value.replace(/[^\d]/g, '');

    // 000-0000-0000 포뱃팅
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

  const handlePasswordCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPasswordCheck(value);

    setPassowrdCheckError(value !== password);
  };

  useEffect(() => {
    // 이름 유효성 검사
    const isName = name.length >= 0;

    // 전화번호 유효성 검사
    const isPhoneValid = phoneNumber.replace(/[^\d]/g, '').length >= 10;

    // 비밀번호 유효성 검사
    const isPasswordValid =
      password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isPasswordCheckValid = password === passwordCheck;

    setIsFormValid(
      isName && isPhoneValid && isPasswordValid && isPasswordCheckValid
    );
  }, [name, phoneNumber, password, passwordCheck]);

  // 회원가입 로직 함수
  const handleSignUp = () => {
    if (isFormValid) {
      try {
        console.log('회원가입 start', name, phoneNumber, password);
        // 회원가입 api 호출
        setIsCompleted(true);
        console.log('회원가입 완료!');
      } catch (error) {
        console.error('회원가입 중 오류 발생', error);
        // 오류 처리 로직
      }
    } else {
      console.log('회원가입 유효성 검사 실패');
    }
  };

  const handleCompleted = () => {
    if (isCompleted) {
      navigate('/');
    } else {
      alert('회원가입 중 오류 발생');
    }
  };

  return (
    <UserInfoInputConatiner>
      {isCompleted ? (
        <CompletedContainer>
          <Title>회원가입이 완료되었습니다!</Title>
          <Description>확인 버튼을 눌러 로그인 해주세요!</Description>
          <SubmitButton onClick={handleCompleted}>확인</SubmitButton>
        </CompletedContainer>
      ) : (
        <SignUpContainer>
          <AuthInput
            label="이름"
            placeholder="이름을 입력해 주세요."
            onChange={handleNameChange}
            isError={!!nameError}
            errorMessage="올바른 형식이 아닙니다."
          />
          <AuthInput
            label="전화번호"
            placeholder="010-XXXX-XXXX"
            value={phoneNumber}
            type="phone"
            onChange={handlePhoneChange}
            isError={!!phoneError}
            errorMessage="올바른 형식이 아닙니다."
          />
          <AuthInput
            label="비밀번호"
            placeholder="8자 이상, 숫자, 특수문자를 포함해 비밀번호를 입력해 주세요."
            isEye={true}
            type="password"
            onChange={handlePasswordChange}
            isError={!!passwordError}
            errorMessage="비밀번호 형식이 올바르지 않습니다."
          />
          <AuthInput
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해 주세요."
            isEye={true}
            type="password"
            onChange={handlePasswordCheckChange}
            isError={!!passowrdCheckError}
            errorMessage="비밀번호가 일치하지 않습니다."
          />
          <SignUpButton $disabled={!isFormValid} onClick={handleSignUp}>
            회원가입
          </SignUpButton>
          <MoveLoginView onClick={() => navigate('/')}>로그인</MoveLoginView>
        </SignUpContainer>
      )}
    </UserInfoInputConatiner>
  );
};

const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 12px;
  background-color: ${colors.orange[800]};
  color: ${colors.extra.realWhite};
  font-size: 14px;
  font-weight: 550;
  margin-top: 200px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${colors.orange[850]};
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

const CompletedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 130px;
  width: 100%;
  text-align: center;
  word-break: keep-all;
`;

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
  margin-top: 30px;
  width: 100%;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const MoveLoginView = styled.div`
  font-size: 15px;
  cursor: pointer;
  color: ${colors.gray[300]};
  transition: all 0.3s ease;

  &:hover {
    color: ${colors.gray[400]};
  }
`;

const SignUpButton = styled.button<{ $disabled: boolean }>`
  width: 100%;
  height: 50px;
  border-radius: 12px;
  background-color: ${colors.orange[800]};
  opacity: ${(props) => (props.$disabled ? '0.4' : '1')};
  color: ${colors.extra.realWhite};
  font-size: 14px;
  font-weight: 550;
  margin-top: 22px;
  transition: all 0.3s ease;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${colors.orange[850]};
  }
`;

const UserInfoInputConatiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;

  @media (max-width: 768px) {
    width: 80%;
  }
`;
