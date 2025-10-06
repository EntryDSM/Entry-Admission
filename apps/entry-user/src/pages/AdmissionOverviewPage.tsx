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
              <AttachmentLink href="https://entrydsm.kr/2026%ED%95%99%EB%85%84%EB%8F%84%20%EB%8C%80%EB%8D%95%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4%EB%A7%88%EC%9D%B4%EC%8A%A4%ED%84%B0%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90%20%EC%8B%A0%EC%9E%85%EC%83%9D%20%EC%9E%85%ED%95%99%EC%A0%84%ED%98%95%EC%9A%94%EA%B0%95.pdf" download>
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
  min-height: calc(100vh + 200px);
  background-color: white;
  position: relative;
  padding-bottom: 150px;
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
