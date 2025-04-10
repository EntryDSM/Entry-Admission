interface ISchoolType {
  size?: string;
  color?: string;
}

export const School = ({ size = '120', color = '#FF7C33' }: ISchoolType) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 105V35H35V15H85V55H105V105H65V85H55V105H15ZM25 95H35V85H25V95ZM25 75H35V65H25V75ZM25 55H35V45H25V55ZM45 75H55V65H45V75ZM45 55H55V45H45V55ZM45 35H55V25H45V35ZM65 75H75V65H65V75ZM65 55H75V45H65V55ZM65 35H75V25H65V35ZM85 95H95V85H85V95ZM85 75H95V65H85V75Z"
        fill={color}
      />
    </svg>
  );
};
