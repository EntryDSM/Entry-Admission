import { colors, Flex, Text } from '@entry/design-token';
import styled from '@emotion/styled';
import { useState } from 'react';

type ITextAreaType = {
  placeholder?: string;
  value?: string | null | number;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TextAreaContent = ({
  onChange,
  placeholder,
  value,
}: ITextAreaType) => {
  const [inputCount, setInputCount] = useState<number>(0);

  const onInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputCount(e.target.value.length);
    onChange?.(e); //전달받은 onChange도 실행
  };

  return (
    <Flex
      width="100%"
      height="fit-content"
      isColumn={true}
      gap={4}
      alignItems="flex-end"
    >
      <TextArea
        onChange={onInputHandler}
        value={value ?? undefined}
        placeholder={placeholder}
      />
      <Text fontSize={12} color={colors.gray[400]}>
        {inputCount}/1500
      </Text>
    </Flex>
  );
};

const TextArea = styled.textarea`
  width: 100%;
  height: 440px;
  border-radius: 6px;
  border: 1px solid ${colors.gray[300]};
  padding: 12px 24px;
  color: ${colors.gray[500]};
  font-size: 16px;
  background-color: ${colors.extra.realWhite};
  &::placeholder {
    color: ${colors.gray[300]};
  }
  resize: none;
`;
