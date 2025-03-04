import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { useState } from 'react';
import { DropDownArrow } from './assets';

interface IFAQType {
  number: string;
  title: string;
  content: string;
  isAdmin?: boolean;
}

export const FAQItem = ({ number, title, content, isAdmin }: IFAQType) => {
  const [isClick, setIsClick] = useState<boolean>(false);

  const itemClick = () => {
    setIsClick(!isClick);
  };

  return (
    <ItemContainer isClick={isClick} onClick={itemClick} isAdmin={isAdmin}>
      <Number isClick={isClick} isAdmin={isAdmin}>
        {number}
      </Number>
      <ContentContainer>
        <TitleContainer>
          <Title>{title}</Title>
          <DropDownArrow isClick={isClick} isAdmin={isAdmin} />
        </TitleContainer>
        {isClick && (
          <>
            <Line isAdmin={isAdmin} /> <Content>{content}</Content>
          </>
        )}
      </ContentContainer>
    </ItemContainer>
  );
};

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.gray[900]};
`;

const Content = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${colors.gray[700]};
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: start;
`;

const Line = styled.div<{ isAdmin: boolean }>`
  width: 100%;
  height: 1px;
  background-color: ${({ isAdmin }) =>
    isAdmin ? colors.green[100] : colors.orange[100]};
`;

const Number = styled.div<{ isClick: boolean; isAdmin: boolean }>`
  transition: 0.44s ease;
  font-size: 28px;
  font-weight: 800;
  color: ${({ isClick, isAdmin }) => {
    if (!isClick) return colors.gray[400];
    return isAdmin ? colors.green[700] : colors.orange[700];
  }};
`;

const ItemContainer = styled.div<{ isClick: boolean; isAdmin: boolean }>`
  width: 100%;
  transition: 0.44s ease;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
  padding: 24px 32px;
  width: 100%;
  height: ${({ isClick }) => (isClick ? 157 : 81)}px;
  border-radius: 12px;
  background-color: ${({ isClick, isAdmin }) => {
    if (!isClick) return colors.gray[50];
    return isAdmin ? colors.green[50] : colors.orange[50];
  }};
  display: flex;
  gap: 24px;
  align-items: start;
  justify-content: start;
`;
