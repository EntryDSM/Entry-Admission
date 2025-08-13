import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { AuthInput } from '@entry/ui';
import { colors } from '@entry/design-token';

interface IPhoneInputType {
  onNext: () => void;
}

export const PhoneInput = ({ onNext }: IPhoneInputType) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(true);

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

  useEffect(() => {
    const isPhoneValid = phoneNumber.replace(/[^\d]/g, '').length >= 10;
    setIsFormValid(isPhoneValid);
  }, [phoneNumber]);

  // const sendSMS = () => {
  //   // 성공적으로 코드 발송했다고 가정
  //   setIsSending(true);
  // };

  const handleNext = () => {
    if (isFormValid && isSending) {
      onNext();
    }
  };

  return (
    <PhoneInputContainer>
      <AuthInput
        onChange={handlePhoneChange}
        type="phone"
        label="전화번호"
        placeholder="인증번호를 받을 전화번호를 입력해주세요."
        value={phoneNumber}
        isError={!!phoneError}
        errorMessage="올바른 형식이 아닙니다."
      />
      <NextButton onClick={handleNext} $disabled={!isFormValid}>
        다음
      </NextButton>
    </PhoneInputContainer>
  );
};

const NextButton = styled.button<{ $disabled: boolean }>`
  width: 100%;
  height: 48px;
  background-color: ${colors.orange[800]};
  opacity: ${(props) => (props.$disabled ? '0.4' : '1')};
  color: ${colors.extra.realWhite};
  margin-top: 180px;
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

const PhoneInputContainer = styled.div`
  width: 45%;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1065px) {
    width: 70%;
  }
`;
