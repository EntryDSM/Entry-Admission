import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

interface IBackgroundType {
  size?: string;
  color?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export const BackgroundGradient = ({
  size = '2300',
  color = colors.orange[300],
  top,
  left,
  right,
  bottom,
}: IBackgroundType) => {
  return (
    <ImgContainer top={top} left={left} right={right} bottom={bottom}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 2300 2300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.4" filter="url(#filter0_f_428_162)">
          <circle cx="1150" cy="1150" r="450" fill={color} />
        </g>
        <defs>
          <filter
            id="filter0_f_428_162"
            x="0"
            y="0"
            width={size}
            height={size}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="350"
              result="effect1_foregroundBlur_428_162"
            />
          </filter>
        </defs>
      </svg>
    </ImgContainer>
  );
};

const ImgContainer = styled.div<{
  top: string;
  left: string;
  right: string;
  bottom: string;
}>`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  z-index: -1;
`;
