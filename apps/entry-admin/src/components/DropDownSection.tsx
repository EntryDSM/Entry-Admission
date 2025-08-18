import React, { useCallback, useMemo } from 'react';
import { colors, Flex, Text } from '@entry/design-token';
import { DropDownContent } from '@entry/ui';
import  styled  from '@emotion/styled';

interface IDropDownSectionType {
  label: string
  dropDownDatas: { label: string; content: (string | number)[] }[];
  dropDownValues?: (string | number)[];
  onDropDownChange?: (values: (string | number)[]) => void;
}

export const DropDownSection: React.FC<IDropDownSectionType> = React.memo(
  ({ dropDownDatas, dropDownValues = [], onDropDownChange,label }) => {
    // 기본값 계산
    const defaultValues = useMemo(
      () =>
        dropDownDatas.map((data) =>
          Array.isArray(data.content) ? data.content[0] : data.content
        ),
      [dropDownDatas]
    );

    const currentValues = dropDownValues.length > 0 ? dropDownValues : defaultValues;

    // 초기값 설정
    React.useEffect(() => {
      if ((dropDownValues?.length ?? 0) === 0 && onDropDownChange) {
        onDropDownChange(defaultValues);
      }
    }, [dropDownValues, defaultValues, onDropDownChange]);

    const handleDropDownChange = useCallback(
      (index: number, value: string | number) => {
        const newValues = [...currentValues];
        newValues[index] = value;
        onDropDownChange?.(newValues);
      },
      [currentValues, onDropDownChange]
    );

    return (
      <FormContainer>
        <Text fontSize={20}>{label}</Text>
        <Flex width="fit-content" height="fit-content" gap={16}>
          {dropDownDatas.map((data, index) => (
            <DropDownContent
              key={`${data.label}-${index}`}
              datas={Array.isArray(data.content) ? data.content : [data.content]}
              label={data.label}
              value={currentValues[index]}
              onChange={(value) => handleDropDownChange(index, value)}
            />
          ))}
        </Flex>
      </FormContainer>
    );
  }
);


const FormContainer = styled.div`
  width: 100%;
  padding: 32px 0;
  display: flex;
  gap: 20px;
  align-items: center;
  border-bottom: 1px solid ${colors.gray[200]};
`;