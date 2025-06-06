import { Flex } from '@entry/design-token';
import { FormElement } from '@entry/ui';
import { useState } from 'react';

export const Fourth = () => {
  const [datas, setDatas] = useState<{
    personalStmt: string;
    studyPlan: string;
  }>({
    personalStmt: '',
    studyPlan: '',
  });

  const handlePersonalStmtChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDatas((prev) => ({ ...prev, personalStmt: value }));
  };

  const handleStudyPlanChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDatas((prev) => ({ ...prev, studyPlan: value }));
  };

  console.log(datas);

  return (
    <Flex isColumn={true} width="100%" height="fit-content">
      <FormElement
        width="300px"
        type="textArea"
        label="자기소개서"
        placeholder="내용을 입력하세요."
        onChange={handlePersonalStmtChange}
        value={datas.personalStmt}
      />{' '}
      <FormElement
        width="300px"
        type="textArea"
        label="학업계획서"
        placeholder="내용을 입력하세요."
        onChange={handleStudyPlanChange}
        value={datas.studyPlan}
      />
    </Flex>
  );
};
