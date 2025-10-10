import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { cancel } from '../assets';
import { useGetApplicationDetail } from '../apis';

interface IApplicantDetailModalType {
  applicationId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ApplicantDetailModal = ({
  applicationId,
  isOpen,
  onClose,
}: IApplicantDetailModalType) => {
  const scrollPositionRef = useRef(0);
  const {
    data: application,
    isLoading,
    isError,
  } = useGetApplicationDetail(applicationId);

  useEffect(() => {
    if (isOpen) {
      scrollPositionRef.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPositionRef.current);
    }
  }, [isOpen]);

  const statusMap: Record<string, string> = {
    NOT_APPLIED: '미지원',
    WRITING: '원서 작성 중',
    SUBMITTED: '지원 완료',
    WAITING_DOCUMENTS: '서류 도착 대기',
    DOCUMENTS_RECEIVED: '서류 접수 완료',
    SCREENING_IN_PROGRESS: '전형 진행 중',
    RESULT_ANNOUNCED: '합격 여부 확인',
  };

  if (!isOpen || !applicationId) return null;

  if (isLoading)
    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose}>
            <img src={cancel} alt="x" />
          </CloseButton>
          <LoadingText>원서 정보를 불러오는 중입니다...</LoadingText>
        </ModalContent>
      </ModalOverlay>
    );

  if (isError)
    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose}>
            <img src={cancel} alt="x" />
          </CloseButton>
          <ErrorText>원서 정보를 불러오는 중 오류가 발생했습니다.</ErrorText>
        </ModalContent>
      </ModalOverlay>
    );

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <img src={cancel} alt="x" />
        </CloseButton>

        <ModalHeader>
          <ApplicantImage>
            {application?.photoUrl ? (
              <img
                src={application.photoUrl}
                alt="지원자 사진"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <ProfilePlaceholder />
            )}
          </ApplicantImage>

          <ApplicantInfo>
            <ApplicantNumber>
              접수 번호
              <NumberBadge>{application?.receiptCode ?? '-'}</NumberBadge>
            </ApplicantNumber>

            <InfoRow>
              <InfoLabel>이름</InfoLabel>
              <InfoValue>{application?.applicantName ?? '-'}</InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>생년월일</InfoLabel>
              <InfoValue>{application?.birthDate ?? '-'}</InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>지역</InfoLabel>
              <InfoValue>{application?.isDaejeon ? '대전' : '전국'}</InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>전형</InfoLabel>
              <InfoValue>
                {application?.applicationType === 'SOCIAL'
                  ? '사회통합'
                  : application?.applicationType === 'MEISTER'
                  ? '마이스터전형'
                  : application?.applicationType === 'COMMON'
                  ? '일반'
                  : '-'}
              </InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>학력</InfoLabel>
              <InfoValue>
                {application?.educationalStatus === 'PROSPECTIVE_GRADUATE'
                  ? '졸업 예정'
                  : application?.educationalStatus === 'GRADUATE'
                  ? '졸업'
                  : application?.educationalStatus === 'QUALIFICATION_EXAM'
                  ? '검정고시'
                  : '-'}
              </InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>성적</InfoLabel>
              <ScoreValue>
                {application?.scores?.totalScore ?? 0}/170
              </ScoreValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>상태</InfoLabel>
              <InfoValue>
                {application?.status
                  ? statusMap[application.status] ?? application.status
                  : '-'}
              </InfoValue>
            </InfoRow>
          </ApplicantInfo>
        </ModalHeader>

        <ModalSection>
          <SectionTitle>자기소개서</SectionTitle>
          <SectionContent>
            {application?.selfIntroduce ?? '작성된 자기소개서가 없습니다.'}
          </SectionContent>
        </ModalSection>

        <ModalSection>
          <SectionTitle>학업 계획서</SectionTitle>
          <SectionContent>
            {application?.studyPlan ?? '작성된 학업 계획서가 없습니다.'}
          </SectionContent>
        </ModalSection>

        <ModalSection>
          <SectionTitle>점수 상세</SectionTitle>
          <SectionContent>
            <ScoreRow>
              과목 점수: {application?.scores?.subjectScore ?? 0}
            </ScoreRow>
            <ScoreRow>
              출결 점수: {application?.scores?.attendanceScore ?? 0}
            </ScoreRow>
            <ScoreRow>
              봉사 점수: {application?.scores?.volunteerScore ?? 0}
            </ScoreRow>
            <ScoreRow>가산점: {application?.scores?.bonusScore ?? 0}</ScoreRow>
          </SectionContent>
        </ModalSection>

        <ParentSection>
          <SectionTitle>보호자 정보</SectionTitle>
          <SectionContent>
            <InfoRow>
              <InfoLabel>부모님 성명</InfoLabel>
              <InfoValue>{application?.parentName ?? '-'}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>부모님 연락처</InfoLabel>
              <InfoValue>{application?.parentTel ?? '-'}</InfoValue>
            </InfoRow>
          </SectionContent>
        </ParentSection>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 50%;
  height: 100vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid ${colors.gray[300]};

  @media (max-width: 1024px) {
    width: 60%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: ${colors.gray[400]};
  z-index: 10;
  padding: 4px;

  &:hover {
    color: ${colors.gray[500]};
  }
`;

const ModalHeader = styled.div`
  display: flex;
  gap: 32px;
  padding: 60px 32px 32px 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 60px 20px 20px 20px;
  }
`;

const ApplicantImage = styled.div`
  flex-shrink: 0;
  border: 1px solid ${colors.gray[300]};
  border-radius: 8px;
  overflow: hidden;
  width: 200px;
  height: 253px;
`;

const ProfilePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.gray[200]};
  border-radius: 8px;
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180" fill="%23D1D5DB"><rect width="240" height="180" fill="%23F3F4F6"/><circle cx="120" cy="70" r="25" fill="%23D1D5DB"/><path d="M70 140 Q70 115 120 115 Q170 115 170 140 L170 180 L70 180 Z" fill="%23D1D5DB"/></svg>');
  background-size: cover;
  background-position: center;
`;

const ApplicantInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 35px;
  min-width: 0;
`;

const ApplicantNumber = styled.div`
  display: flex;
  align-items: center;
  gap: 39px;
  font-size: 24px;
  font-weight: 500;
  color: ${colors.gray[500]};
`;

const NumberBadge = styled.span`
  color: ${colors.green[500]};
  font-size: 24px;
  font-weight: 500;
  text-align: right;
  flex: 1;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const InfoLabel = styled.div`
  width: 100px;
  color: ${colors.gray[500]};
  font-size: 18px;
  font-weight: 500;
`;

const InfoValue = styled.div`
  color: ${colors.gray[500]};
  font-size: 18px;
  text-align: right;
  flex: 1;
`;

const ScoreValue = styled.div`
  color: #10b981;
  font-weight: 700;
  font-size: 16px;
  text-align: right;
  flex: 1;
`;

const ModalSection = styled.div`
  padding: 24px 32px;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ParentSection = styled.div`
  padding: 24px 32px;
  margin-bottom: 65px;

  @media (max-width: 768px) {
    padding: 20px;
    margin-bottom: 60px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 500;
  color: ${colors.gray[500]};
  margin-bottom: 16px;
`;

const SectionContent = styled.div`
  line-height: 1.6;
  color: ${colors.gray[400]};
  font-size: 18px;
`;

const ScoreRow = styled.div`
  margin-bottom: 6px;
  font-size: 16px;
  color: ${colors.gray[500]};
`;

const LoadingText = styled.div`
  padding: 60px;
  text-align: center;
  color: ${colors.gray[400]};
  font-size: 18px;
`;

const ErrorText = styled.div`
  padding: 60px;
  text-align: center;
  color: red;
  font-size: 18px;
`;
