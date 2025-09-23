import { Flex } from '@entry/design-token';
import { FormElement, usePageData } from '@entry/ui';

export const Fourth = () => {
  const [datas, setDatas] = usePageData('fourth');

  console.log(datas);

  const handleSchoolPhoneChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDatas({ ...datas, schoolPhone: value });
  };

  const handleStudentIdChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDatas({ ...datas, studentId: value });
  };

  const handleTeacherNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDatas({ ...datas, teacherName: value });
  };

  return (
    <Flex isColumn={true} width="100%" height="fit-content">
      <FormElement
        selectedValue={datas.schoolName}
        setSelectedValue={(value) => setDatas({ ...datas, schoolName: value })}
        type="search"
        label="중학교 이름"
      />
      <FormElement
        width="300px"
        type="input"
        label="중학교 학번"
        inputType="number"
        placeholder="중학교 학번을 입력해주세요."
        onInputChange={handleStudentIdChange}
        value={datas.studentId}
      />
      <FormElement
        width="300px"
        type="input"
        inputType="phone"
        label="중학교 전화번호"
        placeholder="중학교 전화번호를 입력해주세요."
        onInputChange={handleSchoolPhoneChange}
        value={datas.schoolPhone}
      />
      <FormElement
        width="300px"
        type="input"
        label="중학교 교사 성명"
        inputType="text"
        placeholder="중학교 교사 성명을 입력해주세요."
        onInputChange={handleTeacherNameChange}
        value={datas.teacherName}
      />
    </Flex>
  );
};
