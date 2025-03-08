import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

interface IBackgroundType {
  width?: string;
  height?: string;
  color?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export const MypageGradient = ({
  width = '717',
  height = '544',
  color = colors.orange[300],
  top,
  left,
  right,
  bottom,
}: IBackgroundType) => {
  return (
    <ImgContainer top={top} left={left} right={right} bottom={bottom}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 717 544"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.4" filter="url(#filter0_f_503_229)">
          <ellipse cx="358.5" cy="272.25" rx="158.5" ry="71.5" fill={color} />
        </g>
        <defs>
          <filter
            id="filter0_f_503_229"
            x="0"
            y="0.75"
            width={width}
            height={height}
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="100"
              result="effect1_foregroundBlur_503_229"
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
