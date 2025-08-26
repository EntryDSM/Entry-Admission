import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { toast } from 'react-toastify';

interface IApplicantType {
  number: number;
  name: string;
  region: string;
  admission: string;
  received: boolean;
  submitted: boolean;
  onClick?: () => void;
  onReceivedChange?: (received: boolean) => void;
  onSubmittedChange?: (submitted: boolean) => void;
}

export const Applicant = ({
  number,
  name,
  region,
  admission,
  received,
  submitted,
  onClick,
  onReceivedChange,
  onSubmittedChange,
}: IApplicantType) => {
  const handleReceivedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onReceivedChange?.(e.target.checked);
    toast.success('원서 도착 상태가 변경되었습니다.');
  };

  const handleSubmittedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSubmittedChange?.(e.target.checked);
    toast.success('최종 제출 상태가 변경되었습니다.');
  };

  return (
    <Container onClick={onClick}>
      <LeftContent>
        <Content>{number}</Content>
        <Content>{name}</Content>
        <Content className="tablet-hidden">{region}</Content>
        <Content className="mobile-hidden">{admission}</Content>
      </LeftContent>
      <RightContent>
        <CheckboxContent className="mobile-hidden">
          <StyledCheckbox
            type="checkbox"
            checked={received}
            onChange={handleReceivedChange}
            onClick={(e) => e.stopPropagation()}
          />
        </CheckboxContent>
        <CheckboxContent>
          <StyledCheckbox
            type="checkbox"
            checked={submitted}
            onChange={handleSubmittedChange}
            onClick={(e) => e.stopPropagation()}
          />
        </CheckboxContent>
      </RightContent>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: object-fit;
  border-top: 1px solid ${colors.gray[300]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

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

  @media (max-width: 1200px) {
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 600px) {
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

const CheckboxContent = styled.div`
  width: 120px;
  text-align: center;
  padding: 32px 0;

  @media (max-width: 1200px) {
    width: 100px;
    padding: 24px 0;
  }

  @media (max-width: 768px) {
    width: 80px;
    padding: 20px 0;
  }

  @media (max-width: 600px) {
    width: 70px;
    padding: 16px 0;
  }

  @media (max-width: 400px) {
    padding: 12px 0;
  }
`;

const StyledCheckbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #4ade80;

  @media (max-width: 600px) {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 400px) {
    width: 14px;
    height: 14px;
  }
`;
