import { Flex } from '@entry/design-token';
import { usePageData } from '@entry/ui';
import { FormElement } from '../../components';

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
      <FormElement
        width="300px"
        type="textArea"
        label="자기소개서"
        placeholder="내용을 입력하세요."
        onTextAreaChange={handlePersonalStmtChange}
        textAreaValue={datas.personalStmt || ''}
      />{' '}
      <FormElement
        width="300px"
        type="textArea"
        label="학업계획서"
        placeholder="내용을 입력하세요."
        onTextAreaChange={handleStudyPlanChange}
        textAreaValue={datas.studyPlan || ''}
      />
    </Flex>
  );
};