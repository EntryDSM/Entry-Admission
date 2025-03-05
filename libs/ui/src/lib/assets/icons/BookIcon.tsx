import { colors } from '@entry/design-token';

type IIconType = {
  size?: number;
  isAdmin?: boolean;
};

export const BookIcon = ({ size = 45, isAdmin }: IIconType) => {
  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 45 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.5 36.2058C19.7637 34.6259 16.6597 33.7942 13.5 33.7942C10.3403 33.7942 7.23635 34.6259 4.5 36.2058V10.2058C7.23635 8.62593 10.3403 7.79422 13.5 7.79422C16.6597 7.79422 19.7637 8.62593 22.5 10.2058M22.5 36.2058C25.2363 34.6259 28.3403 33.7942 31.5 33.7942C34.6597 33.7942 37.7637 34.6259 40.5 36.2058V10.2058C37.7637 8.62593 34.6597 7.79422 31.5 7.79422C28.3403 7.79422 25.2363 8.62593 22.5 10.2058M22.5 36.2058V10.2058"
          stroke={isAdmin ? colors.green[500] : colors.orange[500]}
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
};
