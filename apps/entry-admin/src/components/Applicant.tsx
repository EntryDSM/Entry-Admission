import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

interface IApplicantType {
  number: number;
  name: string;
  region: string;
  admission: string;
  received: boolean;
  submitted: boolean;
}

export const Applicant = ({
  number,
  name,
  region,
  admission,
  received,
  submitted,
}: IApplicantType) => {
  return (
    <Container>
      <LeftContent>
        <Content>{number}</Content>
        <Content>{name}</Content>
        <Content className="tablet-hidden">{region}</Content>
        <Content className="mobile-hidden">{admission}</Content>
      </LeftContent>
      <RightContent>
        <Content className="mobile-hidden">{received ? 'O' : 'X'}</Content>
        <Content>{submitted ? 'O' : 'X'}</Content>
      </RightContent>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: object-fit;
  border-bottom: 1px solid ${colors.gray[300]};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    overflow-x: auto;
  }

  .mobile-hidden {
    @media (max-width: 600px) {
      display: none;
    }
  }

  .tablet-hidden {
    @media (max-width: 400px) {
      display: none;
    }
  }
`;

const LeftContent = styled.div`
  display: flex;
  align-items: center;

  > div:nth-of-type(1) {
    width: 80px;
    text-align: center;
  } /* 접수 번호 */
  > div:nth-of-type(2) {
    width: 80px;
    text-align: center;
  } /* 이름 */
  > div:nth-of-type(3) {
    width: 80px;
    text-align: center;
  } /* 지역 */
  > div:nth-of-type(4) {
    width: 150px;
    text-align: center;
  } /* 전형 */

  @media (max-width: 1200px) {
    > div:nth-of-type(1) {
      width: 70px;
    }
    > div:nth-of-type(2) {
      width: 70px;
    }
    > div:nth-of-type(3) {
      width: 70px;
    }
    > div:nth-of-type(4) {
      width: 120px;
    }
  }

  @media (max-width: 768px) {
    > div:nth-of-type(1) {
      width: 60px;
    }
    > div:nth-of-type(2) {
      width: 60px;
    }
    > div:nth-of-type(3) {
      width: 60px;
    }
    > div:nth-of-type(4) {
      width: 100px;
    }
  }

  @media (max-width: 600px) {
    > div:nth-of-type(1) {
      width: 50px;
    }
    > div:nth-of-type(2) {
      width: 50px;
    }
    > div:nth-of-type(3) {
      width: 50px;
    }
    > div:nth-of-type(4) {
      width: 80px;
    }
  }
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 30%;
  flex: 1;

  > div {
    width: 120px;
    text-align: center;
  }

  @media (max-width: 1200px) {
    > div {
      width: 100px;
    }
  }

  @media (max-width: 768px) {
    > div {
      width: 80px;
    }
  }

  @media (max-width: 600px) {
    > div {
      width: 70px;
    }
  }
`;

const Content = styled.div`
  font-size: 16px;
  color: ${colors.gray[400]};
  padding: 32px 0;

  @media (max-width: 1200px) {
    padding: 24px 0;
  }

  @media (max-width: 768px) {
    padding: 20px 0;
  }

  @media (max-width: 600px) {
    padding: 16px 0;
    font-size: 14px;
  }

  @media (max-width: 400px) {
    padding: 12px 0;
    font-size: 13px;
  }
`;
