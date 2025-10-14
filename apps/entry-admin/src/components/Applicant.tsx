import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { IApplicationType } from '../apis/application/types';
import { usePatchPrintsArrived, usePatchPrintsNotArrived } from '../apis';
import { useCallback } from 'react';

type IApplicationComponentType = IApplicationType & {
  onClick: () => void;
};

export const Applicant = ({
  applicationId,
  receiptCode,
  applicantName,
  applicationType,
  educationalStatus,
  isDaejeon,
  isArrived,
  onClick,
}: IApplicationComponentType) => {
  const { mutate: patchArrived } = usePatchPrintsArrived();
  const { mutate: patchNotArrived } = usePatchPrintsNotArrived();

  const handleCheckBoxClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();

      if (!receiptCode) return;

      if (isArrived) {
        patchNotArrived(receiptCode, {
          onSuccess: () => setTimeout(() => window.location.reload(), 500),
        });
      } else {
        patchArrived(receiptCode, {
          onSuccess: () => setTimeout(() => window.location.reload(), 500),
        });
      }
    },
    [isArrived, receiptCode, patchArrived, patchNotArrived]
  );

  return (
    <Container key={applicationId} onClick={onClick}>
      <LeftContent>
        <Content>{receiptCode || '-'}</Content>
        <Content>{applicantName}</Content>
        <Content className="tablet-hidden">
          {isDaejeon ? '대전' : '전국'}
        </Content>
        <Content className="mobile-hidden">
          {applicationType === 'SOCIAL'
            ? '사회통합'
            : applicationType === 'MEISTER'
            ? '마이스터전형'
            : applicationType === 'COMMON'
            ? '일반'
            : '-'}
        </Content>
        <Content>
          {educationalStatus === 'PROSPECTIVE_GRADUATE'
            ? '졸업 예정'
            : educationalStatus === 'GRADUATE'
            ? '졸업'
            : educationalStatus === 'QUALIFICATION_EXAM'
            ? '검정고시'
            : '-'}
        </Content>
        <CheckboxContent className="mobile-hidden">
          <StyledCheckbox
            type="checkbox"
            checked={!!isArrived}
            onClick={handleCheckBoxClick}
            readOnly
          />
        </CheckboxContent>
        <CheckboxContent className="mobile-hidden">
          {isArrived ? '완료' : '미완료'}
        </CheckboxContent>
      </LeftContent>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: object-fit;
  border-top: 1px solid ${colors.gray[300]};
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
  width: 100%;

  > div {
    text-align: center;
    flex-shrink: 0;
  }

  > div:nth-of-type(1) {
    width: 100px;
  } /* 접수 번호 */
  > div:nth-of-type(2) {
    width: 100px;
  } /* 이름 */
  > div:nth-of-type(3) {
    width: 100px;
  } /* 지역 */
  > div:nth-of-type(4) {
    width: 140px;
  } /* 전형 */
  > div:nth-of-type(5) {
    width: 120px;
  } /* 학력 */
  > div:nth-of-type(6) {
    width: 120px;
  } /* 원서 도착 */
  > div:nth-of-type(7) {
    width: 120px;
  } /* 최종 제출 */

  @media (max-width: 1200px) {
    > div:nth-of-type(1) {
      width: 90px;
    }
    > div:nth-of-type(2) {
      width: 90px;
    }
    > div:nth-of-type(3) {
      width: 90px;
    }
    > div:nth-of-type(4) {
      width: 120px;
    }
    > div:nth-of-type(5) {
      width: 100px;
    }
    > div:nth-of-type(6) {
      width: 100px;
    }
    > div:nth-of-type(7) {
      width: 100px;
    }
  }

  @media (max-width: 768px) {
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
      width: 100px;
    }
    > div:nth-of-type(5) {
      width: 80px;
    }
    > div:nth-of-type(6) {
      width: 80px;
    }
    > div:nth-of-type(7) {
      width: 80px;
    }
  }

  @media (max-width: 600px) {
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
      width: 80px;
    }
    > div:nth-of-type(5) {
      width: 70px;
    }
    > div:nth-of-type(6) {
      width: 70px;
    }
    > div:nth-of-type(7) {
      width: 70px;
    }
  }
`;

const Content = styled.div`
  font-size: 16px;
  color: ${colors.gray[400]};
  padding: 32px 0;
  display: flex;
  align-items: center;
  justify-content: center;

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
  padding: 32px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: ${colors.gray[400]};

  @media (max-width: 1200px) {
    padding: 24px 0;
  }

  @media (max-width: 768px) {
    padding: 20px 0;
  }

  @media (max-width: 600px) {
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
