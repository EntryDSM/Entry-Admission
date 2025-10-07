import { useState } from 'react';
import styled from '@emotion/styled';
import {
  Applicant,
  ApplicantDetailModal,
  CheckBox,
  FindApplicantInput,
  PagiNation,
} from '../components';
import { colors } from '@entry/design-token';
import { Button, useModal } from '@entry/ui';

interface IApplicantType {
  number: number;
  name: string;
  region: string;
  admission: string;
  received: boolean;
  submitted: boolean;
}

const ApplicantsListMockData = [
  {
    number: 1,
    name: '홍길동',
    region: '대전',
    admission: '마이스터 인재 전형',
    received: true,
    submitted: false,
  },
  {
    number: 2,
    name: '김철수',
    region: '전국',
    admission: '일반 전형',
    received: true,
    submitted: true,
  },
  {
    number: 3,
    name: '박영희',
    region: '대전',
    admission: '사회통합 전형',
    received: false,
    submitted: false,
  },
  {
    number: 4,
    name: '이민수',
    region: '전국',
    admission: '마이스터 인재 전형',
    received: true,
    submitted: false,
  },
  {
    number: 5,
    name: '정수진',
    region: '대전',
    admission: '일반 전형',
    received: true,
    submitted: true,
  },
  {
    number: 6,
    name: '최영준',
    region: '전국',
    admission: '사회통합 전형',
    received: false,
    submitted: false,
  },
  {
    number: 7,
    name: '강민지',
    region: '대전',
    admission: '마이스터 인재 전형',
    received: true,
    submitted: false,
  },
  {
    number: 8,
    name: '윤서준',
    region: '전국',
    admission: '일반 전형',
    received: true,
    submitted: true,
  },
  {
    number: 9,
    name: '임하은',
    region: '대전',
    admission: '사회통합 전형',
    received: false,
    submitted: false,
  },
  {
    number: 10,
    name: '장도현',
    region: '전국',
    admission: '마이스터 인재 전형',
    received: true,
    submitted: false,
  },
  {
    number: 11,
    name: '조예린',
    region: '대전',
    admission: '일반 전형',
    received: true,
    submitted: true,
  },
  {
    number: 12,
    name: '신우혁',
    region: '전국',
    admission: '사회통합 전형',
    received: false,
    submitted: false,
  },
  {
    number: 13,
    name: '김나영',
    region: '대전',
    admission: '마이스터 인재 전형',
    received: true,
    submitted: false,
  },
  {
    number: 14,
    name: '이준호',
    region: '전국',
    admission: '일반 전형',
    received: true,
    submitted: true,
  },
  {
    number: 15,
    name: '박서연',
    region: '대전',
    admission: '사회통합 전형',
    received: false,
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

type RegionKey = (typeof regionOptions)[number]['key'];
type AdmissionKey = (typeof admissionOptions)[number]['key'];
type StatusKey = (typeof statusOptions)[number]['key'];

export const ApplicantsList = () => {
  // 지원자 리스트 상태 관리
  const [applicantsList, setApplicantsList] = useState<IApplicantType[]>(
    ApplicantsListMockData
  );
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const [filters, setFilters] = useState<{
    region: Record<RegionKey, boolean>;
    admission: Record<AdmissionKey, boolean>;
    status: Record<StatusKey, boolean>;
  }>({
    region: { daejeon: false, nationwide: false },
    admission: { general: false, meister: false, social: false },
    status: { received: false, submitted: false },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;
  const [selectedApplicant, setSelectedApplicant] =
    useState<IApplicantType | null>(null);
  const { isOpen, open, close } = useModal();

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
    setCurrentPage(1);
  };

  const handleApplicantClick = (applicant: IApplicantType) => {
    setSelectedApplicant(applicant);
    open();
  };

  // received 상태 업데이트
  const handleReceivedChange = (number: number, received: boolean) => {
    setApplicantsList((prev) =>
      prev.map((applicant) =>
        applicant.number === number ? { ...applicant, received } : applicant
      )
    );
  };

  // submitted 상태 업데이트
  const handleSubmittedChange = (number: number, submitted: boolean) => {
    setApplicantsList((prev) =>
      prev.map((applicant) =>
        applicant.number === number ? { ...applicant, submitted } : applicant
      )
    );
  };

  // 필터링 로직 (검색까지 포함)
  const filteredApplicants = applicantsList.filter((a) => {
    // 검색 키워드 검사 (이름 기준)
    const matchKeyword = a.name.includes(searchKeyword);

    const regionActive = Object.values(filters.region).some(Boolean);
    const admissionActive = Object.values(filters.admission).some(Boolean);
    const statusActive = Object.values(filters.status).some(Boolean);

    const regionOk =
      !regionActive ||
      (filters.region.daejeon && a.region === '대전') ||
      (filters.region.nationwide && a.region === '전국');

    const admissionOk =
      !admissionActive ||
      (filters.admission.general && a.admission === '일반 전형') ||
      (filters.admission.meister && a.admission === '마이스터 인재 전형') ||
      (filters.admission.social && a.admission === '사회통합 전형');

    const statusOk =
      !statusActive ||
      (filters.status.received && a.received) ||
      (filters.status.submitted && a.submitted);

    return matchKeyword && regionOk && admissionOk && statusOk;
  });

  const totalPage = Math.ceil(filteredApplicants.length / itemPerPage) || 1;
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentApplicants = filteredApplicants.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <HeadContent>
        <FindApplicantInput onSearch={setSearchKeyword} />
        <ButtonContiner>
          <Button
            color={colors.extra.realWhite}
            backgroundColor={colors.green[400]}
            hoverBackgroundColor={colors.green[500]}
            children="수험번호 업데이트"
          />
          <Button
            color={colors.extra.realWhite}
            backgroundColor={colors.green[400]}
            hoverBackgroundColor={colors.green[500]}
            children="Excel로 내보내기"
          />
        </ButtonContiner>
      </HeadContent>

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
        {currentApplicants.map((applicant) => (
          <Applicant
            key={applicant.number}
            number={applicant.number}
            name={applicant.name}
            region={applicant.region}
            admission={applicant.admission}
            received={applicant.received}
            submitted={applicant.submitted}
            onClick={() => handleApplicantClick(applicant)}
            onReceivedChange={(received) =>
              handleReceivedChange(applicant.number, received)
            }
            onSubmittedChange={(submitted) =>
              handleSubmittedChange(applicant.number, submitted)
            }
          />
        ))}
      </ApplicantsAllList>

      {selectedApplicant && (
        <ApplicantDetailModal
          applicant={selectedApplicant}
          isOpen={isOpen}
          onClose={close}
        />
      )}

      {/* 페이지네이션 */}
      <PagiNation
        currentPage={currentPage}
        totalPage={totalPage}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

const ButtonContiner = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const HeadContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const ApplicantsTitle = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 30px;

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
  }
  > div:nth-of-type(2) {
    width: 80px;
    text-align: center;
  }
  > div:nth-of-type(3) {
    width: 80px;
    text-align: center;
  }
  > div:nth-of-type(4) {
    width: 150px;
    text-align: center;
  }

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
