import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { useNavigate } from 'react-router-dom';
import { noticeIcon, downloadIcon, noticeMoveArrowIcon } from '../../assets';
import { useGetAllNotice } from '../../apis';
import { useEffect, useState } from 'react';

interface NoticeItem {
  id: number;
  title: string;
  createdAt: string;
  isPinned: boolean;
  type: 'GUIDE' | 'NOTICE'
}


export const InfoSection = () => {
  const navigate = useNavigate();

  const mainNotice = {
    icon: noticeIcon,
    title: '신입생 전형 요강 PDF 파일 다운로드',
    hasDownload: true,
  };

  const {data, isLoading} = useGetAllNotice('NOTICE');
  const [noticeItems, setNoticeItems] = useState<NoticeItem[]>([]);

  const formatDate = (dateString: string) => {
      return dateString.split('T')[0]; 
    };
  
  useEffect(() => {
      if (data && Array.isArray(data?.notices)) {
      const formattedNotices = data.notices.map(notice => ({
        ...notice,
        createdAt: formatDate(notice.createdAt)
      }));
      setNoticeItems(formattedNotices);
    }
    }, [data]);


  // const notices = [
  //   {
  //     title: '기숙사 탈출하면 벌점 몇 점인지에 대해',
  //     date: '2024.03.21',
  //     badge: 'NEW',
  //   },
  //   {
  //     title: '입학 공지지사항에 대해서',
  //     date: '2024.03.21',
  //   },
  //   {
  //     title: '지후의 디자인 건',
  //     date: '2024.03.21',
  //   },
  //   {
  //     title: '입학 안내사항 파일 다운로드',
  //     date: '2024.03.21',
  //   },
  // ];

  return (
    <Container>
      <ContentWrapper>
        <Title>
          <HighlightText>지금은</HighlightText>
        </Title>
        <SubTitle>최종 발표 기간입니다.</SubTitle>
        <Divider />

        <SectionHeader>
          <SectionTitle>입학 공지사항</SectionTitle>
          <MoreButton onClick={() => navigate('/notice')}>이동하기</MoreButton>
        </SectionHeader>

        <NoticeContainer>
          <MainNoticeCard>
            <NoticeContent>
              <NoticeIconImg src={mainNotice.icon} alt="공지 아이콘" />
              <MainNoticeTitle>{mainNotice.title}</MainNoticeTitle>
            </NoticeContent>
            <DownloadIcon src={downloadIcon} alt="다운로드" />
          </MainNoticeCard>
          {noticeItems.map((notice, index) => (
            <NoticeItem key={index} onClick={() => navigate(`/notice/${notice.id}`)}>
              <NoticeContent>
                <NoticeInfo>
                  <NoticeTitle>
                    {notice.title}
                    {/* {notice.badge && <BadgeHot>{notice.badge}</BadgeHot>} */}
                  </NoticeTitle>
                  {notice.createdAt && <NoticeDate>{notice.createdAt}</NoticeDate>}
                </NoticeInfo>
              </NoticeContent>
              <ArrowIcon src={noticeMoveArrowIcon} alt="이동" />
            </NoticeItem>
          ))}
        </NoticeContainer>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 80px 0 100px 0;

  @media (max-width: 768px) {
    padding: 60px 0 80px 0;
  }

  @media (max-width: 480px) {
    padding: 40px 0 60px 0;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 100px;

  @media (max-width: 1200px) {
    padding: 0 80px;
  }

  @media (max-width: 768px) {
    padding: 0 40px;
  }

  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: ${colors.gray[500]};
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 30px;
  }

  @media (max-width: 480px) {
    font-size: 26px;
  }
`;

const SubTitle = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: ${colors.gray[500]};
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 30px;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    font-size: 26px;
    margin-bottom: 25px;
  }
`;

const HighlightText = styled.span`
  color: ${colors.orange[800]};
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background: ${colors.orange[800]};
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-bottom: 60px;
  }

  @media (max-width: 480px) {
    margin-bottom: 40px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 550;
  color: #333;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  color: ${colors.orange[800]};
  background-color: #fff2ea;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 550;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: #f5e9e2;
  }
`;

const NoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const MainNoticeCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 13px;
  background: #fff5f0;
  border-radius: 8px;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    padding: 5px 11px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    padding: 4px 9px;
    margin-bottom: 18px;
  }
`;

const NoticeItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 13px;
  margin-bottom: 8px;
  border: 2px solid ${colors.gray[100]};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${colors.gray[200]};
    background-color: ${colors.gray[50]};
  }

  @media (max-width: 768px) {
    padding: 18px 0;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    padding: 16px 0;
    margin-bottom: 14px;
  }
`;

const NoticeContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const NoticeIconImg = styled.img`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
`;

const MainNoticeTitle = styled.div`
  font-size: 15px;
  color: ${colors.gray[500]};
  font-weight: 500;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const NoticeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

const NoticeTitle = styled.div`
  font-size: 17px;
  color: ${colors.gray[500]};
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const NoticeDate = styled.div`
  font-size: 12px;
  color: #999;

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const BadgeHot = styled.span`
  background: ${colors.orange[800]};
  color: white;
  padding: 2px 7px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
`;

const DownloadIcon = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    opacity: 0.7;
  }
`;

const ArrowIcon = styled.img`
  width: 12px;
  height: 12px;
  flex-shrink: 0;
  margin-right: 5px;
`;
