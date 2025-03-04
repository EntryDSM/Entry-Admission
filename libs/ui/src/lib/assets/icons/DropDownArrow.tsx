import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

type IIconType = {
  width?: number;
  height?: number;
  isClick: boolean;
  isAdmin?: boolean;
};

export const DropDownArrow = ({
  width = 28,
  height = 29,
  isClick,
  isAdmin,
}: IIconType) => {
  return (
    <SvgContainer isClick={isClick}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 28 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.8279 18.63L21.4196 12.0267C21.5289 11.9182 21.6157 11.7892 21.6749 11.647C21.7342 11.5049 21.7646 11.3524 21.7646 11.1984C21.7646 11.0443 21.7342 10.8918 21.6749 10.7497C21.6157 10.6075 21.5289 10.4785 21.4196 10.37C21.201 10.1527 20.9053 10.0308 20.5971 10.0308C20.2888 10.0308 19.9931 10.1527 19.7746 10.37L13.9412 16.145L8.16622 10.37C7.94763 10.1527 7.65193 10.0308 7.34372 10.0308C7.0355 10.0308 6.73981 10.1527 6.52122 10.37C6.41098 10.4781 6.32328 10.6069 6.2632 10.7491C6.20312 10.8913 6.17186 11.044 6.17122 11.1984C6.17186 11.3527 6.20312 11.5054 6.2632 11.6476C6.32328 11.7898 6.41098 11.9186 6.52122 12.0267L13.1129 18.63C13.2221 18.7484 13.3547 18.843 13.5023 18.9076C13.6499 18.9722 13.8093 19.0056 13.9704 19.0056C14.1315 19.0056 14.2909 18.9722 14.4385 18.9076C14.586 18.843 14.7186 18.7484 14.8279 18.63V18.63Z"
          fill={
            isClick
              ? isAdmin
                ? colors.green[600]
                : colors.orange[600]
              : colors.gray[400]
          }
        />
      </svg>
    </SvgContainer>
  );
};

const SvgContainer = styled.div<{ isClick: boolean }>`
  transition: 0.32s ease-in;
  transform: ${(props) => (props.isClick ? 'rotate(-180deg)' : 'rotate(0deg)')};
`;
