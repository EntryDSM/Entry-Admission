interface ICheckType {
  color?: string;
}

export const Check = ({ color = '#FF7C33' }: ICheckType) => {
  return (
    <svg
      width="18"
      height="13"
      viewBox="0 0 18 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.54961 12.9996L0.849609 7.29961L2.27461 5.87461L6.54961 10.1496L15.7246 0.974609L17.1496 2.39961L6.54961 12.9996Z"
        fill={color}
      />
    </svg>
  );
};
