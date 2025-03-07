import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

interface IBtnType {
  size?: number;
  color?: string;
  onClick?: () => void;
}

export const SideBarBtnIcon = ({
  size = 24,
  color = colors.gray[400],
  onClick,
}: IBtnType) => {
  return (
    <Container onClick={onClick}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Menu / Hamburger_MD">
          <path
            id="Vector"
            d="M5 17H19M5 12H19M5 7H19"
            stroke={color}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>
    </Container>
  );
};

const Container = styled.div`
  display: none;
  @media (max-width: 1062px) {
    display: flex;
  }
`;
