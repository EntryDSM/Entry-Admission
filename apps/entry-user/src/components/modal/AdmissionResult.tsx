import styled from '@emotion/styled';
import { colors, Flex } from '@entry/design-token';
import { Button, MainModal } from '@entry/ui';
import { useRef } from 'react';

interface IAdmissionType {
  congratulatoryMsg: string;
  admissionStatus: string;
  setIsShow?: React.Dispatch<React.SetStateAction<boolean>>; //다른 페이지에서 버튼 클릭 시 창 열림 백그라운드 클릭 시 창 닫힘 설정
  isShow?: boolean;
}

export const AdmissionResult = ({
  admissionStatus,
  congratulatoryMsg,
  setIsShow,
  isShow,
}: IAdmissionType) => {
  const backRef = useRef();

  const backClick = (e: MouseEvent) => {
    if (backRef.current === e.target) setIsShow(false);
  };

  const noClick = () => {
    setIsShow(false);
  };

  return (
    isShow && (
      <ModalBack onClick={backClick} ref={backRef}>
        <MainModal title={'1차 전형 결과 확인'}>
          <Flex isColumn={true} alignItems="center" gap={24}>
            <Flex isColumn={true} alignItems="center" height="auto">
              <ContentMsg>{congratulatoryMsg}</ContentMsg>
              <ContentMsg>
                대덕소프트웨어마이스터고등학교 입학 1차 전형에&nbsp;
              </ContentMsg>
              <ContentMsg isSpan={true}>
                <ContentMsg isSpan={true} isMain={true}>
                  {admissionStatus}
                </ContentMsg>
                하셨습니다
              </ContentMsg>
            </Flex>
            <Button width={'134px'} onClick={noClick}>
              뒤로가기
            </Button>
          </Flex>
        </MainModal>
      </ModalBack>
    )
  );
};

const ModalBack = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #00000027;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 11;
`;

const ContentMsg = styled.div<{ isSpan: boolean; isMain: boolean }>`
  font-size: 16px;
  display: flex;
  flex-direction: ${({ isSpan }) => (isSpan ? 'row' : 'column')};
  color: ${({ isMain }) => (isMain ? colors.orange[600] : colors.gray[800])};
  font-weight: ${({ isMain }) => (isMain ? 600 : 500)};
`;
