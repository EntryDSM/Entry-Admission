import styled from '@emotion/styled';
import { ErrorMsgContainer } from './ErrorMsgContainer';

interface IPageType {
  isAdmin?: boolean;
}

export const Page404 = ({ isAdmin }: IPageType) => {
  return (
    <PageContainer>
      <ErrorMsgContainer
        isAdmin={isAdmin}
        errorMsg="존재하지 않는 페이지입니다."
        errorTitle={404}
        errorSubTitle="Not Found"
      />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
