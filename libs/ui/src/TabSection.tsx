import styled from "@emotion/styled";
import { colors } from "@entry/design-token";

interface TabOption {
  key: string;
  label: string;
}

interface TabSectionProps {
  options: TabOption[];
  activeType: string;
  onTypeChange: (type: string) => void;
}

interface TabButtonProps {
  isActive: boolean;
}

const StyledTabSection = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 0px;
  margin-bottom: 44px;
`;

const TabButton = styled.div<TabButtonProps>`
  padding: 8px 16px;
  background-color: ${({ isActive }: TabButtonProps) => isActive ? colors.orange[300] : "none"};
  color: ${({ isActive }: TabButtonProps) => isActive ? colors.orange[800] : colors.gray[400]};
  border: 1px solid none;
  border-bottom: none;
  border-radius: 12px;
  font-weight: 500;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ isActive }: TabButtonProps) => isActive ? "none" : colors.gray[50]};
  }
`;

export const TabSection = ({ options, activeType, onTypeChange }: TabSectionProps) => {
  return (
    <StyledTabSection>
      {options.map((option) => (
        <TabButton
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