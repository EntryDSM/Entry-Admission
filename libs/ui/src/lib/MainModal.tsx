import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { EntryLogo } from './assets';

interface IModalType {
  isAdmin?: boolean;
  title: string;
  children?: React.ReactNode;
}

export const MainModal = ({ isAdmin, title, children }: IModalType) => {
  return (
    <Modal>
      <ContentContainer>
        <TitleContainer>
          <EntryLogo isAdmin={isAdmin} />
          <Title>{title}</Title>
        </TitleContainer>
      </ContentContainer>
      {children}
    </Modal>
  );
};

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Modal = styled.div`
  position: relative;
  padding: 32px;
  width: 525px;
  height: 253px;
  border-radius: 20px;
  background-color: ${colors.gray[50]};
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
