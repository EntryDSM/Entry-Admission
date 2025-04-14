import { AskNav } from '@entry/ui';

const tabs = [
  { tabTitle: '전체' },
  { tabTitle: '입학 문의' },
  { tabTitle: '진로' },
  { tabTitle: '학교 생활' },
  { tabTitle: '기숙사' },
  { tabTitle: '기타' },
];

const questions = [
  {
    tabTitle: '입학 문의',
    content: '요즘 학교가 이상해요',
    answer: '님도 이상해요.',
  },
  {
    tabTitle: '기숙사',
    content: '라면은 어떻게 먹을 수 있나요?',
    answer: '건웅쌤 아닌 날에 드세요',
  },
  {
    tabTitle: '진로',
    content: '개발자는 이제 어떻게 살아남을 수 있나요?',
    answer: '스티븐 잡스가 되세요.',
  },
  {
    tabTitle: '기타',
    content: '너무 배고파요...밥 주세요..',
    answer: '저녁 드세요',
  },
];

export const Main = () => {
  return <AskNav tabs={tabs} questions={questions} isQuestion={true} />;
};
