import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { SignUpIcon } from '../../assets';

interface IAuthCardType {
  isStudent: boolean;
  title: string;
}

export const AuthCard = ({ isStudent, title }: IAuthCardType) => {
  return (
    <AuthCardContainer>
      <IconContainer>
        <SignUpIcon isStudent={isStudent} />
      </IconContainer>
      <TitleContainer>{title}</TitleContainer>
      <Description>
        <div>{isStudent ? '학생' : '부모'} 명의로 Entry DSM에</div>
        <div className="joinP">가입합니다.</div>
      </Description>
    </AuthCardContainer>
  );
};

const Description = styled.div`
  font-size: 14px;
  color: ${colors.gray[400]};
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 18px;

  .joinP {
    @media (max-width: 768px) {
      margin-bottom: 30px;
    }
  }
`;

const TitleContainer = styled.div`
  font-size: 18px;
  font-weight: 550;
  margin-top: 36px;
  margin-bottom: 10px;
`;

const IconContainer = styled.div`
  width: 160px;
  height: 160px;
  background-color: ${colors.gray[50]};
  border-radius: 50%;
  padding: 55px 45px;
  margin-top: 55px;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 45px 25px;
    margin-top: 25px;
  }
`;

const AuthCardContainer = styled.div`
  width: 100%;
  max-width: 340px;
  height: 400px;
  border: 1px solid ${colors.gray[300]};
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  @media (max-width: 768px) {
    max-width: 100%;
    height: 380px;
  }
`;
