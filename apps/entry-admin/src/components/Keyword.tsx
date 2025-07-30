import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

interface IKeywordType {
  children: string;
  onClick?: () => void;
}

export const Keyword = ({ children, onClick }: IKeywordType) => {
  return <KeywordContainer onClick={onClick}>{children}</KeywordContainer>;
};

const KeywordContainer = styled.div`
  padding: 5px 15px;
  border-radius: 100px;
  border: 1px solid ${colors.green[500]};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  color: ${colors.green[500]};
  background-color: #1db95414;
`;
