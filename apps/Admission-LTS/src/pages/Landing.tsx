import { colors, Flex, Text } from '@entry/design-token';
import { Button, EntryLogo } from '@entry/ui';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Landing = () => {
  const [name, _] = useState<string>('김이름');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleStartClick = () => {
    navigate('/application-classification');
  };

  if (isMobile) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#f5f5f5',
          fontSize: '20px',
          color: '#333',
          textAlign: 'center',
        }}
      >
        모바일에서는 접근할 수 없습니다.
      </div>
    );
  }
  return (
    <Flex
      width="100%"
      height="calc(100vh - 70px)"
      isColumn={true}
      alignItems="center"
      gap={60}
      justifyContent="center"
    >
      <Flex
        width="560px"
        height="fit-content"
        isColumn={true}
        alignItems="center"
        gap={48}
      >
        <Flex
          isColumn={true}
          alignItems="center"
          width="fit-content"
          height="fit-content"
          gap={32}
        >
          <EntryLogo width={65} height={75} />
          <Text textAlign="center" width="450px" fontSize={32} fontWeight={700}>
            대덕소프트웨어 마이스터고등학교 입학 원서 접수
          </Text>
        </Flex>
        <Flex
          isColumn={true}
          alignItems="center"
          width="fit-content"
          height="fit-content"
          gap={24}
        >
          <ContentContainer>
            <Text fontSize={18} fontWeight={500}>
              전형 정보-인적사항-자기소개서 및 학업계획서-성적 입력의 순서로
              진행됩니다.
            </Text>
          </ContentContainer>
          <ContentContainer>
            <Text fontSize={18} fontWeight={500}>
              원서 접수는{' '}
              <Text
                isSpan={true}
                fontSize={18}
                fontWeight={500}
                color={colors.orange[800]}
              >
                10월 17일
              </Text>
              부터{' '}
              <Text
                isSpan={true}
                fontSize={18}
                fontWeight={500}
                color={colors.orange[800]}
              >
                20일
              </Text>
              까지 진행되며, 결과 발표는{' '}
              <Text
                isSpan={true}
                fontSize={18}
                fontWeight={500}
                color={colors.orange[800]}
              >
                11월 8일{' '}
              </Text>
              입니다.
            </Text>
          </ContentContainer>
          <ContentContainer>
            <Text fontSize={18} fontWeight={500}>
              현재
              <Text
                isSpan={true}
                fontSize={18}
                fontWeight={500}
                color={colors.orange[800]}
              >
                {' '}
                {name}
              </Text>{' '}
              지원자님 계정으로 로그인되어 있습니다.
            </Text>
          </ContentContainer>
        </Flex>
        <Button width="100%" onClick={handleStartClick}>
          원서 접수 시작
        </Button>
      </Flex>
    </Flex>
  );
};

const ContentContainer = styled.div`
  width: 100%;
  padding: 19px 70px;
  border-radius: 8px;
  background-color: ${colors.gray[50]};
`;