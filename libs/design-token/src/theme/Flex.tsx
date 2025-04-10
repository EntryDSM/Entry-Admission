interface IFlexType {
  children?: React.ReactNode;
  gap?: number;
  isColumn?: boolean;
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  height?: string;
  paddingTop?: string;
  paddingLeft?: string;
  paddingRight?: string;
  paddingBottom?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Flex = ({
  height = '100vh',
  width = '100vw',
  children,
  gap = 0,
  isColumn = false,
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  paddingTop = '0',
  paddingLeft = '0',
  paddingBottom = '0',
  paddingRight = '0',
  className,
  style = {},
}: IFlexType) => {
  const inlineStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isColumn ? 'column' : 'row',
    justifyContent,
    alignItems,
    width,
    height,
    gap,
    padding: `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`,
    ...style,
  };

  return (
    <div className={className} style={inlineStyle}>
      {children}
    </div>
  );
};
