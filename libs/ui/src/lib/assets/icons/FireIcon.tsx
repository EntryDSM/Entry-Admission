import { colors } from '@entry/design-token';

type IIconType = {
  width?: number;
  height?: number;
  isAdmin?: boolean;
};

export const FireIcon = ({ width = 45, height = 44, isAdmin }: IIconType) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 45 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25.9029 40.3333C48.3099 34.8333 35.7626 12.8333 20.5258 3.66667C18.7328 10.0833 16.0433 11.9167 10.6661 18.3333C3.54544 26.829 7.08194 36.6667 16.9398 40.3333C15.4456 38.5 11.5919 34.65 14.2503 29.3333C15.1669 27.5 17.0003 25.6667 16.0836 22C17.8766 22.9167 21.5836 23.8333 22.5003 28.4167C23.9944 26.5833 25.5436 22.7333 24.1099 18.3333C35.3336 26.5833 30.7503 34.8333 25.9029 40.3333Z"
          stroke={isAdmin ? colors.green[500] : colors.orange[500]}
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
};
