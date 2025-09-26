import { colors, Flex, Skeleton, Text } from '@entry/design-token';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Button } from '@entry/ui';
import { downloadApplicationPDF, getApplication, ApplicationData } from '../../apis';

export const ApplicationPreview = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);

  useEffect(() => {
    const loadApplication = async () => {
      try {
        const data = await getApplication();
        setApplicationData(data);
      } catch (error) {
        console.error('원서 조회 실패:', error);
        alert('원서를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadApplication();
  }, []);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      await downloadApplicationPDF();
      console.log('PDF 다운로드 성공');
    } catch (error) {
      console.error('PDF 다운로드 실패:', error);
      alert('PDF 다운로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsDownloading(false);
    }
  };


  return (
    <Container>
      <Flex width="100%" height="fit-content" justifyContent="space-between" alignItems="center">
        <Flex width="fit-content" height="fit-content" isColumn={true} gap={12}>
          <Text fontSize={20} fontWeight={400} color={colors.gray[400]}>
            대덕소프트웨어마이스터고등학교
          </Text>
          <Text fontSize={32} fontWeight={600}>
            지원서 미리보기
          </Text>
        </Flex>
        <Button
          onClick={handleDownloadPDF}
          disabled={isDownloading || isLoading}
          width="150px"
        >
          {isDownloading ? '다운로드 중...' : 'PDF 다운로드'}
        </Button>
      </Flex>
      {isLoading ? (
        <ApplicationLoadingContainer>
          <Text fontSize={20} color={colors.gray[400]}>
            지원서 페이지를 로딩중입니다..
          </Text>
        </ApplicationLoadingContainer>
      ) : (
        <Flex width="100%" height="fit-content" isColumn={true}>
          <ApplicationTitle>입학원서 미리보기</ApplicationTitle>
          <ApplicationContainer>
            <ApplicationContent>
              {applicationData ? (
                <ApplicationForm>
                  <FormSection>
                    <SectionTitle>지원자 정보</SectionTitle>
                    <FormRow>
                      <FormField>
                        <Label>성명</Label>
                        <Value>{applicationData.userName}</Value>
                      </FormField>
                      <FormField>
                        <Label>성별</Label>
                        <Value>{applicationData.gender}</Value>
                      </FormField>
                      <FormField>
                        <Label>생년월일</Label>
                        <Value>{applicationData.birthday}</Value>
                      </FormField>
                    </FormRow>
                    <FormRow>
                      <FormField>
                        <Label>전화번호</Label>
                        <Value>{applicationData.applicantTel}</Value>
                      </FormField>
                      <FormField>
                        <Label>주소</Label>
                        <Value>{applicationData.address} {applicationData.detailAddress}</Value>
                      </FormField>
                    </FormRow>
                  </FormSection>

                  <FormSection>
                    <SectionTitle>학교 정보</SectionTitle>
                    <FormRow>
                      <FormField>
                        <Label>학교명</Label>
                        <Value>{applicationData.schoolName}</Value>
                      </FormField>
                      <FormField>
                        <Label>지역</Label>
                        <Value>{applicationData.schoolRegion}</Value>
                      </FormField>
                      <FormField>
                        <Label>졸업구분</Label>
                        <Value>{applicationData.educationalStatus}</Value>
                      </FormField>
                    </FormRow>
                  </FormSection>

                  <FormSection>
                    <SectionTitle>보호자 정보</SectionTitle>
                    <FormRow>
                      <FormField>
                        <Label>보호자명</Label>
                        <Value>{applicationData.parentName}</Value>
                      </FormField>
                      <FormField>
                        <Label>관계</Label>
                        <Value>{applicationData.parentRelation}</Value>
                      </FormField>
                      <FormField>
                        <Label>전화번호</Label>
                        <Value>{applicationData.parentTel}</Value>
                      </FormField>
                    </FormRow>
                  </FormSection>

                  <FormSection>
                    <SectionTitle>지원 정보</SectionTitle>
                    <FormRow>
                      <FormField>
                        <Label>전형구분</Label>
                        <Value>{applicationData.applicationType}</Value>
                      </FormField>
                      <FormField>
                        <Label>지원연도</Label>
                        <Value>{applicationData.entranceYear}</Value>
                      </FormField>
                    </FormRow>
                  </FormSection>
                </ApplicationForm>
              ) : (
                <Text>원서 데이터를 불러올 수 없습니다.</Text>
              )}
            </ApplicationContent>
          </ApplicationContainer>
        </Flex>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  width: 100%;
`;

const ApplicationTitle = styled.div`
  width: 100%;
  height: 100px;
  background-color: ${colors.gray[500]};
  padding-left: 48px;
  display: flex;
  align-items: center;
  font-size: 24px;
  color: ${colors.extra.realWhite};
`;
const ApplicationContainer = styled.div`
  width: 100%;
  background-color: ${colors.gray[400]};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 104px 140px;
  box-sizing: border-box;
`;

const ApplicationContent = styled.div`
  width: 100%;
  max-width: 794px;
  aspect-ratio: 210 / 297;
  background-color: ${colors.extra.realWhite};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

  @media (max-width: 1024px) {
    max-width: 100%;
    aspect-ratio: auto;
    height: auto;
  }
`;

const ApplicationLoadingContainer = styled(Skeleton)`
  width: 100%;
  height: 1500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ApplicationForm = styled.div`
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.gray[500]};
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 2px solid ${colors.orange[800]};
`;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 200px;
  flex: 1;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.gray[400]};
`;

const Value = styled.span`
  font-size: 16px;
  color: ${colors.gray[500]};
  padding: 8px 12px;
  background-color: ${colors.gray[100]};
  border-radius: 4px;
  min-height: 20px;
`;
