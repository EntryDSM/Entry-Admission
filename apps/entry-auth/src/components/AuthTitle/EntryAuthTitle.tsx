import styled from '@emotion/styled';
import { colors, Text } from '@entry/design-token';
import { EntryLogo } from '@entry/ui';

interface IEntryAuthTitleType {
  children: string;
  isAdmin: boolean;
}

export const EntryAuthTitle = ({ children, isAdmin }: IEntryAuthTitleType) => {
  return (
    <LogoTitle $isAdmin={isAdmin}>
      <EntryLogo isAdmin={isAdmin} />
      <Text fontSize={25} fontWeight={550} children={children} />
    </LogoTitle>
  );
};

const LogoTitle = styled.div<{ $isAdmin: boolean }>`
  width: fit-content;
  height: 75px;
  min-height: 75px;
  gap: 10px;
  border-bottom: 2px solid
    ${({ $isAdmin }) => ($isAdmin ? colors.green[800] : colors.orange[800])};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
`;
