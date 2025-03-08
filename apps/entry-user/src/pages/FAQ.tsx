import styled from '@emotion/styled';
import { Flex } from '@entry/design-token';
import { FAQItem, Title } from '@entry/ui';
import { useState } from 'react';

export const FAQ = () => {
  const [datas, setDatas] = useState<[{ title: string; content: string }]>([
    {
      title: '다른 고등학교에서 전학 갈 수 있나요?',
      content:
        '본교는 전입학을 허용하지 않습니다. 즉, 일반계 고등학교 뿐만 아니라 다른 마이스터 고등학교 재학생이라도 전학을 받아주지 않습니다. 따라서 본교에는 신입생으로만 입학할 수 있습니다.',
    },
    {
      title: '다른 고등학교에서 전학 갈 수 있나요?',
      content:
        '본교는 전입학을 허용하지 않습니다. 즉, 일반계 고등학교 뿐만 아니라 다른 마이스터 고등학교 재학생이라도 전학을 받아주지 않습니다. 따라서 본교에는 신입생으로만 입학할 수 있습니다.',
    },
    {
      title: '다른 고등학교에서 전학 갈 수 있나요?',
      content:
        '본교는 전입학을 허용하지 않습니다. 즉, 일반계 고등학교 뿐만 아니라 다른 마이스터 고등학교 재학생이라도 전학을 받아주지 않습니다. 따라서 본교에는 신입생으로만 입학할 수 있습니다.',
    },
    {
      title: '다른 고등학교에서 전학 갈 수 있나요?',
      content:
        '본교는 전입학을 허용하지 않습니다. 즉, 일반계 고등학교 뿐만 아니라 다른 마이스터 고등학교 재학생이라도 전학을 받아주지 않습니다. 따라서 본교에는 신입생으로만 입학할 수 있습니다.',
    },
    {
      title: '다른 고등학교에서 전학 갈 수 있나요?',
      content:
        '본교는 전입학을 허용하지 않습니다. 즉, 일반계 고등학교 뿐만 아니라 다른 마이스터 고등학교 재학생이라도 전학을 받아주지 않습니다. 따라서 본교에는 신입생으로만 입학할 수 있습니다.',
    },
    {
      title: '다른 고등학교에서 전학 갈 수 있나요?',
      content:
        '본교는 전입학을 허용하지 않습니다. 즉, 일반계 고등학교 뿐만 아니라 다른 마이스터 고등학교 재학생이라도 전학을 받아주지 않습니다. 따라서 본교에는 신입생으로만 입학할 수 있습니다.',
    },
  ]);
  return (
    <Container>
      <Flex gap={20} isColumn={true} alignItems="center">
        <Flex gap={40} isColumn={true} alignItems="center">
          <Title>자주 묻는 질문</Title>
          <Flex gap={16} isColumn={true} alignItems="end">
            <div>검색바</div>
            <Flex gap={12} isColumn={true} alignItems="center">
              {datas.map((data, index) => (
                <FAQItem
                  key={index}
                  number={(index + 1).toString().padStart(2, '0')}
                  title={data.title}
                  content={data.content}
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
