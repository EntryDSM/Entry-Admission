import styled from '@emotion/styled';
import { colors, Flex } from '@entry/design-token';
import { Button, NoticePost, PDFDownloader, Title } from '@entry/ui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotificationView = () => {
  const navigate = useNavigate();
  const [datas, setDatas] = useState<{
    title: string;
    date: string;
    content: string;
    download: Array<{
      fileName: string;
      fileUrl: File;
    }>;
    recentNotices: Array<{ title: string; date: string }>;
  }>({
    title: '기숙사 탈출하면 벌점 몇 점인지에 대해',
    date: '2024.03.21',
    content:
      '공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용공지 내용',
    download: [
      {
        fileName: 'ssssss',
        fileUrl:
          'data:image/png;base64,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',
      },
      {
        fileName: 'aaa',
        fileUrl:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAAkFBMVEX4+PizCwD///+xAAD7//+yAADu3t2uAADGbGr++/q6Mi24HxjZm5nKbmvKbGry5eT89fXFXVrkv7717u2+REHNfHrLc3HhtrTAS0jVlJLShoTx2djapKLDV1Pdr63NeHbrysnIZWLfq6m7ODTlvLrUjYu4Ix7CU1C5LCjy29m1FA/u0dD56+q+PzzqyMi4KCP2AcmQAAAHZUlEQVR4nO2da1fqOhCGbSdxNoptoZSWq1xEBRX//787uRVQWrQt4DrJvF+2iw2s1YdJZjKZTG5uSCQSiUQikUgkEolEIpFIJBKJRCKRSCTS/0lMKg5vGymM1df89bNcWwJcdzC/4wDYSAD8bj7oxk4RZPG4B/LRvTNI/gTQG8euAGRh/0zkvjDshy4AZFGCcF52WoBJZD1A1uUXgacA8q7l/NgKzzxsD8VxZTU/9oCXgyeFDxbzY/ML07OaH+tfnJ7g17eUHxtfgZ7gN7aT3+1V6Al+t3/9pJcQW17Q5x6KLy00Pza9kvEJ85tayG9zJeMT5rf562c9u1h6NeMT5pfaZn4su5rxCfPLbMN3LberZZvzZeOLJQqKBJbFfmxyxbErRu/ELnw33nXxeX/9vOdVWGPq4w1y0hj+9ROfU2xWGR9Hr9O5q5uYxplNo5dNq2KATdcXeh/W89hg1cKDDSri46+Rr7WtxQ8GVuF7rIgPQz9XreUKJFbh61fDB33BLXocKn6TGvMfWJU0Zf+qIcCZwLZETCS+txrmB/+cxidmvjV6nCvzu68evziNDzwBbSE+gu8SX1J99DqNj/cEtNUOX41Eq9v4XozNaXw1Jj+38WUGH7QkvjXhq4ZvqQcv3yjXUWPB7DQ+T3rcMehBTPiqBy5i0HbRAx03jwhfRXy3vn+LHqYKX5fwVcT3JKiBoigjQMJXcc27UmtdvejwhxQ2V3QdMm5u40Tj6xC+qgkrtegda3w1ynldxydzzTBS9N4p41IVn0r4DVp1Ha/r+Dy+yzar3AHhqyYVumj1amxXuo4PJjm9qNZeh+P49ptFdaY+wodtg69GrpnweTgy+J7rVGq4jo9/Gno1cqWEz4OBwVfvMIjr+Haeo8Vp8FbGp3IGTYo03MaH0/2q44VWHZXxtfb4YlrzVk2X9v0D0TZ51WT9W54uaNXLlzqNjz/nhqfNsFX5QJfT+PI0s1jv4lb+W3mr0ml8kFfmdoDzqM705zI+eDT0ZJoeMj0JVuPnMj5cG3xt+SnUpQamBwfnHJROL0YcxgcvuePQHsOE0B3V82uzzDrz4GE+6W0Qy4/NOIxPFTZLPZkBa8KY9vTt/TAcjN7aWdmxGXfx8buczweXJ7MQ7wO/TO/D4q5E7uLbbRKNUKB7Tp7eS+FJhZ9FX+0sPn6fg8kgSL+h207bSdDJsqwTDBe6fshvFaWjncVnitLE1Dbzj7SV/SJBe1/ErGWslPDtjO/zGJr0EuNA0YyCg7kOTXxY0CDGVXyquOWL4qfhh+zUaVZys88dQFUC7RcWsLmJj+PyC7pWN7nbhXc41y+md+YVE1D7Bcc1XcQH+Lo4SJOG4+xrZAyemQ5Hw2cZQnfMGwuOa7qHD/Blu2e3HrweLyo4znNXHM62uzOrBX0SXMMH2Bnt4flpyYIMcBh/nxyLtjLdwsdxsv6CpDwhABh8jWieinIxTuHDpUnO55Z1sqQPkCfdfBCPgsJMlkP4ABYaxVvPjN+fjhHJhTBfdh6CHi/JGbiDDzs6t/yW4cqYVPYbPy1XHs4nrDhq0ws7CHmqpcYxGEfxcdAuYygGYV7WUqeS3k18/F45i5knjz6bGdDvnaHZmhP4OH/XpifmMMhzou1zdPpzAp/KwrcyyWu3M15y8p4fRIK/KFlzAZ/ekFzK/+JgArmokI14cbMxQQrn8s/8byMX8alGD6r8jO8qmT+K3mgyU3FbjHLU75tN8CAzfdTa0wF8/DVfcvFdSVBQPEfmIc0I9qVrYqm7w9dyEB/IhJNsbgU8X/CWtJuT+ObeMpWpPYGvzV+TWGZJJb7kdSn0ffQ6gE8V4E5l3i46TU/h64Ac4SFKfMiBx35L4QvAgbmvsIOaGofb8S7XUnoXisYnC69ayvpAF1DO4b5suFvWQa2wf59plGEU9UoDvhxf6kdo8Mkjl20U+Obqurajr7arf19x98jdpqT0ISfOjEt8L4g9tVNp8GHkpxJfuF6vbx++f9ay7pElvUsxMRm+bu/UFVAS3zaV3nnJv+PTk+YRPrt6l5Z1zgV8WY3bAT99f1YeuESZClwUPpChi8CXtoWOGuLb1Tn3RN9mVa73wypMW994Lue43HXMhasBNfcVfd6uvs0Nu4bruQ/UCNX4ZBDT4rzM89rWNbxZz3rjeT2DbyB8bSodbyk+sKxnfbMbE77hGy2eIpWaKcdn2Y0Jze7r+IJvv+RV+I5iFvUmy6a+ZrfF8Oc0/TCfh8U0TReJp36OTZoWfa99t8U0u6tIbkwe/L0vfcHCiMe+u4ropqxmonvamol9XMn8+IeF9OiOyoZiZ6ge+A29hZXGJ7N+17if99FSele4W9vq26HpbvKmYqvTmb1m4riymp7gt63RyPWXAr61nJ7gd5PUvXztB3iY3FhPT4iF/Qb3/xWLA/RDF+BJsXicyXNWZ2EoyCFk49gVeFKMxd1BsJSP3kjiJ1gGg27MXIKnxKSi8LaRwkh9zV8/C4lEIpFIJBKJRCKRSCQSiUQikUgkEolEqqT/AD6fh/FHdUrkAAAAAElFTkSuQmCC',
      },
    ],
    recentNotices: [
      {
        title: '공지 제목 1',
        date: '2024.03.21',
      },
      {
        title: '공지 제목 2',
        date: '2024.03.21',
      },
    ],
  });

  const notificationClick = () => {
    navigate('/notification');
  };

  return (
    <Container>
      <Flex gap={20} isColumn={true} alignItems="center">
        <Flex gap={40} isColumn={true} alignItems="center">
          <Title>공지사항</Title>
          <Flex gap={24} isColumn={true} alignItems="start">
            <Flex gap={4} isColumn={true} alignItems="start">
              <PostTitle>{datas.title}</PostTitle>
              <Date>{datas.date}</Date>
            </Flex>
          </Flex>
          <Line />
          <Content>{datas.content}</Content>
          <Line />
          <Flex justifyContent="space-between">
            <Button
              backgroundColor={colors.orange[400]}
              backgroundHoverColor={colors.orange[500]}
              width="100px"
              onClick={notificationClick}
            >
              목록
            </Button>
            <PDFDownloader data={datas.download} />
          </Flex>
          <Flex isColumn={true} gap={20}>
            <SubTitle>최근 공지</SubTitle>
            <Flex isColumn={true} gap={12} alignItems="center">
              {datas.recentNotices.map((data, index) => (
                <NoticePost key={index} title={data.title} date={data.date} />
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

const SubTitle = styled.div`
  font-size: 20px;
  color: ${colors.gray[900]};
`;

const Content = styled.div`
  width: 100%;
  font-size: 20px;
  color: ${colors.gray[800]};
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray[100]};
`;

const Date = styled.div`
  font-size: 16px;
  color: ${colors.gray[300]};
`;

const PostTitle = styled.div`
  font-size: 28px;
  color: ${colors.gray[900]};
`;

const Container = styled.div`
  width: 100vw;
  padding: 50px 100px 60px 100px;
`;
