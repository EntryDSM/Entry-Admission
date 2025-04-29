export * from './assets';
export * from './Footer';
import { colors } from '@entry/design-token';
import styled from '@emotion/styled';
import { EntryLogo } from '@entry/ui';

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoWrapper>
          <EntryDSMText>
            <LogoContainer>
              <EntryLogo />
              <LogoText>EntryDSM</LogoText>
            </LogoContainer>
          </EntryDSMText>
        </LogoWrapper>
        
        <FooterInfoSection>
          <AddressText>
            (34111) 대전광역시 유성구 가정북로 76(장동 23-9)
          </AddressText>
          
          <ContactInfoRow>
            <ContactText>
              Tel: 교무실042-866-8822 (08:30 ~ 16:30), 행정실042-866-8885 (08:30
              ~ 16:30), 당직실042-866-8888 (평일 야간, 휴일)
            </ContactText>
          </ContactInfoRow>
          
          <ContactInfoRow>
            <ContactText>
              취업지원센터:전화:042-866-8843, Fax: 행정실 042-863-4308
            </ContactText>
          </ContactInfoRow>
          
          <ContactInfoRow>
            <ContactText>
              Fax: 교무실:042-867-9900, 취업센터:042-866-8844, 사업자 등록 번호:
              314830160, 기관 메일: dsmhs@korea.kr
            </ContactText>
          </ContactInfoRow>
          
          <CopyrightText>
            Copyright© 대덕소프트웨어마이스터고등학교. All rights reserved.
          </CopyrightText>
        </FooterInfoSection>
      </FooterContent>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  width: 100%;
  background-color: ${colors.extra.realWhite};
  padding: 24px 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const LogoWrapper = styled.div`
  margin-bottom: 16px;
`;

const EntryDSMText = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.gray[500]};
  margin: 0;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoText = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

const FooterInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AddressText = styled.p`
  font-size: 14px;
  color: ${colors.gray[500]};
  margin: 0;
`;

const ContactInfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ContactText = styled.p`
  font-size: 14px;
  color: ${colors.gray[500]};
  margin: 0;
`;

const CopyrightText = styled.p`
  font-size: 14px;
  color: ${colors.gray[500]};
  margin-top: 8px;
  margin-bottom: 0;
`;