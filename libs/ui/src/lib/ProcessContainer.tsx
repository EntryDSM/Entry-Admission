import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import {
  FinalPresentationIcon,
  HealthCheckupIcon,
  PencilIcon,
  PresentationPersonIcon,
  WriteIcon,
} from './assets';

interface IProcessType {
  isAdmin?: boolean;
  title: string;
  time?: string;
  date: string;
  iconType:
    | 'application'
    | 'firstStageResults'
    | 'interview'
    | 'finalResults'
    | 'registration'
    | 'healthCheck';
  top: string;
  left: string;
}

export const ProcessContainer = ({
  title,
  date,
  time,
  iconType,
  isAdmin,
  top,
  left,
}: IProcessType) => {
  const type = {
    application: <PencilIcon isAdmin={isAdmin} />,
    firstStageResults: <PresentationPersonIcon isAdmin={isAdmin} />,
    interview: <WriteIcon isAdmin={isAdmin} />,
    finalResults: <FinalPresentationIcon isAdmin={isAdmin} />,
    registration: <WriteIcon isAdmin={isAdmin} />,
    healthCheck: <HealthCheckupIcon isAdmin={isAdmin} />,
  };
  return (
    <Container top={top} left={left}>
      {type[iconType]}
      <ContentContainer>
        <Title>{title}</Title>
        <PeriodContainer>
          <Date>{date}</Date>
          <Time>{time}</Time>
        </PeriodContainer>
      </ContentContainer>
    </Container>
  );
};

const PeriodContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const Container = styled.div<{ top: string; left: string }>`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  z-index: 2;
  padding: 36px 55px;
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

const Date = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: ${colors.gray[500]};
`;

const Time = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: ${colors.gray[500]};
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`;
