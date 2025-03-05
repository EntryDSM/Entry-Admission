import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { EntryLogo, CancelIcon } from './assets';

interface IModalType {
  isAdmin?: boolean;
  title: string;
  content?: string;
  children?: React.ReactNode;
  cancelClick?: () => void;
}

export const ModalContainer = ({
  isAdmin,
  title,
  content,
  children,
  cancelClick,
}: IModalType) => {
  return (
    <Modal>
      <ContentContainer>
        <TitleContainer>
          <EntryLogo isAdmin={isAdmin} />
          <Title>{title}</Title>
        </TitleContainer>
        <CancelContainer>
          <CancelIcon onClick={cancelClick} />
        </CancelContainer>
        <Content>{content}</Content>
      </ContentContainer>
      {children}
    </Modal>
  );
};

const CancelContainer = styled.div`
  position: absolute;
  top: 27px;
  right: 32px;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Content = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.gray[600]};
`;

const Modal = styled.div`
  position: relative;
  padding: 24px 32px;
  border-radius: 20px;
  background-color: ${colors.gray[50]};
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.gray[900]};
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
