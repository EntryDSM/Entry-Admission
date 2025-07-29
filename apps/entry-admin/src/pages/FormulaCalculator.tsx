import { colors, Flex, Text } from '@entry/design-token';
import { AuthInput, Button, TabSection } from '@entry/ui';
import { useState } from 'react';
import styled from '@emotion/styled';
import { CalculatorPost, Keyword } from '../components';

export const FormulaCalculator = () => {
  const [_, setCurrentPage] = useState(1);
  const [variable, setVariable] = useState<string>('');
  const [formulaData, setFormulaData] = useState<{
    name: string;
    formula: string;
    resultVariable: string;
  }>({
    name: '',
    formula: '',
    resultVariable: '',
  });
  const [activeTab, setActiveTab] = useState<
    'regularAdmission' | 'meisterAdmission' | 'socialIntegrationAdmission'
  >('regularAdmission'); //type send

  const [variableKeyword, setVariableKeyword] = useState<
    { id: number; content: string }[]
  >([
    {
      id: 1,
      content: 'sdfdgfhgj',
    },
    {
      id: 2,
      content: 'sdfdgfhgj',
    },
    {
      id: 3,
      content: 'sdfdgfhgj',
    },
    {
      id: 4,
      content: 'sdfdgfhgj',
    },
  ]);

  const [postData, setPostData] = useState<
    { id: number; name: string; formula: string; resultVariable: string }[]
  >([
    {
      id: 1,
      name: '3학년 1학기 교과평균',
      formula:
        '({korean_3_1} + {social_3_1} + {history_3_1} + {math_3_1} + {science_3_1} + {tech_3_1} + {english_3_1}) / 7',
      resultVariable: '나는 스파이더맨',
    },
  ]);

  const handleVariableDelClick = (id: number) => {
    //id del api
    //변수 전체 다시 불러오기
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(
      tab as
        | 'regularAdmission'
        | 'meisterAdmission'
        | 'socialIntegrationAdmission'
    );
    setCurrentPage(1);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormulaData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormulaData((prev) => ({ ...prev, formula: e.target.value }));
  };

  const handleResultVariableChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormulaData((prev) => ({ ...prev, resultVariable: e.target.value }));
  };

  const handleVariableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVariable(e.target.value);
  };

  const TAB_TYPES = [
    {
      key: 'regularAdmission' as const,
      label: '일반 전형',
      basePath: '/calculate/primary',
    },
    {
      key: 'meisterAdmission' as const,
      label: '마이스터 인재 전형',
      basePath: '/calculate/graduated',
    },
    {
      key: 'socialIntegrationAdmission' as const,
      label: '사회통합 전형',
      basePath: '/calculate/qe',
    },
  ];

  const variableAddClick = () => {
    //variable add api
    setVariable('');
  };

  const formulaDataAddClick = () => {
    //formulaData add api
    setFormulaData({
      name: '',
      formula: '',
      resultVariable: '',
    });
  };
  return (
    <Container>
      <Flex isColumn={true} gap={16} width="100%" height="fit-content">
        <Text fontSize={32} fontWeight={600} color={colors.gray[500]}>
          전형 수식
        </Text>
        <Flex isColumn={true} gap={20} width="100%" height="fit-content">
          <TabSection
            isAdmin={true}
            activeType={activeTab}
            onTypeChange={handleTabChange}
            options={TAB_TYPES}
          />
          <Flex alignItems="center" height="fit-content" width="100%" gap={10}>
            <FormulaContainer>
              <AuthInput
                height="fit-content"
                placeholder="수식 이름을 입력하세요"
                value={formulaData.name}
                onChange={handleNameChange}
              />
              <AuthInput
                height="fit-content"
                placeholder="수식을 입력하세요"
                value={formulaData.formula}
                onChange={handleFormulaChange}
              />
              <AuthInput
                height="fit-content"
                placeholder="결과 변수 명을 입력하세요"
                value={formulaData.resultVariable}
                onChange={handleResultVariableChange}
              />
            </FormulaContainer>
            <Button
              backgroundColor={colors.green[400]}
              hoverBackgroundColor={colors.green[500]}
              onClick={formulaDataAddClick}
            >
              수식 추가하기
            </Button>
          </Flex>
          <Flex alignItems="center" height="fit-content" width="100%" gap={10}>
            <AuthInput
              height="fit-content"
              placeholder="사용할 변수명을 입력하세요"
              onChange={handleVariableChange}
              value={variable}
            />
            <Button
              backgroundColor={colors.green[400]}
              hoverBackgroundColor={colors.green[500]}
              onClick={variableAddClick}
            >
              변수 추가하기
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex isColumn={true} width="auto" height="auto" gap={28}>
        <Flex gap={16} isColumn={true} width="auto" height="auto">
          <Text fontSize={32} fontWeight={600} color={colors.gray[500]}>
            전역 변수
          </Text>
          <Flex gap={12} alignItems="center" width="auto" height="auto">
            {variableKeyword.map((data) => (
              <Keyword
                onClick={() => handleVariableDelClick(data.id)}
                key={data.id}
              >
                {data.content}
              </Keyword>
            ))}
          </Flex>
        </Flex>
        <Flex isColumn={true} width="100%" height="auto">
          <PostContainer>
            <ContentContainer>
              <Content>수식 번호</Content>
              <Content>수식 이름</Content>
              <Content>수식</Content>
              <Content>결과 변수</Content>
            </ContentContainer>
            <BtnContainer>
              <Button>삭제하기</Button>
            </BtnContainer>
          </PostContainer>
          {postData.map((data) => (
            <CalculatorPost
              key={data.id}
              id={data.id}
              resultVariable={data.resultVariable}
              formula={data.formula}
              name={data.name}
            />
          ))}
        </Flex>
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const FormulaContainer = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;
`;

const BtnContainer = styled.div`
  width: fit-content;
  height: fit-content;
  opacity: 0;
  pointer-events: none;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr 6fr 2fr;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: ${colors.gray[400]};
`;

const PostContainer = styled.div`
  width: 100%;
  height: 83px;
  border-bottom: 1px solid ${colors.gray[300]};
  display: flex;
  align-items: center;
`;
