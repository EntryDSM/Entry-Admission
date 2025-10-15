import { colors, Flex, Text } from '@entry/design-token';
import { usePageData } from '@entry/ui';
import { FormElement } from '../../components';
import  styled  from '@emotion/styled';

export const PersonalStatements = () => {
  const [datas, setDatas] = usePageData('personalStatements');

  const handlePersonalStmtChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDatas({ ...datas, personalStmt: value });
  };

  const handleStudyPlanChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDatas({ ...datas, studyPlan: value });
  };


  return (
    <Flex isColumn={true} width="100%" height="fit-content">
      <Flex width='100%' height='fit-content' gap={8} isColumn>
        <NoticeDiv>
          <Text fontSize={16}>자기소개서 내용은 특별한 형식이 없으며 개인의 특성 및 성장 과정, 취미•특기, 학교 생활, 가족 안에서의 역할, 남들보다 뛰어나다고 생각하는 자신의 장점(특성 혹은 능력)과 보완· 발전시켜야 할 단점에 대하여 기술하십시오.</Text>
          <Text  fontSize={16}>학업계획서는 자신이 본교를 선택하게 된 구체적인 사유(지원 동기)와 고등학생이 된 후 이루고자 하는 목표를 달성하기 위한 학업계획을 상세하게 기술하십시오.</Text>
        </NoticeDiv>
      </Flex>
      <FormElement
        width="300px"
        type="textArea"
        label="자기소개서"
        placeholder="빈칸 포함 1,600자 이내"
        // warning='자기소개서 내용은 특별한 형식이 없으며 개인의 특성 및 성장 과정, 취미•특기, 학교 생활, 가족 안에서의 역할, 남들보다 뛰어나다고 생각하는 자신의 장점(특성 혹은 능력)과 보완· 발전시켜야 할 단점에 대하여 기술하십시오.'
        onTextAreaChange={handlePersonalStmtChange}
        textAreaValue={datas.personalStmt || ''}
      />{' '}
      <FormElement
        width="300px"
        type="textArea"
        label="학업계획서"
        // warning='학업계획서는 자신이 본교를 선택하게 된 구체적인 사유(지원 동기)와 고등학생이 된 후 이루고자 하는 목표를 달성하기 위한 학업계획을 상세하게 기술하십시오.'
        placeholder="빈칸 포함 1,600자 이내"
        onTextAreaChange={handleStudyPlanChange}
        textAreaValue={datas.studyPlan || ''}
      />
    </Flex>
  );
};

const NoticeDiv = styled.div `
  border-radius: 12px;
  background-color: ${colors.gray[200]};
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`