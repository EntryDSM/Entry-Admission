import { colors, Flex, Text } from '@entry/design-token';
import styled from '@emotion/styled';
import {
  Caution,
  Check,
  dropdownArrow,
  ImageChange,
  Photo,
  PreviousButton,
} from '@entry/ui';
import React, { useEffect, useRef, useState } from 'react';
import { SchoolSearchModal } from './SchoolSearchModal';

interface IFormElementType extends Partial<IInputType>, Partial<IImgType> {
  label?: string;
  explanation?: string;
  warning?: string;
  type?: 'radio' | 'dropDown' | 'imgSelector' | 'input' | 'textArea' | 'search';
  radioDatas?: string[];
  dropDownDatas?: { label: string; content: string | number[] }[];
  selectedRadio?: string;
  setSelectedRadio?: React.Dispatch<React.SetStateAction<string>>;
  dropDownValues?: (string | number)[];
  onDropDownChange?: (values: (string | number)[]) => void;
}

type IRadioType = {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
};

type IInputType = ITextAreaType & {
  width?: string;
  readonly?: boolean;
};

type ITextAreaType = {
  placeholder?: string;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};

type IImgType = {
  imgUrl?: string | null;
  setImgUrl: React.Dispatch<React.SetStateAction<string | null>>;
  onFileChange?: (file: File | null) => void;
};

type IDropDownType = {
  datas: (string | number)[];
  label?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
};

const RadioContent = ({ label, isSelected, onSelect }: IRadioType) => (
  <Flex width="fit-content" height="fit-content" gap={8} alignItems="center">
    <Radio isClick={isSelected} onClick={onSelect}>
      <Check color={isSelected ? colors.gray[50] : 'transparent'} />
    </Radio>
    <Text fontSize={20}>{label}</Text>
  </Flex>
);

const DropDownContent = ({ datas, label, value, onChange }: IDropDownType) => {
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

const InputContent = ({ width, value, placeholder, onChange }: IInputType) => (
  <InputContainer
    width={width}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

const ImageContent = ({ imgUrl, setImgUrl, onFileChange }: IImgType) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [isHover, setIsHover] = useState(false);

  const handleChange = () => {
    const file = imgRef.current?.files?.[0];
    if (file) {
      const newUrl = URL.createObjectURL(file);
      setImgUrl(newUrl);
      onFileChange?.(file);
    }
  };

  return (
    <ImgSelector
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => imgRef.current?.click()}
      imgUrl={imgUrl}
    >
      {isHover && imgUrl && (
        <HoverSelector>
          <ImageChange />
          <Text fontSize={12} color={colors.gray[200]}>
            눌러서 사진을 변경
          </Text>
        </HoverSelector>
      )}
      <FileInput type="file" ref={imgRef} onChange={handleChange} />
      {imgUrl ? (
        <ImgContent src={imgUrl} alt="img" />
      ) : (
        <Flex
          isColumn={true}
          width="100%"
          height="fit-content"
          gap={16}
          alignItems="center"
        >
          <Photo />
          <Text fontSize={12} color={colors.gray[300]}>
            눌러서 사진을 업로드
          </Text>
        </Flex>
      )}
    </ImgSelector>
  );
};

const TextAreaContent = ({ onChange, placeholder, value }: ITextAreaType) => {
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
        value={value}
        placeholder={placeholder}
      />
      <Text fontSize={12} color={colors.gray[400]}>
        {inputCount}/1500
      </Text>
    </Flex>
  );
};

const SearchContent = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <Flex alignItems="center" height="fit-content" width="fit-content" gap={32}>
      <InputContainer
        isBlocked={true}
        readOnly={true}
        width="300px"
        placeholder="중학교 이름을 입력해주세요."
      />
      <PreviousButton onClick={() => setIsShow(true)}>검색</PreviousButton>
      <SchoolSearchModal isShow={isShow} setIsShow={setIsShow} />
    </Flex>
  );
};

export const FormElement = ({
  label,
  explanation,
  warning,
  type,
  radioDatas,
  dropDownDatas = [],
  width,
  placeholder,
  value,
  onChange,
  imgUrl,
  setImgUrl,
  onFileChange,
  selectedRadio,
  setSelectedRadio,
  dropDownValues = [],
  onDropDownChange,
}: IFormElementType) => {
  const [isHover, setIsHover] = useState(false);
  const [localSelectedRadio, setLocalSelectedRadio] = useState('');
  const [localDropDownValues, setLocalDropDownValues] = useState<
    (string | number)[]
  >(() =>
    dropDownDatas.map((data) =>
      Array.isArray(data.content) ? data.content[0] : data.content
    )
  );

  const currentSelectedRadio = selectedRadio ?? localSelectedRadio;
  const handleSetSelectedRadio = setSelectedRadio ?? setLocalSelectedRadio;

  const currentDropDownValues =
    dropDownValues.length > 0 ? dropDownValues : localDropDownValues;

  useEffect(() => {
    if (dropDownDatas.length > 0 && dropDownValues.length === 0) {
      setLocalDropDownValues(
        dropDownDatas.map((data) =>
          Array.isArray(data.content) ? data.content[0] : data.content
        )
      );
    }
  }, [dropDownDatas]);

  const handleDropDownChange = (index: number, value: string | number) => {
    const newValues = [...currentDropDownValues];
    newValues[index] = value;

    if (onDropDownChange) {
      onDropDownChange(newValues);
    } else {
      setLocalDropDownValues(newValues);
    }
  };

  const handleRadioSelect = (radioLabel: string) => {
    handleSetSelectedRadio(radioLabel);
  };

  return (
    <FormContainer>
      <Flex gap={6} alignItems="center" height="fit-content" width="100%">
        <Flex
          gap={54}
          justifyContent="flex-start"
          width="100%"
          height="fit-content"
          alignItems={type === 'textArea' ? 'flex-start' : 'center'}
        >
          <Flex
            gap={12}
            alignItems="center"
            width="fit-content"
            height="fit-content"
          >
            <Text fontSize={24} fontWeight={600}>
              {label}
            </Text>
            {warning && (
              <SpeechBubbleContainer>
                {isHover && <SpeechBubble>{warning}</SpeechBubble>}
                <div
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                >
                  <Caution />
                </div>
              </SpeechBubbleContainer>
            )}
          </Flex>
          {type === 'imgSelector' && setImgUrl && (
            <ImageContent
              imgUrl={imgUrl}
              setImgUrl={setImgUrl}
              onFileChange={onFileChange}
            />
          )}
          {type === 'dropDown' && dropDownDatas.length > 0 && (
            <Flex width="fit-content" height="fit-content" gap={16}>
              {dropDownDatas.map((data, index) => (
                <DropDownContent
                  key={index}
                  datas={
                    Array.isArray(data.content) ? data.content : [data.content]
                  }
                  label={data.label}
                  value={currentDropDownValues[index]}
                  onChange={(value) => handleDropDownChange(index, value)}
                />
              ))}
            </Flex>
          )}
          {type === 'input' && (
            <InputContent
              width={width}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
          )}
          <Flex width="fit-content" height="fit-content" gap={32}>
            {type === 'radio' &&
              radioDatas?.map((data, index) => (
                <RadioContent
                  key={index}
                  label={data}
                  isSelected={currentSelectedRadio === data}
                  onSelect={() => handleRadioSelect(data)}
                />
              ))}
          </Flex>
          {type === 'textArea' && (
            <TextAreaContent
              value={value}
              placeholder={placeholder}
              onChange={onChange}
            />
          )}
          {type === 'search' && <SearchContent />}
        </Flex>
        {explanation && (
          <Text fontSize={16} fontWeight={300} color={colors.gray[400]}>
            {explanation}
          </Text>
        )}
      </Flex>
    </FormContainer>
  );
};

const SpeechBubbleContainer = styled.div`
  position: relative;
  display: flex;
  align-items: space-between;
  flex-direction: column;
`;

const SpeechBubble = styled.div`
  position: absolute;
  left: 12px;
  top: -56px;
  transform: translateX(-50%);
  margin-top: 8px;
  padding: 9px 16px;
  background-color: ${colors.extra.realWhite};
  color: ${colors.orange[600]};
  border: 1px solid ${colors.orange[800]};
  border-radius: 8px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    bottom: -7px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 7px 7px 0 7px;
    border-style: solid;
    border-color: ${colors.orange[800]} transparent transparent transparent;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px 6px 0 6px;
    border-style: solid;
    border-color: ${colors.extra.realWhite} transparent transparent transparent;
    z-index: 1;
  }
`;

const ImgContent = styled.img`
  width: 100%;
`;

const Radio = styled.div<{ isClick: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  border: 1px solid
    ${({ isClick }) => (isClick ? colors.orange[800] : colors.gray[200])};
  background-color: ${({ isClick }) =>
    isClick ? colors.orange[800] : 'transparent'};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.input<{ isBlocked?: boolean; width?: string }>`
  width: ${({ width }) => (width ? width : '100%')};
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

const HoverSelector = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  background-color: #0000003e;
`;

const ImgSelector = styled.div<{ imgUrl?: string | null }>`
  position: relative;
  width: 150px;
  height: 190px;
  border-radius: 4px;
  border: 1px solid ${colors.gray[300]};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
`;

const FileInput = styled.input`
  display: none;
`;

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

const FormContainer = styled.div`
  width: 100%;
  padding: 32px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${colors.gray[200]};
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
`;

const DropContainer = styled.div<{ width: number | null }>`
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.gray[300]};
  border-radius: 4px;
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  position: absolute;
  top: 39px;
  z-index: 1;
  background-color: ${colors.extra.realWhite};
`;

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
