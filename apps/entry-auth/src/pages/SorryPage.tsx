import styled from '@emotion/styled';

export const SorryPage = () => {
  return (
    <Container>
      <Image src="/사과문.png" alt="죄송합니다" />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #FF9966;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
`;
