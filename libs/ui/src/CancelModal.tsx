import styled from '@emotion/styled';
import { colors, Flex, Text } from '@entry/design-token';
import { PreviousButton } from './PreviousButton';
import { useRef } from 'react';

interface IModalType {
  title: string;
  content: string;
  btnText: string;
  onClick: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen?: boolean;
}

export const CancelModal = ({
  title,
  content,
  btnText,
  onClick,
  setIsOpen,
  isOpen,
}: IModalType) => {
  const backRef = useRef(null);

  const backClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (backRef.current === e.target) setIsOpen(false);
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
          <Flex gap={16} width="fit-content" height="fit-content">
            <PreviousButton
              backgroundColor={colors.extra.realWhite}
              color={colors.gray[500]}
              borderColor={colors.gray[300]}
              hoverBackgroundColor="none"
              onClick={() => setIsOpen(false)}
            >
              이전
            </PreviousButton>
            <PreviousButton
              backgroundColor={colors.extra.error}
              hoverBackgroundColor="none"
              onClick={onClick}
            >
              {btnText}
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
  gap: 80px;
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
