import { colors, Flex, Text } from '@entry/design-token';
import { dropdownArrow } from '@entry/ui';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

interface IDropDownType {
  datas: (string | number)[];
  label?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
}

export const DropDownContent = ({
  datas,
  label,
  value,
  onChange,
}: IDropDownType) => {
  const [content, setContent] = useState<string | number>(value || datas[0]);
  const headRef = useRef<HTMLDivElement>(null);
  const [headWidth, setHeadWidth] = useState<number | null>(null);
  const [isClick, setIsClick] = useState<boolean>(false);

  useEffect(() => {
    if (headRef.current) setHeadWidth(headRef.current.offsetWidth);
  }, [content]);

  useEffect(() => {
    if (value !== undefined) setContent(value);
  }, [value]);

  const handleOptionClick = (data: string | number) => {
    setContent(data);
    setIsClick(false);
    if (onChange) {
      onChange(data);
    }
  };

  return (
    <Flex width="fit-content" height="fit-content" gap={12} alignItems="center">
      <DropAllContainer>
        <Flex isColumn={true} width="fit-content" height="fit-content">
          <DropHead ref={headRef} onClick={() => setIsClick(!isClick)}>
            {content}
            <DropDownImg isClick={isClick} src={dropdownArrow} alt="arrow" />
          </DropHead>
          {isClick && (
            <DropContainer width={headWidth}>
              {datas.map((data) => (
                <DropOption key={data} onClick={() => handleOptionClick(data)}>
                  {data}
                </DropOption>
              ))}
            </DropContainer>
          )}
        </Flex>
      </DropAllContainer>
      <Text fontSize={20}>{label}</Text>
    </Flex>
  );
};

const DropAllContainer = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
`;

const DropHead = styled.div`
  padding: 8px 16px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid ${colors.gray[300]};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  color: ${colors.gray[500]};
  font-size: 16px;
`;

const DropDownImg = styled.img<{ isClick: boolean }>`
  width: 24px;
  transform: rotate(${({ isClick }) => (isClick ? '-180deg' : '0deg')});
  transition: 0.35s;
`;

const DropOption = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    transition: 0.35s ease-in-out;
    background-color: ${colors.orange[100]};
  }
  flex-shrink: 0;
`;

const DropContainer = styled.div<{ width: number | null }>`
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.gray[300]};
  border-radius: 4px;
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  position: absolute;
  max-height: 200px;
  overflow-y: auto;
  top: 39px;
  z-index: 1;
  background-color: ${colors.extra.realWhite};
`;
