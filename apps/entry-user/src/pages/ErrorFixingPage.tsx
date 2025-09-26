import styled from '@emotion/styled';
import 서비스점검 from '../assets/서비스점검.png';

export const ErrorFixingPage = () => {
  return (
    <Container>
      <BackgroundImage />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${서비스점검});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;