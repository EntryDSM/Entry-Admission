import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { GradeSelector } from './GradeSelector';

interface IAllSubjectSelectorType {
  selected: string | null;
  onSelect: (grade: string | null) => void;
}

export const AllSubjectSelector = ({
  selected,
  onSelect,
}: IAllSubjectSelectorType) => {
  return (
    <Container>
      <Title>전체 선택</Title>
      <GradeSelector selected={selected} onSelect={onSelect} size="small" />
    </Container>
  );
};

const Container = styled.div`
  width: 400px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
  margin-left: auto;
  height: 30px;
`;

const Title = styled.div`
  font-size: 14px;
  color: ${colors.gray[400]};
`;
