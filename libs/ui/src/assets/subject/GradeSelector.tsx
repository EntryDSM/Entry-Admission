import styled from '@emotion/styled';
import { Grade } from './Grade';

interface IGradeSelectorType {
  selected: string | null;
  onSelect: (grade: string | null) => void;
  size?: 'large' | 'small';
}

export const GradeSelector = ({
  selected,
  onSelect,
  size = 'large',
}: IGradeSelectorType) => {
  const isSmall = size === 'small';
  const grades = ['A', 'B', 'C', 'D', 'E'];

  const handleSelect = (grade: string | null) => {
    onSelect(selected === grade ? null : grade);
  };

  return (
    <GradeSelectorContainer $gap={isSmall ? '10px' : '20px'}>
      {grades.map((grade) => (
        <Grade
          key={grade}
          grade={grade}
          isSelected={selected === grade}
          onSelect={() => handleSelect(grade)}
          width={isSmall ? '30px' : '45px'}
          height={isSmall ? '30px' : '45px'}
          fontSize={isSmall ? '15px' : '22px'}
        />
      ))}
      <Grade
        isCancel={true}
        isSelected={selected === null}
        onSelect={() => handleSelect(null)}
        width={isSmall ? '30px' : '45px'}
        height={isSmall ? '30px' : '45px'}
      />
    </GradeSelectorContainer>
  );
};

const GradeSelectorContainer = styled.div<{ $gap: string }>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.$gap};
`;
