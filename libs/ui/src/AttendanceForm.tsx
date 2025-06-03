import React, { useState } from 'react';
import styled from '@emotion/styled';
import { colors, Text } from '@entry/design-token';

interface AttendanceFormProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  defaultCount?: number;
}

export const AttendanceForm: React.FC<AttendanceFormProps> = ({
  title,
  value,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    onChange(onlyNums);
  };

  return (
    <Container>
      <HeaderRow>
        <CheckMark visible={!!value}>✓</CheckMark>
        <Text>
          {title}
        </Text>
      </HeaderRow>
      <InputWrapper>
        <StyledInput
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          hasValue={!!value}
          isFocused={isFocused}
        />
        <InputSuffix>
          회
        </InputSuffix>
      </InputWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input<{ hasValue: boolean; isFocused: boolean }>`
  width: 100%;
  height: 48px;
  border: 1px solid
    ${(props) =>
      props.isFocused
        ? props.hasValue
          ? colors.orange[800]
          : colors.gray[300]
        : props.hasValue
        ? colors.orange[800]
        : colors.gray[300]};
  border-radius: 12px;
  padding: 0 40px 0 20px;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  text-align: right;
`;

const InputSuffix = styled.span`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  font-size: 16px;
  color: ${colors.gray[500]};
  pointer-events: none;
`;

const CheckMark = styled.span<{ visible: boolean }>`
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => (props.visible ? colors.orange[800] : colors.gray[300])};
  transition: color 0.2s;
`;

export default AttendanceForm;