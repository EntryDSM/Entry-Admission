import { colors, Flex, Text } from '@entry/design-token';
import { AuthInput, Button, TabSection } from '@entry/ui';
import { useState, useCallback, useMemo } from 'react';
import styled from '@emotion/styled';
import { CalculatorPost, Keyword } from '../components';

export const FormulaCalculator = () => {
  const [_, setCurrentPage] = useState(1);
  const [variableData, setVariableData] = useState<{name: string, region : string, educationalStatus: string}>({name : '',region: ''  ,educationalStatus: ''});
  const [formulaData, setFormulaData] = useState<{
    name: string;
    formula: string;
    description: string,
    resultVariable: string;
    region: string,
    educationalStatus: string
  }>({
    name: '',
    formula: '',
    description:'',
    resultVariable: '',
    region: '',
    educationalStatus: ''
  });

  const [activeTab, setActiveTab] = useState<
    'COMMON' | 'MEISTER' | 'SOCIAL'
  >('COMMON'); //type send

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
    { id: number; 
      name: string;
      formula: string;
      description: string,
      resultVariable: string;
      educationalStatus: string;
      region: string }[]>([
    {
      id: 1,
      name: '3학년 1학기 교과평균',
      formula:
        '({korean_3_1} + {social_3_1} + {history_3_1} + {math_3_1} + {science_3_1} + {tech_3_1} + {english_3_1}) / 7',
      resultVariable: '나는 스파이더맨',
      description: 'dddd',
      region: '대전',
      educationalStatus: '졸업'
      
    },
  ]);

  // useCallback으로 함수들 메모이제이션
  const handleVariableDelClick = useCallback((id: number) => {
    //id del api
    //변수 전체 다시 불러오기
  }, []);

  const handleFormulaRegionChange = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
    setFormulaData((prev) => ({ ...prev, region: e.target.value }))
  }, []);

  const handleVariableEducationalStatusChange = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
    setVariableData((prev) => ({ ...prev, educationalStatus: e.target.value }))
  }, []);

  const handleVariableRegionChange = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
    setVariableData((prev) => ({ ...prev, region: e.target.value }))
  }, []);

  const handleFormulaEducationalStatusChange = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
    setFormulaData((prev) => ({ ...prev, educationalStatus: e.target.value }))
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(
      tab as
        | 'COMMON'
        | 'MEISTER'
        | 'SOCIAL'
    );
    setCurrentPage(1);
  }, []);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormulaData((prev) => ({ ...prev, name: e.target.value }));
  }, []);

  const handleFormulaChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormulaData((prev) => ({ ...prev, formula: e.target.value }));
  }, []);
  
  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormulaData((prev) => ({ ...prev, description: e.target.value }));
  }, []);

  const handleResultVariableChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormulaData((prev) => ({ ...prev, resultVariable: e.target.value }));
  }, []);

  const handleVariableChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVariableData((prev) => ({...prev, name:  e.target.value}));
  }, []);

  // TAB_TYPES를 useMemo로 메모이제이션
  const TAB_TYPES = useMemo(() => [
    {
      key: 'COMMON' as const,
      label: '일반 전형',
      basePath: '/calculate/primary',
    },
    {
      key: 'MEISTER' as const,
      label: '마이스터 인재 전형',
      basePath: '/calculate/graduated',
    },
    {
      key: 'SOCIAL' as const,
      label: '사회통합 전형',
      basePath: '/calculate/qe',
    },
  ], []);

  const variableAddClick = useCallback(() => {
    //variable add api
    setVariableData({name: '', region: '', educationalStatus: ''});
  }, []);

  const formulaDataAddClick = useCallback(() => {
    //formulaData add api
    setFormulaData({
      name: '',
      formula: '',
      description: '',
      resultVariable: '',
      region: '',
      educationalStatus: ''
    });
  }, []);

  // 렌더링 최적화를 위한 메모이제이션된 컴포넌트들
  const keywordList = useMemo(() => 
    variableKeyword.map((data) => (
      <Keyword
        onClick={() => handleVariableDelClick(data.id)}
        key={data.id}
      >
        {data.content}
      </Keyword>
    )), [variableKeyword, handleVariableDelClick]);

  const postList = useMemo(() =>
    postData.map((data) => (
      <CalculatorPost
        key={data.id}
        id={data.id}
        resultVariable={data.resultVariable}
        formula={data.formula}
        name={data.name}
        description={data.description}
        region={data.region}
        educationalStatus={data.educationalStatus}
      />
    )), [postData]);

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
          <Flex alignItems="start" height="fit-content" width="100%" gap={10}>
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
                placeholder="수식 설명을 입력하세요"
                value={formulaData.description}
                onChange={handleDescriptionChange}
              />
              <AuthInput
                height="fit-content"
                placeholder="결과 변수 명을 입력하세요"
                value={formulaData.resultVariable}
                onChange={handleResultVariableChange}
              />
              <Flex width='fit-content' height='fit-content' gap={12}> 
                <label>
                  대전
                  <input onChange={handleFormulaRegionChange} value="DAEJEON" checked={formulaData.region === 'DAEJEON'} type="radio" />
                </label>
                <label>
                  전국
                  <input onChange={handleFormulaRegionChange} value="NATIONWIDE" checked={formulaData.region === 'NATIONWIDE'} type="radio" />
                </label>
              </Flex>
              <Flex width='fit-content' height='fit-content' gap={12}> 
                <label>
                  졸업예정
                  <input onChange={handleFormulaEducationalStatusChange} value="PROSPECTIVE_GRADUATE" checked={formulaData.educationalStatus === 'PROSPECTIVE_GRADUATE'} type="radio" />
                </label>
                <label>
                  졸업
                  <input onChange={handleFormulaEducationalStatusChange} value="GRADUATE" checked={formulaData.educationalStatus === 'GRADUATE'} type="radio" />
                </label>
                <label>
                  검정고시
                  <input onChange={handleFormulaEducationalStatusChange} value="QUALIFICATION_EXAM" checked={formulaData.educationalStatus === 'QUALIFICATION_EXAM'} type="radio" />
                </label>
              </Flex>
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
            <FormulaContainer>

            <AuthInput
              height="fit-content"
              placeholder="사용할 변수명을 입력하세요"
              onChange={handleVariableChange}
              value={variableData.name}
            />
            <Flex width='fit-content' height='fit-content' gap={12}> 
                <label>
                  대전
                  <input onChange={handleVariableRegionChange} value="DAEJEON" checked={variableData.region === 'DAEJEON'} type="radio" />
                </label>
                <label>
                  전국
                  <input onChange={handleVariableRegionChange} value="NATIONWIDE" checked={variableData.region === 'NATIONWIDE'} type="radio" />
                </label>
              </Flex>
              <Flex width='fit-content' height='fit-content' gap={12}> 
                <label>
                  졸업예정
                  <input onChange={handleVariableEducationalStatusChange} value="PROSPECTIVE_GRADUATE" checked={variableData.educationalStatus === 'PROSPECTIVE_GRADUATE'} type="radio" />
                </label>
                <label>
                  졸업
                  <input onChange={handleVariableEducationalStatusChange} value="GRADUATE" checked={variableData.educationalStatus === 'GRADUATE'} type="radio" />
                </label>
                <label>
                  검정고시
                  <input onChange={handleVariableEducationalStatusChange} value="QUALIFICATION_EXAM" checked={variableData.educationalStatus === 'QUALIFICATION_EXAM'} type="radio" />
                </label>
            </Flex>
            </FormulaContainer>
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
            {keywordList}
          </Flex>
        </Flex>
        <Flex isColumn={true} width="100%" height="auto">
          <PostContainer>
            <ContentContainer>
              <Content>수식 번호</Content>
              <Content>수식 이름</Content>
              <Content>수식 설명</Content>
              <Content>수식</Content>
              <Content>지역 구분</Content>
              <Content>졸업 구분</Content>
              <Content>결과 변수</Content>
            </ContentContainer>
            <BtnContainer>
              <Button>삭제하기</Button>
            </BtnContainer>
          </PostContainer>
          {postList}
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
  grid-template-columns: 1fr 2fr 3fr 4fr 1fr 1fr 2fr;
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