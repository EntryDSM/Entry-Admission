import styled from '@emotion/styled';
import { colors, Text } from '@entry/design-token';
import { EntryLogo } from '@entry/ui';

interface IEntryAuthTitleType {
  children: string;
}

export const EntryAuthTitle = ({ children }: IEntryAuthTitleType) => {
  return (
    <LogoTitle>
      <EntryLogo />
      <Text fontSize={25} fontWeight={550} children={children} />
    </LogoTitle>
  );
};

const LogoTitle = styled.div`
  width: fit-content;
  height: 75px;
  gap: 10px;
  border-bottom: 2px solid ${colors.orange[800]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
`;
