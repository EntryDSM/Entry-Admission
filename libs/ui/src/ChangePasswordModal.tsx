import styled from '@emotion/styled';
import { colors, Flex, Text } from '@entry/design-token';
import { PreviousButton } from './PreviousButton';
import { useRef, useState } from 'react';

interface IChangePasswordModalType {
  isOpen?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: (phoneNumber: string, newPassword: string) => void;
  isLoading?: boolean;
  userPhoneNumber?: string;
  passVerifiedPhoneNumber?: string;
}

export const ChangePasswordModal = ({
  isOpen,
  setIsOpen,
  onConfirm,
  isLoading = false,
  userPhoneNumber = '',
  passVerifiedPhoneNumber = '',
}: IChangePasswordModalType) => {
  const backRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState(passVerifiedPhoneNumber || userPhoneNumber);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const backClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (backRef.current === e.target) setIsOpen(false);
  };

  const handleConfirm = () => {
    if (!phoneNumber.trim()) {
      alert('전화번호를 입력해주세요.');
      return;
    }
    if (!newPassword.trim()) {
      alert('새 비밀번호를 입력해주세요.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    onConfirm(phoneNumber, newPassword);
  };

  const handleClose = () => {
    setPhoneNumber(passVerifiedPhoneNumber || userPhoneNumber);
    setNewPassword('');
    setConfirmPassword('');
    setIsOpen(false);
  };

  return (
    isOpen && (
      <Back ref={backRef} onClick={backClick}>
        <Modal>
          <Flex
            width="fit-content"
            height="fit-content"
            isColumn={true}
            gap={16}
            alignItems="center"
          >
            <Text fontSize={28} fontWeight={700}>
              비밀번호 변경
            </Text>
            <Text fontSize={20} fontWeight={400} color={colors.gray[400]}>
              새로운 비밀번호를 설정해주세요.
            </Text>
          </Flex>

          <InputContainer>
            <InputGroup>
              <InputLabel>전화번호</InputLabel>
              <Input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="전화번호를 입력하세요"
                disabled={isLoading || !!passVerifiedPhoneNumber}
              />
            </InputGroup>

            <InputGroup>
              <InputLabel>새 비밀번호</InputLabel>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새 비밀번호를 입력하세요"
                disabled={isLoading}
              />
            </InputGroup>

            <InputGroup>
              <InputLabel>비밀번호 확인</InputLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호를 다시 입력하세요"
                disabled={isLoading}
              />
            </InputGroup>
          </InputContainer>

          <Flex gap={16} width="fit-content" height="fit-content">
            <PreviousButton
              backgroundColor={colors.extra.realWhite}
              color={colors.gray[500]}
              borderColor={colors.gray[300]}
              hoverBackgroundColor="none"
              onClick={handleClose}
            >
              취소
            </PreviousButton>
            <PreviousButton
              backgroundColor={colors.orange[500]}
              hoverBackgroundColor="none"
              onClick={handleConfirm}
            >
              {isLoading ? '변경 중...' : '비밀번호 변경'}
            </PreviousButton>
          </Flex>
        </Modal>
      </Back>
    )
  );
};

const Modal = styled.div`
  padding: 44px 60px;
  border-radius: 24px;
  background-color: ${colors.extra.realWhite};
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
`;

const Back = styled.div`
  z-index: 120;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.2);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 350px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.gray[500]};
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid ${colors.gray[300]};
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${colors.orange[500]};
  }

  &:disabled {
    background-color: ${colors.gray[100]};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${colors.gray[400]};
  }
`;