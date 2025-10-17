import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ErrorPage } from '@entry/ui';

export const ReturnSoon = () => {
  const [params] = useSearchParams();
  const code = params.get('code') || '';

  const { title, description } = useMemo(() => {
    if (code === 'TIMEOUT') {
      return {
        title: '요청이 지연되고 있어요',
        description: '네트워크 상태가 불안정하거나 서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.',
      };
    }
    if (code === '500') {
      return {
        title: '일시적인 오류가 발생했어요 (500)',
        description: '서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
      };
    }
    if (code === '502') {
      return {
        title: '일시적인 오류가 발생했어요 (502)',
        description: '게이트웨이에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
      };
    }
    if (code === '503') {
      return {
        title: '서비스 점검 중이에요 (503)',
        description: '현재 서비스가 원활하지 않습니다. 잠시 후 다시 시도해주세요.',
      };
    }
    return {
      title: '잠시 후 다시 시도해주세요',
      description: '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    };
  }, [code]);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = 'https://entrydsm.kr';
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <ErrorPage errorMsg={code || 'UNKNOWN'} />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.extra.realWhite};
`;

// 로컬 버튼/카드는 공용 에러 페이지로 대체됨


