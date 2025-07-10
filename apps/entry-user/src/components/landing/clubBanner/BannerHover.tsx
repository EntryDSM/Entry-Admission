import styled from '@emotion/styled';
import {
  blipLogo,
  daedongLogo,
  dmsLogo,
  jobisLogo,
  pickLogo,
} from '../../../assets';

interface IBannerHoverType {
  selectedBanner: string;
}

export const BannerHover = ({ selectedBanner }: IBannerHoverType) => {
  const bannerContent = {
    dms: {
      icon: dmsLogo,
      title: 'DMS',
      description: '학생을 위한 단 하나의 기숙사 관리 서비스입니다.',
    },
    pick: {
      icon: pickLogo,
      title: 'PICK',
      description:
        '교내에서 온라인으로 모든 출결을 관리할 수 있습니다.\n외출 및 교실이동 신청 등 다양한 기능을 선생님이 수락하여 사용이 가능합니다.',
    },
    dormitory: {
      icon: daedongLogo,
      title: '대동여지도',
      description: '교내에서 동아리를 지원하고, 개설할 수 있습니다!',
    },
    jobis: {
      icon: jobisLogo,
      title: 'JOBIS',
      description:
        '학생들의 취업을 위한 교내의 단 하나뿐인 서비스입니다.\n학생뿐만 아니라 기업에서도 사용하고 있으며, 앱/웹으로 지원하고 있습니다!',
    },
    meal: {
      icon: dmsLogo,
      title: '마음가짐',
      description: '건강한 급식 관리 서비스입니다.',
    },
    blip: {
      icon: blipLogo,
      title: 'BLIP',
      description:
        'BLIP의 AI 어시스턴트 기능으로 회의를 분석하고 요약 해줍니다.',
    },
    xquare: {
      icon: dmsLogo,
      title: 'XQUARE',
      description: '아직 값 없어용.',
    },
  };

  const content = bannerContent[selectedBanner as keyof typeof bannerContent];

  return (
    <HoverContainer>
      <HoverContent>
        <TitleSection>
          <IconImg src={content.icon} alt={content.title} />
          <Title>{content.title}</Title>
        </TitleSection>
        <Description>{content.description}</Description>
      </HoverContent>
    </HoverContainer>
  );
};

const HoverContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 4px;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 40px;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 26px;

  @media (max-width: 1200px) {
    border-radius: 12px;
    padding: 30px;
  }

  @media (max-width: 768px) {
    border-radius: 8px;
    padding: 25px;
  }

  @media (max-width: 480px) {
    border-radius: 6px;
    padding: 20px;
  }
`;

const HoverContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  width: 100%;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    gap: 8px;
    margin-bottom: 12px;
  }
`;

const IconImg = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;

const Title = styled.h3`
  font-size: 35px;
  font-weight: 500;
  color: white;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 30px;
  }

  @media (max-width: 480px) {
    font-size: 25px;
  }
`;

const Description = styled.p`
  font-size: 25px;
  color: white;
  margin: 0;
  line-height: 1.3;
  font-weight: 600;
  white-space: pre-wrap;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
