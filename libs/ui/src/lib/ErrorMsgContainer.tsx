import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

interface IErrorType {
  errorTitle: number;
  errorSubTitle: string;
  errorMsg: string;
  isAdmin?: boolean;
}

export const ErrorMsgContainer = ({
  errorMsg,
  errorTitle,
  errorSubTitle,
  isAdmin,
}: IErrorType) => {
  return (
    <ErrorContainer>
      <ErrorTitleContainer>
        <ErrorTitle isAdmin={isAdmin}>{errorTitle}</ErrorTitle>
        <ErrorSubTitle>{errorSubTitle}</ErrorSubTitle>
      </ErrorTitleContainer>
      <ErrorMsg>{errorMsg}</ErrorMsg>
      <HomeBtn isAdmin={isAdmin}>홈으로 돌아가기</HomeBtn>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const ErrorTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const ErrorTitle = styled.div<{ isAdmin: boolean }>`
  font-size: 32px;
  font-weight: 700;
  color: ${({ isAdmin }) => (isAdmin ? colors.green[500] : colors.orange[500])};
`;

const ErrorSubTitle = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${colors.gray[900]};
`;

const ErrorMsg = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${colors.gray[600]};
`;

const HomeBtn = styled.button<{ isAdmin: boolean }>`
  padding: 8px 12px;
  border-radius: 5px;
  background-color: ${({ isAdmin }) =>
    isAdmin ? colors.green[500] : colors.orange[500]};
  color: ${colors.extra.white};
  font-size: 16px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  cursor: pointer;
`;
