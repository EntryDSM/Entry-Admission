import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

interface ITitleType {
  children: string;
}

export const Title = ({ children }: ITitleType) => {
  return <TitleContainer>{children}</TitleContainer>;
};

const TitleContainer = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: ${colors.gray[900]};
`;
