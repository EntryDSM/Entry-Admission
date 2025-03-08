import styled from '@emotion/styled';
import { colors, Flex } from '@entry/design-token';
import { Button, MainModal } from '@entry/ui';
import { useRef } from 'react';

interface ICanceledType {
  setIsShow?: React.Dispatch<React.SetStateAction<boolean>>; //다른 페이지에서 버튼 클릭 시 창 열림 백그라운드 클릭 시 창 닫힘 설정
  isShow?: boolean;
}

export const SubmissionCanceled = ({ setIsShow, isShow }: ICanceledType) => {
  const backRef = useRef();

  const backClick = (e: MouseEvent) => {
    if (backRef.current === e.target) setIsShow(false);
  };

  const noClick = () => {
    setIsShow(false);
  };

  const cancelClick = () => {
    setIsShow(false);
    //취소 api
  };
  return (
    isShow && (
      <ModalBack onClick={backClick} ref={backRef}>
        <MainModal title={'원서 제출 취소하기'}>
          <Flex isColumn={true} alignItems="center" gap={24}>
            <Flex isColumn={true} alignItems="center" height="auto" gap={8}>
              <ErrorMsg>정말 원서 제출을 취소하시겠습니까?</ErrorMsg>
              <ContentMsg>
                원서 제출 취소시 기존에 있던 원서는 복구가 되지 않습니다{' '}
              </ContentMsg>
              <ContentMsg isSpan={true}>그래도 취소 하시겠습니까?</ContentMsg>
            </Flex>
            <Flex gap={12} width="auto">
              <Button width={'217px'} onClick={cancelClick}>
                원서 제출 취소 하기
              </Button>
              <Button width={'134px'} onClick={noClick}>
                뒤로가기
              </Button>
            </Flex>
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

const ErrorMsg = styled.div`
  font-size: 20px;
  color: ${colors.extra.error};
`;
