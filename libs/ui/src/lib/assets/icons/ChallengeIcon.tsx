import { colors } from '@entry/design-token';

type IIconType = {
  size?: number;
  isAdmin?: boolean;
};

export const ChallengeIcon = ({ size = 44, isAdmin }: IIconType) => {
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
          d="M13.2727 24L15.7335 18.5862C15.8958 18.2292 16.2518 18 16.6439 18H22M13.2727 24L6.64264 38.5862C6.34168 39.2483 6.82572 40 7.553 40H36.447C37.1743 40 37.6583 39.2483 37.3574 38.5862L30.7273 24M13.2727 24L17.4966 27.5741C17.802 27.8325 18.232 27.884 18.5898 27.7051L21.5528 26.2236C21.8343 26.0828 22.1657 26.0828 22.4472 26.2236L25.4102 27.7051C25.768 27.884 26.198 27.8325 26.5034 27.5741L30.7273 24M30.7273 24L28.2665 18.5862C28.1042 18.2292 27.7482 18 27.3561 18H22M22 18V10M22 10V5C22 4.44772 22.4477 4 23 4H31.1C31.3883 4 31.5106 4.36702 31.28 4.54L28.32 6.76C28.16 6.88 28.16 7.12 28.32 7.24L31.28 9.46C31.5106 9.63298 31.3883 10 31.1 10H22Z"
          stroke={isAdmin ? colors.green[500] : colors.orange[500]}
          stroke-width="2.5"
          stroke-linecap="round"
        />
      </svg>
    </>
  );
};
