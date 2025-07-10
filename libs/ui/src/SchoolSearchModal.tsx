import styled from '@emotion/styled';
import { colors, Flex, Text } from '@entry/design-token';
import { SearchBar } from './SearchBar';
import { useRef, useState } from 'react';
import { PreviousButton } from './PreviousButton';
import { Check, Search } from './assets';

interface ISchoolSearchModalType {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  isShow?: boolean;
  setSelectedValue: React.Dispatch<React.SetStateAction<string | null>>; // ✅ 필수
  selectedValue?: string | null;
}

export const SchoolSearchModal = ({
  setSelectedValue,
  selectedValue,
  setIsShow,
  isShow,
}: ISchoolSearchModalType) => {
  const [datas] = useState<string[]>([
    '서울고등학교',
    '부산대학교',
    '대구여자고등학교',
    '경기중학교',
    '인천외국어고등학교',
  ]);

  const [searchValue, setSearchValue] = useState<string>('');
  const [tempSelectedValue, setTempSelectedValue] = useState<string | null>(
    selectedValue ?? null
  );

  //초성 검색 단어
  const CHO = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];

  //초성 검색을 위한 함수
  const getCho = (value: string) => {
    let result = '';
    for (let i = 0; i < value.length; i++) {
      const code = value.charCodeAt(i) - 44032;
      if (code >= 0 && code <= 11171) {
        const choIndex = Math.floor(code / 588);
        result += CHO[choIndex];
      } else {
        result += value[i];
      }
    }
    return result;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filterSearch = datas.filter((data) => {
    const lower = searchValue.toLowerCase();
    const choSearch = getCho(lower);
    const choData = getCho(data);
    const isChoSearch = CHO.includes(lower[0]);
    return isChoSearch
      ? choData.startsWith(choSearch)
      : data.includes(searchValue);
  });

  const contentClick = (value: string) => {
    setTempSelectedValue((prev) => (prev === value ? null : value)); // 선택된 값을 임시 저장에 저장
  };

  const backRef = useRef<HTMLDivElement>(null);
  const backClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (backRef.current === e.target) {
      setTempSelectedValue(selectedValue ?? null); // 원래 값으로 변경
      setIsShow(false);
    }
  };

  const handleCancelClick = () => {
    setTempSelectedValue(selectedValue ?? null); // 원래 값으로 변경
    setIsShow(false);
  };

  const handleConfirmClick = () => {
    setSelectedValue(tempSelectedValue); // 선택
    setIsShow(false);
  };

  return (
    isShow && (
      <ModalBack ref={backRef} onClick={backClick}>
        <Modal>
          <Text fontSize={24} fontWeight={500} color={colors.extra.realBlack}>
            학교 검색
          </Text>
          <SearchBar
            placeholder="학교 검색"
            onChange={handleSearchChange}
            value={searchValue}
          />
          <ContentContainer>
            {filterSearch.length > 0 ? (
              filterSearch.map((data) => (
                <Content onClick={() => contentClick(data)} key={data}>
                  {data}
                  {data === tempSelectedValue ? (
                    <Check />
                  ) : (
                    <Check color="transparent" />
                  )}
                </Content>
              ))
            ) : (
              <Flex
                width="100%"
                height="100%"
                justifyContent="center"
                alignItems="center"
                gap={10}
              >
                <Search />
                <Text color={colors.gray[300]}>검색어가 없습니다</Text>
              </Flex>
            )}
          </ContentContainer>

          <Flex
            gap={16}
            width="100%"
            height="fit-content"
            justifyContent="flex-end"
          >
            <PreviousButton
              borderColor={colors.orange[800]}
              backgroundColor={colors.extra.realWhite}
              color={colors.orange[800]}
              hoverBackgroundColor={colors.extra.realWhite}
              onClick={handleCancelClick}
            >
              취소
            </PreviousButton>
            <PreviousButton onClick={handleConfirmClick}>선택</PreviousButton>
          </Flex>
        </Modal>
      </ModalBack>
    )
  );
};

const ModalBack = styled.div`
  padding: 30px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Modal = styled.div`
  width: 970px;
  height: 500px;
  border-radius: 24px;
  padding: 32px 36px;
  background-color: ${colors.extra.realWhite};
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 160px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  width: 100%;
  padding: 16px 20px;
  color: ${colors.gray[400]};
  font-size: 16px;
  border-bottom: 1px solid ${colors.gray[300]};
  background-color: ${colors.extra.realWhite};
  &:hover {
    background-color: ${colors.gray[50]};
    transition: 0.35s ease-in-out;
  }
`;
