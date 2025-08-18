import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { cancel } from '../assets';

interface IApplicantType {
  number: number;
  name: string;
  region: string;
  admission: string;
  received: boolean;
  submitted: boolean;
}

interface IApplicantDetailModalType {
  applicant: IApplicantType | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ApplicantDetailModal = ({
  applicant,
  isOpen,
  onClose,
}: IApplicantDetailModalType) => {
  const scrollPositionRef = useRef(0);

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

  if (!isOpen || !applicant) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <img src={cancel} alt="x" />
        </CloseButton>

        <ModalHeader>
          <ApplicantImage>
            <ProfilePlaceholder />
          </ApplicantImage>
          <ApplicantInfo>
            <ApplicantNumber>
              접수 번호 <NumberBadge>{applicant.number}번</NumberBadge>
            </ApplicantNumber>
            <InfoRow>
              <InfoLabel>이름</InfoLabel>
              <InfoValue>{applicant.name}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>지역</InfoLabel>
              <InfoValue>{applicant.region}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>전형</InfoLabel>
              <InfoValue>{applicant.admission}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>성적</InfoLabel>
              <ScoreValue>100/170</ScoreValue>
            </InfoRow>
          </ApplicantInfo>
        </ModalHeader>

        <ModalSection>
          <SectionTitle>자기소개서</SectionTitle>
          <SectionContent>
            자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서자기소개서
          </SectionContent>
        </ModalSection>

        <ModalSection>
          <SectionTitle>학업 계획서</SectionTitle>
          <SectionContent>
            홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동홍길동
          </SectionContent>
        </ModalSection>
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
  top: 16px;
  right: 20px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: ${colors.gray[400]};
  z-index: 10;

  &:hover {
    color: ${colors.gray[500]};
  }
`;

const ModalHeader = styled.div`
  display: flex;
  gap: 32px;
  padding: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 20px;
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
  position: relative;
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
  margin-right: 40%;
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
  width: 60px;
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
