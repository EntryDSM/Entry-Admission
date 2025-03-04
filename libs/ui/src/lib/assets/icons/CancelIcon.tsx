import { colors } from '@entry/design-token';

type IIconType = {
  size?: number;
  color?: string;
};

export const CancelIcon = ({
  size = 16,
  color = colors.gray[400],
}: IIconType) => {
  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.9999 14.9999L8 8M8 8L1 1M8 8L15 1M8 8L1 15"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
};
