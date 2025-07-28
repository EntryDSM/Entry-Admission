import { colors, Flex, Text } from '@entry/design-token';
import styled from '@emotion/styled';
import { Caution, Check } from './assets';
import { DropDownContent } from './DropDownContent';
import { ImageContent } from './ImageContent';
import { InputContent } from './InputContent';
import { RadioContent } from './RadioContent';
import { SearchContent } from './SearchContent';
import { TextAreaContent } from './TextAreaContent';
import React, { useEffect, useState } from 'react';

interface IFormElementType
  extends Partial<IInputType>,
    Partial<ITextAreaType>,
    Partial<IImgType>,
    Partial<ISearchType> {
  label?: string;
  explanation?: string;
  warning?: string;
  type?: 'radio' | 'dropDown' | 'imgSelector' | 'input' | 'textArea' | 'search';
  radioDatas?: string[];
  dropDownDatas?: { label: string; content: (string | number)[] }[];
  selectedRadio?: string;
  setSelectedRadio?: React.Dispatch<React.SetStateAction<string>>;
  dropDownValues?: (string | number)[];
  onDropDownChange?: (values: (string | number)[]) => void;
  inputType?: 'phone' | 'number' | 'text';
}

type IInputType = {
  value?: string | number | null;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  readonly?: boolean;
  placeholder?: string;
};

type ITextAreaType = {
  placeholder?: string;
  textAreaValue?: string;
  onTextAreaChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

type IImgType = {
  imgUrl?: string | null;
  setImgUrl?: React.Dispatch<React.SetStateAction<string | null>>;
  onFileChange?: (file: File | null) => void;
};

type ISearchType = {
  setSelectedValue?: React.Dispatch<React.SetStateAction<string | null>>;
  selectedValue?: string | null;
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
  onInputChange,
  textAreaValue,
  onTextAreaChange,
  imgUrl,
  setImgUrl,
  onFileChange,
  selectedRadio,
  setSelectedRadio,
  dropDownValues = [],
  onDropDownChange,
  selectedValue,
  setSelectedValue,
  inputType,
}: IFormElementType) => {
  const [isHover, setIsHover] = useState(false);
  const [localSelectedRadio, setLocalSelectedRadio] = useState<string>('');
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
    if (currentSelectedRadio === radioLabel) {
      handleSetSelectedRadio('');
    } else {
      handleSetSelectedRadio(radioLabel);
    }
  };

  const hasValue = () => {
    switch (type) {
      case 'input':
        return value !== null && value !== undefined && value !== '';
      case 'textArea':
        return typeof textAreaValue === 'string' && textAreaValue.trim() !== '';
      case 'imgSelector':
        return !!imgUrl;
      case 'radio':
        return !!currentSelectedRadio;
      case 'dropDown':
        return currentDropDownValues.length > 0;
      case 'search':
        return selectedValue !== null && selectedValue !== undefined;
      default:
        return false;
    }
  };

  const isFilled = hasValue();

  return (
    <FormContainer>
      <Flex
        gap={6}
        alignItems="center"
        height="fit-content"
        width="100%"
        justifyContent="space-between"
      >
        <Flex
          gap={54}
          justifyContent="flex-start"
          width={type === 'textArea' ? '100%' : 'fit-content'}
          height="fit-content"
          alignItems={type === 'textArea' ? 'flex-start' : 'center'}
        >
          <Flex
            gap={12}
            alignItems="center"
            width="fit-content"
            height="fit-content"
          >
            <CheckContainer>
              <CheckWrapper>
                <Check
                  color={isFilled ? colors.orange[800] : colors.gray[200]}
                />
              </CheckWrapper>
              <Label>{label}</Label>
            </CheckContainer>
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
              value={value ?? ''}
              onChange={onInputChange}
              type={inputType}
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
              value={textAreaValue ?? ''}
              placeholder={placeholder}
              onChange={onTextAreaChange}
            />
          )}

          {type === 'search' && setSelectedValue && (
            <SearchContent
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          )}
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

const Label = styled.div`
  white-space: nowrap;
  font-size: 24px;
  font-weight: 600;
`;

const CheckContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const CheckWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

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

const FormContainer = styled.div`
  width: 100%;
  padding: 32px 0;
  display: flex;
  border-bottom: 1px solid ${colors.gray[200]};
`;
