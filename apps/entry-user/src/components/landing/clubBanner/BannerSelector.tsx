import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

interface IBannerSelectorType {
  selectedBanner: string;
  onBannerChange: (banner: string) => void;
}

export const BannerSelector = ({
  selectedBanner,
  onBannerChange,
}: IBannerSelectorType) => {
  const banners = [
    { id: 'dms', label: 'DMS' },
    { id: 'pick', label: 'PiCK' },
    { id: 'dormitory', label: '대동여지도' },
    { id: 'jobis', label: 'JOBIS' },
    { id: 'blip', label: 'BLIP' },
  ];

  return (
    <SelectorContainer>
      {banners.map((banner) => (
        <TabButton
          key={banner.id}
          isActive={selectedBanner === banner.id}
          onClick={() => onBannerChange(banner.id)}
        >
          {banner.label}
        </TabButton>
      ))}
    </SelectorContainer>
  );
};

const SelectorContainer = styled.div`
  display: flex;
  gap: 15px;
  border-radius: 8px;
  padding: 4px;
  overflow-x: auto;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    border-radius: 6px;
    padding: 3px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    border-radius: 4px;
    padding: 2px;
    margin-bottom: 5px;
  }
`;

const TabButton = styled.button<{ isActive: boolean }>`
  padding: 12px 24px;
  background: ${({ isActive }) =>
    isActive ? colors.orange[300] : 'transparent'};
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: ${({ isActive }) => (isActive ? '600' : '500')};
  color: ${({ isActive }) =>
    isActive ? colors.orange[800] : colors.gray[400]};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: ${({ isActive }) =>
      isActive ? colors.orange[400] : colors.gray[100]};
    color: ${({ isActive }) =>
      isActive ? colors.orange[850] : colors.gray[400]};
  }

  @media (max-width: 1200px) {
    padding: 10px 20px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 12px;
    border-radius: 4px;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 11px;
    border-radius: 3px;
  }
`;
