import styled from '@emotion/styled';
import { AuthCard } from '../../components';

interface ISelectUserType {
  onNext: (type: string) => void;
}

// 회원가입 1단계
export const SelectUser = ({ onNext }: ISelectUserType) => {
  const handleCardClick = (type: string) => {
    onNext(type);
  };

  return (
    <SelectUserContainer>
      <CardContainer>
        <CardWrapper onClick={() => handleCardClick('student')}>
          <AuthCard isStudent={true} title="학생 명의로 인증" />
        </CardWrapper>
        <CardWrapper onClick={() => handleCardClick('parent')}>
          <AuthCard isStudent={false} title="부모 명의로로 인증" />
        </CardWrapper>
      </CardContainer>
    </SelectUserContainer>
  );
};

const CardWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
`;

const SelectUserContainer = styled.div`
  overflow-x: hidden;
  width: 80%;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 20px;
  overflow-y: hidden;
  padding-top: 15px;
  gap: 10%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
