import styled from '@emotion/styled';
interface IIconType {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  isRight?: boolean;
  isBlocked?: boolean;
}

export const ArrowNav = ({ onClick, isRight, isBlocked }: IIconType) => {
  return (
    <Container onClick={onClick} isRight={isRight} isBlocked={isBlocked}>
      <Svg
        isRight={isRight}
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.4 12.5L16 7.9L14.6 6.5L8.6 12.5L14.6 18.5L16 17.1L11.4 12.5Z"
          fill="#2C261F"
        />
      </Svg>
    </Container>
  );
};

const Container = styled.div<Omit<IIconType, 'onClick'>>`
  border: none;
  outline: none;
  cursor: pointer;
  opacity: ${({ isBlocked }) => (isBlocked ? 0.3 : 1)};
  pointer-events: ${({ isBlocked }) => (isBlocked ? 'none' : 'cursor')};
  transition: transform 0.35s ease-in-out;
  &:hover {
    transform: translateX(${({ isRight }) => (isRight ? '4px' : '-4px')});
  }
`;

const Svg = styled.svg<Pick<IIconType, 'isRight'>>`
  outline: none;
  border: none;
  width: 24px;
  height: 25px;
  transform: ${({ isRight }) =>
    isRight ? 'rotateY(180deg)' : 'rotateY(0deg)'};
  transition: transform 0.2s ease;
`;
