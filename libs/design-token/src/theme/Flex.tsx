interface IFlexType {
  children?: React.ReactNode;
  gap?: number;
  gapX?: number;
  gapY?: number;
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
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
}

export const Flex = ({
  height = '100vh',
  width = '100vw',
  children,
  gap,
  gapX,
  gapY,
  isColumn = false,
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  paddingTop = '0',
  paddingLeft = '0',
  paddingBottom = '0',
  paddingRight = '0',
  flexWrap = 'nowrap',
  className,
  style = {},
  onClick,
}: IFlexType) => {
  // gap 설정
  let finalGap: string | number | undefined;

  if (gapY !== undefined || gapX !== undefined) {
    const y = gapY ?? 0;
    const x = gapX ?? 0;
    finalGap = `${y}px ${x}px`;
  } else if (gap !== undefined) {
    finalGap = gap;
  }

  const inlineStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isColumn ? 'column' : 'row',
    flexWrap,
    justifyContent,
    alignItems,
    width,
    height,
    gap: finalGap,
    padding: `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`,
    ...style,
  };

  return (
    <div onClick={onClick} className={className} style={inlineStyle}>
      {children}
    </div>
  );
};
