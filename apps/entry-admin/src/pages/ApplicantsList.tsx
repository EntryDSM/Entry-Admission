import { useEffect, useMemo, useState } from 'react';
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
import {
  IApplicationAllListRequest,
  IApplicationType,
} from '../apis/application/types';
import {
  useDownloadAdmissionTicketExcel,
  useDownloadApplicantCodesExcel,
  useDownloadApplicationInfoExcel,
  useDownloadCheckListExcel,
  useGetApplicationAllList,
  usePostExamNumber,
} from '../apis';

type FilterGroupType = 'region' | 'admission' | 'status' | 'education';

const regionOptions = [
  { key: 'daejeon', label: '대전', isNationwide: false },
  { key: 'nationwide', label: '전국', isNationwide: true },
] as const;

const admissionOptions = [
  { key: 'general', label: '일반 전형' },
  { key: 'meister', label: '마이스터 인재 전형' },
  { key: 'social', label: '사회통합 전형' },
] as const;

const statusOptions = [{ key: 'received', label: '원서 도착' }] as const;

const educationOptions = [
  { key: 'prospective', label: '졸업 예정' },
  { key: 'graduate', label: '졸업' },
  { key: 'exam', label: '검정고시' },
] as const;

type RegionKey = (typeof regionOptions)[number]['key'];
type AdmissionKey = (typeof admissionOptions)[number]['key'];
type StatusKey = (typeof statusOptions)[number]['key'];
type EducationKey = (typeof educationOptions)[number]['key'];

export const ApplicantsList = () => {
  const [applicantsList, setApplicantsList] = useState<IApplicationType[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedApplicant, setSelectedApplicant] =
    useState<IApplicationType | null>(null);
  const [filters, setFilters] = useState<{
    region: Record<RegionKey, boolean>;
    admission: Record<AdmissionKey, boolean>;
    status: Record<StatusKey, boolean>;
    education: Record<EducationKey, boolean>;
  }>({
    region: { daejeon: false, nationwide: false },
    admission: { general: false, meister: false, social: false },
    status: { received: false },
    education: { prospective: false, graduate: false, exam: false },
  });

  const { mutate: downloadExcel } = useDownloadCheckListExcel();
  const { mutate: downloadApplicationInfo } = useDownloadApplicationInfoExcel();
  const { mutate: downloadApplicantCodes } = useDownloadApplicantCodesExcel();
  const { mutate: downloadAdmissionTicket } = useDownloadAdmissionTicketExcel();

  const { mutate: postExamNumber } = usePostExamNumber();

  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen, open, close } = useModal();

  const handleSearchChange = (keyword: string) => {
    setSearchKeyword(keyword);
    setCurrentPage(1);
  };

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

  const handleApplicantClick = (applicant: IApplicationType) => {
    setSelectedApplicant(applicant);
    open();
  };

  const getFilterParams = (): IApplicationAllListRequest => {
    const params: Partial<IApplicationAllListRequest> = {
      page: currentPage - 1,
      size: 20,
    };

    // 지역 필터만 API로 전달 (대전/전국 둘 중 하나만 선택된 경우)
    const isDaejeonSelected = filters.region.daejeon;
    const isNationwideSelected = filters.region.nationwide;
    if (isDaejeonSelected !== isNationwideSelected) {
      params.isDaejeon = isDaejeonSelected;
    }

    // 나머지 필터는 클라이언트에서 처리
    return params as IApplicationAllListRequest;
  };

  const filterParams = useMemo(
    () => getFilterParams(),
    [filters, currentPage, searchKeyword]
  );

  const { data, isLoading, refetch } = useGetApplicationAllList(filterParams);

  useEffect(() => {
    if (data?.data.applications) {
      setApplicantsList(data.data.applications);
    }
  }, [data]);

  useEffect(() => {
    refetch({ cancelRefetch: false });
  }, [filterParams]);

  // 클라이언트 사이드 필터링
  const filteredApplicants = useMemo(() => {
    let filtered = applicantsList;

    // 검색어 필터
    if (searchKeyword) {
      filtered = filtered.filter((a) =>
        a.applicantName
          .toLocaleLowerCase()
          .includes(searchKeyword.toLocaleLowerCase())
      );
    }

    // 전형 필터 (여러 개 선택 가능)
    const selectedAdmissions = Object.entries(filters.admission)
      .filter(([, v]) => v)
      .map(([k]) => k as AdmissionKey);

    if (selectedAdmissions.length > 0) {
      const admissionMap: Record<AdmissionKey, string> = {
        general: 'COMMON',
        meister: 'MEISTER',
        social: 'SOCIAL',
      };
      const allowedTypes = selectedAdmissions.map((k) => admissionMap[k]);
      filtered = filtered.filter((a) =>
        allowedTypes.includes(a.applicationType)
      );
    }

    // 학력 필터 (여러 개 선택 가능)
    const selectedEducation = Object.entries(filters.education)
      .filter(([, v]) => v)
      .map(([k]) => k as EducationKey);

    if (selectedEducation.length > 0) {
      const educationMap: Record<EducationKey, string> = {
        prospective: 'PROSPECTIVE_GRADUATE',
        graduate: 'GRADUATE',
        exam: 'QUALIFICATION_EXAM',
      };
      const allowedEducation = selectedEducation.map((k) => educationMap[k]);
      filtered = filtered.filter((a) =>
        allowedEducation.includes(a.educationalStatus)
      );
    }

    // 원서 도착 필터
    if (filters.status.received) {
      filtered = filtered.filter((a) => a.isArrived === true);
    }

    // 정렬
    return filtered.sort((a, b) => a.receiptCode - b.receiptCode);
  }, [applicantsList, searchKeyword, filters]);

  // 검색이나 클라이언트 필터가 있으면 클라이언트 사이드 페이지네이션, 아니면 서버 페이지네이션
  const hasClientFilters =
    searchKeyword ||
    Object.values(filters.admission).some(v => v) ||
    Object.values(filters.education).some(v => v) ||
    filters.status.received;

  const totalPage = hasClientFilters
    ? Math.max(1, Math.ceil(filteredApplicants.length / 20))
    : (data?.data.totalPages ?? 1);

  // 클라이언트 필터가 있으면 페이지별로 데이터 자르기
  const paginatedApplicants = useMemo(() => {
    if (hasClientFilters) {
      const startIndex = (currentPage - 1) * 20;
      const endIndex = startIndex + 20;
      return filteredApplicants.slice(startIndex, endIndex);
    }
    return filteredApplicants;
  }, [filteredApplicants, currentPage, hasClientFilters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <HeadContent>
        <FindApplicantInput onSearch={handleSearchChange} />
        <ButtonContiner>
          <Button
            color={colors.extra.realWhite}
            backgroundColor={colors.green[400]}
            hoverBackgroundColor={colors.green[500]}
            children="수험번호 업데이트"
            onClick={() => postExamNumber()}
          />
          <Button
            color={colors.extra.realWhite}
            backgroundColor={colors.green[400]}
            hoverBackgroundColor={colors.green[500]}
            children="지원서 점검표 출력"
            onClick={() => downloadExcel()}
          />
          <Button
            color={colors.extra.realWhite}
            backgroundColor={colors.green[400]}
            hoverBackgroundColor={colors.green[500]}
            children="전형 자료 출력"
            onClick={() => downloadApplicationInfo()}
          />
          <Button
            color={colors.extra.realWhite}
            backgroundColor={colors.green[400]}
            hoverBackgroundColor={colors.green[500]}
            children="1차 합격자 번호 목록 출력"
            onClick={() => downloadApplicantCodes()}
          />
          <Button
            color={colors.extra.realWhite}
            backgroundColor={colors.green[400]}
            hoverBackgroundColor={colors.green[500]}
            children="수험표 출력"
            onClick={() => downloadAdmissionTicket()}
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

          <Section>
            {educationOptions.map((item) => (
              <CheckBox
                key={item.key}
                label={item.label}
                isChecked={filters.education[item.key]}
                onChange={() => handleCheckBoxChange('education', item.key)}
              />
            ))}
          </Section>
        </LabelContainer>
      </FilterControl>

      <ApplicantsTitle>
        <LeftTitle>
          <Title>접수 번호</Title>
          <Title>이름</Title>
          <Title>지역</Title>
          <Title>전형</Title>
          <Title>학력</Title>
          <Title>원서 도착</Title>
          <Title>최종 제출</Title>
        </LeftTitle>
      </ApplicantsTitle>

      <ApplicantsAllList>
        {isLoading ? (
          <LoadingContent>지원자 조회 데이터 기다리는 중...</LoadingContent>
        ) : paginatedApplicants.length === 0 ? (
          <LoadingContent>지원자 내역이 없습니다.</LoadingContent>
        ) : (
          paginatedApplicants.map((applicant) => (
            <Applicant
              key={applicant.applicationId}
              applicationId={applicant.applicationId}
              receiptCode={applicant.receiptCode}
              applicationType={applicant.applicationType}
              applicantName={applicant.applicantName}
              educationalStatus={applicant.educationalStatus}
              status={applicant.status}
              submittedAt={applicant.submittedAt}
              isDaejeon={applicant.isDaejeon}
              isArrived={applicant.isArrived}
              onClick={() => handleApplicantClick(applicant)}
            />
          ))
        )}
      </ApplicantsAllList>

      {selectedApplicant && (
        <ApplicantDetailModal
          applicationId={selectedApplicant.applicationId}
          isOpen={isOpen}
          onClose={close}
        />
      )}

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
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-top: 16px;
  flex-wrap: wrap;
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
  flex-direction: column;
  align-items: center;
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 100%;
  max-width: 1200px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  #admission {
    border-inline: none;
    padding: 0;
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
  width: 100%;

  > div {
    text-align: center;
    flex-shrink: 0;
  }

  > div:nth-of-type(1) {
    width: 100px;
  }
  > div:nth-of-type(2) {
    width: 100px;
  }
  > div:nth-of-type(3) {
    width: 100px;
  }
  > div:nth-of-type(4) {
    width: 140px;
  }
  > div:nth-of-type(5) {
    width: 120px;
  }
  > div:nth-of-type(6) {
    width: 120px;
  }
  > div:nth-of-type(7) {
    width: 120px;
  }

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

const LoadingContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.gray[400]};
  margin-top: 80px;
`;
