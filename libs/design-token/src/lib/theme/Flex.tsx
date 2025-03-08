import styled from '@emotion/styled';

interface IFlexType {
  children?: React.ReactNode;
  gap?: number;
  isColumn?: boolean;
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  height?: string;
  position?: string;
}

export const Flex = ({
  height = '100%',
  width = '100%',
  children,
  gap,
  isColumn,
  justifyContent,
  alignItems,
  position,
}: IFlexType) => {
  return (
    <FlexContainer
      gap={gap}
      isColumn={isColumn}
      justifyContent={justifyContent}
      alignItems={alignItems}
      width={width}
      height={height}
      position={position}
    >
      {children}
    </FlexContainer>
  );
};

const FlexContainer = styled.div<Omit<IFlexType, 'children'>>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: flex;
  flex-direction: ${({ isColumn }) => (isColumn ? 'column' : 'row')};
  gap: ${({ gap }) => gap}px;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  position: ${({ position }) => position};
`;
