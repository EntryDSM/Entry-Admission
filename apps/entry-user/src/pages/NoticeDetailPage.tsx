import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors, Text } from '@entry/design-token';
import { MainButton, DownloadIcon } from '@entry/ui';

interface NoticeDetail {
  id: number;
  category: string;
  title: string;
  date: string;
  content: string;
  attachments?: Array<{ name: string; url: string }>;
}

export const NoticeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const noticeDetail: NoticeDetail = {
    id: Number(id),
    category: "입학 공지사항",
    title: "2025학년도 신입생 오리엔테이션 안내",
    date: "2025-10-31",
    content: `안녕하세요?

2025학년도 신입생 오리엔테이션를 다음과 같이 실시합니다.

13시부터 입학 도착하는 순서로 교복 치수 측정 및 사진 촬영을 하여 오리엔테이션 시작 전에 완료할 예정입니다.

오리엔테이션 시작: 2024. 11. 16. (토) 14시

장소: 본교 창의관(중등) 1층 새롬홀. 오리엔테이션 진행은 90분 내외로 상황에 따라 탄력적으로 운영될 수 있습니다.

다음은 참석자(학생 및 보호자) 협조 사항입니다.

1. 학생증 및 학교생활기록부에 등록할 사진을 촬영하니 단정한 두발 상태가 필요합니다.

  (교복업체에서 제공하는 컬러 상의를 입고 촬영할 예정임)

2. 학생은 설문조사 및 기록을 위해 필기구를 준비하기 바랍니다.

3. 신입생 오리엔테이션 참석 시 제출서류(첨부파일 참고)

- 건강검진 결과지: 직접 제출하는 경우, 제출 시 학번 기재

- CMS 출금이체 동의서(양면 출력) 또는 수익자 부담경비 신용카드 자동납부 신청서 (양면 출력) 중 택 1, 문의: 행정실 042-866-8886

- (해당자만 제출) 법정자격 대상자 교육비 납부 유예 관련 법정자격 증명서

문의: 행정실 042-866-888`,
    attachments: [
      { name: "2025학년도 신입생 전형 요강.pdf", url: "#" },
      { name: "2025학년도 신입생 전형 요강.pdf", url: "#" }
    ]
  };

  const handleBackToList = () => {
    navigate('/notice');
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <CategoryText fontSize={14} color={colors.gray[400]}>
          {noticeDetail.category}
        </CategoryText>
        
        <TitleSection>
          <Title fontSize={28} fontWeight={700}>
            {noticeDetail.title}
          </Title>
          <DateText fontSize={16} color={colors.gray[400]}>
            {noticeDetail.date}
          </DateText>
        </TitleSection>

        <ContentSection>
          <ContentText>
            {noticeDetail.content.split('\n\n').map((paragraph, index) => (
              <Paragraph key={index}>
                {paragraph.split('\n').map((line, lineIndex) => (
                  <span key={lineIndex}>
                    {line}
                    {lineIndex < paragraph.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </Paragraph>
            ))}
          </ContentText>
        </ContentSection>

        {noticeDetail.attachments && noticeDetail.attachments.length > 0 && (
          <AttachmentsSection>
            <AttachmentTitle>첨부 파일</AttachmentTitle>
            <AttachmentList>
              {noticeDetail.attachments.map((file, index) => (
                <AttachmentItem key={index}>
                  <AttachmentName>첨부 파일 | {file.name}</AttachmentName>
                  <DownloadButton>
                    <DownloadIcon />
                  </DownloadButton>
                </AttachmentItem>
              ))}
            </AttachmentList>
          </AttachmentsSection>
        )}

        <ButtonSection>
          <BackButton onClick={handleBackToList}>
            목록으로
          </BackButton>
        </ButtonSection>
      </ContentWrapper>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  padding: 40px 0;
`;

const ContentWrapper = styled.div`
  width: 1200px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
`;

const CategoryText = styled(Text)`
  margin-bottom: 8px;
`;

const TitleSection = styled.div`
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${colors.gray[200]};
`;

const Title = styled(Text)`
  margin-bottom: 12px;
`;

const DateText = styled(Text)``;

const ContentSection = styled.div`
  margin-bottom: 40px;
`;

const ContentText = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: ${colors.gray[500]};
`;

const Paragraph = styled.div`
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const AttachmentsSection = styled.div`
  margin-bottom: 40px;
`;

const AttachmentTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.gray[500]};
  margin-bottom: 16px;
`;

const AttachmentList = styled.div`
  border-top: 1px solid ${colors.gray[300]};
`;

const AttachmentItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid ${colors.gray[200]};
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 8px;

  &:hover {
    background-color: ${colors.gray[50]};
  }
`;

const AttachmentName = styled.span`
  font-size: 14px;
  color: ${colors.gray[600]};
`;

const DownloadButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const BackButton = styled.button`
  padding: 12px 24px;
  background-color: ${colors.orange[500]};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    background-color: ${colors.orange[600]};
  }
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: flex-start;
`;
