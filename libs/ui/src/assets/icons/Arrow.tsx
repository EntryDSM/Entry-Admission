interface IArrowType {
  width?: string;
  height?: string;
  color?: string;
}

export const Arrow = ({
  width = '120',
  height = '88',
  color = '#E3E3E3',
}: IArrowType) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.8">
        <path
          d="M60 56.4663L30 34.4663L37 29.333L60 46.1997L83 29.333L90 34.4663L60 56.4663Z"
          fill={color}
        />
      </g>
    </svg>
  );
};
