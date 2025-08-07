import { useState } from 'react';
import styled from '@emotion/styled';
import {
  Applicant,
  ApplicantExortBtn,
  CheckBox,
  FindApplicantInput,
} from '../components';
import { colors } from '@entry/design-token';

const ApplicantsListMock = [
  {
    number: 1,
    name: '홍길동',
    region: '대전',
    admission: '마이스터 인재 전형',
    received: true,
    submitted: false,
  },
  {
    number: 1,
    name: '홍길동',
    region: '대전',
    admission: '마이스터 인재 전형',
    received: true,
    submitted: false,
  },
  {
    number: 1,
    name: '홍길동',
    region: '대전',
    admission: '마이스터 인재 전형',
    received: true,
    submitted: false,
  },
];

type FilterGroupType = 'region' | 'admission' | 'status';

const regionOptions = [
  { key: 'daejeon', label: '대전', isNationwide: false },
  { key: 'nationwide', label: '전국', isNationwide: true },
] as const;

const admissionOptions = [
  { key: 'general', label: '일반 전형' },
  { key: 'meister', label: '마이스터 인재 전형' },
  { key: 'social', label: '사회통합 전형' },
] as const;

const statusOptions = [
  { key: 'received', label: '원서 도착' },
  { key: 'submitted', label: '최종 제출' },
] as const;

const buttonText = [
  '지원자 검증 목록 출력',
  '수험표 출력',
  '지원자 코드 출력',
  '지원자 목록 출력',
];

type RegionKey = (typeof regionOptions)[number]['key'];
type AdmissionKey = (typeof admissionOptions)[number]['key'];
type StatusKey = (typeof statusOptions)[number]['key'];

export const ApplicantsList = () => {
  const [filters, setFilters] = useState<{
    region: Record<RegionKey, boolean>;
    admission: Record<AdmissionKey, boolean>;
    status: Record<StatusKey, boolean>;
  }>({
    region: {
      daejeon: false,
      nationwide: false,
    },
    admission: {
      general: false,
      meister: false,
      social: false,
    },
    status: {
      received: false,
      submitted: false,
    },
  });

  const handleCheckBoxChange = <
    G extends FilterGroupType,
    K extends keyof (typeof filters)[G]
  >(
    group: G,
    key: K
  ) => {
    setFilters((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [key]: !prev[group][key],
      },
    }));
  };

  const handleButtonClick = () => {
    // 버튼 클릭했을 때의 로직
  };

  return (
    <Container>
      <FindApplicantInput />

      <FilterControl>
        <LabelContainer>
          <Section>
            {regionOptions.map((item) => (
              <CheckBox
                key={item.key}
                label={item.label}
                isChecked={filters.region[item.key]}
                onChange={() => handleCheckBoxChange('region', item.key)}
              />
            ))}
          </Section>

          <Section id="admission">
            {admissionOptions.map((item) => (
              <CheckBox
                key={item.key}
                label={item.label}
                isChecked={filters.admission[item.key]}
                onChange={() => handleCheckBoxChange('admission', item.key)}
              />
            ))}
          </Section>

          <Section>
            {statusOptions.map((item) => (
              <CheckBox
                key={item.key}
                label={item.label}
                isChecked={filters.status[item.key]}
                onChange={() => handleCheckBoxChange('status', item.key)}
              />
            ))}
          </Section>
        </LabelContainer>

        <ButtonContainer>
          {buttonText.map((text, idx) => (
            <ApplicantExortBtn
              key={idx}
              text={text}
              onClick={handleButtonClick}
            />
          ))}
        </ButtonContainer>
      </FilterControl>

      {/* 지원자 목록 */}
      <ApplicantsTitle>
        <LeftTitle>
          <Title>접수 번호</Title>
          <Title>이름</Title>
          <Title className="tablet-hidden">지역</Title>
          <Title className="mobile-hidden">전형</Title>
        </LeftTitle>
        <RightTitle>
          <Title className="mobile-hidden">원서 도착 상태</Title>
          <Title>최종 제출 여부</Title>
        </RightTitle>
      </ApplicantsTitle>

      <ApplicantsAllList>
        {ApplicantsListMock.map((applicant) => (
          <Applicant
            key={applicant.number}
            number={applicant.number}
            name={applicant.name}
            region={applicant.region}
            admission={applicant.admission}
            received={applicant.received}
            submitted={applicant.submitted}
          />
        ))}
      </ApplicantsAllList>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const FilterControl = styled.div`
  width: 100%;
  height: 48px;
  max-width: 1540px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  gap: 19px;

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
    gap: 16px;
  }
`;

const LabelContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  height: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    gap: 12px;
  }

  #admission {
    border-inline: 1px solid ${colors.gray[300]};
    padding-right: 8px;

    @media (max-width: 768px) {
      border: none;
      padding-right: 0;
    }
  }
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 1024px) {
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    max-width: 400px;
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const ApplicantsTitle = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 30px;
  border-bottom: 1px solid ${colors.gray[300]};

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

const LeftTitle = styled.div`
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

const RightTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 30%;
  flex: 1; /* 자동 확장 */

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

const Title = styled.div`
  font-size: 16px;
  color: ${colors.gray[400]};

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const ApplicantsAllList = styled.div`
  width: 100%;
`;
