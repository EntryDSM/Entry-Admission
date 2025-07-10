import { colors, Flex, Text } from '@entry/design-token';
import { InputContent, useCheckPageData } from '@entry/ui';
import React, { useState } from 'react';

export const SubmitCheck = () => {
  const [datas, setDatas] = useCheckPageData('check');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDatas({ ...datas, message: value });
  };

  return (
    <Flex
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        width="fit-content"
        height="fit-content"
        isColumn={true}
        alignItems="center"
        gap={140}
      >
        <Flex
          width="fit-content"
          height="fit-content"
          isColumn={true}
          alignItems="center"
          gap={32}
        >
          <Text fontSize={32} fontWeight={700}>
            수고하셨습니다!
          </Text>
          <Text fontSize={20} color={colors.gray[400]}>
            제출을 위해서는 “확인했습니다"라고 작성해주세요.
          </Text>
        </Flex>
        <InputContent
          value={datas.message}
          onChange={handleInputChange}
          placeholder='“확인했습니다"라고 작성해 주세요.'
        />
      </Flex>
    </Flex>
  );
};
