import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

type IIconType = {
  size?: number;
  color?: string;
};

export const PostArrow = ({
  size = 24,
  color = colors.gray[300],
}: IIconType) => {
  return (
    <SvgContainer>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 4L16 12L8 20"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </SvgContainer>
  );
};

const SvgContainer = styled.div`
  &:hover {
    transition: 0.1s ease-in;
    transform: translateX(5px);
  }
`;
