import styled from '@emotion/styled';
import { colors, Flex } from '@entry/design-token';
import { DownloadIcon } from '@entry/ui';
import ADMISSION_OVERVIEW from '../assets/ADMISSION_OVERVIEW.svg';

export const AdmissionOverviewPage = () => {
  return (
    <PageContainer>
      <Flex width='100%' height='fit-content' isColumn gap={32}>
        <Flex width='fit-content' height='fit-content' isColumn gap={12}>
          <Title>신입생 전형 요강</Title>
          <SubTitle>2025학년도 신입생 전형 일정</SubTitle>
        </Flex>
        <TableContainer>
          <TableImage
            src={ADMISSION_OVERVIEW}
            alt="2025학년도 신입생 전형 일정표"
          />
        </TableContainer>
      <AttachmentSection>
        <AttachmentTable>
          <AttachmentRow>
            <AttachmentTitle>첨부 파일</AttachmentTitle>
            <AttachmentContent>
              <AttachmentLink href="#" download>
                2025학년도 신입생 전형 요강.pdf
              </AttachmentLink>
              <DownloadIcon />
            </AttachmentContent>
          </AttachmentRow>
        </AttachmentTable>
      </AttachmentSection>
      </Flex>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  background-color: white;
  padding: 70px 100px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  color: inherit;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.orange[800]};
`;

const TableContainer = styled.div`
  width: 100%;
`;

const TableImage = styled.img`
  width: 100%;
`;

const AttachmentSection = styled.div`
  width: 100%;
`;

const AttachmentTable = styled.div`
  width: 100%;
  border-top: 1px solid ${colors.gray[200]};
`;

const AttachmentRow = styled.div`
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid ${colors.gray[200]};
  background-color: white;
`;

const AttachmentTitle = styled.div`
  width: 150px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.gray[500]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AttachmentContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding-left: 20px;
  gap: 8px;
`;

const AttachmentLink = styled.a`
  font-size: 14px;
  color: ${colors.gray[500]};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
