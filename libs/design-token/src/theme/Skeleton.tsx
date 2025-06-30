import styled from '@emotion/styled';
import { colors } from './colors';

export const Skeleton = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  position: relative;
  overflow: hidden;
  border-radius: 4px;

  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(235, 235, 235, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: ${colors.gray[100]};
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: skeleton-gradient 1.5s infinite ease-in-out;
  }
`;
