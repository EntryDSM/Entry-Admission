import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

export const DevEnablePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('DEV', 'TRUE');
    // 홈으로 리다이렉트
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  }, []);

  return (
    <Container>
      <Message>개발자 모드가 활성화되었습니다.</Message>
      <SubMessage>잠시 후 메인 페이지로 이동합니다...</SubMessage>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const Message = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
`;

const SubMessage = styled.p`
  font-size: 16px;
  color: #666;
`;
