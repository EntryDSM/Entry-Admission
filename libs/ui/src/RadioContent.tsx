import { colors, Flex, Text } from '@entry/design-token';
import { Check } from '@entry/ui';
import styled from '@emotion/styled';

interface IRadioType {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}

export const RadioContent = ({ label, isSelected, onSelect }: IRadioType) => (
  <Flex width="fit-content" height="fit-content" gap={8} alignItems="center">
    <Radio isClick={isSelected} onClick={onSelect}>
      <Check color={isSelected ? colors.gray[50] : 'transparent'} />
    </Radio>
    <Text fontSize={20}>{label}</Text>
  </Flex>
);

const Radio = styled.div<{ isClick: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  border: 1px solid
    ${({ isClick }) => (isClick ? colors.orange[800] : colors.gray[200])};
  background-color: ${({ isClick }) =>
    isClick ? colors.orange[800] : 'transparent'};
  display: flex;
  justify-content: center;
  align-items: center;
`;
