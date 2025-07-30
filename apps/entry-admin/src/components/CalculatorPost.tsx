import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { Button } from '@entry/ui';

interface IPostType {
  id: number;
  name: string;
  formula: string;
  resultVariable: string;
}

export const CalculatorPost = ({
  id,
  name,
  formula,
  resultVariable,
}: IPostType) => {
  return (
    <Container>
      <ContentContainer>
        <Content>{id}</Content>
        <Content>{name}</Content>
        <Content>{formula}</Content>
        <Content>{resultVariable}</Content>
      </ContentContainer>
      <Button
        backgroundColor={colors.extra.realWhite}
        color={colors.extra.error}
        borderColor={colors.extra.error}
        hoverBackgroundColor="none"
      >
        삭제하기
      </Button>
    </Container>
  );
};

const ContentContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr 6fr 2fr;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: ${colors.gray[400]};
`;

const Container = styled.div`
  width: 100%;
  height: 83px;
  border-bottom: 1px solid ${colors.gray[300]};
  display: flex;
  align-items: center;
`;
