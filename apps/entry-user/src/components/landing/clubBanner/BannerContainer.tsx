import { useState } from 'react';
import styled from '@emotion/styled';
import { BannerSelector } from './BannerSelector';
import { BannerDisplay } from './BannerDisplay';
import { colors } from '@entry/design-token';

export const BannerContainer = () => {
  const [selectedBanner, setSelectedBanner] = useState<string>('dms');

  const handleBannerChange = (banner: string) => {
    setSelectedBanner(banner);
  };

  return (
    <Container>
      <SelectorSection>
        <SelectorWrapper>
          <BannerSelector
            selectedBanner={selectedBanner}
            onBannerChange={handleBannerChange}
          />
        </SelectorWrapper>
      </SelectorSection>
      <BannerSection>
        <BannerDisplay selectedBanner={selectedBanner} />
      </BannerSection>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  box-sizing: border-box;
`;

const SelectorSection = styled.div`
  background-color: white;
  padding: 20px 80px 20px 80px;

  @media (max-width: 1200px) {
    padding: 20px 60px 16px 60px;
  }

  @media (max-width: 768px) {
    padding: 10px 40px 12px 40px;
  }

  @media (max-width: 480px) {
    padding: 15px 20px 8px 20px;
  }
`;

const BannerSection = styled.div`
  background-color: ${colors.gray[100]};
  padding: 50px 80px 50px 80px;

  @media (max-width: 1200px) {
    padding: 16px 60px 50px 60px;
  }

  @media (max-width: 768px) {
    padding: 0 30px 0 30px;
  }

  @media (max-width: 480px) {
    padding: 8px 20px 10px 20px;
  }
`;

const SelectorWrapper = styled.div`
  margin-bottom: 0;
`;
