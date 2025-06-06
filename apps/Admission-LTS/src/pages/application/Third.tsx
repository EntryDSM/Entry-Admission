import { Flex } from '@entry/design-token';
import { FormElement } from '@entry/ui';
import { useEffect, useState } from 'react';

export const Third = () => {
  const [datas, setDatas] = useState<{
    schoolName: string | null;
    studentId: number | null;
    schoolPhone: string | null;
    teacherName: string | null;
  }>({
    schoolName: null,
    studentId: null,
    schoolPhone: null,
    teacherName: null,
  });
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  console.log(datas);

  useEffect(() => {
    setDatas((prev) => ({
      ...prev,
      schoolName: selectedValue,
    }));
  }, [selectedValue]);

  const handleSchoolPhoneChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDatas((prev) => ({ ...prev, schoolPhone: value }));
  };

  const handleStudentIdChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDatas((prev) => ({ ...prev, studentId: value }));
  };

  const handleTeacherNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDatas((prev) => ({ ...prev, teacherName: value }));
  };

  return (
    <Flex isColumn={true} width="100%" height="fit-content">
      <FormElement
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        type="search"
        label="중학교 이름"
      />
      <FormElement
        width="300px"
        type="input"
        label="중학교 학번"
        placeholder="중학교 학번을 입력해주세요."
        onChange={handleStudentIdChange}
        value={datas.studentId}
      />
      <FormElement
        width="300px"
        type="input"
        label="중학교 전화번호"
        placeholder="중학교 전화번호를 입력해주세요."
        onChange={handleSchoolPhoneChange}
        value={datas.schoolPhone}
      />
      <FormElement
        width="300px"
        type="input"
        label="중학교 교사 성명"
        placeholder="중학교 교사 성명을 입력해주세요."
        onChange={handleTeacherNameChange}
        value={datas.teacherName}
      />
    </Flex>
  );
};
