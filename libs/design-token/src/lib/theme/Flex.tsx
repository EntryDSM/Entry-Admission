import styled from '@emotion/styled';

interface IFlexType {
  children?: React.ReactNode;
  gap?: number;
  isColumn?: boolean;
  justifyContent?: string;
  alignItems?: string;
}

export const Flex = ({
  children,
  gap,
  isColumn,
  justifyContent,
  alignItems,
}: IFlexType) => {
  return (
    <FlexContainer
      gap={gap}
      isColumn={isColumn}
      justifyContent={justifyContent}
      alignItems={alignItems}
    >
      {children}
    </FlexContainer>
  );
};

const FlexContainer = styled.div<Omit<IFlexType, 'children'>>`
  display: flex;
  flex-direction: ${({ isColumn }) => (isColumn ? 'column' : 'row')} column;
  gap: ${({ gap }) => gap}px;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
`;
