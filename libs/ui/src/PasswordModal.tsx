import styled from '@emotion/styled';
import { colors, Flex, Text } from '@entry/design-token';
import { PreviousButton } from './PreviousButton';
import { useRef, useState } from 'react';

interface IPasswordModalType {
  title: string;
  content: string;
  btnText: string;
  onConfirm: (password: string) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen?: boolean;
  isLoading?: boolean;
}

export const PasswordModal = ({
  title,
  content,
  btnText,
  onConfirm,
  setIsOpen,
  isOpen,
  isLoading = false,
}: IPasswordModalType) => {
  const backRef = useRef(null);
  const [password, setPassword] = useState('');

  const backClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (backRef.current === e.target) setIsOpen(false);
  };

  const handleConfirm = () => {
    if (password.trim()) {
      onConfirm(password);
    }
  };

  const handleClose = () => {
    setPassword('');
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
              {title}
            </Text>
            <Text fontSize={20} fontWeight={400} color={colors.gray[400]}>
              {content}
            </Text>
          </Flex>

          <PasswordInputContainer>
            <PasswordLabel>비밀번호</PasswordLabel>
            <PasswordInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              disabled={isLoading}
            />
          </PasswordInputContainer>

          <Flex gap={16} width="fit-content" height="fit-content">
            <PreviousButton
              backgroundColor={colors.extra.realWhite}
              color={colors.gray[500]}
              borderColor={colors.gray[300]}
              hoverBackgroundColor="none"
              onClick={handleClose}
              disabled={isLoading}
            >
              취소
            </PreviousButton>
            <PreviousButton
              backgroundColor={colors.extra.error}
              hoverBackgroundColor="none"
              onClick={handleConfirm}
              disabled={isLoading || !password.trim()}
            >
              {isLoading ? '처리 중...' : btnText}
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

const PasswordInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 320px;
`;

const PasswordLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.gray[700]};
`;

const PasswordInput = styled.input`
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