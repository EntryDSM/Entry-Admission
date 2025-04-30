import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { Check } from '@entry/ui';
import { GradeSelector } from './GradeSelector';

interface ISubjectSelector {
  subjectName: string;
  selectedGrade: string | null;
  onSelectGrade: (grade: string | null) => void;
}

export const SubjectSelector = ({
  subjectName,
  selectedGrade,
  onSelectGrade,
}: ISubjectSelector) => {
  const handleSelect = (grade: string | null) => {
    onSelectGrade(grade);
  };

  return (
    <Container>
      <Label>
        {selectedGrade && <Check />}
        <Subject>{subjectName}</Subject>
      </Label>
      <GradeSelector selected={selectedGrade} onSelect={handleSelect} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 80px;
  border-top: 1px solid ${colors.gray[200]};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 576px) {
    flex-direction: column;
    height: auto;
    align-items: flex-start;
    padding: 15px;
  }
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
`;

const Subject = styled.div`
  font-size: 22px;
  font-weight: 450;

  @media (max-width: 570px) {
    font-size: 18px;
  }
`;
