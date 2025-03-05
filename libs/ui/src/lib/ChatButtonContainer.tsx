import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { chatIcon, videoIcon } from './assets';

interface IChatBtnType {
  chatClick: () => void;
  videoClick: () => void;
}

export const ChatButtonContainer = ({
  chatClick,
  videoClick,
}: IChatBtnType) => {
  return (
    <>
      <BtnAllContainer>
        <BtnContainer onClick={chatClick}>
          <img src={chatIcon} alt="chatIcon" />
        </BtnContainer>
        <BtnContainer onClick={videoClick}>
          <img src={videoIcon} alt="videoIcon" />
        </BtnContainer>
      </BtnAllContainer>
    </>
  );
};

const BtnAllContainer = styled.div`
  position: fixed;
  z-index: 5;
  right: 32px;
  bottom: 32px;
  gap: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BtnContainer = styled.button`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  background-color: ${colors.gray[50]};
  display: flex;
  justify-content: center;
  align-items: center;
`;
