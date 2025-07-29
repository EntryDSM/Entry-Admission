import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

interface TabOption {
  key: string;
  label: string;
}

interface TabSectionProps {
  isAdmin?: boolean;
  options: TabOption[];
  activeType: string;
  onTypeChange: (type: string) => void;
}

interface TabButtonProps {
  isActive: boolean;
  isAdmin?: boolean;
}

const StyledTabSection = styled.div`
  display: flex;
  gap: 24px;
`;

const TabButton = styled.div<TabButtonProps>`
  padding: 8px 16px;
  background-color: ${({ isActive, isAdmin }: TabButtonProps) =>
    isActive ? (isAdmin ? colors.green[50] : colors.orange[300]) : 'none'};
  color: ${({ isActive, isAdmin }: TabButtonProps) =>
    isActive
      ? isAdmin
        ? colors.green[300]
        : colors.orange[800]
      : colors.gray[400]};
  border: 1px solid none;
  border-bottom: none;
  border-radius: 12px;
  font-weight: 500;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ isActive }: TabButtonProps) =>
      isActive ? 'none' : colors.gray[50]};
  }
`;

export const TabSection = ({
  options,
  activeType,
  onTypeChange,
  isAdmin = false,
}: TabSectionProps) => {
  return (
    <StyledTabSection>
      {options.map((option) => (
        <TabButton
          isAdmin={isAdmin}
          key={option.key}
          isActive={activeType === option.key}
          onClick={() => onTypeChange(option.key)}
        >
          {option.label}
        </TabButton>
      ))}
    </StyledTabSection>
  );
};
