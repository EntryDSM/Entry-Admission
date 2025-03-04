import { colors } from '@entry/design-token';

type IIconType = {
  size?: number;
  isAdmin?: boolean;
};

export const PencilIcon = ({ size = 44, isAdmin }: IIconType) => {
  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30.9137 8.22613L34.0065 5.13146C34.6512 4.48672 35.5257 4.12451 36.4375 4.12451C37.3493 4.12451 38.2238 4.48672 38.8685 5.13146C39.5132 5.77621 39.8755 6.65066 39.8755 7.56246C39.8755 8.47427 39.5132 9.34872 38.8685 9.99347L12.5253 36.3366C11.5561 37.3053 10.3608 38.0173 9.0475 38.4083L4.125 39.875L5.59167 34.9525C5.98268 33.6391 6.69466 32.4439 7.66333 31.4746L30.9137 8.22613ZM30.9137 8.22613L35.75 13.0625"
          stroke={isAdmin ? colors.green[500] : colors.orange[500]}
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
};
