import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { chatIcon, videoIcon } from './assets';
import { useState } from 'react';

interface IChatBtnType {
  chatClick: () => void;
  videoClick: () => void;
}

export const ChatButtonContainer = ({
  chatClick,
  videoClick,
}: IChatBtnType) => {
  const [isHoverChat, setIsHoverChat] = useState<boolean>(false);
  const [isHoverVideo, setIsHoverVideo] = useState<boolean>(false);

  return (
    <>
      <BtnAllContainer>
        <MsgContainer>
          <HoverMsg $isHover={isHoverChat}>
            <MsgContent>
              더 궁금한 점이 있다면
              <MsgMainContent>챗봇</MsgMainContent>
              에게물어봐요
            </MsgContent>
          </HoverMsg>
          <BtnContainer
            onClick={chatClick}
            onMouseEnter={() => setIsHoverChat(true)}
            onMouseLeave={() => setIsHoverChat(false)}
          >
            <img src={chatIcon} alt="chatIcon" />
          </BtnContainer>
        </MsgContainer>
        <MsgContainer>
          <HoverMsg $isHover={isHoverVideo}>
            <MsgContent>
              원서접수 하는 방법
              <MsgMainContent>시연영상</MsgMainContent>
              보러가기
            </MsgContent>
          </HoverMsg>
          <BtnContainer
            onClick={videoClick}
            onMouseEnter={() => setIsHoverVideo(true)}
            onMouseLeave={() => setIsHoverVideo(false)}
          >
            <img src={videoIcon} alt="videoIcon" />
          </BtnContainer>
        </MsgContainer>
      </BtnAllContainer>
    </>
  );
};

const MsgContent = styled.span`
  font-size: 16px;
  color: ${colors.gray[800]};
`;

const MsgMainContent = styled(MsgContent)`
  color: ${colors.orange[600]};
`;

const MsgContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  position: relative;
`;

const HoverMsg = styled.div<{ $isHover: boolean }>`
  opacity: ${({ $isHover }) => ($isHover ? 1 : 0)};
  border-radius: 12px;
  background-color: ${colors.gray[50]};
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.07);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  transition: opacity 0.4s ease-in-out;
`;

const BtnAllContainer = styled.div`
  position: fixed;
  z-index: 5;
  right: 32px;
  bottom: 32px;
  gap: 24px;
  display: flex;
  flex-direction: column;
  align-items: end;
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
