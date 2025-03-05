import { colors } from '@entry/design-token';

type IIconType = {
  width?: number;
  height?: number;
  isAdmin?: boolean;
};

export const HealthCheckupIcon = ({
  width = 45,
  height = 44,
  isAdmin,
}: IIconType) => {
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
          d="M29.5 4H15.5C14.9477 4 14.5 4.44772 14.5 5V13C14.5 13.5523 14.0523 14 13.5 14H5.5C4.94772 14 4.5 14.4477 4.5 15V29C4.5 29.5523 4.94772 30 5.5 30H13.5C14.0523 30 14.5 30.4477 14.5 31V39C14.5 39.5523 14.9477 40 15.5 40H29.5C30.0523 40 30.5 39.5523 30.5 39V31C30.5 30.4477 30.9477 30 31.5 30H39.5C40.0523 30 40.5 29.5523 40.5 29V15C40.5 14.4477 40.0523 14 39.5 14H31.5C30.9477 14 30.5 13.5523 30.5 13V5C30.5 4.44772 30.0523 4 29.5 4Z"
          stroke={isAdmin ? colors.green[500] : colors.orange[500]}
          stroke-width="2.5"
          stroke-linecap="round"
        />
      </svg>
    </>
  );
};
