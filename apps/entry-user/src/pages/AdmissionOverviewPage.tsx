import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { DownloadIcon } from '@entry/ui';
import ADMISSION_OVERVIEW from '../assets/ADMISSION_OVERVIEW.svg';

export const AdmissionOverviewPage = () => {
  return (
    <PageContainer>
      <Title>신입생 전형 요강</Title>
      <SubTitle>2025학년도 신입생 전형 일정</SubTitle>
      <TableContainer>
        <TableImage src={ADMISSION_OVERVIEW} alt="2025학년도 신입생 전형 일정표" />
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
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: white;
  position: relative;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  color: inherit;
  position: absolute;
  top: 44px;
  left: 190px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.orange[800]};
  margin: 0;
  position: absolute;
  top: 221px;
  left: calc(50% - 521.5px);
`;

const TableContainer = styled.div`
  position: absolute;
  top: 261px;
  left: 50%;
  transform: translateX(-50%);
`;

const TableImage = styled.img`
  width: 1043px;
  height: 370px;
`;

const AttachmentSection = styled.div`
  position: absolute;
  top: 671px;
  left: 50%;
  transform: translateX(-50%);
  width: 1043px;
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
  color: ${colors.gray[600]};
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
  color: ${colors.gray[700]};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;
