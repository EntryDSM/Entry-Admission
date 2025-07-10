import styled from '@emotion/styled';
import { blip, daedong, dms, jobis, pick } from '../../../assets';
import { BannerHover } from './BannerHover';

interface IBannerDisplayType {
  selectedBanner: string;
}

export const BannerDisplay = ({ selectedBanner }: IBannerDisplayType) => {
  const bannerImages = {
    dms,
    pick,
    dormitory: daedong,
    jobis,
    meal: dms,
    blip,
    xquare: dms,
  };

  const banners = [
    'dms',
    'pick',
    'dormitory',
    'jobis',
    'meal',
    'blip',
    'xquare',
  ];
  const currentIndex = banners.indexOf(selectedBanner);

  return (
    <DisplayContainer>
      <BannerWrapper>
        <BannerImage
          src={bannerImages[selectedBanner as keyof typeof bannerImages]}
          alt={selectedBanner}
        />
        <BannerHover selectedBanner={selectedBanner} />
      </BannerWrapper>
      <IndicatorGroup>
        {banners.map((_, index) => (
          <Indicator key={index} isActive={index === currentIndex} />
        ))}
      </IndicatorGroup>
    </DisplayContainer>
  );
};

const DisplayContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 0;
  border-radius: 0;
  min-height: 400px;
  position: relative;
  overflow: hidden;
  width: 100%;

  @media (max-width: 1200px) {
    min-height: 350px;
  }

  @media (max-width: 768px) {
    min-height: 300px;
  }

  @media (max-width: 480px) {
    min-height: 250px;
  }
`;

const BannerWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;

  @media (max-width: 1200px) {
    border-radius: 12px;
  }

  @media (max-width: 768px) {
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    border-radius: 6px;
  }

  &:hover div {
    opacity: 1;
  }
`;

const BannerImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 16px;

  @media (max-width: 1200px) {
    border-radius: 12px;
  }

  @media (max-width: 768px) {
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    border-radius: 6px;
  }
`;

const IndicatorGroup = styled.div`
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 10;

  @media (max-width: 1200px) {
    right: 24px;
    gap: 10px;
  }

  @media (max-width: 768px) {
    right: 20px;
    gap: 8px;
    bottom: 20px;
    top: auto;
    transform: none;
    flex-direction: row;
    justify-content: center;
  }

  @media (max-width: 480px) {
    right: 16px;
    bottom: 16px;
    gap: 6px;
  }
`;

const Indicator = styled.div<{ isActive?: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ isActive }) => (isActive ? '#ff6b35' : '#666666')};
  transition: all 0.3s ease;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.6)};
  z-index: 10;

  @media (max-width: 1200px) {
    width: 9px;
    height: 9px;
  }

  @media (max-width: 768px) {
    width: 8px;
    height: 8px;
  }

  @media (max-width: 480px) {
    width: 6px;
    height: 6px;
  }
`;
