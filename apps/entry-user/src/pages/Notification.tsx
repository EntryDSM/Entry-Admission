import styled from '@emotion/styled';
import { Flex } from '@entry/design-token';
import { AdmissionsGuidePdf, NoticePost, Title } from '@entry/ui';
import { useState } from 'react';

export const Notification = () => {
  const [datas, setDatas] = useState<
    [{ title: string; date: string; isNew: boolean }]
  >([
    {
      title: '기숙사 탈출하면 벌점 몇 점인지에 대해',
      date: '2024.03.21',
      isNew: true,
    },
    {
      title: '기숙사 탈출하면 벌점 몇 점인지에 대해',
      date: '2024.03.21',
    },
    {
      title: '기숙사 탈출하면 벌점 몇 점인지에 대해',
      date: '2024.03.21',
    },
    {
      title: '기숙사 탈출하면 벌점 몇 점인지에 대해',
      date: '2024.03.21',
    },
  ]);
  return (
    <Container>
      <Flex gap={20} isColumn={true} alignItems="center">
        <Flex gap={40} isColumn={true} alignItems="center">
          <Title>공지사항</Title>
          <Flex gap={16} isColumn={true} alignItems="end">
            <div>검색바</div>
            <Flex gap={12} isColumn={true} alignItems="center">
              <AdmissionsGuidePdf title="신입생 전형 요강 PDF 파일 다운로드" />
              {datas.map((data, index) => (
                <NoticePost
                  key={index}
                  isNew={data.isNew}
                  title={data.title}
                  date={data.date}
                />
              ))}
            </Flex>
          </Flex>
          <div>순서바</div>
        </Flex>
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  padding: 50px 100px 60px 100px;
`;
