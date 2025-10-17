import styled from "@emotion/styled";
import { colors, Flex, Text } from "@entry/design-token";
import { useState } from "react";
import { Button } from "./Button";
import DaumPostcode from "react-daum-postcode";

interface IAddressType {
  handleCodeChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddressChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDetailChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
  addressDetailValue: string,
  addressValue : string,
  postalCodeValue: string,
}

export const AddressContent = ({postalCodeValue , addressDetailValue, addressValue, handleCodeChange, handleAddressChange, handleDetailChange}: IAddressType) => {
  const [datas, setDatas] = useState<{postalCode: string, address: string, addressDetail : string}>({
    postalCode: '', address: '', addressDetail : ''
  })
  const [isOpen, setIsOpen] = useState<boolean>(false);


  const handleComplete = (data: any) => {
    handleCodeChange?.({ target: { value: data.zonecode } } as React.ChangeEvent<HTMLInputElement>);
    handleAddressChange?.({ target: { value: data.roadAddress } } as React.ChangeEvent<HTMLInputElement>);
    setIsOpen(false);
  };

  const handleSearchClick = () => {
    setIsOpen(true);
  };

  return (
    <Flex isColumn={true} gap={12} width="100%" height="auto">
      <Flex height="auto" width="100%" gap={20} alignItems="center">
        <InputContainer
          isBlocked={true}
          placeholder="우편번호"
          value={postalCodeValue}
          onChange={handleCodeChange}
        />
        <InputContainer
          isBlocked={true}
          placeholder="기본주소"
          value={addressValue}
          onChange={handleAddressChange}
        />
        <Button onClick={handleSearchClick}>검색</Button>
      </Flex>
      <InputContainer
        placeholder="상세주소"
        value={addressDetailValue}
        onChange={handleDetailChange}
      />
      {isOpen && (
          <PostCodeModal>
            <DaumPostcode onComplete={handleComplete} autoClose />
          </PostCodeModal>
        )}
    </Flex>
  );
};

const InputContainer = styled.input<{
  isBlocked?: boolean;
  width?: string;
}>`
  width: ${({ width }) => width || '100%'};
  height: 40px;
  border-radius: 6px;
  border: 1px solid ${colors.gray[300]};
  padding: 10px 0 10px 12px;
  background-color: ${colors.extra.realWhite};
  color: ${colors.gray[500]};
  font-size: 16px;
  opacity: ${({ isBlocked }) => (isBlocked ? 0.4 : 1)};
  pointer-events: ${({ isBlocked }) => (isBlocked ? 'none' : 'auto')};

  &::placeholder {
    color: ${colors.gray[300]};
    font-size: 16px;
  }
`;

const PostCodeModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  width: 400px;
  height: 500px;
  background-color: ${colors.extra.realWhite};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;
