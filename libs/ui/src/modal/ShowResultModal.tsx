import styled from '@emotion/styled';
import { modalCancel } from '../assets';
import { colors } from '@entry/design-token';

interface IShowResultModalType {
  isOpen: boolean;
  onClose: () => void;
  step: number; // 1차인지 2차인지
  isPass: boolean; // 합격 여부
}

export const ShowResultModal = ({
  isOpen,
  onClose,
  step,
  isPass,
}: IShowResultModalType) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <img src={modalCancel} alt="close" />
        </CloseButton>

        <Content>
          <Title>{step}차 전형 결과 안내</Title>
          <ContentLine></ContentLine>
          <Message>
            {isPass ? '축하드립니다.' : '아쉽게도'}
            <br />
            대덕소프트웨어마이스터고등학교
            <br />
            입학 {step}차 시험에
            <Highlight isPass={isPass}>
              {isPass ? ' 합격' : ' 불합격'}
            </Highlight>
            하셨습니다.
          </Message>
        </Content>
      </ModalContainer>
    </Overlay>
  );
};

const ContentLine = styled.div`
  width: 70%;
  height: 1px;
  background-color: ${colors.gray[300]};
  margin-bottom: 20px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 75px 45px 85px 45px;
  width: 320px;
  max-width: 90vw;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  img {
    width: 16px;
    height: 16px;
    object-fit: contain;
  }
`;

const Content = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 20px 0 20px 0;
  color: black;
  line-height: 1.3;
`;

const Message = styled.p`
  color: #343434;
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
`;

const Highlight = styled.span<{ isPass: boolean }>`
  color: ${(props) => (props.isPass ? '#f97316' : '#ef4444')};
  font-weight: 600;
`;
