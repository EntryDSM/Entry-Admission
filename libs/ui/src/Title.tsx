import { colors, Flex, Text } from '@entry/design-token';

interface ITitleType {
  mainTitle: string;
  subTitle?: string;
}

export const Title = ({ mainTitle, subTitle }: ITitleType) => {
  return (
    <Flex isColumn={true} gap={12}>
      <Text fontSize={32} fontWeight={600} color={colors.gray[500]}>
        {mainTitle}
      </Text>
      <Text fontSize={16} fontWeight={400} color={colors.gray[400]}>
        {subTitle}
      </Text>
    </Flex>
  );
};
