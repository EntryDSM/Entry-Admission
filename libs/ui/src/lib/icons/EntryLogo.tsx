type ILogoType = {
  isAdmin?: boolean;
  width?: number;
  height?: number;
};

export const EntryLogo = ({
  width = 26,
  height = 30,
  isAdmin = false,
}: ILogoType) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 26 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25.648 0H26V25.648H0C0 18.8457 2.70219 12.3221 7.51213 7.51213C12.3221 2.70219 18.8457 0 25.648 0V0Z"
          fill={isAdmin ? '#7FE4AD' : '#FFBE99'}
        />
        <path
          d="M0 0H0.352C3.72014 0 7.05531 0.663405 10.1671 1.95234C13.2788 3.24127 16.1062 5.13049 18.4879 7.51213C20.8695 9.89376 22.7587 12.7212 24.0477 15.8329C25.3366 18.9447 26 22.2799 26 25.648H0V0Z"
          fill={isAdmin ? '#B8ECCF' : '#FFDECC'}
        />
        <path
          d="M0 0.471001C14.2 0.471001 19.149 15.948 19.149 30L0 25.916V0.471001Z"
          fill={isAdmin ? '#34D37B' : '#FF7C33'}
        />
      </svg>
    </>
  );
};
