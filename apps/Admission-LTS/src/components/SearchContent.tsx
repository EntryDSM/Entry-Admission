import { colors, Flex } from '@entry/design-token';
import { useState } from 'react';
import { PreviousButton } from '@entry/ui';
import { SchoolSearchModal } from './SchoolSearchModal';
import styled from '@emotion/styled';

interface ISearchType {
  setSelectedValue: React.Dispatch<React.SetStateAction<string | null>>; // ✅ 필수로 변경
  selectedValue?: string | null;
}

export const SearchContent = ({
  selectedValue,
  setSelectedValue,
}: ISearchType) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <Flex alignItems="center" height="fit-content" width="fit-content" gap={32}>
      <InputContainer
        isBlocked={true}
        readOnly={true}
        width="300px"
        placeholder="중학교 이름을 입력해주세요."
        value={selectedValue ?? ''}
      />
      <PreviousButton onClick={() => setIsShow(true)}>검색</PreviousButton>
      <SchoolSearchModal
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        isShow={isShow}
        setIsShow={setIsShow}
      />
    </Flex>
  );
};

const InputContainer = styled.input<{ isBlocked?: boolean; width?: string }>`
  width: ${({ width }) => width || '100%'};
  height: 40px;
  border-radius: 6px;
  border: 1px solid ${colors.gray[300]};
  padding: 10px 0 10px 12px;
  background-color: ${colors.extra.realWhite};
  color: ${colors.gray[500]};
  font-size: 16px;
  opacity: ${({ isBlocked }) => (isBlocked ? 0.4 : 1)};
  pointer-events: ${({ isBlocked }) => (isBlocked ? 'none' : 'cursor')};

  &::placeholder {
    color: ${colors.gray[300]};
    font-size: 16px;
  }
`;
