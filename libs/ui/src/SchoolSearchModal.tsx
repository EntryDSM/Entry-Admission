import styled from '@emotion/styled';
import { colors, Flex, Text } from '@entry/design-token';
import { SearchBar } from './SearchBar';
import { useRef, useState } from 'react';
import { PreviousButton } from './PreviousButton';
import { Check, Search } from '@entry/ui';

interface ISchoolSearchModalType {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>; //다른 페이지에서 버튼 클릭 시 창 열림 백그라운드 클릭 시 창 닫힘 설정
  isShow?: boolean;
}

export const SchoolSearchModal = ({
  setIsShow,
  isShow,
}: ISchoolSearchModalType) => {
  const [datas, setDatas] = useState<string[]>([
    '서울고등학교',
    '부산대학교',
    '대구여자고등학교',
    '경기중학교',
    '인천외국어고등학교',
  ]);

  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');

  //클릭 시에 체크를 위한 함수
  const contentClick = (value: string) => {
    setSelectedValue((prev) => (prev === value ? null : value));
  };

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

  //검색 value 변경 함수
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  //필터링 기능 함수
  const filterSearch = datas.filter((data) => {
    const lower = searchValue.toLowerCase();
    const choSearch = getCho(lower); // 검색어 초성
    const choData = getCho(data); // 대상 데이터 초성

    const isChoSearch = CHO.includes(lower[0]); // 첫 글자가 초성이면 초성 검색

    if (isChoSearch) {
      return choData.startsWith(choSearch);
    } else {
      return data.includes(searchValue);
    }
  });

  //배경 Ref
  const backRef = useRef<HTMLDivElement>(null);

  //배경 클릭 함수
  const backClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (backRef.current === e.target) setIsShow(false);
  };

  //모달 닫기
  const closeClick = () => {
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
            {datas && filterSearch.length > 0 ? (
              filterSearch.map((data, index) => (
                <Content onClick={() => contentClick(data)} key={data}>
                  {data}
                  {data === selectedValue ? (
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
              onClick={closeClick}
            >
              취소
            </PreviousButton>
            <PreviousButton>선택</PreviousButton>
          </Flex>
        </Modal>
      </ModalBack>
    )
  );
};

const ContentContainer = styled.div`
  width: 100%;
  height: 160px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;

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
  background-color: rgb(0, 0, 0, 0.2);
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
