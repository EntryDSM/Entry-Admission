import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { Download, NotificationIcon } from './assets';

interface IAdmissionsType {
  title: string;
}

export const AdmissionsGuidePdf = ({ title }: IAdmissionsType) => {
  return (
    <Container>
      <TitleContainer>
        <NotificationIcon />
        <Title>{title}</Title>
      </TitleContainer>
      <Download />
    </Container>
  );
};

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Title = styled.div`
  font-size: 16px;
  color: ${colors.gray[800]};
`;
const Container = styled.div`
  border-radius: 12px;
  width: 100%;
  padding: 0 16px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.orange[50]};
`;
