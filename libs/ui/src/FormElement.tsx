import React, { useCallback, useMemo, useState } from 'react';
import { colors, Flex, Text } from '@entry/design-token';
import styled from '@emotion/styled';
import { Caution, Check } from './assets';
import { DropDownContent } from './DropDownContent';
import { ImageContent } from './ImageContent';
import { InputContent } from './InputContent';
import { RadioContent } from './RadioContent';
import { SearchContent } from './SearchContent';
import { TextAreaContent } from './TextAreaContent';
import { AddressContent } from './AddressContent';

interface BaseFormElementProps {
  label?: string;
  explanation?: string;
  warning?: string;
  width?: string;
}

interface InputProps {
  type: 'input';
  value?: string | number | null;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputType?: 'phone' | 'number' | 'text';
  readonly?: boolean;
}

interface TextAreaProps {
  type: 'textArea';
  textAreaValue?: string;
  onTextAreaChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

interface RadioProps {
  type: 'radio';
  radioDatas: string[];
  selectedRadio?: string;
  setSelectedRadio?: (value: string) => void;
}

interface DropDownProps {
  type: 'dropDown';
  dropDownDatas: { label: string; content: (string | number)[] }[];
  dropDownValues?: (string | number)[];
  onDropDownChange?: (values: (string | number)[]) => void;
}

interface ImageProps {
  type: 'imgSelector';
  imgUrl?: string | File | null;
  onFileChange?: (file: File | null) => void;
}

interface SearchProps {
  type: 'search';
  selectedValue?: string | null;
  setSelectedValue?: React.Dispatch<React.SetStateAction<string | null>>;
}

interface AddressProps {
  type: 'address';
  addressDetailValue: string;
  addressValue: string;
  postalCodeValue: string;
  handleCodeChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddressChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDetailChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type FormElementProps = BaseFormElementProps & (
  | InputProps
  | TextAreaProps
  | RadioProps
  | DropDownProps
  | ImageProps
  | SearchProps
  | AddressProps
);

// 메모이제이션 components
const MemoizedCheck = React.memo(Check);
const MemoizedCaution = React.memo(Caution);

const WarningTooltip = React.memo(({ warning }: { warning: string }) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHover(true), []);
  const handleMouseLeave = useCallback(() => setIsHover(false), []);

  return (
    <SpeechBubbleContainer>
      {isHover && <SpeechBubble>{warning}</SpeechBubble>}
      <div
        style={{ width: '20px', height: '20px' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <MemoizedCaution />
      </div>
    </SpeechBubbleContainer>
  );
});

const CheckIcon = React.memo(({ isFilled }: { isFilled: boolean }) => (
  <CheckWrapper>
    <MemoizedCheck color={isFilled ? colors.orange[800] : colors.gray[200]} />
  </CheckWrapper>
));

export const FormElement = React.memo<FormElementProps>((props) => {
  const { label, explanation, warning, type, width } = props;

  // useMemo를 사용한 최적화
  const hasValue = useMemo(() => {
    switch (type) {
      case 'input':
        return props.value !== null && props.value !== undefined && props.value !== '';
      case 'textArea':
        return typeof props.textAreaValue === 'string' && props.textAreaValue.trim() !== '';
      case 'imgSelector':
        return !!props.imgUrl;
      case 'radio':
        return !!props.selectedRadio;
      case 'dropDown':
        return (props.dropDownValues?.length ?? 0) > 0;
      case 'search':
        return props.selectedValue !== null && props.selectedValue !== undefined && props.selectedValue !== '';
      case 'address':
        return props.addressDetailValue !== null && props.addressValue !== null && props.postalCodeValue !== null && props.addressDetailValue !== "" && props.addressValue !== "" && props.postalCodeValue !== "" ;
      default:
        return false;
    }
  }, [type, props]);

  // content 렌더링 로직 - null check 추가
  const renderContent = useCallback(() => {
    switch (type) {
      case 'input':
        return (
          <InputContent
            width={width}
            placeholder={props.placeholder}
            value={props.value ?? ''}
            onChange={props.onInputChange}
            type={props.inputType}
          />
        );

      case 'textArea':
        return (
          <TextAreaContent
            value={props.textAreaValue ?? ''}
            placeholder={props.placeholder}
            onChange={props.onTextAreaChange}
          />
        );

      case 'radio':
        return (
          <Flex width="fit-content" height="fit-content" gap={32}>
            {props.radioDatas?.map((data, index) => (
              <RadioContent
                key={`${data}-${index}`}
                label={data}
                isSelected={props.selectedRadio === data}
                onSelect={() => {
                  if (props.selectedRadio === data) {
                    props.setSelectedRadio?.('');
                  } else {
                    props.setSelectedRadio?.(data);
                  }
                }}
              />
            ))}
          </Flex>
        );

      case 'dropDown':
        return (
          <DropDownSection
            dropDownDatas={props.dropDownDatas}
            dropDownValues={props.dropDownValues}
            onDropDownChange={props.onDropDownChange}
          />
        );

      case 'imgSelector':
        return (
          <ImageContent
            initialImgUrl={props.imgUrl}
            onFileChange={props.onFileChange}
          />
        );

      case 'search':
        // setSelectedValue가 있을 때만 렌더링
        return props.setSelectedValue ? (
          <SearchContent
            selectedValue={props.selectedValue}
            setSelectedValue={props.setSelectedValue}
          />
        ) : null;

      case 'address':
        // 모든 핸들러가 있을 때만 렌더링
        return props.handleCodeChange && props.handleAddressChange && props.handleDetailChange ? (
          <AddressContent
            postalCodeValue={props.postalCodeValue ?? ''}
            addressValue={props.addressValue ?? ''}
            addressDetailValue={props.addressDetailValue ?? ''}
            handleCodeChange={props.handleCodeChange}
            handleAddressChange={props.handleAddressChange}
            handleDetailChange={props.handleDetailChange}
          />
        ) : null;

      default:
        return null;
    }
  }, [type, props, width]);

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
          <Flex gap={12} alignItems="center" width="fit-content" height="fit-content">
            <CheckContainer>
              <CheckIcon isFilled={hasValue} />
              <Label>{label}</Label>
            </CheckContainer>
            {warning && <WarningTooltip warning={warning} />}
          </Flex>

          {renderContent()}
        </Flex>
        
        {explanation && (
          <Text fontSize={16} fontWeight={300} color={colors.gray[400]}>
            {explanation}
          </Text>
        )}
      </Flex>
    </FormContainer>
  );
});

// DropDown 섹션을 별도 컴포넌트로 분리하여 최적화
const DropDownSection = React.memo<{
  dropDownDatas: { label: string; content: (string | number)[] }[];
  dropDownValues?: (string | number)[];
  onDropDownChange?: (values: (string | number)[]) => void;
}>(({ dropDownDatas, dropDownValues = [], onDropDownChange }) => {
  // 기본값 계산을 useMemo로 최적화
  const defaultValues = useMemo(() => 
    dropDownDatas.map((data) =>
      Array.isArray(data.content) ? data.content[0] : data.content
    ), [dropDownDatas]
  );

  const currentValues = dropDownValues.length > 0 ? dropDownValues : defaultValues;

  React.useEffect(() => {
    if ((dropDownValues?.length ?? 0) === 0 && onDropDownChange) {
      onDropDownChange(defaultValues);
    }
  }, [dropDownValues, defaultValues, onDropDownChange]);

  const handleDropDownChange = useCallback((index: number, value: string | number) => {
    const newValues = [...currentValues];
    newValues[index] = value;
    onDropDownChange?.(newValues);
  }, [currentValues, onDropDownChange]);

  return (
    <Flex width="fit-content" height="fit-content" gap={16}>
      {dropDownDatas.map((data, index) => (
        <DropDownContent
          key={`${data.label}-${index}`}
          datas={Array.isArray(data.content) ? data.content : [data.content]}
          label={data.label}
          value={currentValues[index]}
          onChange={(value) => handleDropDownChange(index, value)}
        />
      ))}
    </Flex>
  );
});

FormElement.displayName = 'FormElement';
WarningTooltip.displayName = 'WarningTooltip';
CheckIcon.displayName = 'CheckIcon';
DropDownSection.displayName = 'DropDownSection';

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