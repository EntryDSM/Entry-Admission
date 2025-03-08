import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { PostArrow } from './assets';

interface IPostType {
  title: string;
  date: string;
  isAdmin: boolean;
  isNew?: boolean;
}

export const NoticePost = ({ title, isNew, date, isAdmin }: IPostType) => {
  return (
    <PostContainer>
      <ContentContainer>
        <TitleContainer>
          <Title>{title}</Title>
          {isNew && <KeyWord isAdmin={isAdmin}>New</KeyWord>}
        </TitleContainer>
        <Date>{date}</Date>
      </ContentContainer>
      <PostArrow />
    </PostContainer>
  );
};

const KeyWord = styled.div<Pick<IPostType, 'isAdmin'>>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.gray[50]};
  width: 48px;
  height: 25px;
  border-radius: 4px;
  background-color: ${({ isAdmin }) =>
    isAdmin ? colors.green[500] : colors.orange[500]};
`;

const TitleContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const PostContainer = styled.div`
  cursor: pointer;
  width: 100%;
  height: 84px;
  border-radius: 12px;
  border: 1px solid #f5f5f5;
  padding: 16px 20px;
  background-color: ${colors.gray[50]};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 20px;
  color: ${colors.gray[800]};
`;

const Date = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${colors.gray[200]};
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: start;
`;
