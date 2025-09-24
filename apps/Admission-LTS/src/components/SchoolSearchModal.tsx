import styled from '@emotion/styled';
import { colors, Flex, Text } from '@entry/design-token';
import { useEffect, useRef, useState } from 'react';
import { Check, Search, PreviousButton} from '@entry/ui';
import { useGetSchoolSearch } from '../apis';

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
  const [datas, setDatas] = useState<{code : string, name: string, information: string, address: string}[]>([]);

  const [searchValue, setSearchValue] = useState<string>('');
  const [tempSelectedValue, setTempSelectedValue] = useState<string | null>(
    selectedValue ?? null
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

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
    setDatas([]) //검색 내역 초기화
  };

  const handleConfirmClick = () => {
    setSelectedValue(tempSelectedValue); // 선택
    setIsShow(false);
    setDatas([])//setDatas 초기화
  };

  const { data, refetch } = useGetSchoolSearch(searchValue);


  const handleSearchKeyUp = (e : React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      refetch();
    }
  }

  useEffect(() => {
    if (data) {
      setDatas(
        data.map((item: any) => ({
          code: item.code,
          name: item.name,
          information: item.information,
          address: item.address,
        }))
      )
    }
  },[data])

  return (
    isShow && (
      <ModalBack ref={backRef} onClick={backClick}>
        <Modal>
          <Text fontSize={24} fontWeight={500} color={colors.extra.realBlack}>
            학교 검색
          </Text>
          {/* <SearchBar
            placeholder="학교 검색"
            onChange={handleSearchChange}
            value={searchValue}
            onKeyUp={handleSearchKeyUp}
          />
           */}
           <FakeInput>
              <ImageContainer>
                <Search />
                </ImageContainer>
                <SearchInput
                  placeholder="학교 검색"
                  onChange={handleSearchChange}
                  value={searchValue}
                  onKeyUp={handleSearchKeyUp}
                />
              </FakeInput>
          <ContentContainer>
            {datas.length > 0 ? (
              datas.map((data) => (
                <Content onClick={() => contentClick(data.name)} key={data.code}>
                  {data.name}
                  {data.code}
                  {data.address}
                  {data.information}
                  {data.name === tempSelectedValue ? (
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

const ImageContainer = styled.div`
  position: absolute;
  top: 13px;
  left: 24px;
`;

const FakeInput = styled.div`
  width: 100%;
  position: relative;
  height: 48px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 24px;
  border: 1px solid ${colors.gray[300]};
  background-color: ${colors.extra.realWhite};
  padding: 12px 24px 12px 58px;
  font-size: 16px;
  color: ${colors.extra.realBlack};
  &::placeholder {
    color: ${colors.gray[300]};
    font-size: 16px;
  }
`;
