import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { DownloadIcon } from '@entry/ui';
import { useGetDetailNotice } from '../apis';
import { useEffect, useState } from 'react';

interface NoticeDetail {
  id: string;
  type: string;
  title: string;
  createdAt: string;
  content: string;
  attachments?: Array<{ name: string; url: string }>;
  imageURL: string,
  imageName: string,
  isPinned: false,
}

export const NoticeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [noticeDetail, setNoticeDetail] = useState<NoticeDetail>({
    id: id || '',
    type: '',
    title: '',
    createdAt: '',
    content:'',
    imageURL: '',
    imageName: '',
    isPinned: false,
    attachments: [],
  });

  const { data, isLoading, error } = useGetDetailNotice(id);

  useEffect(() => {
    if (data) {
      setNoticeDetail(data);
    }
  }, [data]);
  
  const handleBackToList = () => {
    navigate('/notice');
  };

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <PageContainer>
        <ContentWrapper>
          <div>로딩 중...</div>
        </ContentWrapper>
      </PageContainer>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <PageContainer>
        <ContentWrapper>
          <div>데이터를 불러오는데 실패했습니다.</div>
        </ContentWrapper>
      </PageContainer>
    );
  }

  // noticeDetail이 없거나 필수 데이터가 없을 때 처리
  if (!noticeDetail || !noticeDetail.type) {
    return (
      <PageContainer>
        <ContentWrapper>
          <div>공지사항을 찾을 수 없습니다.</div>
        </ContentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <CategoryText>{noticeDetail.type === "NOTICE" ? "입학 공지사항" : "예비 신입생 안내"}</CategoryText>

        <TitleSection>
          <Title>{noticeDetail.title}</Title>
          <DateText>{noticeDetail.createdAt}</DateText>
        </TitleSection>

        <ContentSection>
          <ContentText>
            {noticeDetail.content?.split('\n\n').map((paragraph, index) => (
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
          <BackButton onClick={handleBackToList}>목록으로</BackButton>
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

const CategoryText = styled.p`
  font-size: 14px;
  color: ${colors.gray[400]};
  margin: 0 0 8px 0;
`;

const TitleSection = styled.div`
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${colors.gray[200]};
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: inherit;
`;

const DateText = styled.p`
  font-size: 16px;
  color: ${colors.gray[400]};
  margin: 0;
`;

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
  background-color: ${colors.orange[800]};
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