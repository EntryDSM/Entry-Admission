import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { BookIcon, BrainIcon, ChallengeIcon, FireIcon } from './assets';

interface IEducationalGoalType {
  isAdmin?: boolean;
  title: string;
  content: string;
  iconType: 'passion' | 'challenge' | 'learning' | 'creativity';
}

export const EducationalGoal = ({
  title,
  content,
  iconType,
  isAdmin,
}: IEducationalGoalType) => {
  const type = {
    passion: <FireIcon isAdmin={isAdmin} />,
    challenge: <ChallengeIcon isAdmin={isAdmin} />,
    learning: <BookIcon isAdmin={isAdmin} />,
    creativity: <BrainIcon isAdmin={isAdmin} />,
  };
  return (
    <Container>
      {type[iconType]}
      <ContentContainer>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  min-width: 560px;
  padding: 24px 55px;
  border-radius: 20px;
  background-color: ${colors.extra.white};
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 32px;
  color: ${colors.gray[800]};
`;

const Content = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: ${colors.gray[500]};
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`;
